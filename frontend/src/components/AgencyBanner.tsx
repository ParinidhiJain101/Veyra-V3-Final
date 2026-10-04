import React from 'react';
import { ShieldAlert, Clock, Radio, Activity, CheckCircle2 } from 'lucide-react';

interface AgencyBannerProps {
  isBackendHealthy: boolean | null;
  utcTime: string;
}

export const AgencyBanner: React.FC<AgencyBannerProps> = ({ isBackendHealthy, utcTime }) => {
  return (
    <header className="agency-banner" role="banner">
      {/* Top Institutional Scientific Masthead Strip */}
      <div className="agency-top-strip">
        <div className="agency-top-left">
          <span className="agency-seal-text">MINISTRY OF EARTH SCIENCES • GOVERNMENT OF INDIA</span>
          <span className="agency-divider" aria-hidden="true">•</span>
          <span className="agency-sub-text">NCMRWF &amp; IMD NWP FORECAST BUST INTELLIGENCE PLATFORM</span>
        </div>
        <div className="agency-top-right">
          <span className="agency-telemetry-chip">
            <Radio size={11} className="telemetry-icon" aria-hidden="true" />
            <span className="telemetry-key">GRID:</span> GEFS 0.25° / GFS
          </span>
          <span className="agency-telemetry-chip">
            <CheckCircle2 size={11} className="telemetry-icon text-accent" aria-hidden="true" />
            <span className="telemetry-key">SCOPE:</span> 25 CERTIFIED STATIONS
          </span>
          <span className="agency-telemetry-chip">
            <Activity size={11} className="telemetry-icon text-accent" aria-hidden="true" />
            <span className="telemetry-key">PROTOCOL:</span> PS 26079 FROZEN
          </span>
        </div>
      </div>

      {/* Primary Brand & Operational Telemetry Bar */}
      <div className="agency-main-bar">
        <div className="brand-group">
          <div className="brand-icon-wrapper">
            <ShieldAlert className="brand-icon" aria-hidden="true" />
          </div>
          <div className="brand-text-block">
            <div className="brand-title-row">
              <span className="brand-title">VEYRA SENTINEL</span>
              <span className="release-tag">v3.0.0-frozen</span>
            </div>
            <span className="brand-subtitle">Atmospheric Forecast Reliability Platform</span>
          </div>
        </div>

        <div className="header-status-group">
          <span className="status-badge status-gateway" role="status" aria-label="Gateway Status">
            <span
              className={`status-dot ${isBackendHealthy === true ? '' : 'offline'}`}
              aria-hidden="true"
            />
            <span>{isBackendHealthy === true ? 'GATEWAY LIVE' : isBackendHealthy === false ? 'GATEWAY OFFLINE' : 'CHECKING GATEWAY...'}</span>
          </span>
          <span className="status-badge status-role">
            <span style={{ color: '#ffd200' }}>ROLE: OPERATIONAL</span>
          </span>
          <span className="status-badge status-utc">
            <Clock size={13} className="utc-clock-icon" aria-hidden="true" />
            <span>UTC:</span> <span className="mono">{utcTime || '--:--:--'}</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default AgencyBanner;

