# @shared/ui

Shared React component library extracted from AeroTrack. Provides the full design system — layout, components, dark mode, and utilities — for use across all apps in the monorepo.

---

## Installation

In any app within the monorepo, add the dependency:

```json
// apps/your-app/package.json
{
  "dependencies": {
    "@shared/ui": "*"
  }
}
```

Then run:

```bash
npm install
```

### Peer dependencies

Your app must have these installed:

```bash
npm install react react-dom
```

---

## Setup

### 1. Vite config

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 2. Import base styles

In your app's entry CSS file:

```css
/* src/index.css */
@import "@shared/ui/styles";
```

Or if you need to extend it:

```css
/* src/index.css */
@import "@shared/ui/styles";

/* App-specific overrides below */
```

### 3. Wrap your app in ThemeProvider

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@shared/ui';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

---

## Layout

### Basic app shell

```tsx
import { Layout, NavItem } from '@shared/ui';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings } from 'lucide-react';

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/',        icon: <LayoutDashboard size={18} /> },
  { label: 'Staff',     path: '/staff',   icon: <Users size={18} /> },
  { label: 'Settings',  path: '/settings', icon: <Settings size={18} /> },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Layout
      appName="Duty Change"
      navItems={navItems}
      activePath={pathname}
      onNavigate={navigate}
      headerRight={<UserMenu />}
    >
      {children}
    </Layout>
  );
}
```

**Layout props**

| Prop | Type | Required | Description |
|---|---|---|---|
| `appName` | `string` | Yes | App name shown in the sidebar logo area |
| `navItems` | `NavItem[]` | Yes | Sidebar navigation links |
| `onNavigate` | `(path: string) => void` | Yes | Called when a nav item is clicked |
| `activePath` | `string` | No | Highlights the matching nav item |
| `logo` | `ReactNode` | No | Custom logo element (replaces the default initials box) |
| `headerRight` | `ReactNode` | No | Slot in the top header bar (notifications, avatar, etc.) |

### Dark mode with user profile sync

```tsx
// Sync the theme from a user profile stored in your database
<ThemeProvider
  initialTheme={user?.theme}
  onThemeChange={(theme) => updateUserProfile({ theme })}
>
  <App />
</ThemeProvider>
```

### Toggle dark mode in a component

```tsx
import { useTheme } from '@shared/ui';
import { Sun, Moon } from 'lucide-react';

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

---

## Components

### Button

```tsx
import { Button } from '@shared/ui';

// Variants: primary (default) | secondary | danger | icon | link
// Sizes:    md (default) | sm | lg

<Button>Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger" size="sm">Delete</Button>
<Button variant="icon" aria-label="Edit"><Pencil size={16} /></Button>
<Button variant="link">View details</Button>

// Disabled state
<Button disabled>Save</Button>
```

---

### Input

```tsx
import { Input } from '@shared/ui';
import { Search } from 'lucide-react';

// Basic
<Input label="Full name" placeholder="Jane Smith" />

// With icon
<Input
  label="Search"
  placeholder="Search staff..."
  icon={<Search size={16} />}
/>

// With validation error
<Input
  label="Email"
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  error={errors.email}
/>
```

---

### Select

```tsx
import { Select } from '@shared/ui';

<Select label="Role" value={role} onChange={e => setRole(e.target.value)}>
  <option value="">Select a role...</option>
  <option value="admin">Admin</option>
  <option value="viewer">Viewer</option>
</Select>

// With error
<Select label="Status" error={errors.status}>
  <option value="">Select...</option>
  <option value="active">Active</option>
</Select>
```

---

### Textarea

```tsx
import { Textarea } from '@shared/ui';

<Textarea
  label="Notes"
  placeholder="Add any notes here..."
  rows={4}
  value={notes}
  onChange={e => setNotes(e.target.value)}
/>
```

---

### Badge

```tsx
import { Badge } from '@shared/ui';

// Colors: emerald | amber | orange | red | indigo | sky | purple | slate (default)

<Badge color="emerald">Active</Badge>
<Badge color="red">Expired</Badge>
<Badge color="amber">Warning</Badge>
<Badge color="purple">Admin</Badge>
```

**Semantic color guide**

| Color | When to use |
|---|---|
| `emerald` | Valid, active, success |
| `amber` | Warning (31–90 days) |
| `orange` | Alert (0–30 days) |
| `red` | Error, expired |
| `indigo` | Info, primary action |
| `sky` | Extended, special status |
| `purple` | Admin, role badge |
| `slate` | Muted, disabled |

---

### Card

```tsx
import { Card } from '@shared/ui';

// padding: md (default) | sm | lg | none
// hover: shows shadow on hover when true

<Card>
  <h2>Card title</h2>
  <p>Card content</p>
</Card>

<Card hover padding="sm">
  <p>Compact hoverable card</p>
</Card>
```

---

### Modal

```tsx
import { Modal, Button } from '@shared/ui';
import { useState } from 'react';

function DeleteModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Delete</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm deletion"
        size="md"  // sm | md (default) | lg
        footer={
          <>
            <Button variant="secondary" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure? This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}
```

---

### ToggleSwitch

```tsx
import { ToggleSwitch } from '@shared/ui';
import { Bell } from 'lucide-react';

<ToggleSwitch
  checked={notifications}
  onChange={setNotifications}
  label="Enable notifications"
  icon={<Bell size={16} />}
/>
```

---

### Avatar

```tsx
import { Avatar } from '@shared/ui';

// sizes: sm | md | lg (default) | xl
<Avatar initials="JS" />
<Avatar initials="AB" size="xl" />
```

---

### EmptyState

```tsx
import { EmptyState, Button } from '@shared/ui';
import { Users } from 'lucide-react';

// Default (search icon)
<EmptyState />

// Custom
<EmptyState
  icon={<Users size={32} />}
  heading="No staff found"
  subtext="Add a staff member to get started."
  action={<Button onClick={openCreateModal}>Add staff</Button>}
/>
```

---

### LoadingSpinner

```tsx
import { LoadingSpinner } from '@shared/ui';

// sizes: sm | md | lg (default)
<LoadingSpinner />
<LoadingSpinner size="sm" />

// Centered full-page loader
<div className="flex items-center justify-center h-full">
  <LoadingSpinner size="lg" />
</div>
```

---

### SkeletonLoader

```tsx
import { SkeletonLoader } from '@shared/ui';

// Default: two lines (3/4 width h-4, 1/2 width h-3)
<SkeletonLoader />

// Custom lines
<SkeletonLoader
  lines={[
    { width: 'w-full', height: 'h-5' },
    { width: 'w-2/3', height: 'h-4' },
    { width: 'w-1/3', height: 'h-3' },
  ]}
/>
```

---

### AlertBanner

```tsx
import { AlertBanner } from '@shared/ui';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

<AlertBanner color="emerald" icon={<CheckCircle2 size={18} />}>
  Changes saved successfully.
</AlertBanner>

<AlertBanner color="amber" icon={<AlertTriangle size={18} />}>
  Your licence expires in 28 days.
</AlertBanner>

<AlertBanner color="red" icon={<XCircle size={18} />}>
  Failed to save. Please try again.
</AlertBanner>
```

---

## Utility

### cn()

Merges Tailwind classes safely (handles conflicts):

```tsx
import { cn } from '@shared/ui';

<div className={cn('px-4 py-2 rounded-xl', isActive && 'bg-indigo-50', className)} />
```

---

## Full page example

```tsx
import {
  Card, Button, Input, Badge, Modal, EmptyState,
  AlertBanner, LoadingSpinner, Avatar, cn
} from '@shared/ui';
import { useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';

export function StaffPage() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Staff
        </h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={16} className="mr-1 inline" /> Add staff
        </Button>
      </div>

      {/* Success banner */}
      {saved && (
        <AlertBanner color="emerald" icon={<CheckCircle2 size={18} />}>
          Staff member created successfully.
        </AlertBanner>
      )}

      {/* Search */}
      <Input
        placeholder="Search staff..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Staff grid */}
      {staff.length === 0 ? (
        <EmptyState
          heading="No staff found"
          subtext="Try a different search term."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map(person => (
            <Card key={person.id} hover>
              <div className="flex items-center gap-3 mb-3">
                <Avatar initials={person.initials} />
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    {person.name}
                  </p>
                  <p className="text-xs text-slate-400">{person.role}</p>
                </div>
              </div>
              <Badge color="emerald">Active</Badge>
            </Card>
          ))}
        </div>
      )}

      {/* Create modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add staff member"
        footer={
          <>
            <Button variant="secondary" className="flex-1" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleCreate}>
              Create
            </Button>
          </>
        }
      >
        <form className="space-y-6">
          <Input label="Full name" placeholder="Jane Smith" />
          <Input label="Email" type="email" placeholder="jane@example.com" />
        </form>
      </Modal>
    </div>
  );
}
```

---

## Package structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── AlertBanner.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Input.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Modal.tsx
│   │   ├── Select.tsx
│   │   ├── SkeletonLoader.tsx
│   │   ├── Textarea.tsx
│   │   └── ToggleSwitch.tsx
│   ├── layout/
│   │   ├── Layout.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/
│   │   └── utils.ts
│   └── index.css
└── index.ts
```
