# Y2Y Burnout Assessment Tool

> NTC feladat #5 — A ground.y2y.hu mintájára | 2026-03-20

Burnout-felmérő eszköz szervezeteknek és vezetőknek. 30 kérdés, 4 dimenzió, ~8 perc.

---

# (Eredeti GROUND alap - módosítandó burnout-ra)

Neuroscience-alapú vezetői tudatossági felmérés. 24 kérdés, 6 dimenzió, ~6 perc.

## Setup

```bash
npm install
cp .env.example .env
# Add your Supabase credentials to .env
npm run dev
```

## Supabase Setup

Create a `leads` table:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  overall_score NUMERIC(3,2),
  profile_name TEXT,
  cognitive_flexibility NUMERIC(3,2),
  uncertainty_tolerance NUMERIC(3,2),
  autonomy_design NUMERIC(3,2),
  psychological_safety NUMERIC(3,2),
  adaptive_decision NUMERIC(3,2),
  group_culture_awareness NUMERIC(3,2),
  raw_answers JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT
  WITH CHECK (true);
```

## Deploy

Configured for Vercel. Push to GitHub and connect to Vercel, or use `vercel` CLI.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS
- Supabase (lead capture)
- Google Fonts: DM Sans + Space Mono

## Dimensions

1. 🧠 Kognitív Rugalmasság
2. 🌊 Bizonytalanság-tűrés
3. 🎯 Autonómia-tervezés
4. 🛡️ Pszichológiai Biztonság
5. ⚡ Adaptív Döntéshozatal
6. 🧩 Csoportkultúra-tudatosság

---

© 2026 Y2Y Hungary Kft.
