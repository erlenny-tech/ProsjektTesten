import { Persona, RuleSet, SimulationResult, AdvisorProfile, PersonaSimulationResult } from './types';

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

const dutyFactor = (duty: RuleSet['aktivitetsplikt']) => {
  if (duty === 'mild') return 0.9;
  if (duty === 'strict') return 1.15;
  return 1;
};

function calculateNeedScore(persona: Persona): number {
  const score =
    persona.belastning * 18 +
    (6 - persona.digitalKompetanse) * 10 +
    (6 - persona.arbeidsplassTilrettelegging) * 12 +
    (6 - persona.motivasjon) * 8 +
    persona.konfliktNiva * 10;
  return clamp(score / 3.8);
}

function calculateFollowUpIntensity(
  rules: RuleSet,
  advisor: AdvisorProfile,
  needScore: number,
  persona: Persona
): number {
  const timelinePressure =
    (30 - rules.oppfolgingsplanUke) * 0.8 +
    (30 - rules.dialogmote1Uke) * 0.5 +
    (30 - rules.aktivitetsvurderingUke) * 0.5 +
    (30 - rules.dialogmote2Uke) * 0.4;

  const base =
    needScore * 0.4 +
    rules.behovsbasertGrad * 9 +
    rules.veilederKapasitet * 6 +
    timelinePressure * 0.3;

  const relationAdj = advisor.relasjonFaktor * 7;
  const conflictAdj = persona.konfliktNiva * 2;
  return clamp((base + relationAdj + conflictAdj) * dutyFactor(rules.aktivitetsplikt) * advisor.kapasitetFaktor);
}

function simulatePersona(
  persona: Persona,
  rules: RuleSet,
  advisor: AdvisorProfile
): PersonaSimulationResult {
  const needScore = calculateNeedScore(persona);
  const followUpIntensity = calculateFollowUpIntensity(rules, advisor, needScore, persona);

  const overFollowUpRisk = clamp(followUpIntensity - needScore + (rules.aktivitetsplikt === 'strict' ? 8 : 0));
  const underFollowUpRisk = clamp(needScore - followUpIntensity + (advisor.id === 'overbelastet' ? 8 : 0));

  const rtwProbability26Weeks = clamp(
    58 +
      (followUpIntensity - underFollowUpRisk * 0.5) * 0.22 -
      needScore * 0.28 -
      overFollowUpRisk * 0.12 +
      persona.motivasjon * 4 +
      persona.arbeidsplassTilrettelegging * 3
  );

  const advisorResourceUse = clamp(
    followUpIntensity * 0.65 + needScore * 0.2 + (rules.veilederKapasitet < 3 ? 10 : 0)
  );

  return {
    personaId: persona.id,
    personaNavn: persona.navn,
    needScore: Number(needScore.toFixed(1)),
    followUpIntensity: Number(followUpIntensity.toFixed(1)),
    overFollowUpRisk: Number(overFollowUpRisk.toFixed(1)),
    underFollowUpRisk: Number(underFollowUpRisk.toFixed(1)),
    rtwProbability26Weeks: Number(rtwProbability26Weeks.toFixed(1)),
    advisorResourceUse: Number(advisorResourceUse.toFixed(1))
  };
}

export function runSimulation(personas: Persona[], rules: RuleSet, advisor: AdvisorProfile): SimulationResult {
  const personaResults = personas.map((persona) => simulatePersona(persona, rules, advisor));

  const sum = personaResults.reduce(
    (acc, row) => {
      acc.need += row.needScore;
      acc.intensity += row.followUpIntensity;
      acc.over += row.overFollowUpRisk;
      acc.under += row.underFollowUpRisk;
      acc.rtw += row.rtwProbability26Weeks;
      acc.resources += row.advisorResourceUse;
      return acc;
    },
    { need: 0, intensity: 0, over: 0, under: 0, rtw: 0, resources: 0 }
  );

  const n = personaResults.length || 1;
  return {
    advisorProfile: advisor,
    rules,
    personaResults,
    aggregate: {
      avgNeedScore: Number((sum.need / n).toFixed(1)),
      avgFollowUpIntensity: Number((sum.intensity / n).toFixed(1)),
      avgOverFollowUpRisk: Number((sum.over / n).toFixed(1)),
      avgUnderFollowUpRisk: Number((sum.under / n).toFixed(1)),
      avgRtwProbability26Weeks: Number((sum.rtw / n).toFixed(1)),
      totalAdvisorResourceUse: Number(sum.resources.toFixed(1))
    }
  };
}
