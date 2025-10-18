# Epic 1: Offline Content Module

**Epic ID:** 1
**Epic Title:** Offline Content Module
**Status:** Not Started
**Priority:** Critical (MVP Core)

## Epic Goal

Enable students with unreliable internet access to download complete course modules (including all assets) to their devices for 100% offline access, with clear visual indicators of download status and offline availability.

## Epic Description

This epic addresses the core value proposition of the Course-in-a-Box PWA: providing seminary students like James in rural areas the ability to download all course materials in one session when they have internet access, then study completely offline for the rest of the week. This epic covers the PWA infrastructure, download functionality, and offline content availability.

**User Value:** Students can download entire course modules once and access all content (audio, readings, PDFs, quizzes) without any internet connection for the rest of the week.

**Technical Scope:**

- PWA manifest and service worker setup
- "Add to Home Screen" functionality
- Module download system with caching strategy
- Visual download status indicators
- Offline content verification

## User Stories

### Story 1.1: PWA Installation and Home Screen Access

**As a** student with limited internet access
**I want to** install the Course-in-a-Box app to my device home screen
**So that** I can access my course materials like a native app, even when offline

**Acceptance Criteria:**

1. When a user first visits the app URL, they see a browser prompt to "Add to Home Screen"
2. After accepting the prompt, the PWA icon appears on the device home screen with the app name "Compass"
3. When launched from the home screen, the app opens in standalone mode (without browser UI)
4. The app splash screen displays while loading (using the PWA icon and theme color)
5. The app works offline after installation (shows cached content, not offline error page)

**Technical Requirements:**

- PWA manifest file configured with proper icons (192x192, 512x512), name, theme color
- Service worker registered and activated
- Offline fallback page configured
- App passes PWA installability criteria (HTTPS, manifest, service worker)

**Dependencies:** None (foundational story)

**Priority:** Critical (Must be completed first)

---

### Story 1.2: Module Download UI and User Control

**As a** student
**I want to** clearly see which modules are available to download and initiate downloads with a single button
**So that** I can control what content is saved to my device

**Acceptance Criteria:**

1. Each course module displays a prominent "Download Module" button when not yet downloaded
2. When a user clicks "Download Module", the download process begins immediately
3. During download, a progress indicator (e.g., spinner or progress bar) is visible
4. Upon successful download, the button changes to "Downloaded" or similar confirmation state
5. An error message displays if download fails, with a "Retry" option
6. The UI clearly distinguishes between "Not Downloaded", "Downloading", and "Downloaded" states

**Technical Requirements:**

- Download button component with state management (not-downloaded, downloading, downloaded, error)
- Service Worker cache API integration for storing module assets
- Module asset manifest (list of all files per module: audio, PDFs, images, quiz data)
- IndexedDB for storing download status per module
- Error handling for failed downloads (network timeout, storage quota exceeded)

**Dependencies:** Story 1.1 (requires service worker)

**Priority:** Critical

---

### Story 1.3: Offline Content Availability and Visual Indicators

**As a** student
**I want to** clearly see which modules I have successfully downloaded and be able to access them completely offline
**So that** I can confidently study without worrying about internet connectivity

**Acceptance Criteria:**

1. Downloaded modules display a clear visual indicator (e.g., checkmark icon, "Offline Available" badge)
2. When offline (no internet connection), the app displays all downloaded modules normally
3. When offline, attempting to access a non-downloaded module shows a clear message: "This module is not available offline. Please download it when you have internet access."
4. All module assets (audio files, PDFs, images, quiz data) are fully accessible offline after download
5. The app works correctly when switching between online and offline modes
6. Downloaded content persists across app sessions (closing and reopening the app)

**Technical Requirements:**

- Visual indicator component for download status (icon/badge)
- Service Worker cache-first strategy for downloaded module assets
- Online/offline detection (navigator.onLine, service worker events)
- Offline fallback UI for non-downloaded content
- Cache validation to ensure all module assets are present
- Persistent storage configuration (prevent browser from evicting cached content)

**Dependencies:** Story 1.2 (requires download functionality)

**Priority:** Critical

---

## Epic Success Criteria

This epic is considered complete when:

1. ✅ A student can install the PWA to their home screen and launch it like a native app
2. ✅ A student can download a complete course module with a single "Download Module" button
3. ✅ Downloaded modules are clearly indicated with visual badges/icons
4. ✅ All downloaded module content (audio, PDFs, readings, quizzes) is 100% accessible offline
5. ✅ The app gracefully handles offline scenarios for non-downloaded content
6. ✅ Downloaded content persists across app sessions and device restarts

## Technical Dependencies

- Next.js PWA configuration (next-pwa or custom service worker)
- Service Worker API for caching
- Cache API for asset storage
- IndexedDB for download status tracking
- Navigator API for online/offline detection

## Risks and Mitigations

**Risk:** Storage quota limitations on mobile devices
**Mitigation:** Implement storage quota checking before downloads, show available space, allow users to delete downloaded modules

**Risk:** Incomplete downloads due to poor connectivity
**Mitigation:** Implement resume/retry logic, validate all assets are cached before marking as "Downloaded"

**Risk:** Service worker caching conflicts with Next.js hot reload in development
**Mitigation:** Disable service worker in development mode, only enable for production builds

## Definition of Done

- All three user stories completed with acceptance criteria met
- PWA passes Lighthouse PWA audit (score 90+)
- Manual testing confirms offline functionality on iOS Safari and Android Chrome
- Module downloads work correctly on slow 3G connections
- Documentation updated with PWA setup instructions
