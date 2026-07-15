# HELIX — Hope English Learning & Intelligent eXperience

React/Vite production-style front-end prototype — visual refresh v2.1 for Hope School, implemented from `HELIX_UIUX_Screen_Specification_v2` (MVP scope).

## Design direction

- A brighter Hope School blue is the dominant brand colour.
- Desktop navigation is header-first; no permanent sidebar. Mobile uses a compact header dropdown and student bottom navigation.
- Orange is reserved for primary action buttons.
- No gradients, neon AI palette, glassmorphism, or excessively rounded controls.
- System typography uses Segoe UI / Arial for clarity.
- Dense operational screens use tables, sections and split layouts instead of repeated card grids.
- Mobile-first student experience includes bottom navigation and 44px minimum controls.

## Tech stack

- React
- React Router with `HashRouter`
- Vite
- Lucide React icons
- Plain CSS design system with tokens and responsive breakpoints
- `vite-plugin-singlefile` for a self-contained preview build

## Project structure

```text
src/
├── components/       Shared UI primitives and brand logo
├── data/             Mock production-shaped datasets
├── layouts/          Authentication and role-based application shells
├── pages/
│   ├── shared/       SH-01 → SH-05
│   ├── admin/        AD-01 → AD-05
│   ├── coordinator/  CO-01 → CO-05
│   ├── mentor/       ME-01 → ME-08
│   └── student/      ST-01 → ST-06
├── styles/           Design tokens, components and responsive rules
├── App.jsx           Route registry
└── main.jsx          React entry point
```

## 29 MVP screens and routes

| ID | Screen | Route |
|---|---|---|
| SH-01 | Login | `#/login` |
| SH-02 | Forgot Password | `#/forgot-password` |
| SH-03 | First Login Setup | `#/first-login` |
| SH-04 | Profile Settings | `#/profile` |
| SH-05 | Notification Center | `#/notifications` |
| AD-01 | Admin Dashboard | `#/admin` |
| AD-02 | User Management | `#/admin/users` |
| AD-03 | Create / Edit User | `#/admin/users/new` |
| AD-04 | Bulk Import Users | `#/admin/users/import` |
| AD-05 | System Configuration | `#/admin/config` |
| CO-01 | Coordinator Dashboard | `#/coordinator` |
| CO-02 | Programs List & Detail | `#/coordinator/programs` |
| CO-03 | Course Management | `#/coordinator/courses` |
| CO-04 | Class Management | `#/coordinator/classes` |
| CO-05 | Student Enrollment | `#/coordinator/enrollment` |
| ME-01 | Mentor Dashboard | `#/mentor` |
| ME-02 | My Classes | `#/mentor/classes` |
| ME-03 | Class Detail | `#/mentor/classes/a2-01` |
| ME-04 | Session Detail & Management | `#/mentor/session` |
| ME-05 | Attendance Recording | `#/mentor/attendance` |
| ME-06 | Learning Materials Library | `#/mentor/materials` |
| ME-07 | Assignment Management | `#/mentor/assignments` |
| ME-08 | Grading Interface | `#/mentor/grading` |
| ST-01 | Student Dashboard | `#/student` |
| ST-02 | My Courses | `#/student/courses` |
| ST-03 | Sessions List & Detail | `#/student/sessions` |
| ST-04 | Assignment List | `#/student/assignments` |
| ST-05 | Assignment Detail & Submission | `#/student/assignments/as-108` |
| ST-06 | Grade & Feedback Detail | `#/student/grades/as-102` |

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite. The login screen includes a demo role selector. Inside the application, open the account menu at the upper-right of the header to switch roles.

## Production build

```bash
npm run build
```

The build output is generated in `dist/index.html`. It is a self-contained file with JavaScript and CSS inlined, so it can be opened or hosted without additional asset files.

## Validation completed

- Vite production build completed successfully.
- All 29 routes were server-rendered during QA and returned non-empty markup.
- Updated static screenshots were generated for Login, Student Dashboard and Mentor Grading after the header-first visual refresh.
- Responsive rules cover desktop, tablet and mobile layouts.

## Backend integration boundary

This package is a front-end prototype. Replace mock data in `src/data/mockData.js` with API services, authentication/JWT handling, Blob upload adapters and backend validation before deployment.
