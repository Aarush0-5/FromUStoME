"use client"
import { getRecoveryData, updateGoalStatus } from "../backend/mongo1";
import { useEffect, useState } from "react";

interface Goal {
  text: string,
  completed: boolean
}
export default function dashboard() {
const [reasonIndex, setReasonIndex] = useState(0);
const [memoryString, setMemoryString]= useState<string>('')
const [panic, setPanic]=useState(false)
const [reasons, setReasons]= useState<string []>([])
const [goals, setGoals]= useState<Goal[]>([])
const [noContact, setNoContact]= useState(false)
const [showCertificate, setShowCertificate] = useState(false);
const [userNote, setUserNote]= useState('')
const [hurdle, setHurdle]= useState('')
const completedCount = goals.filter(g => g.completed).length;

const showNextReason = () => {
  setReasonIndex((prev) => (prev + 1) % reasons.length);
};


const Recoverydata = async (key: string) => {
    const results = await getRecoveryData(key)
    if (results?.success){
      setGoals(results.data.goals)
      setReasons(results.data.reasons)
      setMemoryString(key)
      setUserNote(results.data.note)
      setHurdle(results.data.mainReason)
    }
}
useEffect(() => {
  const key=sessionStorage.getItem("memoryKey")
  if (key) {
    const fetchData = async () => {
     
      try {
        await Recoverydata(key); 
      } catch (error) {
        console.error("Database fetch failed:", error);
      } 
    };

    fetchData();
  }
}, []);



const totalGoals = goals.length;
const completedCount1 = goals.filter(g => g.completed === true).length;
const goalsWeight = totalGoals > 0 ? (completedCount1 / totalGoals) * 90 : 0;
const totalProgress = goalsWeight + (noContact ? 10 : 0) ;

const handleToggleGoal = async (index: number) => {
  const updatedGoals = [...goals];
  updatedGoals[index].completed = !updatedGoals[index].completed; 
  setGoals(updatedGoals);
  const result = await updateGoalStatus(memoryString, updatedGoals);
  if (!result.success) {
    console.error("Cloud sync failed");
  }
};

const Certificate = ({ memoryKey, userNote, hurdle, completedTasks, onClose }: { 
  memoryKey: string, 
  userNote: string, 
  hurdle: string, 
  completedTasks: any[],
  onClose: () => void 
}) => {
  return (
    <div>
      <head>
        <title>FromUStoMe | Your Breakup Reality Check</title>
        <link rel="icon" href="/logo.jpg" />
        <meta name="description" content="A student project to help you move on." />
      </head>
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
      
     
      <div className="relative max-w-3xl w-full bg-[#faf9f6] text-slate-900 p-12 rounded-sm shadow-2xl border-[1px] border-slate-200">
        
        <div className="relative flex flex-col gap-10">
          
        
          <div className="space-y-2 border-l-4 border-rose-500 pl-6">
            <h1 className="text-3xl font-serif italic tracking-tight">The Journey of {memoryKey}</h1>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Documenting a complete spiritual and emotional recovery</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            
            <div className="space-y-8">
              <section>
                <h3 className="text-[10px] uppercase tracking-widest text-rose-500 font-black mb-3">The Greatest Hurdle Overcome</h3>
                <p className="text-lg font-medium leading-tight text-slate-800 underline decoration-rose-200 underline-offset-8">
                  "{hurdle}"
                </p>
              </section>

              <section>
                <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-3">Objectives Secured</h3>
                <ul className="space-y-2">
                  {completedTasks.slice(0, 5).map((task, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="text-emerald-500 text-lg">✓</span> {task.text}
                    </li>
                  ))}
                  {completedTasks.length > 5 && <li className="text-[10px] italic text-slate-400">+ {completedTasks.length - 5} more victories</li>}
                </ul>
              </section>
            </div>

        
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-indigo-500 font-black mb-4">Voice of the Past Self</h3>
                <p className="text-sm italic leading-relaxed text-slate-700">
                  "{userNote}"
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-[10px] text-slate-400 mb-6">I have reclaimed my time, my energy, and my peace. I choose to never look back.</p>
                
               
                <div className="space-y-1">
                  <p className="font-serif text-2xl italic text-slate-900 border-b border-slate-400 inline-block px-2">
                    {memoryKey}
                  </p>
                  <p className="text-[9px] uppercase tracking-tighter text-slate-400">Authenticated by the one who survived</p>
                </div>
              </div>
            </div>
          </div>

      
          <div className="flex justify-between items-center pt-8 border-t border-slate-100">
            <div className="flex gap-8">
              <div>
                <p className="text-[8px] uppercase text-slate-400">Status</p>
                <p className="text-[10px] font-bold text-emerald-600">FULLY HEALED</p>
              </div>
              <div>
                <p className="text-[8px] uppercase text-slate-400">Date</p>
                <p className="text-[10px] font-bold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p>You Did it!</p>
            </div>
          </div>
        </div>

        <div className="absolute  left-1/2 -translate-x-1/2 flex gap-4 print:hidden">
          <button onClick={() => window.print()} className="px-8 py-3 bg-white text-black rounded-full font-bold shadow-xl hover:scale-105 transition">Get it</button>
          <button onClick={onClose} className="px-8 py-3 bg-white/10 text-black border border-white/20 rounded-full font-bold backdrop-blur-md hover:bg-white/20 transition">Return to Space</button>
        </div>
      </div>
    </div>
    </div>
  );
};


   return( 
    <div> 
      <head>
        <title>FromUStoMe | Your Breakup Reality Check</title>
        <link rel="icon" href="/logo.jpg" />
        <meta name="description" content="A student project to help you move on." />
      </head>
    <main className={`transition-all duration-[4000ms] min-h-screen ease-in-out ${
  totalProgress === 100
    ? "bg-blue-500 text-white" 
    : totalProgress >= 50
    ? "bg-[radial-gradient(circle_at_50%_-20%,_#FFF700_0%,_#FF8C00_30%,_#FF2400_60%,_#020617_100%)] text-white" 
    : "bg-[#020617] text-slate-400" 
}`}>  
      <nav className="p-6 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="flex flex-col">
          <h1 className="text-xl font-light tracking-tight">Your Journey</h1>
        </div>
        <div className="text-right">
  
          <h2 className="text-sm font-mono text-slate-300">{memoryString}</h2>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto p-6 space-y-12">
        

        <section className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-light">Feeling the urge to reach out?</h2>
              <p className="text-slate-500 text-sm italic">Take a breath. Read your truth first.</p>
            </div>
            
            <button 
              onClick={() => setPanic(!panic)}
              className={`w-full py-4 rounded-2xl font-medium transition-all duration-500 ${
                panic ? 'bg-zinc-800 text-slate-400' : 'bg-white text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
              }`}
            >
              {panic ? "Hide Reality Checks" : "Why shouldn't I?"}
            </button>

            {panic && reasons.length > 0 && (
            <div className="flex flex-col">
                <div className="animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-rose-500/10 border border-rose-500/30 p-6 rounded-2xl italic text-rose-100">
                  "{reasons[reasonIndex]}"
                </div>
                <button 
                  onClick={showNextReason}
                  className="mt-4 text-xs uppercase tracking-widest text-rose-400 hover:text-rose-300"
                >
                  Give me another reason →
                </button>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-sm text-slate-500 mb-4">Reasons not enough?</p>
              <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <h4 className="text-indigo-400 font-bold">You are {totalProgress.toFixed(0)}% ahead in your journey from day 1 .</h4>
                <p className="text-xs text-slate-400">You've finished {completedCount} major goals. Don't reset your clock now.</p>
              </div>
            </div>
            <div className=" my-10 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <h1 className="text-xl font-bold text-white text-center">Instead, try listening to these</h1>
              <p className="text-indigo-100 text-sm text-center mt-1">Curated resources for healing and growth</p>
            </div>

            <div className="">
              
              <a href="https://youtu.be/GcJVygChaxA" target="_blank" className="flex items-center p-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200 group border border-transparent hover:border-indigo-100">
                <div className="bg-red-100 text-red-500 p-2 rounded-lg group-hover:bg-red-200">❤️</div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-800 tracking-tight">How to Heal a Broken Heart</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Mel Robbins</p>
                </div>
              </a>

              <a href="https://youtu.be/IRCZ1Mt2a8M" target="_blank" className="flex items-center p-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200 group border border-transparent hover:border-indigo-100">
                <div className="bg-blue-100 text-blue-500 p-2 rounded-lg group-hover:bg-blue-200">🎙️</div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-800 tracking-tight">Jordan Peterson on DOAC</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">The Diary of a CEO</p>
                </div>
              </a>

              <a href="https://youtu.be/nNMDRdBea_E" target="_blank" className="flex items-center p-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200 group border border-transparent hover:border-indigo-100">
                <div className="bg-purple-100 text-purple-500 p-2 rounded-lg group-hover:bg-purple-200">🧠</div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-800 tracking-tight">The Science of Breakups</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Andrew Huberman</p>
                </div>
              </a>

              <a href="https://youtu.be/fQ4jVGMDlGw" target="_blank" className="flex items-center p-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200 group border border-transparent hover:border-indigo-100">
                <div className="bg-green-100 text-green-500 p-2 rounded-lg group-hover:bg-green-200">📈</div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-800 tracking-tight">Stages of Break up</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Insights & Recovery</p>
                </div>
              </a>

              <a href="https://youtu.be/R6xbXOp7wDA" target="_blank" className="flex items-center p-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200 group border border-transparent hover:border-indigo-100">
                <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg group-hover:bg-yellow-200">⚡</div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-800 tracking-tight">Understand Dopamine</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Biology & Motivation</p>
                </div>
              </a>

              <a href="https://youtu.be/TH0U2D90l-o" target="_blank" className="flex items-center p-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200 group border border-transparent hover:border-indigo-100">
                <div className="bg-orange-100 text-orange-500 p-2 rounded-lg group-hover:bg-orange-200">🎮</div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-800 tracking-tight">Hard to Be Happy</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Dr. K (HealthyGamerGG)</p>
                </div>
              </a>

            </div>
          </div>
              </div>
            )}
          </div>
        </section>

        <div className="mb-12 p-8 bg-[#0f0f0f] border border-white/5 rounded-3xl shadow-2xl">
  <div className="flex justify-between items-end mb-4">
    <div>
      <h2 className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold">
        Recovery Integrity
      </h2>
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-light text-white">
          {Math.round(totalProgress)}
        </span>
        <span className="text-slate-500 text-xl">%</span>
      </div>
    </div>
    
    <div className="text-right">
      <p className="text-[10px] text-indigo-400 font-mono">
        {completedCount1} / {totalGoals} OBJECTIVES MET
      </p>
    </div>
  </div>

  {/* The Huge Bar Container */}
  <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
    {/* The Animated Fill */}
    <div 
      className="h-full bg-gradient-to-r from-rose-600 via-indigo-500 to-emerald-400 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(99,102,241,0.3)]"
      style={{ width: `${totalProgress}%` }}
    />
    
    {/* Glossy Overlay Effect */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
  </div>

  {/* Milestone Markers */}
  <div className="flex justify-between mt-2 px-1">
    <span className="text-[9px] text-slate-700">START</span>
    <span className="text-[9px] text-slate-700">STABILITY</span>
    <span className="text-[9px] text-slate-700">HEALED</span>
  </div>
</div>

        {/* Goals Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-white whitespace-nowrap">Your Goals</h2>
            <div className="h-px bg-white/5 w-full" />
          </div>

          <div className="grid gap-3">
             {goals.map((goal, index) => (
              <button
                key={index}
                onClick={() => handleToggleGoal(index)}
                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group ${
                  goal.completed 
                  ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                  : "bg-[#0f0f0f] border-white/5 hover:border-white/20"
                }`}
              >
                
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  goal.completed 
                  ? "bg-emerald-500 border-emerald-500" 
                  : "border-slate-700 group-hover:border-slate-500"
                }`}>
                  {goal.completed && (
                    <svg className="w-4 h-4 text-black font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <span className={`text-sm transition-all ${
                  goal.completed ? "text-white line-through" : "text-slate-200"
                }`}>
                  {goal.text}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8">
  <button 
    disabled={totalProgress < 90} 
    onClick={() => setNoContact(true)}
    className={`w-full group relative overflow-hidden p-6 rounded-2xl border-2 transition-all duration-500 ${
      totalProgress < 90 
        ? "bg-slate-900/50 border-slate-800 cursor-not-allowed opacity-60" 
        : "bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/10 active:scale-[0.98]"
    }`}
  >

    {totalProgress >= 90 && (
      <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
    )}

    <div className="relative z-10 flex flex-col items-center gap-3 text-center">

      <div className={`text-2xl transition-transform duration-500 ${totalProgress >= 90 ? "group-hover:scale-125" : ""}`}>
        {noContact ? "✅" : totalProgress < 90 ? "🔒" : "🛡️"}
      </div>

      <div className="space-y-1">
        <h3 className={`font-bold tracking-wide ${totalProgress < 90 ? "text-slate-500" : "text-emerald-400"}`}>
          FINAL INTEGRITY CHECK
        </h3>
        <p className={`text-sm leading-relaxed ${totalProgress < 90 ? "text-slate-600" : "text-slate-300"}`}>
          Did you maintain zero contact throughout your entire journey?
        </p>
      </div>

      {totalProgress < 90 && (
        <span className="text-[10px] bg-slate-800 text-slate-500 px-3 py-1 rounded-full uppercase tracking-tighter">
          Unlocks at 90% Base Progress
        </span>
      )}
    </div>
  </button>
   </div>
    {totalProgress === 100 && (
  <button 
    onClick={() => setShowCertificate(true)}
    className="mt-8 w-full py-6 bg-gradient-to-r from-amber-400 to-yellow-600 text-white font-black rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)] animate-bounce"
  >
    CLAIM YOUR CERTIFICATE
  </button>
)}

{showCertificate && (
  <Certificate 
    memoryKey={memoryString} 
    userNote={userNote}
    hurdle={hurdle}
    completedTasks={goals.filter(g => g.completed === true)}
    onClose={() => setShowCertificate(false)} 
  />
)}
        </section>

      </div>
      <footer className="py-20 text-center opacity-20 pointer-events-none">
        <div className="text-[80px] font-black tracking-tighter text-white/5 select-none">
          STAY STRONG
        </div>
      </footer>
    </main>
    </div>
   )
}