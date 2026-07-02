'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function DashboardPage() {
  const [data, setData] = useState({
    core_outputs: [],
    research_records: [],
    pricing_scenarios: [],
    marketing_assets: [],
    chat_sessions: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      const [core, research, pricing, marketing, chat] = await Promise.all([
supabase.from('core_outputs').select('*').order('created_at', { ascending: false }),
supabase.from('research_records').select('*').order('created_at', { ascending: false }),
supabase.from('pricing_scenarios').select('*').order('created_at', { ascending: false }),
supabase.from('marketing_assets').select('*').order('created_at', { ascending: false }),
supabase.from('chat_sessions').select('*').order('created_at', { ascending: false }),
      setData({
        core_outputs: core.data || [],
        research_records: research.data || [],
        pricing_scenarios: pricing.data || [],
        marketing_assets: marketing.data || [],
        chat_sessions: chat.data || [],
      })
      setLoading(false)
    }
    fetchAll()
  }, [])

  const tables = [
    {
      key: 'core_outputs',
      title: 'Gym Routines',
      week: 'Week 1',
      icon: '🏋️',
      color: 'border-blue-600',
      badge: 'bg-blue-900 text-blue-400',
      renderRow: (r) => r.title,
    },
    {
      key: 'research_records',
      title: 'Research Records',
      week: 'Week 2',
      icon: '🔍',
      color: 'border-purple-600',
      badge: 'bg-purple-900 text-purple-400',
      renderRow: (r) => r.topic,
    },
    {
      key: 'pricing_scenarios',
      title: 'Pricing Scenarios',
      week: 'Week 3',
      icon: '💰',
      color: 'border-yellow-600',
      badge: 'bg-yellow-900 text-yellow-400',
      renderRow: (r) => `${r.name} — $${r.monthly_revenue}/mo`,
    },
    {
      key: 'marketing_assets',
      title: 'Marketing Assets',
      week: 'Week 4',
      icon: '📣',
      color: 'border-pink-600',
      badge: 'bg-pink-900 text-pink-400',
      renderRow: (r) => r.title,
    },
    {
      key: 'chat_sessions',
      title: 'Chat Sessions',
      week: 'Week 5',
      icon: '💬',
      color: 'border-emerald-600',
      badge: 'bg-emerald-900 text-emerald-400',
      renderRow: (r) => r.summary?.substring(0, 60) + '...',
    },
  ]

  const totalRecords = Object.values(data).reduce((sum, arr) => sum + arr.length, 0)

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
          <a href="/dashboard" className="text-emerald-400 font-semibold">Dashboard</a>
          <a href="/demo" className="text-slate-400 hover:text-white">Demo</a>
          <a href="/docs" className="text-slate-400 hover:text-white">Docs</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        <div>
          <h1 className="text-3xl font-bold">GymGen Dashboard</h1>
          <p className="text-slate-400 mt-1">Week 6 — Unified view of all Supabase records across every module.</p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-emerald-600 rounded-xl p-5 md:col-span-1">
            <p className="text-sm opacity-80">Total Records</p>
            <p className="text-4xl font-bold">{loading ? '...' : Object.values(data).reduce((s, a) => s + a.length, 0) * 1 }</p>
            <p className="text-xs opacity-70 mt-1">Across all 5 tables</p>
          </div>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <p className="text-sm text-slate-400">Tables Active</p>
            <p className="text-4xl font-bold">5</p>
            <p className="text-xs text-slate-500 mt-1">Supabase tables</p>
          </div>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <p className="text-sm text-slate-400">Weeks Built</p>
            <p className="text-4xl font-bold">6</p>
            <p className="text-xs text-slate-500 mt-1">Full venture complete</p>
          </div>
        </div>

        {/* TABLE SECTIONS */}
        {loading ? (
          <p className="text-slate-400 text-center py-10">Loading all records...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tables.map(table => (
              <div key={table.key} className={`bg-slate-900 rounded-xl border-2 ${table.color} p-5`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{table.icon}</span>
                    <div>
                      <h3 className="font-bold text-white">{table.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${table.badge}`}>{table.week}</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-white">{data[table.key].length}</span>
                </div>
                {data[table.key].length === 0 ? (
                  <p className="text-slate-500 text-sm">No records yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {data[table.key].map(r => (
                      <li key={r.id} className="bg-slate-800 rounded-lg px-3 py-2">
                        <p className="text-sm text-slate-300 truncate">{table.renderRow(r)}</p>
                        <p className="text-xs text-slate-500">{new Date(r.created_at).toLocaleDateString()}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <a href="/demo" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl transition">
            View Full Demo →
          </a>
        </div>

      </div>
    </div>
  )
}
