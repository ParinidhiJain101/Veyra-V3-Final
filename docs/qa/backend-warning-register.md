# Backend Warning Register

| Warning Class | File & Line | Origin | Root Cause | Fix / Rationale | Verification Command |
| --- | --- | --- | --- | --- | --- |
| InconsistentVersionWarning | `sklearn/base.py:525` | dependency | Artifact pickled with scikit-learn 1.9.0 but environment had >= 1.5.0 which resolved to newer version. | Pinned `scikit-learn==1.9.0` in `requirements.txt`. | `pytest backend/tests` |
| StarletteDeprecationWarning | `backend/app/core/auth.py:197,203,208` | test / production | `HTTP_422_UNPROCESSABLE_ENTITY` deprecated in Starlette. | Replaced with `HTTP_422_UNPROCESSABLE_CONTENT`. | `pytest backend/tests` |
| RuntimeWarning (nanmean, nanmin, nanmax) | `backend/app/services/openmeteo_service.py:267` | production | Reductions on all-NaN slices when missing data is fully empty. | Guarded reductions using boolean valid masks instead of warning filters. | `pytest backend/tests` |
