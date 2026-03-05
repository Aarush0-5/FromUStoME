"use server"

import clientPromise from "./mongo";

interface CustomGoal {
  text: string;
  completed: boolean
  completedCount: number,
  targetDays: number;
}


export async function savePhaseGoals(memoryKey: string, goalId: string) {
  const client = await clientPromise;
  const db = client.db("Healing_project");
  const safeMemoryKey = String(memoryKey);

 
  const result = await db.collection("users").updateOne(
    { memoryKey: safeMemoryKey },
    { 
      $addToSet: { completedGoalIds: goalId },
    },
    { upsert: true }
  );

  return { 
    success: true, 
    message: "Progress anchored." 
  };
}

export async function saveRecoveryData(memoryKey: string, reasons: string, goals: CustomGoal[], note: string, ncStartDate: string, selectedTriggers: string[], initialUrgeLevel: number,currentUrgeLevel: number ,advice: string) {
  const client = await clientPromise;
  const db = client.db("Healing_project"); 
  const collection = db.collection("users");
  const safeMemoryKey = String(memoryKey).trim(); 
  const existingUser = await collection.findOne({ memoryKey: safeMemoryKey });

  if (existingUser) {
    return { 
      success: false, 
      error: "This keyword is already taken. Please choose a unique one." 
    };
  }
 await collection.insertOne({ 
    memoryKey: safeMemoryKey, 
    reasons, 
    goals,     
    ncStartDate,
    selectedTriggers,
    completedActionIds: [],
    initialUrgeLevel,
    currentUrgeLevel,
    note,
    advice,
  });

  return { success: true };
}

export async function getRecoveryData(memoryKey: string) {
  const client = await clientPromise;
  const db = client.db("Healing_project");
  
  const user = await db.collection("users").findOne({ 
    memoryKey: String(memoryKey)
  });

  if (!user) return null;

  
  return {
    success: true,
    data: {
      advice: user.advice,
      reasons: user.reasons || "",
      ncStartDate: user.ncStartDate || "",
      selectedTrigger: user.selectedTriggers,
      note: user.note || "",
      goals: Array.isArray(user.goals) 
        ? user.goals.map((g: any) => ({
            text: typeof g === 'string' ? g : g.text, 
            completed: !!g.completed ,
            completedCount: g.completedCount,
           targetDays: g.targetDays
          })) 
        : [],
      checkedIds: user.completedActionIds || [],
      initialUrgeLevel: user.initialUrgeLevel ,
      currentUrgeLevel: user.currentUrgeLevel
    }
  };
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
 export async function updateUrgeLevel (memoryKey: string, urgeLevel: number){
  try {
    const client = await clientPromise;
    const db = client.db("Healing_project");
     const result = await db.collection("users").updateOne(
      { memoryKey: String(memoryKey) },
      { $set: { currentUrgeLevel: urgeLevel} }
    );

    return { success: result.modifiedCount > 0 };
  } catch (e) {
    console.error("Failed to update goal:", e);
    return { success: false };
  }
 }
export async function updateActionStatus(memoryKey: string, updatedIds: any[]) {
  try {
    const client = await clientPromise;
    const db = client.db("Healing_project");
    
    
   

    const result = await db.collection("users").updateOne(
      { memoryKey: String(memoryKey) },
      { $set: { completedActionIds: updatedIds } }
    );

    return { success: result.modifiedCount > 0 };
  } catch (e) {
    console.error("Failed to update goal:", e);
    return { success: false };
  }
}

export async function UpdateReasons(memoryKey: string, reasons: string[]){
  try{
    const client = await clientPromise;
    const db = client.db("Healing_project");
    const result = await db.collection('users').updateOne(
      {memoryKey: String(memoryKey)},
      {
       $push: { reasons: { $each: reasons } } as any
      }
    );
   return { success: result.modifiedCount > 0 || ''};
  }catch {
    
  }
}