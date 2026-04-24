'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ADVISOR_PROFILES, PERSONAS } from '@/lib/data';
import { runSimulation } from '@/lib/simulation';
import { ActivityDuty, RuleSet } from '@/lib/types';
import { RuleSlider } from '@/components/RuleSlider';

const defaultRules: RuleSet = {
  oppfolgingsplanUke: 4,
  dialogmote1Uke: 8,
  aktivitetsvurderingUke: 12,
  dialogmote2Uke: 20,
  behovsbasertGrad: 3,
  veilederKapasitet: 3,
  aktivitetsplikt: 'standard'
};

export default function HomePage() {
  const [rules, setRules] = useState<RuleSet>(defaultRules);
  const [advisorId, setAdvisorId] = useState(ADVISOR_PROFILES[0].id);

  const selectedAdvisor = useMemo(
    () => ADVISOR_PROFILES.find((profile) => profile.id === advisorId) ?? ADVISOR_PROFILES[0],
    [advisorId]
  );

  const preview = useMemo(() => runSimulation(PERSONAS, rules, selectedAdvisor), [rules, selectedAdvisor]);

  const saveAndNavigate = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('simlab-result', JSON.stringify(preview));
    window.localStorage.setItem('simlab-rules', JSON.stringify(rules));
  };

  const setRuleValue = <K extends keyof RuleSet>(key: K, value: RuleSet[K]) => {
    setRules((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 lg:px-6">
      <header className="card bg-navBlue text-white">
        <p className="text-xs uppercase tracking-wide text-cyan-100">MVP · NAV simuleringslab</p>
        <h1 className="mt-2 text-2xl font-semibold">Simulering av sykefraværsoppfølging</h1>
        <p className="mt-2 max-w-3xl text-sm text-cyan-50">
          Test hvordan endringer i regelstyring, aktivitetskrav og veilederkapasitet påvirker ulike brukere og
          oppfølgingsutfall.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card space-y-4">
          <h2 className="section-title">1) Regelparametere</h2>
          <RuleSlider
            label="Oppfølgingsplan frist (uke)"
            value={rules.oppfolgingsplanUke}
            min={1}
            max={12}
            onChange={(value) => setRuleValue('oppfolgingsplanUke', value)}
          />
          <RuleSlider
            label="Dialogmøte 1 (uke)"
            value={rules.dialogmote1Uke}
            min={4}
            max={16}
            onChange={(value) => setRuleValue('dialogmote1Uke', value)}
          />
          <RuleSlider
            label="Aktivitetsvurdering (uke)"
            value={rules.aktivitetsvurderingUke}
            min={8}
            max={20}
            onChange={(value) => setRuleValue('aktivitetsvurderingUke', value)}
          />
          <RuleSlider
            label="Dialogmøte 2 (uke)"
            value={rules.dialogmote2Uke}
            min={12}
            max={30}
            onChange={(value) => setRuleValue('dialogmote2Uke', value)}
          />
          <RuleSlider
            label="Behovsbasert oppfølging (1–5)"
            value={rules.behovsbasertGrad}
            min={1}
            max={5}
            onChange={(value) => setRuleValue('behovsbasertGrad', value)}
          />
          <RuleSlider
            label="Veilederkapasitet (1–5)"
            value={rules.veilederKapasitet}
            min={1}
            max={5}
            onChange={(value) => setRuleValue('veilederKapasitet', value)}
          />

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">Aktivitetsplikt</p>
            <div className="grid grid-cols-3 gap-2">
              {(['mild', 'standard', 'strict'] as ActivityDuty[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRuleValue('aktivitetsplikt', option)}
                  className={`rounded-lg border px-3 py-2 text-sm capitalize transition ${
                    rules.aktivitetsplikt === option
                      ? 'border-navBlue bg-navBlue text-white'
                      : 'border-slate-300 bg-white hover:border-navBlue'
                  }`}
                >
                  {option === 'mild' ? 'Mild' : option === 'standard' ? 'Standard' : 'Streng'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="section-title">2) Veilederprofil</h2>
            <div className="mt-3 grid gap-2">
              {ADVISOR_PROFILES.map((profile) => (
                <label key={profile.id} className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:bg-slate-50">
                  <input
                    type="radio"
                    name="advisor"
                    checked={advisorId === profile.id}
                    onChange={() => setAdvisorId(profile.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-semibold">{profile.navn}</p>
                    <p className="text-xs text-slate-500">{profile.stil}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="section-title">3) Personabibliotek</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {PERSONAS.map((persona) => (
                <li key={persona.id} className="rounded-md border border-slate-200 px-3 py-2">
                  {persona.navn}
                </li>
              ))}
            </ul>
          </div>

          <div className="card bg-navLight">
            <p className="text-sm font-medium text-slate-700">Forhåndsvisning</p>
            <p className="mt-1 text-sm text-slate-600">
              Forventet retur i arbeid innen 26 uker: <strong>{preview.aggregate.avgRtwProbability26Weeks}%</strong>
            </p>
            <Link
              href="/results"
              onClick={saveAndNavigate}
              className="mt-4 inline-flex rounded-lg bg-navBlue px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Kjør simulering og se dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
