import sys

with open('d:/Veyra-/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/frontend/src/components/ResearchMetrics.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '{/*  Configuration Toolbar  */}' in line:
        start_idx = i
    if start_idx != -1 and i > start_idx and '</section>' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    replacement = """{/*  Global Evaluation Banner  */}
<section className="filter-toolbar" style={{ padding: '12px 20px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-dim)' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    <div>
      <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Global Model Evaluation Benchmark</h3>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)', marginTop: '4px' }}>
        Dataset: {metrics.sample_count.toLocaleString()} validation samples • Model Version: {metrics.model_version} • Scope: Full Grid
      </div>
    </div>
    <div>
      <button className="btn btn-cyan" onClick={handleEvaluate} disabled={isEvaluating} style={{ padding: '8px 18px' }}>
        <i data-lucide="play" style={{ width: '14px', height: '14px' }}></i> {isEvaluating ? "Evaluating..." : "Refresh Benchmark Metrics"}
      </button>
    </div>
  </div>
</section>
"""
    new_content = ''.join(lines[:start_idx]) + replacement + ''.join(lines[end_idx+1:])
    with open('d:/Veyra-/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/Veyra-Know-When-Forecasts-May-Fail-VERSION-3-main/frontend/src/components/ResearchMetrics.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Toolbar replaced.')
else:
    print('Not found')
