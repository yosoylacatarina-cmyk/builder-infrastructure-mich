export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 p-10">
      <h1 className="text-4xl font-bold mb-4">Project Docs</h1>

      <p className="mb-6">
        This page documents the builder infrastructure setup for the assignment.
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Frontend: Next.js</li>
        <li>Styling: Tailwind CSS</li>
        <li>Repository: GitHub</li>
        <li>Deployment: Vercel</li>
        <li>Data Layer: Supabase</li>
      </ul>

      <a href="/" className="inline-block mt-8 text-blue-600 underline">
        Back to homepage
      </a>
    </main>
  );