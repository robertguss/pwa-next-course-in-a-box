# **4\. Data & Offline Strategy**

The core of the application relies on an effective offline-first data strategy, integrated with the project's data structure.

* **Course Data:** A type-safe src/data/course.ts file will define the structure of the course, including module titles, content types, and paths to the assets. Assets (audio, PDFs) will be located in the public/ directory to be served statically.  
* **Download Process:**  
  1. A user clicks the "Download" button on a ModuleListItem component.  
  2. The component's logic imports the course structure from src/data/course.ts and identifies the asset URLs for that module.  
  3. It communicates with the Service Worker, instructing it to fetch and cache these specific URLs from the / path (e.g., /audio/lecture1.mp3).  
  4. The Service Worker uses the Cache API to store the asset files in a dedicated cache (e.g., module-week-1-cache).  
  5. Upon successful caching, the component updates the module's status in IndexedDB from not-downloaded to downloaded.  
* **Offline Serving:** The next-pwa generated Service Worker will be configured with a cache-first strategy. When an asset is requested, the Service Worker will intercept the request and serve it directly from the Cache API if available, completely bypassing the network.
