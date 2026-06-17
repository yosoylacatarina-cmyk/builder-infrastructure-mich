'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const assumptions = [
  { tier: 'Free', price: '$0/mo', description: 'Basic routine generator only' },
  { tier: 'Freemium', price: '$5/mo', description: 'Save routines + AI personalization' },
  { tier: 'Pro', price: '$15/mo', description: 'All features + priority support' },
]

export default function PricingPage() {
  const [freeUsers, setFreeUsers] = useState(100)
  const [freemiumUsers, setFreemiumUsers] = useState(50)
  const [proUsers, setProUsers] = useState(20)
  const [isAnnual, setIsAnnual] = useState(false)
  const [scenarioName, setScenarioName] = useState('')
  const [savedScenarios, setSavedScenarios] = useState([])
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  const monthlyRevenue = (freemiumUsers * 5) + (proUsers * 15)
  const annualRevenue = monthlyRevenue * 12
  const displayRevenue = isAnnual ? annualRevenue : monthlyRevenue
  const totalUsers = Number(freeUsers) + Number(freemiumUsers) + Number(proUsers)
  const conversionRate = totalUsers > 0 ? (((Number(freemiumUsers) + Number(proUsers)) / totalUsers) * 100).toFixed(1) : 0

  useEffect(() => { fetchScenarios() }, [])

  async function fetchScenarios() {
    const { data } = await supabase
      .from('pricing_scenarios')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setSavedScenarios(data)
  }

  async function handleSave() {
    if (!scenarioName.trim()) { setSaveMsg('Please enter a scenario name.'); return }
    setSaving(true)
    setSaveMsg('')
    const { error } = await supabase
      .from('pricing_scenarios')
      .insert([{
        name: scenarioName,
        free_users: Number(freeUsers),
        freemium_users: Number(freemiumUsers),
        pro_users: Number(proUsers),
        monthly_revenue: monthlyRevenue,
      }])
    if (error) {
      setSaveMsg('Error saving. Check Supabase connection.')
    } else {
      setSaveMsg('Saved!')
      setScenarioName('')
      fetchScenarios()
    }
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <span className="font-bold text-lg">Gym Routine Generator</span>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="/" className="text-slate-400 hover:text-white">Home</a>
          <a href="/core" className="text-slate-400 hover:text-white">Core</a>
          <a href="/research" className="text-slate-400 hover:text-white">Research</a>
          <a href="/product" className="text-slate-400 hover:text-white">Product</a>
          <a href="/pricing" className="text-blue-400 font-semibold">Pricing</a>
          <a href="/docs" className="text-slate-400 hover:text-white">Docs</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div>
          <h1 className="text-3xl font-bold">Pricing Simulator</h1>
          <p className="text-slate-400 mt-1">Week 3 — Model revenue scenarios across Free, Freemium, and Pro tiers.</p>
        </div>

        {/* REVENUE SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-600 rounded-xl p-5">
            <p className="text-sm opacity-80">{isAnnual ? 'Annual' : 'Monthly'} Revenue</p>
            <p className="text-3xl font-bold">${displayRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <p className="text-sm text-slate-400">Total Users</p>
            <p className="text-3xl font-bold">{totalUsers.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <p className="text-sm text-slate-400">Paid Conversion</p>
            <p className="text-3xl font-bold">{conversionRate}%</p>
          </div>
        </div>

        {/* TOGGLE */}
        <div className="flex items-center gap-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-12 h-6 rounded-full transition ${isAnnual ? 'bg-blue-600' : 'bg-slate-700'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAnnual ? 'left-7' : 'left-1'}`} />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-slate-500'}`}>Annual</span>
          {isAnnual && <span className="text-xs bg-green-900 text-green-400 px-2 py-0.5 rounded-full">12x multiplier</span>}
        </div>

        {/* CALCULATOR */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-blue-400">User Distribution</h2>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-6">

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm text-slate-400">Free Users <span className="text-slate-600">($0/mo)</span></label>
                <span className="text-sm font-bold text-white">{freeUsers}</span>
              </div>
              <input type="range" min="0" max="1000" value={freeUsers}
                onChange={e => setFreeUsers(e.target.value)}
                className="w-full" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm text-slate-400">Freemium Users <span className="text-green-400">($5/mo)</span></label>
                <span className="text-sm font-bold text-white">{freemiumUsers} → ${(freemiumUsers * 5).toLocaleString()}/mo</span>
              </div>
              <input type="range" min="0" max="500" value={freemiumUsers}
                onChange={e => setFreemiumUsers(e.target.value)}
                className="w-full" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm text-slate-400">Pro Users <span className="text-purple-400">($15/mo)</span></label>
                <span className="text-sm font-bold text-white">{proUsers} → ${(proUsers * 15).toLocaleString()}/mo</span>
              </div>
              <input type="range" min="0" max="200" value={proUsers}
                onChange={e => setProUsers(e.target.value)}
                className="w-full" />
            </div>

            <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
              <span className="text-slate-400">Total {isAnnual ? 'Annual' : 'Monthly'} Revenue</span>
              <span className="text-2xl font-bold text-blue-400">${displayRevenue.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* ASSUMPTIONS */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-blue-400">Pricing Assumptions</h2>
          <div className="rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-slate-300">Tier</th>
                  <th className="px-4 py-3 text-left text-slate-300">Price</th>
                  <th className="px-4 py-3 text-left text-slate-300">What's included</th>
                </tr>
              </thead>
              <tbody>
                {assumptions.map((a, i) => (
                  <tr key={a.tier} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-950'}>
                    <td className="px-4 py-3 font-medium text-white">{a.tier}</td>
                    <td className="px-4 py-3 text-blue-400 font-bold">{a.price}</td>
                    <td className="px-4 py-3 text-slate-400">{a.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SAVE SCENARIO */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-blue-400">Save Scenario</h2>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={scenarioName}
                onChange={e => setScenarioName(e.target.value)}
                placeholder="e.g. Conservative launch, Optimistic Q2..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
            {saveMsg && (
              <p className={`text-sm mt-2 ${saveMsg === 'Saved!' ? 'text-green-400' : 'text-red-400'}`}>{saveMsg}</p>
            )}
          </div>
        </section>

        {/* SAVED SCENARIOS */}
        {savedScenarios.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-blue-400">Saved Scenarios</h2>
            <div className="space-y-3">
              {savedScenarios.map(s => (
                <div key={s.id} className="bg-slate-900 rounded-xl border border-slate-800 p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">{s.name}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Free: {s.free_users} · Freemium: {s.freemium_users} · Pro: {s.pro_users}
                    </p>
                    <p className="text-xs text-slate-500">{new Date(s.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-400 font-bold">${s.monthly_revenue?.toLocaleString()}/mo</p>
                    <p className="text-xs text-slate-500">${(s.monthly_revenue * 12)?.toLocaleString()}/yr</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}