# HELIX UI

### Hope English Learning & Intelligent Experience

HELIX UI is a production-style frontend prototype for Hope School: a focused English learning workspace that connects students, mentors, coordinators, and administrators in one consistent experience.

The MVP is designed around a simple promise:

> **Practice with purpose. Track progress with confidence. Keep moving forward.**

This repository contains the complete frontend implementation of the HELIX MVP, including the public welcome experience, role-based workspaces, learning workflows, mock persistence, responsive layouts, and the refined HELIX visual system.

## Product highlights

- A public welcome page for unauthenticated visitors.
- Centered, animated HELIX login experience with role preview.
- Role-based workspaces for Admin, Coordinator, Mentor, and Student.
- Student-only AI Practice and Tests experiences.
- Mentor-only Google Meet and attendance workspace.
- Program → Course → Class → Enrollment workflow.
- Session → Attendance → Materials workflow.
- Assignment → Submission → Grading → Feedback workflow.
- Mock data persistence through `localStorage`.
- Search, filters, status states, validation, toasts, confirmation flows, and responsive layouts.
- Accessible controls with labels, keyboard-friendly actions, focusable dialogs, and touch targets designed for mobile use.

## Experience map

| Role | Core capabilities |
| --- | --- |
| **Student** | Dashboard, courses, sessions, assignments, submissions, grades, AI Practice, Tests, mistake review |
| **Mentor** | Classes, class details, sessions, Google Meet setup, attendance, materials, assignments, grading |
| **Coordinator** | Programs, courses, classes, enrollment, operational dashboard |
| **Admin** | User management, bulk import, system configuration, operational dashboard |

## MVP screen catalogue

### Shared

| ID | Screen | Route |
| --- | --- | --- |
| SH-00 | Public Welcome | `#/welcome` |
| SH-01 | Login | `#/login` |
| SH-02 | Forgot Password | `#/forgot-password` |
| SH-03 | First Login Setup | `#/first-login` |
| SH-04 | Profile Settings | `#/profile` |
| SH-05 | Notification Center | `#/notifications` |

### Admin

| ID | Screen | Route |
| --- | --- | --- |
| AD-01 | Admin Dashboard | `#/admin` |
| AD-02 | User Management | `#/admin/users` |
| AD-03 | Create / Edit User | `#/admin/users/new` |
| AD-04 | Bulk Import Users | `#/admin/users/import` |
| AD-05 | System Configuration | `#/admin/config` |

### Coordinator

| ID | Screen | Route |
| --- | --- | --- |
| CO-01 | Coordinator Dashboard | `#/coordinator` |
| CO-02 | Programs and Program Detail | `#/coordinator/programs` |
| CO-03 | Course Management | `#/coordinator/courses` |
| CO-04 | Class Management | `#/coordinator/classes` |
| CO-05 | Student Enrollment | `#/coordinator/enrollment` |

### Mentor

| ID | Screen | Route |
| --- | --- | --- |
| ME-01 | Mentor Dashboard | `#/mentor` |
| ME-02 | My Classes | `#/mentor/classes` |
| ME-03 | Class Detail | `#/mentor/classes/a2-01` |
| ME-04 | Session Detail | `#/mentor/session` |
| ME-05 | Attendance Recording | `#/mentor/attendance` |
| ME-06 | Learning Materials | `#/mentor/materials` |
| ME-07 | Assignment Management | `#/mentor/assignments` |
| ME-08 | Grading Interface | `#/mentor/grading` |
| ME-09 | Meet and Attendance | `#/mentor/meet` |

### Student

| ID | Screen | Route |
| --- | --- | --- |
| ST-01 | Student Dashboard | `#/student` |
| ST-02 | My Courses | `#/student/courses` |
| ST-03 | Sessions | `#/student/sessions` |
| ST-04 | Assignment List | `#/student/assignments` |
| ST-05 | Assignment Detail and Submission | `#/student/assignments/as-108` |
| ST-06 | Grade and Feedback | `#/student/grades/as-102` |
| ST-07 | AI Practice | `#/student/ai` |
| ST-08 | Tests and Assessments | `#/student/assessments` |

## Technology

- React 19
- Vite 7
- React Router with `HashRouter`
- Lucide React icons
- Plain CSS design system with shared tokens and responsive breakpoints
- Browser `localStorage` for frontend mock persistence
- JavaScript with JSX; no backend or external API required for the MVP demo

## Repository structure

```text
src/
├── components/       Shared UI primitives and HELIX branding
├── data/              Mock datasets and localStorage store
├── layouts/           Authentication and role-based application shells
├── pages/
│   ├── shared/        Public, authentication, AI, tests, and account screens
│   ├── admin/         Administration workflows
│   ├── coordinator/   Academic operations workflows
│   ├── mentor/        Teaching and classroom workflows
│   └── student/       Learning and submission workflows
├── styles/            Design tokens, components, states, and responsive rules
├── App.jsx            Route registry and role guards
└── main.jsx           Application entry point
```

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, then visit `#/welcome` or `#/login`.

The login screen includes a demo role selector. After signing in, use the account menu in the top-right corner to preview another role.

### Demo login

```text
Email:    student@hope.edu.vn
Password: Hope@2026
```

The selected demo role controls the workspace preview. This is intentionally mock authentication and must be replaced with a real identity service before production deployment.

## Production build

```bash
npm run build
```

The optimized output is generated in `dist/`.

## Data and persistence

HELIX uses a shared mock store in `src/data/store.js` and seed data in `src/data/mockData.js`.

All demo changes are persisted in the browser with `localStorage`, including:

- users and role changes;
- programs, courses, classes, and enrollments;
- sessions and attendance;
- materials and assignments;
- submissions, grades, and feedback;
- notifications and AI learning activity.

To reset the demo state, clear the site data for the local Vite origin in the browser and reload the application.

## Design principles

- **Clear before clever:** content hierarchy comes first.
- **Warm, academic, and operational:** Hope School blue anchors the interface; orange is reserved for primary actions.
- **Structured surfaces:** layouts use clean panels, borders, tables, and split views instead of excessive cards.
- **Confident motion:** subtle transitions provide feedback without distracting from learning tasks.
- **Responsive by default:** desktop, tablet, and mobile layouts share one visual language.
- **Accessible interaction:** controls are labelled, keyboard reachable, and sized for touch.

## Validation

The current frontend has been validated with:

- successful Vite production builds;
- route coverage for the HELIX MVP screens;
- role-based navigation checks;
- Student-only access checks for AI Practice and Tests;
- responsive CSS rules for desktop, tablet, and mobile breakpoints;
- empty, loading, success, error, validation, and confirmation states across core workflows.

## Backend integration boundary

This repository is a frontend MVP prototype. Before production release, replace the mock store with:

- real authentication and session management;
- role-based authorization enforced by the backend;
- API services for academic and learning data;
- object storage for materials and submissions;
- payment and token ledger services;
- real Google Meet / Calendar integration;
- server-side attendance verification and audit logs;
- automated unit, integration, and end-to-end tests.

## Roadmap

1. Connect authentication and API services.
2. Add persistent database-backed learning records.
3. Integrate AI speech, pronunciation, writing, and adaptive review services.
4. Integrate payments and secure token transactions.
5. Add Google Meet creation and calendar synchronization.
6. Add CI checks, visual regression testing, and production observability.

## License

This project is currently an internal Hope School product prototype. Add the organization-approved license before public distribution.

## Maintainer

**Hope School · HELIX Product Team**

Built for learners who want every lesson to become a step forward.
