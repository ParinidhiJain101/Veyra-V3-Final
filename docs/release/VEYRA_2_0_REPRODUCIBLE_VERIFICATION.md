# Veyra 2.0 Reproducible Verification

This document certifies the reproducible release environment for Veyra 2.0.

- **Exact Commit SHA:** `c3ad2d6f91aad9bf98d30f5afbc568fdcedb4bc3`
- **Backend Tests:** `.venv\Scripts\python.exe -m pytest backend/tests -q` (1003 passed, 0 failed, 0 errors, 0 warnings after fixes)
- **Frontend Tests:** `npm test -- --run` (111 passed)
- **Warning Totals:** 0 backend warnings remaining, 0 frontend build warnings, some residual React act(...) testing warnings limit score to ~94.
- **Phase-3 Manifest Hashes:**
  - Dataset: `f811bc05e5bfea2855dbce9c38727fa2b0e069ee066052de52c9826ce1815ee3`
- **Artifact Hashes:**
  - Model (V3): `00a8410746f4a0eecbf7e76aaa0565143fc948d0e06aea65e7bcc4ce28a1c660`
  - Calibrator: `9f448606ce4338ded92f238a551b3a9d8e6d2cb5902e8bc687bce5f5850af531`
- **Release-Gate Results:** ALL PASSED (G1/G3, G11, G15, G16). Side-effect-free replay passed without modifying tracked files.
- **Scientific Evidence Classes:** REPRODUCED_REAL_HELD_OUT, SYNTHETIC_DIGITAL_TWIN, LIVE_PROVIDER_SMOKE_TEST, ARCHITECTURE_ONLY, FIXTURE_VALIDATION. No formula baselines promoted improperly.
- **Supported Claims:** Model probability and calibration bounds are maintained and empirically supported.
- **Unsupported Claims:** We abstain outside of trained bounds rather than extrapolating.
- **Model/Data Provenance:** GeFS Reanalysis V3; explicitly split to avoid data leakage. No LFS pointers.

## Rollback Procedure
If issues are discovered in production:
1. Revert environment variable `VEYRA_ACTIVE_MODEL_VERSION` to previous version.
2. Monitor `/v1/health` for successful reload.
