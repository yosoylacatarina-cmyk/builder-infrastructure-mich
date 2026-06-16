# Builder Infrastructure

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Live URL

https://builder-infrastructure-mich.vercel.app

## Student

Michelle — Negocios Inteligentes y Comercio Digital, Verano 2026_B

## Week 0

- Set up project with Next.js, Tailwind CSS, GitHub, Vercel, and Supabase
- Live homepage deployed at the URL above

## Week 1

- Added `/core` page: Gym Routine Generator
- Intake form with fitness goal, experience level, and days per week
- Simulated AI output generates a structured weekly routine
- Save button inserts routine into Supabase `core_outputs` table
- Dashboard previews all saved routines
- Live URL: https://builder-infrastructure-mich.vercel.app/core

## Week 2

- Added `/research` page: Research + Benchmarking Dashboard
- Competitor table with 8 fitness apps — filterable by name, type, and focus
- 5 global benchmarks with key insights (Fitbod, Hevy, Freeletics, Sweat, WHOOP)
- Mexico localization section covering market opportunity, pricing, and user behavior
- Risk map with likelihood levels and mitigations
- Research intake form saves records to Supabase `research_records` table
- Dashboard widget displays all saved research records
- Live URL: https://builder-infrastructure-mich.vercel.app/research

## Week 3

- Added /product page: Feature map and customer segments
- Added /pricing page: Interactive revenue simulator
- Live URLs: builder-infrastructure-mich.vercel.app/product and /pricing
- Supabase table: pricing_scenarios