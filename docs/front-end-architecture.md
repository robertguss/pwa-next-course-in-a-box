# **Frontend Architecture: Course-in-a-Box PWA (MVP)**

## **1\. Overview**

This document outlines the technical architecture for the "Course-in-a-Box" PWA. The architecture is designed to be modern, scalable, and developer-friendly, leveraging the Next.js framework to meet all requirements for this offline-first proof-of-concept. The primary technical challenge is the robust implementation of offline content storage and retrieval, which will be handled by a combination of a Service Worker and browser storage APIs.

## **2\. Technology Stack**

- **Framework:** **Next.js (App Router)** \- Provides a production-ready React framework with file-system-based routing, server components, and excellent performance optimizations.
- **PWA Functionality:** **next-pwa** \- A widely-used package to seamlessly integrate Progressive Web App features (Service Worker, Manifest file) into a Next.js application.
- **Styling:** **Tailwind CSS** \- A utility-first CSS framework that enables rapid implementation of the UI design directly within components. The architecture will integrate with the existing project theme.
- **Offline Data Storage:**
  - **IndexedDB:** For storing structured data, such as quiz scores, download status for each module, and audio playback positions. The idb library will be used to simplify IndexedDB transactions.
  - **Cache API:** For storing the actual course assets (audio files, PDFs, images, etc.). This will be managed by the Service Worker.

## **3\. Project Structure (Aligned with Template)**

The project structure will be adapted to the provided Next.js template, leveraging its route groups and component organization.

/  
└── src/  
 ├── app/  
 │ ├── (sidebar)/ \# Route group for main app layout  
 │ │ ├── course/  
 │ │ │ ├── \[moduleId\]/  
 │ │ │ │ ├── \[contentId\]/  
 │ │ │ │ │ └── page.tsx  
 │ │ │ │ └── page.tsx \# Module View Page  
 │ │ │ └── page.tsx \# Course Home Page  
 │ │ └── layout.tsx \# Sidebar layout  
 │ ├── api/  
 │ └── layout.tsx \# Root layout  
 ├── components/  
 │ ├── AudioPlayer.tsx \# (New component)  
 │ ├── ModuleListItem.tsx \# (New component)  
 │ └── ... (existing components)  
 ├── data/  
 │ ├── course.ts \# Type-safe course structure & data  
 │ └── ... (existing data files)  
 └── lib/  
 └── ... (existing utility files)

## **4\. Data & Offline Strategy**

The core of the application relies on an effective offline-first data strategy, integrated with the project's data structure.

- **Course Data:** A type-safe src/data/course.ts file will define the structure of the course, including module titles, content types, and paths to the assets. Assets (audio, PDFs) will be located in the public/ directory to be served statically.
- **Download Process:**
  1. A user clicks the "Download" button on a ModuleListItem component.
  2. The component's logic imports the course structure from src/data/course.ts and identifies the asset URLs for that module.
  3. It communicates with the Service Worker, instructing it to fetch and cache these specific URLs from the / path (e.g., /audio/lecture1.mp3).
  4. The Service Worker uses the Cache API to store the asset files in a dedicated cache (e.g., module-week-1-cache).
  5. Upon successful caching, the component updates the module's status in IndexedDB from not-downloaded to downloaded.
- **Offline Serving:** The next-pwa generated Service Worker will be configured with a cache-first strategy. When an asset is requested, the Service Worker will intercept the request and serve it directly from the Cache API if available, completely bypassing the network.

## **5\. State Management**

For this MVP, complex global state management (like Redux or Zustand) is unnecessary. Component-level state (useState, useEffect) will be sufficient to manage UI state, such as the current playback time of an audio file or the selected answers in a quiz. All persistent state (download status, scores) will be read from and written to IndexedDB.
