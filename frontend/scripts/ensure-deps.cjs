const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const frontendRoot = path.join(__dirname, '..');
const nodeModulesDir = path.join(frontendRoot, 'node_modules');
const vitestBin = path.join(nodeModulesDir, '.bin', process.platform === 'win32' ? 'vitest.cmd' : 'vitest');

if (!fs.existsSync(nodeModulesDir) || !fs.existsSync(vitestBin)) {
  console.log('\n[INFO] Frontend dependencies are missing. Automatically running npm install...');
  execSync('npm install', { cwd: frontendRoot, stdio: 'inherit' });
  console.log('[INFO] Dependencies installed successfully.\n');
}
