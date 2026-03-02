"use server"

import clientPromise from "./mongo";
import DOMPurify from "isomorphic-dompurify"

export async function saveRecoveryData(memoryKey: string, reasons: string, goals: string[], note: string, mainReason: string) {
  const client = await clientPromise;
  const db = client.db("Healing_project"); 
  
  
  const safeMemoryKey = String(memoryKey); 
  const safeReasons = DOMPurify.sanitize(reasons);
  const safeNote = DOMPurify.sanitize(note);
  const safeMainReason = DOMPurify.sanitize(mainReason);
  
  
  const safeGoals = goals.map(g => ({ 
    text: DOMPurify.sanitize(String(g)), 
    completed: false 
  }));

  const result = await db.collection("users").updateOne(
    { memoryKey: safeMemoryKey }, 
    { 
      $set: { 
        reasons: safeReasons, 
        goals: safeGoals,     
        mainReason: safeMainReason,
        note: safeNote
      },
    },
    { upsert: true }
  );

  return { success: true };
}

export async function getRecoveryData(memoryKey: string) {
  const client = await clientPromise;
  const db = client.db("Healing_project");
  const safeKey = String(memoryKey);
  
  const user = await db.collection("users").findOne({ 
    memoryKey: safeKey
  });

  if (!user) return null;

  return {
    success: true,
    data: JSON.parse(JSON.stringify(user))
  }
}

export async function updateGoalStatus(memoryKey: string, updatedGoals: any[]) {
  try {
    const client = await clientPromise;
    const db = client.db("Healing_project");
    
    
    const safeGoals = updatedGoals.map(g => ({
      text: DOMPurify.sanitize(String(g.text)),
      completed: Boolean(g.completed)
    }));

    const result = await db.collection("users").updateOne(
      { memoryKey: String(memoryKey) },
      { $set: { goals: safeGoals } }
    );

    return { success: result.modifiedCount > 0 };
  } catch (e) {
    console.error("Failed to update goal:", e);
    return { success: false };
  }
}