import fs from 'node:fs/promises';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
const css = await fs.readFile(new URL('../src/styles/index.css', import.meta.url), 'utf8');
const vietnameseText = /[ăâđêôơưĂÂĐÊÔƠƯáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/;
const mojibakeText = /Ã|Â|á»|Ä|Æ/;

const routes = [
  '/welcome','/login','/forgot-password','/first-login','/profile','/notifications',
  '/admin','/admin/users','/admin/users/new','/admin/users/import','/admin/config','/admin/timetable',
  '/coordinator','/coordinator/programs','/coordinator/programs/PRG-01','/coordinator/courses','/coordinator/classes','/coordinator/enrollment','/coordinator/timetable',
  '/mentor','/mentor/classes','/mentor/classes/a2-01','/mentor/session','/mentor/attendance','/mentor/materials','/mentor/assignments','/mentor/grading','/mentor/meet','/mentor/timetable',
  '/student','/student/courses','/student/sessions','/student/timetable','/student/assignments','/student/assignments/as-108','/student/grades/as-102','/student/ai','/student/assessments',
  '/student/wallet','/student/ai/session'
];

function render(path) {
  return renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(App)));
}

for (const route of routes) {
  const markup = render(route);
  if (!markup || markup.length < 100) throw new Error(`Empty SSR output for ${route}`);
  if (vietnameseText.test(markup)) throw new Error(`Vietnamese UI text found in ${route}`);
  if (mojibakeText.test(markup)) throw new Error(`Mojibake found in ${route}`);
  console.log(`OK ${route} ${markup.length}`);
}

async function writePreview(path, filename, title) {
  const markup = render(path);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${css}</style></head><body><div id="root">${markup}</div></body></html>`;
  await fs.writeFile(new URL(`../artifacts/ssr/${filename}`, import.meta.url), html);
}

await fs.mkdir(new URL('../artifacts/ssr/', import.meta.url), { recursive: true });
await writePreview('/login', 'preview-login-static.html', 'HELIX Login Preview');
await writePreview('/student', 'preview-student-static.html', 'HELIX Student Preview');
await writePreview('/mentor/grading', 'preview-grading-static.html', 'HELIX Grading Preview');
await vite.close();
