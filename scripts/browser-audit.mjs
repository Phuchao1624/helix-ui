import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';

const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'artifacts', 'final');
const port = 4174;
const origin = `http://127.0.0.1:${port}`;
const vite = spawn(process.execPath, [path.join(root, 'node_modules', 'vite', 'bin', 'vite.js'), '--host', '127.0.0.1', '--port', String(port)], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
});

await fs.mkdir(output, { recursive: true });

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { if ((await fetch(origin)).ok) return; } catch { /* server is still starting */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Vite preview did not start.');
}

const findings = { consoleErrors: [], pageErrors: [], overflow: [], accessibility: [], interactions: [] };
let browser;

try {
  await waitForServer();
  browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const shots = [
    { name: 'welcome-desktop', route: '/welcome', width: 1440, height: 900 },
    { name: 'login-desktop', route: '/login', width: 1440, height: 900 },
    { name: 'login-mobile', route: '/login', width: 390, height: 844 },
    { name: 'student-desktop', route: '/student', width: 1440, height: 900 },
    { name: 'student-desktop-1280', route: '/student', width: 1280, height: 800 },
    { name: 'welcome-wide', route: '/welcome', width: 1920, height: 1080 },
    { name: 'student-mobile-375', route: '/student', width: 375, height: 812 },
    { name: 'student-mobile', route: '/student', width: 390, height: 844 },
    { name: 'student-tablet', route: '/student', width: 768, height: 1024 },
    { name: 'grading-tablet', route: '/mentor/grading', width: 1024, height: 768 },
    { name: 'ai-mobile', route: '/student/ai', width: 390, height: 844 },
  ];

  for (const shot of shots) {
    const context = await browser.newContext({ viewport: { width: shot.width, height: shot.height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('console', (message) => { if (message.type() === 'error') findings.consoleErrors.push(`${shot.name}: ${message.text()}`); });
    page.on('pageerror', (error) => findings.pageErrors.push(`${shot.name}: ${error.message}`));
    await page.goto(`${origin}/#${shot.route}`, { waitUntil: 'networkidle' });
    const audit = await page.evaluate(() => {
      const rootElement = document.documentElement;
      const unnamedButtons = [...document.querySelectorAll('button')].filter((button) => !button.innerText.trim() && !button.getAttribute('aria-label') && !button.getAttribute('title')).length;
      const unlabeledControls = [...document.querySelectorAll('input:not([type="hidden"]), select, textarea')].filter((control) => !control.labels?.length && !control.getAttribute('aria-label') && !control.getAttribute('aria-labelledby')).length;
      return { scrollWidth: rootElement.scrollWidth, clientWidth: rootElement.clientWidth, unnamedButtons, unlabeledControls };
    });
    if (audit.scrollWidth > audit.clientWidth + 1) findings.overflow.push(`${shot.name}: ${audit.scrollWidth}px content in ${audit.clientWidth}px viewport`);
    if (audit.unnamedButtons || audit.unlabeledControls) findings.accessibility.push(`${shot.name}: ${audit.unnamedButtons} unnamed buttons, ${audit.unlabeledControls} unlabeled controls`);
    await page.screenshot({ path: path.join(output, `${shot.name}.png`) });
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(`${origin}/#/student`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Mở điều hướng' }).click();
  await page.getByLabel('Điều hướng trên thiết bị di động').getByRole('link', { name: 'Khoá học' }).click();
  await page.waitForURL(/#\/student\/courses/);
  findings.interactions.push('Mobile navigation: passed');

  await page.goto(`${origin}/#/student/assignments`, { waitUntil: 'networkidle' });
  const activeTab = page.getByRole('tab', { selected: true });
  await activeTab.focus();
  await activeTab.press('ArrowRight');
  if (await page.getByRole('tab', { name: 'To do' }).getAttribute('aria-selected') !== 'true') throw new Error('Arrow-key tab navigation failed.');
  findings.interactions.push('Keyboard tabs: passed');

  await page.goto(`${origin}/#/coordinator/programs`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Create program' }).click();
  await page.getByRole('dialog').waitFor();
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'detached' });
  findings.interactions.push('Modal open/Escape close: passed');

  await page.goto(`${origin}/#/login`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/#\/student$/);
  findings.interactions.push('Demo sign-in: passed');
  await context.close();

  const failed = findings.consoleErrors.length || findings.pageErrors.length || findings.overflow.length || findings.accessibility.length;
  console.log(JSON.stringify(findings, null, 2));
  if (failed) process.exitCode = 1;
} finally {
  await browser?.close();
  vite.kill();
}
