export default function DemoPage() {
  const steps = [
    {
      week: 'Week 0',
      title: 'Builder Infrastructure',
      page: '/',
      description: 'The foundation — Next.js + Tailwind + GitHub + Vercel + Supabase all connected and deployed. Homepage with navbar, footer, and /docs placeholder.',
      link: '/',
    },
    {
      week: 'Week 1',
      title: 'Gym Routine Generator',
      page: '/core',
      description: 'The core product — intake form (goal, level, days), simulated AI routine generator, save to Supabase, and saved routines dashboard.',
      link: '/core',
    },
    {
      week: 'Week 2',
      title: 'Research + Benchmarking',
      page: '/research',
      description: 'Market validation — 8 competitors, 5 global benchmarks, Mexico localization analysis, risk map, and saved research records.',
      link: '/research',
    },
    {
      week: 'Week 3',
      title: 'Product Architecture + Pricing',
      page: '/product + /pricing',
      description: 'Business model — feature map across 3 tiers (Free/Freemium/Pro), 2 customer segments, interactive revenue calculator, saved pricing scenarios.',
      link: '/product',
    },
    {
      week: 'Week 4',
      title: 'Marketing Engine',
      page: '/marketing',
      description: 'Go-to-market — GymGen brand system, target persona, 10 social posts, 3 video scripts, 14-day campaign calendar, A/B headline tester.',
      link: '/marketing',
    },
    {
      week: 'Week 5',
      title: 'Fitness Assistant Chatbot',
      page: '/chat',
      description: 'Public-facing AI assistant — 3 intake questions, personalized fitness guidance, guardrail responses, human checkpoint, thumbs up/down rating.',
      link: '/chat',
    },
    {
      week: 'Week 6',
      title: 'Integrated Venture',
      page: '/dashboard + /demo',
      description: 'Final integration — unified dashboard showing all Supabase records, guided demo walkthrough, agent map, impact check, and Version 2 roadmap.',
      link: '/dashboard',
    },
  ]

  const agentMap = [
    { from: 'Homepage /', to: 'Core /core', desc: 'CTA button' },
    { from: 'Core /core', to: 'Supabase', desc: 'Saves routines' },
    { from: 'Research /research', to: 'Supabase', desc: 'Saves records' },
    { from: 'Pricing /pricing', to: 'Supabase', desc: 'Saves scenarios' },
    { from: 'Marketing /marketing', to: 'Supabase', desc: 'Saves assets' },
    { from: 'Chat /chat', to: 'Supabase', desc: 'Saves sessions' },
    { from: 'Dashboard /dashboard', to: 'Supabase', desc: 'Reads all tables' },
    { from: 'Product /product', to: 'Pricing /pricing', desc: 'Links to simulator' },
  ]

  const v2Features = [
    { title: 'Real AI Integration', desc: 'Connect to Anthropic API for truly dynamic responses in /core and /chat instead of simulated output.' },
    { title: 'User Authentication', desc: 'Supabase Auth for user accounts — save routines to personal profiles and track history over time.' },
    { title: 'Spanish Language Support', desc: 'Full Spanish UI for the Mexican market — the most impactful localization feature from Week 2 research.' },
    { title: 'Progress Tracking', desc: 'Log completed workouts, track weights over time, visualize strength gains with charts.' },
    { title: 'Social Sharing', desc: 'Export routine as an image or share via WhatsApp — leverages Mexico\'s WhatsApp-first culture.' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <span className="font-bold text-lg text-emerald-400">GymGen</span>
        <div className="flex gap-4 text-sm flex-wrap">
          <a href="/" className="text-slate-400 hover:text-white">Home</a>
          <a href="/core" className="text-slate-400 hover:text-white">Core</a>
          <a href="/research" className="text-slate-400 hover:text-white">Research</a>
          <a href="/product" className="text-slate-400 hover:text-white">Product</a>
          <a href="/pricing" className="text-slate-400 hover:text-white">Pricing</a>
          <a href="/marketing" className="text-slate-400 hover:text-white">Marketing</a>
          <a href="/chat" className="text-slate-400 hover:text-white">Chat</a>
          <a href="/dashboard" className="text-slate-400 hover:text-white">Dashboard</a>
          <a href="/demo" className="text-emerald-400 font-semibold">Demo</a>
          <a href="/docs" className="text-slate-400 hover:text-white">Docs</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-16">

        <div>
          <h1 className="text-3xl font-bold">GymGen — Full Venture Demo</h1>
          <p className="text-slate-400 mt-1">Week 6 — Integrated walkthrough of all 6 modules, agent map, impact check, and Version 2 roadmap.</p>
        </div>

        {/* GUIDED WALKTHROUGH */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-emerald-400">Guided Walkthrough — 7 Steps</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.week} className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex gap-6 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className="text-xs text-emerald-400 font-bold">{step.week}</span>
                      <h3 className="font-bold text-white text-lg">{step.title}</h3>
                      <span className="text-xs text-slate-500 font-mono">{step.page}</span>
                    </div>
                    <a href={step.link}
                      className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-1.5 rounded-lg transition flex-shrink-0 ml-4">
                      Visit →
                    </a>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AGENT MAP */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-emerald-400">Agent Map — How GymGen Modules Connect</h2>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {['/ Homepage', '/core', '/research', '/product', '/pricing', '/marketing', '/chat', '/dashboard', '/demo', '/docs'].map(page => (
                <div key={page} className="bg-slate-800 rounded-lg px-3 py-2 text-center text-sm text-emerald-400 font-mono border border-slate-700">
                  {page}
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700 pt-4">
              <p className="text-xs text-slate-500 mb-3">Data connections:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {agentMap.map((conn, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-slate-300 font-mono text-xs">{conn.from}</span>
                    <span className="text-emerald-400">→</span>
                    <span className="text-slate-300 font-mono text-xs">{conn.to}</span>
                    <span className="text-slate-500 text-xs">({conn.desc})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRACTICAL IMPACT */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-emerald-400">Practical Impact Check</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Who it helps', desc: 'Gym-goers and fitness beginners in Mexico aged 18-30 who want structured workout plans but cannot afford a personal trainer or paid apps.' },
              { icon: '🔧', title: 'Problem solved', desc: 'The confusion of not knowing what to do at the gym. GymGen removes that friction with a personalized plan in under 30 seconds — free.' },
              { icon: '💡', title: 'Value created', desc: 'Time saved, confidence from having a real plan, and accessibility — the free tier removes the price barrier that blocks most Mexican users from paid fitness apps.' },
              { icon: '🛡️', title: 'Harm avoided', desc: 'All AI output is labeled as simulated. The chatbot includes a human checkpoint reminding users to consult a real trainer. No sensitive health data is collected.' },
            ].map(item => (
              <div key={item.title} className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VERSION 2 ROADMAP */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-emerald-400">Version 2 Roadmap</h2>
          <div className="space-y-3">
            {v2Features.map((f, i) => (
              <div key={f.title} className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-bold text-emerald-400">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white">{f.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LINKS */}
        <section className="text-center">
          <h2 className="text-xl font-bold mb-6 text-emerald-400">Explore GymGen</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'Generate a Routine', href: '/core' },
              { label: 'View Research', href: '/research' },
              { label: 'See Pricing', href: '/pricing' },
              { label: 'Marketing Engine', href: '/marketing' },
              { label: 'Chat with Assistant', href: '/chat' },
              { label: 'View Dashboard', href: '/dashboard' },
            ].map(link => (
              <a key={link.href} href={link.href}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-5 py-2 rounded-xl text-sm transition">
                {link.label}
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
