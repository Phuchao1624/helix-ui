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
  const routeCases = [
    ['welcome', '/welcome'], ['login', '/login'], ['forgot-password', '/forgot-password'], ['first-login', '/first-login'],
    ['profile', '/profile'], ['notifications', '/notifications'], ['wallet', '/student/wallet'],
    ['admin-overview', '/admin'], ['admin-users', '/admin/users'], ['admin-user-new', '/admin/users/new'], ['admin-user-import', '/admin/users/import'], ['admin-config', '/admin/config'],
    ['coordinator-overview', '/coordinator'], ['coordinator-programs', '/coordinator/programs'], ['coordinator-program-detail', '/coordinator/programs/PRG-01'], ['coordinator-courses', '/coordinator/courses'], ['coordinator-classes', '/coordinator/classes'], ['coordinator-enrollment', '/coordinator/enrollment'],
    ['mentor-overview', '/mentor'], ['mentor-classes', '/mentor/classes'], ['mentor-class-detail', '/mentor/classes/A2-01'], ['mentor-session', '/mentor/session'], ['mentor-attendance', '/mentor/attendance'], ['mentor-materials', '/mentor/materials'], ['mentor-assignments', '/mentor/assignments'], ['mentor-grading', '/mentor/grading'], ['mentor-meet', '/mentor/meet'],
    ['student-overview', '/student'], ['student-courses', '/student/courses'], ['student-sessions', '/student/sessions'], ['student-assignments', '/student/assignments'], ['student-assignment-detail', '/student/assignments/AS-108'], ['student-grade-feedback', '/student/grades/AS-102'], ['student-ai', '/student/ai'], ['student-assessments', '/student/assessments'],
    ['role-guard', '/mentor/ai'], ['not-found', '/route-does-not-exist'],
  ];
  const viewports = [
    { label: 'desktop', width: 1440, height: 900 },
    { label: 'desktop-1280', width: 1280, height: 800 },
    { label: 'tablet', width: 768, height: 1024 },
    { label: 'mobile', width: 390, height: 844 },
  ];
  const shots = routeCases.flatMap(([name, route]) => viewports.map((viewport) => ({ name: `${name}-${viewport.label}`, route, ...viewport })));

  for (const shot of shots) {
    const context = await browser.newContext({ viewport: { width: shot.width, height: shot.height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('console', (message) => { if (message.type() === 'error') findings.consoleErrors.push(`${shot.name}: ${message.text()}`); });
    page.on('pageerror', (error) => findings.pageErrors.push(`${shot.name}: ${error.message}`));
    await page.goto(`${origin}/#${shot.route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(120);
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
  await page.goto(`${origin}/#/student`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Mở điều hướng' }).click();
  await page.getByLabel('Điều hướng trên thiết bị di động').getByRole('link', { name: 'Khoá học' }).click();
  await page.waitForURL(/#\/student\/courses/);
  findings.interactions.push('Mobile navigation: passed');

  await page.goto(`${origin}/#/student/assignments`, { waitUntil: 'domcontentloaded' });
  const activeTab = page.getByRole('tab', { selected: true });
  await activeTab.focus();
  await activeTab.press('ArrowRight');
  if (await page.getByRole('tab', { name: 'Cần làm' }).getAttribute('aria-selected') !== 'true') throw new Error('Arrow-key tab navigation failed.');
  findings.interactions.push('Keyboard tabs: passed');

  await page.goto(`${origin}/#/coordinator/programs`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Create program' }).click();
  await page.getByRole('dialog').waitFor();
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'detached' });
  findings.interactions.push('Modal open/Escape close: passed');

  await page.goto(`${origin}/#/login`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/#\/student$/);
  findings.interactions.push('Demo sign-in: passed');

  const tabRoutes = [
    ['profile', '/profile'], ['notifications', '/notifications'], ['admin-users', '/admin/users'],
    ['admin-config', '/admin/config'], ['mentor-class', '/mentor/classes/A2-01'],
    ['mentor-assignments', '/mentor/assignments'], ['student-sessions', '/student/sessions'],
    ['student-assignments', '/student/assignments'],
  ];
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [name, route] of tabRoutes) {
    await page.goto(`${origin}/#${route}`, { waitUntil: 'domcontentloaded' });
    const tabs = page.getByRole('tab');
    for (let index = 0; index < await tabs.count(); index += 1) {
      await tabs.nth(index).click();
      await page.waitForTimeout(60);
      await page.screenshot({ path: path.join(output, `${name}-view-${index + 1}.png`) });
    }
  }
  findings.interactions.push('All stateful tab views: passed');

  await page.goto(`${origin}/#/admin/users/import`, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(output, 'admin-user-import-step-1.png') });
  await page.locator('.form-actions .button').last().click();
  await page.screenshot({ path: path.join(output, 'admin-user-import-step-2.png') });
  await page.locator('.form-actions .button').last().click();
  await page.screenshot({ path: path.join(output, 'admin-user-import-step-3.png') });
  findings.interactions.push('Import wizard states: passed');
  await context.close();

  const failed = findings.consoleErrors.length || findings.pageErrors.length || findings.overflow.length || findings.accessibility.length;
  console.log(JSON.stringify(findings, null, 2));
  if (failed) process.exitCode = 1;
} finally {
  await browser?.close();
  vite.kill();
}
