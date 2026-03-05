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
    rawStory: "",
    urgeLevel: 0,
    advice: "",
    ncStartDate: "",
    selectedTriggers: [] as string[]
  });
  const [formdata2, setFormData2]=useState<string>('')
  const [note,setNote]=useState("")
  const [showform1, setShowForm1]=useState(false) 
  const [showform2, setShowForm2]=useState(true)
  const [personalMessage, setPersonalMessage]=useState('')
  const [goalinput, setGoalInput]=useState<string[]>()
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [memoryString, setMemoryString]= useState('')
  const [realitycheck, setRealityCheck] = useState("")
  const [loading, setLoading]=useState(false)
  const [customGoals, setCustomGoals] = useState([{ text: "", targetDays: 0}]);
  const [nameTaken, setNametaken]= useState(false)
  const triggers = [{
    id: "social",
    title: "Digital Ghosting",
    advice: "Social media acts like a 'digital window' that tricks your brain into thinking the connection is still alive. Every time you check their profile, you restart the withdrawal cycle.",
    task: "Mute or block their profile on all platforms. If the urge is too strong, delete your social apps for 48 hours to break the loop."
  },
  {
    id: "nights",
    title: "The Midnight Gap",
    advice: "At night, your prefrontal cortex (the logical brain) is tired, and your emotions take over. Silence makes the absence feel heavier than it actually is.",
    task: "Leave your phone in another room or a 'Charging Station' 30 minutes before bed. Read a physical book or listen to a non-romantic podcast instead."
  },
  {
    id: "mutual",
    title: "The Information Buffer",
    advice: "Hearing updates about your ex through friends is 'Contact by Proxy.' It keeps you in a state of hyper-vigilance, waiting for the next piece of news.",
    task: "Send a text to your mutual circle: 'Hey, I am focusing on my healing right now. Please do not share any updates about them with me for a while. I appreciate the support!'"
  },
  {
    id: "objects",
    title: "Environmental Triggers",
    advice: "Physical objects and shared spaces are 'anchors' for memories. They trigger spontaneous spikes in cortisol (stress) and sadness.",
    task: "Perform a 'Sweep.' Put all photos, gifts, and hoodies into a box. Tape it shut and put it in a hard-to-reach place (garage/attic). Don't throw them away yet; just remove the visual cue."
  },
  {
    id: "milestones",
    title: "Special Dates & Fridays",
    advice: "Anniversaries and weekends were part of your shared identity. When these dates arrive, the brain feels the loss of the 'expected routine.'",
    task: "Pre-plan a 'Solo Date' or a high-activity event for these specific days. Don't leave your schedule empty; fill the space with a new experience to create a new anchor."
  },
  {
    id: "routine",
    title: "The Morning Routine",
    advice: "The 'Good Morning' text was your first hit of oxytocin for the day. Its absence creates an immediate sense of panic or emptiness when you wake up.",
    task: "Change your morning alarm sound and immediately do 5 minutes of stretching or a cold splash of water. Break the old neurological pattern with a new physical sensation."
  }]
   
  const addGoalRow = () => {
    setCustomGoals([...customGoals, { text: "", targetDays: 0 }]);
  };


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
const handledbData = async (e: React.FormEvent) => {
    e.preventDefault();
    setNametaken(false)
    setLoading(true);
    const validCustomGoals = customGoals
    .filter(g => g.text.trim() !== "")
    .map(g => ({
      text: g.text,
      targetDays: g.targetDays,
      completedCount: 0,   
      completed: false     
    }));
    const datatosave = await saveRecoveryData(
      memoryString, 
      realitycheck, 
      validCustomGoals, 
      note, 
      formData.ncStartDate, 
      formData.selectedTriggers, 
      formData.urgeLevel, 
      formData.urgeLevel, 
      formData.advice 
    );
    if (datatosave.success) {
      sessionStorage.setItem("memoryKey", memoryString);
      setLoading(false);
      router.push('/dashboard');
    } else {
      setNametaken(true)
      setLoading(false)
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
          
          
          <div className="flex flex-col md:grid-cols-2 gap-6">
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
              <label className="text-sm font-medium text-slate-400">Current urge to reach out (1-10)</label>
                <input 
                  type="text"  
                  value={formData.urgeLevel}
                  onChange={(e) => setFormData({...formData, urgeLevel: parseInt(e.target.value)})}
                  className="w-full h-auto p-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
            </div>
            
               <div className="flex flex-col gap-2">
              <label className="text-m font-medium text-slate-400">If your best friend were in the same situation what would you advice them?</label>
                <input 
                  type="text" 
                  value={formData.advice}
                  onChange={(e) => setFormData({...formData, advice: e.target.value})}
                  className="w-full h-auto p-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
            
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

            <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-slate-400">Select all that apply to you:</label>
                  <div className="flex flex-row flex-wrap gap-2">
                    {triggers.map((trigger) => {
                      const isSelected = formData.selectedTriggers?.includes(trigger.id);

                      return (
                        <button
                          key={trigger.id}
                          type="button" 
                          onClick={() => {
                            const currentSelected = formData.selectedTriggers || [];
                            const nextSelected = isSelected
                              ? currentSelected.filter(id => id !== trigger.id) 
                              : [...currentSelected, trigger.id];
                            
                            setFormData({ ...formData, selectedTriggers: nextSelected });
                          }}
                          className={`px-4 py-2 rounded-xl border text-sm transition-all ${
                            isSelected 
                              ? 'bg-indigo-600 border-indigo-500 text-white' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {trigger.title}
                        </button>
                      );
                    })}
                  </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">
                      When was the last time you had contact?
                    </label>
                    <input 
                      type="date" 
                      max={new Date().toISOString().split("T")[0]}
                      className="bg-black border border-slate-800 p-3 rounded-xl outline-none focus:border-indigo-500 transition-all text-white"
                      onChange={(e) => setFormData({...formData, ncStartDate: e.target.value})}
                    />
                    <p className="text-xs text-slate-500 italic mt-1">
                      This date marks the beginning of your "Integrity Streak."
                    </p>
                  </div>
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
     {showform2 && (
        <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8">
          <div className="p-8 rounded-3xl bg-[#020617]/90 border border-white/5 shadow-2xl">
            <h2 className="text-xl italic text-center">"{personalMessage}"</h2>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-center">Planting the Seeds</h3>
             <p>Set a few personal goals for yourself which you'd like to follow along with the designed ones!</p>
            <div className="space-y-4">
              {customGoals.map((goal, index) => (
                <div key={index} className="flex flex-col lg:flex-row gap-2 items-center group">
                  <input
                    className="flex-1 bg-black/40 border border-slate-800 p-4 rounded-xl outline-none focus:border-rose-500/50 text-slate-200"
                    placeholder="Goal (e.g., Meditate)"
                    value={goal.text}
                    onChange={(e) => {
                      const newGoals = [...customGoals];
                      newGoals[index].text = e.target.value;
                      setCustomGoals(newGoals);
                    }}
                  />
                  <div className="flex items-center  p-4 bg-black/40 gap-2 border border-slate-800 rounded-xl px-3">
                    <input
                        type="number" 
                        className="w-12 bg-transparent outline-none text-rose-400 font-bold"
                        value={goal.targetDays}
                        onChange={(e) => {
                          const newGoals = [...customGoals]
                          const val = e.target.value;
                          newGoals[index].targetDays = val === "" ? 0 : Number(val);
                          
                          setCustomGoals(newGoals);
                        }}
                        
                        onBlur={(e) => {
                          if (Number(e.target.value) <= 0) {
                            const newGoals = [...customGoals];
                            newGoals[index].targetDays = 1; 
                            setCustomGoals(newGoals);
                          }
                        }}
                      />
                    <span className="text-slate-500 text-xs pr-2">days</span>
                  </div>
                </div>
              ))}
              
              <button 
                type="button"
                onClick={addGoalRow}
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                + Add another personal goal
              </button>
            </div>

            <textarea
              className="w-full bg-black/40 border border-slate-800 p-6 rounded-2xl outline-none"
              placeholder="Write a small note to your future self..."
              onChange={(e) => setNote(e.target.value)} 
            />
           {nameTaken ? <div>
             <h2 className="text-center mt-2 font-bold text-xl text-red-500 mb-2">UserName already taken! Try Something else</h2>
              <input 
              type="text" 
              placeholder="Your Memory Key" 
              className="w-full bg-transparent border-b border-slate-700 py-3 text-xl outline-none focus:border-rose-500"
              onChange={(e) => setMemoryString(e.target.value)}
            />
           </div> : <div>
              <input 
              type="text" 
              placeholder="Your Memory Key" 
              className="w-full bg-transparent border-b border-slate-700 py-3 text-xl outline-none focus:border-rose-500"
              onChange={(e) => setMemoryString(e.target.value)}
            />
            </div>}  
            

            <button 
              onClick={handledbData}
              className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-rose-50"
              disabled={loading}
            >
              Commit to My Future
            </button>
          </div>
        </div>
      )}
    
    </main>
    </div>
  );
}