import React, { useState, useEffect, useMemo } from 'react';
import { AgencyBanner } from './components/AgencyBanner';
import { Navigation, ActiveView } from './components/Navigation';
import { LocationForm } from './components/LocationForm';
import { ForecastMap } from './components/ForecastMap';
import { TimelineChart } from './components/TimelineChart';
import { VerificationPanel } from './components/VerificationPanel';
import { BatchPanel } from './components/BatchPanel';
import { ModelCatalog } from './components/ModelCatalog';
import { ApiDocsView } from './components/ApiDocsView';
import { ReplayView } from './components/ReplayView';
import { AnalogExplorer } from './components/AnalogExplorer';
import { ResearchMetrics } from './components/ResearchMetrics';
import { ProvenanceDrawer } from './components/ProvenanceDrawer';
import { BaselineToggle } from './components/BaselineToggle';
import { SpatialReliabilityPanel } from './components/SpatialReliabilityPanel';
import { MultiLocationPanel } from './components/MultiLocationPanel';
import { ForecastDisagreementPanel } from './components/ForecastDisagreementPanel';
import { ForecastRevisionPanel } from './components/ForecastRevisionPanel';
import { apiClient, getApiBaseUrl, getDocsUrl } from './api/client';
import { BENCHMARK_LOCATIONS } from './data/locations';
import {
  DashboardIntelligenceResponse,
  DashboardMode,
  DashboardTimelinePoint,
} from './api/types';

export const App: React.FC = () => {
  const [view, setView] = useState<ActiveView>('sentinel');
  const [utcTime, setUtcTime] = useState<string>('--:--:--');
  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isProvenanceOpen, setIsProvenanceOpen] = useState<boolean>(false);

  // Form State: Initialize to first benchmark station (Delhi)
  const [location, setLocation] = useState<string>(BENCHMARK_LOCATIONS[0].name);
  const [lat, setLat] = useState<number | null>(BENCHMARK_LOCATIONS[0].lat);
  const [lon, setLon] = useState<number | null>(BENCHMARK_LOCATIONS[0].lon);
  const [variable, setVariable] = useState<string>('temperature_2m');
  const [mode, setMode] = useState<DashboardMode>('standard_7d');

  // Dashboard Intelligence Response State
  const [dashboardData, setDashboardData] = useState<DashboardIntelligenceResponse | null>(null);
  const [selectedLeadHours, setSelectedLeadHours] = useState<number | null>(null);

  // Day 29 Disagreement Panel State
  const [disagreementLocation, setDisagreementLocation] = useState<string>('Kolkata');
  const [disagreementVariable, setDisagreementVariable] = useState<string>('temperature_2m');
  const [disagreementLeadHours, setDisagreementLeadHours] = useState<number>(24);

  // Day 30 Revision Panel State
  const [revisionLocation] = useState<string>('Kolkata');
  const [revisionVariable] = useState<string>('temperature_2m');
  const [revisionLeadHours] = useState<number>(24);

  // Live UTC Clock
  useEffect(() => {
    const updateTime = () => setUtcTime(new Date().toISOString().slice(11, 19));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Health check on mount and periodic polling
  useEffect(() => {
    const checkHealth = () => {
      apiClient.getHealth()
        .then(({ data }) => {
          setIsBackendHealthy(data?.status === 'ok' || data?.status === 'healthy');
        })
        .catch(() => {
          setIsBackendHealthy(false);
        });
    };
    checkHealth();
    const interval = setInterval(checkHealth, 20000);
    return () => clearInterval(interval);
  }, []);

  // Clear stale results and unbind coordinates when target parameters change
  const handleLocationChange = (newLoc: string) => {
    setLocation(newLoc);
    setDashboardData(null);
    setSelectedLeadHours(null);
    setError(null);

    const trimmed = newLoc.trim();
    const matchedPreset = BENCHMARK_LOCATIONS.find(
      (l) => l.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (matchedPreset) {
      setLat(matchedPreset.lat);
      setLon(matchedPreset.lon);
    } else {
      const coordMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
      if (coordMatch) {
        const parsedLat = parseFloat(coordMatch[1]);
        const parsedLon = parseFloat(coordMatch[2]);
        if (
          !isNaN(parsedLat) &&
          !isNaN(parsedLon) &&
          parsedLat >= -90 &&
          parsedLat <= 90 &&
          parsedLon >= -180 &&
          parsedLon <= 180
        ) {
          setLat(parsedLat);
          setLon(parsedLon);
          return;
        }
      }
      setLat(null);
      setLon(null);
    }
  };

  const handleVariableChange = (newVar: string) => {
    setVariable(newVar);
    setDashboardData(null);
    setSelectedLeadHours(null);
    setError(null);
  };

  const handleModeChange = (newMode: DashboardMode) => {
    setMode(newMode);
    setDashboardData(null);
    setSelectedLeadHours(null);
    setError(null);
  };

  // Primary Sentinel Audit: Calls centralized POST /v1/dashboard/intelligence
  const handleAudit = async () => {
    if (!location.trim()) {
      setError('Please enter a valid location or coordinates.');
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedLeadHours(null);

    try {
      const { data, error: apiErr } = await apiClient.getDashboardIntelligence({
        location: location.trim(),
        variable,
        mode,
      });

      if (apiErr) {
        setError(apiErr.message || apiErr.error || 'Failed to communicate with Veyra backend.');
        setDashboardData(null);
        setLat(null);
        setLon(null);
      } else if (data) {
        setDashboardData(data);
        // If location context resolved coordinates, update map center; otherwise clear coordinates
        if (data.location?.latitude != null && data.location?.longitude != null) {
          setLat(data.location.latitude);
          setLon(data.location.longitude);
        } else {
          setLat(null);
          setLon(null);
        }
        // Default selected lead hours to peak risk lead hours or canonical 24h within visible horizons
        const effectiveTimeline = mode === 'full_16d' && data.timeline
          ? data.timeline.filter((p) => p.lead_hours <= 240)
          : data.timeline;
        if (effectiveTimeline && effectiveTimeline.length > 0) {
          const candidateLead = data.summary?.max_risk_lead_hours;
          const isCandidateVisible = candidateLead != null && effectiveTimeline.some((p) => p.lead_hours === candidateLead);
          if (isCandidateVisible) {
            setSelectedLeadHours(candidateLead);
          } else {
            const valid = effectiveTimeline.filter((p) => p.bust_probability !== null && !p.abstain);
            if (valid.length > 0) {
              const maxPt = valid.reduce((max, p) => (p.bust_probability ?? -1) > (max.bust_probability ?? -1) ? p : max, valid[0]);
              setSelectedLeadHours(maxPt.lead_hours);
            } else {
              setSelectedLeadHours(effectiveTimeline[0].lead_hours);
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected network failure while contacting Veyra Sentinel.');
      setDashboardData(null);
      setLat(null);
      setLon(null);
    } finally {
      setLoading(false);
    }
  };

  // Filter timeline for presentation: in full_16d mode, limit presentation to 10 days (<= 240h)
  const visibleTimeline = useMemo(() => {
    if (!dashboardData?.timeline) return null;
    if (mode === 'full_16d') {
      return dashboardData.timeline.filter((p) => p.lead_hours <= 240);
    }
    return dashboardData.timeline;
  }, [dashboardData?.timeline, mode]);

  // Derive presentation summary consistent with visible <=240h horizons
  const visibleSummary = useMemo(() => {
    if (!dashboardData?.summary) return null;
    if (mode !== 'full_16d' || !visibleTimeline) {
      return dashboardData.summary;
    }
    const validPoints = visibleTimeline.filter(
      (p) => p.bust_probability !== null && !p.abstain
    );
    const availableCnt = validPoints.length;
    const totalPts = visibleTimeline.length;
    const abstainedCnt = totalPts - availableCnt;

    if (availableCnt === 0) {
      return {
        ...dashboardData.summary,
        available_points: 0,
        abstained_points: abstainedCnt,
        total_points: totalPts,
        max_bust_probability: null,
        max_risk_level: null,
        max_risk_lead_hours: null,
        mean_bust_probability: null,
        elevated_risk_points: 0,
        first_elevated_risk_lead_hours: null,
      };
    }

    const maxPt = validPoints.reduce((max, p) =>
      (p.bust_probability ?? -1) > (max.bust_probability ?? -1) ? p : max
    , validPoints[0]);

    const elevatedPts = validPoints.filter(
      (p) => p.risk_level === 'MEDIUM' || p.risk_level === 'HIGH' || p.risk_level === 'CRITICAL'
    );
    const firstElevated = elevatedPts.length > 0 ? elevatedPts[0].lead_hours : null;
    const probs = validPoints.map((p) => p.bust_probability as number);
    const meanProb = Math.round((probs.reduce((a, b) => a + b, 0) / probs.length) * 10000) / 10000;

    return {
      ...dashboardData.summary,
      available_points: availableCnt,
      abstained_points: abstainedCnt,
      total_points: totalPts,
      max_bust_probability: maxPt.bust_probability,
      max_risk_level: maxPt.risk_level,
      max_risk_lead_hours: maxPt.lead_hours,
      mean_bust_probability: meanProb,
      elevated_risk_points: elevatedPts.length,
      first_elevated_risk_lead_hours: firstElevated,
    };
  }, [dashboardData?.summary, mode, visibleTimeline]);

  // Active timeline point being inspected in VerificationPanel
  const activeTimelinePoint = useMemo<DashboardTimelinePoint | null>(() => {
    if (!visibleTimeline || visibleTimeline.length === 0) return null;
    if (selectedLeadHours === null) return visibleTimeline[0] || null;
    return (
      visibleTimeline.find((p) => p.lead_hours === selectedLeadHours) ||
      visibleTimeline[0] ||
      null
    );
  }, [visibleTimeline, selectedLeadHours]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Agency Header */}
      <AgencyBanner isBackendHealthy={isBackendHealthy} utcTime={utcTime} />

      {/* Navigation */}
      <Navigation
        view={view}
        setView={setView}
        onOpenProvenance={() => setIsProvenanceOpen(true)}
      />

      {/* Breadcrumbs */}
      <div className="breadcrumb">
        Home &gt; Reliability Layer &gt; <strong>{view.toUpperCase()}</strong>
      </div>

      {/* Main Workspace View */}
      <main>
        {view === 'sentinel' && (
          <div className="workspace">
            {/* Left Column: Atmospheric Target Input */}
            <LocationForm
              location={location}
              setLocation={handleLocationChange}
              lat={lat}
              setLat={setLat}
              lon={lon}
              setLon={setLon}
              variable={variable}
              setVariable={handleVariableChange}
              mode={mode}
              setMode={handleModeChange}
              loading={loading}
              onAudit={handleAudit}
              onSwitchToBatch={() => setView('batch')}
            />

            {/* Center Column: Interactive Map & Multi-Horizon Risk Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
              <ForecastMap
                latitude={lat}
                longitude={lon}
                label={dashboardData?.location?.resolved_name || location}
              />

              {/* Error notice if audit failed */}
              {error && (
                <div className="abstention-box" role="alert">
                  <div className="abstention-title">Audit Communication Notice</div>
                  <div className="abstention-desc">{error}</div>
                </div>
              )}

              {/* Multi-Horizon Risk Timeline Chart */}
              {visibleTimeline && visibleTimeline.length > 0 ? (
                <TimelineChart
                  timeline={visibleTimeline}
                  selectedLeadHours={selectedLeadHours}
                  onSelectHorizon={(hours) => setSelectedLeadHours(hours)}
                  variable={variable}
                />
              ) : (
                <div
                  className="timeline-chart-panel"
                  style={{
                    padding: '36px 20px',
                    textAlign: 'center',
                    color: 'var(--noaa-muted)',
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--noaa-dark-blue)', marginBottom: '6px' }}>
                    FORECAST BUST RISK TIMELINE STANDBY
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    Select atmospheric target and click <strong>&quot;Audit Reliability&quot;</strong> to evaluate multi-horizon forecast bust risk.
                  </div>
                </div>
              )}

              {/* Model vs Baseline Comparative Toggle (§17, §20, File 090) */}
              <BaselineToggle
                currentVeyraProbability={activeTimelinePoint?.bust_probability ?? dashboardData?.selected_prediction?.bust_probability ?? 0.58}
                currentSpreadValue={dashboardData?.selected_prediction?.uncertainty_pct ?? 4.8}
                variable={variable}
                leadHours={selectedLeadHours || 48}
              />
            </div>

            {/* Right Column: Telemetry & Conformal Verification */}
            <VerificationPanel
              prediction={dashboardData?.selected_prediction || null}
              selectedPoint={activeTimelinePoint}
              summary={visibleSummary}
              scientificContext={dashboardData?.scientific_context || null}
              locationQuery={location}
              variable={variable}
            />
          </div>
        )}

        {view === 'spatial' && (
          <SpatialReliabilityPanel onNavigateToMultiLocation={() => setView('multi-location')} />
        )}
        {view === 'multi-location' && (
          <MultiLocationPanel
            onNavigateToSpatial={() => setView('spatial')}
            onNavigateToDisagreement={(loc, v, lh) => {
              if (loc) setDisagreementLocation(loc);
              if (v) setDisagreementVariable(v);
              if (lh) setDisagreementLeadHours(lh > 240 ? 24 : lh);
              setView('disagreement');
            }}
          />
        )}
        {view === 'disagreement' && (
          <ForecastDisagreementPanel
            initialLocation={disagreementLocation}
            initialVariable={disagreementVariable}
            initialLeadHours={disagreementLeadHours}
            onNavigateToSpatial={() => setView('spatial')}
            onNavigateToMultiLocation={() => setView('multi-location')}
          />
        )}
        {view === 'revision' && (
          <ForecastRevisionPanel
            initialLocation={revisionLocation}
            initialVariable={revisionVariable}
            initialLeadHours={revisionLeadHours}
            onNavigateToDisagreement={() => setView('disagreement')}
            onNavigateToMultiLocation={() => setView('multi-location')}
          />
        )}
        {view === 'replay' && <ReplayView />}
        {view === 'analogs' && (
          <AnalogExplorer variable={variable} leadHours={selectedLeadHours || 48} />
        )}
        {view === 'metrics' && <ResearchMetrics />}
        {view === 'batch' && <BatchPanel />}
        {view === 'models' && <ModelCatalog />}
        {view === 'docs' && <ApiDocsView />}
      </main>

      {/* Slide-out Data Provenance & Lineage Drawer (§17, §22) */}
      <ProvenanceDrawer
        isOpen={isProvenanceOpen}
        onClose={() => setIsProvenanceOpen(false)}
      />

      {/* Footer */}
      <footer>
        <div>
          <a
            href="https://github.com/adishxm/Veyra-Know-When-Forecasts-May-Fail-VERSION-3"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repository
          </a>
          <a
            href={getDocsUrl()}
            target="_blank"
            rel="noreferrer"
          >
            FastAPI Documentation
          </a>
          <a href={`${getApiBaseUrl() || ''}/v1/health`} target="_blank" rel="noreferrer">
            Health Check API
          </a>
          <a href={`${getApiBaseUrl() || ''}/v1/metrics`} target="_blank" rel="noreferrer">
            Operational Metrics
          </a>
        </div>
        <div style={{ opacity: 0.75, marginTop: '8px' }}>
          &copy; 2026 Veyra Sentinel Research Platform — Atmospheric Forecast Reliability Layer.
        </div>
      </footer>
    </div>
  );
};

export default App;
