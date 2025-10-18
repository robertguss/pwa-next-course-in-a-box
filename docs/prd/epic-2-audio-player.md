# Epic 2: Audio Player

**Epic ID:** 2
**Epic Title:** Audio Player with Resume Functionality
**Status:** Not Started
**Priority:** Critical (MVP Core)

## Epic Goal

Provide students with a robust audio player that allows them to listen to course lectures offline, control playback with standard media controls, navigate through audio content via scrubbing, and automatically resume from their last listening position when they return to the app.

## Epic Description

Seminary students like James listen to audio lectures throughout the week while offline. They need a reliable audio player that remembers where they left off, even if they close the app or switch to other tasks on their device. This epic delivers a fully functional audio player with progress tracking, scrubbing capabilities, and persistent playback position storage.

**User Value:** Students can listen to course lectures at their own pace, pause at any point, and seamlessly resume from exactly where they left off—even days later or after closing the app.

**Technical Scope:**

- Audio playback controls (play/pause)
- Visual progress bar with scrubbing functionality
- Persistent playback position storage (IndexedDB)
- Integration with downloaded audio files from Epic 1

## User Stories

### Story 2.1: Basic Audio Playback Controls

**As a** student
**I want to** play and pause audio lectures with a clear control button
**So that** I can listen to course content at my convenience and pause when interrupted

**Acceptance Criteria:**

1. Each lesson with an audio file displays an audio player component
2. The audio player displays a play button (▶) when audio is not playing
3. When the play button is clicked, the audio begins playing and the button changes to a pause button (⏸)
4. When the pause button is clicked, the audio pauses and the button changes back to a play button
5. The audio player displays the current playback time (e.g., "2:45 / 15:30")
6. The audio player displays the lesson title
7. Audio plays correctly from cached offline files when no internet connection is available
8. When audio reaches the end, the player resets to the beginning and shows the play button

**Technical Requirements:**

- AudioPlayer component using HTML5 `<audio>` element
- Play/pause button with state management (useState)
- Audio file loading from Service Worker cache
- Current time and duration display (formatted as MM:SS)
- Audio event listeners (play, pause, ended, timeupdate)
- Error handling for failed audio loading

**Dependencies:** Epic 1 Story 1.3 (requires downloaded audio files available offline)

**Priority:** Critical

---

### Story 2.2: Progress Bar with Scrubbing

**As a** student
**I want to** see a visual progress bar showing my position in the audio and be able to drag it to jump forward or backward
**So that** I can quickly navigate to specific parts of the lecture or replay sections I want to review

**Acceptance Criteria:**

1. The audio player displays a horizontal progress bar showing the current playback position
2. As audio plays, the progress bar fills from left to right to indicate progress
3. The user can click anywhere on the progress bar to jump to that position in the audio
4. The user can click and drag the progress indicator (thumb/handle) to scrub through the audio
5. While scrubbing, the current time display updates in real-time to show the position
6. When the user releases the scrubber, audio playback resumes from the new position
7. The progress bar is touch-friendly and works smoothly on mobile devices
8. Visual feedback (hover state on desktop, touch feedback on mobile) indicates the progress bar is interactive

**Technical Requirements:**

- Progress bar component with click and drag event handlers
- Audio seek functionality using `audio.currentTime` setter
- Real-time progress updates using `timeupdate` event
- Touch event handling for mobile devices (touchstart, touchmove, touchend)
- Visual states for progress bar (buffered, played, scrubber thumb)
- Debounced position updates during scrubbing for performance

**Dependencies:** Story 2.1 (requires basic audio player)

**Priority:** High

---

### Story 2.3: Resume Playback from Saved Position

**As a** student
**I want to** automatically resume audio from where I last stopped listening
**So that** I don't have to remember or manually find my place when I return to the lesson

**Acceptance Criteria:**

1. When a user pauses audio and closes the app, the playback position is automatically saved
2. When the user reopens the app and navigates to the same lesson, the audio player shows the saved position
3. The audio player displays a visual indicator (e.g., "Resume from 5:23") when a saved position exists
4. When the user clicks play, audio begins from the saved position (not from the beginning)
5. Playback positions are saved per lesson (each lesson tracks its own position independently)
6. If audio reaches the end (100% complete), the saved position resets to 0:00 for the next playback
7. Saved positions persist across app sessions, device restarts, and even if the user doesn't visit the lesson for days
8. If no saved position exists, audio begins from the beginning (0:00)

**Technical Requirements:**

- IndexedDB integration for persistent storage of playback positions
- Database schema: `{ lessonId: string, position: number, timestamp: Date }`
- Auto-save playback position on pause, every 10 seconds during playback, and when audio ends
- Load saved position from IndexedDB when audio player component mounts
- Reset saved position when audio reaches end (100% complete)
- Error handling for IndexedDB operations (graceful fallback if storage fails)
- Background position saving (doesn't interrupt playback)

**Dependencies:** Story 2.2 (requires working audio player with progress tracking)

**Priority:** Critical

---

## Epic Success Criteria

This epic is considered complete when:

1. ✅ A student can play and pause audio lectures with a clear button control
2. ✅ A student can see visual progress as audio plays and use a progress bar to scrub through the audio
3. ✅ When a student returns to a lesson (hours or days later), audio automatically resumes from where they last stopped
4. ✅ Playback positions are tracked independently for each lesson
5. ✅ Audio playback works completely offline using cached audio files
6. ✅ The audio player is touch-friendly and works smoothly on mobile devices

## Technical Dependencies

- IndexedDB for persistent playback position storage
- HTML5 Audio API
- Service Worker cached audio files (from Epic 1)
- React state management for player controls

## Risks and Mitigations

**Risk:** IndexedDB quota limitations or corruption
**Mitigation:** Implement graceful fallback (start from beginning if storage fails), use small data footprint (only store position numbers), add error logging

**Risk:** Audio file formats incompatible with some browsers/devices
**Mitigation:** Use widely supported formats (MP3), provide fallback formats if needed, test on iOS Safari and Android Chrome

**Risk:** Scrubbing performance issues on large audio files
**Mitigation:** Use debounced position updates, optimize event handlers, test with production-sized audio files (30-60 minute lectures)

**Risk:** Background tab/app may pause audio unexpectedly
**Mitigation:** Test audio playback when app is in background, implement proper audio session handling for mobile platforms

## Definition of Done

- All three user stories completed with acceptance criteria met
- Audio player works correctly offline with cached files
- Playback positions persist across app restarts and device reboots
- Manual testing confirms smooth scrubbing on iOS Safari and Android Chrome
- Playback position saving doesn't cause audio interruptions or lag
- Error states handled gracefully (corrupted audio file, storage failure)
- Audio player UI matches the existing app design system (typography.css, Tailwind styles)
