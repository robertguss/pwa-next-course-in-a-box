// Service Worker for Compass PWA
// Version 1.0.0

const CACHE_NAME = "compass-v1";
const OFFLINE_URL = "/offline";

// Critical app shell resources to pre-cache
const CRITICAL_ASSETS = [
  "/",
  "/offline",
  "/globals.css",
  "/typography.css",
  "/InterVariable.woff2",
  "/InterVariable-Italic.woff2",
];

// Install event - pre-cache critical resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS).catch((error) => {
        console.error("Failed to cache critical assets during install:", error);
      });
    }),
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - cache-first strategy with offline fallback
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip chrome extensions and other non-http(s) requests
  if (!event.request.url.startsWith("http")) {
    return;
  }

  // Skip video files - these will be handled by dedicated download feature later
  const url = new URL(event.request.url);
  const isVideo =
    /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url.pathname) ||
    event.request.headers.get("accept")?.includes("video/");

  if (isVideo) {
    // Pass through to network without caching
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, fetch from network
      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type === "error"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched response for future use
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Network fetch failed, check if it's a navigation request
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
          return new Response("Network error", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          });
        });
    }),
  );
});
