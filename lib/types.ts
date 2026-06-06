export type ActivityDuty = 'mild' | 'standard' | 'strict';

export type Persona = {
  id: string;
  navn: string;
  kategori: string;
  belastning: number;
  digitalKompetanse: number;
  arbeidsplassTilrettelegging: number;
  motivasjon: number;
  konfliktNiva: number;
};

export type AdvisorProfile = {
  id: string;
  navn: string;
  stil: string;
  kapasitetFaktor: number;
  relasjonFaktor: number;
  risikoToleranse: number;
};

export type RuleSet = {
  oppfolgingsplanUke: number;
  dialogmote1Uke: number;
  aktivitetsvurderingUke: number;
  dialogmote2Uke: number;
  behovsbasertGrad: number;
  veilederKapasitet: number;
  aktivitetsplikt: ActivityDuty;
};

export type PersonaSimulationResult = {
  personaId: string;
  personaNavn: string;
  needScore: number;
  followUpIntensity: number;
  overFollowUpRisk: number;
  underFollowUpRisk: number;
  rtwProbability26Weeks: number;
  advisorResourceUse: number;
};

export type SimulationResult = {
  advisorProfile: AdvisorProfile;
  rules: RuleSet;
  personaResults: PersonaSimulationResult[];
  aggregate: {
    avgNeedScore: number;
    avgFollowUpIntensity: number;
    avgOverFollowUpRisk: number;
    avgUnderFollowUpRisk: number;
    avgRtwProbability26Weeks: number;
    totalAdvisorResourceUse: number;
  };
};
