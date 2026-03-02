import React from 'react';

const DisclaimerPage = () => {
  return (
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

        <section>
          <div className="mt-6 flex flex-col items-center border-t border-slate-100 pt-6">
              <span className="text-xs uppercase tracking-widest text-slate-400 mb-3">
                Get in touch
              </span>
              <a 
                href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`}
                className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Email the Developer
              </a>
            </div>
        </section>

        <hr className="border-gray-100" />

        <footer className="text-center text-sm text-gray-400 pt-4 italic">
          Last Updated: March 2026<br />
          This project is part of a learning portfolio.
        </footer>

      </div>
    </div>
    </div>
  );
};

export default DisclaimerPage;