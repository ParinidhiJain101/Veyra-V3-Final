# Phase 07 — Calibration, OOD, Abstention and Specialist Promotion

**Status:** PLANNED  
**Priority:** P1  
**Objective:** Evaluate calibration and abstention on held-out truth and promote only specialists with real evidence packages.

## Why this matters to the score

The repository correctly contains formula specialists, but formula modules and fixture metrics cannot receive full empirical-validation credit.

## Correction-register drivers

A specialist remains experimental unless its dataset, artifact, holdout metrics, uncertainty intervals, and promotion gate all pass.

## Exact tasks

- Evaluate V3 calibration, Brier skill, reliability, ECE, abstention, OOD, coverage-risk, and uncertainty on held-out truth.
- Choose at most two or three initial specialists with sufficient labeled data.
- For each candidate specialist create target definition, baseline, trained artifact or justified formula baseline, holdout metrics, confidence intervals, model card, and promotion manifest.
- Keep all other formulas explicitly experimental or quarantined.

## Files/modules likely affected

- `README.md`, `requirements.txt`, `pyproject.toml`, `pytest.ini`, `frontend/package.json`, and lock/version files.
- `manifests/`, `scripts/`, `backend/app/`, `backend/tests/`, `frontend/src/`, `frontend/test/`, `.github/workflows/`, `docs/release/`, `docs/science-evidence/`, and `data/` as applicable.
- Existing historical/duplicate trees must be classified, quarantined, or removed from active authority; they must not silently become a second implementation.

## Dependencies

- Entry: Phase 06 must be PASSED before this phase begins.
- Scientific phases additionally require the artifact and clean-environment phases to pass.
- Phase 10 requires all previous phases and an independent reviewer.

## Risks and controls

- **Evidence inflation:** classify every result by evidence class and block unsupported language.
- **Authority drift:** generate manifests and reports from one SHA and one artifact registry.
- **Data leakage:** enforce issue-time contracts and independent review of feature lineage.
- **Scope creep:** do not add features until the phase exit gate passes.
- **Merge contamination:** import behavior selectively and rerun parity, artifact, and scientific gates.

## Expected score impact

This phase has no guaranteed score gain. A score increase is earned only when its exit evidence is reproduced by the evaluator.

## Validation commands and exit criteria

Run from the repository root in a fresh environment, capturing stdout, stderr, exit codes, versions, SHA-256 hashes, and timestamps:

```bash
git status --short
git rev-parse HEAD
python scripts/verify_environment.py
python scripts/verify_artifacts.py
python -m pytest backend/tests -q --tb=short
npm ci --prefix frontend
npm test --prefix frontend -- --run
npm run build --prefix frontend
python scripts/validate_claim_register.py --input manifests/claim_register.csv
python scripts/validate_specialist_evidence.py
python scripts/replay_historical.py --mode historical
python scripts/replay_digital_twin.py --mode synthetic
python scripts/verify_frontend_backend_parity.py
python scripts/run_release_gates.py --require-all
python scripts/run_all_master_gates.py
```

Phase-specific acceptance: the commands relevant to this phase must pass; unrelated commands may remain blocked only if the phase file records the blocker and the dependency decision. The README, claim register, phase file, and machine-readable evidence output must be updated after the passing run.

## Rollback plan

Revert the phase commit or restore the last passing release tag. Never delete raw evidence logs. If an artifact, model, data snapshot, or schema changed, restore the prior manifest and rerun the previous release gates before serving traffic.

## Required status protocol

Initial status: **PLANNED**. After execution, replace it with **PASSED** or **FAILED**. A failed phase must record the exact command, exit code, relevant output, root cause, and next repair step. Do not mark a phase complete from documentation alone.

## Push-to-git condition

Changes may be committed and pushed only after every phase-specific command passes, the README has been updated to match the new evidence class, the worktree is clean except for intentionally committed release outputs, and the phase owner records the commit SHA. If any test fails, stop, repair, rerun, and do not push the failing state.

