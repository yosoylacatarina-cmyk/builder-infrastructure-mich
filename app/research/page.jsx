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
const [typeFilter, setTypeFilter] = useState('All')

const [topic, setTopic] = useState('')
  const [notes, setNotes] = useState('')
  const [savedRecords, setSavedRecords] = useState([])
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  const filtered = competitors.filter(c => {
  const matchesSearch =
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.type.toLowerCase().includes(filter.toLowerCase()) ||
    c.focus.toLowerCase().includes(filter.toLowerCase())

  const matchesType =
    typeFilter === 'All' || c.type === typeFilter

  return matchesSearch && matchesType
})

  useEffect(() => {
    fetchRecords()
  }, [])

  async function fetchRecords() {
    const { data } = await supabase
      .from('research_records')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setSavedRecords(data)
  }

  async function handleSave() {
    if (!topic.trim()) { setSaveMsg('Please enter a topic.'); return }
    setSaving(true)
    setSaveMsg('')
    const { error } = await supabase
      .from('research_records')
      .insert([{ topic, notes }])
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-lg">Gym Routine Generator</span>
        <div className="flex gap-6 text-sm">
          <a href="/" className="hover:text-blue-400">Home</a>
          <a href="/research" className="text-blue-400 font-semibold">Research</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research + Benchmarking Dashboard</h1>
          <p className="text-gray-700 mt-1">Week 2 — Prove the problem is real. Identify competitors, substitutes, and gaps.</p>
        </div>

        <div className="bg-blue-600 text-white rounded-xl px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Saved Research Records</p>
            <p className="text-4xl font-bold">{savedRecords.length}</p>
          </div>
          <div className="text-5xl opacity-20">📋</div>
        </div>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Research Intake</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Competitor pricing models in Mexico"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Write your research findings here..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save to Supabase'}
              </button>
              {saveMsg && (
                <span className={`text-sm font-medium ${saveMsg === 'Saved!' ? 'text-green-600' : 'text-red-500'}`}>
                  {saveMsg}
                </span>
              )}
            </div>
          </div>
        </section>

       <div className="flex gap-3 mb-4">
  <input
    type="text"
    value={filter}
    onChange={e => setFilter(e.target.value)}
    placeholder="Filter by name, type, or focus..."
    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
  />

  <select
    value={typeFilter}
    onChange={(e) => setTypeFilter(e.target.value)}
    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
  >
    <option value="All">All Types</option>
    <option value="App">App</option>
    <option value="Platform">Platform</option>
  </select>
</div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-900 text-white">
                <tr>
                  {['Competitor', 'Type', 'Price', 'Focus', 'Mexico', 'Gap'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600">{c.type}</td>
                    <td className="px-4 py-3 text-gray-600">{c.price}</td>
                    <td className="px-4 py-3 text-gray-600">{c.focus}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.mexico === 'Yes' ? 'bg-green-100 text-green-700' : c.mexico === 'Limited' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {c.mexico}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 italic">{c.gap}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-400">No results found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">5 Global Benchmarks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benchmarks.map(b => (
              <div key={b.title} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{b.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{b.tag}</span>
                </div>
                <p className="text-sm text-gray-600">{b.insight}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Mexico Localization</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
            <div className="flex gap-3 items-start">
              <span className="text-2xl">🇲🇽</span>
              <div>
                <p className="font-medium text-gray-900">Market Opportunity</p>
                <p className="text-sm text-gray-600">Mexico has 130M+ people with growing gym culture. Apps like Nike Training Club and MyFitnessPal are available but not localized for Mexican gym culture, pricing, or Spanish UX patterns.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-2xl">💰</span>
              <div>
                <p className="font-medium text-gray-900">Pricing Context</p>
                <p className="text-sm text-gray-600">Paid apps at $10-15 USD/month are expensive for average Mexican users. A free or low-cost tool with local relevance has a clear opening.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-medium text-gray-900">User Behavior</p>
                <p className="text-sm text-gray-600">Heavy mobile usage. WhatsApp sharing culture means social/export features could drive organic growth. Spanish-first UX is non-negotiable.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Risk Map</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Risk</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Level</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((r, i) => (
                  <tr key={r.risk} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-gray-900">{r.risk}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.level === 'High' ? 'bg-red-100 text-red-700' : r.level === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {r.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {savedRecords.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Saved Research Output</h2>
            <div className="space-y-3">
              {savedRecords.map(r => (
                <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="font-medium text-gray-900">{r.topic}</p>
                  {r.notes && <p className="text-sm text-gray-600 mt-1">{r.notes}</p>}
                  <p className="text-xs text-gray-400 mt-2">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}