# Epic 3: Reading View

**Epic ID:** 3
**Epic Title:** Reading View for Text and PDF Content
**Status:** Not Started
**Priority:** High (MVP Core)

## Epic Goal

Enable students to read text-based course materials (readings, articles, supplementary content) and view PDF documents directly within the app, ensuring a smooth reading experience that works completely offline.

## Epic Description

Seminary students need to access various types of reading materials as part of their coursework: text-based readings (articles, chapters, study guides) and PDF documents (textbooks, handouts, reference materials). This epic delivers native reading capabilities for both content types, optimized for mobile devices and offline use.

**User Value:** Students can read all course materials directly in the app without needing external PDF readers or switching between apps, and all content remains accessible offline.

**Technical Scope:**

- Native text reading view using existing MDX content system
- PDF viewer component for displaying PDF documents
- Offline support for both text and PDF content
- Mobile-optimized reading experience

## User Stories

### Story 3.1: Native Text Reading View

**As a** student
**I want to** read text-based course materials (readings, articles) directly in the app
**So that** I can study course content without needing external apps or internet access

**Acceptance Criteria:**

1. Lessons with text content (MDX format) display in a dedicated reading view
2. Text content is rendered with proper formatting (headings, paragraphs, bold, italic, lists, blockquotes)
3. The reading view uses readable typography (proper font size, line height, line length)
4. Images in text content are displayed inline at appropriate sizes
5. The reading view supports dark mode (proper text/background contrast)
6. Code blocks (if present in content) are syntax-highlighted properly (using Shiki)
7. Text content is fully accessible offline after module download
8. The reading view scrolls smoothly on mobile devices
9. Navigation breadcrumbs or back button allows easy return to lesson list

**Technical Requirements:**

- Leverage existing MDX rendering system (`src/data/lessons/*.mdx`)
- Use existing typography styles (`src/app/typography.css`)
- Ensure MDX components (headings, paragraphs, code blocks) render correctly
- Integrate with existing Shiki syntax highlighting configuration
- Dark mode support via Tailwind `dark:` variants
- Responsive layout for mobile devices
- Reading view component or layout

**Dependencies:** Epic 1 Story 1.3 (requires downloaded content available offline)

**Priority:** High

---

### Story 3.2: PDF Viewer

**As a** student
**I want to** open and view PDF files directly in the app
**So that** I can read textbooks, handouts, and reference materials without leaving the app or needing internet access

**Acceptance Criteria:**

1. Lessons with PDF attachments display a "View PDF" button or link
2. When a user clicks the PDF button, the PDF opens in a dedicated viewer within the app
3. The PDF viewer displays the document clearly with readable text and images
4. The user can scroll through multi-page PDF documents smoothly
5. The PDF viewer shows page numbers (e.g., "Page 3 of 15")
6. The PDF viewer includes a close/back button to return to the lesson
7. PDF files are fully accessible offline after module download
8. The PDF viewer works correctly on both iOS Safari and Android Chrome
9. Large PDF files (10-20 MB) load and display without crashing the app

**Technical Requirements:**

- PDF viewer component (options: react-pdf, PDF.js, or native browser PDF rendering)
- PDF file loading from Service Worker cache
- Page navigation controls (next/previous page or scroll)
- Page number display
- Mobile-optimized PDF rendering
- Memory management for large PDF files
- Error handling for corrupted or failed PDF loads
- Close/back navigation

**Dependencies:** Epic 1 Story 1.3 (requires downloaded PDF files available offline)

**Priority:** High

---

## Epic Success Criteria

This epic is considered complete when:

1. ✅ A student can read text-based course materials (MDX content) in a clean, readable format within the app
2. ✅ Text content displays properly formatted with headings, paragraphs, images, and code blocks
3. ✅ A student can open and view PDF documents directly in the app
4. ✅ PDF viewer displays multi-page documents with page navigation
5. ✅ Both text and PDF content work completely offline after module download
6. ✅ Reading experience is optimized for mobile devices (readable text, smooth scrolling)
7. ✅ Dark mode is supported for text reading view

## Technical Dependencies

- MDX rendering system (already implemented)
- Typography styles (already implemented in `typography.css`)
- Shiki syntax highlighting (already configured)
- PDF viewer library (react-pdf or PDF.js)
- Service Worker cached content (from Epic 1)
- Tailwind dark mode variants

## Risks and Mitigations

**Risk:** PDF rendering performance issues on older mobile devices
**Mitigation:** Test with production-sized PDFs (10-20 MB), implement lazy loading for PDF pages, consider canvas-based rendering optimization

**Risk:** PDF viewer library compatibility issues with iOS Safari
**Mitigation:** Test PDF rendering specifically on iOS Safari (known PWA limitations), have fallback to native browser PDF rendering if needed

**Risk:** Large PDF files consuming significant storage space
**Mitigation:** Implement storage quota checking (covered in Epic 1), allow users to see module size before downloading, provide option to delete downloaded modules

**Risk:** MDX content with complex components may not work offline
**Mitigation:** Ensure all MDX component dependencies are bundled, avoid external API calls in MDX content, test offline rendering thoroughly

## Definition of Done

- Both user stories completed with acceptance criteria met
- Text reading view renders all MDX content correctly offline
- PDF viewer opens and displays PDF documents correctly offline
- Manual testing confirms reading experience on iOS Safari and Android Chrome
- Dark mode works correctly for text content
- Large PDFs (15+ MB) display without crashing
- Typography is readable and matches design system
- Navigation (breadcrumbs, back buttons) works correctly
