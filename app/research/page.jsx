'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const competitors = [
  { name: 'Nike Training Club', type: 'App', price: 'Free', focus: 'Guided workouts', mexico: 'Yes', gap: 'No AI personalization' },
  { name: 'Jefit', type: 'App', price: 'Freemium', focus: 'Strength tracking', mexico: 'Yes', gap: 'Complex UI' },
  { name: 'Fitbod', type: 'App', price: 'Paid', focus: 'AI routines', mexico: 'Limited', gap: 'Expensive' },
  { name: 'MyFitnessPal', type: 'App', price: 'Freemium', focus: 'Nutrition + fitness', mexico: 'Yes', gap: 'Not gym-focused' },
  { name: 'Strong', type: 'App', price: 'Freemium', focus: 'Powerlifting logs', mexico: 'No', gap: 'No routine generator' },
  { name: 'Freeletics', type: 'App', price: 'Paid', focus: 'Bodyweight training', mexico: 'Limited', gap: 'No weights focus' },
  { name: 'GymShark App', type: 'App', price: 'Free', focus: 'Brand workouts', mexico: 'No', gap: 'Limited customization' },
  { name: 'Google Fit', type: 'Platform', price: 'Free', focus: 'Activity tracking', mexico: 'Yes', gap: 'No routine builder' },
]

const benchmarks = [
  { title: 'Fitbod (USA)', insight: 'Uses ML to adapt routines based on muscle recovery. Sets the bar for AI personalization in fitness.', tag: 'AI-Powered' },
  { title: 'Hevy (Canada)', insight: 'Simple, clean workout logger with social sharing. Proves minimalist UX wins in this category.', tag: 'UX Leader' },
  { title: 'Freeletics (Germany)', insight: 'Strong subscription model in Europe. Shows willingness to pay for personalized coaching.', tag: 'Monetization' },
  { title: 'Sweat (Australia)', insight: 'Dominated female fitness market globally. Niche focus + community = retention.', tag: 'Community' },
  { title: 'WHOOP (USA)', insight: 'Wearable + app combo that charges monthly. Premium positioning works if value is clear.', tag: 'Premium' },
]

const risks = [
  { risk: 'Low user retention', level: 'High', mitigation: 'Add save + history features to bring users back' },
  { risk: 'AI output is generic', level: 'High', mitigation: 'Personalize by fitness level and available equipment' },
  { risk: 'Competitors have more features', level: 'Medium', mitigation: 'Focus on simplicity and Mexico-specific content' },
  { risk: 'Supabase free tier limits', level: 'Low', mitigation: 'Monitor usage; upgrade if traffic grows' },
  { risk: 'Mobile UX is poor', level: 'Medium', mitigation: 'Test on phone early; use Tailwind responsive classes' },
]

export default function ResearchPage() {
  const [filter, setFilter] = useState('')
  const [topic, setTopic] = useState('')
  const [notes, setNotes] = useState('')
  const [savedRecords, setSavedRecords] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  const filtered = competitors.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.type.toLowerCase().includes(filter.toLowerCase()) ||
    c.focus.toLowerCase().includes(filter.toLowerCase())
  )

  useEffect(() => { fetchRecords() }, [])

  async function fetchRecords() {
    const { data } = await supabase.from('research_records').select('*').order('created_at', { ascending: false })
    if (data) setSavedRecords(data)
  }

  async function handleSave() {
    if (!topic.trim()) { setSaveMsg('Please enter a topic.'); return }
    setSaving(true)
    setSaveMsg('')
    const { error } = await supabase.from('research_records').insert([{ topic, notes }])
    if (error) {
      setSaveMsg('Error saving. Check Supabase connection.')
    } else {
      setSaveMsg('Saved!')
      setTopic('')
      setNotes('')
      fetchRecords()
    }
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <span className="font-bold text-lg">Gym Routine Generator</span>
        <div className="flex gap-6 text-sm">
          <a href="/" className="text-slate-400 hover:text-white">Home</a>
          <a href="/core" className="text-slate-400 hover:text-white">Core</a>
          <a href="/research" className="text-blue-400 font-semibold">Research</a>
          <a href="/docs" className="text-slate-400 hover:text-white">Docs</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

        <div>
          <h1 className="text-3xl font-bold">Research + Benchmarking Dashboard</h1>
          <p className="text-slate-400 mt-1">Week 2 — Prove the problem is real. Identify competitors, substitutes, and gaps.</p>
        </div>

        <div className="bg-blue-600 rounded-xl px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Saved Research Records</p>
            <p className="text-4xl font-bold">{savedRecords.length}</p>
          </div>
          <div className="text-5xl opacity-20">📋</div>
        </div>

        <section>
          <h2 className="text-xl font-bold mb-4 text-blue-400">Research Intake</h2>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Competitor pricing models in Mexico"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Write your research findings here..."
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition"
              >
                {saving ? 'Saving...' : 'Save to Supabase'}
              </button>
              {saveMsg && (
                <span className={`text-sm font-medium ${saveMsg === 'Saved!' ? 'text-green-400' : 'text-red-400'}`}>
                  {saveMsg}
                </span>
              )}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-blue-400">Competitor Analysis</h2>
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Filter by name, type, or focus..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 mb-4 focus:outline-none focus:border-blue-500"
          />
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  {['Competitor', 'Type', 'Price', 'Focus', 'Mexico', 'Gap'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-medium text-slate-300">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.name} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-950'}>
                    <td className="px-4 py-3 font-medium text-white">{c.name}</td>
                    <td className="px-4 py-3 text-slate-400">{c.type}</td>
                    <td className="px-4 py-3 text-slate-400">{c.price}</td>
                    <td className="px-4 py-3 text-slate-400">{c.focus}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.mexico === 'Yes' ? 'bg-green-900 text-green-400' : c.mexico === 'Limited' ? 'bg-yellow-900 text-yellow-400' : 'bg-red-900 text-red-400'}`}>
                        {c.mexico}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 italic">{c.gap}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-6 text-center text-slate-500">No results found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-blue-400">5 Global Benchmarks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benchmarks.map(b => (
              <div key={b.title} className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{b.title}</h3>
                  <span className="text-xs bg-blue-900 text-blue-400 px-2 py-0.5 rounded-full">{b.tag}</span>
                </div>
                <p className="text-sm text-slate-400">{b.insight}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-blue-400">Mexico Localization</h2>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4">
            <div className="flex gap-3 items-start">
              <span className="text-2xl">🇲🇽</span>
              <div>
                <p className="font-medium text-white">Market Opportunity</p>
                <p className="text-sm text-slate-400">Mexico has 130M+ people with growing gym culture. Apps like Nike Training Club and MyFitnessPal are available but not localized for Mexican gym culture, pricing, or Spanish UX patterns.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-2xl">💰</span>
              <div>
                <p className="font-medium text-white">Pricing Context</p>
                <p className="text-sm text-slate-400">Paid apps at $10-15 USD/month are expensive for average Mexican users. A free or low-cost tool with local relevance has a clear opening.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-medium text-white">User Behavior</p>
                <p className="text-sm text-slate-400">Heavy mobile usage. WhatsApp sharing culture means social/export features could drive organic growth. Spanish-first UX is non-negotiable.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-blue-400">Risk Map</h2>
          <div className="rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Risk</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Level</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((r, i) => (
                  <tr key={r.risk} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-950'}>
                    <td className="px-4 py-3 text-white">{r.risk}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.level === 'High' ? 'bg-red-900 text-red-400' : r.level === 'Medium' ? 'bg-yellow-900 text-yellow-400' : 'bg-green-900 text-green-400'}`}>
                        {r.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {savedRecords.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-blue-400">Saved Research Output</h2>
            <div className="space-y-3">
              {savedRecords.map(r => (
                <div key={r.id} className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <p className="font-medium text-white">{r.topic}</p>
                  {r.notes && <p className="text-sm text-slate-400 mt-1">{r.notes}</p>}
                  <p className="text-xs text-slate-500 mt-2">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}