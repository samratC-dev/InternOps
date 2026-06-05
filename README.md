# InternOps

Enterprise Workforce Management and Intern Operations Platform

InternOps is a production-grade workforce management system built for structured intern operations. It centralizes attendance, performance tracking, social task management, proof verification, meetings, notifications, reporting, and audit logging while enforcing strict hierarchical access control.

The platform follows a security-first architecture with Role-Based Access Control (RBAC), ownership validation, JWT authentication, refresh token rotation, Argon2 password hashing, audit logging, and PostgreSQL-backed persistence.

---

## Executive Summary

InternOps manages the complete lifecycle of workforce operations through a hierarchical structure:

Admin → Senior TL → TL → Captain → Intern

The platform ensures that users can only access resources that belong to their authorized hierarchy chain. Every sensitive action is validated, logged, and auditable.

---

## Core Capabilities

| Module | Description |
|----------|-------------|
| Authentication | JWT authentication with refresh token rotation |
| User Management | User lifecycle, profile management, account control |
| Hierarchy Management | Team structure and reporting chain management |
| Attendance | Single and bulk attendance tracking |
| Ratings | Historical performance ratings |
| Social Tasks | Task assignment and completion workflow |
| Proof Verification | Screenshot-based proof validation |
| Meetings | Team meeting scheduling and management |
| Notifications | In-app notification system |
| Analytics | Attendance and performance insights |
| Reports | Exportable operational reports |
| Sessions | Active session management and revocation |
| Audit Logging | Immutable activity tracking |
| Security | RBAC, ownership checks, CSRF, rate limiting |

---

## System Architecture

```text
┌──────────────────────────────────────────────┐
│                  Frontend                    │
│          React + Vite + TailwindCSS          │
└──────────────────────┬───────────────────────┘
                       │
                       │ REST API
                       ▼
┌──────────────────────────────────────────────┐
│                Fastify Backend               │
├──────────────────────────────────────────────┤
│ Authentication                              │
│ Authorization (RBAC)                        │
│ Ownership Validation                        │
│ Attendance Module                           │
│ Ratings Module                              │
│ Social Tasks Module                         │
│ Meetings Module                             │
│ Reports & Analytics                         │
│ Audit Logging                               │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                 PostgreSQL                   │
│            Raw SQL + pg Driver              │
└──────────────────────────────────────────────┘

Optional:
┌──────────────────────────────────────────────┐
│               Redis (Upstash)               │
│      Refresh Token & Session Storage        │
└──────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology |
|---------|------------|
| Backend | Node.js, Fastify |
| Frontend | React, Vite, TailwindCSS |
| Database | PostgreSQL |
| Query Layer | Raw SQL using pg |
| Authentication | JWT, Argon2 |
| Validation | Zod |
| State Management | Zustand |
| Data Fetching | TanStack Query |
| API Client | Axios |
| Documentation | Swagger/OpenAPI |
| Cache | Redis (Optional) |
| DevOps | Git, GitHub, PowerShell |

---

## Security Architecture

InternOps follows a defense-in-depth model.

### Authentication

- JWT Access Tokens
- Refresh Token Rotation
- Argon2 Password Hashing
- Session Revocation

### Authorization

- Role-Based Access Control
- Ownership Validation
- Hierarchical Permission Enforcement

### Protection Layers

- Helmet Security Headers
- CSRF Protection
- Rate Limiting
- Input Sanitization
- Brute Force Prevention
- Audit Logging

---

## Role Hierarchy

| Role | Access Level |
|--------|-------------|
| Admin | Full platform control |
| Senior TL | Department management |
| TL | Team management |
| Captain | Direct intern supervision |
| Intern | Self-service access |

Hierarchy ownership is enforced recursively to prevent unauthorized access.

---

## Database Overview

### Primary Tables

| Table | Purpose |
|---------|---------|
| users | User accounts |
| departments | Department records |
| attendance | Daily attendance |
| ratings | Performance ratings |
| social_tasks | Task assignments |
| proof_submissions | Uploaded proofs |
| notifications | User notifications |
| meetings | Meeting schedules |
| meeting_attendees | Meeting participants |
| audit_logs | Audit records |
| refresh_tokens | Session tokens |
| password_reset_tokens | Password resets |
| login_attempts | Security tracking |

### Design Principles

- UUID Primary Keys
- Foreign Key Constraints
- Indexed Queries
- Soft Deletes
- Transaction Support
- JSONB Audit Records

---

## Major Modules

### Authentication
Login, logout, refresh token rotation, password reset.

### Users
User management, profile updates, account lifecycle.

### Attendance
Single attendance, bulk attendance, statistics.

### Ratings
Historical ratings with manager validation.

### Social Tasks
Task creation, assignment, proof submission, verification.

### Meetings
Meeting scheduling and attendee management.

### Analytics
Attendance trends, top performers, operational insights.

### Reports
CSV exports and summary reports.

### Sessions
Device tracking and session revocation.

### Audit
Immutable logging of sensitive actions.

---

## Project Structure

```text
InternOps/
│
├── backend/
│   ├── migrations/
│   ├── seeds/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── modules/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── lib/
│   └── package.json
│
├── docs/
├── scripts/
└── README.md
```

---

## Environment Variables

| Variable | Purpose |
|------------|----------|
| DATABASE_URL | PostgreSQL connection |
| JWT_SECRET | JWT signing secret |
| PORT | Application port |
| NODE_ENV | Environment mode |
| CORS_ORIGIN | Allowed frontend origin |
| UPSTASH_REDIS_REST_URL | Redis URL |
| UPSTASH_REDIS_REST_TOKEN | Redis Token |
| UPTOSKILLS_BASE_URL | Future integration |
| UPTOSKILLS_API_KEY | Future integration |

---

## Quick Start

### Clone Repository

    git clone https://github.com/rajat-wyrm/InternOps.git
    cd InternOps

### Install Dependencies

    cd backend
    npm install

    cd ../frontend
    npm install

### Configure Environment

    copy .env.example .env

Update environment variables.

### Run Database

    cd backend
    npm run migrate
    npm run seed

### Start Backend

    npm run dev

### Start Frontend

    cd frontend
    npm run dev

Backend:
http://localhost:5000

Frontend:
http://localhost:5173

Swagger:
http://localhost:5000/docs

---

## Deployment

Recommended Production Stack

- Ubuntu Server
- Nginx Reverse Proxy
- PM2 Process Manager
- PostgreSQL
- Redis
- SSL/TLS Certificates

Example:

    pm2 start backend/src/app.js --name internops
    pm2 save

---

## Future Roadmap

- Uptoskills API Integration
- Real-Time Notifications
- Mobile Application
- Advanced Analytics Dashboard
- S3 Object Storage
- Multi-Tenant Architecture
- Organization Management
- Automated Reporting

---

## License

Proprietary Software

All rights reserved.

Unauthorized use, distribution, or modification is prohibited.

---

## Maintainer

Rajat Wyrm

GitHub:
https://github.com/rajat-wyrm

Repository:
https://github.com/rajat-wyrm/InternOps