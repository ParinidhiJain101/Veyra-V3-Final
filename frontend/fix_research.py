import sys
import re

with open('d:/Veyra-/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/frontend/src/components/ResearchMetrics.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
    
# Add isEvaluating state
content = content.replace(
    "const [activeTab, setActiveTab] = useState",
    "const [isEvaluating, setIsEvaluating] = useState(false);\n  const [activeTab, setActiveTab] = useState"
)

# Update handleEvaluate
handle_eval = """
  const handleEvaluate = () => {
    setIsEvaluating(true);
    apiClient.getComprehensiveEvaluation('v3').then(({ data }) => {
      if (data) setMetrics(data);
      setIsEvaluating(false);
    }).catch(() => setIsEvaluating(false));
  };
"""
content = content.replace('const relDiag = metrics.discrimination_and_probability.reliability_diagram;', handle_eval + '\n  const relDiag = metrics.discrimination_and_probability.reliability_diagram;')

# Replace the onClick handlers
content = content.replace('onClick={() => apiClient.getComprehensiveEvaluation("v3").then(({data}) => data && setMetrics(data))}', 'onClick={handleEvaluate} disabled={isEvaluating}')

# Replace button text
content = content.replace('Compute Residuals', '{isEvaluating ? "Evaluating..." : "Compute Residuals"}')
content = content.replace('Re-evaluate Conformal Bounds', '{isEvaluating ? "Re-evaluating..." : "Re-evaluate"}')

# Fix CSS (flatten the design to look less AI-generated)
css_old = """        .sentinel-direction-1 {
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
            --text-muted: #cbd5e1;
            --text-faint: #94a3b8;
        }"""
css_new = """        .sentinel-direction-1 {
            --bg-deep: #0f172a;
            --bg-surface: #1e293b;
            --bg-card: #334155;
            --bg-card-hover: #475569;
            --bg-subtle: rgba(255, 255, 255, 0.05);
            --border-dim: #475569;
            --border-bright: #94a3b8;
            --cyan-primary: #38bdf8;
            --blue-accent: #60a5fa;
            --amber-warn: #fbbf24;
            --red-crit: #f87171;
            --emerald-safe: #34d399;
            --violet-band: #a78bfa;
            --text-main: #f8fafc;
            --text-muted: #cbd5e1;
            --text-faint: #94a3b8;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .sentinel-direction-1 .mission-hero {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--bg-surface);
            border: 1px solid var(--border-dim);
            padding: 16px 20px;
            border-radius: 4px;
        }"""
content = content.replace(css_old, css_new)

content = content.replace('border-left: 3px solid var(--cyan-primary);', '')
content = content.replace('background: linear-gradient(90deg, rgba(16, 20, 29, 0.95) 0%, rgba(11, 14, 20, 0.85) 100%);', 'background: var(--bg-surface);')
content = content.replace('box-shadow: 0 0 15px var(--cyan-glow);', 'opacity: 0.9;')
content = content.replace('DIRECTION 1 SCIENTIFIC SUITE', 'RESEARCH MATRIX')

# Delete VISUALIZATION 1 (Fake data SVG chart)
start_idx = content.find('{/*  VISUALIZATION 1:')
end_idx = content.find('</section>', start_idx)
if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx+10:]

# Delete GRAPH 3 (Precision-Recall Fake SVG chart)
start_idx = content.find('{/*  GRAPH 3:')
end_idx = content.find('</section>', start_idx) 
if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + '</div>\n' + content[end_idx:]

# Fix GRAPH 2 (Reliability Diagram)
# Remove raw uncalibrated curve
content = content.replace('<path d="M 60,300 L 102,285 L 144,272 L 186,252 L 228,230 L 270,188 L 312,126 L 354,82 L 396,62 L 438,48 L 480,44" fill="none" stroke="var(--red-crit)" strokeDasharray="5 3" strokeWidth="1.8" />', '')

# Replace Veyra curve with dynamic data
real_curve = """<path d={`M 60,300 ` + relDiag.prob_pred.map((p, i) => `L ${60 + p * 420},${300 - relDiag.prob_true[i] * 260}`).join(' ')} fill="none" stroke="var(--cyan-primary)" strokeWidth="2.6" />
{relDiag.prob_pred.map((p, i) => (
  <circle key={i} cx={60 + p * 420} cy={300 - relDiag.prob_true[i] * 260} fill="var(--cyan-primary)" r="4" />
))}"""
content = content.replace('<path d="M 60,300 L 102,286 L 144,246 L 186,220 L 228,194 L 270,168 L 312,143 L 354,116 L 396,90 L 438,66 L 480,42" fill="none" stroke="var(--cyan-primary)" strokeWidth="2.6" />', real_curve)

# Delete hardcoded circles using regex
content = re.sub(r'<circle cx="[0-9]+" cy="[0-9]+" fill="var\(--cyan-primary\)" r="4" />', '', content)

with open('d:/Veyra-/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/frontend/src/components/ResearchMetrics.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Finished rewriting UI!")
