export default function DocsPage() {
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
          <a href="/demo" className="text-slate-400 hover:text-white">Demo</a>
          <a href="/docs" className="text-emerald-400 font-semibold">Docs</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Project Docs</h1>
          <p className="text-slate-400 mt-1">Build logs, prompt library, and tech stack documentation for GymGen.</p>
        </div>

        <section>
          <h2 className="text-xl font-bold mb-4 text-emerald-400">Tech Stack</h2>
          <ul className="space-y-2 text-slate-300">
            <li>• Frontend: Next.js 14 (App Router)</li>
            <li>• Styling: Tailwind CSS</li>
            <li>• Repository: GitHub (builder-infrastructure-mich)</li>
            <li>• Deployment: Vercel</li>
            <li>• Data Layer: Supabase (PostgreSQL)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-emerald-400">Prompt Library — All 6 Weeks</h2>
          <p className="text-slate-400 mb-4 text-sm">Prompts used to build GymGen week by week:</p>
          <ol className="space-y-4 list-decimal pl-6">
            <li className="text-slate-300">Week 1: Build a /core page with intake form (goal, level, days), simulated AI routine generator labeled as simulated, save to Supabase core_outputs table, and dashboard preview of saved routines.</li>
            <li className="text-slate-300">Week 2: Build a /research page with competitor analysis table with filter/search, 5 global benchmarks, Mexico localization section, risk map, and save research records to Supabase research_records table.</li>
            <li className="text-slate-300">Week 3: Build /product page with feature map grid (Free/Freemium/Pro tiers) and 2 customer segment cards. Build /pricing page with revenue calculator using sliders, monthly/annual toggle, assumptions table, and save scenarios to Supabase pricing_scenarios table.</li>
            <li className="text-slate-300">Week 4: Upgrade homepage with GymGen branding, hero section, and CTA. Build /marketing page with brand system, target persona, 10 social posts with copy buttons, 3 video scripts, 14-day campaign calendar, A/B headline tester, and save assets to Supabase marketing_assets table.</li>
            <li className="text-slate-300">Week 5: Build /chat page with chat UI, 3 intake questions flow, simulated fitness response logic, guardrail response for off-topic messages, human checkpoint after 5 messages, thumbs up/down rating, and save sessions to Supabase chat_sessions table.</li>
            <li className="text-slate-300">Week 6: Build /demo page with 7-step guided walkthrough, agent map, practical impact check, and Version 2 roadmap. Build /dashboard that reads from all 5 Supabase tables simultaneously and displays record counts and recent entries.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-emerald-400">Supabase Tables</h2>
          <ul className="space-y-2 text-slate-300">
            <li>• <span className="font-mono text-emerald-400">core_outputs</span> — Week 1: saved gym routines</li>
            <li>• <span className="font-mono text-emerald-400">research_records</span> — Week 2: saved research notes</li>
            <li>• <span className="font-mono text-emerald-400">pricing_scenarios</span> — Week 3: saved revenue scenarios</li>
            <li>• <span className="font-mono text-emerald-400">marketing_assets</span> — Week 4: saved marketing content</li>
            <li>• <span className="font-mono text-emerald-400">chat_sessions</span> — Week 5: saved chat sessions</li>
          </ul>
        </section>

        <a href="/" className="inline-block text-emerald-400 hover:underline text-sm">← Back to homepage</a>
      </div>
    </div>
  )
}