import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navigation from '../components/Navigation';
import SpatialReliabilityPanel from '../components/SpatialReliabilityPanel';
import MultiLocationPanel from '../components/MultiLocationPanel';
import { ForecastDisagreementPanel } from '../components/ForecastDisagreementPanel';
import { ForecastRevisionPanel } from '../components/ForecastRevisionPanel';
import { apiClient } from '../api/client';
import { clampToBenchmarkLead, BENCHMARK_HORIZON_OPTIONS } from '../data/horizons';

describe('Objective 1: Navigation Day Badge Removal & Operational Badge Preservation', () => {
  it('renders clean top navigation without internal Day badges (Day 27, Day 28, Day 29, Day 30)', () => {
    const handleSetView = vi.fn();
    const handleOpenProvenance = vi.fn();

    render(
      <Navigation
        view="sentinel"
        setView={handleSetView}
        onOpenProvenance={handleOpenProvenance}
      />
    );

    // Verify feature buttons are present with clean labels
    expect(screen.getByRole('button', { name: /Spatial Reliability/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Multi-Location/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Disagreement/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Revision/i })).toBeInTheDocument();

    // Verify internal development badges are NOT rendered anywhere in navigation
    expect(screen.queryByText(/Day 27/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Day 28/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Day 29/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Day 30/i)).not.toBeInTheDocument();
  });

  it('preserves meaningful product & operational mode badges (§20 Demo, 25 Stations)', () => {
    const handleSetView = vi.fn();
    const handleOpenProvenance = vi.fn();

    render(
      <Navigation
        view="sentinel"
        setView={handleSetView}
        onOpenProvenance={handleOpenProvenance}
      />
    );

    // Historical Replay retains §20 Demo
    expect(screen.getByText('§20 Demo')).toBeInTheDocument();
    // Batch Evaluation retains 25 Stations
    expect(screen.getByText('25 Stations')).toBeInTheDocument();
  });
});

describe('Objective 3 & 4: Forecast Lead Horizon Restrictions (24h to 240h)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('verifies shared horizon configuration defines exactly 10 daily horizons up to 240h', () => {
    expect(BENCHMARK_HORIZON_OPTIONS.map((h) => h.lead)).toEqual([
      24, 48, 72, 96, 120, 144, 168, 192, 216, 240,
    ]);
    expect(BENCHMARK_HORIZON_OPTIONS.some((h) => h.lead > 240)).toBe(false);
  });

  it('safely clamps any horizon > 240h or invalid input to default 24h', () => {
    expect(clampToBenchmarkLead(264)).toBe(24);
    expect(clampToBenchmarkLead(384)).toBe(24);
    expect(clampToBenchmarkLead(999)).toBe(24);
    expect(clampToBenchmarkLead(null)).toBe(24);
    expect(clampToBenchmarkLead(undefined)).toBe(24);
    expect(clampToBenchmarkLead(0)).toBe(24);
    expect(clampToBenchmarkLead(-10)).toBe(24);
    expect(clampToBenchmarkLead(120)).toBe(120);
    expect(clampToBenchmarkLead(240)).toBe(240);
  });

  it('Spatial Reliability selector contains only 24h to 240h and no extended optgroup', async () => {
    vi.spyOn(apiClient, 'getSpatialReliability').mockResolvedValue({
      data: {
        timestamp: '2026-09-28T00:00:00Z',
        variable: 'temperature_2m',
        lead_hours: 24,
        is_certified_horizon: true,
        scientific_scope: 'FROZEN_BENCHMARK_LEAD_SCOPE',
        total_stations: 25,
        points: [],
      } as any,
    });

    render(<SpatialReliabilityPanel />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Refresh Spatial Intelligence/i })).toBeInTheDocument();
    });

    const select = screen.getByLabelText(/Forecast Lead Horizon/i) as HTMLSelectElement;
    const leads = Array.from(select.options).map((opt) => Number(opt.value));

    expect(leads).toEqual([24, 48, 72, 96, 120, 144, 168, 192, 216, 240]);
    expect(leads.some((l) => l > 240)).toBe(false);
    expect(screen.queryByText(/Extended Operational Horizon \(264h–384h\)/i)).not.toBeInTheDocument();
  });

  it('Multi-Location selector contains only 24h to 240h and no extended optgroup', async () => {
    vi.spyOn(apiClient, 'getSpatialReliability').mockResolvedValue({
      data: {
        timestamp: '2026-09-28T00:00:00Z',
        variable: 'temperature_2m',
        lead_hours: 24,
        is_certified_horizon: true,
        scientific_scope: 'FROZEN_BENCHMARK_LEAD_SCOPE',
        total_stations: 25,
        points: [],
      } as any,
    });

    render(<MultiLocationPanel />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Refresh Multi-Location Intelligence/i })).toBeInTheDocument();
    });

    const select = screen.getByLabelText(/Forecast Lead Horizon/i) as HTMLSelectElement;
    const leads = Array.from(select.options).map((opt) => Number(opt.value));

    expect(leads).toEqual([24, 48, 72, 96, 120, 144, 168, 192, 216, 240]);
    expect(leads.some((l) => l > 240)).toBe(false);
    expect(screen.queryByText(/Extended Operational Horizon \(264h–384h\)/i)).not.toBeInTheDocument();
  });

  it('Disagreement selector contains only 24h to 240h and no extended options', async () => {
    vi.spyOn(apiClient, 'getForecastDisagreement').mockResolvedValue({
      data: {
        location: 'Kolkata',
        variable: 'temperature_2m',
        lead_hours: 24,
        scientific_scope: 'FROZEN_BENCHMARK_LEAD_SCOPE',
        disagreement_metric: 1.2,
      } as any,
    });

    render(<ForecastDisagreementPanel initialLeadHours={264} />);

    const select = screen.getByLabelText(/LEAD HORIZON/i) as HTMLSelectElement;
    const leads = Array.from(select.options).map((opt) => Number(opt.value));

    expect(leads).toEqual([24, 48, 72, 96, 120, 144, 168, 192, 216, 240]);
    expect(leads.some((l) => l > 240)).toBe(false);
    expect(screen.queryByText(/264h \(11 Days\)/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/384h \(16 Days\)/i)).not.toBeInTheDocument();
  });

  it('Revision selector contains only 24h to 240h and no extended options', async () => {
    vi.spyOn(apiClient, 'getForecastRevision').mockResolvedValue({
      data: {
        location: 'Kolkata',
        variable: 'temperature_2m',
        lead_hours: 24,
        scientific_scope: 'FROZEN_BENCHMARK_LEAD_SCOPE',
        status: 'AVAILABLE',
      } as any,
    });

    render(<ForecastRevisionPanel initialLeadHours={384} />);

    const select = screen.getByLabelText(/FORECAST HORIZON \(LEAD HOURS\)/i) as HTMLSelectElement;
    const leads = Array.from(select.options).map((opt) => Number(opt.value));

    expect(leads).toEqual([24, 48, 72, 96, 120, 144, 168, 192, 216, 240]);
    expect(leads.some((l) => l > 240)).toBe(false);
    expect(screen.queryByText(/264h \(11 Days\)/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/384h \(16 Days\)/i)).not.toBeInTheDocument();
  });
});
