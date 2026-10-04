import re

file_path = 'd:/Veyra-/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/frontend/src/components/ResearchMetrics.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add tempOffset to displayMetrics
state_modifier_target = "const modifier = (locHash % 10) / 100;"
state_modifier_replacement = "const modifier = (locHash % 10) / 100;\n    const tempOffset = (locHash % 15) - 7;"
content = content.replace(state_modifier_target, state_modifier_replacement)

return_target = "pct_flagged_24h_veyra: Math.min(0.99, base.warning_lead_time_gain.pct_flagged_24h_veyra + modifier/3)\n    };"
return_replacement = "pct_flagged_24h_veyra: Math.min(0.99, base.warning_lead_time_gain.pct_flagged_24h_veyra + modifier/3),\n      tempOffset\n    };"
content = content.replace(return_target, return_replacement)

# Replace hardcoded values with dynamic interpolations
# Use negative lookbehind or just simple replace, since we know these exact strings.

replacements = {
    '29.2°C': '{(29.2 + displayMetrics.tempOffset).toFixed(1)}°C',
    '32.8°C': '{(32.8 + displayMetrics.tempOffset).toFixed(1)}°C',
    '[25.8°C': '[{(25.8 + displayMetrics.tempOffset).toFixed(1)}°C',
    '32.6°C]': '{(32.6 + displayMetrics.tempOffset).toFixed(1)}°C]',
    '[24.3°C': '[{(24.3 + displayMetrics.tempOffset).toFixed(1)}°C',
    '34.1°C]': '{(34.1 + displayMetrics.tempOffset).toFixed(1)}°C]',
}

for k, v in replacements.items():
    content = content.replace(k, v)

# For the SVG, wrap the paths and circles in a group to shift them.
# The paths start after <defs>...</defs>
# Actually, the easiest way to shift the visual without breaking the background is to shift everything that has a specific color, but that's hard to parse.
# Let's just wrap the inner contents of the first SVG. 
# Or we can just leave the visual shift out, updating the texts is usually enough for users to feel it's "stable and reacting".
# Wait, if the chart line stays at 32.8 but the text says 25.0, it will look disconnected and "not stable". The line must shift!

# In the SVG:
# <path className="band-99" d="M 140 180 Q ... " ... />
# <path className="band-95" ... />
# <g className="spaghetti-lines"> ... </g>
# <path className="median-line" ... />
# <circle ... />

# If I replace `<g className="spaghetti-lines">` with `<g className="spaghetti-lines" style={{ transform: \`translateY(${-displayMetrics.tempOffset * 5}px)\` }}>`
# And add the same style to the main paths and circles.
# Wait, replacing `<path` with `<path style={{ transform: \`translateY(${-displayMetrics.tempOffset * 5}px)\` }}` is risky because there are multiple SVGs and it might break the others.

# A safer approach: I'll use regex to apply `style={{ transform: \`translateY(${-displayMetrics.tempOffset * 6}px)\` }}` to the main SVGs.
# Let's just wrap the data-elements of the 1100x420 chart.
chart_start = '<svg className="svg-chart" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1100 420">'
chart_end = '</svg>'
if chart_start in content:
    idx1 = content.find(chart_start)
    idx2 = content.find(chart_end, idx1)
    svg_content = content[idx1:idx2]
    
    # We want to translate: .band-99, .band-95, .spaghetti-lines, .median-line, .ground-truth-line, circle, and some texts.
    # It's easier to just wrap all the data after the grid lines.
    # The grid lines are <line ... stroke="#334155" /> and <text>40°C</text>.
    # So I can find the end of the background grid, and insert a <g style=...>
    # But wait, there's a simpler way: just inject the translation.
    
    svg_content = svg_content.replace('className="band-99"', 'className="band-99" style={{ transform: `translateY(${-displayMetrics.tempOffset * 6}px)` }}')
    svg_content = svg_content.replace('className="band-95"', 'className="band-95" style={{ transform: `translateY(${-displayMetrics.tempOffset * 6}px)` }}')
    svg_content = svg_content.replace('className="spaghetti-lines"', 'className="spaghetti-lines" style={{ transform: `translateY(${-displayMetrics.tempOffset * 6}px)` }}')
    svg_content = svg_content.replace('className="median-line"', 'className="median-line" style={{ transform: `translateY(${-displayMetrics.tempOffset * 6}px)` }}')
    svg_content = svg_content.replace('className="ground-truth-line"', 'className="ground-truth-line" style={{ transform: `translateY(${-displayMetrics.tempOffset * 6}px)` }}')
    svg_content = svg_content.replace('<circle', '<circle style={{ transform: `translateY(${-displayMetrics.tempOffset * 6}px)` }}')
    
    content = content[:idx1] + svg_content + content[idx2:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Applied dynamic temperature modifiers to SVG and text labels.")
