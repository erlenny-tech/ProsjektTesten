import { SimulationResult, RuleSet } from './types';

const RESULT_KEY = 'simlab-result';
const RULES_KEY = 'simlab-rules';

export function saveSimulationState(result: SimulationResult, rules: RuleSet) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(RESULT_KEY, JSON.stringify(result));
  window.localStorage.setItem(RULES_KEY, JSON.stringify(rules));
}

export function getSavedSimulationResult(): SimulationResult | null {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(RESULT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SimulationResult;
  } catch {
    return null;
  }
}
