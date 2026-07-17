# Helix / Hope School — UI screen inventory

Last reviewed: 18 July 2026. Scores are screenshot-based visual scores, not test scores. Screenshot paths refer to the local `artifacts/final` audit output.

| Route | Role | Primary task | Current score | Target composition | Status | Desktop screenshot | Mobile screenshot |
| --- | --- | --- | ---: | --- | --- | --- | --- |
| `/welcome` | Marketing | Understand Hope School and sign in | 78 | Editorial promise + proof | Existing | `welcome-desktop.png` | — |
| `/login`, `/forgot-password`, `/first-login` | Authentication | Gain or restore access | 76 | Focused access form | Existing | `login-desktop.png` | `login-mobile.png` |
| `/student` | Student | Find and take the next learning action | 87 | Continue-learning feature + attention bands | Redesigned | `student-desktop.png` | `student-mobile.png` |
| `/student/courses` | Student | Resume and manage courses | 88 | Featured course + compact course library | Redesigned | `courses-desktop.png` | `courses-mobile.png` |
| `/student/sessions` | Student | Join a class and prepare materials | 86 | Next-class split pane + timeline | Redesigned | `sessions-desktop.png` | `sessions-mobile.png` |
| `/student/assignments` | Student | Find and complete the next assignment | 86 | Priority strip + compact work queue | Redesigned | `assignments-desktop.png` | `assignments-mobile.png` |
| `/student/assignments/:id`, `/student/grades/:id` | Student | Complete work and review feedback | 73 | Focused work and feedback view | Planned | — | — |
| `/student/ai`, `/student/assessments` | Student | Practise and assess | 72 | Guided practice flow | Planned | — | `ai-mobile.png` |
| `/profile`, `/notifications` | Shared | Manage account and updates | 74 | Settings sections + notification feed | Planned | — | — |
| `/mentor` | Mentor | Prioritise teaching work | 73 | Teaching agenda + action queue | Planned | — | — |
| `/mentor/classes`, `/:classId`, `/session`, `/attendance`, `/materials`, `/assignments` | Mentor | Run classes and prepare teaching | 72 | Schedule, roster and task views | Planned | — | — |
| `/mentor/grading` | Mentor | Grade efficiently | 75 | Submission queue + working pane | Existing | — | `grading-tablet.png` |
| `/coordinator`, `/programs`, `/:programId`, `/courses`, `/classes`, `/enrollment` | Coordinator | Operate programmes | 71 | Operational data views | Planned | — | — |
| `/admin`, `/users`, `/users/new`, `/users/import`, `/config` | Admin | Manage people and platform | 71 | Dense, task-specific admin views | Planned | — | — |
| `/:role/wallet`, `/mentor/meet` | Shared | Complete supporting account/meeting tasks | 70 | Contextual utility views | Planned | — | — |

## Flow notes

- The available student learning flow connects **My Courses → Sessions**. There is currently no standalone course-detail, lesson or quiz route; visual work does not invent routes that do not exist.
- The first implementation pass establishes the shared DNA across the student’s highest-frequency flow. Remaining screens should be redesigned by task group, not by applying a single course-card template.
