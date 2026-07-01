export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 p-10">
      <h1 className="text-4xl font-bold mb-4">Project Docs</h1>

      <p className="mb-6">
        This page documents the builder infrastructure setup for the assignment.
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-10">
        <li>Frontend: Next.js</li>
        <li>Styling: Tailwind CSS</li>
        <li>Repository: GitHub</li>
        <li>Deployment: Vercel</li>
        <li>Data Layer: Supabase</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Prompt Library</h2>
      <p className="mb-4 text-slate-600">
        Prompts used to build GymGen:
      </p>

      <ol className="list-decimal pl-6 space-y-4 mb-10">
  <li>Week 1: Build a /core page with intake form, simulated AI output, save to Supabase core_outputs, and dashboard preview.</li>
  <li>Week 2: Build a /research page with competitor table, filter/search, 5 global benchmarks, Mexico localization, risk map, and save research records to Supabase.</li>
  <li>Week 3: Build /product page with feature map and customer segments. Build /pricing page with revenue calculator, monthly/annual toggle, assumptions table, and save scenarios to Supabase.</li>
  <li>Week 4: Upgrade homepage with GymGen branding. Build /marketing page with brand system, persona, 10 social posts, 3 video scripts, 14-day calendar, A/B tester, and save assets to Supabase.</li>
  <li>Week 5: Build /chat page with 3 intake questions, simulated response logic, guardrail, human checkpoint, thumbs up/down rating, and save sessions to Supabase.</li>
  <li>Week 6: Build /demo with guided walkthrough, agent map, impact check, and v2 roadmap. Build /dashboard reading from all 5 Supabase tables simultaneously.</li>
</ol>
      

      <a href="/" className="inline-block mt-4 text-blue-600 underline">
        Back to homepage
      </a>
    </main>
  );
}