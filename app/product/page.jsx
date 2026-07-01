export default function ProductPage() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      color: 'border-slate-700',
      badge: 'bg-slate-700 text-slate-300',
      features: {
        'Gym routine generator': true,
        'Basic exercise library': true,
        'Save up to 3 routines': false,
        'AI personalization': false,
        'Progress tracking': false,
        'Export to PDF': false,
        'Priority support': false,
        'Custom workout builder': false,
      }
    },
    {
      name: 'Freemium',
      price: '$5/mo',
      color: 'border-blue-600',
      badge: 'bg-blue-600 text-white',
      features: {
        'Gym routine generator': true,
        'Basic exercise library': true,
        'Save up to 3 routines': true,
        'AI personalization': true,
        'Progress tracking': false,
        'Export to PDF': false,
        'Priority support': false,
        'Custom workout builder': false,
      }
    },
    {
      name: 'Pro',
      price: '$15/mo',
      color: 'border-purple-500',
      badge: 'bg-purple-600 text-white',
      features: {
        'Gym routine generator': true,
        'Basic exercise library': true,
        'Save up to 3 routines': true,
        'AI personalization': true,
        'Progress tracking': true,
        'Export to PDF': true,
        'Priority support': true,
        'Custom workout builder': true,
      }
    },
  ]

  const segments = [
    {
      name: 'Individual Gym-Goers',
      emoji: '🏋️',
      description: 'People who go to the gym regularly and want quick, structured routines without complexity. Price-sensitive — want maximum value for free or low cost.',
      tier: 'Free → Freemium',
      needs: ['Quick routine generation', 'Simple UI', 'No account required', 'Mobile-friendly'],
    },
    {
      name: 'Fitness Beginners',
      emoji: '🌱',
      description: 'People just starting their fitness journey who need more guidance, structure, and motivation. More willing to pay for features that help them stay consistent.',
      tier: 'Freemium → Pro',
      needs: ['AI personalization', 'Progress tracking', 'Beginner-friendly explanations', 'Save and revisit routines'],
    },
  ]

  const featureList = Object.keys(tiers[0].features)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <span className="font-bold text-lg">Gym Routine Generator</span>
        <div className="flex gap-6 text-sm">
          <a href="/" className="text-slate-400 hover:text-white">Home</a>
          <a href="/core" className="text-slate-400 hover:text-white">Core</a>
          <a href="/research" className="text-slate-400 hover:text-white">Research</a>
          <a href="/product" className="text-blue-400 font-semibold">Product</a>
          <a href="/pricing" className="text-slate-400 hover:text-white">Pricing</a>
          <a href="/marketing" className="text-slate-400 hover:text-white">Marketing</a>
          <a href="/docs" className="text-slate-400 hover:text-white">Docs</a>
          <a href="/demo" className="text-slate-400 hover:text-white">Demo</a>
          <a href="/dashboard" className="text-slate-400 hover:text-white">Dashboard</a>
          <a href="/chat" className="text-slate-400 hover:text-white">Chat</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-14">

        <div>
          <h1 className="text-3xl font-bold">Product Architecture</h1>
          <p className="text-slate-400 mt-1">Week 3 — Feature map, pricing tiers, and customer segments for Gym Routine Generator.</p>
        </div>

        {/* FEATURE MAP */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-blue-400">Feature Map — 3 Tiers</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-4 py-4 text-left text-slate-400 font-medium">Feature</th>
                  {tiers.map(t => (
                    <th key={t.name} className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.badge}`}>{t.name}</span>
                        <span className="text-white font-bold">{t.price}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureList.map((feature, i) => (
                  <tr key={feature} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-950'}>
                    <td className="px-4 py-3 text-slate-300">{feature}</td>
                    {tiers.map(t => (
                      <td key={t.name} className="px-4 py-3 text-center">
                        {t.features[feature]
                          ? <span className="text-green-400 text-lg">✓</span>
                          : <span className="text-slate-700 text-lg">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CUSTOMER SEGMENTS */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-blue-400">Customer Segments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {segments.map(s => (
              <div key={s.name} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{s.emoji}</span>
                  <div>
                    <h3 className="font-bold text-white">{s.name}</h3>
                    <span className="text-xs text-blue-400">Target: {s.tier}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4">{s.description}</p>
                <ul className="space-y-1">
                  {s.needs.map(n => (
                    <li key={n} className="text-sm text-slate-300 flex items-center gap-2">
                      <span className="text-blue-400">•</span> {n}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <a href="/pricing" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition">
            View Pricing Simulator →
          </a>
        </div>

      </div>
    </div>
  )
}
