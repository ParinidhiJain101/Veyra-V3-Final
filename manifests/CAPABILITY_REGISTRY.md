# VEYRA SENTINEL — Master Capability Registry (V2 Governance)

**Document Type:** Formal Capability Maturity & Scientific Certification Matrix  
**Governance Standard:** `VEYRA_COMPLETE_PHASE_BY_PHASE_EXECUTION_MANUAL_V2.md` (§ lines 181, 9294–9313)  
**Status:** Certified & Machine-Audited  

---

## 1. Capability Maturity States

In compliance with VEYRA V2 Governance, capability completion is decoupled from scientific certification. Each capability is independently evaluated across 8 operational and scientific dimensions:

1. **Implemented:** Source code exists and is statically verifiable.
2. **Unit Tested:** Mathematical logic, edge cases, and unit contracts pass.
3. **Integration Tested:** Cross-module interfaces and API data flow verified.
4. **Empirically Evaluated:** Evaluated on real held-out meteorological observations.
5. **Calibrated:** Probabilities and uncertainty intervals calibrated.
6. **OOD Tested:** Out-of-distribution detection and support boundaries enforced.
7. **Operational:** End-to-end execution runs safely within declared bounds.
8. **Certified:** Full provenance, independent audit, and safety gates satisfied.

---

## 2. Authoritative Capability Matrix

| # | Capability Name | Implemented | Unit Tested | Integration Tested | Empirically Evaluated | Calibrated | OOD Tested | Operational | Certified Status | Evidence Location & Limitations |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| 1 | **V3 Bust Probability (Core Engine)** | YES | YES | YES | YES | YES | YES | YES | `CERTIFIED` | `models/v3/`, `artifacts/phase3/`, LightGBM v3.0 + Isotonic regression. Certified strictly for 25 benchmark Indian stations and lead times <= 240h. |
| 2 | **Precipitation Specialist** | YES | YES | YES | NO (Formula) | NO | NO | YES | `EXPERIMENTAL` | `backend/app/builder2/precipitation_specialist.py`. Physics-based CAPE/RH formula heuristic. No trained ML weights; operational as diagnostic comparator only. |
| 3 | **Cyclone / Rare-Hazard Specialists** | YES | YES | YES | NO (Formula) | NO | NO | YES | `EXPERIMENTAL` | `backend/app/builder2/cyclone_specialist.py`. Pressure gradient and vorticity threshold heuristics. Operational as early warning diagnostic; not certified as trained ML. |
| 4 | **Failure Memory / Analog Retrieval** | YES | YES | YES | YES | N/A | YES | YES | `CERTIFIED` | `backend/app/services/analog_service.py`, historical bust catalog. Exact cosine/Mahalanobis retrieval over verified historical failure signatures. |
| 5 | **Trust Horizon / Time-to-Bust** | YES | YES | YES | YES | YES | YES | YES | `CERTIFIED` | `backend/app/services/horizon_reliability_service.py`. Discrete lead horizons (24h to 240h). Rejection of uncertified >240h horizons strictly enforced. |
| 6 | **Revision Trajectory Intelligence** | YES | YES | YES | YES | YES | YES | YES | `CERTIFIED` | `backend/app/services/revision_service.py`, `data/phase3/`. Multi-cycle consecutive forecast drift and jump detection with causal issue-time guarantees. |
| 7 | **Spatial Reliability / Regional Calibration** | YES | YES | YES | YES | YES | YES | YES | `CERTIFIED` | `backend/app/services/spatial_reliability_service.py`. Enforces regional error pools across 5 agro-climatic zones; fails closed for uncalibrated coordinates. |
| 8 | **Multi-NWP Semantics & Disagreement** | YES | YES | YES | NO (Mock Secondary) | NO | YES | YES | `OPERATIONAL_ONLY` | `backend/app/adapters/`. Live Open-Meteo primary + mock GEFS secondary adapter. Disagreement contract validated; awaiting live multi-ensemble member API. |
| 9 | **Vertical Atmosphere & Regimes** | YES | YES | YES | YES (ERA5) | NO | YES | YES | `DIAGNOSTIC` | `backend/app/builder2/weather_regime_engine.py`. Evaluates atmospheric lapse rates, vertical shear, and sounding profiles as diagnostic inputs. |
| 10 | **Conformal / Coverage Control** | YES | YES | YES | NO (Synthetic Fixture) | YES | YES | YES | `EXPERIMENTAL` | `backend/app/builder2/conditional_calibration_engine.py`. Conformal quantile predictor demonstrated on synthetic fixtures; awaiting empirical multi-year calibration set. |
| 11 | **Foundation Representations** | YES | YES | NO | NO | NO | NO | NO | `BLOCKED` | Deep foundation representations require external high-compute GPU checkpoints. Architected interface in place; marked BLOCKED from production. |
| 12 | **Generative Spatial Field Challenger** | YES | YES | NO | NO | NO | NO | NO | `FUTURE` | Diffusion-based spatial field synthesis is a research roadmap item. Not present in active production serving graph. |
| 13 | **Decision Utility / Cost-Sensitive Risk** | YES | YES | YES | YES | YES | YES | YES | `OPERATIONAL_ONLY` | `backend/app/services/decision_service.py`. Asymmetric loss matrices for agriculture, aviation, and disaster response. Operational under declared loss parameters. |
| 14 | **TreeSHAP / Attribution Explainability** | YES | YES | YES | YES | N/A | YES | YES | `CERTIFIED` | `backend/app/services/explanation_service.py`. Exact TreeSHAP feature contributions computed on active LightGBM booster; top contributors verified for every forecast. |
| 15 | **Independent Truth Verification** | YES | YES | YES | YES | N/A | YES | YES | `CERTIFIED` | `scripts/replay_historical.py`, `data/raw_sources/`. Strict verification against independent ERA5 / IMD ground truth observations with immutable SHA-256 provenance. |

---

## 3. Certification Governance Summary

- **Certified Core Capabilities:** 7 / 15 (46.7%) — V3 Bust Engine, Failure Memory, Trust Horizon, Revision Intelligence, Spatial Reliability, TreeSHAP Explainability, Independent Truth Verification.
- **Operational-Only Capabilities:** 2 / 15 (13.3%) — Multi-NWP Provider Disagreement, Decision Utility.
- **Experimental Capabilities:** 3 / 15 (20.0%) — Precipitation Specialist, Cyclone/Hazard Specialists, Conformal Coverage Engine.
- **Diagnostic Capabilities:** 1 / 15 (6.7%) — Vertical Atmosphere / Regimes.
- **Data-Gated / Blocked / Future:** 2 / 15 (13.3%) — Foundation Representations, Generative Spatial Field.
- **Fraudulent / Contradicted Claims Promoted:** 0 (Zero Tolerance Enforced).
