import { openDB, type IDBPDatabase } from "idb";

// Database configuration
const DB_NAME = "compass-db";
const DB_VERSION = 1;
const STORE_NAME = "moduleDownloads";

// Download status types
export type DownloadStatus =
  | "not-downloaded"
  | "downloading"
  | "downloaded"
  | "error";

export type ModuleDownloadRecord = {
  moduleId: string;
  status: DownloadStatus;
  lastUpdated: Date;
};

// Database schema interface
interface CompassDB {
  moduleDownloads: {
    key: string;
    value: ModuleDownloadRecord;
  };
}

// Initialize and return database connection
async function getDB(): Promise<IDBPDatabase<CompassDB>> {
  try {
    return await openDB<CompassDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "moduleId" });
        }
      },
    });
  } catch (error) {
    // Handle browser support issues
    if (error instanceof Error) {
      throw new Error(
        `Failed to initialize IndexedDB: ${error.message}. Your browser may not support IndexedDB.`,
      );
    }
    throw error;
  }
}

/**
 * Get the download status for a specific module
 * Returns 'not-downloaded' if no record exists
 */
export async function getModuleStatus(
  moduleId: string,
): Promise<DownloadStatus> {
  try {
    const db = await getDB();
    const record = await db.get(STORE_NAME, moduleId);

    if (!record) {
      return "not-downloaded";
    }

    return record.status;
  } catch (error) {
    console.error("Error getting module status:", error);
    // Default to not-downloaded on error
    return "not-downloaded";
  }
}

/**
 * Set the download status for a specific module
 * Handles quota exceeded errors gracefully
 */
export async function setModuleStatus(
  moduleId: string,
  status: DownloadStatus,
): Promise<void> {
  try {
    const db = await getDB();
    const record: ModuleDownloadRecord = {
      moduleId,
      status,
      lastUpdated: new Date(),
    };

    await db.put(STORE_NAME, record);
  } catch (error) {
    // Handle quota exceeded errors
    if (error instanceof Error && error.name === "QuotaExceededError") {
      throw new Error(
        "Storage quota exceeded. Please free up space and try again.",
      );
    }

    // Handle other errors
    if (error instanceof Error) {
      throw new Error(`Failed to update module status: ${error.message}`);
    }

    throw error;
  }
}

/**
 * Get all module download records
 * Useful for debugging and displaying overall download status
 */
export async function getAllModuleStatuses(): Promise<ModuleDownloadRecord[]> {
  try {
    const db = await getDB();
    return await db.getAll(STORE_NAME);
  } catch (error) {
    console.error("Error getting all module statuses:", error);
    return [];
  }
}

/**
 * Clear all download records (useful for testing)
 */
export async function clearAllDownloads(): Promise<void> {
  try {
    const db = await getDB();
    await db.clear(STORE_NAME);
  } catch (error) {
    console.error("Error clearing downloads:", error);
    throw error;
  }
}
