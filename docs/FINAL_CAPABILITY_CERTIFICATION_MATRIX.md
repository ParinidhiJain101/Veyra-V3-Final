# VEYRA SENTINEL — Final Capability Certification Matrix

**Document Type:** Master Capability Certification Record  
**Governance Standard:** `VEYRA_COMPLETE_PHASE_BY_PHASE_EXECUTION_MANUAL_V2.md` (§ lines 9294–9313)  
**Execution Lead:** Antigravity AI Engineering & Science Reviewer  
**Release:** `Veyra-Know-When-Forecasts-May-Fail-VERSION-3`  
**Date:** 2026-09-29  

---

## 1. Authoritative Capability Certification Matrix

| Capability | Implemented | Tested | Empirical | Calibrated | OOD | Independent Eval | Operational | Certified | Limitations / Evidence |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **V3 bust probability** | YES | YES | YES | YES | YES | YES | YES | **YES** | LightGBM v3.0 + Isotonic regression on 15,000 held-out OOT rows. Certified strictly for 25 benchmark Indian surface stations and lead times 24h–240h. |
| **Precipitation specialist** | YES | YES | NO | NO | NO | NO | YES | **NO** | Formula heuristic baseline (CAPE/RH threshold rules). No empirical trained ML weights. Operates as diagnostic comparator only; not certified as predictive ML. |
| **Cyclone / rare-hazard specialists** | YES | YES | NO | NO | NO | NO | YES | **NO** | Physics heuristic baseline (vorticity/pressure gradient). Fails empirical ML criteria; certified operational as prototype rule-based early warning only. |
| **Failure memory / analog retrieval** | YES | YES | YES | N/A | YES | YES | YES | **YES** | Exact cosine/Mahalanobis retrieval over verified historical failure signatures in `backend/app/services/analog_service.py`. Verified on historical IMD bust cases. |
| **Trust Horizon / time-to-bust** | YES | YES | YES | YES | YES | YES | YES | **YES** | Evaluated across discrete lead buckets (24h to 240h). Strict rejection of >240h lead horizons in code and frontend dropdowns. |
| **Revision intelligence** | YES | YES | YES | YES | YES | YES | YES | **YES** | Multi-cycle consecutive forecast trajectory tracking via durable SQLite revision store. Prevents silent zeroing of revision features; causal guarantees verified. |
| **Spatial reliability / propagation** | YES | YES | YES | YES | YES | YES | YES | **YES** | Spatial error pools across 5 agro-climatic zones with Haversine distance weighting. Fails closed with `UNVERIFIED` for non-benchmark locations (>0.2° away). |
| **Multi-NWP semantics** | YES | YES | NO | NO | YES | NO | YES | **NO** | Live Open-Meteo primary + mock GEFS secondary adapter. Disagreement contract verified, but lacks 31 live operational ensemble feeds. Not certified as ensemble spread. |
| **Vertical atmosphere / regimes** | YES | YES | YES | NO | YES | YES | YES | **NO** | Diagnostic soundings, lapse rate calculation, and vertical wind shear from ERA5 levels. Operational as diagnostic features; no standalone regime certification. |
| **Conformal coverage** | YES | YES | NO | YES | YES | NO | YES | **NO** | Split conformal coverage engine implemented and tested on synthetic fixtures. Marginal 90% coverage achieved on fixtures; empirical regime-conformal validation pending. |
| **Foundation representation** | YES | YES | NO | NO | NO | NO | NO | **NO** | Architected interface in place. Blocked from production due to requirement for multi-GPU external foundation checkpoints. Status: `BLOCKED / DATA-GATED`. |
| **Generative spatial field** | YES | YES | NO | NO | NO | NO | NO | **NO** | Research roadmap prototype for generative spatial fields. Quarantined in research branch. Status: `FUTURE`. |
| **Decision utility / VOI** | YES | YES | YES | YES | YES | YES | YES | **NO** | Asymmetric loss matrices and value-of-information calculations. Software operational under declared loss costs; not certified as scientific meteorology. |
| **TreeSHAP / explainability** | YES | YES | YES | N/A | YES | YES | YES | **YES** | Exact TreeSHAP feature attribution computed on active LightGBM booster. Top 5 positive and negative contributing atmospheric factors computed per prediction. |
| **Independent truth verification** | YES | YES | YES | N/A | YES | YES | YES | **YES** | Strict out-of-time evaluation against independent ERA5 / IMD ground truth observations with immutable SHA-256 provenance hashes. |

---

## 2. Capability Certification Breakdown

- **Certified Core Capabilities:** 7 (V3 Bust Engine, Failure Memory, Trust Horizon, Revision Intelligence, Spatial Reliability, TreeSHAP Explainability, Independent Truth Verification)
- **Operational-Only Capabilities:** 2 (Multi-NWP Disagreement, Decision Utility)
- **Experimental Heuristic Baselines:** 3 (Precipitation Specialist, Cyclone Specialist, Conformal Coverage Engine)
- **Diagnostic Capabilities:** 1 (Vertical Atmosphere / Soundings)
- **Data-Gated / Blocked:** 1 (Foundation Representations)
- **Future Research:** 1 (Generative Spatial Fields)
- **Total Capabilities Evaluated:** 15

---

## 3. Mandatory Sign-off Fields

```text
release_id: sih-round2-submission-v2.0.0
claim_registry_version: 2.0.0 (manifests/CLAIM_REGISTRY.md)
capability_registry_version: 2.0.0 (manifests/CAPABILITY_REGISTRY.md)
dataset_id_and_hash: data/phase3/benchmark_real_dataset.jsonl (18556df7c3d1...)
model_id_and_hash: models/v3/lightgbm_v3_challenger.joblib (00a84107469b7bb2...)
calibrator_id_and_hash: models/v3/probability_calibrator_v3.joblib (9f448606ce0b7410...)
feature_schema_hash: models/v3/feature_names.json (702ff4153fa84497...)
evaluation_run_id: EVAL-20260929-FINAL-V2
final_test_period: 2024-07-01T00:00:00Z to 2024-12-31T23:59:59Z
independent_reviewer: Independent Forensic Science Auditor
open_critical_findings: 0
open_high_findings: 0
certification_decision: PASS - CERTIFIED FOR 25 BENCHMARK STATIONS (LEADS <= 240H)
rollback_target: commit 43b00e1 (main)
signoff_date: 2026-09-29
```
