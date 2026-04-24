# NAV Simuleringslab for sykefraværsoppfølging (MVP)

Et fungerende MVP-verktøy laget med **Next.js + TypeScript + Tailwind CSS + React + Recharts**.

Målet er å simulere hvordan endringer i NAV-regler for sykefraværsoppfølging påvirker:
- ulike syntetiske sykmeldte personaer
- ulike veilederprofiler
- ressursbruk, risiko for over-/underoppfølging og sannsynlighet for retur i arbeid innen 26 uker

## Innhold

- **Side 1:** Hjem / simuleringsbygger
- **Side 2:** Resultatdashboard

## Funksjoner i MVP

- Regelparametere via sliders og valg:
  - oppfølgingsplan frist (uke)
  - dialogmøte 1 (uke)
  - aktivitetsvurdering (uke)
  - dialogmøte 2 (uke)
  - behovsbasert oppfølging (1–5)
  - veilederkapasitet (1–5)
  - aktivitetsplikt (mild, standard, streng)
- Personabibliotek med 6 syntetiske brukere
- Veilederprofiler (5 stk)
- Simuleringsmotor som beregner:
  - behovsskår
  - oppfølgingsintensitet
  - risiko for overoppfølging
  - risiko for underoppfølging
  - estimert sannsynlighet for retur i arbeid innen 26 uker
  - veilederens ressursbruk
- Dashboard med:
  - KPI-kort
  - sammenligningsgraf
  - persona/veileder-heatmap
  - persona-tidslinje
  - forklaringspanel med mock AI-analyse

## Teknologistakk

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Recharts

## Lokal oppstart

```bash
npm install
npm run dev
```

Åpne deretter `http://localhost:3000`.

## Produksjonsbygg

```bash
npm run build
npm start
```

## Deploy til Vercel (uten lokal setup)

1. Push repo til GitHub.
2. Logg inn på Vercel.
3. Importer repoet som nytt prosjekt.
4. Vercel oppdager automatisk Next.js-innstillinger.
5. Klikk **Deploy**.

Ingen database trengs for denne MVP-en.

## Arkitektur

- `app/page.tsx` – simuleringsbygger
- `app/results/page.tsx` – dashboard
- `lib/data.ts` – personaer og veilederprofiler
- `lib/simulation.ts` – simuleringsmotor
- `lib/ai.ts` – mock analyse-provider + grensesnitt for fremtidig AI-integrasjon
- `components/ResultsCharts.tsx` – Recharts-visualiseringer

## Fremtidig AI-integrasjon (OpenAI)

MVP-en bruker `MockAnalysisProvider` i `lib/ai.ts`.

### Forslag til neste steg

1. Lag en API-rute i Next.js, f.eks. `app/api/analyze/route.ts`.
2. Kall OpenAI API fra server-side ruten (ikke fra klient direkte).
3. Bytt ut `MockAnalysisProvider` med en `OpenAIAnalysisProvider` som kaller API-ruten.
4. Send inn simuleringens aggregater + per-persona-data som strukturert JSON.
5. Returner forklaringstekst og anbefalte regeljusteringer.

### Miljøvariabler (eksempel)

```env
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4.1-mini
```

### Minimal provider-struktur

- `AnalysisProvider` beholdes som interface.
- Legg til en ny klasse som implementerer `analyzeSimulation(result)`.
- Bytt provider i `app/results/page.tsx` med feature-flag eller env-basert valg.

## Avgrensninger i MVP

- Ingen database (bruker localStorage mellom sider)
- Syntetiske data og heuristisk simuleringslogikk
- Ikke medisinsk/juridisk beslutningsstøtte

---

Dette prosjektet er laget som en enkel, utvidbar start for å evaluere policy-scenarier før eventuell produksjonssetting.
