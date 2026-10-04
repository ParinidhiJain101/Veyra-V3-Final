import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VeyraApiClient } from '../api/client';
import { PredictionResult } from '../components/PredictionResult';
import { VerificationPanel } from '../components/VerificationPanel';
import { PredictionResponse } from '../api/types';

describe('Scientific Certification Frontend Integration Tests', () => {
  let client: VeyraApiClient;

  beforeEach(() => {
    client = new VeyraApiClient('http://127.0.0.1:8000');
    vi.restoreAllMocks();
  });

  it('fetches certification policy metadata from backend', async () => {
    const mockPolicy = {
      certification_policy_version: '1.0.0',
      evidence_source: 'DAY22_DAY23_BENCHMARK_EVIDENCE',
      certified_scope: {
        synoptic_stations: ['Mumbai', 'Delhi', 'Kolkata'],
        surface_variables: ['temperature_2m', 'wind_speed_10m', 'surface_pressure'],
        max_lead_hours: 240,
        evaluation_years: [2017, 2019],
        station_count: 25,
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPolicy,
    } as Response);

    const res = await client.getCertificationPolicy();
    expect(res.data).toEqual(mockPolicy);
    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/v1/certification/policy', expect.anything());
  });

  it('evaluates certification request via API client', async () => {
    const mockCertResult = {
      certification_status: 'CERTIFIED',
      certification_reason: 'Request lies within frozen benchmark evidence boundary.',
      certification_policy_version: '1.0.0',
      is_certified: true,
      model_sha256_verified: true,
      calibrator_sha256_verified: true,
      certified_scope: {
        synoptic_stations: ['Mumbai'],
        surface_variables: ['temperature_2m'],
        max_lead_hours: 240,
        evaluation_years: [2017, 2019],
        station_count: 25,
      },
      observed_scope: {
        location: 'Mumbai',
        resolved_station: 'Mumbai',
        is_synoptic_station: true,
        variable: 'temperature_2m',
        lead_hours: 24,
        model_version: 'v3_lightgbm_isotonic',
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockCertResult,
    } as Response);

    const res = await client.evaluateCertification({
      location: 'Mumbai',
      variable: 'temperature_2m',
      lead_hours: 24,
    });
    expect(res.data?.certification_status).toBe('CERTIFIED');
    expect(res.data?.is_certified).toBe(true);
  });

  it('renders CERTIFIED EVIDENCE SCOPE badge when prediction is certified', () => {
    const mockPrediction: PredictionResponse = {
      location: 'Mumbai',
      bust_probability: 0.12,
      risk_level: 'LOW',
      trust_state: 'HIGH_CONFIDENCE',
      abstain: false,
      reason_codes: ['NOMINAL_PIPELINE'],
      model_version: 'v3_lightgbm_isotonic',
      data_version: 'v3',
      explanation: null,
      certification: {
        certification_status: 'CERTIFIED',
        certification_reason: 'Request lies within frozen benchmark evidence boundary.',
        certification_policy_version: '1.0.0',
        is_certified: true,
        model_sha256_verified: true,
        calibrator_sha256_verified: true,
        certified_scope: {
          synoptic_stations: ['Mumbai'],
          surface_variables: ['temperature_2m'],
          max_lead_hours: 240,
          evaluation_years: [2017, 2019],
          station_count: 25,
        },
        observed_scope: {
          location: 'Mumbai',
          resolved_station: 'Mumbai',
          is_synoptic_station: true,
          variable: 'temperature_2m',
          lead_hours: 24,
          model_version: 'v3_lightgbm_isotonic',
        },
      },
    };

    render(<PredictionResult prediction={mockPrediction} />);
    expect(screen.getByText('CERTIFIED EVIDENCE SCOPE')).toBeInTheDocument();
  });

  it('renders OUTSIDE CERTIFIED EVIDENCE SCOPE badge when prediction is outside certified scope', () => {
    const mockPrediction: PredictionResponse = {
      location: 'Tokyo',
      bust_probability: 0.45,
      risk_level: 'MEDIUM',
      trust_state: 'HIGH_CONFIDENCE',
      abstain: false,
      reason_codes: ['NOMINAL_PIPELINE'],
      model_version: 'v3_lightgbm_isotonic',
      data_version: 'v3',
      explanation: null,
      certification: {
        certification_status: 'OUTSIDE_CERTIFIED_SCOPE',
        certification_reason: 'Location Tokyo is not among the 25 benchmark synoptic stations.',
        certification_policy_version: '1.0.0',
        is_certified: false,
        model_sha256_verified: true,
        calibrator_sha256_verified: true,
        certified_scope: {
          synoptic_stations: ['Mumbai'],
          surface_variables: ['temperature_2m'],
          max_lead_hours: 240,
          evaluation_years: [2017, 2019],
          station_count: 25,
        },
        observed_scope: {
          location: 'Tokyo',
          resolved_station: null,
          is_synoptic_station: false,
          variable: 'temperature_2m',
          lead_hours: 24,
          model_version: 'v3_lightgbm_isotonic',
        },
      },
    };

    render(<PredictionResult prediction={mockPrediction} />);
    expect(screen.getByText('OUTSIDE CERTIFIED EVIDENCE SCOPE')).toBeInTheDocument();
  });

  describe('HV-001 Certification-Scope Presentation & Horizon Separation', () => {
    it('renders CERTIFIED status with Within Frozen Benchmark Lead Scope for Delhi 24h', () => {
      const mockPrediction: PredictionResponse = {
        location: 'Delhi',
        bust_probability: 0.05,
        risk_level: 'LOW',
        trust_state: 'HIGH_CONFIDENCE',
        abstain: false,
        reason_codes: ['NOMINAL_PIPELINE'],
        model_version: 'v3_lightgbm_isotonic',
        data_version: 'v3',
        explanation: null,
        certification: {
          certification_status: 'CERTIFIED',
          certification_reason: 'Request lies within frozen benchmark evidence boundary.',
          certification_policy_version: '1.0.0',
          is_certified: true,
          model_sha256_verified: true,
          calibrator_sha256_verified: true,
          certified_scope: {
            synoptic_stations: ['Delhi'],
            surface_variables: ['temperature_2m'],
            max_lead_hours: 240,
            evaluation_years: [2017, 2019],
            station_count: 25,
          },
          observed_scope: {
            location: 'Delhi',
            resolved_station: 'Delhi',
            is_synoptic_station: true,
            variable: 'temperature_2m',
            lead_hours: 24,
            model_version: 'v3_lightgbm_isotonic',
          },
        },
      };

      const mockPoint = {
        lead_hours: 24,
        lead_days: 1,
        valid_time: '2026-09-12T12:00:00Z',
        bust_probability: 0.05,
        risk_level: 'LOW' as const,
        trust_state: 'HIGH_CONFIDENCE' as const,
        abstain: false,
        is_certified_horizon: true,
        reason_codes: ['NOMINAL_PIPELINE'],
      };

      render(
        <VerificationPanel
          prediction={mockPrediction}
          selectedPoint={mockPoint}
          locationQuery="Delhi"
          variable="temperature_2m"
        />
      );

      // Telemetry Header distinguishes lead scope:
      expect(screen.getByText(/24h Horizon • Within Frozen Benchmark Lead Scope \(≤240h\)/i)).toBeInTheDocument();
      // Scientific Certification Banner displays CERTIFIED
      expect(screen.getByText('CERTIFIED')).toBeInTheDocument();
      expect(screen.getByText('25-Station Evidence Scope')).toBeInTheDocument();
    });

    it('renders OUTSIDE CERTIFIED SCOPE for uncertified location (Patna) even with <=240h lead', () => {
      const mockPrediction: PredictionResponse = {
        location: 'Patna',
        bust_probability: 0.18,
        risk_level: 'LOW',
        trust_state: 'HIGH_CONFIDENCE',
        abstain: false,
        reason_codes: ['NOMINAL_PIPELINE'],
        model_version: 'v3_lightgbm_isotonic',
        data_version: 'v3',
        explanation: null,
        certification: {
          certification_status: 'OUTSIDE_CERTIFIED_SCOPE',
          certification_reason: 'Location Patna is not among the 25 benchmark synoptic stations.',
          certification_policy_version: '1.0.0',
          is_certified: false,
          model_sha256_verified: true,
          calibrator_sha256_verified: true,
          certified_scope: {
            synoptic_stations: ['Delhi'],
            surface_variables: ['temperature_2m'],
            max_lead_hours: 240,
            evaluation_years: [2017, 2019],
            station_count: 25,
          },
          observed_scope: {
            location: 'Patna',
            resolved_station: null,
            is_synoptic_station: false,
            variable: 'temperature_2m',
            lead_hours: 24,
            model_version: 'v3_lightgbm_isotonic',
          },
        },
      };

      const mockPoint = {
        lead_hours: 24,
        lead_days: 1,
        valid_time: '2026-09-12T12:00:00Z',
        bust_probability: 0.18,
        risk_level: 'LOW' as const,
        trust_state: 'HIGH_CONFIDENCE' as const,
        abstain: false,
        is_certified_horizon: true,
        reason_codes: ['NOMINAL_PIPELINE'],
      };

      render(
        <VerificationPanel
          prediction={mockPrediction}
          selectedPoint={mockPoint}
          locationQuery="Patna"
          variable="temperature_2m"
        />
      );

      // Telemetry Header mentions lead scope without falsely claiming full prediction certification:
      expect(screen.getByText(/24h Horizon • Within Frozen Benchmark Lead Scope \(≤240h\)/i)).toBeInTheDocument();
      // Scientific Certification Banner accurately presents OUTSIDE CERTIFIED SCOPE:
      expect(screen.getByText('OUTSIDE CERTIFIED SCOPE')).toBeInTheDocument();
      expect(screen.getByText('Outside Benchmark Scope')).toBeInTheDocument();
      // MUST NOT claim "Certified Scope" alone:
      expect(screen.queryByText('24h Horizon • Certified Scope')).not.toBeInTheDocument();
    });

    it('renders OUTSIDE CERTIFIED SCOPE and Extended Operational Horizon for lead > 240h', () => {
      const mockPrediction: PredictionResponse = {
        location: 'Delhi',
        bust_probability: 0.22,
        risk_level: 'MEDIUM',
        trust_state: 'HIGH_CONFIDENCE',
        abstain: false,
        reason_codes: ['MODEL_OPERATIONAL_NOMINAL'],
        model_version: 'v3_lightgbm_isotonic',
        data_version: 'v3',
        explanation: null,
        certification: {
          certification_status: 'OUTSIDE_CERTIFIED_SCOPE',
          certification_reason: 'Lead horizon 264h exceeds maximum certified benchmark horizon (240h).',
          certification_policy_version: '1.0.0',
          is_certified: false,
          model_sha256_verified: true,
          calibrator_sha256_verified: true,
          certified_scope: {
            synoptic_stations: ['Delhi'],
            surface_variables: ['temperature_2m'],
            max_lead_hours: 240,
            evaluation_years: [2017, 2019],
            station_count: 25,
          },
          observed_scope: {
            location: 'Delhi',
            resolved_station: 'Delhi',
            is_synoptic_station: true,
            variable: 'temperature_2m',
            lead_hours: 264,
            model_version: 'v3_lightgbm_isotonic',
          },
        },
      };

      const mockPoint = {
        lead_hours: 264,
        lead_days: 11,
        valid_time: '2026-09-22T12:00:00Z',
        bust_probability: 0.22,
        risk_level: 'MEDIUM' as const,
        trust_state: 'HIGH_CONFIDENCE' as const,
        abstain: false,
        is_certified_horizon: false,
        reason_codes: ['MODEL_OPERATIONAL_NOMINAL'],
      };

      render(
        <VerificationPanel
          prediction={mockPrediction}
          selectedPoint={mockPoint}
          locationQuery="Delhi"
          variable="temperature_2m"
        />
      );

      expect(screen.getByText(/264h Horizon • Extended Operational Horizon \(>240h\)/i)).toBeInTheDocument();
      expect(screen.getByText('OUTSIDE CERTIFIED SCOPE')).toBeInTheDocument();
      expect(screen.getByText('Outside Benchmark Scope')).toBeInTheDocument();
    });

    it('renders CERTIFIED status with backend authoritative status/reason_detail schema for Delhi 144h', () => {
      const mockPrediction: PredictionResponse = {
        location: 'Delhi',
        bust_probability: 0.08,
        risk_level: 'LOW',
        trust_state: 'HIGH_CONFIDENCE',
        abstain: false,
        reason_codes: ['NOMINAL_PIPELINE'],
        model_version: 'veyra-v3-benchmark-lightgbm',
        data_version: 'gefs-openmeteo-v1.0',
        explanation: null,
        certification: {
          status: 'CERTIFIED',
          is_certified: true,
          reason_code: 'CERTIFIED_FROZEN_BENCHMARK_SCOPE',
          reason_detail: 'Request lies within frozen benchmark evidence boundary.',
          policy_version: 'v3.0.0-frozen-benchmark',
          model_sha256: '99059e9a4f4efbfe72cbfe37494daff120f2695fb77e52292f7e090db4a5b3a4',
          calibrator_sha256: '1daee2ff807755b76bfa254ff03ebc18a2ca819fef20b0805c6a1bf58416d2b4',
          evaluated_location: 'Delhi',
          evaluated_variable: 'temperature_2m',
          evaluated_lead_hours: 144,
          certified_benchmark_stations: ['Delhi', 'Mumbai', 'Kolkata'],
          certified_variables: ['temperature_2m', 'wind_speed_10m', 'surface_pressure'],
          max_certified_lead_hours: 240,
          certified_evaluation_period: '2017-2019 (Test Holdout)',
        },
      };

      const mockPoint = {
        lead_hours: 144,
        lead_days: 6,
        valid_time: '2026-09-18T12:00:00Z',
        bust_probability: 0.08,
        risk_level: 'LOW' as const,
        trust_state: 'HIGH_CONFIDENCE' as const,
        abstain: false,
        is_certified_horizon: true,
        reason_codes: ['NOMINAL_PIPELINE'],
      };

      render(
        <VerificationPanel
          prediction={mockPrediction}
          selectedPoint={mockPoint}
          locationQuery="Delhi"
          variable="temperature_2m"
        />
      );

      // Telemetry Header distinguishes lead scope:
      expect(screen.getByText(/144h Horizon • Within Frozen Benchmark Lead Scope \(≤240h\)/i)).toBeInTheDocument();
      // Scientific Certification Banner displays CERTIFIED
      expect(screen.getByText('CERTIFIED')).toBeInTheDocument();
      expect(screen.getByText('25-Station Evidence Scope')).toBeInTheDocument();
      // MUST NOT display CERTIFICATION UNKNOWN or Outside Benchmark Scope:
      expect(screen.queryByText('CERTIFICATION UNKNOWN')).not.toBeInTheDocument();
      expect(screen.queryByText('Outside Benchmark Scope')).not.toBeInTheDocument();
    });

    it('renders CERTIFIED EVIDENCE SCOPE in PredictionResult with backend authoritative status schema', () => {
      const mockPrediction: PredictionResponse = {
        location: 'Delhi',
        bust_probability: 0.08,
        risk_level: 'LOW',
        trust_state: 'HIGH_CONFIDENCE',
        abstain: false,
        reason_codes: ['NOMINAL_PIPELINE'],
        model_version: 'veyra-v3-benchmark-lightgbm',
        data_version: 'gefs-openmeteo-v1.0',
        explanation: null,
        certification: {
          status: 'CERTIFIED',
          is_certified: true,
          reason_code: 'CERTIFIED_FROZEN_BENCHMARK_SCOPE',
          reason_detail: 'Request lies within frozen benchmark evidence boundary.',
          policy_version: 'v3.0.0-frozen-benchmark',
        },
      };

      render(<PredictionResult prediction={mockPrediction} />);
      expect(screen.getByText('CERTIFIED EVIDENCE SCOPE')).toBeInTheDocument();
      expect(screen.queryByText('CERTIFICATION UNKNOWN')).not.toBeInTheDocument();
    });
  });
});

