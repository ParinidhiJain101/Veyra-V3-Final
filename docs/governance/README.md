# VEYRA SENTINEL — Governance, Certification & Evidence Architecture

**Standard:** `VEYRA_COMPLETE_PHASE_BY_PHASE_EXECUTION_MANUAL_V2.md`  
**Scope:** VEYRA Sentinel Medium-Range Weather Forecast Bust Detection System  
**Release:** `Veyra-Know-When-Forecasts-May-Fail-VERSION-3` (v2.0.0)  

---

## 1. Governance Architecture Overview

This directory houses the authoritative governance and scientific verification manual for VEYRA Sentinel:

```text
docs/governance/
├── VEYRA_COMPLETE_PHASE_BY_PHASE_EXECUTION_MANUAL_V2.md   # Complete 9,355-line master blueprint
├── V2_SCORECARDS.md                                       # Non-compensatory 95+ scorecards report
└── README.md                                              # This index document
```

And corresponding machine-readable registries in `manifests/`:
```text
manifests/
├── CLAIM_REGISTRY.md                                      # 20 audited claims with allowed/forbidden phrasing
├── CAPABILITY_REGISTRY.md                                 # 15 capability maturity states (Certified, Experimental, Blocked)
├── METRIC_REGISTRY.json                                   # Mathematical formulas, directions, roles, CI methods
├── SCIENTIFIC_NEGATIVE_RESULTS.md                         # 5 documented falsified hypotheses and negative results
├── RELEASE_BLOCKER_MATRIX.json                            # 9 release blockers with verified resolutions
└── computed_v2_hashes.json                                # SHA-256 integrity hashes for all release artifacts
```

And formal release authority in `release/`:
```text
release/
├── RELEASE_MANIFEST.json                                  # Master release identity & operational bounds
├── ARTIFACT_HASHES.json                                   # Cryptographic hashes of all core artifacts
├── DATA_MANIFEST.json                                     # Benchmark dataset provenance & leakage audit
├── MODEL_MANIFEST.json                                    # Model hyperparameters & evaluation metrics
├── TEST_MANIFEST.json                                     # 1,132 test results summary (100% passing)
└── CLAIM_MANIFEST.json                                    # Claims categorized by evidence class
```

---

## 2. Core Scientific Rules

1. **Missing Evidence $\to$ ABSTAIN:** Never convert missingness into zero or NORMAL.
2. **Physically Impossible Input $\to$ ABSTAIN:** Never present invalid sensor readings as safe.
3. **Out-of-Distribution (OOD) $\to$ Lower Trust / Abstain:** OOD is not high confidence.
4. **ABSTAIN $\to$ Probability Null:** Abstention is a safety refusal, not low risk.
5. **Fixture is Never Live:** Synthetic simulations are never empirical atmospheric proof.
6. **Heuristic is Never Trained ML:** Deterministic formulas must never be advertised as trained AI weights.
7. **Certification Defaults to False:** Certification is earned strictly from verified evidence.
