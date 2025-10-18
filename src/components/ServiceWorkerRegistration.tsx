"use client";

import { requestPersistentStorage } from "@/lib/storage-persistence";
import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register service worker in production
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);

          // Request persistent storage to prevent cache eviction
          requestPersistentStorage().then((isPersisted) => {
            if (isPersisted) {
              console.log(
                "Persistent storage granted - downloaded content is protected",
              );
            } else {
              console.warn(
                "Persistent storage not granted - content may be evicted",
              );
            }
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    } else if (process.env.NODE_ENV !== "production") {
      // In development, still request persistent storage for testing
      requestPersistentStorage();
    }
  }, []);

  return null;
}
