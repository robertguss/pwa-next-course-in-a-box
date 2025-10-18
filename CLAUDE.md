# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Compass** is an offline-first Progressive Web App (PWA) for course delivery built on Next.js 15 with the App Router. The project uses a content-as-code approach with MDX for lesson/interview content and is designed to support downloading course modules for offline viewing.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (with hot reload)
npm run dev                    # http://localhost:3000

# Code quality
npm run format                 # Prettier + organize imports + sort Tailwind classes
npm run lint                   # ESLint via Next.js

# Production
npm run build                  # Build production bundle
npm run start                  # Serve production build
```

## Technology Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript 5.8.3 (strict mode enabled)
- **Styling:** Tailwind CSS 4.1.11 with PostCSS
- **Content System:** MDX 3.1.0 (Markdown + JSX)
- **Syntax Highlighting:** Shiki 3.8.1 with colorized brackets
- **UI Components:** Headless UI 2.2.6
- **Fonts:** Inter Variable (primary), Geist Mono (monospace)
- **Code Quality:** Prettier with auto-import organization and Tailwind class sorting

## Architecture Patterns

### Route Groups Structure

Next.js route groups organize layouts without affecting URLs:

```
src/app/
├── (sidebar)/          # Main app with navigation sidebar
│   ├── layout.tsx      # Sidebar layout wrapper
│   ├── page.tsx        # Home page
│   └── [slug]/         # Dynamic course content pages
├── (centered)/         # Centered layout pages
└── (auth)/             # Reserved for authentication flows
```

### Content System

**MDX-Based Content:**
- Course lessons: `src/data/lessons.ts` + `src/data/lessons/*.mdx`
- Interview content: `src/data/interviews.ts` + `src/data/interviews/*.mdx`
- Type-safe data structure with async MDX imports
- Dynamic content loading via `import('@/data/lessons/${slug}.mdx')`

**Image Handling in MDX:**
```md
# Basic image with required dimensions
![Alt text|1000x500](image.png)

# Dark/light mode variants (provide both .light.png and .dark.png)
![Alt text|1000x500](image.{scheme}.png)
```

**Content Data Structure:**
```typescript
type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

type Lesson = {
  id: string;
  title: string;
  description: string;
  video: {
    thumbnail: string;
    duration: number;
    url: string;
  } | null;
};
```

### Component Architecture

**Base Components:** Button, Input, Dropdown with Tailwind styling
**Layout Components:** SidebarLayout, CenteredLayout, Navbar, Breadcrumbs
**Content Components:** VideoPlayer, VideoCard, TableOfContents, BookShelf, NextPageLink
**Icon Components:** 11 SVG icon components in `src/icons/`

**Styling Pattern:**
- Use `clsx` for conditional class composition
- Prettier automatically sorts Tailwind classes
- Component-level state with `useState`/`useEffect` (no global state management needed for MVP)

### PWA Implementation (Planned)

The architecture is designed for offline-first functionality:

**Offline Strategy:**
- **Service Worker:** Cache-first strategy for assets
- **Cache API:** Store audio files, PDFs, images per module
- **IndexedDB:** Store quiz scores, download status, audio playback positions
- **Download Flow:** User clicks download → component identifies assets from `src/data/course.ts` → Service Worker caches assets → IndexedDB updated with download status

**Storage Pattern:**
- Component-level state for UI (playback time, quiz answers)
- IndexedDB for persistent state (download status, scores)
- Cache API managed by Service Worker for assets

## BMAD Framework Integration

This project uses the **BMAD (Better Method for AI Development)** framework v4.44.1 for AI-assisted development workflow.

### Key BMAD Features

**Slash Commands:** Use `/BMad` prefix for BMAD commands

**Documentation Structure:**
- **PRD:** `docs/prd/` (sharded format v4) - Product requirements organized by epic
- **Architecture:** `docs/architecture/` (sharded format v4) - Technical documentation
- **QA:** `docs/qa/` - Test documentation
- **Stories:** `docs/stories/` - User story tracking

**BMAD Configuration (`.bmad-core/core-config.yaml`):**
```yaml
markdownExploder: true          # Generates fragments for AI context
slashPrefix: BMad
devDebugLog: .ai/debug-log.md
devStoryLocation: docs/stories
prdVersion: v4 (sharded)
architectureVersion: v4 (sharded)
```

### BMAD Workflow

When working with BMAD:
1. Load relevant PRD epic files from `docs/prd/epic-*.md` for feature context
2. Reference architecture docs in `docs/architecture/` for technical constraints
3. Create user stories in `docs/stories/` following BMAD conventions
4. Use BMAD agents (`/BMad:agents:sm` for Scrum Master, etc.)

## Path Aliases

TypeScript path alias configured in `tsconfig.json`:
```typescript
import { Button } from '@/components/button'  // Resolves to src/components/button.tsx
import { lessons } from '@/data/lessons'      // Resolves to src/data/lessons.ts
```

## Next.js Configuration

**Turbopack:** Enabled for faster development builds
**MDX Support:** Configured for `.md` and `.mdx` extensions
**Remote Images:** Configure `images.remotePatterns` in `next.config.mjs` for remote image domains

## Code Quality Standards

**Prettier Configuration:**
- Auto-organize imports via `prettier-plugin-organize-imports`
- Auto-sort Tailwind classes via `prettier-plugin-tailwindcss`
- Custom Tailwind function: `clsx`

**TypeScript:**
- Strict mode enabled
- Target: ES2017
- All components and utilities should be strongly typed

**File Conventions:**
- React components: PascalCase (e.g., `VideoPlayer.tsx`)
- Utilities/data: camelCase (e.g., `lessons.ts`)
- MDX content: kebab-case (e.g., `intro-to-react.mdx`)

## Development Notes

**Content Updates:**
- Lessons/interviews auto-update on save during development (hot reload)
- New MDX files require adding to the data structure in `lessons.ts` or `interviews.ts`

**Styling:**
- Use Tailwind utility classes directly in components
- Dark mode via `dark:` variant (e.g., `dark:bg-gray-900`)
- Custom CSS in `src/app/globals.css` and `src/app/typography.css`

**Syntax Highlighting:**
- Shiki theme configured in `src/app/syntax-theme.json`
- Colorized brackets enabled for code blocks in MDX

**State Management:**
- Component-level state for UI interactions
- IndexedDB for persistent offline data (planned implementation)
- No Redux/Zustand needed for MVP scope
