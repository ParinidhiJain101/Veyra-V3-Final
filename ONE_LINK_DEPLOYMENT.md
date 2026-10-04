# VEYRA Sentinel — One-Link Deployment

This deployment uses **one public Render Web Service**. FastAPI serves the built React dashboard and the `/v1/*` API from the same origin.

## Judge-facing architecture

`https://<service>.onrender.com/` → React dashboard → same-origin `/v1/*` → FastAPI/V3

The PPT should contain only the root dashboard URL.

## Render configuration

The repository includes `render.yaml` with:

- Runtime: Python
- Plan: Free for initial deployment
- Python: 3.12.3
- Build: install Python dependencies, install frontend dependencies, build Vite frontend
- Start: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
- Health check: `/v1/health`

Render requires public web services to bind to `0.0.0.0` and recommends using `$PORT`. The service's public URL is an `onrender.com` subdomain. See Render's current Web Services documentation.

## Deploy

1. Push this repository to the GitHub branch you want Render to deploy.
2. In Render: **New → Blueprint** (or create a Web Service and use the same commands).
3. Select the repository and branch.
4. Let Render read `render.yaml`.
5. Wait for the build and health check to pass.
6. Open the generated `https://...onrender.com/` URL.
7. Verify:
   - `/` loads the VEYRA dashboard.
   - `/v1/health` returns HTTP 200.
   - dashboard API calls use the same origin; no Render backend URL is required in the browser bundle.
   - `/docs` opens FastAPI documentation if needed for technical verification.

## Important

Do not put the old GitHub Pages URL or the old standalone Render backend URL into the SIH PPT. The new root Render URL is the single judge-facing URL.

If the free 512 MB instance cannot hold the V3 runtime comfortably, upgrade the **same service** to Render's `1c-2g` plan rather than splitting the frontend and backend. This preserves the one-link architecture.
