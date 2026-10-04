"""Vercel Serverless Function entrypoint for Forecast-Bust Sentinel API."""
import os
import sys
from pathlib import Path

# Ensure repository root is on sys.path so 'backend' and all modules resolve cleanly
REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

# Pre-load Linux native runtimes (libgomp.so.1) before importing ML libraries
import backend.app.core.runtime_compat  # noqa: F401

from backend.app.main import app

# Expose 'app' as the ASGI application handler for Vercel Python runtime
__all__ = ["app"]
