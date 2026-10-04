export interface HorizonOption {
  lead: number;
  label: string;
  scope: 'FROZEN_BENCHMARK_LEAD_SCOPE';
}

export const FROZEN_BENCHMARK_HORIZON_OPTIONS: HorizonOption[] = [
  { lead: 24, label: '24h (1 Day)', scope: 'FROZEN_BENCHMARK_LEAD_SCOPE' },
  { lead: 48, label: '48h (2 Days)', scope: 'FROZEN_BENCHMARK_LEAD_SCOPE' },
  { lead: 72, label: '72h (3 Days)', scope: 'FROZEN_BENCHMARK_LEAD_SCOPE' },
  { lead: 96, label: '96h (4 Days)', scope: 'FROZEN_BENCHMARK_LEAD_SCOPE' },
  { lead: 120, label: '120h (5 Days)', scope: 'FROZEN_BENCHMARK_LEAD_SCOPE' },
  { lead: 144, label: '144h (6 Days)', scope: 'FROZEN_BENCHMARK_LEAD_SCOPE' },
  { lead: 168, label: '168h (7 Days)', scope: 'FROZEN_BENCHMARK_LEAD_SCOPE' },
  { lead: 192, label: '192h (8 Days)', scope: 'FROZEN_BENCHMARK_LEAD_SCOPE' },
  { lead: 216, label: '216h (9 Days)', scope: 'FROZEN_BENCHMARK_LEAD_SCOPE' },
  { lead: 240, label: '240h (10 Days) [Benchmark Limit]', scope: 'FROZEN_BENCHMARK_LEAD_SCOPE' },
];

export const HORIZON_OPTIONS = FROZEN_BENCHMARK_HORIZON_OPTIONS;
export const BENCHMARK_HORIZON_OPTIONS = FROZEN_BENCHMARK_HORIZON_OPTIONS;

export const MAX_BENCHMARK_LEAD_HOURS = 240;
export const DEFAULT_LEAD_HOURS = 24;

/**
 * Validates and clamps a lead hour value to the frozen benchmark scope (24h - 240h).
 * Falls back to DEFAULT_LEAD_HOURS (24h) if invalid or > 240h.
 */
export function clampToBenchmarkLead(leadHours?: number | null): number {
  if (leadHours == null || typeof leadHours !== 'number' || isNaN(leadHours) || leadHours <= 0) {
    return DEFAULT_LEAD_HOURS;
  }
  if (leadHours > MAX_BENCHMARK_LEAD_HOURS) {
    return DEFAULT_LEAD_HOURS;
  }
  return leadHours;
}
