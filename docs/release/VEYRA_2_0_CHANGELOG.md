# Veyra 2.0 Changelog

## 95+ Hardening Release
- Fixed Starlette `HTTP_422_UNPROCESSABLE_ENTITY` deprecation warnings.
- Fixed `scikit-learn` `InconsistentVersionWarning` by strictly pinning `scikit-learn==1.9.0`.
- Guarded `numpy.nanmean` against all-NaN slices safely in `openmeteo_service.py` to prevent `RuntimeWarning` without dropping into dangerous filter scopes.
- Addressed frontend Vite bundle budget limits by manually chunking vendor (`react`, `react-dom`), charting (`chart.js`), maps (`leaflet`), and icons.
- Finalized scientific data evidence and provenance. All Phase 3 data validated properly.
