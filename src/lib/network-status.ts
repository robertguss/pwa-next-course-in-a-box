"use client";

import { useEffect, useState } from "react";

/**
 * Custom React hook to detect online/offline network status
 * Uses navigator.onLine API and listens for online/offline events
 * Returns true when online, false when offline
 */
export function useOnlineStatus(): boolean {
  // Initialize with current online status
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

  useEffect(() => {
    // Handler for online event
    function handleOnline() {
      setIsOnline(true);
    }

    // Handler for offline event
    function handleOffline() {
      setIsOnline(false);
    }

    // Add event listeners for network status changes
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
