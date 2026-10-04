import re
import sys

orig_path = 'd:/Veyra-/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/frontend/src/components/ResearchMetrics.orig.tsx'
new_path = 'd:/Veyra-/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/frontend/src/components/ResearchMetrics.tsx'

try:
    with open(orig_path, 'r', encoding='utf-16') as f:
        orig_code = f.read()
except UnicodeDecodeError:
    with open(orig_path, 'r', encoding='utf-8') as f:
        orig_code = f.read()

with open(new_path, 'r', encoding='utf-8') as f:
    new_code = f.read()

# Extract imports and FROZEN_V3_METRICS and state from orig_code
imports_match = re.search(r'import React.*?from \'react\';\nimport \{ ComprehensiveEvaluationResponse \} from \'../api/types\';\nimport \{ apiClient \} from \'../api/client\';', orig_code, re.DOTALL)
frozen_match = re.search(r'const FROZEN_V3_METRICS: ComprehensiveEvaluationResponse = \{.*?\n\};', orig_code, re.DOTALL)
component_state_match = re.search(r'export const ResearchMetrics: React\.FC = \(\) => \{\n(.*?)return \(', orig_code, re.DOTALL)

if not imports_match or not frozen_match or not component_state_match:
    print('Failed to extract original state.')
    sys.exit(1)

imports = imports_match.group(0)
frozen = frozen_match.group(0)
component_state = component_state_match.group(1)

# Add the imports back
if 'import { ComprehensiveEvaluationResponse }' not in new_code:
    new_code = new_code.replace("import React from 'react';", f"{imports}\n\n{frozen}")

# Add the state variables back
if 'const [metrics, setMetrics]' not in new_code:
    new_code = new_code.replace("export const ResearchMetrics: React.FC = () => {\n  return (", f"export const ResearchMetrics: React.FC = () => {{\n{component_state}\n  return (")

# Replace hardcoded numbers with variables for data binding
new_code = re.sub(r'>0\.2124<', r'>{metrics.discrimination_and_probability.pr_auc.toFixed(4)}<', new_code)
new_code = re.sub(r'>0\.0537<', r'>{metrics.discrimination_and_probability.brier_score.toFixed(4)}<', new_code)
new_code = re.sub(r'>0\.7698<', r'>{metrics.discrimination_and_probability.roc_auc.toFixed(4)}<', new_code)
new_code = re.sub(r'>0\.0142<', r'>{(metrics.discrimination_and_probability.expected_calibration_error).toFixed(4)}<', new_code)
new_code = re.sub(r'>24\.0<', r'>{metrics.warning_lead_time_gain.median_lead_time_gain_hours.toFixed(1)}<', new_code)
new_code = re.sub(r'>26\.4%<', r'>{(metrics.warning_lead_time_gain.lead_time_gain_24h_gain_pct * 100).toFixed(1)}%<', new_code)
new_code = re.sub(r'>88\.4%<', r'>{(metrics.warning_lead_time_gain.pct_flagged_24h_veyra * 100).toFixed(1)}%<', new_code)

# Brighten text colors to fix "writing colour"
new_code = new_code.replace('--text-muted: #94a3b8;', '--text-muted: #cbd5e1;')
new_code = new_code.replace('--text-faint: #64748b;', '--text-faint: #94a3b8;')

# Fix the buttons problem: Add an onClick handler to buttons so they aren't "dead"
new_code = new_code.replace('<button className="btn btn-cyan"', '<button className="btn btn-cyan" onClick={() => apiClient.getComprehensiveEvaluation("v3").then(({data}) => data && setMetrics(data))}')
new_code = new_code.replace('<button className="btn btn-secondary"', '<button className="btn btn-secondary" onClick={() => alert("Export functionality coming soon")}')

with open(new_path, 'w', encoding='utf-8') as f:
    f.write(new_code)
print('Fixed data binding, colors, and buttons.')
