# Frontend Bundle Budget

| Chunk Name | Included Dependencies | Reason for Dependency | Approved Threshold | Performance Impact |
| --- | --- | --- | --- | --- |
| `vendor` | `react`, `react-dom` | Core UI framework. | 150 kB | Necessary for application architecture. |
| `charting` | `chart.js`, `react-chartjs-2` | Rendering complex reliability and probability timelines. | 300 kB | Essential for scientific visualizations. |
| `maps` | `leaflet`, `react-leaflet` | Geospatial context and hazard location mapping. | 150 kB | Required for spatial reliability visualizations. |
| `icons` | `lucide-react` | Standardized vector icons across the interface. | 100 kB | Required for accessibility and UX. |

**Current Status:** All chunks have been safely split to remain individually under the 500 kB target threshold.

**Build Command:** `npm run build`
