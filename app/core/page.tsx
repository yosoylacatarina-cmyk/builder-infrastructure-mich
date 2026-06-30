'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateRoutine(goal: string, level: string, days: number): string {
  const exercises: Record<string, string[][]> = {
    'lose weight': [
      ['Monday', 'Full Body Cardio', 'Jumping jacks 3x20, Burpees 3x10, Mountain climbers 3x20, Jump rope 3x60s'],
      ['Tuesday', 'Lower Body + Core', 'Squats 3x15, Lunges 3x12, Glute bridges 3x15, Plank 3x45s'],
      ['Wednesday', 'Upper Body + Cardio', 'Push-ups 3x12, Dumbbell rows 3x12, High knees 3x30s, Bicycle crunches 3x20'],
      ['Thursday', 'Active Recovery', 'Light walk 30 min, Stretching 15 min'],
      ['Friday', 'Full Body HIIT', 'Box jumps 3x10, Kettlebell swings 3x15, Push-ups 3x15, Squat jumps 3x10'],
      ['Saturday', 'Cardio + Core', 'Running 20 min, Leg raises 3x15, Russian twists 3x20, Plank 3x60s'],
      ['Sunday', 'Rest', 'Rest day — focus on recovery and hydration'],
    ],
    'build muscle': [
      ['Monday', 'Chest + Triceps', 'Bench press 4x8, Incline dumbbell press 3x10, Cable flyes 3x12, Tricep dips 3x10'],
      ['Tuesday', 'Back + Biceps', 'Deadlifts 4x6, Pull-ups 3x8, Barbell rows 3x10, Bicep curls 3x12'],
      ['Wednesday', 'Rest or Cardio', 'Light cardio 20 min or rest'],
      ['Thursday', 'Shoulders + Traps', 'Overhead press 4x8, Lateral raises 3x12, Front raises 3x12, Shrugs 3x15'],
      ['Friday', 'Legs', 'Squats 4x8, Romanian deadlifts 3x10, Leg press 3x12, Calf raises 4x15'],
      ['Saturday', 'Arms + Core', 'Hammer curls 3x12, Skull crushers 3x10, Plank 3x60s, Ab wheel 3x10'],
      ['Sunday', 'Rest', 'Rest day — muscle grows during recovery'],
    ],
    'improve fitness': [
      ['Monday', 'Strength', 'Squats 3x10, Push-ups 3x12, Dumbbell rows 3x10, Plank 3x45s'],
      ['Tuesday', 'Cardio', 'Running or cycling 30 min at moderate pace'],
      ['Wednesday', 'Strength', 'Deadlifts 3x8, Overhead press 3x10, Pull-ups 3x6, Core circuit 3x'],
      ['Thursday', 'Flexibility + Mobility', 'Yoga flow 30 min, Hip flexor stretches, Shoulder mobility'],
      ['Friday', 'Full Body', 'Burpees 3x10, Dumbbell lunges 3x12, Push-ups 3x15, Jumping jacks 3x30s'],
      ['Saturday', 'Active Recovery', 'Walk 30 min, Light stretching 15 min'],
      ['Sunday', 'Rest', 'Rest day'],
    ],
  };

  const goalKey = goal.toLowerCase().includes('muscle') ? 'build muscle'
    : goal.toLowerCase().includes('weight') || goal.toLowerCase().includes('fat') ? 'lose weight'
    : 'improve fitness';

  const routine = exercises[goalKey].slice(0, days);
  const levelNote = level === 'beginner' ? ' (reduce sets by 1 if needed)'
    : level === 'advanced' ? ' (add 1 set to each exercise)' : '';

  let output = `PERSONALIZED GYM ROUTINE\n`;
  output += `Goal: ${goal} | Level: ${level}${levelNote} | Days: ${days}/week\n\n`;
  routine.forEach(([day, focus, ex]) => {
    output += `${day.toUpperCase()} — ${focus}\n${ex}\n\n`;
  });
  output += `Tip: Rest 60-90s between sets. Stay hydrated. Track your progress weekly.`;
  return output;
}

type SavedRoutine = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function CorePage() {
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('beginner');
  const [days, setDays] = useState(3);
  const [output, setOutput] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [routines, setRoutines] = useState<SavedRoutine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutines();
  }, []);

  async function fetchRoutines() {
    setLoading(true);
    const { data } = await supabase
      .from('core_outputs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setRoutines(data);
    setLoading(false);
  }

  function handleGenerate() {
    if (!goal.trim()) return alert('Please enter your fitness goal!');
    const routine = generateRoutine(goal, level, days);
    setOutput(routine);
    setSaved(false);
  }

  async function handleSave() {
    if (!output) return;
    setSaving(true);
    const title = `${goal} — ${level} — ${days} days/week`;
    const { error } = await supabase
      .from('core_outputs')
      .insert([{ title, content: output }]);
    if (!error) {
      setSaved(true);
      fetchRoutines();
    } else {
      alert('Error saving. Check your Supabase connection.');
    }
    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="p-6 border-b border-slate-800 flex justify-between items-center">
        <a href="/" className="font-bold text-white hover:text-blue-400">Builder Infrastructure</a>
        <a href="/docs" className="text-blue-400 hover:underline">Docs</a>
        <a href="/chat" className="text-slate-400 hover:text-white">Chat</a>
         <a href="/research" className="text-slate-400 hover:text-white">Research</a>
          <a href="/product" className="text-slate-400 hover:text-white">Product</a>
          <a href="/pricing" className="text-slate-400 hover:text-white">Pricing</a>
          <a href="/marketing" className="text-slate-400 hover:text-white">Marketing</a>
          <a href="/demo" className="text-slate-400 hover:text-white">Demo</a>
          <a href="/dashboard" className="text-slate-400 hover:text-white">Dashboard</a>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Gym Routine Generator</h1>
        <p className="text-slate-400 mb-10">Enter your fitness details and get a personalized workout plan instantly.</p>

        <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-800">
          <h2 className="text-lg font-bold mb-4 text-blue-400">Your Details</h2>

          <div className="mb-4">
            <label className="block text-sm text-slate-400 mb-1">Fitness Goal</label>
            <input
              type="text"
              placeholder="e.g. build muscle, lose weight, improve fitness"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-slate-400 mb-1">Experience Level</label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-slate-400 mb-1">Days Per Week: {days}</label>
            <input
              type="range"
              min={1}
              max={7}
              value={days}
              onChange={e => setDays(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1 day</span><span>7 days</span>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            Generate Routine
          </button>
        </div>

        {output && (
          <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-blue-800">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-blue-400">Your Routine</h2>
              <span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded">AI Simulated Output</span>
            </div>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">{output}</pre>
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`mt-4 w-full font-bold py-2 rounded-lg transition ${
                saved ? 'bg-green-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              {saved ? '✅ Saved to Supabase!' : saving ? 'Saving...' : 'Save Routine'}
            </button>
          </div>
        )}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-lg font-bold mb-4 text-blue-400">Saved Routines</h2>
          {loading ? (
            <p className="text-slate-500 text-sm">Loading...</p>
          ) : routines.length === 0 ? (
            <p className="text-slate-500 text-sm">No saved routines yet. Generate one above!</p>
          ) : (
            <ul className="space-y-3">
              {routines.map(r => (
                <li key={r.id} className="bg-slate-800 rounded-lg p-4">
                  <p className="font-bold text-white text-sm">{r.title}</p>
                  <p className="text-slate-400 text-xs mt-1">{new Date(r.created_at).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}