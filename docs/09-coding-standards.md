# Enterprise Agentic AI Platform

# 08 - Coding Standards

Version: 1.0

Status: Active

---

# Purpose

This document defines the coding standards for the Enterprise Agentic AI Platform.

Every contributor should follow these standards to ensure the codebase remains:

- Consistent
- Readable
- Scalable
- Testable
- Maintainable

---

# 1. General Principles

Follow:

- SOLID
- DRY
- KISS
- YAGNI
- Clean Code

Every file should have a single responsibility.

---

# 2. Project Architecture

The project follows:

Feature Driven Architecture

↓

Reusable Components

↓

Design System

↓

Material UI

Never place business logic inside UI components.

---

# 3. Folder Structure

src/

app/

components/

features/

hooks/

providers/

services/

store/

theme/

types/

utils/

Feature folders own their own components.

Reusable UI belongs inside:

components/ui

---

# 4. Naming Conventions

Folders

kebab-case

Example

knowledge-hub

workflow-builder

---

React Components

PascalCase

Example

AppButton

AgentCard

DashboardHeader

---

Hooks

camelCase

Example

useAuth

useDashboard

useChat

---

Utilities

camelCase

Example

formatDate

calculateCost

parseMarkdown

---

Types

PascalCase

Example

User

Document

ChatMessage

---

Interfaces

PascalCase

Example

UserDto

DashboardMetrics

NavigationItem

---

Enums

PascalCase

UserRole

AgentStatus

DocumentState

---

Constants

UPPER_SNAKE_CASE

Example

DEFAULT_PAGE_SIZE

DRAWER_WIDTH

HEADER_HEIGHT

---

# 5. TypeScript Rules

Always use

strict mode

Never use

any

Prefer

unknown

instead.

Example

❌

function process(data: any)

✔

function process(data: unknown)

Always type:

Props

API responses

State

Hooks

Context

---

# 6. React Standards

Always

Functional Components

Use Hooks

Named Exports (except Next.js page/layout files)

Memoize expensive calculations

Split large components

Avoid prop drilling

Prefer composition

---

# 7. Next.js Standards

Use

App Router

Server Components by default

Client Components only when required

Keep page.tsx minimal

Example

page.tsx

↓

Feature Component

↓

Business Components

↓

UI Components

---

# 8. Material UI Standards

Use

sx

for styling.

Never use

style={{}}

Never use

system props

❌

<Box p={2}>

✔

<Box
    sx={{
        p:2
    }}
>

Never hardcode colors.

Use

primary.main

background.paper

text.primary

divider

success.main

warning.main

---

# 9. Component Structure

Example

const DashboardCard = () => {

    return (

        <AppCard>

        </AppCard>

    );

};

export default DashboardCard;

Imports

↓

Types

↓

Constants

↓

Component

↓

Export

---

# 10. Styling Rules

Prefer

sx

Avoid

CSS Modules

Inline styles

Global styles

Only

globals.css

is allowed globally.

Everything else belongs inside

sx

---

# 11. API Standards

Never call axios directly from components.

Correct

Component

↓

Hook

↓

Service

↓

Axios

Wrong

Component

↓

Axios

---

# 12. State Management

Global

Zustand

Server

TanStack Query

Component

React State

Never duplicate server state inside Zustand.

---

# 13. Error Handling

Every async function must

try

catch

Every page must have

Loading

Empty

Error

States

---

# 14. Forms

Use

React Hook Form

Validation

Zod

Never use uncontrolled forms.

---

# 15. Imports

Order

React

↓

Third Party

↓

Internal

↓

Styles

Use absolute imports

✔

@/components/ui

Avoid

../../../

---

# 16. Comments

Code should explain itself.

Avoid

// increment i

Use comments only for

Business Rules

Complex Algorithms

Architecture Decisions

---

# 17. Logging

Frontend

console.error

during development only.

Backend

Structured Logging

No console.log in production.

---

# 18. Testing

Every feature should include

Unit Tests

Integration Tests

Accessibility Tests

Future

E2E

Playwright

---

# 19. Git

Branch Naming

feature/dashboard

feature/chat

bugfix/login

hotfix/token-refresh

Commit Style

feat:

fix:

refactor:

docs:

test:

style:

perf:

chore:

Example

feat(chat): add streaming response component

---

# 20. Performance

Lazy Load

Heavy Components

Virtualize

Large Tables

Debounce

Search

Memoize

Expensive Calculations

---

# 21. Accessibility

Keyboard Navigation

Focus Indicators

ARIA Labels

Screen Reader Support

WCAG AA

---

# 22. Security

Never expose secrets.

Validate all inputs.

Sanitize Markdown.

Escape HTML.

Use RBAC.

Audit sensitive actions.

---

# 23. Documentation

Every feature should contain

README.md

Example

features/

chat/

README.md

Describes

Purpose

Architecture

Flow

API

Future Improvements

---

# 24. Definition of Done

A feature is complete only when

✓ TypeScript passes

✓ ESLint passes

✓ Responsive

✓ Accessible

✓ Loading State

✓ Empty State

✓ Error State

✓ Tested

✓ Documented

✓ Reviewed

✓ Merged

---

# 25. Engineering Principles

Write code for the next developer.

Prefer readability over cleverness.

Optimize only after measuring.

Small reusable components beat large monolithic components.

Every component should have one responsibility.

Every feature should be independently testable.

Every module should be replaceable.

Architecture should evolve without breaking existing features.