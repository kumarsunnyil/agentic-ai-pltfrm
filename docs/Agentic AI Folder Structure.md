Agentic AI Folder Structure


		┌────────────────────────────────────────────────────────────────────────────┐
		│ ☰  Agentic AI    Dashboard > Home      Search...     🌙 🔔 👤            │
		├──────────────┬─────────────────────────────────────────────────────────────┤
		│              │                                                             │
		│ Dashboard    │                                                             │
		│ AI Chat      │                Main Content                                 │
		│ Documents    │                                                             │
		│ Knowledge    │                                                             │
		│ AI Agents    │                                                             │
		│ Workflows    │                                                             │
		│ Analytics    │                                                             │
		│ Settings     │                                                             │
		└──────────────┴─────────────────────────────────────────────────────────────┘

src/
│
├── app/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── chat/
│   │   ├── documents/
│   │   ├── agents/
│   │   ├── analytics/
│   │   ├── settings/
│   │   └── layout.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── AppHeader.tsx
│   │   ├── AppSidebar.tsx
│   │   ├── SidebarItem.tsx
│   │   ├── Logo.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   ├── NotificationMenu.tsx
│   │   └── UserMenu.tsx
│   │
│   ├── common/
│   └── ui/
│
├── config/
├── features/
├── hooks/
├── providers/
├── services/
├── store/
├── theme/
├── types/
└── utils/