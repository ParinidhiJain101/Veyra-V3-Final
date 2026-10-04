import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';
import { apiClient } from '../api/client';
import { DashboardIntelligenceResponse, DashboardTimelinePoint, PredictionResponse, DashboardMode } from '../api/types';

// Helper to generate full mock prediction
const createMockPrediction = (): PredictionResponse => ({
  location: 'Delhi',
  bust_probability: 0.02,
  risk_level: 'LOW',
  trust_state: 'HIGH_CONFIDENCE',
  abstain: false,
  reason_codes: ['MODEL_OPERATIONAL_NOMINAL'],
  model_version: 'veyra-v3-benchmark-lightgbm',
  data_version: 'gefs-reanalysis-v3',
  explanation: {
    primary_driver: 'stable_ensemble_agreement',
    driver_summary: 'Stable forecast with high ensemble consensus.',
    top_contributing_factors: [],
  },
});

// Helper to generate full 16-day backend timeline (24h to 384h in 24h steps)
const create16DayBackendTimeline = (): DashboardTimelinePoint[] => {
  const hours = [24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336, 360, 384];
  return hours.map((h, idx) => ({
    lead_hours: h,
    lead_days: h / 24,
    valid_time: `2026-09-${12 + idx}T12:00:00Z`,
    bust_probability: 0.02 + (idx * 0.005),
    risk_level: 'LOW',
    trust_state: 'HIGH_CONFIDENCE',
    abstain: false,
    is_certified_horizon: h <= 240,
    reason_codes: ['MODEL_OPERATIONAL_NOMINAL'],
  }));
};

// Helper to generate standard 7-day backend timeline (24h to 168h)
const create7DayBackendTimeline = (): DashboardTimelinePoint[] => {
  const hours = [24, 48, 72, 96, 120, 144, 168];
  return hours.map((h, idx) => ({
    lead_hours: h,
    lead_days: h / 24,
    valid_time: `2026-09-${12 + idx}T12:00:00Z`,
    bust_probability: 0.02 + (idx * 0.005),
    risk_level: 'LOW',
    trust_state: 'HIGH_CONFIDENCE',
    abstain: false,
    is_certified_horizon: true,
    reason_codes: ['MODEL_OPERATIONAL_NOMINAL'],
  }));
};

const mockScientificContext = {
  model_version: 'v3-lightgbm-frozen',
  model_family: 'LightGBM-V3-Isotonic',
  calibration_method: 'isotonic',
  feature_count: 50,
  probability_semantics: 'P(Forecast Bust) under calibrated threshold',
  benchmark_scope: 'Certified frozen split',
  benchmark_lead_horizon_max_hours: 240,
  operational_horizon_max_hours: 384,
  historical_benchmark: {
    dataset: 'certified_splits_v3',
    period: '2017-2019',
    test_samples: 116250,
    test_cycles: 155,
    average_precision: 0.2047,
    pr_auc_trapezoidal: 0.2124,
    roc_auc: 0.7698,
    brier_score: 0.0538,
    bss_vs_e0: 0.0807,
    bss_vs_e1b: 0.0778,
    ece: 0.0064,
    log_loss: 0.1782,
    calibration_slope: 0.9852,
    calibration_intercept: 0.0118,
    warning_lead_time_gain_hours: 24.0,
  },
  generalization_limits: ['Certified across 25 canonical stations only'],
};

const createMockDashboardResponse = (
  mode: DashboardMode,
  timeline: DashboardTimelinePoint[],
  variable: string = 'temperature_2m',
  maxLeadHours: number = 384
): DashboardIntelligenceResponse => ({
  location: { query: 'Delhi', resolved_name: 'Delhi Synoptic Station', latitude: 28.61, longitude: 77.21 },
  variable,
  mode,
  status: 'SUCCESS',
  selected_prediction: createMockPrediction(),
  timeline,
  summary: {
    available_points: timeline.length,
    abstained_points: 0,
    total_points: timeline.length,
    max_bust_probability: 0.095,
    max_risk_level: 'LOW',
    max_risk_lead_hours: maxLeadHours,
    mean_bust_probability: 0.0575,
    elevated_risk_points: 0,
    first_elevated_risk_lead_hours: null,
    overall_decision_mode: 'STANDARD_MONITORING',
  },
  scientific_context: mockScientificContext,
});

describe('Frontend-Only Full 10-Day Horizon Scope Adjustment', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(apiClient, 'getHealth').mockResolvedValue({
      data: { status: 'healthy', service: 'test', version: '0.1.0' },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('1. Standard 7-Day mode remains unchanged with exactly 7 points (24h-168h)', async () => {
    const mock7DayData = createMockDashboardResponse('standard_7d', create7DayBackendTimeline(), 'temperature_2m', 168);

    vi.spyOn(apiClient, 'getDashboardIntelligence').mockResolvedValue({ data: mock7DayData });

    render(<App />);

    const auditBtn = screen.getByRole('button', { name: /audit reliability/i });
    fireEvent.click(auditBtn);

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /24h/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /168h/i })).toBeInTheDocument();
    });

    // 192h and beyond must not be in 7-day mode tabs
    expect(screen.queryByRole('tab', { name: /192h/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: /240h/i })).not.toBeInTheDocument();
  });

  it('2. Mode dropdown is labeled as Full 10 Day rather than Full 16 Day', () => {
    render(<App />);
    const modeSelect = screen.getByLabelText(/evaluation horizon mode/i);

    // Option must use 10 Day / 24h-240h wording
    expect(screen.getByRole('option', { name: /Full 10 Day \(24h–240h Synoptic Extension\)/i })).toBeInTheDocument();
    // Must NOT have 16-Day wording
    expect(screen.queryByRole('option', { name: /Full 16 Day/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /384h/i })).not.toBeInTheDocument();
    // Value remains 'full_16d' to preserve backend contract
    expect(modeSelect).toHaveValue('standard_7d');
  });

  it('3. Full 10-Day mode renders exactly the first 10 daily horizons (24h to 240h)', async () => {
    const backendTimeline = create16DayBackendTimeline();
    const mock16DayData = createMockDashboardResponse('full_16d', backendTimeline, 'temperature_2m', 384);

    vi.spyOn(apiClient, 'getDashboardIntelligence').mockResolvedValue({ data: mock16DayData });

    render(<App />);

    const modeSelect = screen.getByLabelText(/evaluation horizon mode/i);
    fireEvent.change(modeSelect, { target: { value: 'full_16d' } });

    const auditBtn = screen.getByRole('button', { name: /audit reliability/i });
    fireEvent.click(auditBtn);

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /240h/i })).toBeInTheDocument();
    });

    // Verify all 10 expected daily horizons exist in ribbon
    const expectedHorizons = ['24h', '48h', '72h', '96h', '120h', '144h', '168h', '192h', '216h', '240h'];
    for (const h of expectedHorizons) {
      expect(screen.getByRole('tab', { name: new RegExp(h) })).toBeInTheDocument();
    }
  });

  it('4. Horizons 264h through 384h are absent from the Full 10-Day presentation', async () => {
    const backendTimeline = create16DayBackendTimeline();
    const mock16DayData = createMockDashboardResponse('full_16d', backendTimeline, 'temperature_2m', 384);

    vi.spyOn(apiClient, 'getDashboardIntelligence').mockResolvedValue({ data: mock16DayData });

    render(<App />);

    const modeSelect = screen.getByLabelText(/evaluation horizon mode/i);
    fireEvent.change(modeSelect, { target: { value: 'full_16d' } });

    const auditBtn = screen.getByRole('button', { name: /audit reliability/i });
    fireEvent.click(auditBtn);

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /240h/i })).toBeInTheDocument();
    });

    // 264h..384h must NOT be rendered in tabs, ribbon, or labels
    const absentHorizons = ['264h', '288h', '312h', '336h', '360h', '384h'];
    for (const h of absentHorizons) {
      expect(screen.queryByRole('tab', { name: new RegExp(h) })).not.toBeInTheDocument();
    }

    // Operational scope badge (>240h) must not be rendered when timeline has <=240h only
    expect(screen.queryByText(/>240h Operational Scope/i)).not.toBeInTheDocument();
  });

  it('5. Backend response containing 16 horizons is safely filtered without mutating the original object', async () => {
    const originalTimeline = create16DayBackendTimeline();
    const mock16DayData = createMockDashboardResponse('full_16d', originalTimeline, 'temperature_2m', 384);

    vi.spyOn(apiClient, 'getDashboardIntelligence').mockResolvedValue({ data: mock16DayData });

    render(<App />);

    const modeSelect = screen.getByLabelText(/evaluation horizon mode/i);
    fireEvent.change(modeSelect, { target: { value: 'full_16d' } });

    const auditBtn = screen.getByRole('button', { name: /audit reliability/i });
    fireEvent.click(auditBtn);

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /240h/i })).toBeInTheDocument();
    });

    // Original data must NOT be mutated
    expect(mock16DayData.timeline.length).toBe(16);
    expect(mock16DayData.summary?.total_points).toBe(16);
  });

  it('6. Temperature variable works with the 10-day horizon limit', async () => {
    const mockData = createMockDashboardResponse('full_16d', create16DayBackendTimeline(), 'temperature_2m', 384);

    vi.spyOn(apiClient, 'getDashboardIntelligence').mockResolvedValue({ data: mockData });

    render(<App />);

    const varSelect = screen.getByLabelText(/target meteorological variable/i);
    fireEvent.change(varSelect, { target: { value: 'temperature_2m' } });

    const modeSelect = screen.getByLabelText(/evaluation horizon mode/i);
    fireEvent.change(modeSelect, { target: { value: 'full_16d' } });

    fireEvent.click(screen.getByRole('button', { name: /audit reliability/i }));

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /240h/i })).toBeInTheDocument();
    });
    expect(screen.queryByRole('tab', { name: /384h/i })).not.toBeInTheDocument();
  });

  it('7. Surface Pressure variable works with the 10-day horizon limit', async () => {
    const mockData = createMockDashboardResponse('full_16d', create16DayBackendTimeline(), 'surface_pressure', 384);

    vi.spyOn(apiClient, 'getDashboardIntelligence').mockResolvedValue({ data: mockData });

    render(<App />);

    const varSelect = screen.getByLabelText(/target meteorological variable/i);
    fireEvent.change(varSelect, { target: { value: 'surface_pressure' } });

    const modeSelect = screen.getByLabelText(/evaluation horizon mode/i);
    fireEvent.change(modeSelect, { target: { value: 'full_16d' } });

    fireEvent.click(screen.getByRole('button', { name: /audit reliability/i }));

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /240h/i })).toBeInTheDocument();
    });
    expect(screen.queryByRole('tab', { name: /384h/i })).not.toBeInTheDocument();
  });

  it('8. Wind Speed variable works with the 10-day horizon limit', async () => {
    const mockData = createMockDashboardResponse('full_16d', create16DayBackendTimeline(), 'wind_speed_10m', 384);

    vi.spyOn(apiClient, 'getDashboardIntelligence').mockResolvedValue({ data: mockData });

    render(<App />);

    const varSelect = screen.getByLabelText(/target meteorological variable/i);
    fireEvent.change(varSelect, { target: { value: 'wind_speed_10m' } });

    const modeSelect = screen.getByLabelText(/evaluation horizon mode/i);
    fireEvent.change(modeSelect, { target: { value: 'full_16d' } });

    fireEvent.click(screen.getByRole('button', { name: /audit reliability/i }));

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /240h/i })).toBeInTheDocument();
    });
    expect(screen.queryByRole('tab', { name: /384h/i })).not.toBeInTheDocument();
  });

  it('9. Switching between Standard 7-Day and Full 10-Day clears previous timeline and does not leave stale >240h selection', async () => {
    const mockData = createMockDashboardResponse('full_16d', create16DayBackendTimeline(), 'temperature_2m', 384);

    vi.spyOn(apiClient, 'getDashboardIntelligence').mockResolvedValue({ data: mockData });

    render(<App />);

    const modeSelect = screen.getByLabelText(/evaluation horizon mode/i);
    fireEvent.change(modeSelect, { target: { value: 'full_16d' } });

    fireEvent.click(screen.getByRole('button', { name: /audit reliability/i }));

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /240h/i })).toBeInTheDocument();
    });

    // Peak risk was 384h in backend summary, but UI must default to a visible <= 240h horizon
    // The panel subtitle must show Within Frozen Benchmark Lead Scope (<=240h)
    expect(screen.getByText(/Within Frozen Benchmark Lead Scope \(≤240h\)/i)).toBeInTheDocument();

    // Now switch back to standard 7-day
    fireEvent.change(modeSelect, { target: { value: 'standard_7d' } });

    // Standby view should appear and stale timeline is cleared
    expect(screen.getByText('FORECAST BUST RISK TIMELINE STANDBY')).toBeInTheDocument();
  });

  it('10. Summary elevated horizons in Full 10-Day mode displays X / 10 consistent with visible scope', async () => {
    const mockData = createMockDashboardResponse('full_16d', create16DayBackendTimeline(), 'temperature_2m', 240);

    vi.spyOn(apiClient, 'getDashboardIntelligence').mockResolvedValue({ data: mockData });

    render(<App />);

    const modeSelect = screen.getByLabelText(/evaluation horizon mode/i);
    fireEvent.change(modeSelect, { target: { value: 'full_16d' } });

    fireEvent.click(screen.getByRole('button', { name: /audit reliability/i }));

    await waitFor(() => {
      expect(screen.getByText('0 / 10')).toBeInTheDocument();
    });
    expect(screen.queryByText('0 / 16')).not.toBeInTheDocument();
  });
});
