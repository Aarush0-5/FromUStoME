"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRecoveryData } from "./backend/mongo1";

export default function Home() {
  const router=useRouter();
  const [memoryString, setMemoryString]= useState('')
  const [consent, setConsent]= useState(true)

  const goToDashboard= () => {
    router.push('/disclaimer')
  }
  const handlesubmit = async (e: React.FormEvent)=> {
      e.preventDefault()
      const result = await getRecoveryData(memoryString)
      console.log(result)
      if (result?.success){
        sessionStorage.setItem("memoryKey", memoryString);
        router.push("/dashboard")
      }
  }
  const hideDisclaimer = () => {
    setConsent(false)
  }
  return (
    consent ?  
    <div>
       <head>
        <title>FromUStoMe | Your Breakup Reality Check</title>
        <link rel="icon" href="/logo.jpg" />
        <meta name="description" content="A student project to help you move on." />
      </head>
    <div className="max-w-2xl mx-auto my-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 font-sans">
    
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Disclaimer</h1>
        <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-semibold">Student Project Notice</p>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        
      
        <section className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
          <h2 className="text-lg font-semibold text-indigo-900 mb-2">1. Student Project & Purpose</h2>
          <p className="text-indigo-900/80">
            This platform is a <strong>student-led project</strong> created with the intent to help individuals navigate the emotional challenges of breakups and emotional pain. The owner/creator of this site is <strong>not a doctor, licensed therapist, or medical professional</strong>. The tools provided here are for peer-support and educational exploration only.
          </p>
        </section>

        
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">2. No Professional Advice</h2>
          <p>
            The content provided, including curated links and self-help materials, does not constitute medical or psychological advice. It is not a substitute for professional diagnosis or treatment. Please consult with a licensed healthcare provider for any serious mental health concerns.
          </p>
        </section>

        
        <section className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Non-Professional Certificate</h2>
          <p>
            Any "Certificate of Completion" or "Healing Milestone" issued by this platform is intended solely for <strong>personal satisfaction and motivation</strong>. It is not a professional credential, academic credit, or a license to practice any form of therapy. It has no legal, clinical, or professional value.
          </p>
        </section>

       
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">4. External Content</h2>
          <p>
            Links to external videos (YouTube) are provided for convenience. We do not own this content, and the views expressed by these creators are their own. All copyrights belong to the respective owners.
          </p>
        </section>

        <hr className="border-gray-100" />

        <footer className="text-center text-sm text-gray-400 pt-4 italic">
          Last Updated: March 2026<br />
          This project is part of a learning portfolio.
        </footer>

      </div>
      <div className="flex justify-center mt-10  ">
        <button className="hover:text-red-600 hover:font-bold " onClick={hideDisclaimer}>I understand</button>
      </div>
      
    </div> 
    </div>:
    <div>
       <head>
        <title>FromUStoMe | Your Breakup Reality Check</title>
        <link rel="icon" href="/logo.jpg" />
        <meta name="description" content="A student project to help you move on." />
      </head>
    <main className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(30,58,138,0.15)_0%,_rgba(2,6,23,1)_70%)]" />

      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold text-slate-200 mb-6 tracking-tight">
          The Breakup Blueprint
        </h1>
        
        <p className="text-lg text-slate-400 mb-12 max-w-md mx-auto leading-relaxed">
          When everything feels dark, the best way out is through. 
          <span className="block mt-2 text-slate-500 italic">No noise. No judgment. Just your recovery.</span>
        </p>

        <button className="group relative bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-10 rounded-full transition-all duration-500 
          shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] 
          active:scale-95" onClick={()=>router.push('/page1')}>
          
          <span className="relative z-10">Start My Healing</span>
          
          <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-20 group-hover:opacity-40" />
        </button>

        

        <form onSubmit={handlesubmit} className="space-y-4 mt-10">
             <p className="text-slate-400 text-sm">Go directly to your dashboard if not a new user</p>

            <input 
              type="text" 
              placeholder="Enter your made key..."
              className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-indigo-500 transition-all"
              onChange={(e) => setMemoryString(e.target.value)} 
            />

            <button 
              type="submit" // This makes 'Enter' work
              className="group relative bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-10 rounded-full transition-all duration-500 
                shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] 
                active:scale-95"
            >
              <span className="relative z-10">Go to dashboard</span>
            </button>
        </form>
      </div>
      
      <div className="text-white mt-10 relative z-10">
        <button type="button" className="hover:text-red-500" onClick={goToDashboard}>
          Disclaimer
        </button>
      </div>
      
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white opacity-10 rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white opacity-20 rounded-full" />
    </main>
    </div>
  );
}
