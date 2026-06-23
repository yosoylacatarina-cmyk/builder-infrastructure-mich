'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const socialPosts = [
  { id: 1, platform: 'Instagram', copy: "Stop guessing at the gym. GymGen builds your personalized workout in seconds — just tell us your goal and we handle the rest. Try it free." },
  { id: 2, platform: 'Instagram', copy: "Beginner at the gym? No trainer? No problem. GymGen gives you a full weekly routine based on your level and goals. 100% free to start." },
  { id: 3, platform: 'Twitter/X', copy: "I built an AI gym routine generator. Tell it your goal + days available = full weekly plan. Free to use. Link in bio." },
  { id: 4, platform: 'Twitter/X', copy: "The gym doesn't have to be confusing. GymGen: input your goal → get a structured routine → save it → show up. That's it." },
  { id: 5, platform: 'TikTok', copy: "POV: you finally have a gym routine that actually matches YOUR goals, not some random YouTube video. GymGen did that." },
  { id: 6, platform: 'TikTok', copy: "What I tell GymGen: 'build muscle, intermediate, 4 days.' What I get: a full weekly plan with sets, reps, and muscle groups. Free." },
  { id: 7, platform: 'LinkedIn', copy: "Built a gym routine generator this semester using Next.js, Supabase, and AI simulation. It personalizes workouts by goal, level, and days available. Try it at the link." },
  { id: 8, platform: 'WhatsApp Status', copy: "GymGen generates your gym routine for free. Select your goal, level, and days — done. Perfect for anyone starting out or changing goals." },
  { id: 9, platform: 'Instagram Story', copy: "New workout who dis? GymGen just made me a full week of training based on my goals. Swipe up to try it free." },
  { id: 10, platform: 'Facebook', copy: "If you've ever walked into the gym not knowing what to do — GymGen is for you. Free personalized workout plans based on your goal and experience level. No sign-up needed." },
]

const videoScripts = [
  {
    duration: '30 seconds',
    title: 'Quick Hook',
    script: `[0-3s] Show someone looking confused at the gym.
[3-8s] Text on screen: "Don't know what to do at the gym?"
[8-15s] Switch to GymGen on phone. Fill in: "Build muscle / Intermediate / 4 days."
[15-22s] Show the generated routine appearing on screen.
[22-28s] Text: "Your routine. Free. In seconds."
[28-30s] Show URL: gymgen.app`
  },
  {
    duration: '60 seconds',
    title: 'Problem + Solution',
    script: `[0-5s] "I used to spend 20 minutes on YouTube before every gym session just figuring out what to do."
[5-15s] "Then I built GymGen. You tell it your goal, your level, and how many days you can train."
[15-25s] Show the form being filled in. Goal: lose weight. Level: beginner. Days: 3.
[25-35s] "It generates a full weekly plan — with days, muscle groups, sets, and reps."
[35-45s] "You can save it, come back to it, and track your progress over time."
[45-55s] "It's free to start. No sign-up. No trainer needed."
[55-60s] "GymGen. Your gym routine, personalized. Try it now."`
  },
  {
    duration: '90 seconds',
    title: 'Full Story',
    script: `[0-10s] "Okay so I have a confession. I've been going to the gym for 6 months and I still had no idea if I was doing the right things."
[10-20s] "I'd copy random routines online that weren't made for my goal, my level, or my schedule."
[20-35s] "So I built something. It's called GymGen. You put in three things: what you want to achieve, your experience level, and how many days a week you can train."
[35-50s] Show the generator working. Walk through each field. Show the output card.
[50-60s] "It gives you a full weekly routine — organized by day, muscle group, and exercise. With actual sets and reps."
[60-70s] "You can save it to your account and come back to it whenever. And there's a dashboard showing everything you've saved."
[70-80s] "The free version is completely free. No credit card. If you want to save more routines or get AI personalization, there's a paid plan — but seriously, the free one is enough to get started."
[80-90s] "Link is in my bio. Try it. It takes like 30 seconds."`
  },
]

const calendar = [
  { day: 1, content: 'Instagram post: Beginner hook', type: 'Social' },
  { day: 2, content: 'TikTok: POV routine reveal', type: 'Video' },
  { day: 3, content: 'Twitter: Product launch thread', type: 'Social' },
  { day: 4, content: 'Rest day — schedule next week content', type: 'Planning' },
  { day: 5, content: 'Instagram Story: Feature highlight', type: 'Social' },
  { day: 6, content: 'LinkedIn: Builder story post', type: 'Social' },
  { day: 7, content: 'WhatsApp Status: Free tool CTA', type: 'Social' },
  { day: 8, content: 'TikTok: 60-sec problem/solution video', type: 'Video' },
  { day: 9, content: 'Instagram: Social proof post', type: 'Social' },
  { day: 10, content: 'Twitter: Pricing reveal thread', type: 'Social' },
  { day: 11, content: 'Rest day', type: 'Planning' },
  { day: 12, content: 'Instagram Story: A/B test headline', type: 'Social' },
  { day: 13, content: 'TikTok: Full 90-sec story video', type: 'Video' },
  { day: 14, content: 'Facebook: Community share post', type: 'Social' },
]

const headlines = [
  { id: 'a', text: 'Your personalized gym routine, generated in seconds.' },
  { id: 'b', text: 'Stop guessing at the gym. GymGen knows what you need.' },
]

export default function MarketingPage() {
  const [copied, setCopied] = useState(null)
  const [winner, setWinner] = useState(null)
  const [assetTitle, setAssetTitle] = useState('')
  const [assetContent, setAssetContent] = useState('')
  const [savedAssets, setSavedAssets] = useState([])
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => { fetchAssets() }, [])

  async function fetchAssets() {
    const { data } = await supabase.from('marketing_assets').select('*').order('created_at', { ascending: false })
    if (data) setSavedAssets(data)
  }

  async function handleCopy(text, id) {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  async function handleSave() {
    if (!assetTitle.trim()) { setSaveMsg('Please enter a title.'); return }
    setSaving(true)
    setSaveMsg('')
    const { error } = await supabase.from('marketing_assets').insert([{ title: assetTitle, content: assetContent }])
    if (error) {
      setSaveMsg('Error saving.')
    } else {
      setSaveMsg('Saved!')
      setAssetTitle('')
      setAssetContent('')
      fetchAssets()
    }
    setSaving(false)
  }

  const typeColor = (type) => {
    if (type === 'Video') return 'bg-purple-900 text-purple-400'
    if (type === 'Planning') return 'bg-slate-700 text-slate-400'
    return 'bg-blue-900 text-blue-400'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <span className="font-bold text-lg text-emerald-400">GymGen</span>
        <div className="flex gap-6 text-sm">
          <a href="/" className="text-slate-400 hover:text-white">Home</a>
          <a href="/core" className="text-slate-400 hover:text-white">Core</a>
          <a href="/research" className="text-slate-400 hover:text-white">Research</a>
          <a href="/product" className="text-slate-400 hover:text-white">Product</a>
          <a href="/pricing" className="text-slate-400 hover:text-white">Pricing</a>
          <a href="/marketing" className="text-emerald-400 font-semibold">Marketing</a>
          <a href="/docs" className="text-slate-400 hover:text-white">Docs</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-16">

        <div>
          <h1 className="text-3xl font-bold">Marketing Engine</h1>
          <p className="text-slate-400 mt-1">Week 4 — Brand system, content library, A/B testing, and campaign calendar for GymGen.</p>
        </div>

        {/* BRAND SYSTEM */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-emerald-400">Brand System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">BRAND NAME</p>
                <p className="text-2xl font-bold text-emerald-400">GymGen</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">TAGLINE</p>
                <p className="text-white font-medium">Your gym routine, personalized. In seconds.</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">PRIMARY COLOR</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400" />
                  <span className="text-slate-300 font-mono">#6ee7b7</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">BRAND VOICE</p>
                <p className="text-slate-400 text-sm">Direct, energetic, and accessible. No fitness jargon. Speaks to beginners and regular gym-goers in Mexico. Spanish-friendly tone.</p>
              </div>
            </div>

            {/* TARGET PERSONA */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <p className="text-xs text-slate-500 mb-3">TARGET PERSONA</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center text-2xl">🏋️</div>
                <div>
                  <p className="font-bold text-white">Carlos, 23</p>
                  <p className="text-xs text-slate-400">Mexico City · College student</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="text-slate-500">Goal:</span> <span className="text-slate-300">Build muscle and look better</span></div>
                <div><span className="text-slate-500">Pain point:</span> <span className="text-slate-300">Doesn't know what to do at the gym, copies random YouTube routines</span></div>
                <div><span className="text-slate-500">Budget:</span> <span className="text-slate-300">Can't afford a personal trainer or paid apps</span></div>
                <div><span className="text-slate-500">Target tier:</span> <span className="text-emerald-400 font-medium">Free → Freemium</span></div>
                <div><span className="text-slate-500">Device:</span> <span className="text-slate-300">iPhone, heavy WhatsApp user</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* A/B HEADLINE TEST */}
        <section>
          <h2 className="text-xl font-bold mb-2 text-emerald-400">A/B Headline Test</h2>
          <p className="text-slate-400 text-sm mb-6">Click the headline that you think performs better. This simulates a real A/B test decision.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {headlines.map(h => (
              <button
                key={h.id}
                onClick={() => setWinner(h.id)}
                className={`p-6 rounded-xl border-2 text-left transition ${
                  winner === h.id
                    ? 'border-emerald-400 bg-emerald-900'
                    : 'border-slate-700 bg-slate-900 hover:border-slate-500'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-slate-400">OPTION {h.id.toUpperCase()}</span>
                  {winner === h.id && <span className="text-xs bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">WINNER</span>}
                </div>
                <p className="text-lg font-bold text-white">{h.text}</p>
              </button>
            ))}
          </div>
          {winner && (
            <p className="text-emerald-400 text-sm mt-3">
              You selected Option {winner.toUpperCase()} as the stronger headline.
            </p>
          )}
        </section>

        {/* SOCIAL POSTS */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-emerald-400">10 Social Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialPosts.map(post => (
              <div key={post.id} className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs bg-blue-900 text-blue-400 px-2 py-0.5 rounded-full">{post.platform}</span>
                  <button
                    onClick={() => handleCopy(post.copy, post.id)}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    {copied === post.id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-slate-300">{post.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VIDEO SCRIPTS */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-emerald-400">3 Video Scripts</h2>
          <div className="space-y-4">
            {videoScripts.map(v => (
              <div key={v.duration} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xs bg-purple-900 text-purple-400 px-2 py-0.5 rounded-full mr-2">{v.duration}</span>
                    <span className="font-bold text-white">{v.title}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(v.script, `script-${v.duration}`)}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    {copied === `script-${v.duration}` ? 'Copied!' : 'Copy Script'}
                  </button>
                </div>
                <pre className="text-sm text-slate-400 whitespace-pre-wrap font-mono">{v.script}</pre>
              </div>
            ))}
          </div>
        </section>

        {/* 14-DAY CALENDAR */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-emerald-400">14-Day Campaign Calendar</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
            {calendar.map(day => (
              <div key={day.day} className="bg-slate-900 rounded-xl border border-slate-800 p-3">
                <p className="text-xs text-slate-500 mb-1">Day {day.day}</p>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${typeColor(day.type)}`}>{day.type}</span>
                <p className="text-xs text-slate-300 mt-2 leading-tight">{day.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SAVE MARKETING ASSET */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-emerald-400">Save Marketing Asset</h2>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Title</label>
              <input type="text" value={assetTitle} onChange={e => setAssetTitle(e.target.value)}
                placeholder="e.g. Instagram launch post"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Content</label>
              <textarea value={assetContent} onChange={e => setAssetContent(e.target.value)}
                placeholder="Paste your marketing copy here..."
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500" />
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleSave} disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition">
                {saving ? 'Saving...' : 'Save to Supabase'}
              </button>
              {saveMsg && <span className={`text-sm ${saveMsg === 'Saved!' ? 'text-emerald-400' : 'text-red-400'}`}>{saveMsg}</span>}
            </div>
          </div>
        </section>

        {/* SAVED ASSETS */}
        {savedAssets.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Saved Marketing Assets</h2>
            <div className="space-y-3">
              {savedAssets.map(a => (
                <div key={a.id} className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <p className="font-bold text-white">{a.title}</p>
                  {a.content && <p className="text-sm text-slate-400 mt-1">{a.content}</p>}
                  <p className="text-xs text-slate-500 mt-2">{new Date(a.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
