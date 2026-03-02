"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeBreakup } from "../backend/analyser";
import { saveRecoveryData } from "../backend/mongo1";

export default function Onboarding() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    duration: "",
    initiator: "",
    endtype: "",
    contactStatus: "",
    biggestChallenge: "",
    rawStory: ""
  });
  const [formdata2, setFormData2]=useState<string>('')
  const [note,setNote]=useState("")
  const [showform1, setShowForm1]=useState(true) 
  const [showform2, setShowForm2]=useState(false)
  const [personalMessage, setPersonalMessage]=useState('')
  const [goalinput, setGoalInput]=useState<string[]>()
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [memoryString, setMemoryString]= useState('')
  const [realitycheck, setRealityCheck] = useState("")
  const [loading, setLoading]=useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true)
  const result = await analyzeBreakup(formData);

 
  if (result.success) {
    setPersonalMessage(result.data.personalMessage)
    setGoalInput(result.data.goals)
    setRealityCheck(result.data.realityChecks)
    setShowForm1(false);
    setShowForm2(true)
    setLoading(false)

  }
};
const handledbData = async (e: React.FormEvent)=> {
  e.preventDefault();
  setLoading(true)
 const manualGoals = formdata2
    .split(',') 
    .map(task => task.trim())
    .filter(task => task.length > 0);
  
  const finalGoalsArray = [...selectedGoals, ...manualGoals];
  const datatosave = await saveRecoveryData(memoryString, realitycheck, finalGoalsArray, note, formData.biggestChallenge)
  if (datatosave.success){
    sessionStorage.setItem("memoryKey", memoryString)
    console.log("data save successfull")
    setLoading(false)
    router.push('/dashboard')
  }
 
};
const toggleGoal = (goal: string) => {
  setSelectedGoals((prev) => 
    prev.includes(goal) 
      ? prev.filter(g => g !== goal) 
      : [...prev, goal]             
      );
};
  return (
    <div>
      <head>
        <title>FromUStoMe | Your Breakup Reality Check</title>
        <link rel="icon" href="/logo.jpg" />
        <meta name="description" content="A student project to help you move on." />
      </head>
    
    <main className="min-h-screen bg-[#020617] text-slate-200 p-8 flex flex-col items-center">
    { showform1 &&
      <div className="max-w-2xl w-full space-y-12">
        
        
        <header className="text-center pt-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Let's build your blueprint.
          </h2>
          <p className="text-slate-500 mt-2">Be honest. No one else will see this.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">Relationship Duration</label>
              <input 
                type="text" 
                placeholder="e.g. 2 years"
                className="bg-black border border-slate-800 p-3 rounded-xl outline-none focus:border-indigo-500 transition-all"
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>
             

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">Who ended it?</label>
              <select 
                className="bg-black border border-slate-800 p-3 rounded-xl outline-none focus:border-indigo-500 transition-all text-white"
                onChange={(e) => setFormData({...formData, initiator: e.target.value})}
              >
                <option value="">Select...</option>
                <option value="me">I did</option>
                <option value="them">They did</option>
                <option value="mutual">It was mutual</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">How did it end?</label>
              <select 
                className="bg-black border border-slate-800 p-3 rounded-xl outline-none focus:border-indigo-500 transition-all text-white"
                onChange={(e) => setFormData({...formData, endtype: e.target.value})}
              >
                <option value="">Select...</option>
                <option value="Good note">Good note eg:planned but unwanted..</option>
                <option value="Bad note">Bad note eg:fight,crying..</option>
                <option value="Mix of both good and bad">Messed up: a mix of both</option>
              </select>
            </div>

             <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">Still in contact?</label>
              <select 
                className="bg-black border border-slate-800 p-3 rounded-xl outline-none focus:border-indigo-500 transition-all text-white"
                onChange={(e) => setFormData({...formData, contactStatus: e.target.value})}
              >
                <option value="">Select...</option>
                <option value="yes">Yep,we talk</option>
                <option value="no">Nope Complete back off</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">What was the biggest problem ?</label>
              <input 
                type="text" 
                placeholder="Major reason of break up?"
                className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl outline-none focus:border-indigo-500 transition-all"
                onChange={(e) => setFormData({...formData, biggestChallenge: e.target.value})}
              />
            </div>
          </div>

        
          <div className="flex flex-col gap-4">
            <label className="text-lg font-semibold text-slate-300">
              The "Open Up" Section
            </label>
            <p className="text-sm text-slate-500 italic">
              Venting helps. Tell the story—the good, the bad, and the exact moment you knew it was over.
            </p>
            <textarea 
              rows={8}
              placeholder="Start typing..."
              className="w-full bg-slate-900/40 border border-slate-800 p-5 rounded-2xl outline-none focus:border-indigo-500 transition-all resize-none placeholder:text-slate-700"
              onChange={(e) => setFormData({...formData, rawStory: e.target.value})}
            ></textarea>
          </div>
       
          <button 
            type="submit"
            className="w-full py-4 disabled:opacity-50 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/10 active:scale-[0.98]"
            disabled={loading}
          >
            Generate My Blueprint
          </button>
        </form>
      </div>
    }
    {
     showform2 && (
  <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
   
    <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-rose-400/30 to-indigo-500/10">
      <div className="bg-[#020617]/90 backdrop-blur-xl p-8 rounded-[23px] border border-white/5 shadow-2xl">
        <div className="flex justify-center mb-4 text-2xl">✨</div>
        <h2 className="text-xl md:text-2xl font-medium leading-relaxed bg-gradient-to-r from-rose-200 via-slate-100 to-indigo-200 bg-clip-text text-transparent italic text-center">
          "{personalMessage}"
        </h2>
      </div>
    </div>

   <div className="mt-20 space-y-8 pb-20">
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-semibold text-slate-200">Planting the Seeds</h3>
        <p className="text-slate-400 text-sm italic">
          Select a few goals the AI suggested, or write your own below.
        </p>

      
        <div className="flex flex-wrap justify-center gap-3 pt-6">
          {goalinput && goalinput.length > 0 ? (
            goalinput.map((goal, index) => {
              const isSelected = selectedGoals.includes(goal);
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                    isSelected
                      ? "bg-rose-500/20 border-rose-400 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                      : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  }`}
                >
                  <span className={`transition-transform ${isSelected ? "rotate-0" : "rotate-45"}`}>
                    {isSelected ? "✓" : "+"}
                  </span>
                  <span className="text-sm">{goal}</span>
                </button>
              );
            })
          ) : (
            <p className="text-slate-600 text-sm italic">AI is preparing your suggestions...</p>
          )}
        </div>
      </div>

     
      <div className="space-y-4 pt-4">
        <div className="group relative">
          <textarea
            className="w-full bg-black/40 border border-slate-800 p-6 rounded-2xl outline-none focus:border-rose-500/50 transition-all text-slate-200 placeholder:text-slate-700 shadow-inner"
            placeholder="Choose a few goals for yourself"
            rows={3}
            onChange={(e) => setFormData2(e.target.value)} 
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity -z-10" />
        </div>

        <div className="group relative">
          <textarea
            className="w-full bg-black/40 border border-slate-800 p-6 rounded-2xl outline-none focus:border-rose-500/50 transition-all text-slate-200 placeholder:text-slate-700 shadow-inner"
            placeholder="Write a small note to your future self..."
            rows={3}
            onChange={(e) => setNote(e.target.value)} 
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity -z-10" />
        </div>

        <div className="group">
          <label className="text-xs uppercase tracking-widest text-slate-500 ml-2">
            Your Memory Key (Case Sensitive)
          </label>
          <input 
            type="text" 
            placeholder="e.g. BlueRain2024" 
            onChange={(e) => setMemoryString(e.target.value)}
            className="w-full bg-transparent border-b border-slate-700 py-3 px-2 text-xl outline-none focus:border-rose-500 transition-all placeholder:text-slate-800"
          />
        </div>

        <button 
          onClick={handledbData}
          className="w-full disabled:opacity-50 py-4 bg-white text-black font-bold rounded-2xl hover:bg-rose-50 transition-all active:scale-[0.98]"
          disabled={loading}
        >
          Commit to My Future
        </button>
      </div>
    </div>
  </div>
)}
    
    </main>
    </div>
  );
}