export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between p-6 border-b border-slate-800">
        <span className="text-xl font-bold text-emerald-400">GymGen</span>
        <div className="flex gap-6 text-sm">
          <a href="/core" className="text-slate-400 hover:text-white">Core</a>
          <a href="/research" className="text-slate-400 hover:text-white">Research</a>
          <a href="/product" className="text-slate-400 hover:text-white">Product</a>
          <a href="/pricing" className="text-slate-400 hover:text-white">Pricing</a>
          <a href="/marketing" className="text-slate-400 hover:text-white">Marketing</a>
          <a href="/docs" className="text-slate-400 hover:text-white">Docs</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-emerald-900 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full mb-6">
          AI-POWERED FITNESS
        </div>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Your personalized gym routine,<br />
          <span className="text-emerald-400">generated in seconds.</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          GymGen creates structured workout plans based on your goals, experience level, and available days. No trainer needed. No guesswork.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/core" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg transition">
            Generate My Routine
          </a>
          <a href="/product" className="border border-slate-700 hover:border-slate-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition">
            See Pricing
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12 text-slate-300">Everything you need to train smarter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🏋️', title: 'Personalized Routines', desc: 'Tell us your goal and level. We generate a full weekly plan with days, muscle groups, and exercises.' },
            { icon: '💾', title: 'Save Your Plans', desc: 'Save as many routines as you want and access them anytime from your dashboard.' },
            { icon: '📊', title: 'Track Your Progress', desc: 'See your saved history and adjust your routine as you get stronger.' },
          ].map(f => (
            <div key={f.title} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-8 text-slate-300">Built for real gym-goers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { stat: 'Free', label: 'To get started' },
            { stat: '3 tiers', label: 'For every level' },
            { stat: '100%', label: 'Personalized to you' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <p className="text-3xl font-bold text-emerald-400">{s.stat}</p>
              <p className="text-slate-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT ROADMAP */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold text-center mb-8 text-slate-300">Project Roadmap</h2>
        <div className="space-y-2 text-center">
          <p className="text-slate-400">Week 0: Builder Infrastructure "GymGen"</p>
          <p className="text-slate-400">Week 1: Gym Routine Generator — <a href="/core" className="text-emerald-400 underline hover:text-emerald-300">Try it</a></p>
          <p className="text-slate-400">Week 2: Research + Benchmarking — <a href="/research" className="text-emerald-400 underline hover:text-emerald-300">View</a></p>
          <p className="text-slate-400">Week 3: Product + Pricing — <a href="/product" className="text-emerald-400 underline hover:text-emerald-300">Product</a> · <a href="/pricing" className="text-emerald-400 underline hover:text-emerald-300">Pricing</a></p>
          <p className="text-slate-400">Week 4: Marketing Engine — <a href="/marketing" className="text-emerald-400 underline hover:text-emerald-300">Marketing</a></p>
          <p className="text-slate-400">Week 5: Public Chatbot - <a href="/chat" className="text-emerald-400 underline hover:text-emerald-300">Chat</a></p>
           <p className="text-slate-400">Week 6: Coming Soon..
        </div>
      </section>

      <footer className="p-6 border-t border-slate-800 text-center text-slate-500 text-sm">
        Built with Next.js, Tailwind, GitHub, Vercel, and Supabase. | GymGen v0.4 | Student: Michelle Valenzuela
      </footer>
    </main>
  );
}
