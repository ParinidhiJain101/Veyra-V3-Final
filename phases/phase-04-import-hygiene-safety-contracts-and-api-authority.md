# Phase 04 — Import Hygiene, Safety Contracts and API Authority

**Status:** PLANNED  
**Priority:** P0  
**Objective:** Repair circular imports, import-root behavior, route-to-model authority, typed trust states, and selectively adapt Repository-A safety patterns.

## Why this matters to the score

Software robustness and safety boundaries are currently undermined by import failures, standalone script failures, and possible semantic drift between API paths.

## Correction-register drivers

Only safe, tested behavior may be imported from Repository A. Do not copy application trees, pointer artifacts, stale claims, or fixture providers as live systems.

## Exact tasks

- Break the `backend.app.ml.artifacts` and services circular import using dependency inversion or lazy boundary imports.
- Make standalone scripts anchor the repository root without hidden `PYTHONPATH` requirements.
- Define one route-to-model authority and typed response contract for probability, OOD, uncertainty, provider state, certification, and abstention.
- Selectively adapt Repository-A safe model-unavailable, UTC time-contract, certification-scope, live-vs-fixture, and durable-revision patterns with tests.

## Files/modules likely affected

- `README.md`, `requirements.txt`, `pyproject.toml`, `pytest.ini`, `frontend/package.json`, and lock/version files.
- `manifests/`, `scripts/`, `backend/app/`, `backend/tests/`, `frontend/src/`, `frontend/test/`, `.github/workflows/`, `docs/release/`, `docs/science-evidence/`, and `data/` as applicable.
- Existing historical/duplicate trees must be classified, quarantined, or removed from active authority; they must not silently become a second implementation.

## Dependencies

- Entry: Phase 03 must be PASSED before this phase begins.
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

