import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';

const root = path.resolve(import.meta.dirname, '..');
const mode = process.argv[2] || 'compare';
const baselineDir = path.join(root, 'artifacts', 'header-baseline');
const actualDir = path.join(root, 'artifacts', 'header-actual');
const output = mode === 'capture' ? baselineDir : actualDir;
const port = 4176;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [path.join(root, 'node_modules', 'vite', 'bin', 'vite.js'), '--host', '127.0.0.1', '--port', String(port)], { cwd: root, stdio: 'ignore' });
const cases = [
  { name: 'student-desktop', route: '/student/courses', width: 1440, height: 900 },
  { name: 'student-mobile', route: '/student/courses', width: 390, height: 844 },
  { name: 'mentor-desktop', route: '/mentor/grading', width: 1440, height: 900 },
  { name: 'mentor-mobile', route: '/mentor/grading', width: 390, height: 844 },
  { name: 'admin-desktop', route: '/admin/users', width: 1440, height: 900 },
  { name: 'admin-mobile', route: '/admin/users', width: 390, height: 844 },
];

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { if ((await fetch(origin)).ok) return; } catch { /* starting */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Vite server did not start for Header regression.');
}

let browser;
try {
  await fs.mkdir(output, { recursive: true });
  await waitForServer();
  browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  for (const item of cases) {
    const page = await browser.newPage({ viewport: { width: item.width, height: item.height }, reducedMotion: 'reduce' });
    await page.goto(`${origin}/#${item.route}`, { waitUntil: 'networkidle' });
    const target = path.join(output, `${item.name}.png`);
    await page.locator('.global-header').screenshot({ path: target });
    if (mode !== 'capture') {
      const baseline = await fs.readFile(path.join(baselineDir, `${item.name}.png`));
      const actual = await fs.readFile(target);
      if (!baseline.equals(actual)) throw new Error(`Header pixel mismatch: ${item.name}`);
    }
    await page.close();
    console.log(`${mode === 'capture' ? 'CAPTURED' : 'MATCH'} ${item.name}`);
  }
} finally {
  await browser?.close();
  server.kill();
}
