import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ResearchMetrics } from '../components/ResearchMetrics';
import { apiClient } from '../api/client';
import { ApiError } from '../api/types';

describe('V2 Manual F14 / VULN-P14-001 Research Metrics Truth & Provenance', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('test_unverified_metrics_are_marked: displays explicit unverified badge when backend API is unavailable', async () => {
    // Simulate failed API response
    vi.spyOn(apiClient, 'getComprehensiveEvaluation').mockResolvedValue({
      data: null,
      error: { status_code: 503, message: 'Backend API unavailable' } as ApiError,
    });

    render(<ResearchMetrics />);

    // Must show explicit unverified fallback badge rather than silent authoritative certification
    await waitFor(() => {
      const badge = document.getElementById('metrics-provenance-badge');
      expect(badge).toBeTruthy();
      expect(badge?.textContent).toContain('UNVERIFIED FALLBACK');
      expect(badge?.getAttribute('data-provenance')).toBe('UNVERIFIED_FALLBACK');
    });

    // Verify presence of unverified provenance label
    expect(screen.getByText(/Static Baseline \(Unverified Offline\)/i)).toBeTruthy();
  });

  it('test_no_hardcoded_certified_metrics: dynamically reflects verified live API metrics when backend responds', async () => {
    const mockLiveMetrics = {
      model_name: 'lightgbm_v3_challenger_live',
      model_version: 'veyra-v3-live-verified',
      sample_count: 15000,
      bust_count: 1056,
      bust_prevalence: 0.0704,
      discrimination_and_probability: {
        pr_auc: 0.1189,
        average_precision: 0.1180,
        roc_auc: 0.6913,
        brier_score: 0.0654,
        log_loss_value: 0.2341,
        expected_calibration_error: 0.0349,
        max_calibration_error: 0.0521,
        calibration_slope: 0.9912,
        calibration_intercept: 0.0021,
        reliability_diagram: {
          prob_pred: [0.05, 0.15, 0.25],
          prob_true: [0.048, 0.149, 0.252],
          bin_counts: [10000, 3000, 2000],
          bin_edges: [0.0, 0.1, 0.2, 0.3],
          ece: 0.0349,
          mce: 0.0521,
        },
      },
      warning_lead_time_gain: {
        total_bust_events: 1056,
        median_lead_time_gain_hours: 24.0,
        mean_lead_time_gain_hours: 26.4,
        pct_flagged_24h_veyra: 0.884,
        pct_flagged_48h_veyra: 0.742,
        pct_flagged_72h_veyra: 0.581,
        pct_flagged_24h_spread: 0.621,
        pct_flagged_48h_spread: 0.384,
        pct_flagged_72h_spread: 0.192,
        lead_time_gain_24h_gain_pct: 0.263,
        lead_time_gain_48h_gain_pct: 0.358,
        lead_time_gain_72h_gain_pct: 0.389,
      },
      spatial_metrics: {
        fss_by_scale: { '3x3': 0.8152 },
        mean_fss: 0.8152,
        fss_useful_scale: '3x3',
        object_iou: 0.68,
        centroid_error_km: 42.0,
        top_k_recall: 0.84,
        k_value: 5,
        pred_area_fraction: 0.05,
        obs_area_fraction: 0.05,
        area_fraction_error: 0.0,
      },
      safety_coverage_risk: {
        coverage_risk_curve: [],
        overall_abstention_rate: 0.05,
        retained_samples_count: 14250,
        retained_case_brier_score: 0.0653,
        retained_case_pr_auc: 0.121,
        high_confidence_error_rate: 0.018,
        risk_reduction_pct: 0.08,
      },
      stratified_evaluation: {
        total_samples: 15000,
        total_busts: 1056,
        dimensions: ['lead_time_hours'],
        strata: {},
      },
      operational_burden: {
        total_samples: 15000,
        total_cycles: 155,
        decision_threshold: 0.06,
        total_alerts: 1200,
        false_alerts: 400,
        false_alerts_per_cycle: 2.5,
        alert_rate: 0.08,
        alert_persistence_rate: 0.85,
        alert_flicker_rate: 0.15,
        estimated_review_time_hours: 300,
        estimated_review_hours_per_cycle: 1.9,
        recall_at_5pct_budget: 0.45,
        recall_at_10pct_budget: 0.65,
        recall_at_20pct_budget: 0.82,
      },
      explanation_quality: {
        total_evaluated_cases: 15000,
        mean_attribution_stability: 0.89,
        mean_rank_correlation: 0.87,
        mean_fidelity_drop: 0.18,
        fidelity_score: 0.85,
        forecaster_agreement_rate: 0.82,
        analog_eligibility_rate: 0.91,
        top_drivers_frequency: {},
        summary_verdict: 'PASS',
      },
      evaluation_status: 'VERIFIED_PASS',
      generated_at: '2026-09-29T18:00:00Z',
    };

    vi.spyOn(apiClient, 'getComprehensiveEvaluation').mockResolvedValue({
      data: mockLiveMetrics as any,
      error: undefined,
    });

    render(<ResearchMetrics />);

    await waitFor(() => {
      const badge = document.getElementById('metrics-provenance-badge');
      expect(badge).toBeTruthy();
      expect(badge?.textContent).toContain('LIVE VERIFIED API');
      expect(badge?.getAttribute('data-provenance')).toBe('LIVE_API');
    });

    // Check that live sample count and model version are rendered
    expect(screen.getByText(/15,000/)).toBeTruthy();
    expect(screen.getByText(/veyra-v3-live-verified/)).toBeTruthy();
  });

  it('test_frontend_metrics_match_backend_artifact: displays PR-AUC and Brier Score accurately from payload', async () => {
    const payload = {
      model_name: 'lightgbm_v3_challenger',
      model_version: 'v3.0.0-artifact-locked',
      sample_count: 15000,
      bust_count: 1056,
      bust_prevalence: 0.0704,
      discrimination_and_probability: {
        pr_auc: 0.1189,
        average_precision: 0.1180,
        roc_auc: 0.6913,
        brier_score: 0.0654,
        log_loss_value: 0.2341,
        expected_calibration_error: 0.0349,
        max_calibration_error: 0.0521,
        calibration_slope: 0.9912,
        calibration_intercept: 0.0021,
        reliability_diagram: {
          prob_pred: [0.05],
          prob_true: [0.05],
          bin_counts: [15000],
          bin_edges: [0.0, 1.0],
          ece: 0.0349,
          mce: 0.0521,
        },
      },
      warning_lead_time_gain: {
        total_bust_events: 1056,
        median_lead_time_gain_hours: 24.0,
        mean_lead_time_gain_hours: 26.4,
        pct_flagged_24h_veyra: 0.884,
        pct_flagged_48h_veyra: 0.742,
        pct_flagged_72h_veyra: 0.581,
        pct_flagged_24h_spread: 0.621,
        pct_flagged_48h_spread: 0.384,
        pct_flagged_72h_spread: 0.192,
        lead_time_gain_24h_gain_pct: 0.263,
        lead_time_gain_48h_gain_pct: 0.358,
        lead_time_gain_72h_gain_pct: 0.389,
      },
      spatial_metrics: {
        fss_by_scale: {},
        mean_fss: 0.85,
        fss_useful_scale: '3x3',
        object_iou: 0.7,
        centroid_error_km: 40.0,
        top_k_recall: 0.85,
        k_value: 5,
        pred_area_fraction: 0.05,
        obs_area_fraction: 0.05,
        area_fraction_error: 0.0,
      },
      safety_coverage_risk: {
        coverage_risk_curve: [],
        overall_abstention_rate: 0.05,
        retained_samples_count: 14250,
        retained_case_brier_score: 0.0653,
        retained_case_pr_auc: 0.121,
        high_confidence_error_rate: 0.018,
        risk_reduction_pct: 0.08,
      },
      stratified_evaluation: {
        total_samples: 15000,
        total_busts: 1056,
        dimensions: [],
        strata: {},
      },
      operational_burden: {
        total_samples: 15000,
        total_cycles: 155,
        decision_threshold: 0.06,
        total_alerts: 1000,
        false_alerts: 300,
        false_alerts_per_cycle: 2.0,
        alert_rate: 0.07,
        alert_persistence_rate: 0.85,
        alert_flicker_rate: 0.15,
        estimated_review_time_hours: 200,
        estimated_review_hours_per_cycle: 1.5,
        recall_at_5pct_budget: 0.45,
        recall_at_10pct_budget: 0.65,
        recall_at_20pct_budget: 0.82,
      },
      explanation_quality: {
        total_evaluated_cases: 15000,
        mean_attribution_stability: 0.89,
        mean_rank_correlation: 0.87,
        mean_fidelity_drop: 0.18,
        fidelity_score: 0.85,
        forecaster_agreement_rate: 0.82,
        analog_eligibility_rate: 0.91,
        top_drivers_frequency: {},
        summary_verdict: 'PASS',
      },
      evaluation_status: 'VERIFIED_PASS',
      generated_at: '2026-09-29T18:00:00Z',
    };

    vi.spyOn(apiClient, 'getComprehensiveEvaluation').mockResolvedValue({
      data: payload as any,
      error: undefined,
    });

    render(<ResearchMetrics />);

    await waitFor(() => {
      expect(screen.getByText('0.1189')).toBeTruthy();
      expect(screen.getByText('0.0654')).toBeTruthy();
    });
  });
});
