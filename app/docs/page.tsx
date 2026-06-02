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
      <p className="mb-4 text-slate-600">Prompts used to build the Gym Routine Generator (Week 1):</p>

      <ol className="list-decimal pl-6 space-y-4 mb-10">
        <li className="text-slate-700">Build a /core page in Next.js with Tailwind CSS with an intake form with 3 fields: fitness goal, experience level, and days per week.</li>
        <li className="text-slate-700">Add a simulated AI output function that generates a structured weekly gym routine. Label the output card clearly as AI Simulated Output.</li>
        <li className="text-slate-700">Create a save button that inserts the routine into a Supabase core_outputs table with title and content fields.</li>
        <li className="text-slate-700">Add a dashboard preview section that fetches and displays all saved routines from Supabase.</li>
        <li className="text-slate-700">Update the /docs page to include a Prompt Library section documenting the prompts used this week.</li>
      </ol>

      <a href="/" className="inline-block mt-4 text-blue-600 underline">
        Back to homepage
      </a>
    </main>
  );
}