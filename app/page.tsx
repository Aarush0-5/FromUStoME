"use client"
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050508] text-slate-300 selection:bg-teal-500/30 overflow-x-hidden">
     
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-screen">
        
      
       <header className="text-center mb-20 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-white">
            Perspective <span className="font-semibold text-teal-400">& Peace</span>
          </h1>
          <p className="text-slate-400 font-light text-lg italic">
            Softening the edges of hard transitions.
          </p>
          <div className="flex justify-center gap-4 text-[10px] uppercase tracking-[0.3em] text-slate-500">
            <span>Self-Compassion</span>
            <span className="text-teal-500/50">•</span>
            <span>Clarity</span>
            <span className="text-teal-500/50">•</span>
            <span>Growth</span>
          </div>
        </header>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
         
          <Link href="/fromustome/page0" className="group relative">
            <div className="h-full p-8 bg-[#0a0a0e]/60 backdrop-blur-xl border border-white/5 rounded-3xl transition-all duration-500 group-hover:border-indigo-500/30 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]">
              <div className="flex flex-col h-full space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 font-mono">
                  01
                </div>
                <div>
                  <h2 className="text-2xl font-light tracking-wider text-white mb-3">From Us to Me</h2>
                  <p className="text-slate-400 leading-relaxed text-sm font-light">
                    An empathetic framework designed to help navigate the complex architecture of emotional dissolution. Transition from shared identity to individual sovereignty with precision and care.
                  </p>
                </div>
                <div className="pt-4 mt-auto">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 group-hover:text-indigo-300 flex items-center">
                    Begin Transition <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/the_second_project/page0" className="group relative">
            <div className="h-full p-8 bg-[#0a0a0e]/60 backdrop-blur-xl border border-white/5 rounded-3xl transition-all duration-500 group-hover:border-teal-500/30 group-hover:shadow-[0_0_40px_rgba(45,212,191,0.1)]">
              <div className="flex flex-col h-full space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400 font-mono">
                  02
                </div>
                <div>
                  <h2 className="text-2xl font-light tracking-wider text-white mb-3">The Myriad</h2>
                  <p className="text-slate-400 leading-relaxed text-sm font-light">
                    Harnessing 10,000 simulations to navigate life-design choices. Utilize IPIP psychometrics and behavioral modeling to visualize the trajectory of your decisions before they are made.
                  </p>
                </div>
                <div className="pt-4 mt-auto">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-teal-400 group-hover:text-teal-300 flex items-center">
                    Initiate Simulation <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  )
}