export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">Builder Infrastructure</h1>
        <div className="flex gap-6">
  <a href="/core" className="text-blue-400 hover:underline">Core</a>
  <a href="/docs" className="text-blue-400 hover:underline">Docs</a>
</div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-bold mb-6">
          Setup Sprint: Builder Infrastructure
        </h2>

        <p className="text-lg text-slate-300 mb-8">
          This project shows a working website built with Next.js and Tailwind,
          saved on GitHub, deployed with Vercel, and supported by Supabase.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
            <h3 className="font-bold mb-2">GitHub</h3>
            <p className="text-slate-400">Code repository and commit history.</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
            <h3 className="font-bold mb-2">Vercel</h3>
            <p className="text-slate-400">Live deployment of the website.</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
            <h3 className="font-bold mb-2">Supabase</h3>
            <p className="text-slate-400">Data layer for future app features.</p>
          </div>
        </div>
      </section>
      <section className="mt-12 text-center px-6 pb-12">
        <h2 className="text-xl font-bold text-white mb-4">Project Roadmap</h2>
        <p className="text-slate-400">Week 0: Builder Infrastructure (complete) </p>
        <p className="text-slate-400">Week 1: Gym Routine Generator — <a href="/core" className="text-blue-400 underline hover:text-blue-300">Try it →</a></p>
        <p className="text-slate-400">Week 2: Research + Benchmarking — <a href="/research" className="text-blue-400 hover:underline">View →</a></p>
        
      </section>
      

      <footer className="p-6 border-t border-slate-800 text-center text-slate-400">
       Built with Next.js, Tailwind, GitHub, Vercel, and Supabase. | Student: Michelle
      </footer>
    </main>
  );
}