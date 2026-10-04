# Veyra VERSION-3 — Maximum-Score 10-Phase Roadmap

This directory contains the authoritative phase design and execution tracker for the SIH 2026 Maximum-Score Program.

## Phase Overview & Governance

Every phase begins in **PLANNED** status and transitions to **PASSED** only after all phase-specific validation commands pass, the README is updated to match the new evidence class, and changes are cleanly committed.

| Phase | Title | Priority | Status | Target Scope |
| :---: | :--- | :---: | :---: | :--- |
| **01** | [Baseline Freeze, Provenance and Correction Register](phase-01-baseline-freeze-provenance-and-correction-register.md) | **P0** | **PASSED** | Baseline evidence freeze, authoritative issue register, canonical LF hash policy |
| **02** | [Clean Environment and Self-Contained Clone](phase-02-clean-environment-and-self-contained-clone.md) | **P0** | **PLANNED** | Reproducible dependency lockfiles, clean-clone proof without external paths |
| **03** | [Single Artifact and Release Authority](phase-03-single-artifact-and-release-authority.md) | **P0** | **PLANNED** | Centralized release manifest authority, candidate SHA consolidation |
| **04** | [Import Hygiene, Safety Contracts and API Authority](phase-04-import-hygiene-safety-contracts-and-api-authority.md) | **P0** | **PLANNED** | Circular import resolution, decoupled ML services, autonomous parity verifier |
| **05** | [Issue-Time Data, Provenance and Leakage Gate](phase-05-issue-time-data-provenance-and-leakage-gate.md) | **P1** | **PLANNED** | Immutable issue-time contracts, observation sealing, purge/embargo leakage gate |
| **06** | [Independent Historical Replay and Evaluation Truth](phase-06-independent-historical-replay-and-evaluation-truth.md) | **P1** | **PLANNED** | Strict historical vs synthetic CLI separation, held-out event evaluation |
| **07** | [Calibration, OOD, Abstention and Specialist Promotion](phase-07-calibration-ood-abstention-and-specialist-promotion.md) | **P1** | **PLANNED** | Held-out empirical calibration curves, Gate G8 specialist promotion boundaries |
| **08** | [Provider, Spatial, Ensemble and Reliability Intelligence](phase-08-provider-spatial-ensemble-and-reliability-intelligence.md) | **P1** | **PLANNED** | Cross-provider disagreement, ensemble spread, Failure Memory, spatial topology |
| **09** | [CI, Frontend E2E, Operations and Release Gates](phase-09-ci-frontend-e2e-operations-and-release-gates.md) | **P0** | **PLANNED** | GitHub Actions clean-container CI, frontend trust-state E2E, rollback runbook |
| **10** | [Independent Review and SIH Submission Freeze](phase-10-independent-review-and-sih-submission-freeze.md) | **P0** | **PLANNED** | Independent public-tag reproduction, final submission bundle, truth-bounded disclosures |

## Execution Rules

1. **Sequential Phase Gate**: Do not implement later phases while a predecessor phase is incomplete.
2. **Single Phase Per Turn**: Each phase is completed, tested, and pushed before the next is instructed.
3. **Evidence Integrity**: Never present synthetic or fixture evidence as proof of real atmospheric skill.
4. **README Truth Boundary**: The README must strictly reflect current reproducible evidence.
