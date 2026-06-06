import { SimulationResult } from './types';

export type AnalysisProvider = {
  analyzeSimulation: (result: SimulationResult) => Promise<string>;
};

export class MockAnalysisProvider implements AnalysisProvider {
  async analyzeSimulation(result: SimulationResult): Promise<string> {
    const { aggregate, advisorProfile } = result;

    const strength =
      aggregate.avgRtwProbability26Weeks > 65
        ? 'Scenariet gir generelt god sannsynlighet for retur i arbeid innen 26 uker.'
        : 'Scenariet viser moderat effekt og kan trenge justering for utsatte grupper.';

    const riskAlert =
      aggregate.avgUnderFollowUpRisk > aggregate.avgOverFollowUpRisk
        ? 'Hovedrisikoen er underoppfølging, særlig ved høy saksmengde.'
        : 'Hovedrisikoen er overoppfølging for enklere saker.';

    return `Mock AI-vurdering: Med veilederprofilen «${advisorProfile.navn}» ser vi at ${strength} ${riskAlert} Anbefaling: test lavere aktivitetsplikt eller høyere behovsgrad og sammenlign.`;
  }
}

// Fremtidig integrasjonspunkt for OpenAI API.
// Erstatt MockAnalysisProvider med en klasse som kaller en API-rute.
