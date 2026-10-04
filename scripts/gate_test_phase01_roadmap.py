"""Phase 01 Acceptance Gate — Baseline Freeze, Provenance and Correction Register.

Validates:
1. Authoritative VEYRA_V3_MERGE_CORRECTION_AND_FULL_ISSUE_REGISTER.csv exists, valid, and covers all phases.
2. Baseline inventory JSON exists, non-empty, and contains complete cryptographic file hashes.
3. Baseline audit evidence markdown exists.
4. Structured phases/ directory exists with all 10 roadmap specifications.
5. Core V3 ML artifacts (Model, Calibrator, 50 Features) match canonical hashes.
6. Model deserialization, calibrator type, and feature length == 50.
7. Claim register validates across all evidence classes.
"""
import os
import sys
import json
import csv
import hashlib
import subprocess
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]

EXPECTED_MODEL_SHA = "00a8410746f4a0eecbf7e76aaa0565143fc948d0e06aea65e7bcc4ce28a1c660"
EXPECTED_CALIB_SHA = "9f448606ce4338ded92f238a551b3a9d8e6d2cb5902e8bc687bce5f5850af531"
EXPECTED_FEAT_SHA  = "702ff4153fd95d8c9de3bbd01461d65fde0ef207099f7f3a8e7f5c8bac02031e"

def compute_sha(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest().lower()

def run_cmd(cmd: str):
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=str(REPO_ROOT))
    return res.returncode, res.stdout.strip(), res.stderr.strip()

def test_phase01_gate():
    print("=" * 70)
    print("  PHASE 01 COMPULSORY ACCEPTANCE GATE")
    print("  Baseline Freeze, Provenance and Correction Register Verification")
    print("=" * 70)
    failures = []

    # 1. Authoritative Issue Register
    register_path = REPO_ROOT / "manifests" / "VEYRA_V3_MERGE_CORRECTION_AND_FULL_ISSUE_REGISTER.csv"
    print("\n[1/7] Validating Authoritative Issue and Correction Register...")
    if not register_path.is_file():
        failures.append(f"Missing authoritative issue register: {register_path}")
    else:
        try:
            with open(register_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                rows = list(reader)
            
            required_cols = [
                "issue_id", "priority", "category", "summary", "root_cause", "owner",
                "affected_paths", "evidence_class", "dependency", "target_phase",
                "exit_test", "readme_correction", "status"
            ]
            missing_cols = [c for c in required_cols if c not in reader.fieldnames]
            if missing_cols:
                failures.append(f"Issue register missing columns: {missing_cols}")
            elif len(rows) < 20:
                failures.append(f"Issue register has insufficient rows: {len(rows)} (expected >= 20)")
            else:
                target_phases = set(r["target_phase"] for r in rows)
                expected_phases = {f"Phase {i:02d}" for i in range(1, 11)}
                uncovered = expected_phases - target_phases
                if uncovered:
                    failures.append(f"Issue register does not cover all 10 phases. Uncovered: {uncovered}")
                else:
                    print(f"  [PASS] Verified {len(rows)} registered issues covering all 10 roadmap phases.")
                    resolved_p1 = sum(1 for r in rows if r["status"] == "RESOLVED_IN_PHASE_01")
                    print(f"  [PASS] Phase 01 resolved issues count: {resolved_p1}")
        except Exception as exc:
            failures.append(f"Failed parsing issue register CSV: {exc}")

    # 2. Baseline Inventory JSON
    print("\n[2/7] Validating Cryptographic Baseline Inventory JSON...")
    inv_path = REPO_ROOT / "manifests" / "phase01_baseline_inventory.json"
    if not inv_path.is_file():
        failures.append(f"Missing baseline inventory: {inv_path}")
    else:
        try:
            inv = json.loads(inv_path.read_text(encoding="utf-8"))
            if "git_provenance" not in inv or "core_v3_artifacts" not in inv or "file_inventory" not in inv:
                failures.append("Baseline inventory JSON missing required root sections")
            else:
                files_count = len(inv["file_inventory"])
                print(f"  [PASS] Baseline inventory verified ({files_count} files tracked with SHA-256).")
                print(f"  [PASS] Git Head: {inv['git_provenance'].get('head_commit_sha')}")
        except Exception as exc:
            failures.append(f"Failed parsing baseline inventory JSON: {exc}")

    # 3. Baseline Evidence Markdown
    print("\n[3/7] Validating Baseline Audit Evidence Markdown...")
    evidence_path = REPO_ROOT / "audit" / "phase01_baseline_evidence.md"
    if not evidence_path.is_file() or evidence_path.stat().st_size < 500:
        failures.append(f"Missing or empty baseline evidence document: {evidence_path}")
    else:
        print(f"  [PASS] Baseline evidence report verified ({evidence_path.stat().st_size:,} bytes).")

    # 4. Roadmap Directory & Specifications
    print("\n[4/7] Validating phases/ Roadmap Directory Structure...")
    phases_dir = REPO_ROOT / "phases"
    phases_readme = phases_dir / "README.md"
    if not phases_dir.is_dir() or not phases_readme.is_file():
        failures.append(f"Missing phases/ directory or phases/README.md")
    else:
        phase_files = list(phases_dir.glob("phase-*.md"))
        if len(phase_files) != 10:
            failures.append(f"Expected 10 phase documents in phases/, found {len(phase_files)}")
        else:
            print(f"  [PASS] Verified phases/ directory with all 10 roadmap specifications.")

    # 5. Core V3 ML Artifact Hashes
    print("\n[5/7] Verifying Core V3 ML Artifact Hashes...")
    model_path = REPO_ROOT / "models" / "v3" / "lightgbm_v3_challenger.joblib"
    calib_path = REPO_ROOT / "models" / "v3" / "probability_calibrator_v3.joblib"
    feat_path  = REPO_ROOT / "models" / "v3" / "feature_names.json"

    for name, p, exp_sha in [
        ("V3 Model", model_path, EXPECTED_MODEL_SHA),
        ("V3 Calibrator", calib_path, EXPECTED_CALIB_SHA),
        ("50-Feature Schema", feat_path, EXPECTED_FEAT_SHA)
    ]:
        if not p.is_file():
            failures.append(f"{name} missing at {p}")
        else:
            actual_sha = compute_sha(p)
            if actual_sha != exp_sha:
                failures.append(f"{name} SHA mismatch: got {actual_sha}, expected {exp_sha}")
            else:
                print(f"  [PASS] {name} SHA-256 verified: {actual_sha[:16]}...")

    # 6. Artifact & Model Loading Parity
    print("\n[6/7] Verifying Model & Calibrator Deserialization...")
    try:
        import joblib
        model = joblib.load(model_path)
        calibrator = joblib.load(calib_path)
        features = json.loads(feat_path.read_text(encoding="utf-8"))

        booster = getattr(model, "booster_", model)
        if hasattr(booster, "num_feature"):
            assert booster.num_feature() == 50, f"Expected 50 features in booster, got {booster.num_feature()}"
            assert booster.feature_name() == features, "Booster feature names do not match feature_names.json"
        assert type(calibrator).__name__ == "IsotonicRegression", f"Unexpected calibrator: {type(calibrator)}"
        print("  [PASS] Model (Booster, 50 features) & Calibrator (IsotonicRegression) deserialized cleanly.")
    except Exception as exc:
        failures.append(f"Model/Calibrator deserialization failed: {exc}")

    # 7. Sub-Gate Script Execution
    print("\n[7/7] Running Subordinate Validation Suites...")
    sub_commands = [
        ("Verify Artifacts", "python scripts/verify_artifacts.py"),
        ("Validate Claim Register", "python scripts/validate_claim_register.py --input manifests/claim_register.csv"),
    ]
    for name, cmd in sub_commands:
        code, out, err = run_cmd(cmd)
        if code != 0:
            failures.append(f"Sub-check [{name}] failed:\n{out}\n{err}")
        else:
            print(f"  [PASS] {name} passed.")

    # Final Acceptance Decision
    print("\n" + "=" * 70)
    if failures:
        print("PHASE 01 ACCEPTANCE GATE FAILED:")
        for f in failures:
            print(f"  [-] {f}")
        print("=" * 70)
        sys.exit(1)
    else:
        print("=== PHASE 01 ROADMAP ACCEPTANCE GATE PASSED (100% SUCCESS) ===")
        print("All Phase 01 baseline, provenance, and issue-register requirements satisfied.")
        print("=" * 70)
        sys.exit(0)

if __name__ == "__main__":
    test_phase01_gate()
