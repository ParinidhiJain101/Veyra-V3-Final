import re

target_file = 'd:/Veyra-/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/frontend/src/components/ResearchMetrics.tsx'
html_file = 'C:/Users/priya/.gemini/antigravity-ide/brain/e9e9581c-d3eb-44ef-84e3-e7e1463cef65/veyra_sentinel_direction_1.html'

with open(target_file, 'r', encoding='utf-8') as f:
    ts_code = f.read()
    
with open(html_file, 'r', encoding='utf-8') as f:
    html_code = f.read()

# Extract the full <style> from html
style_match = re.search(r'<style>(.*?)</style>', html_code, re.DOTALL)
if style_match:
    full_css = style_match.group(1)
else:
    print("No style block found in HTML.")
    exit(1)

# Modify CSS to be scoped under .sentinel-direction-1
css_lines = full_css.split('\n')
scoped_css = []
inside_root = False
for line in css_lines:
    if line.strip() == '* {' or line.strip() == 'body {':
        continue # Skip global resets
    
    # Let's just prefix rules
    # It's easier to just use the original CSS but prefixed.
    # Actually, the user already provided the specific CSS tokens. 
    pass

# To be safe, I'll just write a targeted replace for the style block in ts_code.
# Let's extract the styles we actually need:
missing_styles = """
        .sentinel-direction-1 select.form-control, .sentinel-direction-1 input.form-control {
            background: var(--bg-card);
            border: 1px solid var(--border-dim);
            color: var(--text-main);
            padding: 7px 11px;
            border-radius: 5px;
            font-size: 0.8rem;
            outline: none;
            transition: border 0.2s;
            width: 100%;
        }

        .sentinel-direction-1 select.form-control:focus, .sentinel-direction-1 input.form-control:focus {
            border-color: var(--cyan-primary);
        }

        .sentinel-direction-1 .control-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .sentinel-direction-1 .control-label {
            font-family: var(--font-mono);
            font-size: 0.68rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            display: flex;
            justify-content: space-between;
        }

        .sentinel-direction-1 .control-label span.scope-tag {
            color: var(--emerald-safe);
        }

        .sentinel-direction-1 .btn {
            font-size: 0.78rem;
            font-weight: 600;
            padding: 7px 14px;
            border-radius: 5px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            text-decoration: none;
            transition: all 0.2s;
            border: 1px solid transparent;
        }

        .sentinel-direction-1 .btn-cyan {
            background: rgba(0, 242, 254, 0.12);
            color: var(--cyan-primary);
            border-color: rgba(0, 242, 254, 0.35);
        }

        .sentinel-direction-1 .btn-cyan:hover {
            background: var(--cyan-primary);
            color: #000;
            box-shadow: 0 0 15px var(--cyan-glow);
        }

        .sentinel-direction-1 .btn-secondary {
            background: var(--bg-card);
            color: var(--text-muted);
            border-color: var(--border-dim);
        }

        .sentinel-direction-1 .btn-secondary:hover {
            color: var(--text-main);
            border-color: rgba(255, 255, 255, 0.2);
            background: var(--bg-card-hover);
        }
        
        .sentinel-direction-1 .badge-certified {
            background: rgba(56, 189, 248, 0.12);
            color: var(--blue-accent);
            border: 1px solid rgba(56, 189, 248, 0.3);
            font-size: 0.65rem;
            padding: 2px 7px;
            border-radius: 3px;
        }
"""

# Inject missing styles before the closing </style>
ts_code = ts_code.replace('      `}</style>', missing_styles + '\n      `}</style>')

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Injected missing CSS for buttons and forms.")
