import re
import sys

with open('C:/Users/priya/.gemini/antigravity-ide/brain/e9e9581c-d3eb-44ef-84e3-e7e1463cef65/veyra_sentinel_direction_1.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract body content
body_match = re.search(r'<body>(.*?)<script>', html, re.DOTALL)
if not body_match:
    body_match = re.search(r'<body>(.*?)</body>', html, re.DOTALL)
body_content = body_match.group(1) if body_match else html

# Remove header, nav, sub-bar, footer as they conflict with App.tsx's Navigation and Footer
body_content = re.sub(r'<header.*?</header>', '', body_content, flags=re.DOTALL)
body_content = re.sub(r'<nav.*?</nav>', '', body_content, flags=re.DOTALL)
body_content = re.sub(r'<div class="sub-bar".*?</div>\s*</div>', '', body_content, flags=re.DOTALL)
body_content = re.sub(r'<footer.*?</footer>', '', body_content, flags=re.DOTALL)

# Convert HTML comments
body_content = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', body_content)

# Convert class to className
body_content = re.sub(r'\bclass=', 'className=', body_content)

# Convert self-closing tags
for tag in ['input', 'br', 'hr', 'img', 'line', 'circle', 'path', 'rect', 'polygon', 'stop']:
    body_content = re.sub(r'(<' + tag + r'\b[^>]*?)(?<!/)>', r'\1 />', body_content)

# Convert SVG attributes
attrs = {
    'stroke-width': 'strokeWidth',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-opacity': 'strokeOpacity',
    'fill-opacity': 'fillOpacity',
    'text-anchor': 'textAnchor',
    'clip-rule': 'clipRule',
    'fill-rule': 'fillRule',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
    'font-size': 'fontSize',
    'font-weight': 'fontWeight',
    'clip-path': 'clipPath',
    'preserveaspectratio': 'preserveAspectRatio',
    'viewbox': 'viewBox',
    'lineargradient': 'linearGradient',
    'fegaussianblur': 'feGaussianBlur',
    'femerge': 'feMerge',
    'femergenode': 'feMergeNode',
    'stddeviation': 'stdDeviation',
    'attributename': 'attributeName',
    'repeatcount': 'repeatCount'
}
for old, new in attrs.items():
    body_content = re.sub(r'\b' + old + r'=', new + '=', body_content)

# Convert inline styles
def style_replacer(match):
    style_str = match.group(1)
    props = style_str.split(';')
    react_style = []
    for p in props:
        if ':' not in p: continue
        k, v = p.split(':', 1)
        k = k.strip()
        v = v.strip().replace("'", "\\'")
        k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
        react_style.append(f"\"{k}\": '{v}'")
    return 'style={{ ' + ', '.join(react_style) + ' }}'

body_content = re.sub(r'style="([^"]*)"', style_replacer, body_content)

# Wrap in JSX
jsx = f"""import React from 'react';

export const ResearchMetrics: React.FC = () => {{
  return (
    <div className="sentinel-direction-1">
      {{/* Inject CSS styles specific to this view */}}
      <style>{{`
        .sentinel-direction-1 {{
            --bg-deep: #07090e;
            --bg-surface: #0b0e14;
            --bg-card: #10141d;
            --bg-card-hover: #141a26;
            --bg-subtle: rgba(255, 255, 255, 0.03);
            --border-dim: rgba(255, 255, 255, 0.08);
            --border-bright: rgba(0, 242, 254, 0.35);
            --cyan-primary: #00f2fe;
            --cyan-glow: rgba(0, 242, 254, 0.15);
            --blue-accent: #38bdf8;
            --amber-warn: #f59e0b;
            --amber-glow: rgba(245, 158, 11, 0.15);
            --red-crit: #ef4444;
            --red-glow: rgba(239, 68, 68, 0.15);
            --emerald-safe: #10b981;
            --emerald-glow: rgba(16, 185, 129, 0.15);
            --violet-band: #818cf8;
            --text-main: #f1f5f9;
            --text-muted: #94a3b8;
            --text-faint: #64748b;
        }}
        .sentinel-direction-1 .mission-hero {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(90deg, rgba(16, 20, 29, 0.95) 0%, rgba(11, 14, 20, 0.85) 100%);
            border: 1px solid var(--border-dim);
            border-left: 3px solid var(--cyan-primary);
            padding: 16px 20px;
            border-radius: 6px;
        }}
        .sentinel-direction-1 .filter-toolbar {{
            background: var(--bg-surface);
            border: 1px solid var(--border-dim);
            border-radius: 6px;
            padding: 12px 18px;
            display: grid;
            grid-template-columns: 2.2fr 1.8fr 1.5fr auto;
            gap: 16px;
            align-items: end;
        }}
        .sentinel-direction-1 .telemetry-stat-strip {{
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 12px;
        }}
        .sentinel-direction-1 .stat-capsule {{
            background: var(--bg-surface);
            border: 1px solid var(--border-dim);
            border-radius: 6px;
            padding: 10px 14px;
            display: flex;
            flex-direction: column;
            gap: 3px;
            position: relative;
            overflow: hidden;
        }}
        .sentinel-direction-1 .stat-capsule::before {{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
            background: var(--cyan-primary);
        }}
        .sentinel-direction-1 .stat-capsule.alert::before {{ background: var(--amber-warn); }}
        .sentinel-direction-1 .stat-capsule.crit::before {{ background: var(--red-crit); }}
        .sentinel-direction-1 .stat-capsule.safe::before {{ background: var(--emerald-safe); }}
        .sentinel-direction-1 .scientific-card {{
            background: var(--bg-surface);
            border: 1px solid var(--border-dim);
            border-radius: 6px;
            padding: 18px 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }}
        .sentinel-direction-1 .curves-grid {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
        }}
        .sentinel-direction-1 .bottom-diag-strip {{
            display: grid;
            grid-template-columns: 1.2fr 1fr 1fr;
            gap: 16px;
        }}
        .sentinel-direction-1 .diag-card {{
            background: var(--bg-surface);
            border: 1px solid var(--border-dim);
            border-radius: 6px;
            padding: 14px 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }}
      `}}</style>
      <div style={{{{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', color: 'var(--text-main)', fontFamily: 'sans-serif' }}}}>
        {body_content}
      </div>
    </div>
  );
}};

export default ResearchMetrics;
"""

with open('d:/Veyra-/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/frontend/src/components/ResearchMetrics.tsx', 'w', encoding='utf-8') as f:
    f.write(jsx)

print('Conversion successful!')
