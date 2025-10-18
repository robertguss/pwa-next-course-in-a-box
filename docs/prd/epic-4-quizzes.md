# Epic 4: Quizzes

**Epic ID:** 4
**Epic Title:** Multiple-Choice Quizzes with Score Tracking
**Status:** Not Started
**Priority:** High (MVP Core)

## Epic Goal

Enable students to complete multiple-choice quizzes as part of their course modules, receive immediate feedback on their performance, and have their scores saved locally for future reference—all while working completely offline.

## Epic Description

Assessment is a critical part of the learning experience. Seminary students like James need to complete weekly quizzes to test their understanding of course materials. This epic delivers a quiz system that allows students to answer multiple-choice questions, submit their answers, see their score immediately via a toast notification, and have their results saved to their device for later review or synchronization.

**User Value:** Students can assess their understanding of course materials through quizzes, receive immediate feedback on their performance, and track their progress over time—all without requiring an internet connection.

**Technical Scope:**

- Quiz UI with multiple-choice questions
- Answer selection and submission
- Score calculation
- Toast/flash message notification system
- Local storage of quiz scores (IndexedDB)
- Offline quiz functionality

## User Stories

### Story 4.1: Quiz UI with Multiple-Choice Questions

**As a** student
**I want to** view quiz questions with multiple answer choices and select my answers
**So that** I can test my understanding of the course material

**Acceptance Criteria:**

1. Lessons with quizzes display a "Take Quiz" button or link
2. When a user clicks "Take Quiz", they are navigated to a dedicated quiz view
3. The quiz displays one question at a time OR all questions on a single scrollable page (specify in design)
4. Each question displays:
   - Question text clearly formatted
   - 2-5 answer choices as radio buttons or selectable cards
   - Question number (e.g., "Question 3 of 10")
5. The user can select exactly one answer per question (radio button behavior)
6. Selected answers are visually highlighted to provide clear feedback
7. The user can change their answer before submitting
8. A "Submit Quiz" button appears at the end of all questions
9. The "Submit Quiz" button is disabled until all questions have been answered
10. The quiz works completely offline using cached quiz data

**Technical Requirements:**

- Quiz component with question/answer rendering
- Quiz data structure: `{ quizId, questions: [{ id, questionText, answers: [{ id, text, isCorrect }] }] }`
- Radio button or single-select UI component
- Form state management for selected answers (useState or React Hook Form)
- Submit button validation (all questions answered)
- Quiz data loaded from downloaded module content (cached offline)

**Dependencies:** Epic 1 Story 1.3 (requires downloaded quiz data available offline)

**Priority:** High

---

### Story 4.2: Quiz Scoring and Immediate Feedback

**As a** student
**I want to** submit my quiz answers and immediately see my score
**So that** I can gauge my understanding of the material right away

**Acceptance Criteria:**

1. When a user clicks "Submit Quiz", the quiz is immediately scored
2. A toast notification (or flash message) appears displaying the score (e.g., "You scored 8/10" or "Score: 80%")
3. The toast notification is prominent, easy to read, and appears for 5-10 seconds
4. The toast automatically dismisses after the timeout period
5. The user can manually dismiss the toast by clicking an X button
6. After submission, the quiz view shows the score persistently (not just in the toast)
7. Optionally: Show which questions were answered correctly/incorrectly (can be future enhancement, confirm with user)
8. The scoring logic correctly calculates the number of correct answers
9. Scoring works completely offline

**Technical Requirements:**

- Score calculation logic (compare selected answers to correct answers from quiz data)
- Toast/notification component (can use Headless UI Transition for animations)
- Toast state management (show/hide, auto-dismiss timer)
- Quiz results display component
- Scoring happens on client-side (no server required)

**Dependencies:** Story 4.1 (requires quiz UI and submission)

**Priority:** High

---

### Story 4.3: Quiz Score Persistence

**As a** student
**I want to** have my quiz scores automatically saved to my device
**So that** I can review my performance later or sync my scores when I have internet access

**Acceptance Criteria:**

1. When a quiz is submitted and scored, the score is automatically saved to the device's local storage
2. Saved scores include:
   - Quiz ID or lesson ID
   - Score (e.g., "8/10" or 80%)
   - Date/time of completion
   - Selected answers (for future sync or review)
3. If a user retakes the same quiz, the new score overwrites or appends to the previous score (specify logic)
4. Saved scores persist across app sessions, device restarts, and even days/weeks later
5. The quiz list or lesson view displays an indicator for completed quizzes (e.g., "Completed: 85%")
6. Users can view a list of their saved scores (can be simple implementation, e.g., in lesson details)
7. Score saving works completely offline
8. If score saving fails (storage error), the user is notified with a gentle error message (but quiz completion is not blocked)

**Technical Requirements:**

- IndexedDB integration for persistent score storage
- Database schema: `{ quizId: string, lessonId: string, score: { correct: number, total: number, percentage: number }, completedAt: Date, selectedAnswers: { questionId: string, answerId: string }[] }`
- Save score to IndexedDB after quiz submission
- Load saved scores when displaying quiz/lesson list
- Quiz completion indicator component
- Error handling for storage failures (graceful fallback, user notification)
- Data structure allows for future sync to server (includes all answer details)

**Dependencies:** Story 4.2 (requires quiz scoring)

**Priority:** High

---

## Epic Success Criteria

This epic is considered complete when:

1. ✅ A student can view quiz questions with multiple-choice answers and select their answers
2. ✅ A student can submit their quiz and immediately see their score via a toast notification
3. ✅ Quiz scores are automatically saved to the device's local storage
4. ✅ Saved scores persist across app sessions and device restarts
5. ✅ The quiz system works completely offline using cached quiz data
6. ✅ Quiz completion is indicated in the lesson/module list
7. ✅ The quiz UI is mobile-friendly and easy to use on smartphones

## Technical Dependencies

- IndexedDB for persistent score storage
- Toast/notification component (Headless UI Transition or custom)
- Quiz data structure in module content
- Service Worker cached quiz data (from Epic 1)
- React state management for quiz flow

## Risks and Mitigations

**Risk:** IndexedDB storage failure prevents score saving
**Mitigation:** Implement graceful error handling (user is notified but can still complete quiz), consider localStorage fallback for critical data

**Risk:** Complex quiz state management leads to bugs (lost answers, incorrect scoring)
**Mitigation:** Use robust state management (React Hook Form or useReducer), write comprehensive unit tests for scoring logic, manual testing on real devices

**Risk:** Quiz data structure may need to change for future features (sync, detailed review)
**Mitigation:** Design flexible schema from the start (include all answer details), version the schema, plan for data migrations

**Risk:** Toast notifications may be missed or dismissed accidentally
**Mitigation:** Also display score persistently on the page (not just in toast), allow users to view score history

## Definition of Done

- All three user stories completed with acceptance criteria met
- Quiz flow works smoothly from question display → answer selection → submission → scoring → toast notification → persistence
- Quiz scores persist across app sessions and are viewable later
- Manual testing confirms quiz functionality on iOS Safari and Android Chrome
- Scoring logic correctly calculates results for various quiz configurations (2 questions, 10 questions, different answer counts)
- Quiz works completely offline with cached data
- Error states handled gracefully (storage failure, corrupted quiz data)
- Quiz UI matches the existing app design system (typography, Tailwind styles)
