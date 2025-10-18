/**
 * Request persistent storage from the browser to prevent cache eviction
 * This helps protect downloaded module content from being automatically
 * deleted by the browser under storage pressure.
 *
 * Should be called on app initialization (root layout or service worker registration)
 */
export async function requestPersistentStorage(): Promise<boolean> {
  // Check if navigator.storage is supported
  if (!navigator.storage || !navigator.storage.persist) {
    console.warn("Persistent storage API not supported in this browser");
    return false;
  }

  try {
    // Request persistent storage
    const isPersisted = await navigator.storage.persist();

    if (isPersisted) {
      console.log("Persistent storage granted: content will not be evicted");
    } else {
      console.warn(
        "Persistent storage not granted: content may be evicted under storage pressure",
      );
    }

    return isPersisted;
  } catch (error) {
    console.error("Error requesting persistent storage:", error);
    return false;
  }
}

/**
 * Check if storage is already persisted
 * Useful for displaying storage status to the user
 */
export async function isStoragePersisted(): Promise<boolean> {
  if (!navigator.storage || !navigator.storage.persisted) {
    return false;
  }

  try {
    return await navigator.storage.persisted();
  } catch (error) {
    console.error("Error checking storage persistence:", error);
    return false;
  }
}

/**
 * Get current storage usage estimate
 * Useful for debugging and monitoring storage consumption
 */
export async function getStorageEstimate(): Promise<{
  usage: number;
  quota: number;
  percentUsed: number;
} | null> {
  if (!navigator.storage || !navigator.storage.estimate) {
    console.warn("Storage estimation API not supported in this browser");
    return null;
  }

  try {
    const estimate = await navigator.storage.estimate();
    const usage = estimate.usage || 0;
    const quota = estimate.quota || 0;
    const percentUsed = quota > 0 ? (usage / quota) * 100 : 0;

    console.log(
      `Storage: ${(usage / 1024 / 1024).toFixed(2)} MB used of ${(quota / 1024 / 1024).toFixed(2)} MB (${percentUsed.toFixed(1)}%)`,
    );

    return {
      usage,
      quota,
      percentUsed,
    };
  } catch (error) {
    console.error("Error getting storage estimate:", error);
    return null;
  }
}
