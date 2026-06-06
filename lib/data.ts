import { AdvisorProfile, Persona } from './types';

export const PERSONAS: Persona[] = [
  {
    id: 'kort-fysisk-skade',
    navn: 'Kort fysisk skade',
    kategori: 'Fysisk',
    belastning: 2,
    digitalKompetanse: 4,
    arbeidsplassTilrettelegging: 4,
    motivasjon: 4,
    konfliktNiva: 1
  },
  {
    id: 'psykisk-uklar-arbeidsevne',
    navn: 'Psykisk helse og usikker arbeidsevne',
    kategori: 'Psykisk',
    belastning: 5,
    digitalKompetanse: 3,
    arbeidsplassTilrettelegging: 2,
    motivasjon: 3,
    konfliktNiva: 2
  },
  {
    id: 'konflikt-med-arbeidsgiver',
    navn: 'Konflikt med arbeidsgiver',
    kategori: 'Relasjon',
    belastning: 4,
    digitalKompetanse: 3,
    arbeidsplassTilrettelegging: 1,
    motivasjon: 3,
    konfliktNiva: 5
  },
  {
    id: 'hoy-motivasjon-lav-tilrettelegging',
    navn: 'Høy motivasjon, lav tilrettelegging',
    kategori: 'Arbeidsplass',
    belastning: 3,
    digitalKompetanse: 4,
    arbeidsplassTilrettelegging: 1,
    motivasjon: 5,
    konfliktNiva: 2
  },
  {
    id: 'lav-digital-kompleks-situasjon',
    navn: 'Lav digital kompetanse og kompleks livssituasjon',
    kategori: 'Kompleks',
    belastning: 5,
    digitalKompetanse: 1,
    arbeidsplassTilrettelegging: 2,
    motivasjon: 2,
    konfliktNiva: 3
  },
  {
    id: 'ressurssterk-kort-sak',
    navn: 'Ressurssterk korttidssak',
    kategori: 'Korttid',
    belastning: 1,
    digitalKompetanse: 5,
    arbeidsplassTilrettelegging: 5,
    motivasjon: 5,
    konfliktNiva: 1
  }
];

export const ADVISOR_PROFILES: AdvisorProfile[] = [
  {
    id: 'regelorientert',
    navn: 'Regelorientert',
    stil: 'Lik praksis og høy etterlevelse',
    kapasitetFaktor: 1,
    relasjonFaktor: 0.9,
    risikoToleranse: 0.6
  },
  {
    id: 'relasjonell',
    navn: 'Relasjonell',
    stil: 'Tett dialog og tillitsbygging',
    kapasitetFaktor: 0.9,
    relasjonFaktor: 1.3,
    risikoToleranse: 0.5
  },
  {
    id: 'overbelastet',
    navn: 'Overbelastet',
    stil: 'Mange saker og begrenset tid',
    kapasitetFaktor: 0.7,
    relasjonFaktor: 0.8,
    risikoToleranse: 0.8
  },
  {
    id: 'risikobasert',
    navn: 'Risikobasert',
    stil: 'Prioriterer høy-risiko saker',
    kapasitetFaktor: 1,
    relasjonFaktor: 1,
    risikoToleranse: 0.3
  },
  {
    id: 'arbeidsgiverorientert',
    navn: 'Arbeidsgiverorientert',
    stil: 'Aktiverer arbeidsgiver tidlig',
    kapasitetFaktor: 1.1,
    relasjonFaktor: 0.95,
    risikoToleranse: 0.55
  }
];
