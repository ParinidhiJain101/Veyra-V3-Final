import React, { useState, useEffect, useRef } from 'react';
import {
  Crosshair,
  Layers,
  Cpu,
  FileCode,
  ExternalLink,
  Menu,
  X,
  History,
  Compass,
  BarChart3,
  MapPin,
  SlidersHorizontal,
  GitCompare,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

import { getDocsUrl } from '../api/client';

export type ActiveView =
  | 'sentinel'
  | 'spatial'
  | 'multi-location'
  | 'disagreement'
  | 'revision'
  | 'replay'
  | 'analogs'
  | 'metrics'
  | 'batch'
  | 'models'
  | 'docs';

const DOCS_EXTERNAL_URL = getDocsUrl();

interface NavigationProps {
  view: ActiveView;
  setView: (view: ActiveView) => void;
  onOpenProvenance?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ view, setView, onOpenProvenance }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelectView = (newView: ActiveView) => {
    setView(newView);
    setMobileMenuOpen(false);
  };

  const getViewLabel = (v: ActiveView) => {
    switch (v) {
      case 'sentinel':
        return 'Reliability Sentinel';
      case 'spatial':
        return 'Spatial Reliability';
      case 'multi-location':
        return 'Multi-Location Intelligence';
      case 'disagreement':
        return 'Forecast Disagreement';
      case 'revision':
        return 'Forecast Revision';
      case 'replay':
        return 'Historical Replay';
      case 'analogs':
        return 'Analog Explorer';
      case 'metrics':
        return 'Research Metrics';
      case 'batch':
        return 'Batch Evaluation';
      case 'models':
        return 'Model Registry';
      case 'docs':
        return 'API Documentation';
      default:
        return 'Reliability Sentinel';
    }
  };

  return (
    <nav className="dropdown-nav" ref={navRef} aria-label="Main Navigation">
      {/* Mobile Menu Toggle Button */}
      <div className="mobile-nav-header">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>Workstation Navigation</span>
        </button>
        <span className="mobile-current-view">
          {getViewLabel(view)}
        </span>
      </div>

      {/* Nav Items Container Organized by Scientific Workstation Domains */}
      <div className={`nav-items-container ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        
        {/* DOMAIN 1: OPERATIONAL SENTINEL */}
        <div className="nav-domain-group">
          <span className="nav-domain-tag">FORECAST OPERATIONS</span>
          
          <div className="dropdown">
            <button
              type="button"
              className={view === 'sentinel' ? 'active' : ''}
              onClick={() => handleSelectView('sentinel')}
              title="Single Station NWP Reliability Sentinel Console"
            >
              <Crosshair size={15} className="nav-btn-icon" /> Reliability Sentinel
            </button>
          </div>

          <div className="dropdown">
            <button
              type="button"
              className={view === 'spatial' ? 'active' : ''}
              onClick={() => handleSelectView('spatial')}
              title="25 Certified IMD Stations Spatial Reliability Matrix"
            >
              <MapPin size={15} className="nav-btn-icon" /> Spatial Reliability
            </button>
          </div>

          <div className="dropdown">
            <button
              type="button"
              className={view === 'multi-location' ? 'active' : ''}
              onClick={() => handleSelectView('multi-location')}
              title="High-Density Multi-Location Monitoring Matrix"
            >
              <SlidersHorizontal size={15} className="nav-btn-icon" /> Multi-Location
            </button>
          </div>
        </div>

        <div className="nav-domain-separator" aria-hidden="true" />

        {/* DOMAIN 2: ENSEMBLE & DYNAMICS */}
        <div className="nav-domain-group">
          <span className="nav-domain-tag">DIAGNOSTICS &amp; VOLATILITY</span>

          <div className="dropdown">
            <button
              type="button"
              className={view === 'disagreement' ? 'active' : ''}
              onClick={() => handleSelectView('disagreement')}
              title="Ensemble Spread, Member Dispersion & Outlier Diagnostics"
            >
              <GitCompare size={15} className="nav-btn-icon" /> Disagreement
            </button>
          </div>

          <div className="dropdown">
            <button
              type="button"
              className={view === 'revision' ? 'active' : ''}
              onClick={() => handleSelectView('revision')}
              title="Cycle-to-Cycle Forecast Trajectory Volatility & Flip-Flop Index"
            >
              <TrendingUp size={15} className="nav-btn-icon" /> Revision
            </button>
          </div>

          <div className="dropdown">
            <button
              type="button"
              className={view === 'analogs' ? 'active' : ''}
              onClick={() => handleSelectView('analogs')}
              title="Synoptic Atmospheric Pattern Analog Matching"
            >
              <Compass size={15} className="nav-btn-icon" /> Analog Explorer
            </button>
          </div>
        </div>

        <div className="nav-domain-separator" aria-hidden="true" />

        {/* DOMAIN 3: BENCHMARK & REPLAY */}
        <div className="nav-domain-group">
          <span className="nav-domain-tag">BENCHMARK &amp; REPLAY</span>

          <div className="dropdown">
            <button
              type="button"
              className={view === 'replay' ? 'active' : ''}
              onClick={() => handleSelectView('replay')}
              title="Digital Twin Deterministic Historical Replay"
            >
              <History size={15} className="nav-btn-icon" /> Historical Replay
              <span className="nav-badge badge-demo">§20 Demo</span>
            </button>
          </div>

          <div className="dropdown">
            <button
              type="button"
              className={view === 'batch' ? 'active' : ''}
              onClick={() => handleSelectView('batch')}
              title="Synoptic Batch Prediction Across All 25 Certified Stations"
            >
              <Layers size={15} className="nav-btn-icon" /> Batch Evaluation
              <span className="nav-badge badge-stations">25 Stations</span>
            </button>
          </div>

          <div className="dropdown">
            <button
              type="button"
              className={view === 'metrics' ? 'active' : ''}
              onClick={() => handleSelectView('metrics')}
              title="Scientific Reliability Diagrams, Lead Gain & Verification Metrics"
            >
              <BarChart3 size={15} className="nav-btn-icon" /> Research Metrics
            </button>
          </div>
        </div>

        <div className="nav-domain-separator" aria-hidden="true" />

        {/* DOMAIN 4: SYSTEMS & GOVERNANCE */}
        <div className="nav-domain-group">
          <span className="nav-domain-tag">SYSTEMS</span>

          <div className="dropdown">
            <button
              type="button"
              className={view === 'models' ? 'active' : ''}
              onClick={() => handleSelectView('models')}
              title="V3 LightGBM Lifecycle Model Registry"
            >
              <Cpu size={15} className="nav-btn-icon" /> Model Registry
            </button>
          </div>

          <div className="dropdown">
            <button
              type="button"
              className={view === 'docs' ? 'active' : ''}
              onClick={() => handleSelectView('docs')}
              title="Embedded OpenAPI 3.1 Documentation"
            >
              <FileCode size={15} className="nav-btn-icon" /> API Docs
            </button>
          </div>
        </div>

        {/* RIGHT SIDE UTILITIES */}
        <div className="nav-utilities-group">
          {onOpenProvenance && (
            <div className="dropdown">
              <button
                type="button"
                className="btn-provenance-nav"
                onClick={() => {
                  onOpenProvenance();
                  setMobileMenuOpen(false);
                }}
                title="Inspect Cryptographic Data Lineage, SHA-256 Checksums & Provenance Hashes"
              >
                <ShieldCheck size={14} className="nav-btn-icon" /> Lineage &amp; Provenance
              </button>
            </div>
          )}

          <div className="nav-external-link">
            <a
              href={DOCS_EXTERNAL_URL}
              target="_blank"
              rel="noreferrer"
              title="Open OpenAPI 3.1 Swagger in new tab"
            >
              Swagger <ExternalLink size={12} />
            </a>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
