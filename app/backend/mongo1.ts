"use server"

import clientPromise from "./mongo";


export async function saveRecoveryData(memoryKey: string, reasons: string, goals: string[], note: string, mainReason: string) {
  const client = await clientPromise;
  const db = client.db("Healing_project"); 
  
  
  const safeMemoryKey = String(memoryKey); 
  
  

  const result = await db.collection("users").updateOne(
    { memoryKey: safeMemoryKey }, 
    { 
      $set: { 
        reasons: reasons, 
        goals: goals,     
        mainReason: mainReason,
        note: note
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
    
    
   

    const result = await db.collection("users").updateOne(
      { memoryKey: String(memoryKey) },
      { $set: { goals: updatedGoals } }
    );

    return { success: result.modifiedCount > 0 };
  } catch (e) {
    console.error("Failed to update goal:", e);
    return { success: false };
  }
}