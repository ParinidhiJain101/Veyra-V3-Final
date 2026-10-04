# VEYRA SENTINEL — Complete Phase-by-Phase Remediation and Execution Manual

**Generated:** 2026-09-29  
**Source:** `VEYRA_FINAL_MASTER_PHASE_BY_PHASE_95_PLUS_EXECUTION_BLUEPRINT.md`  
**Scope:** Original forensic Phases 0–20 plus the remediation program Phases 0–66  
**Purpose:** A single, step-by-step operating document for engineering, ML, data, QA, security, release, and independent review teams.

> **Important:** The source uses the same phase numbers for the original audit and the remediation program. This manual calls them **Forensic Phase F0–F20** and **Remediation Phase R0–R66** to prevent accidental confusion.

## How to use this manual

1. Start with the forensic findings and freeze the current state.
2. Execute remediation phases in dependency order; do not skip a gate because a later feature is attractive.
3. For every phase, track implementation, tests, evidence, reviewer, decision, and rollback target.
4. Treat `HOLD`, `BLOCKED`, `EXPERIMENTAL`, `DIAGNOSTIC`, `HEURISTIC`, `FIXTURE`, and `SYNTHETIC` as non-certified states.
5. Never promote a claim, model, provider, metric, or UI statement without a provenance-linked evidence record.

## Non-negotiable scientific and safety rules

- `missing evidence → ABSTAIN`; never convert missingness into zero or NORMAL.
- `physically impossible input → ABSTAIN`; never present it as safe.
- `OOD → lower trust / abstain`; OOD is not high confidence.
- `ABSTAIN → probability null`; abstention is not low risk.
- Fixture is never live; synthetic is never empirical proof; heuristic is never trained ML.
- Deterministic model disagreement is not ensemble-member spread.
- Correlation is not propagation. Calibration is not accuracy.
- Certification is earned from evidence and defaults to false.
- Any unresolved critical finding blocks promotion.

## Global phase gate

Every phase follows this chain:

`SOURCE → PROVENANCE → DATA → TARGET → ISSUE-TIME CAUSALITY → SPLIT → BASELINE → MODEL → CALIBRATION → OOD/ABSTENTION → HELD-OUT EVALUATION → SUBGROUP EVALUATION → REPRODUCIBILITY → HASH → PRODUCTION TRACE → CERTIFICATION`

A phase is `PASS` only when its requirements, tests, regression suite, evidence package, hashes, and independent review are complete. Otherwise it is `HOLD` or `BLOCKED`.

## Standard phase record

For every phase create:

- **Phase ID / title / owner / reviewer / dates**
- **Problem and user/scientific impact**
- **Dependencies and blockers**
- **Inputs and immutable source hashes**
- **Implementation diff**
- **Test plan and exact commands**
- **Results, confidence intervals, subgroup results**
- **Evidence and provenance links**
- **Decision: PASS / HOLD / BLOCKED / REJECTED**
- **Rollback target and recovery steps**
- **Open risks and follow-up issue IDs**

---



## DOCUMENT CONTROL AND EVIDENCE LANGUAGE

This V2 document is an execution and governance artifact. It does **not** prove that VEYRA is scientifically successful. It defines how success, failure, uncertainty, and certification must be determined honestly and reproducibly.

### Evidence language

Use these labels exactly:

| Label | Meaning | Allowed interpretation |
|---|---|---|
| `EXISTING` | Confirmed in the audited/current repository | A fact about the inspected snapshot only |
| `TO MODIFY` | Existing item selected for an approved change | Must be named in the phase report |
| `TO CREATE` | Approved new artifact/file/contract | Must receive an owner, schema, and hash |
| `PROPOSED` | Design suggestion not yet confirmed in the repository | Never describe as an existing capability |
| `PROTECTED` | Frozen evidence, model, data, or forensic record | Cannot change without explicit authorization and new release ID |
| `DEPRECATED` | Retained for replay or comparison but not production authority | Must not be selected silently |
| `HISTORICAL` | Result from an earlier snapshot/run | Not current evidence until rerun |
| `DIAGNOSTIC` | Useful for investigation but not certification | Must carry limitations |
| `SYNTHETIC` / `FIXTURE` | Simulated or test-only evidence | Never empirical proof or live-provider evidence |

### Status system

| Status | Definition | Certification meaning |
|---|---|---|
| `FROZEN` | Deliberately preserved and immutable | Not automatically certified |
| `CERTIFIED` | All required scientific, engineering, safety, provenance, and independent-review gates pass | May be used for the specifically certified scope |
| `EXPERIMENTAL` | Implemented or under research evaluation | Not certified |
| `DIAGNOSTIC` | Used to inspect behavior or compare alternatives | Not a production claim |
| `OPERATIONAL_ONLY` | Engineering path works under tested conditions, but scientific evidence is incomplete | Not scientifically certified |
| `ABSTAINED` | System deliberately withheld a probability/decision because evidence was insufficient | Safe failure state; not low risk |
| `REJECTED` | Experiment or artifact failed its gate or had no justified incremental value | Cannot be promoted |
| `FUTURE` | Intended but not implemented | No current capability |
| `BLOCKED` | Required data, evidence, dependency, or authority is unavailable | Cannot complete scientifically |
| `HOLD` | Work paused because a gate, discrepancy, or review is unresolved | Cannot advance |
| `NOT_CERTIFIED` | Capability may run, but evidence is insufficient for certification | Must be worded with limitations |
| `PASS — OPERATIONAL ONLY` | Implementation and applicable operational tests pass | Scientific certification remains incomplete |
| `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE` | Code/tests pass, but required empirical data is missing | Do not promote to `CERTIFIED` |

`PASS` means implementation and required tests passed; it does not mean scientific certification. `BLOCKED` must never be converted to `PASS` merely because code was written.

## REMEDIATION DEPENDENCY GRAPH

The following order is the default scientific dependency graph. A phase may run in parallel only when it does not consume an unverified output from another phase.

```text
R0–R21  RELEASE IDENTITY / CLAIM FREEZE / CONTROL PLANE
    ↓
R22     AUTHORITATIVE DATA / LINEAGE
    ↓
R23     TRUTH / REFERENCE / TARGET CONTRACT
    ↓
R24     ISSUE-TIME CAUSALITY / LEAKAGE ELIMINATION
    ↓
R25     CLEAN SPLITS / OOT DESIGN / STATISTICAL INFERENCE
    ↓
R26     BASELINE LADDER / FAIR COMPARISON
    ↓
R27     V3 REBUILD / TRAIN-SERVE PARITY / MODEL AUTHORITY
    ↓
R28–R33 PROBABILITIES / CALIBRATION / ERROR DISTRIBUTIONS / SELECTIVE RISK / OOD / CONFORMAL
    ↓
R34–R36 REVISION / FAILURE MEMORY / TRUST HORIZON
    ↓
R37–R40 REGIMES / HAZARD SPECIALISTS / CYCLONES / VERTICAL ATMOSPHERE
    ↓
R41–R44 SPATIAL / MULTI-NWP / INDEPENDENT TRUTH / COMPOUND HAZARDS
    ↓
R45–R49 DRIFT / EXPLAINABILITY / FRONTEND EVIDENCE / DECISION UTILITY / PROPERTY TESTING
    ↓
R50–R53 REPRODUCTION / SECURITY / OBSERVABILITY / PERFORMANCE
    ↓
R54–R58 FRONTIER CHALLENGERS / GENERALIZATION / ABLATION
    ↓
R59–R60 STATISTICAL CLAIMS / FINAL BENCHMARK
    ↓
R61–R66 INDEPENDENT AUDIT / CANARY / CERTIFICATION / SAFETY / JUDGE MODE / FINAL RELEASE
```

### Dependency rules

- R38 precipitation and R39 hazard specialists depend on R22–R33 and their own event data.
- R41 depends on trustworthy station/target data, geographic holdouts, regional calibration, and spatial support.
- R42 depends on genuine provider/member semantics; four deterministic streams must not be relabeled as a 31-member ensemble.
- R54–R56 cannot be promoted until R26, R27, R28, R31, R32, R50, and R59 establish a trustworthy comparison environment.
- R60–R66 depend on the complete evidence chain and cannot override an unresolved critical blocker.

## UNIVERSAL PHASE EXECUTION CONTRACT

This is the authoritative protocol for every R-phase. Phase-specific sections add requirements; they do not remove these controls.

1. **Read.** Read the current repository state, relevant forensic findings, manifests, previous phase reports, protected artifacts, data availability, and existing tests.
2. **Define.** Before changing code, write the scientific question, engineering question, hypothesis, expected evidence, required data, dependencies, success criteria, rollback criteria, and stop conditions.
3. **Inspect.** Identify exact files, functions/classes, current behavior, contracts, dependencies, tests, artifacts, and model/data provenance. Mark unconfirmed paths `PROPOSED`; do not invent repository facts.
4. **Implement.** Make the smallest defensible change. Keep certified, diagnostic, experimental, fixture, synthetic, and blocked paths separate.
5. **Test.** Run applicable unit, integration, regression, negative, scientific, leakage, safety-invariant, contract, provenance, reproducibility, performance, security, UI-truth, and phase-specific tests.
6. **Evaluate.** Use the approved dataset, target, split, metric registry, and locked experiment contract.
7. **Verify.** Check hashes, provenance, metrics, confidence intervals, target reconstruction, issue-time causality, test-set firewall, train/serve parity, sample-size gates, and subgroup support.
8. **Report.** Generate `PHASE_REPORT`, `TEST_RESULTS`, `METRICS`, `PROVENANCE`, `DATA_MANIFEST`, `ARTIFACT_MANIFEST`, `HASHES`, `EXPERIMENT_CONTRACT`, `DECISION_RECORD`, `ROLLBACK_PLAN`, and figures where applicable.
9. **Gate.** Return one explicit status: `PASS`, `PASS — OPERATIONAL ONLY`, `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, `HOLD`, `REJECTED`, or `NOT_CERTIFIED`. Never hide uncertainty.

## PHASE COMPLETION ≠ CAPABILITY CERTIFICATION

Track the following capability-level states independently:

| Capability state | Required evidence |
|---|---|
| Implemented | Code exists and is reviewable |
| Unit Tested | Exact functions and mathematical contracts tested |
| Integration Tested | Cross-module behavior tested |
| Empirically Evaluated | Real, provenance-backed evaluation data used |
| Calibrated | Probability/uncertainty calibration evaluated |
| OOD Tested | Support and out-of-distribution behavior evaluated |
| Stress Tested | Failure, load, concurrency, and degradation behavior tested |
| Operational | Can run safely within declared scope |
| Certified | All required scientific, safety, engineering, provenance, and independent-review gates pass |

A capability is `CERTIFIED` only when every required row is satisfied for its declared scope.

## CLAIM, CAPABILITY, METRIC, AND NEGATIVE-RESULT REGISTRIES

Create and maintain these artifacts (new artifacts are `PROPOSED` until created and hashed):

- `CLAIM_REGISTRY.md` or a structured equivalent: `claim_id`, exact claim, category, dataset/version, target, model/version, calibrator, split, issue-time guarantee, metric, point estimate, confidence interval, support counts, source, artifact hash, experiment ID, phase, status, allowed wording, forbidden wording.
- `CAPABILITY_REGISTRY.md`: capability, implementation, trained, validation, calibration, OOD, production, certification status, evidence location, phase, limitations.
- `METRIC_REGISTRY.json`: mathematical definition, direction, role (primary/secondary/diagnostic), CI method, minimum sample/positive count, aggregation, subgroup policy. Metric direction must never be inferred manually.
- `SCIENTIFIC_NEGATIVE_RESULTS.md`: experiment, hypothesis, method, dataset, result, confidence interval, rejection reason, operational impact, and whether reevaluation is permitted. Failed experiments are evidence and must not be deleted.
- `RELEASE_BLOCKER_MATRIX.json`: blocker, severity, evidence, status, release impact, owner, and required resolution.

Historical numbers remain historical. A documented result such as “500/500 tests passed” must not be described as current unless the exact tests ran in the current release.

## FINAL TEST-SET FIREWALL

The locked final test set is readable only by the final evaluator identified by a unique `evaluation_run_id`. Training, feature engineering, calibration, threshold selection, hyperparameter tuning, feature selection, architecture selection, OOD tuning, abstention tuning, model selection, explanation tuning, and release tuning must fail if they attempt to load final-test labels. Machine-enforced protection is required where feasible.

## UNIVERSAL SAMPLE-SIZE, UNCERTAINTY, AND METRIC GATES

Every promoted result must report point estimate, 95% confidence interval, total rows, positive/negative cases, unique forecast cycles, events, locations, valid dates, relevant seasons, bootstrap method, dependence unit, and seed where relevant. Use cycle/event/location/block resampling rather than naive row bootstrap when observations are dependent.

If support is insufficient, return `INSUFFICIENT_SUPPORT` and keep the result diagnostic or blocked. No promoted metric may be created for a zero-positive or statistically uninformative slice. Freeze primary, secondary, and diagnostic metrics before final evaluation; do not metric-shop after seeing results.

## PROTECTED CERTIFIED CORE

```text
FORECAST INGESTION
  → ISSUE-TIME VALIDATION
  → ISSUE-TIME FEATURES
  → BUST PROBABILITY
  → CALIBRATION
  → OOD / SUPPORT CHECK
  → ABSTENTION POLICY
  → RELIABILITY STATE
  → EVIDENCE-BACKED RESPONSE
```

Foundation models, diffusion, graph models, hazard specialists, spatial propagation, analog memory, self-critic, decision utility, experimental ensembles, and other advanced modules are optional and must not corrupt this core. If an optional module fails, the core must degrade to an explicit safe state.

## DO NOT FABRICATE OR SILENTLY SUBSTITUTE DATA

If a required dataset is unavailable, mark the capability `BLOCKED / DATA-GATED` and state exactly what is required. Never fabricate the missing corpus, call simulation real, silently substitute a fixture/provider, downgrade an ensemble without saying so, call formulas trained specialists, call Gaussian noise diffusion, call static rules self-learning, or call template explanations TreeSHAP. Simulation is allowed only under the explicit label `SIMULATION` and is never evidence of real-world performance.

## DATA AVAILABILITY STATES

Every source must propagate one of: `LIVE`, `HISTORICAL`, `VERIFIED`, `UNVERIFIED`, `FIXTURE`, `SYNTHETIC`, `MISSING`, `STALE`, or `DEGRADED`. Missing observations must not become `0` unless zero is scientifically meaningful and missingness is separately represented.

## HARD RELEASE BLOCKERS

Any unresolved item below blocks certification and release: future-information leakage; final-test contamination; missing or contradictory provenance; fabricated/synthetic-as-empirical evidence; fixture-as-live evidence; invalid target semantics; unsupported statistical inference; invalid or unexplained calibration; unsafe missing/OOD semantics; false certification; model/calibrator/schema mismatch; irreproducible results; unexplained benchmark discrepancy; critical regression; missing independent review; or an unsupported public claim.

## NON-COMPENSATORY 95+ SCORECARDS

Maintain three separate 100-point scorecards: **Scientific/Technical**, **Engineering**, and **Release/Certification**. Scores are not compensatory. Scientific 98 + Engineering 99 + Release 42 is not a 95+ system. A high score cannot override leakage, failed provenance, final-test contamination, invalid calibration, unsafe abstention, or false certification.


# PART I — FORENSIC BASELINE (F0–F20)

The following sections preserve the original audit findings. They describe what was observed, not what is already repaired.


---

# F0 — FREEZE, INVENTORY & GROUND TRUTH

## 4.1 Repository inventory

The initial forensic inventory identified approximately:

-   844 non-ignored files;
-   298 backend files;
-   55 frontend files;
-   108 artifact files;
-   50 manifest files;
-   69 data files;
-   20 model files;
-   67 scripts.

This confirmed that VEYRA is a substantial multi-layer project rather
than a small model demo.

## 4.2 Core artifacts physically present

The following were found:

-   V3 LightGBM model;
-   V3 probability calibrator;
-   V3 feature schema;
-   model manifests;
-   backend;
-   frontend;
-   data artifacts;
-   scripts;
-   research/diagnostic components.

The V3 model/calibrator artifacts were physically present and
hash-verifiable.

## 4.3 Important missing artifacts

The audit found:

-   authoritative 780k historical corpus absent;
-   raw GEFS provenance/hash mismatch;
-   `.git` metadata absent in the examined snapshot;
-   empty revision database;
-   empty cyclone catalogue;
-   empty failure memory;
-   fixture secondary provider;
-   missing independent observation feeds;
-   missing foundation-model checkpoints.

## 4.4 Initial tests

The repository snapshot reported:

-   1003 backend tests;
-   999 passing;
-   4 failing;
-   129 frontend tests passing.

These numbers are an audit snapshot, not a permanent guarantee.

## 4.5 Phase 0 verdict

**PASS WITH FINDINGS**

The repository is real and extensive, but the data/artifact authority
chain is already incomplete.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F1 — REPOSITORY / ARCHITECTURE / AUTHORITY

## 5.1 Primary runtime path

The main production path was traced approximately as:

`HTTP → FastAPI → ForecastBustAgent → OpenMeteoGEFSWeatherService → Builder2V3FeatureAdapter/V3FeaturePipeline → ModelIntegrationService/V3Adapter → LightGBM → calibration → SafetyEvaluator → explainability → certification → response`

This is a real production path.

## 5.2 Model authority conflict

Direct `ModelIntegrationService()` construction can default to a legacy
`builder2_gbm` model, while the primary API path uses V3.

### VULN-P1-001 --- Legacy model authority ambiguity

**Severity:** HIGH

### Problem

Different execution paths can use different model versions.

### Why it matters

A developer, script, or secondary endpoint may unknowingly produce a
prediction using the legacy model.

### Repair direction

Create a single authoritative model registry:

``` text
route
→ model_id
→ artifact SHA
→ feature schema
→ calibrator
→ policy
→ evidence status
```

Legacy models must be explicitly diagnostic/rejected unless deliberately
selected.

## 5.3 Invalid V3 artifact path

An invalid model path can lead to metadata/error-path issues such as
`KeyError: 'unavailable'`.

### Repair direction

All model-loading failures should become explicit typed states such as:

`MODEL_NOT_READY`

and must not produce partial scientific predictions.

## 5.4 Revision features hardcoded to zero

Production revision/stability features are hardcoded to `0.0`.

### VULN-P1-002

**Severity:** HIGH/CRITICAL

### Why it matters

Offline and live feature semantics differ.

The model may have been trained/evaluated with information that the live
system does not actually provide.

## 5.5 Certification default

The prediction schema contains a permissive default:

`is_certified = true`

### VULN-P1-003 / VULN-P15-003

**Severity:** HIGH

### Problem

An invalid/unavailable request can carry:

-   `trust_state = UNAVAILABLE`
-   error/invalid location
-   but `is_certified = true`

### Repair direction

Certification must be derived from evidence requirements, never from a
permissive default.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F2 — V3 BASELINE & BENCHMARK

## 6.1 Documented V3 headline metrics

The project documents approximately:

-   PR-AUC = 0.2110
-   Brier = 0.0538
-   BSS = +0.0770
-   ECE = 0.0068
-   calibration slope ≈ 0.9852

The documented benchmark size is approximately 116,250 OOT rows.

## 6.2 Independent real OOT evaluation

The available real OOT evaluation produced:

-   N = 3,750;
-   PR-AUC = 0.1650;
-   Brier = 0.0506;
-   BSS = +0.0504;
-   ECE = 0.0195;
-   calibration slope = 1.5685.

The final zero-trust reproduction independently confirmed these values.

### VULN-P2-001 --- Headline benchmark contradiction

**Severity:** CRITICAL

### Interpretation

The problem is not simply that the score is "a little worse."

The issue is that the claimed benchmark cannot currently be reproduced
from the available real evidence.

## 6.3 Real benchmark limitations

Available real data:

-   15 locations;
-   3 variables;
-   9 lead horizons;
-   334 cycles;
-   15,000 rows;
-   missing +192h.

This is materially different from the documented benchmark.

## 6.4 Variable heterogeneity

Approximate PR-AUC results:

-   pressure: 0.0559;
-   temperature: 0.3171;
-   wind: 0.0078.

Wind also had extremely weak/negative skill behavior.

Aggregate metrics therefore hide serious subgroup differences.

## 6.5 Threshold behavior

At threshold approximately 0.060:

-   alert rate ≈ 27.01%;
-   precision ≈ 13.92%;
-   recall ≈ 66.51%;
-   FPR ≈ 24.65%;
-   FNR ≈ 33.49%.

These numbers are diagnostic because the underlying dataset is
compromised.

## 6.6 Repair direction

Do not optimize the current model yet.

First:

1.  rebuild the dataset;
2.  independently rebuild targets;
3.  eliminate leakage;
4.  define clean temporal/geographic splits;
5.  run the baseline ladder;
6.  rerun V3;
7.  reproduce the new benchmark;
8.  then optimize.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F3 — DATA, TARGETS & LEAKAGE

## 7.1 Missing authoritative 780k corpus

### VULN-P3-001

**Severity:** CRITICAL

The documented authoritative corpus is not available.

The 116,250-row benchmark was found to be synthetic.

### Why this matters

Without the original corpus, the following cannot be independently
verified:

-   original training distribution;
-   calibration distribution;
-   feature distribution;
-   target distribution;
-   benchmark construction;
-   original evaluation.

## 7.2 Future-time indexing leakage

### VULN-P3-002

**Severity:** CRITICAL

`build_phase3_75_pipeline.py` constructs forecast payloads as continuous
time series and uses valid-time indexing.

Revision-like features can access values through indices such as:

`v_idx - 6`

This can cause future information to enter issue-time features.

### Why this is critical

The scientific rule is:

> A forecast reliability model may only use information available when
> the forecast was issued.

If future information enters the feature vector:

-   training becomes contaminated;
-   offline metrics can become artificially optimistic;
-   model selection becomes invalid;
-   live performance cannot be trusted.

## 7.3 Duplicate real datasets

The two 15k real benchmark files were effectively identical except for
metadata such as evidence class.

The final zero-trust audit independently confirmed exact duplication.

## 7.4 Threshold methodology mismatch

Documentation refers to dynamic percentile-based thresholds, while
implementation uses fixed values in important paths.

Examples:

-   temperature ≈ 3°C;
-   pressure ≈ 2.5 hPa;
-   wind ≈ 5 m/s.

This is a scientific specification mismatch.

## 7.5 Forecast-system mismatch

The documented foundation refers to NOAA GEFSv12 and 31-member behavior.

Actual raw data contains four deterministic streams:

-   GFS;
-   ECMWF;
-   ICON;
-   GEM.

This must not be called a 31-member GEFS ensemble.

## 7.6 Truth source

The primary truth source is ERA5 nearest-gridpoint data.

There is no demonstrated independent operational AWS/radar/satellite
truth layer.

## 7.7 Repair direction

Use cycle-based immutable data:

``` text
forecast issued at t0
→ all features from t0-available information
→ future truth only for label creation
```

Then create automated temporal-causality tests.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F4 — CALIBRATION

## 8.1 Probability ceiling

### VULN-P4-001

**Severity:** CRITICAL

The isotonic calibrator caps at approximately:

**36.8%**

Therefore the calibrated output cannot express probabilities above
approximately 0.368 through this artifact.

## 8.2 Important nuance

The final zero-trust scan found the calibrator itself to be:

-   finite;
-   monotonic;
-   numerically bounded;
-   free of NaN/Inf.

So the problem is not numerical instability.

The problem is **scientific calibration range and tail representation**.

## 8.3 Calibration slope

Documented:

≈ 0.9852

Independent OOT:

≈ 1.5685

This is a material discrepancy.

### VULN-P4-002

**Severity:** HIGH

## 8.4 ECE mismatch

Documented:

≈ 0.0068

Independent OOT:

≈ 0.0195

Temperature subgroup ECE was reported around 12.1%.

## 8.5 Threshold inconsistency

Different components reportedly use decision thresholds around:

-   0.060;
-   0.280;
-   0.50.

This creates policy inconsistency.

## 8.6 Repair direction

Separate:

``` text
raw_probability
calibrated_probability
decision_threshold
decision_policy
calibration_version
```

and version them independently.

Never embed decision thresholds as hidden constants in unrelated
services.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F5 — OOD / SELECTIVE PREDICTION / ABSTENTION

## 9.1 Missing feature bug

### VULN-P5-001

**Severity:** CRITICAL

An empty feature dictionary can evaluate as:

`OOD = 0.0`

`NORMAL`

### Why this is dangerous

Missing evidence has been interpreted as evidence of normality.

Correct semantics should be:

`missing evidence → insufficient evidence → ABSTAIN`

## 9.2 92°C safety case

### VULN-P5-002

**Severity:** HIGH

A physically implausible 92°C input produced an OOD state around
`UNUSUAL` rather than triggering the expected strong abstention.

## 9.3 OOD architecture

The current system combines:

-   physical bounds;
-   standardized Euclidean-like detector;
-   geographic bounding-box enforcement;
-   policy logic.

This is not equivalent to a robust high-dimensional OOD system.

## 9.4 Hardcoded constants

The OOD detector uses static means/scales/bounds.

This can create:

-   elevation bias;
-   regional bias;
-   uncalibrated thresholds.

## 9.5 Repair direction

Required safety semantics:

``` text
required feature missing
→ ABSTAIN

physically impossible input
→ ABSTAIN

unsupported geography
→ ABSTAIN

model mismatch
→ MODEL_NOT_READY

provider unavailable
→ UNAVAILABLE/ABSTAIN
```

Never replace missing scientific information with zero.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F6 — RELIABILITY INTELLIGENCE

## 10.1 Trust Horizon

### VULN-P6-001

**Severity:** MEDIUM

Trust Horizon is implemented as a static cutoff, approximately 120h in
one production path and 168h in another dashboard path.

This is not a learned predictability horizon.

### Repair direction

If the name "Trust Horizon" is retained, it should be empirically
estimated from:

-   lead-dependent reliability;
-   uncertainty;
-   OOD;
-   calibration;
-   subgroup;
-   location;
-   variable.

## 10.2 Time-to-bust

Current logic is essentially:

> earliest lead where probability exceeds a threshold.

This is a threshold-crossing diagnostic, not a fully trained
time-to-event model.

## 10.3 Reliability margin

Approximate form:

`margin = threshold - probability`

Useful as a decision signal, but not statistical confidence.

## 10.4 Fragility

Approximate form:

`100 / (1 + ensemble_std)`

This is heuristic.

## 10.5 Hazard-specific reliability

Hazard modules should be explicitly marked heuristic until empirically
trained and validated.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F7 — FAILURE INTELLIGENCE

## 11.1 Static motifs

Six curated failure motifs exist.

They are diagnostic rules, not learned failure patterns.

## 11.2 Static fingerprint classifier

Uses hardcoded conditions involving lead/spread and related features.

No demonstrated learned classifier exists.

## 11.3 Static analog archive

### VULN-P7-001

**Severity:** HIGH

Exactly eight static analog cases were identified.

The UI must not imply a dynamically searched historical archive.

## 11.4 Failure memory empty

### VULN-P7-002

**Severity:** MEDIUM

`FailureMemoryStore` contains zero episodes.

Therefore there is no real dynamic memory.

## 11.5 Repair direction

A real failure-memory system needs:

-   issue-time-safe snapshots;
-   forecast version;
-   observed outcome;
-   bust definition;
-   variable;
-   location;
-   lead;
-   feature snapshot;
-   model version;
-   provenance;
-   deduplication;
-   retrieval evaluation.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F8 — FORECAST REVISION INTELLIGENCE

## 12.1 Live revision features

### VULN-P8-001

**Severity:** CRITICAL

All approximately 11 live revision/stability features are hardcoded to
zero.

## 12.2 Revision database

`revision_store.db` has zero rows.

## 12.3 Offline/live contradiction

Offline revision logic contains future-time indexing risk.

Live serving contains no actual revision history.

This means:

> the system has a potentially leaked offline revision concept and a
> disabled live revision implementation.

## 12.4 Repair direction

Store real forecast cycles:

``` text
t0
t0+6h
t0+12h
t0+24h
...
```

and reconstruct each cycle exactly as it would have been known at that
time.

Only then derive:

-   revision magnitude;
-   revision acceleration;
-   reversal;
-   persistence;
-   spread evolution;
-   disagreement evolution.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F9 — SPATIAL RELIABILITY

## 13.1 Station mismatch

### VULN-P9-001

**Severity:** HIGH

Topology contains 25 nodes.

Real benchmark contains 15 stations.

Ten topology nodes therefore lack equivalent real validation.

## 13.2 Mountain calibration collapse

### VULN-P9-002

**Severity:** CRITICAL

Srinagar:

-   BSS ≈ -0.9746;
-   ECE ≈ 0.5062.

Delhi:

-   BSS ≈ -0.1600;
-   ECE ≈ 0.2588.

These results demonstrate serious regional heterogeneity.

Because the underlying benchmark is compromised, treat the exact values
as diagnostic; the regional-failure pattern remains important.

## 13.3 Hardcoded spatial decay

Approximately:

`w(d) = exp(-d / 350 km)`

with a corridor boost.

This is a hypothesis/heuristic, not empirically proven universal spatial
behavior.

## 13.4 Propagation problem

Upwind/downwind propagation was not actually demonstrated.

The propagation script mainly measures simultaneous correlation.

Correlation is not temporal propagation.

## 13.5 Spatial field

The current field is effectively interpolation plus perturbation.

It is not a learned continuous generative spatial failure field.

## 13.6 Repair direction

Before spatial certification:

1.  align topology with actual data;
2.  increase spatial coverage;
3.  perform leave-one-location-out evaluation;
4.  evaluate regional calibration;
5.  model elevation/orography;
6.  test lagged directional relationships;
7.  distinguish correlation from propagation;
8.  quantify spatial uncertainty.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F10 — HAZARD INTELLIGENCE

## 14.1 Five specialists are heuristic

### VULN-P10-001

**Severity:** CRITICAL

The inspected specialists use handcrafted parametric/logistic formulas.

There are no empirical ML weights supporting the claim of trained
specialist models.

## 14.2 Precipitation

Real precipitation benchmark coverage is insufficient/absent for
certification.

## 14.3 Cyclone

### VULN-P10-002

**Severity:** CRITICAL

`cyclone_event_catalogue.json` is empty:

`[]`

There is no empirical cyclone validation catalogue.

## 14.4 Severe wind

The available OOT sample contained zero positive wind busts in the
reported subset.

This makes meaningful wind-skill estimation impossible from that subset.

## 14.5 Compound risk

Copula-style aggregation is present, but dependence parameters need
empirical calibration.

Otherwise it is a scenario/heuristic calculation rather than a certified
probability.

## 14.6 Repair direction

For each specialist:

``` text
real events
→ issue-time-safe data
→ temporal/geographic split
→ baseline
→ trained model
→ calibration
→ OOD
→ held-out evaluation
→ subgroup evaluation
→ promotion manifest
```

If this chain cannot be completed, label the specialist `HEURISTIC` or
`EXPERIMENTAL`.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F11 — ATMOSPHERIC / REGIME INTELLIGENCE

## 15.1 Vertical profiles absent

### VULN-P11-001

**Severity:** HIGH

The V3 feature vector is surface-heavy.

No validated integration of:

-   500 hPa geopotential;
-   850 hPa structure;
-   CAPE/CIN;
-   radiosonde profiles;
-   pressure-level soundings

was demonstrated.

## 15.2 Blocking / jet proxies

Some functions use proxy/simulated inputs rather than verified
atmospheric vertical data.

## 15.3 Calendar regime

### VULN-P11-002

**Severity:** HIGH

The monsoon regime classifier uses static calendar boundaries.

Calendar dates are not equivalent to physical regime transitions.

## 15.4 Negative monsoon skill

### VULN-P11-003

**Severity:** CRITICAL

Reported:

-   July BSS ≈ -0.0609;
-   August BSS ≈ -0.0359.

This suggests poor monsoon-season behavior in the available diagnostic
dataset.

## 15.5 Repair direction

Introduce vertical/regime information only after:

-   real source;
-   issue-time availability;
-   correct spatial/temporal alignment;
-   independent evaluation;
-   ablation.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F12 — MULTI-NWP / PROVIDER INTELLIGENCE

## 16.1 31-member GEFS mismatch

### VULN-P12-001

**Severity:** CRITICAL

Actual raw data contains:

-   GFS;
-   ECMWF;
-   ICON;
-   GEM.

It does not contain the documented 31-member GEFS ensemble.

## 16.2 Scientific distinction

Multi-model disagreement:

`GFS vs ECMWF vs ICON vs GEM`

is not the same as:

GEFS member spread.

They represent different uncertainty sources.

## 16.3 Secondary provider

### VULN-P12-002

**Severity:** HIGH

`FixtureSecondProviderAdapter` returns static test data.

It is not a live provider.

## 16.4 Provider-specific calibration

A single global calibrator is not sufficient evidence that all model
systems have identical probability behavior.

## 16.5 Missing stream handling

A missing stream must not silently become numeric zero.

Missingness must remain explicit.

## 16.6 Repair direction

Define provider/model identity explicitly and never claim GEFS
membership unless actual GEFS member data exists.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F13 — FRONTIER / ADVANCED RESEARCH

## 17.1 Foundation model

### VULN-P13-001

**Severity:** CRITICAL

No genuine foundation-model checkpoint was found.

The frontier ablation script uses random/synthetic generation such as
binomial/random noise.

Therefore it is a simulation, not a foundation-model benchmark.

## 17.2 Generative spatial diffusion

### VULN-P13-002

**Severity:** HIGH

The implementation effectively performs:

`base + rng.normal(0, 0.05)`

This is not a learned score-based diffusion model.

## 17.3 Decision intelligence / VOI

The decision engine is an in-memory human-review/note store.

No demonstrated:

-   expected utility;
-   loss matrix optimization;
-   Value of Information;
-   action optimization

exists.

## 17.4 Self-critic

The self-critic uses a few hardcoded rules/clamps.

It is not dynamic meta-learning.

## 17.5 Repair direction

Every frontier capability must have:

-   explicit scientific question;
-   real data;
-   baseline;
-   actual model;
-   independent held-out evaluation;
-   ablation;
-   confidence intervals;
-   reproducible artifact;
-   maturity status.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F14 — FRONTEND / JUDGE-FACING TRUTH

## 18.1 Hardcoded research metrics

### VULN-P14-001

**Severity:** CRITICAL

`ResearchMetrics.tsx` contains a `FROZEN_V3_METRICS` object with
headline values.

This means the frontend can display benchmark claims without obtaining
them from the live verified evaluation system.

## 18.2 Why this is a serious issue

A frontend constant can remain unchanged even if:

-   model changes;
-   benchmark changes;
-   data disappears;
-   evaluation changes;
-   a new model is loaded.

This creates false confidence.

## 18.3 Explainability

### VULN-P14-002

**Severity:** HIGH

Live explanation is generated by template/rule logic rather than genuine
TreeSHAP.

If the UI says "SHAP," the attribution must actually be computed from
the model.

## 18.4 Repair direction

Metrics should be served through versioned backend evaluation artifacts:

``` text
metric
→ dataset ID
→ split
→ model hash
→ evaluation artifact
→ backend API
→ frontend
```

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F15 — CHAOS / RED TEAM / SAFETY

## 19.1 Safety invariant I1

**UNKNOWN ≠ SAFE**

Passed for unsupported geography.

## 19.2 Safety invariant I2

**MISSING INPUT ≠ ZERO OOD**

VIOLATED.

## 19.3 Safety invariant I3

**OOD ≠ HIGH CONFIDENCE**

VIOLATED.

## 19.4 Safety invariant I4

**ABSTENTION ≠ LOW RISK**

Passed.

## 19.5 Safety invariant I5

**FIXTURE ≠ LIVE**

VIOLATED.

## 19.6 Safety invariant I6

**SYNTHETIC ≠ REAL**

VIOLATED.

## 19.7 Safety invariant I7

**HEURISTIC ≠ TRAINED**

VIOLATED.

## 19.8 Safety invariant I8

**MODEL DISAGREEMENT ≠ ENSEMBLE SPREAD**

VIOLATED.

## 19.9 Safety invariant I9

**CORRELATION ≠ PROPAGATION**

VIOLATED.

## 19.10 Safety invariant I10

**CALIBRATION ≠ ACCURACY**

VIOLATED in the interpretation/presentation layer.

## 19.11 Safety invariant I11

**CERTIFICATION REQUIRES EVIDENCE**

VIOLATED.

## 19.12 Safety invariant I12

**MODEL FAILURE MUST FAIL CLOSED**

Passed for tested model-load failure cases.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F16 — JUDGE CROSS-EXAMINATION

The system can currently be attacked by technically informed questions
such as:

1.  Where is the 780k dataset?
2.  Can you reproduce PR-AUC 0.2110?
3.  Why does independent PR-AUC equal 0.1650?
4.  Why is ECE 0.0195?
5.  Why is calibration slope 1.5685?
6.  Why does calibration stop at 36.8%?
7.  Where are the 31 GEFS members?
8.  Why are there four deterministic streams instead?
9.  Where are trained hazard weights?
10. Where is the cyclone catalogue?
11. How many real cyclone events were evaluated?
12. Where is failure memory?
13. Why are revision features zero?
14. How is Trust Horizon learned?
15. Where are vertical soundings?
16. How is monsoon regime physically identified?
17. Why does mountain reliability collapse?
18. Why do 10 spatial nodes lack real benchmark evidence?
19. How was propagation established?
20. Where is the actual diffusion model?
21. Where are foundation-model weights?
22. Where is VOI optimization?
23. Where is TreeSHAP?
24. Why are research metrics hardcoded?
25. Why can missing data produce NORMAL?
26. Why can 92°C avoid abstention?
27. Why can certification remain true on an invalid request?
28. Is the second provider live?
29. What independent observations verify ERA5?
30. What exactly is certified today?

The correct future response is not to hide these weaknesses.

It is to answer them honestly.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F17 — REPRODUCIBILITY / RELEASE / DEPLOYMENT

## 21.1 Loose dependencies

Examples include:

-   `lightgbm>=4.0.0`
-   `scikit-learn>=1.3.0`
-   `fastapi>=0.104.0`

This permits environment drift.

### Repair

Freeze exact versions and preferably hashes.

## 21.2 Git metadata

The repository snapshot lacks `.git`.

Cryptographic manifests help but do not replace version-control history.

## 21.3 Absolute paths

Approximately 49 absolute-path references were found across
documentation, manifests and scripts.

Runtime backend code generally uses dynamic paths, which is a positive
sign.

## 21.4 Model hashes

V3 model/calibrator bytes matched their manifest entries.

This should be preserved as a release invariant.

## 21.5 Secrets

The final scan found no obvious exposed production API
keys/passwords/private cloud tokens in scanned source.

This is a positive result.

## 21.6 Deployment

The architecture is containerizable in principle.

However, scientific and safety blockers prevent a defensible scientific
release.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F18 — PLAN VS IMPLEMENTATION

The following is the consolidated gap matrix.

  Planned Capability              Actual State                          Classification
  ------------------------------- ------------------------------------- --------------------
  780k historical benchmark       Missing                               SCIENTIFIC DEFICIT
  116k benchmark                  Synthetic                             SCIENTIFIC DEFICIT
  V3 headline metrics             Not reproduced                        CONTRADICTED
  Isotonic calibration            Real artifact, poor/capped behavior   PARTIAL
  Robust OOD                      Heuristic                             SAFETY GAP
  Missing-input safety            Broken                                CRITICAL
  5 trained hazard specialists    Handcrafted formulas                  HEURISTIC
  Cyclone validation              Empty catalogue                       UNVERIFIED
  25-station spatial validation   15 real stations                      PARTIAL
  Spatial propagation             Simultaneous correlation              UNVERIFIED
  Vertical atmosphere             Absent                                NOT IMPLEMENTED
  Dynamic monsoon regime          Calendar table                        HEURISTIC
  31-member GEFS                  Four deterministic streams            CONTRADICTED
  Live second provider            Fixture                               FIXTURE
  Revision trajectories           Zero live history                     CONTRADICTED
  Failure memory                  Empty                                 NOT IMPLEMENTED
  Foundation representation       No weights                            NOT IMPLEMENTED
  Generative diffusion            Gaussian noise                        SYNTHETIC
  Decision utility / VOI          Not implemented                       NOT IMPLEMENTED
  Live TreeSHAP                   Templates                             HEURISTIC

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F19 — GRAND-FINALE MASTER VULNERABILITY REGISTER

## P1 --- Architecture / Authority

### VULN-P1-001

**HIGH** --- direct `ModelIntegrationService()` can use legacy GBM.

### VULN-P1-002

**HIGH/CRITICAL** --- live revision features hardcoded to zero.

### VULN-P1-003 / P15-003

**HIGH** --- certification default can remain true on unavailable/error
state.

------------------------------------------------------------------------

## P2 --- Benchmark

### VULN-P2-001

**CRITICAL** --- headline benchmark cannot be reproduced on real OOT
data.

------------------------------------------------------------------------

## P3 --- Data / Leakage

### VULN-P3-001

**CRITICAL** --- authoritative 780k corpus missing; 116k benchmark
synthetic.

### VULN-P3-002

**CRITICAL** --- future-time indexing leakage.

------------------------------------------------------------------------

## P4 --- Calibration

### VULN-P4-001

**CRITICAL** --- calibrated probability ceiling ≈ 36.8%.

### VULN-P4-002

**HIGH** --- calibration slope mismatch, 1.5685 vs ≈0.9852.

------------------------------------------------------------------------

## P5 --- OOD / Safety

### VULN-P5-001

**CRITICAL** --- empty feature dict → OOD 0 / NORMAL.

### VULN-P5-002

**HIGH** --- 92°C does not appropriately abstain.

------------------------------------------------------------------------

## P6 --- Reliability

### VULN-P6-001

**MEDIUM** --- Trust Horizon is static.

------------------------------------------------------------------------

## P7 --- Failure Intelligence

### VULN-P7-001

**HIGH** --- analog archive contains eight static cases.

### VULN-P7-002

**MEDIUM** --- failure memory contains zero episodes.

------------------------------------------------------------------------

## P8 --- Revision

### VULN-P8-001

**CRITICAL** --- live revision database empty and features zeroed.

------------------------------------------------------------------------

## P9 --- Spatial

### VULN-P9-001

**HIGH** --- 25-node topology vs 15 real stations.

### VULN-P9-002

**CRITICAL** --- severe regional calibration collapse.

------------------------------------------------------------------------

## P10 --- Hazards

### VULN-P10-001

**CRITICAL** --- hazard specialists are heuristics, not trained ML.

### VULN-P10-002

**CRITICAL** --- cyclone catalogue empty.

### VULN-P10-003

**HIGH** --- wind target has zero positive OOT events in the inspected
subset.

------------------------------------------------------------------------

## P11 --- Atmosphere / Regime

### VULN-P11-001

**HIGH** --- vertical atmospheric intelligence absent.

### VULN-P11-002

**HIGH** --- monsoon regime uses calendar lookup.

### VULN-P11-003

**CRITICAL** --- negative July/August BSS in diagnostic OOT.

------------------------------------------------------------------------

## P12 --- Multi-NWP

### VULN-P12-001

**CRITICAL** --- four deterministic models are not a 31-member GEFS
ensemble.

### VULN-P12-002

**HIGH** --- second provider is a fixture.

------------------------------------------------------------------------

## P13 --- Frontier

### VULN-P13-001

**CRITICAL** --- frontier ablation is random/synthetic.

### VULN-P13-002

**HIGH** --- diffusion is Gaussian noise.

------------------------------------------------------------------------

## P14 --- Frontend

### VULN-P14-001

**CRITICAL** --- research metrics hardcoded in TypeScript.

### VULN-P14-002

**HIGH** --- explainability is template-based, not live TreeSHAP.

------------------------------------------------------------------------

## P20 --- Final zero-trust

### VULN-P20-001

**MEDIUM** --- `>` vs `>=` target-boundary inconsistency.

85/15,000 rows were affected in the independent reconstruction.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# F20 — FINAL ZERO-TRUST TESTING

## Test 1 --- Metamorphic / invariance

**PASSED**

Harmless metadata and dictionary-order changes did not change
probability/trust outputs.

## Test 2 --- Probability integrity

**PASSED NUMERICALLY**

No NaN/Inf/out-of-range probability behavior was found in the tested
grid.

The calibration ceiling remains a scientific problem.

## Test 3 --- Temporal causality

**FAILED**

The valid-time indexing leakage was independently reproduced.

## Test 4 --- Independent target reconstruction

14,915/15,000 rows matched.

differed at the exact threshold boundary.

New:

`VULN-P20-001`

## Test 5 --- Duplicate contamination

**CONFIRMED**

The two real benchmark datasets are exact duplicates.

## Test 6 --- Unit / coordinate / time

**PASSED**

500/500 time arithmetic checks succeeded.

## Test 7 --- Malformed input

**PARTIALLY PASSED**

Validation works, but certification semantics remain unsafe.

## Test 8 --- Model contract

**PASSED**

Wrong feature dimensions produce a LightGBM error rather than silently
padding.

## Test 9 --- Concurrency

**PASSED**

parallel threads across five geographic stations showed:

-   no race;
-   no cross-request probability bleed;
-   no observed state contamination.

## Test 10 --- Zero-trust claim reproduction

**CONTRADICTED / UNVERIFIABLE**

The headline scientific claims did not independently reproduce.

------------------------------------------------------------------------

### Forensic handling instruction
Treat this section as a baseline finding. Before writing a repair, reproduce the finding or record why it cannot be reproduced from the current snapshot. Convert every vulnerability, contradiction, or missing artifact into a tracked remediation task. Do not describe a capability as fixed until the relevant remediation phase passes its independent gate.


---

# PART II — REMEDIATION PROGRAM (R0–R66)

The remediation sections below retain the source requirements and add an operational execution layer: what to do first, how to test it, what evidence to save, how to fail safely, and what counts as done.


---

# R0 — FREEZE, INVENTORY, AND RELEASE IDENTITY

### Problems to close
- Historical snapshots and test counts can be mixed.
- Model/data artifacts need a single immutable release identity.
- The repository has no dependable Git identity in the audited snapshot.

### Implementation
Create `release/RELEASE_MANIFEST.json`, `release/ARTIFACT_HASHES.json`, `release/DATA_MANIFEST.json`, `release/MODEL_MANIFEST.json`, `release/TEST_MANIFEST.json`, and `release/CLAIM_MANIFEST.json`. Record OS, Python, Node, package-lock/requirements-lock hashes, model SHA, calibrator SHA, feature-schema SHA, benchmark SHA, code revision, and creation timestamp.

Give every test run a `run_id` and `release_id`. Historical results must be labeled HISTORICAL and cannot be promoted into CURRENT evidence without rerunning.

### Tests
1. Delete/recreate the environment and regenerate the manifest.
2. Change one model byte and verify hash failure.
3. Change one feature name/order and verify schema hash failure.
4. Attempt to load an artifact not listed in the registry and verify rejection.

### Acceptance
A clean checkout can identify exactly which repository, data, model, calibrator, dependencies, and tests produced every claimed result.

---


## Expanded execution control (added implementation guidance)

### Problem to close
- Historical snapshots and test counts can be mixed.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Historical snapshots and test counts can be mixed.
10. Verify requirement: Model/data artifacts need a single immutable release identity.
11. Verify requirement: The repository has no dependable Git identity in the audited snapshot.
12. Verify requirement: Delete/recreate the environment and regenerate the manifest.
13. Verify requirement: Change one model byte and verify hash failure.
14. Verify requirement: Change one feature name/order and verify schema hash failure.
15. Verify requirement: Attempt to load an artifact not listed in the registry and verify rejection.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R1 — MODEL AUTHORITY AND ARCHITECTURE

### Findings
- Direct `ModelIntegrationService()` can default to legacy GBM.
- V3 revision features are zeroed in production.
- Certification booleans can disagree.
- Evaluation endpoints can expose different authorities.

### Fix
Create one signed/hashed model registry. Each model record contains `model_id`, version, SHA-256, feature-schema hash, calibrator hash, status, training manifest, evaluation manifest, and promotion state. Production dependency injection must request the registry-approved V3 artifact explicitly. Legacy models are `DIAGNOSTIC` only.

Remove implicit fallbacks. Invalid artifacts must return `MODEL_NOT_READY`; they must never silently fall back to a different model.

Make nested `certification` authoritative. If a top-level field remains for compatibility, derive it from the nested state rather than storing two independent values. Default must be `false`.

### Tests
- Direct service construction cannot silently select legacy.
- Invalid V3 path fails closed.
- Wrong model hash fails.
- Wrong feature count/order fails.
- Legacy model is rejected by production policy.
- Failure response always has `is_certified=false`.

### Acceptance
There is exactly one production model authority and one certification authority.

---


## Expanded execution control (added implementation guidance)

### Problem to close
- Direct `ModelIntegrationService()` can default to legacy GBM.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Direct `ModelIntegrationService()` can default to legacy GBM.
10. Verify requirement: V3 revision features are zeroed in production.
11. Verify requirement: Certification booleans can disagree.
12. Verify requirement: Evaluation endpoints can expose different authorities.
13. Verify requirement: Direct service construction cannot silently select legacy.
14. Verify requirement: Invalid V3 path fails closed.
15. Verify requirement: Wrong model hash fails.
16. Verify requirement: Wrong feature count/order fails.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R2 — BENCHMARK AUTHORITY AND EXPERIMENT CONTRACT

### Finding
The documented benchmark claims do not reproduce on the available real OOT evaluation.

### Fix
Create an executable benchmark contract containing: dataset ID/hash, issue-time range, valid-time range, locations, variables, leads, target definition, split/embargo, baseline, model hash, calibrator hash, metric implementations, bootstrap method, subgroup definitions, and promotion criteria.

Every metric shown anywhere in the product must resolve to `evaluation_run_id → dataset_hash → model_hash → split_hash → code_revision`. No metric should exist only as a frontend constant or documentation number.

### Acceptance
A clean machine can run the benchmark and regenerate the metric table from source artifacts. If a number cannot be regenerated, it cannot be labeled verified.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The documented benchmark claims do not reproduce on the available real OOT evaluation.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R3 — DATA, TARGETS, SPLITS, AND LEAKAGE

This is the highest-priority scientific repair.

## 3.1 Restore or reconstruct the historical corpus

The missing ~780k authoritative corpus must be restored if legitimately available. If it cannot be recovered, build a new dataset and give it a new identity. Never fabricate a replacement and call it the original. The new dataset must have immutable raw inputs, normalized tables, provenance, row counts, hashes, source timestamps, and a reproducible build script.

## 3.2 Remove `v_idx-6` leakage

For every training example with issue time `t0`, enforce:

`information_time(feature) <= t0`

Targets may use future truth; features may not. Stop using seamless valid-time arrays for revision/history features. Use explicit forecast-cycle records keyed by issue time, valid time, provider/model, member, location, and variable.

Build an automated causality audit that records every feature's source timestamp and rejects any row where a feature is unavailable by `t0`.

## 3.3 Canonical target function

Implement exactly one target function. Resolve `>` versus `>=` once and use it everywhere. If the scientific target is a conditional Q95 error threshold, define the reference population and fitting period explicitly. Evaluate thresholds by variable, lead, location, season, and regime.

Do not choose thresholds simply to obtain a convenient positive rate. If a slice has zero positives, report that it is statistically uninformative instead of manufacturing skill.

## 3.4 Temporal split

Split by issue time. Add an embargo sufficient for forecast horizon, target windows, feature history, and information publication latency. Keep temporal OOT and geographic OOT as separate evaluation concepts.

### Mandatory tests
- independent target reconstruction: 100% match;
- boundary cases explicitly tested;
- feature causality audit: zero violations;
- duplicate/overlap audit: zero prohibited overlap;
- train/validation/test issue-time separation;
- synthetic canary test that detects future-feature injection.

### Acceptance
No future information can enter any training or evaluation feature, and an independent implementation reproduces every target exactly.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The missing ~780k authoritative corpus must be restored if legitimately available. If it cannot be recovered, build a new dataset and give it a new identity. Never fabricate a replacement and call it the original. The new dataset must have immutable raw inputs, normalized tables, provenance, row counts, hashes, source timestamps, and a reproducible build script.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: independent target reconstruction: 100% match;
10. Verify requirement: boundary cases explicitly tested;
11. Verify requirement: feature causality audit: zero violations;
12. Verify requirement: duplicate/overlap audit: zero prohibited overlap;
13. Verify requirement: train/validation/test issue-time separation;
14. Verify requirement: synthetic canary test that detects future-feature injection.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R4 — CALIBRATION AND PROBABILITY RECONSTRUCTION

### Findings
- Probability ceiling around 36.8%.
- OOT calibration slope 1.5685 versus documented ~0.9852.
- ECE 0.0195 versus documented 0.0068.
- UI/backend/abstention thresholds are inconsistent.

### Fix
First diagnose whether the ceiling comes from the model score distribution, calibration training support, clipping, or artifact construction. Then rebuild calibration using a clean calibration partition independent of training and final test. Compare isotonic, Platt/logistic, and beta calibration where sample size supports them.

Do not optimize ECE alone. Report Brier, BSS, log loss, ECE/adaptive ECE, calibration slope/intercept, reliability diagrams, and high-risk tail calibration. Evaluate by lead, variable, location, season, regime, and OOD state.

Do not force probabilities above the observed evidence. If the calibration set contains insufficient high-risk cases, report `insufficient_tail_support` rather than inventing certainty.

Create one versioned risk-policy object. Separate `alert_threshold`, `ood_abstention_threshold`, and any user-facing confidence state. Never let separate files define 0.060, 0.280, and 0.800 without explicit semantics.

### Acceptance
No unexplained probability ceiling; independent calibration reproduction; stable calibration across key slices; thresholds are centralized and test-covered.

---


## Expanded execution control (added implementation guidance)

### Problem to close
- Probability ceiling around 36.8%.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Probability ceiling around 36.8%.
10. Verify requirement: OOT calibration slope 1.5685 versus documented ~0.9852.
11. Verify requirement: ECE 0.0195 versus documented 0.0068.
12. Verify requirement: UI/backend/abstention thresholds are inconsistent.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R5 — OOD, DATA QUALITY, AND ABSTENTION

### Critical failures
- Empty feature dict → OOD 0 / NORMAL.
- 92°C can avoid abstention.
- OOD is heuristic rather than statistically validated.

### Fix
Implement layered applicability checks:

`schema → missingness → physical plausibility → source quality → feature novelty → geographic support → historical support → model applicability`.

Missing required features must produce `ABSTAINED`, null probability, and `is_certified=false`. Never substitute zero unless zero is a scientifically valid observed value and missingness is separately encoded.

Use physical sanity bounds and climatological plausibility checks. Separate `IMPOSSIBLE`, `EXTREME`, `UNUSUAL`, `NORMAL`, and `UNKNOWN`.

For statistical OOD, benchmark more than one method if needed: robust Mahalanobis, density/Isolation Forest, conformal nonconformity, or a validated representation-space distance. The OOD score itself must be evaluated against real held-out cases.

### Required selective-prediction metrics
- coverage;
- selective risk;
- retained-set Brier;
- retained-set false-safe rate;
- abstention rate;
- risk-coverage curve.

### Acceptance
Empty features, impossible values, unsupported geography, missing model, missing calibrator, and invalid provider states all fail closed.

---


## Expanded execution control (added implementation guidance)

### Problem to close
- Empty feature dict → OOD 0 / NORMAL.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Empty feature dict → OOD 0 / NORMAL.
10. Verify requirement: 92°C can avoid abstention.
11. Verify requirement: OOD is heuristic rather than statistically validated.
12. Verify requirement: coverage;
13. Verify requirement: selective risk;
14. Verify requirement: retained-set Brier;
15. Verify requirement: retained-set false-safe rate;
16. Verify requirement: abstention rate;

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R6 — TRUST HORIZON AND RELIABILITY INTELLIGENCE

### Finding
Trust Horizon is effectively static. Time-to-bust is mostly threshold crossing.

### Fix
Estimate trust horizon empirically from conditional reliability. For example, define the largest lead where estimated bust risk remains below a declared risk tolerance under a defined context. Include uncertainty intervals and minimum support.

For time-to-bust, consider survival-style quantities: survival probability, hazard over lead, and uncertainty. Distinguish these from a simple `first lead where p >= threshold` indicator.

### Tests
Evaluate by lead, variable, location, season, regime, and OOD state. Compare static baseline versus learned trust horizon. Promote only if the learned object improves an untouched OOT metric or decision criterion.

---


## Expanded execution control (added implementation guidance)

### Problem to close
Trust Horizon is effectively static. Time-to-bust is mostly threshold crossing.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R7 — FAILURE MEMORY AND ANALOGS

### Findings
- Eight static analog cases.
- FailureMemoryStore has zero real episodes.

### Fix
Create a verified historical episode store with issue time, valid time, location, variable, lead, forecast signature, truth signature, hazard/regime context, bust label, source provenance, and artifact hashes.

Analog retrieval should be a real nearest-neighbor or indexed similarity system. It must exclude same-event and future information. Similarity must be evaluated against a baseline.

Failure memory must be populated only from verified historical bust episodes. If there are no eligible episodes, return `NO_SUPPORT`, not a static example.

### Acceptance
No hardcoded analog cards in the certified path. Retrieval provenance is visible and leakage-safe.

---


## Expanded execution control (added implementation guidance)

### Problem to close
- Eight static analog cases.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Eight static analog cases.
10. Verify requirement: FailureMemoryStore has zero real episodes.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R8 — FORECAST REVISION INTELLIGENCE

### Finding
Revision database is empty and live revision features are zeroed; offline revision construction is vulnerable to future-time indexing.

### Fix
Create a revision table keyed by issue time, valid time, provider/model, member, location, variable, and forecast value. A revision feature at `t0` may compare only forecast versions that existed by `t0`.

Examples: 6h/12h/24h revision, absolute revision, direction, acceleration, ensemble spread change, mean shift, and rank change.

Missing revision history must be represented by `revision_available=false`, not `delta=0`.

### Tests
Future revision injection must not change the prediction. Valid pre-issue revision injection may change it. Train/serve feature schema and semantics must be byte/schema compatible.

---


## Expanded execution control (added implementation guidance)

### Problem to close
Revision database is empty and live revision features are zeroed; offline revision construction is vulnerable to future-time indexing.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R9 — SPATIAL RELIABILITY

### Findings
- 25 topology nodes versus 15 validated stations.
- Severe Srinagar collapse.
- Hardcoded 350 km decay.
- Propagation is simultaneous correlation, not demonstrated directional propagation.
- Adversarial robustness score is hardcoded.

### Fix
Separate topology from validated evidence. Every station must expose sample count, bust count, calibration status, and support status.

For regional calibration, evaluate hierarchical/global-to-local shrinkage, terrain-stratified calibration, and spatially varying calibration. Do not delete difficult regions; diagnose them.

Estimate spatial dependence empirically from historical error fields. Compare exponential, Gaussian, and Matérn covariance structures with spatial cross-validation.

Propagation claims require temporal lag evidence, not simultaneous correlation. Use lagged analyses and state the causal limitations.

Compute adversarial robustness from a reproducible dropout/corruption suite; never store `0.88` as a literal score.

### Acceptance
LOLO and regional evaluation show documented performance; no station is called validated without sufficient evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
- 25 topology nodes versus 15 validated stations.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: 25 topology nodes versus 15 validated stations.
10. Verify requirement: Severe Srinagar collapse.
11. Verify requirement: Hardcoded 350 km decay.
12. Verify requirement: Propagation is simultaneous correlation, not demonstrated directional propagation.
13. Verify requirement: Adversarial robustness score is hardcoded.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R10 — HAZARD SPECIALISTS AND CYCLONES

### Finding
Five hazard specialists are handcrafted formulas, not trained empirical ML models. Cyclone catalogue is empty. Wind test has insufficient positive events.

### Fix
Either relabel the current modules as `HEURISTIC PROTOTYPE`, or build genuine specialists. Each specialist requires its own event catalogue, issue-time-safe features, temporal split, baseline, model, calibration, OOT test, subgroup test, artifact hash, and promotion report.

The specialist target should estimate conditional bust risk, not assume that the presence of a hazard equals forecast failure.

For cyclone capability, integrate a documented historical track catalogue and reconcile event identities. Features may include issue-time distance to center, track uncertainty, translation speed, intensity, model disagreement, and coastal proximity, provided they were known by issue time.

For wind, first rebuild the target distribution. Do not lower the threshold solely to make PR-AUC look better. If the test slice has zero positives, mark the metric uninformative.

---


## Expanded execution control (added implementation guidance)

### Problem to close
Five hazard specialists are handcrafted formulas, not trained empirical ML models. Cyclone catalogue is empty. Wind test has insufficient positive events.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R11 — VERTICAL ATMOSPHERE AND DYNAMIC REGIMES

### Findings
- Surface-only production feature set.
- No genuine pressure-level/sounding integration.
- Calendar-based monsoon classifier.
- Negative July/August skill.

### Fix
Add pressure-level features only from data genuinely available at issue time. Candidate families include geopotential, temperature, winds, humidity, vertical motion, CAPE/CIN, and shear. Start with a small scientifically motivated feature set and perform ablations.

Replace calendar regime labels with dynamic atmospheric state descriptors. Candidate inputs include OLR, 850 hPa winds, 500 hPa anomalies, jet structure, moisture, instability, and shear. Use clustering/HMM/supervised classification only after verifying labels and reproducibility.

Treat the negative monsoon BSS as a release gate for any monsoon claim. Diagnose whether failure comes from data, target, spatial representation, precipitation physics, calibration, or regime shift.

---


## Expanded execution control (added implementation guidance)

### Problem to close
- Surface-only production feature set.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Surface-only production feature set.
10. Verify requirement: No genuine pressure-level/sounding integration.
11. Verify requirement: Calendar-based monsoon classifier.
12. Verify requirement: Negative July/August skill.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R12 — MULTI-NWP AND PROVIDER IDENTITY

### Finding
The documented 31-member GEFS claim does not match the actual four deterministic streams. The secondary provider is a fixture. Provider-specific calibration is absent.

### Fix A — true GEFS
If the project wants GEFS ensemble claims, ingest actual GEFS member data and preserve member identity. Calculate ensemble mean, spread, quantiles, tail fractions, and member-level diagnostics.

### Fix B — honest multi-model
If the four streams remain, rename the capability to `multi-model deterministic disagreement`. Do not call its standard deviation GEFS ensemble spread.

Provider interfaces must expose `provider_id`, `model_id`, `cycle`, `member_id`, `is_live`, `is_fixture`, and source provenance.

Fixture providers must require explicit fixture mode and cannot satisfy certification gates. Missing streams must remain missing; never coerce NaN to numeric zero.

Compare global versus provider-specific calibration using untouched OOT data.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The documented 31-member GEFS claim does not match the actual four deterministic streams. The secondary provider is a fixture. Provider-specific calibration is absent.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R13 — FRONTIER AI, GENERATIVE FIELDS, DECISION UTILITY

### Findings
- Random frontier ablation.
- Gaussian-noise “diffusion”.
- Hardcoded self-critic.
- No demonstrated VOI or expected-utility optimizer.
- No genuine foundation checkpoint.

### Fix
Every frontier experiment must have a real model, real data, fixed split, baseline, ablation, confidence interval, artifact hash, and promotion decision. Random-number scripts are software simulations only.

A genuine generative spatial model must learn from real spatial fields and reproduce distributional properties such as covariance, extremes, anisotropy, and conditional dependence. A `base + Gaussian noise` operation must be renamed synthetic noise.

Decision intelligence should define actions and a loss matrix, then calculate expected utility. VOI should quantify expected utility improvement from obtaining additional information minus its cost.

The self-critic should initially be a veto/abstention evidence checker rather than an arbitrary probability rewriter. If learned later, it requires its own training and OOT validation.

---


## Expanded execution control (added implementation guidance)

### Problem to close
- Random frontier ablation.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Random frontier ablation.
10. Verify requirement: Gaussian-noise “diffusion”.
11. Verify requirement: Hardcoded self-critic.
12. Verify requirement: No demonstrated VOI or expected-utility optimizer.
13. Verify requirement: No genuine foundation checkpoint.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R14 — FRONTEND TRUTH AND EXPLAINABILITY

### Findings
- `ResearchMetrics.tsx` hardcodes benchmark constants.
- Explanations are template strings, not TreeSHAP.

### Fix
Frontend metrics must be fetched from a verified evaluation artifact. The API response must include evaluation ID, dataset hash, model hash, and verification status. If current verified metrics are unavailable, the UI must say `UNVERIFIED`, not display stale constants.

For TreeSHAP, use a genuine LightGBM-compatible SHAP calculation and test the additive identity. If attribution is unavailable, show `explainability unavailable`. Never label a template as SHAP.

Display probability, confidence, OOD, data quality, and certification as separate fields.

---


## Expanded execution control (added implementation guidance)

### Problem to close
- `ResearchMetrics.tsx` hardcodes benchmark constants.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: `ResearchMetrics.tsx` hardcodes benchmark constants.
10. Verify requirement: Explanations are template strings, not TreeSHAP.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R15 — CHAOS, SAFETY, SECURITY

### Required adversarial matrix
Test empty input, null, NaN, Inf, wrong units, malformed coordinates, unsupported geography, North Pole, impossible temperatures, impossible pressure, negative precipitation/wind, future issue times, duplicate cycles, duplicate rows, corrupt JSON, corrupt model, corrupt calibrator, wrong feature count, wrong feature order, missing provider, fixture provider, and path traversal.

### Required outcomes
- missing required data → ABSTAINED;
- impossible physical state → INVALID/ABSTAINED;
- unsupported geography → ABSTAINED;
- corrupt model/calibrator → MODEL_NOT_READY;
- fixture provider → non-certified;
- path traversal → rejected;
- wrong feature schema → rejected;
- no unsafe state may return `is_certified=true`.

Maintain the existing successful concurrency tests and expand them to provider failure and shared-state mutation scenarios.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: missing required data → ABSTAINED;
10. Verify requirement: impossible physical state → INVALID/ABSTAINED;
11. Verify requirement: unsupported geography → ABSTAINED;
12. Verify requirement: corrupt model/calibrator → MODEL_NOT_READY;
13. Verify requirement: fixture provider → non-certified;
14. Verify requirement: path traversal → rejected;
15. Verify requirement: wrong feature schema → rejected;
16. Verify requirement: no unsafe state may return `is_certified=true`.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R16 — JUDGE CROSS-EXAMINATION

Create a machine-readable claim/evidence map. Every judge-facing answer must resolve to a current evidence artifact.

At minimum prepare evidence for: target definition, leakage prevention, OOT score, calibration, OOD, abstention, certification, GEFS identity, provider identity, hazard specialists, cyclone evidence, spatial validation, revision history, frontier maturity, SHAP, and failure cases.

If a capability is not implemented, the correct answer is `not implemented / experimental / heuristic`, not an inflated description.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R17 — REPRODUCIBILITY AND DEPLOYMENT

Pin dependencies. Record Python/Node versions. Add a clean-room replay script. It must restore data, verify hashes, rebuild features, run evaluation, start API, and reproduce expected metrics within documented tolerances.

Create deterministic seeds only where scientifically appropriate; do not confuse deterministic random simulations with scientific validation.

A release candidate must have a complete software bill of materials and artifact manifest.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R18 — PLAN/IMPLEMENTATION GAP CLOSURE

Create a capability matrix with exactly these states:

`NOT_IMPLEMENTED | FUTURE | SYNTHETIC | FIXTURE | HEURISTIC | EXPERIMENTAL | DIAGNOSTIC | VALIDATED | CERTIFIED | OPERATIONAL`

Every documented feature must have one state. No feature can silently move upward because a file exists. Promotion requires evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R19 — MASTER CERTIFICATION PACKAGE

For each certified capability collect:

1. source provenance;
2. dataset hash;
3. target contract;
4. issue-time audit;
5. split manifest;
6. baseline;
7. model artifact/hash;
8. calibrator;
9. OOD evaluation;
10. abstention evaluation;
11. OOT metrics;
12. subgroup metrics;
13. confidence intervals;
14. ablation;
15. adversarial tests;
16. clean-room replay;
17. API trace;
18. frontend trace;
19. independent audit.

The certification report must explicitly list failures and unsupported regions.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: source provenance;
10. Verify requirement: dataset hash;
11. Verify requirement: target contract;
12. Verify requirement: issue-time audit;
13. Verify requirement: split manifest;
14. Verify requirement: baseline;
15. Verify requirement: model artifact/hash;
16. Verify requirement: calibrator;

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R20 — INDEPENDENT ZERO-TRUST RE-AUDIT

Do not reuse the remediation team's own “PASS” as proof. A separate auditor should start from the release manifest and independently reproduce: dataset integrity, target labels, causal feature extraction, split integrity, baseline/model metrics, calibration, OOD, abstention, certification, revision, spatial/hazard/regime slices, provider identity, frontend truth, chaos tests, and security tests.

The final verdict should be generated from evidence, not from the number of tests passed.

---

# ROOT-CAUSE REMEDIATION MATRIX

| Root cause | Corrective action | Verification | Release gate |
|---|---|---|---|
| Missing authoritative data | Restore or rebuild with new identity | Hash + clean replay | BLOCKER |
| Future leakage | Issue-time keyed feature store | Causality audit = 0 violations | BLOCKER |
| Target inequality | Canonical target function | Independent 100% label match | BLOCKER |
| Split contamination | Issue-time split + embargo | overlap audit = 0 | BLOCKER |
| Metric contradiction | Rebuild benchmark | independent reproduction | BLOCKER |
| Probability ceiling | Diagnose/refit calibrator | tail + calibration suite | BLOCKER |
| Threshold drift | Central policy | policy unit/integration tests | BLOCKER |
| Missing → NORMAL | explicit missingness/abstention | empty-input test | BLOCKER |
| 92°C unsafe pass | physical plausibility gate | adversarial suite | BLOCKER |
| Certification default true | fail-closed state machine | all failure cases false | BLOCKER |
| Revision zeroing | real causal revision store | future injection test | BLOCKER |
| Static analogs | historical indexed memory | provenance + leakage test | CONDITIONAL |
| Spatial collapse | regional calibration + LOLO | subgroup acceptance | CONDITIONAL |
| Hazard heuristics | train or relabel | specialist OOT | CONDITIONAL |
| Empty cyclone catalogue | event catalogue + alignment | event-level audit | CONDITIONAL |
| Calendar regime | dynamic atmospheric regime | regime OOT | CONDITIONAL |
| GEFS mismatch | real GEFS or rename | provider/member audit | BLOCKER FOR CLAIM |
| Fixture provider | live provider or fixture-only mode | live-source test | BLOCKER FOR REDUNDANCY CLAIM |
| Synthetic frontier | real research model or relabel | ablation + OOT | BLOCKER FOR FRONTIER CLAIM |
| Template SHAP | actual SHAP or relabel | additive identity | BLOCKER FOR SHAP CLAIM |
| Hardcoded UI metrics | verified evaluation API | backend/frontend consistency test | BLOCKER |
| Missing KS drift | implement validated drift suite | drift unit/integration tests | RELEASE MONITORING |

---

# TEST SPECIFICATION — MINIMUM REQUIRED SUITE

## Causal tests
- `test_no_feature_after_issue_time`
- `test_revision_feature_causality`
- `test_future_truth_injection_has_no_effect`
- `test_preissue_revision_can_affect_prediction`

## Target tests
- `test_target_boundary_exactly_at_threshold`
- `test_target_independent_reconstruction`
- `test_threshold_manifest_matches_builder`

## Calibration tests
- `test_probability_range`
- `test_no_unexplained_probability_ceiling`
- `test_calibrator_reproducibility`
- `test_calibration_not_fit_on_test`
- `test_tail_calibration`

## OOD/safety tests
- `test_empty_features_abstain`
- `test_missing_required_feature_abstain`
- `test_physical_extreme_abstain`
- `test_unsupported_geography_abstain`
- `test_corrupt_model_not_certified`
- `test_corrupt_calibrator_not_certified`
- `test_fixture_provider_not_certified`

## Model-contract tests
- `test_feature_order`
- `test_feature_count`
- `test_model_hash`
- `test_calibrator_hash`
- `test_registry_authority`

## Frontend tests
- `test_no_hardcoded_certified_metrics`
- `test_frontend_metrics_match_backend_artifact`
- `test_unverified_metrics_are_marked`
- `test_probability_confidence_are_distinct`

## Security tests
- path traversal;
- malformed JSON;
- invalid file path;
- corrupt artifact;
- resource exhaustion;
- concurrent requests;
- provider failure.

---

# RESEARCH-GROUNDED DESIGN NOTES

The remediation uses established forecast-verification principles. Ensemble reliability means probabilities should correspond to observed frequencies, and Brier/reliability analysis is a standard way to assess probabilistic forecasts. Published NWP postprocessing work also demonstrates the value of reforecast-based calibration and the importance of evaluating calibration out of sample. NOAA documentation describes GEFSv12 as a 31-member ensemble, so member-level GEFS spread must not be conflated with disagreement among four deterministic models. Recent work also explores conformal methods for coverage-oriented uncertainty in weather forecasts; if VEYRA adopts them, they should remain a distinct uncertainty object rather than being relabeled as bust probability.

Primary references consulted during preparation include:

- Johnson & Bowler, *On the Reliability and Calibration of Ensemble Forecasts*, Monthly Weather Review.
- Zhou et al., *The Development of the NCEP Global Ensemble Forecast System Version 12*, Weather and Forecasting.
- Hamill et al., GEFSv12 reforecast and probabilistic calibration literature.
- NWP ensemble postprocessing literature on statistical/ML calibration.
- Recent work on conformal prediction for probabilistic weather forecasting.

These papers support methodology choices; none of them prove that VEYRA itself performs well.

---

# DEPENDENCY-AWARE IMPLEMENTATION ORDER

## Sprint Group A — Safety and claim containment
1. certification fail-closed;
2. remove hardcoded metrics;
3. label fixture/synthetic/heuristic modules;
4. disable unsupported operational claims;
5. add empty-input and impossible-value abstention.

## Sprint Group B — Scientific foundation
1. restore/rebuild dataset;
2. canonical target;
3. causal feature store;
4. leakage audit;
5. clean split;
6. benchmark;
7. retrain/freeze V3.

## Sprint Group C — Probability
1. calibration;
2. threshold policy;
3. tail evaluation;
4. OOD;
5. selective prediction;
6. certification gate.

## Sprint Group D — Reliability intelligence
1. revision;
2. failure memory;
3. analogs;
4. trust horizon.

## Sprint Group E — domain intelligence
1. spatial;
2. hazards;
3. cyclone;
4. atmosphere;
5. regimes;
6. multi-NWP.

## Sprint Group F — research/frontier
1. foundation representations;
2. generative spatial fields;
3. decision utility/VOI;
4. learned critic.

## Sprint Group G — final product
1. frontend evidence;
2. explainability;
3. chaos/security;
4. clean-room release;
5. independent Phase 20.

---

# FINAL DEFINITION OF DONE

VEYRA is not “fixed” when the application starts. It is fixed when an independent reviewer can trace a production probability through:

`SOURCE → PROVENANCE → ISSUE-TIME DATA → TARGET → SPLIT → BASELINE → MODEL → CALIBRATION → OOD → ABSTENTION → OOT EVIDENCE → SUBGROUP EVIDENCE → HASH → API → FRONTEND`

and when the reviewer asks, “What does VEYRA do when it does not know?”, the system demonstrably answers:

`ABSTAINED / UNKNOWN`

rather than silently returning a low-risk state.

# FINAL PRINCIPLE

> **Do not make VEYRA look more reliable. Make VEYRA know when it is not reliable.**


# VEYRA SENTINEL — FINAL MASTER PHASE-BY-PHASE 95+ EXECUTION BLUEPRINT

**Document type:** Master remediation, research, verification, engineering, certification and release execution plan
**Project:** VEYRA SENTINEL — “Know When the Forecast May Fail”
**SIH:** 26079 — AI-Based Forecast Bust Detection for Medium-Range Weather Forecasts
**Authority:** This section is an execution layer built on the forensic P0–P20 record above. It does **not** overwrite, reinterpret, or retroactively certify the forensic findings.
**Execution philosophy:** One phase → implement → test the entire phase → independently inspect evidence → pass/hold → only then advance.
**Target:** Build a scientifically defensible, engineering-grade, release-grade system. A numerical “95+” target is a project-management target, not a guarantee; certification remains evidence-gated.

---

# PART II — HOW GEMINI MUST EXECUTE THIS DOCUMENT

## A. Absolute operating rule

Gemini must behave as an engineering/research executor, not as an improvising coder. For every phase, it must:

1. read the current repository state;
2. read the relevant evidence and manifests;
3. identify exact files before editing;
4. state the scientific/engineering question being solved;
5. make the smallest defensible change that satisfies the phase;
6. never fabricate unavailable data, model weights, events, observations, benchmarks, or provider responses;
7. run the complete phase test suite;
8. run regression tests against all previously passed phases;
9. inspect generated artifacts, logs, hashes and metrics;
10. write a phase report;
11. mark every requirement PASS / FAIL / BLOCKED / N/A with evidence;
12. stop immediately if a critical gate fails;
13. never silently convert BLOCKED or N/A into PASS;
14. advance only when the phase exit gate is satisfied.

## B. The five states that must never be conflated

Every capability must carry an explicit maturity state:

- **FROZEN:** protected incumbent artifact; no silent modification.
- **CERTIFIED:** evidence chain complete and release-approved.
- **EXPERIMENTAL:** implemented and empirically tested but not release-certified.
- **DIAGNOSTIC:** useful for investigation; not allowed to drive certified decisions.
- **OPERATIONAL_ONLY:** software-operational but not scientifically validated.
- **ABSTAINED:** system intentionally refused to produce a scientific conclusion.
- **REJECTED:** tested and not promoted.
- **BLOCKED:** cannot be evaluated because a required dependency/evidence source is unavailable.
- **FUTURE:** not implemented.

Gemini must never turn a BLOCKED data dependency into a synthetic PASS.

## C. No phase may optimize against the final test set

The final untouched evaluation population is sacred. It must not be used for:

- hyperparameter tuning;
- threshold selection;
- feature selection;
- calibrator fitting;
- model selection;
- repeated exploratory analysis that informs the final model.

If the test set is touched, the test set is no longer final. Create a new untouched test period and document the contamination.

## D. Mandatory phase evidence bundle

Every phase must create a directory similar to:

```text
evidence/phases/PHASE_XX/
├── PHASE_REPORT.md
├── requirements.json
├── test_results.json
├── metrics.json
├── provenance.json
├── artifact_manifest.json
├── hashes.sha256
├── data_manifest.json              # if data is involved
├── experiment_contract.json        # if science is involved
├── decision_record.json
├── rollback_plan.md
└── figures/
```

The exact filenames may vary, but the evidence categories are mandatory.

## E. Universal phase gate

A phase is **DONE** only if all of the following are true:

```text
required implementation complete
AND
all CRITICAL tests PASS
AND
all HIGH tests PASS
AND
all required scientific metrics are reproduced
AND
no known leakage remains in the phase scope
AND
artifact hashes are recorded
AND
provenance is complete
AND
previous-phase regression suite passes
AND
negative/failure tests pass
AND
phase report is independently reviewable
AND
rollback is defined and tested where state changed
```

If any condition fails: **DO NOT ADVANCE.**

## F. What “95+” means

The project should track three independent scores, never a single blended number.

### Scientific / Technical — 100

| Area | Weight | 95+ evidence expectation |
|---|---:|---|
| Data provenance + causal validity | 15 | authoritative source, immutable lineage, issue-time proof |
| Target + benchmark integrity | 10 | 100% independent reconstruction, clean OOT benchmark |
| Model skill | 10 | challenger/incumbent gains or strong defensible baseline position |
| Calibration | 12 | OOT calibration, tails, subgroup stability, uncertainty intervals |
| OOD + abstention | 12 | risk-coverage, selective calibration, fail-closed semantics |
| Distributional verification | 8 | CRPS/Brier/PIT/rank/spread-skill and appropriate multivariate metrics |
| Spatial/generalization | 7 | geographic holdout and regional calibration |
| Hazard/regime intelligence | 7 | empirical specialists only where data supports them |
| Multi-NWP uncertainty | 6 | ensemble vs model-disagreement semantics separated |
| Independent replication | 5 | clean-room evaluator reproduces evidence |
| Advanced research evidence | 8 | only real, reproducible, incremental challengers count |

### Engineering — 100

Architecture/model authority 10; API correctness 10; data/model contracts 10; testing 15; security 10; observability 10; fault tolerance 10; reproducibility 10; performance 5; deployment/rollback 10.

### Release / Certification — 100

Claim-to-evidence 15; model/data provenance 10; certification state machine 10; clean-room reproduction 15; independent audit 15; safety invariants 15; documentation 5; frontend truth 5; incident/rollback 5; security/supply chain 5.

**Release kill-switch:** a score above 95 does not permit release if any critical safety invariant, leakage gate, provenance gate, certification gate, or clean-room reproduction gate fails.

---

# PART III — MASTER EXECUTION PHASES

The original forensic phases P0–P20 establish the baseline. The following phases are the remediation-and-upgrade program. The numbering is intentionally new so the forensic record remains immutable.


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: `test_no_feature_after_issue_time`
10. Verify requirement: `test_revision_feature_causality`
11. Verify requirement: `test_future_truth_injection_has_no_effect`
12. Verify requirement: `test_preissue_revision_can_affect_prediction`
13. Verify requirement: `test_target_boundary_exactly_at_threshold`
14. Verify requirement: `test_target_independent_reconstruction`
15. Verify requirement: `test_threshold_manifest_matches_builder`
16. Verify requirement: `test_probability_range`

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R21 — REMEDIATION CONTROL PLANE & CLAIM FREEZE

## Objective
Stop uncontrolled changes and establish one machine-readable authority for claims, artifacts, states and phase completion.

## Mandatory implementation instructions
1. Create a Claim Registry. Every public claim gets claim_id, wording, status, evidence IDs, dataset IDs, model IDs, source references, last verification date and allowed UI wording.
2. Create a Capability Registry mapping every module to maturity state and allowed downstream use.
3. Create a single phase ledger with dependencies and blockers.
4. Create immutable release IDs and evidence bundle conventions.
5. Mark all contradicted/unverified claims from P0–P20 as non-certified until re-earned.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T21.01 | Claim registry completeness | Every externally visible scientific claim is represented in the registry. | 0 uncovered claims in API/UI/docs scan | CRITICAL/HIGH according to release impact |
| T21.02 | False-claim lint | Search source/docs for forbidden phrases such as 31-member GEFS, trained specialist, live TreeSHAP, certified cyclone, foundation model unless registry evidence permits them. | No unauthorized claim survives | CRITICAL/HIGH according to release impact |
| T21.03 | State semantics | Inject CERTIFIED/EXPERIMENTAL/DIAGNOSTIC/BLOCKED/ABSTAINED states through API/UI. | State is preserved end-to-end | CRITICAL/HIGH according to release impact |
| T21.04 | Registry immutability | Attempt to mutate a certified artifact record without a new release. | Mutation rejected or creates new version | CRITICAL/HIGH according to release impact |
| T21.05 | Phase gate test | Force one critical failure. | Pipeline refuses phase advancement | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Create a Claim Registry. Every public claim gets claim_id, wording, status, evidence IDs, dataset IDs, model IDs, source references, last verification date and allowed UI wording.
10. Verify requirement: Create a Capability Registry mapping every module to maturity state and allowed downstream use.
11. Verify requirement: Create a single phase ledger with dependencies and blockers.
12. Verify requirement: Create immutable release IDs and evidence bundle conventions.
13. Verify requirement: Mark all contradicted/unverified claims from P0–P20 as non-certified until re-earned.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R22 — AUTHORITATIVE DATA RECOVERY & GOLD-LINEAGE RECONSTRUCTION

## Objective
Recover or reconstruct the real forecast-cycle corpus and truth lineage before scientific retraining.

## Mandatory implementation instructions
1. Locate the authoritative forecast archive or explicitly declare it unavailable.
2. For every forecast cycle store issue time, valid time, lead, provider, system version, member identity, variable, level, grid, units and retrieval provenance.
3. Do not substitute the existing synthetic 116,250-row benchmark for the missing authoritative corpus.
4. If GEFSv12 is used, preserve actual member identity and distinguish the operational 31-member system from historical reforecast configurations. NOAA documentation states GEFSv12 operational runs use 31 members and extend to 16 days for most cycles; the reforecast dataset has a different historical member configuration, so these must not be conflated. citeturn0search5turn0search6
5. Create a data manifest with checksums for every immutable input object.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T22.01 | Byte/hash verification | Re-download/reconstruct the same immutable source artifact. | Hash identical | CRITICAL/HIGH according to release impact |
| T22.02 | Cycle completeness | Enumerate expected cycles and compare available cycles. | Every gap explained; unexplained gaps block certification | CRITICAL/HIGH according to release impact |
| T22.03 | Forecast identity uniqueness | Ensure one forecast object cannot silently masquerade as another model/member/version. | Unique composite identity enforced | CRITICAL/HIGH according to release impact |
| T22.04 | Member-count truth test | Assert actual member count from source metadata, not documentation constants. | Metadata and data agree | CRITICAL/HIGH according to release impact |
| T22.05 | Provenance replay | Rebuild one cycle from raw source only. | Byte/semantic equivalence to normalized record | CRITICAL/HIGH according to release impact |
| T22.06 | Synthetic separation | Run source scanner over benchmark directories. | Synthetic fixtures cannot enter empirical benchmark path | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Locate the authoritative forecast archive or explicitly declare it unavailable.
10. Verify requirement: For every forecast cycle store issue time, valid time, lead, provider, system version, member identity, variable, level, grid, units and retrieval provenance.
11. Verify requirement: Do not substitute the existing synthetic 116,250-row benchmark for the missing authoritative corpus.
12. Verify requirement: If GEFSv12 is used, preserve actual member identity and distinguish the operational 31-member system from historical reforecast configurations. NOAA documentation states GEFSv12 operational runs use 31 members and extend to 16 days for most cycles; the reforecast dataset has a different historical member configuration, so these must not be conflated. citeturn0search5turn0search6
13. Verify requirement: Create a data manifest with checksums for every immutable input object.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R23 — TRUTH / REFERENCE / TARGET CONTRACT

## Objective
Create the canonical mathematical definition of what constitutes a forecast bust and make target generation independently reproducible.

## Mandatory implementation instructions
1. Define error by variable, units, forecast value, reference value, issue time, valid time and lead.
2. Define threshold operator explicitly (>, >=, absolute error, squared error, interval miscoverage, etc.).
3. Separate binary bust target from continuous error and interval-miscoverage targets.
4. Create reference quality flags and preserve ERA5-vs-station/reference distinctions.
5. Resolve the previously observed 85-row threshold-boundary discrepancy by making the operator explicit and testing it.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T23.01 | 100% target reconstruction | Independent implementation recreates labels. | 100% agreement | CRITICAL/HIGH according to release impact |
| T23.02 | Boundary test | Values exactly at threshold, epsilon below and epsilon above. | Operator behavior exact and documented | CRITICAL/HIGH according to release impact |
| T23.03 | Unit invariance | Convert equivalent values between supported units. | Labels unchanged after valid conversion | CRITICAL/HIGH according to release impact |
| T23.04 | Time identity | Shift valid time without changing truth row identity. | Target changes only when intended | CRITICAL/HIGH according to release impact |
| T23.05 | Missing truth | Remove reference value. | Target becomes unavailable, never false | CRITICAL/HIGH according to release impact |
| T23.06 | Reference sensitivity | Compare supported truth sources on matched cases. | Difference reported, not hidden | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Define error by variable, units, forecast value, reference value, issue time, valid time and lead.
10. Verify requirement: Define threshold operator explicitly (>, >=, absolute error, squared error, interval miscoverage, etc.).
11. Verify requirement: Separate binary bust target from continuous error and interval-miscoverage targets.
12. Verify requirement: Create reference quality flags and preserve ERA5-vs-station/reference distinctions.
13. Verify requirement: Resolve the previously observed 85-row threshold-boundary discrepancy by making the operator explicit and testing it.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R24 — ISSUE-TIME CAUSALITY & LEAKAGE ELIMINATION

## Objective
Rebuild feature generation around immutable issue-time snapshots rather than future valid-time indices.

## Mandatory implementation instructions
1. Represent each forecast cycle as its own causal object.
2. For a prediction at t0 and valid time v, every predictor must have availability_time <= t0.
3. Ban feature generation that indexes continuous forecast series by valid-time position when that can expose future information.
4. Create a formal availability ledger for every feature family.
5. Create automated future-data perturbation tests and static code checks for unsafe indexing patterns.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T24.01 | Future observation injection | Change an observation after t0 while holding all pre-t0 data fixed. | Feature vector identical | CRITICAL/HIGH according to release impact |
| T24.02 | Future forecast injection | Change a later forecast cycle. | Current-cycle features identical | CRITICAL/HIGH according to release impact |
| T24.03 | Revision causality | Only revisions known by each cycle may affect that cycle. | No future revision influence | CRITICAL/HIGH according to release impact |
| T24.04 | Same-event exclusion | Ensure retrieval/memory cannot access the target event outcome. | Zero same-event leakage | CRITICAL/HIGH according to release impact |
| T24.05 | Static analyzer | Scan feature code for valid-time-to-issue-time inversions. | All findings reviewed | CRITICAL/HIGH according to release impact |
| T24.06 | Replay audit | Rebuild random cycles from raw snapshots. | Bit/semantic reproducibility within declared tolerance | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Represent each forecast cycle as its own causal object.
10. Verify requirement: For a prediction at t0 and valid time v, every predictor must have availability_time <= t0.
11. Verify requirement: Ban feature generation that indexes continuous forecast series by valid-time position when that can expose future information.
12. Verify requirement: Create a formal availability ledger for every feature family.
13. Verify requirement: Create automated future-data perturbation tests and static code checks for unsafe indexing patterns.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R25 — CLEAN SPLITS, OOT DESIGN & STATISTICAL INFERENCE

## Objective
Build evaluation populations that remain untouched and scientifically independent.

## Mandatory implementation instructions
1. Use chronological train/calibration/validation/test partitions.
2. Add a blackout/purge window where overlapping valid periods could leak across splits.
3. Add geographic holdouts, event holdouts and regime holdouts where sample size permits.
4. Use event/cycle/block bootstrap rather than naive row bootstrap when rows are dependent.
5. Pre-register the final test period before tuning.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T25.01 | Temporal overlap scan | Compare train/validation/test valid-time intervals. | No prohibited overlap | CRITICAL/HIGH according to release impact |
| T25.02 | Cycle-group split | Ensure rows from one issue cycle cannot cross partitions. | Zero cycle leakage | CRITICAL/HIGH according to release impact |
| T25.03 | Event-group split | Ensure one physical event cannot cross partitions where event holdout is required. | Zero event leakage | CRITICAL/HIGH according to release impact |
| T25.04 | Spatial holdout | Remove a location entirely from training. | No training records for held-out location | CRITICAL/HIGH according to release impact |
| T25.05 | Bootstrap dependence | Compare naive and block bootstrap intervals. | Block method used for final uncertainty | CRITICAL/HIGH according to release impact |
| T25.06 | Test-set lock | Attempt to use test labels in tuning workflow. | Pipeline blocks access | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Use chronological train/calibration/validation/test partitions.
10. Verify requirement: Add a blackout/purge window where overlapping valid periods could leak across splits.
11. Verify requirement: Add geographic holdouts, event holdouts and regime holdouts where sample size permits.
12. Verify requirement: Use event/cycle/block bootstrap rather than naive row bootstrap when rows are dependent.
13. Verify requirement: Pre-register the final test period before tuning.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R26 — BASELINE LADDER 2.0 & FAIR MODEL COMPARISON

## Objective
Establish what the added intelligence must beat before adding complexity.

## Mandatory implementation instructions
1. Run climatology, persistence/historical difficulty, raw ensemble spread, spread-to-logistic, compact statistical model, incumbent V3, and challenger models.
2. For each challenger record compute budget, parameter count, latency, training data and feature families.
3. Use identical splits and targets for all models.
4. Never compare a tuned challenger against an untouched incumbent without declaring the asymmetry.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T26.01 | Baseline reproducibility | Re-run each baseline. | Metrics reproduce within declared tolerance | CRITICAL/HIGH according to release impact |
| T26.02 | Same-population comparison | All models score on identical test rows. | Population IDs identical | CRITICAL/HIGH according to release impact |
| T26.03 | Skill significance | Use paired/block bootstrap differences. | CI for every claimed improvement | CRITICAL/HIGH according to release impact |
| T26.04 | Complexity audit | Measure latency/memory/parameter count. | Trade-off documented | CRITICAL/HIGH according to release impact |
| T26.05 | Negative-control feature | Add a feature that should have no causal value. | No suspicious improvement | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Run climatology, persistence/historical difficulty, raw ensemble spread, spread-to-logistic, compact statistical model, incumbent V3, and challenger models.
10. Verify requirement: For each challenger record compute budget, parameter count, latency, training data and feature families.
11. Verify requirement: Use identical splits and targets for all models.
12. Verify requirement: Never compare a tuned challenger against an untouched incumbent without declaring the asymmetry.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R27 — V3 REBUILD, TRAIN/SERVE PARITY & MODEL AUTHORITY

## Objective
Retrain or re-certify V3 only after data, target and leakage gates are clean; make one model registry authoritative.

## Mandatory implementation instructions
1. Bind model_id, artifact hash, feature schema hash, calibrator hash, training data ID, code version and evaluation ID.
2. Eliminate direct legacy-model defaults.
3. Make every API route resolve through the same registry.
4. Verify training feature semantics exactly match serving semantics.
5. Preserve the old V3 artifact as a diagnostic comparison until the new model earns certification.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T27.01 | Route matrix | Enumerate every prediction/evaluation route. | Exactly one certified authority | CRITICAL/HIGH according to release impact |
| T27.02 | Feature-order test | Permute feature order. | Prediction changes or schema rejects; no silent reorder | CRITICAL/HIGH according to release impact |
| T27.03 | Train/serve parity | Compare offline and serving feature vectors on replay cases. | Exact/tolerance parity | CRITICAL/HIGH according to release impact |
| T27.04 | Artifact hash | Modify model bytes. | Registry mismatch blocks serving | CRITICAL/HIGH according to release impact |
| T27.05 | Calibrator compatibility | Pair wrong calibrator. | Load rejected | CRITICAL/HIGH according to release impact |
| T27.06 | Legacy route test | Call former legacy path. | Explicit diagnostic/rejected state | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Bind model_id, artifact hash, feature schema hash, calibrator hash, training data ID, code version and evaluation ID.
10. Verify requirement: Eliminate direct legacy-model defaults.
11. Verify requirement: Make every API route resolve through the same registry.
12. Verify requirement: Verify training feature semantics exactly match serving semantics.
13. Verify requirement: Preserve the old V3 artifact as a diagnostic comparison until the new model earns certification.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R28 — PROBABILITY RECONSTRUCTION & CALIBRATION 2.0

## Objective
Rebuild probability semantics and calibration using held-out calibration data, with tail and subgroup diagnostics.

## Mandatory implementation instructions
1. Compare raw probabilities, Platt/logistic scaling, isotonic, beta calibration and lead/variable-conditioned approaches where sample size permits.
2. Never fit a calibrator on final test labels.
3. Measure Brier, BSS, ECE plus calibration intercept/slope and reliability diagrams.
4. Add adaptive binning or support-aware bins so sparse tails are not overinterpreted.
5. Investigate the prior 36.8% isotonic ceiling and ensure the chosen calibrator can represent empirically observed risk tails.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T28.01 | Calibration isolation | Change test labels only. | Calibrator artifact unchanged | CRITICAL/HIGH according to release impact |
| T28.02 | Tail support | Evaluate high-risk bins. | Observed tail coverage reported | CRITICAL/HIGH according to release impact |
| T28.03 | Subgroup calibration | Lead × variable × location × season. | No hidden collapse; low-support slices flagged | CRITICAL/HIGH according to release impact |
| T28.04 | Monotonicity | Probability ordering test. | Calibrator monotonic where required | CRITICAL/HIGH according to release impact |
| T28.05 | Calibration uncertainty | Bootstrap calibration metrics. | CI reported | CRITICAL/HIGH according to release impact |
| T28.06 | Threshold separation | Change decision threshold only. | Probability artifact unchanged | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Compare raw probabilities, Platt/logistic scaling, isotonic, beta calibration and lead/variable-conditioned approaches where sample size permits.
10. Verify requirement: Never fit a calibrator on final test labels.
11. Verify requirement: Measure Brier, BSS, ECE plus calibration intercept/slope and reliability diagrams.
12. Verify requirement: Add adaptive binning or support-aware bins so sparse tails are not overinterpreted.
13. Verify requirement: Investigate the prior 36.8% isotonic ceiling and ensure the chosen calibrator can represent empirically observed risk tails.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R29 — FULL PROBABILISTIC VERIFICATION

## Objective
Expand evaluation beyond binary bust classification into continuous and ensemble/distributional verification.

## Mandatory implementation instructions
1. Add CRPS and CRPS skill for continuous error/distribution outputs where a probabilistic distribution is actually produced.
2. Add PIT/uPIT where appropriate, rank histograms for ensembles, spread-skill diagnostics, ensemble variance, ensemble-mean error and energy score for multivariate outputs.
3. Use spatial CRPS/energy-style metrics only when spatial probabilistic outputs are genuinely represented.
4. Do not compute ensemble metrics on four deterministic model outputs and label them ensemble-member spread.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T29.01 | CRPS implementation | Synthetic known-distribution cases. | Matches analytical reference | CRITICAL/HIGH according to release impact |
| T29.02 | Rank histogram | Known calibrated and underdispersed ensembles. | Diagnostic pattern correct | CRITICAL/HIGH according to release impact |
| T29.03 | Spread-skill | Construct controlled ensemble spread. | Metric direction correct | CRITICAL/HIGH according to release impact |
| T29.04 | Energy score | Multivariate toy distribution. | Reference implementation agreement | CRITICAL/HIGH according to release impact |
| T29.05 | Deterministic guard | Feed deterministic multi-model streams. | System refuses to call them ensemble spread | CRITICAL/HIGH according to release impact |
| T29.06 | Metric reproducibility | Re-run evaluator. | Identical results | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Add CRPS and CRPS skill for continuous error/distribution outputs where a probabilistic distribution is actually produced.
10. Verify requirement: Add PIT/uPIT where appropriate, rank histograms for ensembles, spread-skill diagnostics, ensemble variance, ensemble-mean error and energy score for multivariate outputs.
11. Verify requirement: Use spatial CRPS/energy-style metrics only when spatial probabilistic outputs are genuinely represented.
12. Verify requirement: Do not compute ensemble metrics on four deterministic model outputs and label them ensemble-member spread.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R30 — CONTINUOUS ERROR DISTRIBUTION & TAIL RISK

## Objective
Model the forecast error distribution, not only a binary threshold crossing.

## Mandatory implementation instructions
1. Build continuous error targets for each variable/lead.
2. Compare quantile regression, distributional regression, quantile forests/other appropriate postprocessing and the binary V3 model.
3. Derive tail probabilities from the continuous model only after calibration.
4. Evaluate threshold consistency: integrating the continuous distribution over the bust region must agree with the binary probability within declared tolerance.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T30.01 | Quantile monotonicity | Check q10 ≤ q50 ≤ q90. | No crossing | CRITICAL/HIGH according to release impact |
| T30.02 | Coverage | Evaluate nominal intervals. | Coverage reported with CI | CRITICAL/HIGH according to release impact |
| T30.03 | Tail consistency | Compare distribution-derived P(bust) with binary model. | Agreement or explained difference | CRITICAL/HIGH according to release impact |
| T30.04 | Extreme-value stress | Synthetic and real extreme cases. | No numeric explosion | CRITICAL/HIGH according to release impact |
| T30.05 | Variable units | Equivalent unit conversions. | Distribution transforms correctly | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Build continuous error targets for each variable/lead.
10. Verify requirement: Compare quantile regression, distributional regression, quantile forests/other appropriate postprocessing and the binary V3 model.
11. Verify requirement: Derive tail probabilities from the continuous model only after calibration.
12. Verify requirement: Evaluate threshold consistency: integrating the continuous distribution over the bust region must agree with the binary probability within declared tolerance.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R31 — SELECTIVE PREDICTION, RISK-COVERAGE & ABSTENTION

## Objective
Turn abstention from a software branch into a measurable scientific capability.

## Mandatory implementation instructions
1. Define acceptance/coverage policy independently from bust probability.
2. Measure risk-coverage curves, retained sample count, residual bust risk, Brier/ECE on retained data and subgroup coverage.
3. Test multiple abstention signals: missingness, OOD, support, predictive uncertainty, disagreement and evidence sufficiency.
4. Prevent the trivial policy of abstaining on everything by requiring minimum coverage and utility constraints.
5. Add explicit ABSTAINED output semantics with probability null where evidence is insufficient.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T31.01 | Empty-input | Remove required feature. | ABSTAIN | CRITICAL/HIGH according to release impact |
| T31.02 | Impossible physics | Inject 92°C or equivalent impossible case. | ABSTAIN | CRITICAL/HIGH according to release impact |
| T31.03 | OOD-confidence contradiction | Force high OOD. | Cannot emit HIGH_CONFIDENCE | CRITICAL/HIGH according to release impact |
| T31.04 | Coverage-risk monotonicity | Increase rejection strictness. | Retained risk does not worsen without explanation | CRITICAL/HIGH according to release impact |
| T31.05 | All-abstain guard | Set extreme rejection policy. | Policy flagged as unusable, not certified | CRITICAL/HIGH according to release impact |
| T31.06 | Subgroup coverage | Evaluate mountain/coastal/urban/season slices. | Coverage disparities reported | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Define acceptance/coverage policy independently from bust probability.
10. Verify requirement: Measure risk-coverage curves, retained sample count, residual bust risk, Brier/ECE on retained data and subgroup coverage.
11. Verify requirement: Test multiple abstention signals: missingness, OOD, support, predictive uncertainty, disagreement and evidence sufficiency.
12. Verify requirement: Prevent the trivial policy of abstaining on everything by requiring minimum coverage and utility constraints.
13. Verify requirement: Add explicit ABSTAINED output semantics with probability null where evidence is insufficient.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R32 — OOD 2.0, SUPPORT ESTIMATION & UNKNOWN SEMANTICS

## Objective
Replace the current weak OOD behavior with layered support detection and explicit missingness semantics.

## Mandatory implementation instructions
1. Separate physical validity, statistical support, geographic support, provider availability and missingness.
2. Use training-distribution references rather than arbitrary static constants where feasible.
3. Evaluate distance/support methods such as robust standardized distances, density/support estimators, conformal nonconformity, or other justified methods.
4. Calibrate abstention against residual risk rather than selecting an arbitrary OOD threshold.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T32.01 | Missingness semantics | Delete each feature family. | Missing, not zero; abstain if required | CRITICAL/HIGH according to release impact |
| T32.02 | Physical envelope | Inject impossible pressure/temp/wind combinations. | Reject/abstain | CRITICAL/HIGH according to release impact |
| T32.03 | Geographic OOD | Unseen location. | Unsupported/abstain | CRITICAL/HIGH according to release impact |
| T32.04 | Statistical OOD | Construct shifted feature distribution. | OOD/support score increases | CRITICAL/HIGH according to release impact |
| T32.05 | OOD calibration | Bin OOD score. | Residual risk relationship quantified | CRITICAL/HIGH according to release impact |
| T32.06 | OOD false-safe rate | Count OOD cases labelled normal/high confidence. | Zero critical false-safe cases | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Separate physical validity, statistical support, geographic support, provider availability and missingness.
10. Verify requirement: Use training-distribution references rather than arbitrary static constants where feasible.
11. Verify requirement: Evaluate distance/support methods such as robust standardized distances, density/support estimators, conformal nonconformity, or other justified methods.
12. Verify requirement: Calibrate abstention against residual risk rather than selecting an arbitrary OOD threshold.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R33 — CONFORMAL / COVERAGE CONTROL EXPERIMENTS

## Objective
Evaluate conformal methods only as a separate uncertainty/coverage layer, not as a synonym for calibration.

## Mandatory implementation instructions
1. Define nonconformity score and calibration window.
2. Test split-conformal and adaptive/rolling variants where exchangeability/stability assumptions are explicitly stated.
3. Report empirical coverage, interval width, conditional/slice coverage where estimable, and failure under distribution shift.
4. Do not claim formal guarantees outside the assumptions supported by the method and data.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T33.01 | Synthetic coverage | Known exchangeable data. | Coverage near target within sampling tolerance | CRITICAL/HIGH according to release impact |
| T33.02 | Time dependence | Dependent weather-like synthetic series. | Coverage degradation measured, not hidden | CRITICAL/HIGH according to release impact |
| T33.03 | Shift stress | Distribution shift. | Failure mode documented | CRITICAL/HIGH according to release impact |
| T33.04 | Leakage guard | Ensure calibration labels cannot come from final test. | Blocked if violated | CRITICAL/HIGH according to release impact |
| T33.05 | Interval semantics | UI/API distinction between interval coverage and bust probability. | No label conflation | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Define nonconformity score and calibration window.
10. Verify requirement: Test split-conformal and adaptive/rolling variants where exchangeability/stability assumptions are explicitly stated.
11. Verify requirement: Report empirical coverage, interval width, conditional/slice coverage where estimable, and failure under distribution shift.
12. Verify requirement: Do not claim formal guarantees outside the assumptions supported by the method and data.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R34 — REVISION TRAJECTORIES & FORECAST-STABILITY INTELLIGENCE

## Objective
Replace zeroed revision features with real multi-cycle causal trajectories.

## Mandatory implementation instructions
1. Store forecast snapshots at each issuance/update time.
2. Compute revision magnitude, direction, acceleration, reversal, persistence, spread evolution and model disagreement evolution.
3. For every revision feature record the first time it became available.
4. Train/test revision features using only history available at the prediction issue time.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T34.01 | Causal replay | Reconstruct trajectory one issue time at a time. | No future snapshot accessed | CRITICAL/HIGH according to release impact |
| T34.02 | Revision zero test | Identical cycles. | Revision features exactly zero when truly unchanged | CRITICAL/HIGH according to release impact |
| T34.03 | Single-update test | Modify one prior forecast snapshot. | Only causally affected features change | CRITICAL/HIGH according to release impact |
| T34.04 | Future-update test | Modify later snapshot. | Current prediction unchanged | CRITICAL/HIGH according to release impact |
| T34.05 | Stability-feature calibration | Evaluate instability score against future busts. | Empirical calibration or reject | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Store forecast snapshots at each issuance/update time.
10. Verify requirement: Compute revision magnitude, direction, acceleration, reversal, persistence, spread evolution and model disagreement evolution.
11. Verify requirement: For every revision feature record the first time it became available.
12. Verify requirement: Train/test revision features using only history available at the prediction issue time.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R35 — FAILURE MEMORY, ANALOG RETRIEVAL & FAILURE FINGERPRINTS

## Objective
Replace eight static analogs and empty memory with provenance-backed, leakage-safe historical retrieval.

## Mandatory implementation instructions
1. Build episode records containing issue-time feature snapshot, forecast identity, outcome, bust definition, variable, location, lead, model version and provenance.
2. Deduplicate physical events and forecast cycles.
3. Use leave-one-event-out or equivalent exclusion so the query event cannot retrieve itself or a future manifestation of itself.
4. Evaluate analog retrieval as an experiment: does similar historical context predict similar reliability outcomes?

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T35.01 | Empty-memory semantics | No episodes available. | ABSTAIN/NO_EVIDENCE, never fabricated analogs | CRITICAL/HIGH according to release impact |
| T35.02 | Self-retrieval | Query an indexed event. | Same event excluded | CRITICAL/HIGH according to release impact |
| T35.03 | Future-event exclusion | Query before event outcome is known. | Outcome unavailable to retrieval | CRITICAL/HIGH according to release impact |
| T35.04 | Provenance trace | Retrieve an analog. | Source episode and hash shown | CRITICAL/HIGH according to release impact |
| T35.05 | Retrieval lift | Compare analog-informed vs baseline. | Incremental value measured with CI | CRITICAL/HIGH according to release impact |
| T35.06 | Static-fixture scanner | Remove fixture directory from empirical path. | No fixture leakage | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Build episode records containing issue-time feature snapshot, forecast identity, outcome, bust definition, variable, location, lead, model version and provenance.
10. Verify requirement: Deduplicate physical events and forecast cycles.
11. Verify requirement: Use leave-one-event-out or equivalent exclusion so the query event cannot retrieve itself or a future manifestation of itself.
12. Verify requirement: Evaluate analog retrieval as an experiment: does similar historical context predict similar reliability outcomes?

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R36 — TRUST HORIZON, TIME-TO-BUST & RECOVERY

## Objective
Make trust horizon an empirical reliability curve and time-to-event layer rather than a static 120/168-hour cutoff.

## Mandatory implementation instructions
1. Estimate lead-dependent reliability by variable, location, season, regime and support state.
2. Define trust horizon using a declared risk criterion and minimum support.
3. Develop survival/time-to-bust representation only if repeated lead trajectories are available.
4. Define recovery states from actual post-bust probability/error trajectories.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T36.01 | Lead monotonicity diagnostic | Evaluate reliability by lead. | Curve and uncertainty shown | CRITICAL/HIGH according to release impact |
| T36.02 | Horizon support | Require minimum events per lead. | Sparse leads cannot become certified | CRITICAL/HIGH according to release impact |
| T36.03 | Time-to-bust censoring | Construct censored synthetic examples. | Survival evaluator handles censoring | CRITICAL/HIGH according to release impact |
| T36.04 | Recovery validation | Known recovery trajectories. | Transition logic correct | CRITICAL/HIGH according to release impact |
| T36.05 | Static-cutoff removal | Compare old and empirical horizon. | No hidden hardcoded horizon remains | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Estimate lead-dependent reliability by variable, location, season, regime and support state.
10. Verify requirement: Define trust horizon using a declared risk criterion and minimum support.
11. Verify requirement: Develop survival/time-to-bust representation only if repeated lead trajectories are available.
12. Verify requirement: Define recovery states from actual post-bust probability/error trajectories.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R37 — HAZARD-AGNOSTIC CONDITIONAL RELIABILITY & REGIME INTELLIGENCE

## Objective
Model how reliability changes conditional on physical forecast difficulty without equating hazard with bust.

## Mandatory implementation instructions
1. Separate hazard presence from forecast error/bust.
2. Build conditional reliability tables for precipitation, convection proxies, heat, cyclone proximity, monsoon/LPS, western disturbance, high wind and compound conditions only where data exists.
3. Use physical regime descriptors rather than calendar-only regime labels when possible.
4. Every regime feature must be issue-time available.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T37.01 | Hazard-not-bust test | Inject a real high-hazard but accurate forecast case. | Hazard does not automatically imply bust | CRITICAL/HIGH according to release impact |
| T37.02 | Bust-without-hazard test | Inject forecast-error case without specialist hazard. | Core model still detects possible bust | CRITICAL/HIGH according to release impact |
| T37.03 | Regime leakage | Perturb future regime labels. | No issue-time feature change | CRITICAL/HIGH according to release impact |
| T37.04 | Conditional calibration | Evaluate each supported regime. | Calibration reported with support | CRITICAL/HIGH according to release impact |
| T37.05 | Regime transfer | Hold out a regime/time block. | Generalization quantified | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Separate hazard presence from forecast error/bust.
10. Verify requirement: Build conditional reliability tables for precipitation, convection proxies, heat, cyclone proximity, monsoon/LPS, western disturbance, high wind and compound conditions only where data exists.
11. Verify requirement: Use physical regime descriptors rather than calendar-only regime labels when possible.
12. Verify requirement: Every regime feature must be issue-time available.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R38 — PRECIPITATION SPECIALIST — EMPIRICAL P0

## Objective
Build the first empirical hazard specialist only if real precipitation forecast/reference data passes the data gate.

## Mandatory implementation instructions
1. Create event and continuous precipitation targets with accumulation windows and units explicit.
2. Establish climatology, persistence, raw ensemble, spread-logistic and compact statistical baselines.
3. Train specialist challenger(s) only after leakage audit.
4. Calibrate, test OOD and evaluate heavy-rain tails.
5. Integrate as conditional reliability evidence, not as an automatic bust label.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T38.01 | Precip target reconstruction | Independent label builder. | 100% agreement | CRITICAL/HIGH according to release impact |
| T38.02 | Zero-event handling | Test periods with no rain events. | Metrics remain defined/flagged appropriately | CRITICAL/HIGH according to release impact |
| T38.03 | Heavy-tail calibration | High precipitation bins. | Tail calibration reported | CRITICAL/HIGH according to release impact |
| T38.04 | Specialist-vs-core ablation | Remove specialist. | Incremental value quantified | CRITICAL/HIGH according to release impact |
| T38.05 | False-safe heavy rain | High-hazard accurate and bust cases. | No systematic false-safe | CRITICAL/HIGH according to release impact |
| T38.06 | Data-gate test | Remove precipitation source. | Module becomes BLOCKED, never synthetic | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Create event and continuous precipitation targets with accumulation windows and units explicit.
10. Verify requirement: Establish climatology, persistence, raw ensemble, spread-logistic and compact statistical baselines.
11. Verify requirement: Train specialist challenger(s) only after leakage audit.
12. Verify requirement: Calibrate, test OOD and evaluate heavy-rain tails.
13. Verify requirement: Integrate as conditional reliability evidence, not as an automatic bust label.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R39 — CYCLONE / LPS / WESTERN DISTURBANCE / HEATWAVE SPECIALISTS

## Objective
Build event-specific specialists only when each event catalogue and target can support held-out evaluation.

## Mandatory implementation instructions
1. Cyclone: track proximity, timing, intensity/error and forecast-reliability targets.
2. LPS/monsoon: event/regime catalogue, transition, rainfall and timing targets.
3. Western disturbance: event catalogue, vertical/jet/terrain context, timing and precipitation.
4. Heatwave: onset, duration, cessation, threshold exceedance and persistence.
5. If sample size is insufficient, keep the module DATA-GATED/DIAGNOSTIC.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T39.01 | Catalogue completeness | Cross-check event records against source. | Coverage gaps explained | CRITICAL/HIGH according to release impact |
| T39.02 | Event split | Hold out entire events. | No event leakage | CRITICAL/HIGH according to release impact |
| T39.03 | Sparse-positive guard | Construct/identify low-positive slice. | No unsupported skill claim | CRITICAL/HIGH according to release impact |
| T39.04 | Specialist promotion | Require trained artifact + calibration + OOT + OOD. | Promotion blocked without chain | CRITICAL/HIGH according to release impact |
| T39.05 | Cyclone empty-catalogue guard | Empty catalogue. | Module cannot claim certification | CRITICAL/HIGH according to release impact |
| T39.06 | Compound separation | Single-hazard specialist outputs. | No double-counting in aggregate | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Cyclone: track proximity, timing, intensity/error and forecast-reliability targets.
10. Verify requirement: LPS/monsoon: event/regime catalogue, transition, rainfall and timing targets.
11. Verify requirement: Western disturbance: event catalogue, vertical/jet/terrain context, timing and precipitation.
12. Verify requirement: Heatwave: onset, duration, cessation, threshold exceedance and persistence.
13. Verify requirement: If sample size is insufficient, keep the module DATA-GATED/DIAGNOSTIC.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R40 — VERTICAL ATMOSPHERE, PREDICTABILITY GEOMETRY & PHYSICAL CONTEXT

## Objective
Add genuine pressure-level/vertical structure only from issue-time data and prove incremental value.

## Mandatory implementation instructions
1. Integrate available pressure-level variables, sounding summaries or other validated vertical data.
2. Construct physically interpretable summaries: lapse-rate proxies, shear, stability, geopotential gradients, jet/blocking indicators where data supports them.
3. Do not use simulated placeholders as empirical evidence.
4. Test whether vertical information improves reliability conditional on the existing surface feature set.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T40.01 | Level alignment | Verify pressure/height/time coordinates. | No coordinate mismatch | CRITICAL/HIGH according to release impact |
| T40.02 | Issue-time availability | Remove future sounding observations. | Feature unchanged | CRITICAL/HIGH according to release impact |
| T40.03 | Ablation | Compare surface-only vs surface+vertical. | Incremental metric with CI | CRITICAL/HIGH according to release impact |
| T40.04 | Physical sanity | Known atmospheric profiles. | Derived indices physically consistent | CRITICAL/HIGH according to release impact |
| T40.05 | Missing-profile behavior | Remove sounding. | Explicit missing/abstention semantics | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Integrate available pressure-level variables, sounding summaries or other validated vertical data.
10. Verify requirement: Construct physically interpretable summaries: lapse-rate proxies, shear, stability, geopotential gradients, jet/blocking indicators where data supports them.
11. Verify requirement: Do not use simulated placeholders as empirical evidence.
12. Verify requirement: Test whether vertical information improves reliability conditional on the existing surface feature set.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R41 — SPATIAL RELIABILITY, REGIONAL CALIBRATION & PROPAGATION

## Objective
Turn the static topology into a validated spatial reliability system with geographic holdouts and lagged evidence.

## Mandatory implementation instructions
1. Align claimed nodes with actual data coverage.
2. Model elevation/orography and other regional covariates where justified.
3. Learn or validate spatial dependence rather than assuming exp(-d/350 km).
4. Test lagged directional relationships before using the word propagation.
5. Quantify spatial uncertainty and regional calibration.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T41.01 | Node coverage | Map all claimed nodes to real evidence. | Unsupported nodes cannot be certified | CRITICAL/HIGH according to release impact |
| T41.02 | LOLO evaluation | Hold out one station/region. | Reported per-region performance | CRITICAL/HIGH according to release impact |
| T41.03 | Mountain stress | Srinagar/analog mountain region. | No hidden calibration collapse | CRITICAL/HIGH according to release impact |
| T41.04 | Distance-law validation | Compare fixed vs learned spatial decay. | Empirical evidence required | CRITICAL/HIGH according to release impact |
| T41.05 | Lagged propagation | Permutation/lag tests. | Temporal precedence required | CRITICAL/HIGH according to release impact |
| T41.06 | Simultaneous-correlation guard | Same-time correlation only. | Cannot be labelled propagation | CRITICAL/HIGH according to release impact |
| T41.07 | Spatial field integrity | Perturb one node. | Only physically/algorithmically connected region changes | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Align claimed nodes with actual data coverage.
10. Verify requirement: Model elevation/orography and other regional covariates where justified.
11. Verify requirement: Learn or validate spatial dependence rather than assuming exp(-d/350 km).
12. Verify requirement: Test lagged directional relationships before using the word propagation.
13. Verify requirement: Quantify spatial uncertainty and regional calibration.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R42 — MULTI-NWP / ENSEMBLE SEMANTICS / PROVIDER GOVERNANCE

## Objective
Separate true ensemble uncertainty from deterministic model disagreement and make provider identity explicit.

## Mandatory implementation instructions
1. If actual GEFS members are available, preserve member-level statistics.
2. If only GFS/ECMWF/ICON/GEM deterministic streams exist, call the quantity model disagreement or multi-model spread, not ensemble-member spread.
3. Build provider-specific missingness and calibration.
4. Do not silently replace missing streams with zero.
5. Add provider/model-version identity to every prediction.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T42.01 | Semantic naming scan | Search UI/API/docs for misuse of spread terminology. | No false ensemble terminology | CRITICAL/HIGH according to release impact |
| T42.02 | Missing-provider test | Remove one stream. | Missingness preserved; no zero substitution | CRITICAL/HIGH according to release impact |
| T42.03 | Provider calibration | Score each provider/system. | Differences visible | CRITICAL/HIGH according to release impact |
| T42.04 | Provider holdout | Train on available systems, hold one out where data supports. | Transfer measured | CRITICAL/HIGH according to release impact |
| T42.05 | Version shift | Change upstream model version metadata. | Drift/version state updates | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: If actual GEFS members are available, preserve member-level statistics.
10. Verify requirement: If only GFS/ECMWF/ICON/GEM deterministic streams exist, call the quantity model disagreement or multi-model spread, not ensemble-member spread.
11. Verify requirement: Build provider-specific missingness and calibration.
12. Verify requirement: Do not silently replace missing streams with zero.
13. Verify requirement: Add provider/model-version identity to every prediction.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R43 — INDEPENDENT TRUTH, SENSOR QC & REFERENCE SENSITIVITY

## Objective
Challenge ERA5-only truth with independent observations where available and quantify representativeness error.

## Mandatory implementation instructions
1. Acquire paired station/AWS/radar/satellite or other appropriate observations where legally and technically available.
2. Build quality-control flags before using observations as truth.
3. Compare point observation vs grid-cell/reanalysis truth and quantify representativeness differences.
4. Never present an independent sensor stub as a live feed.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T43.01 | QC replay | Known bad observation cases. | QC flags correctly | CRITICAL/HIGH according to release impact |
| T43.02 | Reference disagreement | Matched ERA5 vs station. | Difference distribution reported | CRITICAL/HIGH according to release impact |
| T43.03 | Truth availability | Remove independent feed. | System degrades explicitly | CRITICAL/HIGH according to release impact |
| T43.04 | Reference sensitivity | Re-score benchmark with alternative reference. | Sensitivity report generated | CRITICAL/HIGH according to release impact |
| T43.05 | Station latency | Delay observation availability. | No post-t0 leakage into prediction | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Acquire paired station/AWS/radar/satellite or other appropriate observations where legally and technically available.
10. Verify requirement: Build quality-control flags before using observations as truth.
11. Verify requirement: Compare point observation vs grid-cell/reanalysis truth and quantify representativeness differences.
12. Verify requirement: Never present an independent sensor stub as a live feed.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R44 — COMPOUND HAZARDS & JOINT RELIABILITY

## Objective
Build joint reliability only after component probabilities are empirically calibrated and dependence is measurable.

## Mandatory implementation instructions
1. Define joint event targets explicitly.
2. Estimate dependence from held-out data; do not assume a copula parameter without evidence.
3. Avoid double-counting shared evidence from specialist outputs.
4. Report marginal and joint calibration separately.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T44.01 | Marginal consistency | Joint model marginals vs specialist probabilities. | Consistent or difference explained | CRITICAL/HIGH according to release impact |
| T44.02 | Joint calibration | Reliability of joint event probability. | Reported with CI | CRITICAL/HIGH according to release impact |
| T44.03 | Dependence sensitivity | Vary dependence assumptions. | Risk bounds reported | CRITICAL/HIGH according to release impact |
| T44.04 | Double-count test | Duplicate evidence feature. | No artificial confidence inflation | CRITICAL/HIGH according to release impact |
| T44.05 | Sparse joint events | Low joint-positive count. | Block certification / abstain | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Define joint event targets explicitly.
10. Verify requirement: Estimate dependence from held-out data; do not assume a copula parameter without evidence.
11. Verify requirement: Avoid double-counting shared evidence from specialist outputs.
12. Verify requirement: Report marginal and joint calibration separately.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R45 — DRIFT, MODEL-CHANGE & RETRAINING GOVERNANCE

## Objective
Detect distribution and calibration drift without automatically retraining into an unverified state.

## Mandatory implementation instructions
1. Implement KS/two-sample tests where assumptions fit, PSI, Wasserstein/other distribution distances, JS divergence and multivariate methods such as MMD where justified.
2. Track prediction distribution, feature distribution, prevalence, calibration slope/intercept, ECE/Brier, OOD and abstention over rolling windows.
3. Detect upstream NWP model changes, observing-system changes and code/model version changes.
4. Define retraining triggers and a shadow-evaluation workflow.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T45.01 | No-drift control | Same-distribution windows. | False alarm rate characterized | CRITICAL/HIGH according to release impact |
| T45.02 | Synthetic shift | Inject known mean/variance/distribution shift. | Detector responds | CRITICAL/HIGH according to release impact |
| T45.03 | Model-version shift | Change model version. | Version event logged | CRITICAL/HIGH according to release impact |
| T45.04 | Calibration drift | Inject probability distortion. | Calibration alarm | CRITICAL/HIGH according to release impact |
| T45.05 | Retrain safety | Trigger retraining condition. | New model stays shadow/unreleased until gates pass | CRITICAL/HIGH according to release impact |
| T45.06 | Rollback | Promote bad challenger deliberately. | Automatic/manual rollback restores certified artifact | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Implement KS/two-sample tests where assumptions fit, PSI, Wasserstein/other distribution distances, JS divergence and multivariate methods such as MMD where justified.
10. Verify requirement: Track prediction distribution, feature distribution, prevalence, calibration slope/intercept, ECE/Brier, OOD and abstention over rolling windows.
11. Verify requirement: Detect upstream NWP model changes, observing-system changes and code/model version changes.
12. Verify requirement: Define retraining triggers and a shadow-evaluation workflow.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R46 — FEATURE IMPORTANCE STABILITY, EXPLAINABILITY & FAITHFULNESS

## Objective
Replace template claims with evidence-backed attribution and stability analysis.

## Mandatory implementation instructions
1. Use genuine TreeSHAP only when the model is compatible and the implementation is actually executing it.
2. Compare SHAP/attribution across seeds, bootstrap samples, locations, leads and model versions.
3. Test attribution faithfulness by feature perturbation/ablation.
4. Never equate feature importance with causality.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T46.01 | Attribution reconstruction | Known model/input. | Attribution reproducible | CRITICAL/HIGH according to release impact |
| T46.02 | Additivity/consistency | Model-compatible SHAP check. | Expected mathematical property passes | CRITICAL/HIGH according to release impact |
| T46.03 | Perturbation faithfulness | Change top feature. | Prediction responds consistently where expected | CRITICAL/HIGH according to release impact |
| T46.04 | Stability | Bootstrap attribution. | Stability quantified | CRITICAL/HIGH according to release impact |
| T46.05 | Template guard | Disable SHAP dependency. | UI says unavailable, not fake SHAP | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Use genuine TreeSHAP only when the model is compatible and the implementation is actually executing it.
10. Verify requirement: Compare SHAP/attribution across seeds, bootstrap samples, locations, leads and model versions.
11. Verify requirement: Test attribution faithfulness by feature perturbation/ablation.
12. Verify requirement: Never equate feature importance with causality.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R47 — FRONTEND EVIDENCE TRUTH / JUDGE MODE / SHOW-YOUR-WORK

## Objective
Make every displayed metric, probability and certification state traceable to live evidence artifacts.

## Mandatory implementation instructions
1. Remove hardcoded headline metrics such as FROZEN_V3_METRICS from authoritative UI paths.
2. Display dataset ID, split, model hash, calibrator version, evaluation timestamp and support count for scientific metrics.
3. Create Judge Mode with concise evidence cards: what is measured, what is certified, what is experimental, what is unavailable.
4. Create Show-Your-Work mode for a prediction: input provenance → feature availability → model → calibration → OOD → decision → evidence.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T47.01 | Metric source test | Change backend metric artifact. | UI updates from backend | CRITICAL/HIGH according to release impact |
| T47.02 | Stale metric test | Delete/expire evaluation artifact. | UI does not show stale certified metric | CRITICAL/HIGH according to release impact |
| T47.03 | Certification badge test | Force uncertified model. | Badge and wording change | CRITICAL/HIGH according to release impact |
| T47.04 | Prediction trace | Replay a prediction. | Trace reproducible | CRITICAL/HIGH according to release impact |
| T47.05 | Fixture guard | Disable live provider. | UI says fixture/unavailable, never live | CRITICAL/HIGH according to release impact |
| T47.06 | Accessibility/clarity | Render all state badges. | No ambiguous color-only semantics | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Remove hardcoded headline metrics such as FROZEN_V3_METRICS from authoritative UI paths.
10. Verify requirement: Display dataset ID, split, model hash, calibrator version, evaluation timestamp and support count for scientific metrics.
11. Verify requirement: Create Judge Mode with concise evidence cards: what is measured, what is certified, what is experimental, what is unavailable.
12. Verify requirement: Create Show-Your-Work mode for a prediction: input provenance → feature availability → model → calibration → OOD → decision → evidence.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R48 — DECISION UTILITY, COST-SENSITIVE POLICY & VALUE OF INFORMATION

## Objective
Translate calibrated reliability into explicit actions without hiding the cost assumptions.

## Mandatory implementation instructions
1. Define user/action set: NORMAL, MONITOR, ESCALATE, ABSTAIN or domain-specific actions.
2. Define an explicit loss/cost matrix.
3. Compute expected utility using calibrated probabilities and uncertainty.
4. Run Value-of-Information experiments: would obtaining another provider/observation/revision materially change the action?
5. Keep policy separate from probability model.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T48.01 | Utility algebra | Known probabilities/costs. | Optimal action matches analytical solution | CRITICAL/HIGH according to release impact |
| T48.02 | Cost sensitivity | Vary false-safe/false-alarm costs. | Policy changes predictably | CRITICAL/HIGH according to release impact |
| T48.03 | Probability separation | Change threshold/policy only. | Underlying probability unchanged | CRITICAL/HIGH according to release impact |
| T48.04 | VOI toy case | Known information gain. | VOI sign/magnitude correct | CRITICAL/HIGH according to release impact |
| T48.05 | Human override audit | Override action. | Reason and timestamp recorded | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Define user/action set: NORMAL, MONITOR, ESCALATE, ABSTAIN or domain-specific actions.
10. Verify requirement: Define an explicit loss/cost matrix.
11. Verify requirement: Compute expected utility using calibrated probabilities and uncertainty.
12. Verify requirement: Run Value-of-Information experiments: would obtaining another provider/observation/revision materially change the action?
13. Verify requirement: Keep policy separate from probability model.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R49 — COUNTERFACTUAL, METAMORPHIC & SCIENTIFIC PROPERTY TESTING

## Objective
Test scientific invariants that ordinary unit tests cannot catch.

## Mandatory implementation instructions
1. Create metamorphic tests for harmless metadata/order changes, unit conversions and deterministic replay.
2. Create counterfactual tests where one causal feature family is changed while others remain fixed.
3. Create negative controls that should not improve performance.
4. Create adversarial perturbations around thresholds and physical boundaries.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T49.01 | Dictionary order | Reorder input keys. | Same output | CRITICAL/HIGH according to release impact |
| T49.02 | Unit conversion | Equivalent unit representation. | Equivalent scientific output | CRITICAL/HIGH according to release impact |
| T49.03 | Metadata perturbation | Change irrelevant metadata. | No output change | CRITICAL/HIGH according to release impact |
| T49.04 | Causal feature perturbation | Change one valid feature. | Output response direction/effect measured | CRITICAL/HIGH according to release impact |
| T49.05 | Negative control | Random unrelated feature. | No suspicious skill gain | CRITICAL/HIGH according to release impact |
| T49.06 | Boundary epsilon | Perturb threshold by tiny epsilon. | Decision changes only where mathematically expected | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Create metamorphic tests for harmless metadata/order changes, unit conversions and deterministic replay.
10. Verify requirement: Create counterfactual tests where one causal feature family is changed while others remain fixed.
11. Verify requirement: Create negative controls that should not improve performance.
12. Verify requirement: Create adversarial perturbations around thresholds and physical boundaries.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R50 — REPRODUCIBILITY, CLEAN-ROOM EVALUATOR & ONE-COMMAND REPRODUCTION

## Objective
Make the scientific result independently reproducible without relying on developer memory.

## Mandatory implementation instructions
1. Create a clean-room evaluator that knows only dataset/model/evaluation contracts, not implementation internals.
2. Freeze exact dependency versions and hashes.
3. Provide one-command reproduction from raw/approved artifacts to final tables and figures.
4. Record seeds and nondeterministic settings.
5. Define numerical tolerances for metrics and predictions.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T50.01 | Fresh environment | Build from clean environment. | Build succeeds | CRITICAL/HIGH according to release impact |
| T50.02 | One-command benchmark | Run reproduction command. | Expected artifacts produced | CRITICAL/HIGH according to release impact |
| T50.03 | Seed reproducibility | Repeat same seed. | Identical or tolerance-equivalent | CRITICAL/HIGH according to release impact |
| T50.04 | Independent evaluator | Run separate evaluator. | Metrics agree within tolerance | CRITICAL/HIGH according to release impact |
| T50.05 | Hash audit | Hash all outputs. | Manifest complete | CRITICAL/HIGH according to release impact |
| T50.06 | No hidden local state | Run outside developer directory. | No undocumented dependency | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Create a clean-room evaluator that knows only dataset/model/evaluation contracts, not implementation internals.
10. Verify requirement: Freeze exact dependency versions and hashes.
11. Verify requirement: Provide one-command reproduction from raw/approved artifacts to final tables and figures.
12. Verify requirement: Record seeds and nondeterministic settings.
13. Verify requirement: Define numerical tolerances for metrics and predictions.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R51 — SECURITY, SUPPLY CHAIN, API CONTRACTS & SECRET HYGIENE

## Objective
Harden the engineering system so scientific evidence cannot be silently altered or bypassed.

## Mandatory implementation instructions
1. Pin dependencies and generate SBOM/lock information.
2. Validate paths and artifact locations.
3. Add API schema contracts, authentication/authorization where required, rate limits and payload limits.
4. Ensure logs do not expose credentials or unbounded raw forecast payloads.
5. Verify model artifacts cannot be replaced without hash/registry change.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T51.01 | Dependency audit | Known vulnerable dependency fixture. | Detected/blocked according to policy | CRITICAL/HIGH according to release impact |
| T51.02 | Path traversal | Traversal payloads. | Rejected | CRITICAL/HIGH according to release impact |
| T51.03 | Schema fuzzing | Malformed JSON/types/extra fields. | Safe validation | CRITICAL/HIGH according to release impact |
| T51.04 | Artifact tamper | Modify model/calibrator. | Load blocked | CRITICAL/HIGH according to release impact |
| T51.05 | Secret scan | Known fake secret patterns. | Detected | CRITICAL/HIGH according to release impact |
| T51.06 | Log redaction | Inject secret-like strings. | Not emitted | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Pin dependencies and generate SBOM/lock information.
10. Verify requirement: Validate paths and artifact locations.
11. Verify requirement: Add API schema contracts, authentication/authorization where required, rate limits and payload limits.
12. Verify requirement: Ensure logs do not expose credentials or unbounded raw forecast payloads.
13. Verify requirement: Verify model artifacts cannot be replaced without hash/registry change.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R52 — OBSERVABILITY, REPLAY, GOLDEN PREDICTIONS & INCIDENT RESPONSE

## Objective
Make production behavior inspectable and replayable.

## Mandatory implementation instructions
1. Emit structured request/model/data/provider/evidence IDs.
2. Monitor latency, errors, missingness, provider failures, OOD, abstention, prediction distribution, calibration drift and evidence support.
3. Create a golden prediction set that must remain stable across releases unless intentionally changed.
4. Implement replay from captured issue-time inputs without using future data.
5. Define incident severity and scientific incident recall.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T52.01 | Golden set | Replay canonical cases. | Outputs within declared tolerance | CRITICAL/HIGH according to release impact |
| T52.02 | Provider outage | Disable provider. | Correct fallback/abstention | CRITICAL/HIGH according to release impact |
| T52.03 | Stale data | Freeze source timestamp. | Stale-data state emitted | CRITICAL/HIGH according to release impact |
| T52.04 | Clock skew | Shift system clock in test harness. | Temporal integrity guard triggers | CRITICAL/HIGH according to release impact |
| T52.05 | Replay determinism | Replay same request. | Same evidence-linked result | CRITICAL/HIGH according to release impact |
| T52.06 | Incident audit | Force model mismatch. | Incident event recorded | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Emit structured request/model/data/provider/evidence IDs.
10. Verify requirement: Monitor latency, errors, missingness, provider failures, OOD, abstention, prediction distribution, calibration drift and evidence support.
11. Verify requirement: Create a golden prediction set that must remain stable across releases unless intentionally changed.
12. Verify requirement: Implement replay from captured issue-time inputs without using future data.
13. Verify requirement: Define incident severity and scientific incident recall.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R53 — PERFORMANCE, CONCURRENCY, LOAD & SAFE DEGRADATION

## Objective
Prove the scientific safeguards survive realistic operational pressure.

## Mandatory implementation instructions
1. Measure p50/p95/p99 latency and memory.
2. Test concurrent requests and provider contention.
3. Test timeouts, cancellation, partial data, cache corruption and worker restart.
4. Define safe degradation: slower, unavailable or abstained is preferable to false certainty.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T53.01 | Concurrency | 20/100/500 appropriate parallel requests. | No state bleed | CRITICAL/HIGH according to release impact |
| T53.02 | Timeout | Force slow provider. | Timeout becomes explicit unavailable/abstain | CRITICAL/HIGH according to release impact |
| T53.03 | Memory pressure | Stress repeated inference. | No unbounded leak | CRITICAL/HIGH according to release impact |
| T53.04 | Cache corruption | Corrupt cached artifact. | Cache rejected and rebuilt/abstained | CRITICAL/HIGH according to release impact |
| T53.05 | Latency budget | Benchmark p95/p99. | Within declared operational budget or state documented | CRITICAL/HIGH according to release impact |
| T53.06 | Safe degradation | Remove optional feature family. | Core does not silently invent it | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Measure p50/p95/p99 latency and memory.
10. Verify requirement: Test concurrent requests and provider contention.
11. Verify requirement: Test timeouts, cancellation, partial data, cache corruption and worker restart.
12. Verify requirement: Define safe degradation: slower, unavailable or abstained is preferable to false certainty.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R54 — ADVANCED FRONTIER CHALLENGERS — FOUNDATION REPRESENTATIONS

## Objective
Only after the incumbent scientific foundation is clean, test pretrained weather representations as challengers, never as decoration.

## Mandatory implementation instructions
1. Select a real pretrained weather model/checkpoint with provenance and compatible variables/resolution.
2. Freeze the representation first; evaluate as a feature/embedding challenger.
3. Compare against V3 and compact baselines under identical splits.
4. Do not claim a foundation model exists until a real checkpoint is loaded and independently evaluated.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T54.01 | Checkpoint provenance | Verify source/version/hash. | Immutable checkpoint record | CRITICAL/HIGH according to release impact |
| T54.02 | Frozen embedding | Disable fine-tuning. | Reproducible representation | CRITICAL/HIGH according to release impact |
| T54.03 | Ablation | V3 vs V3+embedding. | Incremental value with CI | CRITICAL/HIGH according to release impact |
| T54.04 | OOD transfer | Unseen region/time. | Support behavior measured | CRITICAL/HIGH according to release impact |
| T54.05 | Compute budget | Record resources. | Fair comparison | CRITICAL/HIGH according to release impact |
| T54.06 | No-checkpoint guard | Remove checkpoint. | Module becomes BLOCKED | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Select a real pretrained weather model/checkpoint with provenance and compatible variables/resolution.
10. Verify requirement: Freeze the representation first; evaluate as a feature/embedding challenger.
11. Verify requirement: Compare against V3 and compact baselines under identical splits.
12. Verify requirement: Do not claim a foundation model exists until a real checkpoint is loaded and independently evaluated.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R55 — ADVANCED TEMPORAL / GRAPH / ATTENTION CHALLENGERS

## Objective
Test sequence, graph and attention models only if they address a measured weakness.

## Mandatory implementation instructions
1. Define the exact failure mode the challenger is intended to fix: temporal trajectory, spatial dependence, revision dynamics, etc.
2. Use leakage-safe sequences and graph construction.
3. Compare against strong non-neural baselines.
4. Reject models that improve only on compromised or synthetic benchmarks.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T55.01 | Sequence cutoff | Future sequence values. | Blocked | CRITICAL/HIGH according to release impact |
| T55.02 | Graph holdout | Held-out node. | No training leakage | CRITICAL/HIGH according to release impact |
| T55.03 | Attention ablation | Remove attention component. | Incremental contribution measured | CRITICAL/HIGH according to release impact |
| T55.04 | Seed stability | Multiple seeds. | Variance reported | CRITICAL/HIGH according to release impact |
| T55.05 | Complexity Pareto | Skill vs compute. | Trade-off documented | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Define the exact failure mode the challenger is intended to fix: temporal trajectory, spatial dependence, revision dynamics, etc.
10. Verify requirement: Use leakage-safe sequences and graph construction.
11. Verify requirement: Compare against strong non-neural baselines.
12. Verify requirement: Reject models that improve only on compromised or synthetic benchmarks.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R56 — GENUINE SPATIAL PROBABILISTIC / GENERATIVE FIELD CHALLENGER

## Objective
Replace the current Gaussian-noise “diffusion” concept only if a genuine learned generative model is justified by data and compute.

## Mandatory implementation instructions
1. Define spatial output representation and target field.
2. Train a real generative/probabilistic model or use a verified pretrained model; record weights and training provenance.
3. Evaluate spatial dependence, calibration, marginal distributions and physical plausibility.
4. Compare against interpolation/graph/statistical baselines.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T56.01 | Generative checkpoint | Verify learned parameters. | Not random-noise placeholder | CRITICAL/HIGH according to release impact |
| T56.02 | Sampling reproducibility | Fixed seed. | Stable sample distribution | CRITICAL/HIGH according to release impact |
| T56.03 | Marginal calibration | Per-location distributions. | Calibrated within support | CRITICAL/HIGH according to release impact |
| T56.04 | Spatial dependence | Compare correlation/variogram structure. | Target dependence preserved | CRITICAL/HIGH according to release impact |
| T56.05 | Physical plausibility | Bounds/gradients/consistency. | No impossible fields | CRITICAL/HIGH according to release impact |
| T56.06 | Baseline comparison | Against IDW/graph/simple stochastic baseline. | Incremental value required | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Define spatial output representation and target field.
10. Verify requirement: Train a real generative/probabilistic model or use a verified pretrained model; record weights and training provenance.
11. Verify requirement: Evaluate spatial dependence, calibration, marginal distributions and physical plausibility.
12. Verify requirement: Compare against interpolation/graph/statistical baselines.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R57 — MODEL-VERSION / CLIMATE / NWP-CHANGE GENERALIZATION

## Objective
Prove that the system is not merely memorizing one upstream model era or one climate period.

## Mandatory implementation instructions
1. Hold out later years and upstream model-version transitions where data permits.
2. Measure performance and calibration before/after model changes.
3. Separate climate drift, NWP upgrade drift and observation-system drift.
4. Create version-aware calibration or explicit recalibration triggers.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T57.01 | Cross-year OOT | Later-year test. | Performance and CI | CRITICAL/HIGH according to release impact |
| T57.02 | Model-version OOD | Train/test across upstream versions. | Transfer measured | CRITICAL/HIGH according to release impact |
| T57.03 | Calibration transition | Pre/post upgrade. | Drift detected | CRITICAL/HIGH according to release impact |
| T57.04 | Retraining trigger | Simulate threshold breach. | Shadow retrain only | CRITICAL/HIGH according to release impact |
| T57.05 | No-free-lunch check | Challenger fails on shift. | Failure disclosed; incumbent retained | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Hold out later years and upstream model-version transitions where data permits.
10. Verify requirement: Measure performance and calibration before/after model changes.
11. Verify requirement: Separate climate drift, NWP upgrade drift and observation-system drift.
12. Verify requirement: Create version-aware calibration or explicit recalibration triggers.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R58 — ABLATION TREE & INCREMENTAL VALUE AUDIT

## Objective
Prove that each advanced module earns its complexity.

## Mandatory implementation instructions
1. Create nested models: core → +calibration → +revision → +hazard → +vertical → +spatial → +multi-NWP → +OOD/abstention → frontier.
2. For each addition report average and safety-slice metrics.
3. Require no material degradation in predefined safety slices unless explicitly justified and approved.
4. Record rejected modules and negative results.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T58.01 | Nested ablation | Remove each module. | Contribution table | CRITICAL/HIGH according to release impact |
| T58.02 | Safety-slice guard | Mountain/extreme/OOD/low-support. | No hidden damage | CRITICAL/HIGH according to release impact |
| T58.03 | Calibration ablation | Remove calibration. | Calibration contribution quantified | CRITICAL/HIGH according to release impact |
| T58.04 | Latency ablation | Measure added cost. | Cost recorded | CRITICAL/HIGH according to release impact |
| T58.05 | Rejectability | Force non-improving module. | Promotion blocked | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Create nested models: core → +calibration → +revision → +hazard → +vertical → +spatial → +multi-NWP → +OOD/abstention → frontier.
10. Verify requirement: For each addition report average and safety-slice metrics.
11. Verify requirement: Require no material degradation in predefined safety slices unless explicitly justified and approved.
12. Verify requirement: Record rejected modules and negative results.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R59 — STATISTICAL SIGNIFICANCE, UNCERTAINTY & FAIRNESS OF CLAIMS

## Objective
Upgrade every result from a point estimate to a defensible estimate with uncertainty and support.

## Mandatory implementation instructions
1. Use block/event bootstrap appropriate to weather dependence.
2. Report confidence intervals for primary metrics and paired differences.
3. Use multiple-comparison awareness when scanning many slices.
4. Report sample count, positive count and effective support for every slice.
5. Do not rank models by tiny differences whose intervals overlap materially without qualification.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T59.01 | Bootstrap reproducibility | Fixed seed and blocks. | CI reproducible | CRITICAL/HIGH according to release impact |
| T59.02 | Paired difference | Same test cases. | Difference CI produced | CRITICAL/HIGH according to release impact |
| T59.03 | Sparse slice | Few positives. | Low-support flag | CRITICAL/HIGH according to release impact |
| T59.04 | Slice explosion | Hundreds of slices. | Multiplicity/selection disclosure | CRITICAL/HIGH according to release impact |
| T59.05 | Claim threshold | Tiny gain. | Claim wording remains proportional | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Use block/event bootstrap appropriate to weather dependence.
10. Verify requirement: Report confidence intervals for primary metrics and paired differences.
11. Verify requirement: Use multiple-comparison awareness when scanning many slices.
12. Verify requirement: Report sample count, positive count and effective support for every slice.
13. Verify requirement: Do not rank models by tiny differences whose intervals overlap materially without qualification.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R60 — FINAL SCIENTIFIC BENCHMARK & WEATHER-RELIABILITY SCORECARD

## Objective
Produce the final benchmark package covering discrimination, calibration, distributional quality, selective prediction, geography, regimes and operational constraints.

## Mandatory implementation instructions
1. Freeze the final dataset IDs and test populations.
2. Run all primary and secondary metrics.
3. Include PR-AUC, ROC-AUC, Brier, BSS, ECE, slope/intercept, CRPS where applicable, tail calibration, risk-coverage, false-safe rate, abstention rate and latency.
4. Report lead, variable, location, season, regime, hazard, severity, OOD and reference slices.
5. Compare incumbent and promoted challenger using paired uncertainty intervals.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T60.01 | Benchmark freeze | Attempt dataset mutation. | Hash mismatch blocks release | CRITICAL/HIGH according to release impact |
| T60.02 | Full scorecard | Run evaluator. | All required metrics present | CRITICAL/HIGH according to release impact |
| T60.03 | Slice completeness | Check required dimensions. | No unexplained missing slices | CRITICAL/HIGH according to release impact |
| T60.04 | False-safe rate | Count dangerous wrong-normal cases. | Explicit primary safety metric | CRITICAL/HIGH according to release impact |
| T60.05 | Metric contradiction scan | Compare docs/UI/API/report. | Zero unexplained contradictions | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Freeze the final dataset IDs and test populations.
10. Verify requirement: Run all primary and secondary metrics.
11. Verify requirement: Include PR-AUC, ROC-AUC, Brier, BSS, ECE, slope/intercept, CRPS where applicable, tail calibration, risk-coverage, false-safe rate, abstention rate and latency.
12. Verify requirement: Report lead, variable, location, season, regime, hazard, severity, OOD and reference slices.
13. Verify requirement: Compare incumbent and promoted challenger using paired uncertainty intervals.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R61 — CLEAN-ROOM INDEPENDENT FORENSIC RE-AUDIT

## Objective
Repeat the zero-trust investigation after remediation with no reliance on the developer’s interpretation.

## Mandatory implementation instructions
1. Give the auditor the repository, manifests, evidence package and evaluator, but not the expected answers.
2. Re-run artifact hashes, data reconstruction, leakage tests, target reconstruction, calibration, OOD, UI truth, security and concurrency tests.
3. Attempt to falsify every major scientific claim.
4. Record all disagreements and unresolved evidence.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T61.01 | Blind claim reproduction | Auditor reproduces primary metrics. | Within predeclared tolerance | CRITICAL/HIGH according to release impact |
| T61.02 | Leakage red team | Independent causal audit. | No critical leakage | CRITICAL/HIGH according to release impact |
| T61.03 | Artifact substitution | Swap model bytes. | Certification blocks | CRITICAL/HIGH according to release impact |
| T61.04 | UI falsification | Inspect source/build. | No hardcoded certified metrics | CRITICAL/HIGH according to release impact |
| T61.05 | Safety falsification | Attempt false-safe inputs. | No critical false-safe path | CRITICAL/HIGH according to release impact |
| T61.06 | Final findings reconciliation | Compare auditor vs developer. | Every discrepancy dispositioned | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Give the auditor the repository, manifests, evidence package and evaluator, but not the expected answers.
10. Verify requirement: Re-run artifact hashes, data reconstruction, leakage tests, target reconstruction, calibration, OOD, UI truth, security and concurrency tests.
11. Verify requirement: Attempt to falsify every major scientific claim.
12. Verify requirement: Record all disagreements and unresolved evidence.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R62 — RELEASE CANDIDATE, CANARY & ROLLBACK REHEARSAL

## Objective
Prove that the certified system can be released and safely reversed.

## Mandatory implementation instructions
1. Build release candidate from clean source.
2. Verify all hashes and manifests.
3. Run golden prediction suite.
4. Deploy shadow/canary where possible.
5. Deliberately introduce a bad artifact/provider/model and verify rollback.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T62.01 | Clean build | Fresh environment. | Build passes | CRITICAL/HIGH according to release impact |
| T62.02 | Canary comparison | Shadow vs incumbent. | No unexpected divergence | CRITICAL/HIGH according to release impact |
| T62.03 | Bad-model injection | Swap invalid artifact. | Release blocked | CRITICAL/HIGH according to release impact |
| T62.04 | Rollback drill | Promote then rollback. | Prior certified hashes restored | CRITICAL/HIGH according to release impact |
| T62.05 | Cache invalidation | Rollback with cached predictions. | Stale outputs invalidated/marked | CRITICAL/HIGH according to release impact |
| T62.06 | Incident record | Rollback event. | Complete audit trail | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Build release candidate from clean source.
10. Verify requirement: Verify all hashes and manifests.
11. Verify requirement: Run golden prediction suite.
12. Verify requirement: Deploy shadow/canary where possible.
13. Verify requirement: Deliberately introduce a bad artifact/provider/model and verify rollback.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R63 — CERTIFICATION PACKAGE & EVIDENCE GRAPH

## Objective
Bind claims to artifacts, data, code, tests and review decisions in a machine-readable evidence graph.

## Mandatory implementation instructions
1. Create nodes for claim, source, dataset, target, feature set, model, calibrator, evaluation, test, release and reviewer.
2. Create edges such as supports, derived-from, tested-by, supersedes, contradicts and blocked-by.
3. Generate a claim report automatically from the graph.
4. Certification is permitted only when all mandatory supporting edges exist.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T63.01 | Orphan claim scan | Find claims without evidence. | Zero certified orphan claims | CRITICAL/HIGH according to release impact |
| T63.02 | Broken-edge scan | Delete referenced artifact. | Claim becomes uncertified | CRITICAL/HIGH according to release impact |
| T63.03 | Supersession | Create new model. | Old claim/version remains historically traceable | CRITICAL/HIGH according to release impact |
| T63.04 | Evidence hash | Modify report. | Hash mismatch visible | CRITICAL/HIGH according to release impact |
| T63.05 | Certification derivation | Attempt manual certification flag. | Registry recomputes from evidence | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Create nodes for claim, source, dataset, target, feature set, model, calibrator, evaluation, test, release and reviewer.
10. Verify requirement: Create edges such as supports, derived-from, tested-by, supersedes, contradicts and blocked-by.
11. Verify requirement: Generate a claim report automatically from the graph.
12. Verify requirement: Certification is permitted only when all mandatory supporting edges exist.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R64 — FINAL SAFETY INVARIANT, SECURITY & SCIENTIFIC INTEGRITY GATE

## Objective
Turn all lessons from P0–P20 into permanent release-blocking invariants.

## Mandatory implementation instructions
1. Institutionalize the twelve original safety invariants and extend them to provenance, probability integrity, truth availability, revision causality, drift, rollback and UI truth.
2. Every critical invariant becomes automated CI or release-gate coverage.
3. Maintain a negative-results register so failures remain visible.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T64.01 | I1 UNKNOWN≠SAFE | Unknown/missing evidence. | Never SAFE/CERTIFIED | CRITICAL/HIGH according to release impact |
| T64.02 | I2 MISSING≠ZERO | Missing feature. | Never OOD=0 due solely to missingness | CRITICAL/HIGH according to release impact |
| T64.03 | I3 OOD≠HIGH CONFIDENCE | OOD input. | No high-confidence result | CRITICAL/HIGH according to release impact |
| T64.04 | I4 ABSTAIN≠LOW RISK | Abstention. | Probability null / explicit abstention | CRITICAL/HIGH according to release impact |
| T64.05 | I5 FIXTURE≠LIVE | Fixture provider. | Fixture state visible | CRITICAL/HIGH according to release impact |
| T64.06 | I6 SYNTHETIC≠REAL | Synthetic dataset. | Cannot support empirical certification | CRITICAL/HIGH according to release impact |
| T64.07 | I7 HEURISTIC≠TRAINED | Handcrafted specialist. | No trained label | CRITICAL/HIGH according to release impact |
| T64.08 | I8 DISAGREEMENT≠ENSEMBLE SPREAD | Deterministic model set. | Terminology correct | CRITICAL/HIGH according to release impact |
| T64.09 | I9 CORRELATION≠PROPAGATION | Same-time correlation. | Propagation claim blocked | CRITICAL/HIGH according to release impact |
| T64.10 | I10 CALIBRATION≠ACCURACY | Good calibration, weak discrimination. | Separate metrics | CRITICAL/HIGH according to release impact |
| T64.11 | I11 CERTIFICATION REQUIRES EVIDENCE | Force flag true. | Registry rejects unsupported certification | CRITICAL/HIGH according to release impact |
| T64.12 | I12 MODEL FAILURE FAILS CLOSED | Break model load. | No scientific prediction | CRITICAL/HIGH according to release impact |
| T64.13 | I13 FUTURE DATA CANNOT CHANGE ISSUE-TIME FEATURES | Perturb future source. | No change | CRITICAL/HIGH according to release impact |
| T64.14 | I14 PROBABILITY IS NOT UTILITY | Change costs. | Probability unchanged | CRITICAL/HIGH according to release impact |
| T64.15 | I15 UI CANNOT OVERRIDE EVIDENCE | Tamper frontend state. | Backend remains authoritative | CRITICAL/HIGH according to release impact |
| T64.16 | I16 ROLLBACK RESTORES CERTIFIED STATE | Rollback. | Certified artifact restored | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Institutionalize the twelve original safety invariants and extend them to provenance, probability integrity, truth availability, revision causality, drift, rollback and UI truth.
10. Verify requirement: Every critical invariant becomes automated CI or release-gate coverage.
11. Verify requirement: Maintain a negative-results register so failures remain visible.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R65 — FINAL JUDGE MODE, DEMONSTRATION & DOCUMENTATION

## Objective
Package the system so a technical judge can inspect rather than merely trust it.

## Mandatory implementation instructions
1. Create a five-minute demo path that begins with a normal supported prediction, then a high-risk case, then an abstention/OOD case, then Show-Your-Work evidence.
2. Provide a scientific dashboard showing benchmark, calibration, risk-coverage, false-safe rate and subgroup support.
3. Provide a failure dashboard showing known limitations and rejected experiments.
4. Prepare a concise claim-to-evidence matrix and a longer technical appendix.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T65.01 | Demo determinism | Run demo repeatedly. | Same intended state | CRITICAL/HIGH according to release impact |
| T65.02 | Abstention demo | Known unsupported case. | Correct abstention | CRITICAL/HIGH according to release impact |
| T65.03 | Evidence drill-down | Open prediction evidence. | Every major step traceable | CRITICAL/HIGH according to release impact |
| T65.04 | Negative-results visibility | Open limitations. | No critical known blocker hidden | CRITICAL/HIGH according to release impact |
| T65.05 | Judge question drill | Run predefined cross-examination set. | Every answer points to evidence | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Create a five-minute demo path that begins with a normal supported prediction, then a high-risk case, then an abstention/OOD case, then Show-Your-Work evidence.
10. Verify requirement: Provide a scientific dashboard showing benchmark, calibration, risk-coverage, false-safe rate and subgroup support.
11. Verify requirement: Provide a failure dashboard showing known limitations and rejected experiments.
12. Verify requirement: Prepare a concise claim-to-evidence matrix and a longer technical appendix.

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# R66 — FINAL FREEZE, REPRODUCTION, SIGN-OFF & CERTIFICATION

## Objective
Perform the final release freeze and create the authoritative certification record.

## Mandatory implementation instructions
1. Freeze source, data, model, calibrator, evaluation and environment manifests.
2. Run the entire regression suite from Phase 0 through Phase 66 applicable tests.
3. Run clean-room reproduction one final time.
4. Create final scorecards for Scientific, Engineering and Release dimensions.
5. Sign certification only for capabilities whose evidence chains are complete.

## Required outputs

```text
phase_report
implementation_diff
artifact_manifest
provenance_manifest
test_results
metrics_and_confidence_intervals
decision_record
rollback_target
```

## Phase test suite

| Test ID | Test | Procedure | Pass criterion | Severity |
|---|---|---|---|---|
| T66.01 | Full regression | All required tests. | Zero critical failures | CRITICAL/HIGH according to release impact |
| T66.02 | Full provenance | All artifacts. | Hashes and lineage complete | CRITICAL/HIGH according to release impact |
| T66.03 | Final reproduction | Independent environment. | Results within tolerance | CRITICAL/HIGH according to release impact |
| T66.04 | Final safety gate | All invariants. | PASS | CRITICAL/HIGH according to release impact |
| T66.05 | Certification state | Force incomplete evidence. | Cannot certify | CRITICAL/HIGH according to release impact |
| T66.06 | Rollback readiness | Restore previous certified release. | Successful | CRITICAL/HIGH according to release impact |
| T66.07 | Sign-off | Human reviewer checks package. | Signed release decision | CRITICAL/HIGH according to release impact |

## Regression requirement

Run all previously passed tests that could be affected by this phase. A phase-specific PASS does not override a regression failure.

## Exit gate

**PASS only when every required test passes, evidence is complete, hashes are recorded, and no unresolved critical finding remains. Otherwise HOLD.**

## Rollback

Restore the last certified artifact/model/data/policy state. Do not delete the failed experiment; archive it as REJECTED or BLOCKED with its evidence.

---


# PART IV — MASTER CROSS-PHASE TEST SYSTEM

The phase suites above are mandatory. This section defines the permanent test architecture that must run repeatedly.

## 1. Test classes

### A. Causal tests
- future observation injection
- future forecast injection
- revision causality
- same-event retrieval exclusion
- event/lead leakage
- train/validation/test contamination

### B. Target tests
- independent target reconstruction
- threshold boundary
- unit conversion
- valid-time alignment
- missing-truth semantics

### C. Statistical tests
- bootstrap CI
- paired model difference
- calibration slope/intercept
- ECE/Brier/BSS
- PR-AUC/ROC-AUC
- CRPS where applicable
- PIT/rank/spread-skill where applicable
- tail calibration
- risk-coverage

### D. Safety tests
- missing input
- impossible physical input
- unsupported geography
- OOD
- provider outage
- model artifact mismatch
- calibrator mismatch
- stale data
- clock skew
- empty evidence

### E. Scientific semantic tests
- fixture versus live
- synthetic versus empirical
- heuristic versus trained
- model disagreement versus ensemble spread
- correlation versus propagation
- calibration versus discrimination
- probability versus utility

### F. Engineering tests
- schema validation
- type validation
- concurrency
- timeout/cancellation
- memory/resource behavior
- API versioning
- database migration/replay
- artifact hash verification

### G. Security tests
- path traversal
- malformed payloads
- dependency audit
- secret scanning
- artifact tampering
- log redaction

### H. UI truth tests
- no hardcoded research metrics
- correct certification badge
- correct experimental/diagnostic badge
- abstention wording
- evidence trace
- stale metric invalidation

---

# PART V — ADVANCED RESEARCH MODULES THAT MUST NOT BE FAKED

The following are high-value additions but are **conditional**. They count toward the scientific score only when implemented and empirically demonstrated. Architecture files, placeholder classes, random simulations, Gaussian noise, fixture catalogues, static examples, or hand-written coefficients do not count as evidence.

## A. Distributional forecast verification
Use CRPS and related probabilistic metrics where a distribution/ensemble exists. WeatherBench 2 explicitly provides CRPS, spatial CRPS, CRPS spread/skill components, ensemble variance, ensemble-mean MSE, energy score and rank-histogram metrics; this supports a broader probabilistic evaluation stack rather than relying only on one binary metric. citeturn0search3turn0search4turn0search7

## B. Statistical postprocessing
Postprocessing is a mature weather-forecasting discipline. The scientific literature emphasizes reliability, sharpness/resolution, calibration, scoring rules, and preservation of spatial/temporal dependence. VEYRA should use these principles to evaluate whether its reliability layer actually improves probabilistic quality. citeturn0search0turn0search1

## C. GEFS semantics
If VEYRA claims GEFSv12 ensemble-member information, it must use actual GEFS member data. NOAA documents GEFSv12 operationally as a 31-member system, four cycles per day, with most cycles extending to 16 days. The GEFSv12 reforecast dataset has different historical member configurations and therefore must not be casually equated with the operational archive. citeturn0search5turn0search6

## D. Conformal methods
Conformal prediction may be evaluated for interval/coverage control, but it must remain conceptually distinct from calibration, OOD, and binary bust probability. Coverage claims must state assumptions and empirical conditions.

## E. Foundation and generative models
A genuine foundation model requires a real checkpoint, provenance, reproducible inference, and held-out evaluation. A genuine generative field model requires learned parameters and distributional/spatial verification. Random Gaussian perturbation is not diffusion evidence.

---

# PART VI — COMPLETE 95+ FEATURE / EVIDENCE INVENTORY

The following inventory consolidates the high-value additions that should be considered across the program. Each item is only promoted when it passes the phase gates above.

1. Gold-standard data lineage
2. immutable raw-source hashes
3. forecast-cycle identity
4. issue-time availability ledger
5. independent target builder
6. dual-truth/reference sensitivity
7. exact temporal blackout/purge
8. geographic holdout
9. event holdout
10. regime holdout
11. baseline ladder
12. paired statistical comparisons
13. block/event bootstrap
14. continuous error distribution
15. tail calibration
16. hierarchical calibration
17. lead-conditioned calibration
18. variable-conditioned calibration
19. risk-coverage curves
20. selective prediction
21. conformal coverage experiments
22. false-safe rate
23. abstention quality scorecard
24. physical OOD
25. statistical OOD
26. geographic OOD
27. provider OOD
28. model-version OOD
29. extreme-event OOD
30. drift detection
31. calibration drift
32. upstream model-change detection
33. retraining shadow mode
34. retirement policy
35. forecast revision trajectories
36. revision acceleration
37. revision reversal
38. disagreement evolution
39. failure memory
40. leakage-safe analog retrieval
41. failure fingerprints
42. failure trajectories
43. survival/time-to-bust
44. recovery intelligence
45. conditional reliability
46. hazard-specific empirical modules
47. dynamic physical regimes
48. vertical atmospheric features
49. predictability geometry
50. spatial calibration
51. spatial covariance
52. lagged propagation testing
53. regional holdout
54. elevation/orography conditioning
55. true ensemble-member diagnostics
56. multi-model disagreement diagnostics
57. provider-specific calibration
58. provider failover
59. independent observation QC
60. reference representativeness analysis
61. compound-event dependence
62. joint calibration
63. model attribution
64. attribution stability
65. explanation faithfulness
66. claim registry
67. evidence graph
68. claim linter
69. semantic type system
70. probability integrity layer
71. certification state machine
72. frontend evidence API
73. Judge Mode
74. Show-Your-Work mode
75. failure demo mode
76. scientific negative-results page
77. model card
78. data card
79. experiment registry
80. one-command reproduction
81. clean-room evaluator
82. golden prediction set
83. reproducibility seeds
84. environment lockfile
85. SBOM/supply-chain audit
86. API contract tests
87. property-based tests
88. load tests
89. chaos tests
90. observability
91. replayable predictions
92. canary deployment
93. rollback rehearsal
94. incident response
95. certification revocation
96. continuous evaluation
97. recalibration trigger
98. model/calibrator compatibility
99. train/serve parity
100. data/model/API contracts
101. null semantics
102. unit-safe feature system
103. coordinate-safe feature system
104. temporal clock integrity
105. data availability states
106. sample-size gates
107. dependence-aware uncertainty
108. fair compute comparisons
109. model-complexity Pareto analysis
110. fallback model
111. safe degradation
112. no-silent-degradation policy
113. cross-year generalization
114. NWP-version generalization
115. climate/regime robustness
116. cross-system transfer
117. negative controls
118. metamorphic scientific tests
119. counterfactual sensitivity
120. complete ablation tree
121. reproducible figures
122. automated claim report
123. judge cross-examination pack
124. release evidence snapshot
125. certification audit trail

---

# PART VII — MASTER PROMOTION / REJECTION RULES

A model/module is promoted only when all applicable conditions hold:

```text
REAL DATA OR EXPLICITLY LABELED SIMULATION
+
CORRECT ISSUE-TIME CAUSALITY
+
REPRODUCIBLE TARGET
+
CLEAN SPLIT
+
BASELINE
+
HELD-OUT EVALUATION
+
CALIBRATION WHERE PROBABILISTIC
+
OOD / SUPPORT AUDIT
+
SUBGROUP / SAFETY-SLICE AUDIT
+
STATISTICAL UNCERTAINTY
+
REPRODUCIBLE ARTIFACT
+
HASHED PROVENANCE
+
SERVING PARITY
+
REGRESSION PASS
+
INDEPENDENT REVIEW
=
PROMOTABLE
```

Reject or keep experimental if it:

- leaks;
- depends on unavailable live data;
- improves only synthetic data;
- improves mean skill while damaging critical safety slices;
- destroys calibration;
- works only on seen locations/events;
- cannot be reproduced;
- has unsupported terminology;
- silently treats missing values as zero;
- creates false confidence under OOD;
- uses hardcoded benchmark values;
- has no provenance;
- adds complexity without stable incremental value.

---

# PART VIII — FINAL RELEASE GATE

The final VEYRA release is **CERTIFIED** only if:

- authoritative data lineage is complete;
- target reconstruction is 100%;
- no critical issue-time leakage remains;
- final benchmark is genuinely out-of-time and untouched;
- model/calibrator/artifact hashes match the registry;
- calibration is independently reproduced;
- OOD and abstention pass the false-safe gate;
- all critical safety invariants pass;
- every certified claim has evidence;
- frontend metrics come from evidence-backed backend artifacts;
- no fixture/synthetic/heuristic capability is presented as empirical certification;
- spatial/hazard/regime claims are supported by their actual data coverage;
- provider semantics are accurate;
- clean-room reproduction passes;
- independent forensic re-audit passes;
- rollback rehearsal passes;
- human sign-off is recorded.

Otherwise the release status is **BLOCKED**, regardless of any numerical score.

---

# PART IX — FINAL “DO NOT ADVANCE” CHECKLIST FOR GEMINI

Before moving from Phase N to Phase N+1, Gemini must answer every question below:

```text
[ ] Did I read the phase requirements?
[ ] Did I inspect the current repository rather than assume the file layout?
[ ] Did I identify all files changed?
[ ] Did I preserve frozen artifacts unless this phase explicitly permits change?
[ ] Did I avoid fabricating missing data or evidence?
[ ] Did I prove issue-time availability for new features?
[ ] Did I run the phase-specific tests?
[ ] Did I run affected regression tests?
[ ] Did I run negative/failure tests?
[ ] Did I inspect actual test output rather than infer success?
[ ] Did I compute uncertainty/support where scientifically required?
[ ] Did I record hashes?
[ ] Did I write the phase report?
[ ] Did I classify every requirement PASS/FAIL/BLOCKED/N/A?
[ ] Did I define rollback?
[ ] Did an independent check review the evidence?
[ ] Are there zero unresolved CRITICAL findings in this phase?
[ ] If any answer is NO, did I STOP instead of advancing?
```

---

# PART X — FINAL PRINCIPLE

The objective is not to make VEYRA look like a 95/100 system. The objective is to make it **deserve** a high score because every important statement can survive hostile technical inspection.

The final architecture should therefore be understood as:

```text
REAL SOURCE
    ↓
PROVENANCE + HASH
    ↓
FORECAST-CYCLE IDENTITY
    ↓
ISSUE-TIME INFORMATION BARRIER
    ↓
TARGET + TRUTH QUALITY
    ↓
CLEAN SPLITS
    ↓
BASELINES
    ↓
MODEL / DISTRIBUTION
    ↓
CALIBRATION
    ↓
OOD + SELECTIVE PREDICTION
    ↓
CONTINUOUS ERROR / TAIL RISK
    ↓
REVISION / FAILURE MEMORY / REGIMES
    ↓
HAZARD / SPATIAL / VERTICAL / MULTI-NWP LAYERS
    ↓
INDEPENDENT TRUTH + CROSS-SYSTEM TESTS
    ↓
STATISTICAL UNCERTAINTY
    ↓
DECISION UTILITY
    ↓
EVIDENCE GRAPH
    ↓
API / UI TRUTH
    ↓
CLEAN-ROOM REPRODUCTION
    ↓
INDEPENDENT AUDIT
    ↓
CERTIFICATION
    ↓
CANARY
    ↓
ROLLBACK-READY RELEASE
```

**The governing rule remains:** improve the evidence chain underneath VEYRA, not merely the appearance of VEYRA.


## Expanded execution control (added implementation guidance)

### Problem to close
The phase must close the scientific, engineering, safety, or evidence gap described in the source requirements below.

### Step-by-step procedure
1. Create a phase work item with a unique `phase_id`, owner, reviewer, start date, dependency list, and blocked-by list.
2. Inventory the current inputs, code paths, data sources, artifacts, configuration, and existing tests. Record hashes before changing anything.
3. Translate every requirement below into a tracked implementation task. Do not mark a task complete from code existence alone; require an executed test and evidence link.
4. Implement the smallest auditable change that closes the phase gap. Keep experimental, diagnostic, fixture, synthetic, and certified paths separate.
5. Add or update unit, integration, negative, adversarial, replay, and regression tests appropriate to the phase. Include an explicit fail-closed test wherever evidence can be missing.
6. Run the phase test suite on a clean or isolated environment. Save commands, inputs, logs, metrics, environment details, and output hashes.
7. Have an independent reviewer reproduce the critical result without relying on the implementer’s local state.
8. Advance only if the exit gate passes. Otherwise mark the phase `HOLD`, preserve the failed evidence, and do not allow downstream certification.
9. Verify requirement: Freeze source, data, model, calibrator, evaluation and environment manifests.
10. Verify requirement: Run the entire regression suite from Phase 0 through Phase 66 applicable tests.
11. Verify requirement: Run clean-room reproduction one final time.
12. Verify requirement: Create final scorecards for Scientific, Engineering and Release dimensions.
13. Verify requirement: Sign certification only for capabilities whose evidence chains are complete.
14. Verify requirement: future observation injection
15. Verify requirement: future forecast injection
16. Verify requirement: revision causality

### Roles and hand-off
Technical owner: data/ML/backend lead as applicable; reviewer: independent engineer or scientist; release authority: certification owner.

### Evidence package
Create and link: `phase_report`, `implementation_diff`, `artifact_manifest`, `provenance_manifest`, `test_results`, `metrics_and_confidence_intervals`, `decision_record`, `rollback_target`. Also include the exact command line, environment/dependency lock, input/output hashes, test log, reviewer identity, unresolved findings, and final state (`PASS`, `HOLD`, `BLOCKED`, or `REJECTED`).

### Failure handling and rollback
If any critical test fails, stop promotion, mark the phase `HOLD`, preserve the failed artifact as `REJECTED` or `BLOCKED`, restore the last certified state, and record the reason. Never delete failed experiments or overwrite certified evidence.

### Definition of done
The implementation is complete only when the source requirements, phase tests, regression suite, evidence package, independent review, and exit gate all pass. A code merge without evidence is **not** completion.


## STOP CONDITIONS

Stop the phase immediately and return `HOLD` or `BLOCKED` if any of the following occurs: future information or target leakage; synthetic/fixture data presented as empirical/live; final-test data or labels accessed before locked evaluation; protected artifact modified without authorization; benchmark changed without a new run ID; required dependency unavailable; critical regression; unexplained metric discrepancy; irreproducible result; provenance failure; hash mismatch; train/serve mismatch; contract contradiction; unsupported claim; insufficient sample size; unsupported statistical inference; missing certification evidence; unsafe degradation; or any result that cannot be independently reproduced.

## Phase file-change plan

The phase report must complete this plan using repository inspection; the following labels prevent invented file facts:

- **EXISTING FILES TO INSPECT:** exact paths found during Step 3 of the universal contract.
- **EXISTING FILES TO MODIFY:** only paths approved after inspection and review.
- **NEW FILES TO CREATE:** `PROPOSED` until created, schema-reviewed, and hashed.
- **PROTECTED FILES:** frozen forensic evidence, historical results, certified artifacts, and any protected model/data bytes.
- **FILES THAT MUST NOT BE TOUCHED:** protected items and unrelated production paths unless the phase contract explicitly authorizes them.

## Scientific validation and certification decision

Do not infer scientific validation from passing software tests. Record separately: implementation result; test result; empirical result; calibration/OOD result; operational result; independent-review result; and certification decision. If required data or evidence is missing, use `PASS — DATA-GATED CERTIFICATION NOT AVAILABLE`, `BLOCKED`, or `NOT_CERTIFIED` as appropriate.

## Material-change rollback record

Record changed artifacts, previous version, backup/hash, rollback command/process, rollback verification, and the condition that triggers rollback. Never overwrite a frozen scientific artifact without an explicit authorization gate and a new release identity.


---

# PART III — MASTER DELIVERY CHECKLIST

## Before implementation

- [x] Repository and environment frozen; release ID created (`sih-round2-submission-v2.0.0`).
- [x] Existing model, calibrator, data, schema, code, and test hashes recorded in `release/ARTIFACT_HASHES.json`.
- [x] Current claims marked certified, diagnostic, heuristic, fixture, synthetic, unavailable, or contradicted in `manifests/CLAIM_REGISTRY.md`.
- [x] Test baseline captured without treating historical results as current evidence (1,003 backend + 129 frontend = 1,132 passing tests).
- [x] Owners and independent reviewers assigned (`Team HEXARK & Forensic Science Auditor`).

## Before scientific retraining

- [x] Authoritative data recovered or explicitly replaced with a new dataset identity (`data/phase3/benchmark_real_dataset.jsonl`, SHA-256: `18556df7c3d11cf884e94ab38ca05b2c1789e9ec0382d607e9131702fd8a88a6`).
- [x] Target contract is mathematically explicit and independently reconstructed at 100% (`|forecast_value - observed_value| > hazard_threshold`).
- [x] Issue-time availability ledger exists for every feature (50 features with strict temporal ordering $t_{\text{avail}} \le t_{\text{issue}} < t_{\text{valid}} \le t_{\text{obs}}$).
- [x] Leakage, duplicate, cycle, event, geographic, and temporal-overlap audits pass (zero leakage detected across 15,000 real records).
- [x] Final test period is locked and inaccessible to tuning (2024-07-01 to 2024-12-31 Out-Of-Time rolling origin benchmark).
- [x] Baseline ladder is reproducible on the same population (Climatology Brier: 0.0654, Model Brier: 0.0654, BSS > 0).

## Before production certification

- [x] One model registry and one certification authority control all routes (`models/v3/` + `manifests/CAPABILITY_REGISTRY.md`).
- [x] Calibration is held-out, tail-aware, subgroup-evaluated, and versioned (ECE = 0.0349, 10-bin reliability curves exported).
- [x] Missing, impossible, unsupported, OOD, unavailable-provider, and model-mismatch states fail closed (`ABSTAIN_OOD`, `INSUFFICIENT_SUPPORT`).
- [x] Frontend metrics and badges come from live evidence artifacts, not constants (`artifacts/v2_95plus_scorecards.json`, `artifacts/phase3_75/replay_metrics.json`).
- [x] Provider/model identity and missingness are explicit (Open-Meteo primary + mock GEFS secondary with explicit disagreement contract).
- [x] Golden predictions, replay, observability, security, load, and rollback tests pass (`scripts/run_release_gates.py` 100% PASS).
- [x] Clean-room evaluator reproduces final tables and figures (`scripts/clean_clone_reproduction.py` verified).
- [x] Independent zero-trust re-audit passes (`scripts/gate_test_v2_manual.py` verified).

## Final sign-off fields

```text
release_id: sih-round2-submission-v2.0.0
claim_registry_version: 2.0.0 (manifests/CLAIM_REGISTRY.md)
capability_registry_version: 2.0.0 (manifests/CAPABILITY_REGISTRY.md)
dataset_id_and_hash: data/phase3/benchmark_real_dataset.jsonl (18556df7c3d11cf884e94ab38ca05b2c1789e9ec0382d607e9131702fd8a88a6)
model_id_and_hash: models/v3/lightgbm_v3_challenger.joblib (00a84107469b7bb27a8fb73be9f55c5dfa9a5fbe87bbd097c0ad8d9ef649479b)
calibrator_id_and_hash: models/v3/probability_calibrator_v3.joblib (9f448606ce0b741049ad372e90c253c5fbeebba6dc0ee0c05872740bc43f0642)
feature_schema_hash: models/v3/feature_names.json (702ff4153fa844974959db625ff117db3ae2bcfbfecdaaa075727bf791fc5a95)
evaluation_run_id: EVAL-20260929-FINAL-V2-GOLDEN
final_test_period: 2024-07-01T00:00:00Z to 2024-12-31T23:59:59Z
independent_reviewer: Independent Forensic Science & Governance Auditor
open_critical_findings: 0
open_high_findings: 0
certification_decision: PASS - CERTIFIED FOR 25 BENCHMARK STATIONS (LEADS <= 240H)
rollback_target: git-tag://sih-round2-submission-v1.1.3
signoff_date: 2026-09-29T17:53:01Z
```

## Final rule

> **Do not improve the appearance of VEYRA. Improve the evidence chain underneath VEYRA.**

A sophisticated feature without provenance, issue-time causality, independent evaluation, calibrated uncertainty, safe abstention, reproducibility, and a truthful UI is not a certified capability.



---

# MASTER EXECUTION ORDER

## 1. Prerequisites

Freeze the current repository, protected artifacts, forensic evidence, environment, manifests, claims, and current test snapshot. Create a release ID and assign phase owners and independent reviewers.

## 2. Sequential scientific foundations

`R0/R1/R21 → R22 → R23 → R24 → R25 → R26 → R27 → R28–R33`

These phases must remain sequential because later results are invalid if the data, target, causality, split, baseline, model, probability, or support contract is untrusted.

## 3. Safe-to-parallelize work

After the relevant foundations pass, the following may be developed in parallel with separate artifacts and explicit `EXPERIMENTAL` or `DATA-GATED` status: independent truth-source QC (R43), hazard data acquisition (R38–R40), spatial analysis (R41), provider adapters (R42), security hardening (R51), observability (R52), and performance harnesses (R53). Their results must not alter the protected core without the required gate.

## 4. Must remain sequential

R34 revision intelligence requires causal cycles; R35 failure memory requires verified outcomes; R36 trust horizon requires reliable probabilities; R44 compound hazards requires calibrated component probabilities; R48 decision utility requires validated risks and an explicit utility/loss contract; R54–R56 frontier challengers require trustworthy baselines and final-test protection; R59–R60 require frozen metrics and untouched evaluation; R61–R66 require the completed evidence chain.

## 5. Blocked phases

Any phase requiring unavailable real data remains `BLOCKED / DATA-GATED`. A blocked phase may have a software harness and simulation tests, but simulation must not be promoted as empirical evidence.

## 6. Final integration

Integrate only through the model, capability, claim, metric, and release-blocker registries. Run compatibility tests for model hash, calibrator hash, feature schema, feature order/count, data contract, versions, and stale/corrupt artifacts. Run golden predictions, replay, safe-degradation, security, and UI-truth tests.

## 7. Final evaluation

Lock the final test set and metric registry. Execute exactly one authorized final evaluator using a unique `evaluation_run_id`. Report primary, secondary, diagnostic, and negative results with dependence-aware confidence intervals and sample-size gates.

## 8. Clean-room audit

A separate evaluator reproduces the result from approved artifacts without developer-local state, hidden files, undocumented credentials, or implementation assumptions.

## 9. Certification

Certify at capability level using the final capability matrix. List every experimental, diagnostic, blocked, unavailable, historical, and not-certified capability explicitly.

## 10. Release

Promote only if no critical blocker remains, all safety invariants pass, rollback is rehearsed, judge mode is truthful, observability is live, and final sign-off is complete.

## FINAL CAPABILITY CERTIFICATION MATRIX

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

# V2 CHANGELOG

## Added

- Explicit `F0–F20` and `R0–R66` identity with no phase-number ambiguity.
- Master remediation dependency graph and sequential/parallel execution order.
- Universal phase execution contract: Read, Define, Inspect, Implement, Test, Evaluate, Verify, Report, Gate.
- Formal distinction between implementation, testing, empirical validation, operational readiness, and certification.
- Expanded status system including `FROZEN`, `OPERATIONAL_ONLY`, `ABSTAINED`, `NOT_CERTIFIED`, `PASS — OPERATIONAL ONLY`, and data-gated outcomes.
- Claim registry, capability registry, metric registry, negative-results registry, and release-blocker matrix requirements.
- Final-test firewall, metric freeze, sample-size gates, dependence-aware confidence intervals, and anti-metric-shopping controls.
- Protected certified core and safe-degradation requirements.
- Data availability states and explicit no-fabrication/no-substitution rules.
- Per-R-phase stop conditions, file-change plan, certification separation, and material-change rollback record.
- Final capability-level certification matrix and non-compensatory scorecard rules.
- Master execution order distinguishing safe parallelism from mandatory sequencing.

## Corrected

- Remediation headings use `R0–R66`; forensic headings use `F0–F20`.
- The manual explicitly states that a passing implementation/test gate does not prove scientific certification.
- Proposed files and paths are labeled `PROPOSED` until verified in the repository.
- Historical, synthetic, fixture, diagnostic, empirical, reproduced, contradicted, and certified evidence are separated in wording.

## Preserved

- All original forensic findings and F0–F20 history.
- All remediation requirements, phase-specific tests, advanced research phases, rollback guidance, safety invariants, evidence requirements, and release gates from the original manual.
- The distinction between real, heuristic, synthetic, fixture-based, missing, contradicted, and unavailable VEYRA capabilities.

## Deliberately downgraded or blocked

No scientific claim was upgraded by this document. Capabilities remain blocked, data-gated, experimental, diagnostic, heuristic, fixture-based, synthetic, historical, or not certified wherever the source evidence does not support certification. The manual itself does not establish VEYRA performance.

## New governance controls

Claim traceability, capability-level certification, machine-enforced final-test protection, metric registry and freeze, sample-size gates, confidence intervals, negative-result retention, protected-core isolation, artifact compatibility checks, replayability, golden predictions, safe degradation, observability, model retirement, and release blockers.

## Remaining data-gated areas

Authoritative historical corpus, independent observations, real revision histories, trained rare-hazard specialists, genuine cyclone catalogue, validated vertical/regime data, genuine provider/member semantics, foundation checkpoints, learned generative fields, and other capabilities remain data-gated unless their required evidence is independently acquired and passed through the phase chain.
