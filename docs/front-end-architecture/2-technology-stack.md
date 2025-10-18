# **2\. Technology Stack**

* **Framework:** **Next.js (App Router)** \- Provides a production-ready React framework with file-system-based routing, server components, and excellent performance optimizations.  
* **PWA Functionality:** **next-pwa** \- A widely-used package to seamlessly integrate Progressive Web App features (Service Worker, Manifest file) into a Next.js application.  
* **Styling:** **Tailwind CSS** \- A utility-first CSS framework that enables rapid implementation of the UI design directly within components. The architecture will integrate with the existing project theme.  
* **Offline Data Storage:**  
  * **IndexedDB:** For storing structured data, such as quiz scores, download status for each module, and audio playback positions. The idb library will be used to simplify IndexedDB transactions.  
  * **Cache API:** For storing the actual course assets (audio files, PDFs, images, etc.). This will be managed by the Service Worker.
