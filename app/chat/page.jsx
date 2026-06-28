'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const FITNESS_KEYWORDS = ['gym', 'workout', 'exercise', 'muscle', 'weight', 'fitness', 'training', 'routine', 'cardio', 'strength', 'diet', 'nutrition', 'protein', 'rest', 'recovery', 'sets', 'reps', 'goal', 'beginner', 'advanced', 'intermediate', 'days', 'plan', 'body', 'fat', 'calories', 'run', 'lift', 'squat', 'push', 'pull', 'chest', 'back', 'legs', 'arms', 'shoulders', 'core', 'abs', 'stretch', 'flexibility', 'mobility', 'warm', 'cool', 'injury', 'pain', 'sleep', 'hydration', 'water', 'supplement', 'creatine', 'vitamins', 'bulk', 'cut', 'lean', 'tone', 'endurance', 'hiit', 'yoga', 'pilates', 'crossfit', 'powerlifting', 'bodyweight', 'dumbbell', 'barbell', 'kettlebell', 'band', 'machine', 'treadmill', 'bike', 'rowing', 'swimming', 'sport', 'athlete', 'coach', 'trainer', 'gym bag', 'shoes', 'form', 'technique', 'posture', 'breathe', 'motivation', 'plateau', 'progress', 'gains', 'results', 'transformation', 'before', 'after', 'week', 'month', 'schedule', 'split', 'push pull', 'upper', 'lower', 'glutes', 'hamstring', 'quad', 'calf', 'tricep', 'bicep', 'forearm', 'trap', 'lat', 'delts']

const GUARDRAIL_RESPONSE = "I'm GymGen's fitness assistant — I'm only able to help with gym routines, workout plans, and fitness questions. Try asking me something like 'What should I do on leg day?' or 'How many days should a beginner train?'"

const INTAKE_QUESTIONS = [
  "Hi! I'm GymGen's fitness assistant. I'll help you find the right workout approach. First — what is your main fitness goal? (e.g. build muscle, lose weight, improve fitness)",
  "Got it! What is your current experience level? (Beginner, Intermediate, or Advanced)",
  "Almost there! How many days per week can you commit to training? (1-7)"
]

function generateResponse(goal, level, days) {
  const goalKey = goal.toLowerCase().includes('muscle') ? 'muscle'
    : goal.toLowerCase().includes('weight') || goal.toLowerCase().includes('fat') ? 'weight'
    : 'fitness'

  const responses = {
    muscle: `Based on your goal to build muscle as a ${level} training ${days} days/week, here's my recommendation:\n\n• Focus on compound movements: squats, deadlifts, bench press, rows\n• Use progressive overload — increase weight or reps each week\n• Rest 60-90 seconds between sets\n• Aim for 3-4 sets of 8-12 reps per exercise\n• Prioritize protein intake (1.6-2g per kg of bodyweight)\n\nHead to /core to generate your full personalized routine! [AI Simulated Output]`,
    weight: `Based on your goal to lose weight as a ${level} training ${days} days/week, here's my recommendation:\n\n• Combine strength training with cardio for best results\n• Strength sessions: 3 sets of 12-15 reps with shorter rest periods\n• Add 20-30 min cardio 2-3x per week\n• Create a moderate calorie deficit (300-500 cal/day)\n• Stay hydrated and prioritize sleep for recovery\n\nHead to /core to generate your full personalized routine! [AI Simulated Output]`,
    fitness: `Based on your goal to improve fitness as a ${level} training ${days} days/week, here's my recommendation:\n\n• Mix strength training and cardio throughout the week\n• Include mobility work and stretching on rest days\n• Build consistency before intensity — show up first\n• Track your workouts to see progress over time\n• Start with full-body workouts if training 3 days or less\n\nHead to /core to generate your full personalized routine! [AI Simulated Output]`,
  }
  return responses[goalKey]
}

function getFollowUpResponse(message, goal, level, days) {
  const msg = message.toLowerCase()
  const isFitness = FITNESS_KEYWORDS.some(k => msg.includes(k))
  if (!isFitness) return GUARDRAIL_RESPONSE

  if (msg.includes('rest') || msg.includes('recovery')) {
    return `Rest is crucial for ${level} trainees! With ${days} training days, make sure to take at least 1-2 full rest days per week. Sleep 7-9 hours and consider light stretching or walking on off days. [AI Simulated Output]`
  }
  if (msg.includes('diet') || msg.includes('nutrition') || msg.includes('protein') || msg.includes('eat')) {
    return `Nutrition is 70% of your results! For your goal (${goal}), focus on whole foods, adequate protein (1.6-2g per kg bodyweight), and staying hydrated. Avoid ultra-processed foods and track your intake for the first few weeks to build awareness. [AI Simulated Output]`
  }
  if (msg.includes('cardio')) {
    return `For your goal (${goal}), cardio should complement your strength training. At ${level} level, 2-3 cardio sessions per week of 20-30 minutes is ideal. Steady-state cardio (walking, cycling) is easiest to recover from. [AI Simulated Output]`
  }
  return `Great question! Based on your profile (${goal}, ${level}, ${days} days/week), I'd recommend focusing on consistency above all else. Small improvements each week add up significantly over months. Keep showing up! [AI Simulated Output]`
  if (msg.includes('leg') || msg.includes('legs') || msg.includes('quad') || msg.includes('hamstring') || msg.includes('glute')) {
    return `Leg day for a ${level} at your goal (${goal}):\n\n• Squats 4x8 — king of leg exercises\n• Romanian deadlifts 3x10 — hamstrings and glutes\n• Leg press 3x12 — quad focus\n• Walking lunges 3x12 each leg\n• Calf raises 4x15\n\nRest 90 seconds between sets. Leg day is tough — fuel up beforehand! [AI Simulated Output]`
  }
  if (msg.includes('chest') || msg.includes('push day') || msg.includes('bench')) {
    return `Chest day for a ${level}:\n\n• Bench press 4x8 — main compound lift\n• Incline dumbbell press 3x10 — upper chest\n• Cable flyes 3x12 — chest isolation\n• Tricep dips 3x10 — bonus tricep work\n• Push-ups to failure as a finisher\n\nFocus on form over weight, especially on bench press. [AI Simulated Output]`
  }
if (msg.includes('back') || msg.includes('pull') || msg.includes('lat') || msg.includes('row')) {
    return `Back day for a ${level}:\n\n• Deadlifts 4x6 — full posterior chain\n• Pull-ups or lat pulldown 3x8\n• Barbell rows 3x10 — mid back thickness\n• Cable rows 3x12 — squeeze at the end\n• Face pulls 3x15 — rear delts and posture\n\nBack is the hardest muscle group to feel — focus on the mind-muscle connection. [AI Simulated Output]`
  }
  if (msg.includes('shoulder') || msg.includes('delt') || msg.includes('overhead')) {
    return `Shoulder day for a ${level}:\n\n• Overhead press 4x8 — main compound\n• Lateral raises 3x12 — side delts width\n• Front raises 3x12 — front delts\n• Rear delt flyes 3x15 — posture and balance\n• Shrugs 3x15 — traps\n\nDon't skip rear delts — most people are front-delt dominant which causes posture issues. [AI Simulated Output]`
  }
  if (msg.includes('what should i do') || msg.includes('what to do') || msg.includes('where do i start') || msg.includes('help me')) {
    return `Based on your profile (${goal}, ${level}, ${days} days/week), here's where to start:\n\n• Go to /core to generate your full personalized routine\n• Follow the plan consistently for at least 4 weeks before changing anything\n• Track your workouts — write down sets, reps, and weight each session\n• Focus on learning proper form before adding weight\n• Show up on the days you planned, even if you don't feel like it\n\nConsistency beats perfection every time. [AI Simulated Output]`
  }
  if (msg.includes('arm') || msg.includes('bicep') || msg.includes('tricep') || msg.includes('curl')) {
    return `Arm day for a ${level}:\n\n• Barbell curls 3x10 — bicep mass\n• Hammer curls 3x12 — brachialis and forearm\n• Skull crushers 3x10 — tricep mass\n• Tricep pushdowns 3x12 — isolation\n• Concentration curls 3x12 — peak contraction\n\nArms respond well to higher volume — don't be afraid to go up to 4-5 exercises. [AI Simulated Output]`
  }
  if (msg.includes('leg') || msg.includes('legs') || msg.includes('quad') || msg.includes('hamstring') || msg.includes('glute')) {
    return `Leg day for a ${level} at your goal (${goal}):\n\n• Squats 4x8 — king of leg exercises\n• Romanian deadlifts 3x10 — hamstrings and glutes\n• Leg press 3x12 — quad focus\n• Walking lunges 3x12 each leg\n• Calf raises 4x15\n\nRest 90 seconds between sets. Leg day is tough — fuel up beforehand! [AI Simulated Output]`
  }
  return `Great question! Based on your profile (${goal}, ${level}, ${days} days/week), I'd recommend focusing on consistency above all else. Small improvements each week add up significantly over months. Keep showing up! [AI Simulated Output]`
}

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [intakeStep, setIntakeStep] = useState(0)
  const [intakeAnswers, setIntakeAnswers] = useState({ goal: '', level: '', days: '' })
  const [ratings, setRatings] = useState({})
  const [sessionSaved, setSessionSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setMessages([{ id: 1, role: 'assistant', text: INTAKE_QUESTIONS[0] }])
    fetchSessionCount()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function fetchSessionCount() {
    const { data } = await supabase.from('chat_sessions').select('id')
    if (data) setSessionCount(data.length)
  }

  function handleSend() {
    if (!input.trim()) return
    const userMsg = { id: Date.now(), role: 'user', text: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')

    setTimeout(() => {
      let assistantText = ''

      if (intakeStep < 3) {
        if (intakeStep === 0) setIntakeAnswers(prev => ({ ...prev, goal: input }))
        if (intakeStep === 1) setIntakeAnswers(prev => ({ ...prev, level: input }))
        if (intakeStep === 2) {
          const finalAnswers = { ...intakeAnswers, days: input }
          setIntakeAnswers(finalAnswers)
          assistantText = generateResponse(intakeAnswers.goal, intakeAnswers.level, input)
          setIntakeStep(3)
          setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: assistantText }])
          return
        }
        if (intakeStep < 2) {
          assistantText = INTAKE_QUESTIONS[intakeStep + 1]
          setIntakeStep(prev => prev + 1)
        }
      } else {
        assistantText = getFollowUpResponse(input, intakeAnswers.goal, intakeAnswers.level, intakeAnswers.days)
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: assistantText }])
    }, 600)
  }

  function handleRate(msgId, rating) {
    setRatings(prev => ({ ...prev, [msgId]: rating }))
  }

  async function handleSaveSession() {
    setSaving(true)
    const summary = `Goal: ${intakeAnswers.goal} | Level: ${intakeAnswers.level} | Days: ${intakeAnswers.days} | Messages: ${messages.length}`
    const thumbsUp = Object.values(ratings).filter(r => r === 'up').length
    const rating = thumbsUp > 0 ? 'positive' : 'neutral'
    const { error } = await supabase.from('chat_sessions').insert([{ summary, rating }])
    if (!error) {
      setSessionSaved(true)
      fetchSessionCount()
    }
    setSaving(false)
  }

  const assistantMessageCount = messages.filter(m => m.role === 'assistant').length
  const showCheckpoint = assistantMessageCount >= 5

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <nav className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <span className="font-bold text-lg text-emerald-400">GymGen</span>
        <div className="flex gap-6 text-sm">
          <a href="/" className="text-slate-400 hover:text-white">Home</a>
          <a href="/core" className="text-slate-400 hover:text-white">Core</a>
          <a href="/research" className="text-slate-400 hover:text-white">Research</a>
          <a href="/product" className="text-slate-400 hover:text-white">Product</a>
          <a href="/pricing" className="text-slate-400 hover:text-white">Pricing</a>
          <a href="/marketing" className="text-slate-400 hover:text-white">Marketing</a>
          <a href="/chat" className="text-emerald-400 font-semibold">Chat</a>
          <a href="/docs" className="text-slate-400 hover:text-white">Docs</a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto w-full px-4 py-6 flex flex-col flex-1">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">GymGen Fitness Assistant</h1>
            <p className="text-slate-400 text-sm">Guided fitness Q&A — <span className="text-yellow-400">AI Simulated Output</span></p>
            <p className="text-slate-500 text-xs mt-1">💡 Try asking about: rest & recovery, diet & nutrition, cardio, or any fitness question after the 3 intake questions.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-center">
            <p className="text-xs text-slate-400">Saved Sessions</p>
            <p className="text-xl font-bold text-emerald-400">{sessionCount}</p>
          </div>
        </div>

        {/* HUMAN CHECKPOINT */}
        {showCheckpoint && (
          <div className="bg-yellow-900 border border-yellow-700 rounded-xl p-3 mb-4 text-sm text-yellow-300">
            ⚠️ <strong>Human Checkpoint:</strong> This is a simulated fitness assistant. For personalized training advice, please consult a certified personal trainer.
          </div>
        )}

        {/* CHAT MESSAGES */}
        <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-4 overflow-y-auto min-h-96 max-h-96">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md rounded-xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-200'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                {msg.role === 'assistant' && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleRate(msg.id, 'up')}
                      className={`text-xs px-2 py-1 rounded-lg transition ${ratings[msg.id] === 'up' ? 'bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                    >👍</button>
                    <button
                      onClick={() => handleRate(msg.id, 'down')}
                      className={`text-xs px-2 py-1 rounded-lg transition ${ratings[msg.id] === 'down' ? 'bg-red-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                    >👎</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={intakeStep < 3 ? "Type your answer..." : "Ask a fitness question..."}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button onClick={handleSend}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition">
            Send
          </button>
        </div>

        {/* SAVE SESSION */}
        {intakeStep >= 3 && (
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handleSaveSession}
              disabled={saving || sessionSaved}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition ${sessionSaved ? 'bg-green-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
            >
              {sessionSaved ? '✅ Session Saved!' : saving ? 'Saving...' : 'Save Session to Supabase'}
            </button>
            {sessionSaved && <span className="text-emerald-400 text-sm">Saved to chat_sessions table</span>}
          </div>
        )}
      </div>
    </div>
  )
}