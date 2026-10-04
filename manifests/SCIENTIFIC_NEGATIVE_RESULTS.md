# VEYRA SENTINEL — Scientific Negative Results Register (V2 Governance)

**Document Type:** Formal Scientific Negative Results & Falsified Hypotheses Archive  
**Governance Standard:** `VEYRA_COMPLETE_PHASE_BY_PHASE_EXECUTION_MANUAL_V2.md` (§ line 183)  
**Core Principle:** *Failed experiments are empirical evidence and must never be hidden, deleted, or re-run until a passing random seed is found.*  

---

## 1. Governance Protocol for Negative Results

In strict adherence to empirical integrity, any hypothesis, model architecture, feature representation, or algorithmic strategy that fails its predefined performance gate, causes information leakage, or fails calibration verification is permanently recorded in this register.

---

## 2. Documented Negative Results & Falsified Hypotheses

### `NEG-001`: Direct Uncalibrated LightGBM Raw Margins on Tail Weather Brier Score
- **Experiment ID:** `EXP-RAW-LGBM-001`
- **Phase:** F4, R4, R28
- **Hypothesis:** Raw margins directly from LightGBM booster objective `binary:logistic` are sufficiently calibrated for operational medium-range weather risk decisions without post-hoc transformation.
- **Method:** Evaluated raw LightGBM probabilities $\hat{p} \in [0, 1]$ directly against ground-truth IMD verification rows.
- **Dataset:** 15,000 real Indian station verification rows (2024-H2).
- **Observed Result:** Expected Calibration Error (ECE) was **0.0894** (8.94%), with significant overconfidence in the tails ($p > 0.40$ had empirical frequency $< 0.22$). Brier Skill Score was negative ($\text{BSS} = -0.0142$).
- **95% Confidence Interval:** ECE 95% CI [0.0782, 0.1012].
- **Rejection Reason:** Fails global calibration gate (ECE must be $< 0.0500$) and fails baseline skill gate ($\text{BSS} > 0$).
- **Operational Impact:** Raw LightGBM predictions are strictly prohibited in production. An immutable isotonic calibrator (`models/v3/probability_calibrator_v3.joblib`) is mandatory in the inference graph.
- **Reevaluation Permitted:** NO for raw model; YES only if a fundamentally different loss function (e.g., focal loss or calibrated objective) is introduced with new release ID.

---

### `NEG-002`: Naive Random K-Fold Cross-Validation on Spatiotemporal Atmospheric Records
- **Experiment ID:** `EXP-SPLIT-LEAKAGE-002`
- **Phase:** F3, R3, R25
- **Hypothesis:** Standard 5-fold shuffled cross-validation provides an unbiased estimate of future forecast bust detection skill.
- **Method:** Shuffled 116,000 atmospheric forecast-observation pairs randomly and performed 5-fold CV.
- **Dataset:** 116k multi-station meteorological archive (2023–2024).
- **Observed Result:** Apparent cross-validation ROC-AUC was **0.8841** and Brier Score was **0.0382**. However, when evaluated on a held-out temporal block (2024-H2), ROC-AUC plummeted to **0.6913** and Brier Score rose to **0.0654**.
- **Root Cause Analysis:** Random shuffling placed forecast cycles from the same synoptic event ($t$ and $t+6\text{h}$) into both training and validation folds, causing catastrophic future-information and spatial autocorrelation leakage.
- **Rejection Reason:** Severe spatiotemporal data leakage violating physical causality.
- **Operational Impact:** Random shuffling is permanently blocked across all training and evaluation pipelines. Only Out-Of-Time (OOT) rolling-origin splits with a mandatory 48-hour buffer are permitted.
- **Reevaluation Permitted:** NO. Random splitting of time-series weather data is scientifically fraudulent.

---

### `NEG-003`: Hardcoded Zeroed Revision Features in Production Serving Pipeline
- **Experiment ID:** `EXP-REV-ZERO-003`
- **Phase:** F1, F5, R1, R24
- **Hypothesis:** Model trained with revision features ($h-6$ vs $h$ forecast drift) will gracefully degrade if revision inputs are hardcoded to zero during live serving when previous cycles are absent.
- **Method:** Replaced dynamic cycle lookups with static `0.0` for features 18–21 (`lead_drift`, `pressure_jump`, `temperature_tendency`, `spread_acceleration`).
- **Dataset:** 15,000 real verification rows with live model inference.
- **Observed Result:** Distribution shift caused model probability outputs to compress into an uncalibrated narrow band ($0.04 \le p \le 0.08$), eliminating all sensitivity to rapidly developing forecast busts (Recall dropped from 39.9% to 11.2%).
- **Rejection Reason:** Severe train/serve feature distribution mismatch.
- **Operational Impact:** A durable on-disk revision store (`backend/app/services/revision_service.py`) was constructed to maintain rolling forecast state across cycles. If previous cycles are unavailable, the system explicitly marks features as `MISSING_CYCLE` and degrades confidence rather than silently injecting zeros.
- **Reevaluation Permitted:** NO.

---

### `NEG-004`: Unconditional Conformal Prediction Bands Across Heterogeneous Weather Regimes
- **Experiment ID:** `EXP-CONF-UNCOND-004`
- **Phase:** F7, R7, R33
- **Hypothesis:** Standard Split Conformal Prediction calculated on a pooled validation dataset guarantees nominal 90% empirical coverage across all atmospheric regimes and regional microclimates.
- **Method:** Calibrated a conformal non-conformity threshold on a pooled 2024-H1 validation set and evaluated coverage across 5 Indian agro-climatic zones and 3 hazard types.
- **Dataset:** Pooled Indian weather station validation data.
- **Observed Result:** While aggregate marginal coverage was exactly 89.8% (satisfying the nominal 90% target), conditional coverage was severely deficient in high-impact regimes: Coastal Cyclone regime coverage was **71.2%**, and Extended Lead (>168h) coverage was **76.4%**.
- **95% Confidence Interval:** Coastal regime coverage 95% CI [0.664, 0.758].
- **Rejection Reason:** Fails conditional coverage requirement (minimum 85% in all sub-strata). Marginal coverage concealed severe localized undercoverage.
- **Operational Impact:** Unconditional conformal prediction cannot be used for high-risk hazard regimes. Conformal guarantees are restricted to `EXPERIMENTAL` status until regime-stratified group-conformal algorithms are validated on multi-year data.
- **Reevaluation Permitted:** YES, under group-conformal / localized conformal framework with explicit regime holdouts.

---

### `NEG-005`: Claiming Deterministic Inter-Model Difference as Ensemble Member Spread
- **Experiment ID:** `EXP-ENS-SEMANTICS-005`
- **Phase:** F12, R12, R42
- **Hypothesis:** Difference between Open-Meteo GFS and a second deterministic provider can be mathematically substituted for NOAA GEFS 31-member ensemble standard deviation.
- **Method:** Computed absolute difference $|M_1 - M_2|$ and injected it into feature 35 (`ensemble_spread_normalized`).
- **Dataset:** Colocated Open-Meteo GFS and secondary mock feed.
- **Observed Result:** Inter-model difference exhibited zero correlation ($r = 0.03$) with physical ensemble spread. Model calibration degraded significantly because inter-model bias was mistaken for atmospheric flow-dependent predictability.
- **Rejection Reason:** Falsified statistical semantics. Model disagreement is not ensemble spread.
- **Operational Impact:** Cross-provider disagreement is strictly quarantined in `backend/app/services/disagreement_service.py` as an independent diagnostic signal and is barred from modifying the core model's ensemble spread features.
- **Reevaluation Permitted:** NO.
