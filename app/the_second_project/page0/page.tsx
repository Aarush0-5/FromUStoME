"use client"
import { useState} from "react"
import axios from "axios"
import {Radar, RadarChart, BarChart, Bar, XAxis, YAxis, Tooltip, PolarGrid,ResponsiveContainer, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

interface AnalysisInterFace{
  ANALYSIS_REMARK : string,
  ACTION_GOALS : [{
    goal: string,
    description: string
  }]
}

interface Score{
  Category: string,
  "Final Value": number
}


export default function home_of_myriad () {
    const [userAnswers, setUserAnswers] = useState<Record<number, number>>({})
    const [loading, setLoading] = useState(false)
    const [processing, setProcessing]= useState(false)
    const [response , setResponse]= useState<string>("")
    const [showResults, setShowResults] = useState(false)
    const [analysis , setAnalysis] = useState<AnalysisInterFace | null>(null)
    const [scores, setScores]= useState<Score []>([])
    const [consent2, setConsent2]= useState(true)

    const questions = ["Am the life of the party","Feel little concern for others","Am always prepared","Get stressed out easily","Have a rich vocabulary", "Don't talk a lot", "Am interested in people", "Leave my belongings around", "Am relaxed most of the times", "Have difficulty understanding abstract ideas", "Feel comfortable around people", "Insult people", "Pay attention to details", "Worry about things","Have a vivid imagination", "Love to stay in the background", "Sympathize with others' feelings", "Make a mess of things", "Seldomly feel blue", "Am not interested in abstract ideas", "Start conversations", "Am not interested in other people's problems", "Get chores done right away","Am easily disturbed", "Have excellent ideas", "Have little to say", "Have a soft heart", "Often forget to put things at their proper place", "Get upset easily", "Do not have a good imagination", "Talk to a lot of different people at parties","Am not really interested in others", "Like to keep things in order", "Change my mood a lot", "am quick to understand things", "Don't like to draw attention to myself", "Take time out for others", "Shirk my duties","Have frequent mood swings", "Use difficult words on others", "Don't mind being the centre of attractions", " feel other's emotion", "Follow a schedule", "Get irritated easily", "Spend time reflecting on things", "Am quiet around strangers", "Make people feel at ease", "Am exacting in my work", "Often feel blue", "Am full of ideas"]
 
  const handle_score = () => {
     
       const keys = {
        "extra_post" : [0, 10, 20, 30, 40],
        "extra_neg": [5, 15, 25, 35, 45],
        "agree_post" : [6, 16, 26, 36, 41, 46],
        "agree_neg" : [1, 11, 21, 31],
        "con_pos": [2, 12, 22, 32, 42, 47],
        "con_neg": [7, 17, 27, 37],
        "stab_pos": [8, 18],
        "stab_neg": [3, 13, 23, 28, 33, 38, 43, 48],
        "open_pos": [4, 14, 24, 34, 39, 44, 49],
        "open_neg": [9, 19, 29]
       }
      let  score = {"extraversion": 0, "agreeableness": 0 , "conscientiousness": 0, "stability": 0, "openness": 0}
      Object.entries(userAnswers).forEach(([key, value])=> {  
        const index = Number(key)
        const option = Number(value)

       if (keys.extra_post.includes(index)){
         score.extraversion += option
       } else if (keys.extra_neg.includes(index)){
         score.extraversion += (6 - option)
       }else if (keys.agree_post.includes(index)){
         score.agreeableness += option
       }else if (keys.agree_neg.includes(index)){
         score.agreeableness += (6 - option)
       }else if (keys.con_pos.includes(index)){
         score.conscientiousness += option
       } else if (keys.con_neg.includes(index)){
         score.conscientiousness += (6-option)
       } else if (keys.open_pos.includes(index)){
         score.openness += option
       } else if (keys.open_neg.includes(index)) {
         score.openness += (6-option)
       } else if (keys.stab_pos.includes(index)){
         score.stability += option
       } else if (keys.stab_neg.includes(index)) {
        score.stability += (6-option)
       }
      })
     return score
    }
    

  const handle_submit = async () => {
    const final_results = handle_score()
    const content = {
      score: final_results,
      answer: response
    }
    setLoading(true)
    alert("Kindly wait till your data is being processed!")
    try{
    const final_submit = await axios.post("https://project-c-backend-fx6m.onrender.com/submitsimulation", content)
     
    if (final_submit.status == 200 || final_submit.status == 201) {
      alert("Your data was processed successfully!")
      setLoading(false)
      console.log(final_submit.data)
      const m1 = JSON.parse(final_submit.data.message1)
      const m2 = JSON.parse(final_submit.data.message2)
      setAnalysis(m1)
      setScores(m2)
      setShowResults(true)
    }
    } catch(error) {
      console.log(error)
      alert("Please try again")
    }
   
  }
  const consent_change = () => {
     setConsent2(false)
  }
    return(
      <>
      {consent2 ? 
      <div>
          <head>
            <title>Myriad | The 10,000 Lives Project</title>
            <link rel="icon" href="../images/logo.jpg" />
            <meta name="description" content="A student project exploring personality through simulation." />
          </head>
          <div className="max-w-2xl mx-auto my-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 font-sans">
            
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Project Disclaimer</h1>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-semibold">Simulation & Research Notice</p>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              
              <section className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">1. Educational Purpose & IPIP Usage</h2>
                <p className="text-blue-900/80">
                  This platform is a <strong>student-led research project</strong>. It utilizes the International Personality Item Pool (IPIP) to assess personality traits. This is <strong>not an official psychological diagnostic tool</strong>. The creator is an undergraduate student, not a licensed psychologist or psychometrician.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">2. The Nature of Simulations</h2>
                <p>
                  The "10,000 Simulations" feature uses mathematical modeling and random probability to suggest <strong>theoretical outcomes</strong>. These results are statistical "What Ifs" and do not predict your actual future, potential, or destiny. Life is influenced by infinite variables that no algorithm can fully capture.
                </p>
              </section>

              <section className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Not Clinical Advice</h2>
                <p>
                  The scores and scenarios generated should be taken with <strong>intellectual curiosity, not absolute seriousness</strong>. This data should not be used to make major life decisions, career changes, or as a basis for self-diagnosis. It is a tool for self-reflection and exploring the relationship between traits and life paths.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Data & Privacy</h2>
                <p>
                  All IPIP responses and simulation results are processed for the purpose of this project. While we strive to protect user data, this is an academic portfolio piece and should not be used to store sensitive personal information.
                </p>
              </section>

              <hr className="border-gray-100" />

              <footer className="text-center text-sm text-gray-400 pt-4 italic">
                Last Updated: March 2026<br />
              </footer>

            </div>
            <div className="flex justify-center mt-10">
              <button 
                className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium transition-all hover:bg-blue-600 active:scale-95" 
                onClick={consent_change}
              >
                Enter Simulation
              </button>
            </div>
            
          </div> 
          </div>:
        <>
      {!showResults &&
       <div className="min-h-screen bg-[#050508] relative font-sans text-slate-300 selection:bg-teal-500/30">
            
        
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none fixed"></div>
            
        
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(ellipse_at_top,#111827_0%,transparent_70%)] pointer-events-none fixed"></div>

            
            <div className="relative z-10">
            
            
            <section className="max-w-4xl mx-auto px-6 py-24 text-center">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6">
                Welcome to the <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-500">Myriad</span>
            </h1>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto mb-10"></div>
            
            <h2 className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-6 font-light">
                We all have moments where we feel stuck between two paths, wondering: 
                <span className="text-slate-200"> "What if I had chosen differently?"</span>
            </h2>

            <h3 className="text-lg font-medium text-slate-300 mb-12">
                To help you navigate these "what ifs," we created The Myriad—a space to visualize your possibilities.
            </h3>

             <h3 className="text-lg font-medium text-slate-300 mb-12">
                It works on the principal traits of the BIG FIVE, whose traits are explained below:
            </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 text-left">
                {[
                    { name: "Openness", desc: "Your curiosity and willingness to embrace new ideas and creative changes." },
                    { name: "Conscientiousness", desc: "How you organize your world and stay committed to your personal goals." },
                    { name: "Extraversion", desc: "Where you draw your energy—from quiet reflection or social connection." },
                    { name: "Agreeableness", desc: "The way you harmonize with others and lead with empathy in your relationships." },
                    { name: "Stability", desc: "How you navigate the waves of stress and maintain your inner calm during storms." }
                ].map((trait) => (
                    <div key={trait.name} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-teal-500/30 transition-colors">
                        <h4 className="text-teal-400 text-xs font-mono uppercase tracking-widest mb-2">{trait.name}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">{trait.desc}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-8">
                <p className="text-slate-500 text-sm leading-loose max-w-2xl mx-auto backdrop-blur-md bg-[#0a0a0e]/60 p-8 rounded-2xl border border-white/[0.03] shadow-xl">
                    <span className="block text-slate-300 text-lg mb-4 font-light italic">How do simulations help?</span>
                    By understanding these five core traits, <span className="text-teal-100/70 text-bold">The Machine</span> doesn't just guess your future—it models how <span className="italic">you</span> specifically might react to different life choices. 
                    <br /><br />
                    It takes your personality and the context of your situation to run thousands of "what if" scenarios, helping you see which paths lead to peace, and which might lead to more questions. It’s not about predicting fate; it’s about giving you the clarity to design your own.
                </p>

                <p className="text-slate-400 text-sm animate-pulse">
                    Ready to map your path? Fill out the IPIP questionnaire below.
                </p>
            </div>
        </section>

            
            <section className="max-w-3xl mx-auto px-6 pb-24">
                <div className="mb-14 text-center">
                <h2 className="text-2xl font-semibold text-slate-200 mb-2 tracking-wide">Psychometric Profile</h2>
                </div>

                <div className="flex flex-col space-y-4">
                {questions.map((item, indx) => (
                    <div 
                    key={indx} 
                    className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-lg transition-all duration-300 bg-[#0a0a0e]/80 hover:bg-[#0d0e15] border border-slate-800/50 hover:border-slate-600"
                    >
                    <h2 className="text-slate-300 font-normal text-base mb-4 md:mb-0 md:pr-8 leading-relaxed">
                        <span className="text-slate-600 mr-4 font-mono text-xs inline-block w-5 tracking-tighter">{(indx + 1).toString().padStart(2, '0')}</span>
                        {item}
                    </h2>
                    
                    <div className="relative shrink-0">
                        <select 
                        className="appearance-none bg-[#050508] border border-slate-800 text-slate-300 py-2.5 px-4 pr-10 rounded-md focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 cursor-pointer text-sm min-w-[240px] transition-colors shadow-inner"
                        onChange={(e) => {
                            const value = Number(e.target.value); 
                            handle_score();
                            setUserAnswers(prev => ({...prev , [indx]: value}))
                        }}
                        defaultValue="0"
                        >
                        <option value="0">Choose your answer</option>
                        <option value="1">Very Inaccurate</option>
                        <option value="2">Moderately Inaccurate</option>
                        <option value="3">Neither Accurate nor Inaccurate</option>
                        <option value="4">Moderately Accurate</option>
                        <option value="5">Very Accurate</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-600 group-hover:text-slate-400 transition-colors">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    </div>
                ))}
                      <textarea 
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          placeholder="Describe your situation..."
                          className="w-full bg-[#0a0a0e] border border-slate-800 rounded-xl p-4 text-slate-300 focus:outline-none focus:border-teal-500/50 transition-all min-h-[150px]"
                        />
                      <div className="flex justify-center items-center">
                         <button 
                        disabled={loading}
                        onClick={handle_submit}
                        className={`
                            relative px-12 py-4 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-50
                            ${loading 
                                ? 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-200' 
                                : 'bg-black text-white hover:bg-gray-800'
                            }
                        `}
                    >
                        {loading ? 'Processing...' : 'Send the data'}
                    </button>
                        </div>
                
                </div>      
            </section>
            </div>
        </div>
        }
          
        </>}
  
        {
          showResults && 
          <>
           <div className="min-h-screen bg-[#0a0a0a] text-stone-200 relative overflow-hidden py-16 px-4 font-sans selection:bg-orange-500/30">
      
  
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-900/20 rounded-full blur-[140px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-900/20 rounded-full blur-[140px] -z-10" />

    
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] -z-5" />

      <div className="max-w-4xl mx-auto bg-[#161616]/80 backdrop-blur-3xl rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.7)] border border-white/5 p-8 sm:p-14 relative">
        
   
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 bg-gradient-to-r from-orange-500/10 to-rose-500/10 text-orange-400 text-[10px] font-black tracking-[0.3em] uppercase rounded-full border border-orange-500/20 mb-8">
            Live Intelligence Report
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter">
            Simulation <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-rose-400 to-amber-400">Results</span>
          </h1>
          <p className="text-stone-500 text-xl mt-6 font-medium max-w-md mx-auto leading-relaxed">
            Your cognitive fingerprint, decoded.
          </p>
        </div>


        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(251,146,60,0.3)]">
              <span className="text-2xl">⚡</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Vibe Metrics</h2>
          </div>

    <div className="mb-8 text-center lg:text-left">
        <h2 className="text-xl font-light tracking-[0.3em] uppercase text-slate-400">
           Chart Visualization
        </h2>
    </div>
    {scores && scores.length > 0 ? (
        <div className="grid grid-cols-1 gap-10">
            
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
                <h3 className="text-[10px] font-mono text-teal-500/70 mb-8 uppercase tracking-[0.5em] self-start">
                    Linear Trait Distribution
                </h3>
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={scores} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis 
                                dataKey="Category" 
                                stroke="#475569" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false} 
                                tick={{ dy: 10 }}
                            />
                            <YAxis 
                                stroke="#475569" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => `${value / 1000}k`} // Clean formatting (8k instead of 8000)
                            />
                            <Tooltip 
                                cursor={{ fill: 'rgba(45, 212, 191, 0.05)' }}
                                contentStyle={{ backgroundColor: '#050508', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
                            />
                            <Bar 
                                dataKey="Final Value" 
                                fill="#2dd4bf" 
                                radius={[6, 6, 0, 0]} 
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>


            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col items-center mb-4">
                <h3 className="text-[10px] font-mono text-teal-500/70 mb-8 uppercase tracking-[0.5em] self-start">
                    Connectivity Mapping
                </h3>
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={scores}>
                            <PolarGrid stroke="#1e293b" />
                            <PolarAngleAxis 
                                dataKey="Category" 
                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }} 
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 10000]} tick={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#050508', border: '1px solid #1e293b', borderRadius: '12px' }}
                            />
                            <Radar
                                name="Metrics"
                                dataKey="Final Value"
                                stroke="#2dd4bf"
                                strokeWidth={2}
                                fill="#2dd4bf"
                                fillOpacity={0.2}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    ) : (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-slate-800 rounded-3xl">
            <div className="w-8 h-8 border-2 border-teal-500/20 border-t-teal-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Awaiting Metric Initialization</p>
        </div>
    )}

          <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 md:grid-cols-3 gap-5">
            {scores.map((item, index) => (
              <div 
                key={index} 
                className="group relative bg-[#1c1c1c] p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between transition-all duration-500 hover:border-orange-500/40 hover:bg-[#222] hover:-translate-y-2"
              >
                <span className="capitalize font-bold text-stone-500 group-hover:text-orange-400 transition-colors text-xs tracking-[0.2em] mb-4">
                  {item.Category}
                </span>
                <span className="text-5xl font-black text-white group-hover:scale-110 transition-transform origin-left duration-500">
                  {item["Final Value"]}
                </span>
                
                
                <div className="absolute inset-0 rounded-[2rem] bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </div>
            ))}
          </div>
        </div>

       
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black shadow-xl">
              <span className="text-2xl">🧠</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">The Analysis</h2>
          </div>
          
          <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#121212] p-10 sm:p-14 rounded-[3rem] border border-white/5 shadow-inner overflow-hidden">
            <p className="text-2xl sm:text-3xl text-stone-300 leading-[1.5] font-semibold relative z-10">
              <span className="text-orange-500 text-5xl font-serif mr-2">“</span>
              {analysis?.ANALYSIS_REMARK}
              <span className="text-rose-500 text-5xl font-serif ml-2 leading-none inline-block transform translate-y-4">”</span>
            </p>
          </div>
        </div>

      
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-[#2D2D2D] border border-white/10 rounded-2xl flex items-center justify-center text-white">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Well some portions of your personality helped you succeed in the various simulated lives , here are some goals you can have in order to develop that personality even in this life.</h2>
          </div>

          <div className="space-y-4">
            {analysis?.ACTION_GOALS?.map((item, index) => (
              <div 
                key={index} 
                className="group bg-[#1c1c1c]/50 hover:bg-[#252525] border border-white/5 p-8 rounded-[2.5rem] transition-all duration-300 flex flex-col sm:flex-row gap-8 items-center text-center sm:text-left"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center font-black text-2xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">
                    {item.goal}
                  </h3>
                  <p className="text-stone-400 leading-relaxed text-lg font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center text-stone-600 font-bold text-[10px] tracking-[0.4em] uppercase">
          <span>Encrypted Report</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
         <a className="hover:text-red-500 hover:bold text-4xl mt-5 hover:underline hover:underline-offset-8" href="/">Home</a>
      </div>
    </div>
     
          </>
        }
    </>
    )
}