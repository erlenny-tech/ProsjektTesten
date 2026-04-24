'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { KpiCard } from '@/components/KpiCard';
import { ResultsCharts } from '@/components/ResultsCharts';
import { MockAnalysisProvider } from '@/lib/ai';
import { ADVISOR_PROFILES, PERSONAS } from '@/lib/data';
import { runSimulation } from '@/lib/simulation';
import { RuleSet, SimulationResult } from '@/lib/types';
import { getSavedSimulationResult } from '@/lib/storage';

const fallbackRules: RuleSet = {
  oppfolgingsplanUke: 4,
  dialogmote1Uke: 8,
  aktivitetsvurderingUke: 12,
  dialogmote2Uke: 20,
  behovsbasertGrad: 3,
  veilederKapasitet: 3,
  aktivitetsplikt: 'standard'
};

export default function ResultsPage() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [analysis, setAnalysis] = useState('Laster analyse ...');

  useEffect(() => {
    const saved = getSavedSimulationResult();
    if (saved) {
      setResult(saved);
      return;
    }

    const baseline = runSimulation(PERSONAS, fallbackRules, ADVISOR_PROFILES[0]);
    setResult(baseline);
  }, []);

  useEffect(() => {
    if (!result) return;
    const provider = new MockAnalysisProvider();
    provider.analyzeSimulation(result).then(setAnalysis);
  }, [result]);

  const topPersonas = useMemo(() => {
    if (!result) return [];
    return [...result.personaResults]
      .sort((a, b) => b.rtwProbability26Weeks - a.rtwProbability26Weeks)
      .slice(0, 3);
  }, [result]);

  if (!result) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p>Laster resultater ...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 lg:px-6">
      <header className="card flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Resultatdashboard</p>
          <h1 className="text-2xl font-semibold">Simuleringsresultater</h1>
          <p className="text-sm text-slate-600">Veilederprofil: {result.advisorProfile.navn}</p>
        </div>
        <Link href="/" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
          Tilbake til simulering
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard
          title="Sannsynlighet retur i arbeid"
          value={`${result.aggregate.avgRtwProbability26Weeks}%`}
          description="Gjennomsnitt for alle personaer innen 26 uker"
        />
        <KpiCard
          title="Gjennomsnittlig oppfølgingsintensitet"
          value={`${result.aggregate.avgFollowUpIntensity}`}
          description="Kombinerer regeltrykk, kapasitet og profil"
        />
        <KpiCard
          title="Total ressursbruk (veileder)"
          value={`${result.aggregate.totalAdvisorResourceUse}`}
          description="Indikator for arbeidsbelastning i scenario"
        />
        <KpiCard
          title="Risiko for overoppfølging"
          value={`${result.aggregate.avgOverFollowUpRisk}`}
          description="Høy verdi betyr risiko for unødvendig tett oppfølging"
        />
        <KpiCard
          title="Risiko for underoppfølging"
          value={`${result.aggregate.avgUnderFollowUpRisk}`}
          description="Høy verdi betyr risiko for at behov ikke fanges opp"
        />
        <KpiCard
          title="Gjennomsnittlig behovsskår"
          value={`${result.aggregate.avgNeedScore}`}
          description="Samlet behov i valgt personasett"
        />
      </section>

      <ResultsCharts result={result} />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="section-title">Forklaringspanel (mock AI)</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">{analysis}</p>
          <p className="mt-4 text-xs text-slate-500">
            Strukturert for fremtidig OpenAI-integrasjon via en egen provider i <code>lib/ai.ts</code>.
          </p>
        </div>

        <div className="card">
          <h2 className="section-title">Topp 3 personaer i dette scenariet</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {topPersonas.map((persona) => (
              <li key={persona.personaId} className="flex items-center justify-between rounded-lg border p-3">
                <span>{persona.personaNavn}</span>
                <span className="font-semibold text-navBlue">{persona.rtwProbability26Weeks}%</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
