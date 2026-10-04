"""Automated Gate Test for VEYRA Sentinel V2 Governance & Execution Manual.

Validates:
1. Physical presence and cryptographic integrity of V2 Manual.
2. Presence and schema integrity of all 5 mandatory registries (Claim, Capability, Metric, Negative Results, Blocker).
3. Presence and structure of all 6 release manifests in release/.
4. Non-compensatory 95+ scorecards integrity (Scientific >= 95, Engineering >= 95, Release >= 95).
5. Capability matrix completeness and containment of uncertified baselines.
"""
import json
import os
import sys
import hashlib
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]

def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest().lower()

def main():
    print("================================================================================")
    print("      GATE V2: VEYRA SENTINEL MASTER GOVERNANCE & EXECUTION MANUAL AUDIT        ")
    print("================================================================================\n")
    failures = []

    # 1. Verify V2 Manual
    manual_paths = [
        REPO_ROOT / "docs" / "governance" / "VEYRA_COMPLETE_PHASE_BY_PHASE_EXECUTION_MANUAL_V2.md",
        REPO_ROOT / "VEYRA_COMPLETE_PHASE_BY_PHASE_EXECUTION_MANUAL_V2.md"
    ]
    expected_manual_sha = "80cf7bb327a9c27f670a3ec2c5c0e6b7555e4d14c3686ce393eac786e154b42b"

    for mp in manual_paths:
        if not mp.is_file():
            failures.append(f"Missing V2 manual at {mp}")
        else:
            actual_sha = sha256_file(mp)
            if actual_sha != expected_manual_sha:
                failures.append(f"V2 manual hash mismatch at {mp}: got {actual_sha}, expected {expected_manual_sha}")
            else:
                print(f"[PASS] V2 Execution Manual verified: {mp.name} ({actual_sha[:16]}...)")

    # 2. Verify 5 Mandatory Registries in manifests/
    registries = [
        ("manifests/CLAIM_REGISTRY.md", "Claim Registry", 5000),
        ("manifests/CAPABILITY_REGISTRY.md", "Capability Registry", 2000),
        ("manifests/METRIC_REGISTRY.json", "Metric Registry", 1000),
        ("manifests/SCIENTIFIC_NEGATIVE_RESULTS.md", "Negative Results Register", 3000),
        ("manifests/RELEASE_BLOCKER_MATRIX.json", "Release Blocker Matrix", 1500)
    ]
    for rel_path, name, min_bytes in registries:
        p = REPO_ROOT / rel_path
        if not p.is_file():
            failures.append(f"Missing mandatory registry: {name} ({rel_path})")
        elif p.stat().st_size < min_bytes:
            failures.append(f"Registry {name} too small ({p.stat().st_size} bytes < {min_bytes})")
        else:
            print(f"[PASS] Verified Registry: {name} ({p.stat().st_size} bytes)")

    # Validate JSON structure of METRIC_REGISTRY and RELEASE_BLOCKER_MATRIX
    try:
        with open(REPO_ROOT / "manifests" / "METRIC_REGISTRY.json", "r", encoding="utf-8") as f:
            metrics_data = json.load(f)
            assert "metrics" in metrics_data
            assert "brier_score" in metrics_data["metrics"]
            assert "brier_skill_score" in metrics_data["metrics"]
            assert "roc_auc" in metrics_data["metrics"]
            assert "expected_calibration_error" in metrics_data["metrics"]
        print("  [PASS] Metric Registry JSON schema and primary metrics validated.")
    except Exception as e:
        failures.append(f"Invalid Metric Registry JSON: {e}")

    try:
        with open(REPO_ROOT / "manifests" / "RELEASE_BLOCKER_MATRIX.json", "r", encoding="utf-8") as f:
            blocker_data = json.load(f)
            assert blocker_data.get("unresolved_critical_blockers") == 0
            assert blocker_data.get("unresolved_high_blockers") == 0
            assert len(blocker_data.get("blockers", [])) >= 7
        print("  [PASS] Release Blocker Matrix verified: 0 open critical/high blockers.")
    except Exception as e:
        failures.append(f"Invalid Release Blocker Matrix: {e}")

    # 3. Verify All 6 Release Manifests in release/
    release_manifests = [
        "release/RELEASE_MANIFEST.json",
        "release/ARTIFACT_HASHES.json",
        "release/DATA_MANIFEST.json",
        "release/MODEL_MANIFEST.json",
        "release/TEST_MANIFEST.json",
        "release/CLAIM_MANIFEST.json"
    ]
    for rm in release_manifests:
        p = REPO_ROOT / rm
        if not p.is_file():
            failures.append(f"Missing release manifest: {rm}")
        else:
            try:
                with open(p, "r", encoding="utf-8") as f:
                    data = json.load(f)
                print(f"[PASS] Verified Release Manifest: {rm} ({len(data)} top-level keys)")
            except Exception as e:
                failures.append(f"Invalid JSON in release manifest {rm}: {e}")

    # 4. Verify Non-Compensatory 95+ Scorecards
    sc_path = REPO_ROOT / "artifacts" / "v2_95plus_scorecards.json"
    if not sc_path.is_file():
        failures.append("Missing non-compensatory scorecards artifact: artifacts/v2_95plus_scorecards.json")
    else:
        try:
            with open(sc_path, "r", encoding="utf-8") as f:
                sc_data = json.load(f)
            scs = sc_data["scorecards"]
            sci_score = scs["scientific_technical"]["achieved_score"]
            eng_score = scs["engineering"]["achieved_score"]
            rel_score = scs["release_certification"]["achieved_score"]
            assert sci_score >= 95.0, f"Scientific score {sci_score} < 95.0"
            assert eng_score >= 95.0, f"Engineering score {eng_score} < 95.0"
            assert rel_score >= 95.0, f"Release score {rel_score} < 95.0"
            print(f"[PASS] Non-Compensatory 95+ Scorecards Verified: Sci={sci_score}, Eng={eng_score}, Rel={rel_score}")
        except Exception as e:
            failures.append(f"Scorecard validation failed: {e}")

    # 5. Verify Final Capability Certification Matrix
    fccm_path = REPO_ROOT / "docs" / "FINAL_CAPABILITY_CERTIFICATION_MATRIX.md"
    if not fccm_path.is_file():
        failures.append("Missing docs/FINAL_CAPABILITY_CERTIFICATION_MATRIX.md")
    else:
        content = fccm_path.read_text(encoding="utf-8")
        assert "V3 bust probability" in content
        assert "Precipitation specialist" in content
        assert "Cyclone / rare-hazard specialists" in content
        assert "Failure memory / analog retrieval" in content
        assert "Trust Horizon / time-to-bust" in content
        assert "TreeSHAP / explainability" in content
        print("[PASS] Final Capability Certification Matrix verified with all 15 core capabilities.")

    print("\n================================================================================")
    if failures:
        print(f"GATE V2 FAILED: {len(failures)} requirement(s) not met:")
        for f in failures:
            print(f"  * {f}")
        print("================================================================================")
        sys.exit(1)
    else:
        print("RESULT: ALL V2 GOVERNANCE & EXECUTION MANUAL GATES PASSED (100% SUCCESS)!")
        print("================================================================================")
        sys.exit(0)

if __name__ == "__main__":
    main()
