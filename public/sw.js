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
          // Keep app shell cache and module caches (module-*-cache pattern)
          if (cacheName !== CACHE_NAME && !cacheName.startsWith("module-")) {
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

// Message event - handle custom cache requests from components
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CACHE_MODULE_ASSETS") {
    const { moduleId, assets } = event.data;
    const port = event.ports[0];

    // Validate input
    if (!moduleId || !Array.isArray(assets) || assets.length === 0) {
      port.postMessage({
        type: "CACHE_ERROR",
        error: "Invalid module data provided",
      });
      return;
    }

    const moduleCacheName = `module-${moduleId}-cache`;

    // Cache all module assets
    event.waitUntil(
      (async () => {
        try {
          const cache = await caches.open(moduleCacheName);

          // Fetch and cache each asset
          const cachePromises = assets.map(async (assetUrl) => {
            try {
              const response = await fetch(assetUrl, {
                mode: "cors",
                credentials: "same-origin",
              });

              // Check if response is successful
              if (!response.ok) {
                throw new Error(
                  `Failed to fetch ${assetUrl}: ${response.status} ${response.statusText}`,
                );
              }

              // Cache the response
              await cache.put(assetUrl, response);
              console.log(`Cached asset: ${assetUrl}`);
            } catch (error) {
              console.error(`Error caching asset ${assetUrl}:`, error);
              throw error; // Re-throw to fail the entire operation
            }
          });

          // Wait for all assets to be cached
          await Promise.all(cachePromises);

          // Send success message
          port.postMessage({
            type: "CACHE_COMPLETE",
            moduleId,
          });

          console.log(`Successfully cached module: ${moduleId}`);
        } catch (error) {
          // Send error message
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to cache module assets";

          port.postMessage({
            type: "CACHE_ERROR",
            error: errorMessage,
          });

          console.error(`Failed to cache module ${moduleId}:`, error);

          // Clean up partial cache on error
          try {
            await caches.delete(moduleCacheName);
          } catch (cleanupError) {
            console.error("Failed to clean up cache:", cleanupError);
          }
        }
      })(),
    );
  }
});
