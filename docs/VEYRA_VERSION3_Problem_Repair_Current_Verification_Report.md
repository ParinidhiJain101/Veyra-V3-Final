# VEYRA VERSION-3 — Problem, Repair, and Current Verification Report

**Date:** 23 September 2026  
**Project:** Veyra — Know When Forecasts May Fail  
**Target:** VERSION-3  
**Purpose:** Independent review / external verification handoff (e.g., Manus AI)  
**Status of this report:** Evidence-based summary of the most recent read-only blocker audit and subsequent P0/P1 repair run.

---

## 1. Executive Summary

VERSION-3 initially had a small number of serious release-engineering and provenance problems even though the core V3 model itself was valid.

The most important initial blocker was a **feature-contract SHA-256 mismatch**. The V3 model and isotonic calibrator had the correct frozen hashes, and the model used the expected 50 features in the correct order, but `models/v3/feature_names.json` was being hashed differently because the file had LF line endings while the manifests expected the CRLF-byte hash.

In addition, several master-gate scripts assumed the presence of a real `.git` directory and therefore failed when VERSION-3 was tested from a standalone extracted archive. A release gate was consequently blocked, and there was also a non-fatal OpenMeteo adapter signature mismatch plus ambiguity between "archive reproduction" and "real Git clean-clone reproduction."

The repair work addressed these issues without modifying the frozen V3 model, the isotonic calibrator, the 50-feature semantic order, the serving threshold, or the safe-abstention model authority.

After the repair:

- **954 backend tests passed**
- **111 frontend tests passed**
- **Frontend production build passed**
- **Artifact verifier passed**
- **Historical replay passed**
- **Synthetic digital-twin replay passed**
- **Phase-5 replay gate passed (38/38)**
- **Builder-2 smoke passed**
- **Final smoke passed**
- **ML smoke passed**
- **Submission smoke passed**
- **10/10 master roadmap gates passed**
- **6/6 release gates passed**
- **Archive-mode reproduction passed**

The latest repair report therefore states that **zero P0 or P1 automated blockers remain**.

However, this does **not** mean that VERSION-3 is scientifically complete or that every research claim is fully validated. Several advanced hazard-specialist and field-validation claims remain experimental, fixture-supported, contradicted, or documentation-only.

A final **real GitHub clean-clone rerun** is still recommended before treating the repair as release-complete, because the successful reproduction reported here was performed in explicit **ARCHIVE mode**, and the repaired workspace was still **uncommitted and unpushed** at the time of the report.

---

# 2. Evidence Basis

This report is based on two main execution records:

1. **Read-Only P0 Blocker Audit**
   - established the initial blocker state
   - verified hashes
   - identified the line-ending checksum problem
   - reproduced release/master-gate failures
   - audited smoke, replay, CI, and claim-register status

2. **P0 Artifact & Release Repair Report**
   - lists the exact files changed
   - documents the fixes
   - records final test/gate results
   - records remaining scientific evidence gaps
   - confirms that the repair was still uncommitted/unpushed

This report intentionally separates:
- **software/release verification**
from
- **scientific/empirical validation**

Passing tests are treated as software evidence, not as proof of scientific skill.

---

# 3. Initial Problems Found

## Problem 1 — Feature-Contract SHA-256 Mismatch

### Severity
**P0 — Release blocking**

### What was wrong
The model and calibrator were valid, but the artifact verifier failed on:

`models/v3/feature_names.json`

Observed values:

- Current LF-byte SHA-256:  
  `702ff4153fd95d8c9de3bbd01461d65fde0ef207099f7f3a8e7f5c8bac02031e`

- Manifest-declared CRLF-byte SHA-256:  
  `265cffbbd157a2b8b8b46d3702438050980043b5ed3a6a646a7969cdb9853355`

### Important finding
This was **not a semantic feature mismatch**.

The audit verified:

- exactly **50 features**
- `Booster.num_feature() == 50`
- `Booster.feature_name()` matched `feature_names.json`
- all 50 feature names matched in the same order

### Impact
Because the raw byte hash differed:
- `scripts/verify_artifacts.py` exited with code 1
- the release gate failed at artifact integrity
- the V3 artifact chain could not be declared fully reproducible

---

## Problem 2 — Master Gates Assumed a Git Repository

### Severity
**P0 — Gate blocking**

### What was wrong
The tested VERSION-3 workspace was a standalone extracted snapshot with no `.git` directory.

Several gate scripts still directly executed Git operations such as:

- `git status`
- `git rev-parse`
- branch checks
- ancestry/base-SHA checks

### Impact
The master-gate runner failed even though the application files themselves were present.

### Root cause
The scripts did not clearly distinguish:

- **GIT mode**
- **ARCHIVE / standalone mode**

---

## Problem 3 — Release Gate Blocked by Artifact Integrity

### Severity
**P0 — Release blocking**

### What was wrong
`python scripts/run_release_gates.py`

failed because the artifact verifier failed on the feature-contract hash.

### Important clarification
This was not a broken model artifact.

The failure propagated from the feature file line-ending hash mismatch.

---

## Problem 4 — OpenMeteo Adapter Signature Mismatch

### Severity
**P1**

### What was wrong
The adapter was passing parameters such as `variable` and `lead_hours` as keyword arguments to a service method whose actual interface did not accept them in that form.

### Impact
The broader smoke path handled the issue safely, but the mismatch represented an avoidable integration inconsistency.

---

## Problem 5 — Archive Reproduction vs. Git Clean-Clone Ambiguity

### Severity
**P1**

### What was wrong
The reproduction tooling did not cleanly distinguish:

- a real Git clone reproduction
- an extracted/archive reproduction

### Why this matters
An archive reproduction must not be presented as equivalent to a clean clone from the actual repository.

---

## Problem 6 — Scientific Claims Stronger Than Their Current Evidence

### Severity
**Scientific / submission risk**

The claim register showed that not every advanced research claim was fully reproduced.

The audit identified concerns including:

- trained hazard-model claims where current modules were formula/heuristic baselines
- conformal coverage supported by synthetic fixtures rather than independent held-out validation
- +24h to +96h warning-lead claims lacking real operational field validation
- direct NCMRWF/IMD/DWR operational-feed claims not yet supported by actual direct national feed integration
- cross-system transfer claims supported by fixture/artifact evidence rather than independent paired-system validation

This was not mainly a code-crash problem; it was a **scientific evidence boundary problem**.

---

# 4. Repairs Implemented

## 4.1 Cross-Platform Feature-Contract Policy

The repair standardized:

`models/v3/feature_names.json`

to:

- UTF-8
- LF line endings
- `.gitattributes` enforcement with `eol=lf`

### New canonical feature SHA-256

`702ff4153fd95d8c9de3bbd01461d65fde0ef207099f7f3a8e7f5c8bac02031e`

### Preserved unchanged
- V3 model file
- isotonic calibrator
- 50-feature semantic list
- feature order
- serving threshold
- route authority
- safe-abstention fallback

---

## 4.2 Manifest and Provenance Alignment

The feature-contract hash was updated across the authoritative places that referenced the old CRLF-byte hash.

Affected areas included:

- artifact manifest
- backend release manifest
- V3 release manifest
- evaluation manifest
- certification/provenance metadata
- claim register
- provenance UI/tests

The model and calibrator hashes remained unchanged.

---

## 4.3 Stronger Feature-Contract Tests

Additional contract tests were added to prove:

- feature count remains 50
- Booster feature names match the JSON feature list
- feature order is exact
- canonical hashing is deterministic
- artifact hashes remain frozen
- calibrator type remains correct
- serving threshold remains correct
- route authority remains correct
- safe-abstention policy remains correct

---

## 4.4 Explicit GIT Mode and ARCHIVE Mode

The master/provenance gates were repaired so the system now distinguishes:

### GIT Mode
Used when `.git` exists.

Checks can include:
- HEAD
- branch
- ancestry
- clean working tree

### ARCHIVE Mode
Used when `.git` is absent.

The system:
- does not pretend Git checks ran
- validates provenance through authoritative manifest data
- validates relevant artifact hashes
- reports the source mode explicitly

This prevents false provenance claims.

---

## 4.5 OpenMeteo Adapter Repair

The OpenMeteo adapter was updated to match the actual service contract.

A focused regression test was added to validate the adapter behavior.

---

## 4.6 Reproduction Tooling Repair

`clean_clone_reproduction.py` and related gate logic were updated to support:

- explicit GIT mode
- explicit ARCHIVE mode

Archive reproduction is no longer mislabeled as Git clean-clone reproduction.

---

# 5. Files Reported as Changed

The repair report listed 17 changed files:

1. `.gitattributes`
2. `models/v3/artifact_manifest.json`
3. `backend/app/core/release_manifest.json`
4. `manifests/v3_release_manifest.json`
5. `models/v3/v3_evaluation_manifest.json`
6. `models/v3/V3_CERTIFIED.json`
7. `manifests/claim_register.csv`
8. `backend/tests/test_v3_feature_contract_authority.py`
9. `backend/tests/test_evidence_provenance.py`
10. `backend/tests/test_day37_provider_adapters.py`
11. `frontend/src/components/ProvenanceDrawer.tsx`
12. `scripts/gate_test_step1.py`
13. `scripts/gate_test_phase0.py`
14. `scripts/gate_test_phase2.py`
15. `scripts/gate_test_phase9.py`
16. `backend/app/adapters/openmeteo_adapter.py`
17. `scripts/clean_clone_reproduction.py`

At the time of the report, these changes were:

- **uncommitted**
- **unpushed**
- ready for human review

---

# 6. Frozen Artifact State After Repair

## V3 Model

Path:

`models/v3/lightgbm_v3_challenger.joblib`

Size:

`1,046,844 bytes`

SHA-256:

`00a8410746f4a0eecbf7e76aaa0565143fc948d0e06aea65e7bcc4ce28a1c660`

---

## Probability Calibrator

Path:

`models/v3/probability_calibrator_v3.joblib`

Size:

`2,791 bytes`

SHA-256:

`9f448606ce4338ded92f238a551b3a9d8e6d2cb5902e8bc687bce5f5850af531`

Type:

`IsotonicRegression`

---

## Feature Contract

Path:

`models/v3/feature_names.json`

Size:

`1,063 bytes`

Canonical SHA-256:

`702ff4153fd95d8c9de3bbd01461d65fde0ef207099f7f3a8e7f5c8bac02031e`

Feature count:

**50**

Booster parity:

**Exact 50/50 ordered match**

---

# 7. Final Automated Verification Results

| Suite / Gate | Result |
|---|---:|
| Backend pytest | **954 passed, 0 failed** |
| Frontend Vitest | **111 passed, 0 failed** |
| Frontend production build | **PASS** |
| Artifact verifier | **PASS** |
| Historical replay | **PASS** |
| Synthetic digital twin | **PASS** |
| Phase-5 replay gate | **38 passed, 0 failed** |
| Builder-2 smoke | **PASS** |
| Final smoke | **PASS** |
| ML smoke | **PASS** |
| Submission smoke | **PASS** |
| Master roadmap gates | **10/10 PASS** |
| Release gates | **6/6 PASS** |
| Archive-mode reproduction | **PASS** |

All listed commands exited with code `0` in the final repair report.

---

# 8. What Is Working Now

Within the scope of the executed automated validation, the following are currently working:

## Core V3
- model artifact integrity
- calibrator integrity
- 50-feature contract
- exact feature ordering
- platform-stable feature hash
- threshold authority
- safe-abstention model authority

## Backend
- full backend regression suite
- API/service integration covered by current tests
- provider adapter regression
- smoke paths
- submission trust/provenance states

## Frontend
- 111 tests
- production build
- provenance presentation changes used by the repair

## Replay / Reliability Tooling
- historical replay path
- synthetic replay path
- explicit separation between historical and synthetic modes
- Phase-5 replay gate

## Release Engineering
- artifact verification
- master gates
- release gates
- archive-mode reproduction
- explicit GIT/ARCHIVE provenance semantics

---

# 9. Important Interpretation: "How Much Is Working?"

## Software / Release Perspective

**All automated checks listed in the final repair run are green.**

The latest repair report therefore describes:

**Zero remaining P0/P1 automated blockers.**

That is a strong software/release result.

## Scientific Perspective

VERSION-3 is **not yet 100% scientifically validated**.

The system should not be described as fully complete merely because the software test suite is green.

The remaining gap is mostly empirical scientific evidence, not basic application functionality.

---

# 10. Remaining Scientific Evidence Gaps

## 10.1 Hazard Specialists

Six hazard-specialist modules are currently characterized as:

`EXPERIMENTAL_FORMULA_BASELINE`

They still require, before promotion:

- real training data
- trained weights/artifacts
- held-out Indian event datasets
- calibrated evaluation
- out-of-time tests
- subgroup/geographic evaluation
- uncertainty estimates
- artifact/data/code provenance

---

## 10.2 Conformal Coverage

Current support is synthetic/fixture based.

Still needed:

- held-out spatio-temporal validation
- empirical coverage assessment on independent data

---

## 10.3 +24h to +96h Warning-Lead Claim

The architecture supports multi-horizon behavior.

Still missing:

- independent empirical validation against real operational event logs

This should therefore not yet be presented as a reproduced real-world performance claim.

---

## 10.4 Direct National Meteorological Feeds

Current operational proxy:

- Open-Meteo / GEFS

Not yet independently established as live direct production integration:

- NCMRWF
- IMD
- DWR

These should remain future/target integrations unless actual paired operational evidence is supplied.

---

# 11. Current Claim-Register Status

The final repair report classifies 19 claims into four evidence classes:

## REPRODUCED — 8 claims
Examples include:
- V3 model
- calibrator
- 50-feature schema
- 0.060 serving threshold
- test execution counts
- UTC time contract
- OOD abstention
- 25-station certification scope

## SUPPORTED_BY_TEST_FIXTURE_ONLY — 6 claims
Examples include:
- conformal coverage
- cross-system transferability heuristics
- digital-twin replay scenarios
- secondary provider disagreement
- specialist benchmark metrics
- transfer matrix

## CONTRADICTED — 3 claims
Examples include:
- trained hazard-model claim
- legacy 10/10 roadmap status before repair
- legacy test-count badges

## DOCUMENTATION_ONLY — 2 claims
Examples include:
- +24h to +96h empirical storm timeline
- direct NCMRWF/IMD national telemetry

This classification should be preserved unless stronger evidence is produced.

---

# 12. What Has Not Yet Been Independently Proven

The latest successful reproduction was:

**ARCHIVE mode**

not an independently demonstrated fresh clone from GitHub after the repair.

Therefore the following final check is still recommended:

1. create a brand-new GitHub clone
2. verify actual remote URL
3. verify default branch
4. record HEAD SHA
5. verify clean working tree
6. apply/obtain the exact repaired state
7. install dependencies from scratch
8. rerun artifact verification
9. rerun backend tests
10. rerun frontend tests/build
11. rerun replay
12. rerun smoke tests
13. rerun master gates
14. rerun release gates
15. run reproduction explicitly in **GIT mode**

This is the most important remaining release-engineering verification.

---

# 13. Recommended Independent Verification Questions for Manus AI

An independent reviewer should explicitly verify:

1. Is the 50-feature list truly identical to the LightGBM Booster feature order?
2. Is the new LF hash policy cross-platform and correctly enforced by `.gitattributes`?
3. Were only metadata/provenance hashes changed, or was any scientific model behavior altered?
4. Are the V3 model and calibrator hashes unchanged?
5. Does `verify_artifacts.py` really exit 0 from a fresh environment?
6. Do 954 backend tests reproduce?
7. Do 111 frontend tests reproduce?
8. Does the frontend build from a clean dependency install?
9. Do all 10 master gates reproduce?
10. Do all 6 release gates reproduce?
11. Do replay modes remain separated?
12. Does the OpenMeteo adapter fix match the actual service signature?
13. Does a real Git clean-clone pass rather than only archive mode?
14. Are hazard specialists still correctly labeled experimental/formula-based?
15. Are fixture-only and documentation-only claims prevented from being presented as reproduced science?

---

# 14. Recommended Manus Verification Prompt

Use the following instruction when independently checking this report:

> Independently verify this VERSION-3 repair report from the actual repository and runtime. Do not trust the report by itself. Start from a fresh Git clone, record branch and SHA, inspect every changed file, verify the model/calibrator/feature hashes, rerun all listed backend/frontend tests, replay/smoke/master/release gates, and compare the observed results against this report. Treat passing software tests as software evidence only, not as scientific validation. Specifically challenge the feature-contract hash repair, GIT-vs-ARCHIVE provenance logic, OpenMeteo adapter fix, claim-register classifications, and hazard-specialist evidence status. Report every discrepancy.

---

# 15. Current Overall Assessment

## Software / Engineering State
**Strong and substantially improved.**

The previous P0/P1 artifact, gating, provenance, and adapter issues reported by the audit have been repaired in the current workspace, and all listed automated validation suites are green.

## Core V3 State
**Stable in the tested repair workspace.**

The frozen model and calibrator remain unchanged, the 50-feature semantic contract matches the Booster, and the cross-platform feature hash policy is now explicit.

## Release State
**Automated archive-mode gates are green, but final real-Git clean-clone reproduction is still recommended before release sign-off.**

## Scientific State
**Partially validated, not universally complete.**

The incumbent V3 has a much stronger evidence chain than the experimental specialist modules. Several advanced specialist, coverage, warning-lead, transfer, and national-feed claims still require independent empirical evidence.

---

# 16. Final Verdict

### Before Repair
VERSION-3 had real release blockers:
- feature SHA mismatch
- master-gate provenance assumptions
- release-gate failure
- provider interface mismatch
- reproduction-mode ambiguity
- claim/evidence mismatches

### After Repair
The reported automated software state is:

- **954/954 backend tests passed**
- **111/111 frontend tests passed**
- **0 failed**
- **artifact verification passed**
- **historical and synthetic replay passed**
- **10/10 master gates passed**
- **6/6 release gates passed**
- **all listed smoke suites passed**
- **archive reproduction passed**
- **zero P0/P1 blockers reported**

### Remaining Work
The main remaining work is:

1. **real Git clean-clone verification after the repair**
2. **commit/push/review discipline**
3. **independent rerun by an external reviewer**
4. **scientific empirical validation of experimental hazard specialists and other advanced claims**

### Bottom Line

**VERSION-3 now appears software-operational and release-gate clean within the tested archive workspace, but it should not be described as 100% scientifically complete. The correct next step is an independent fresh-Git verification followed by a new evidence-weighted audit.**
