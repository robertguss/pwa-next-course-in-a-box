"use client";

type OfflineWarningProps = {
  isDownloaded: boolean;
  isOnline: boolean;
};

/**
 * OfflineWarning component displays a warning message when the user
 * is offline and attempting to access a module that has not been downloaded.
 * Only displays when: isOnline = false AND isDownloaded = false
 */
export function OfflineWarning({
  isDownloaded,
  isOnline,
}: OfflineWarningProps) {
  // Only show warning when offline AND module is not downloaded
  if (isOnline || isDownloaded) {
    return null;
  }

  return (
    <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4 dark:border-yellow-600 dark:bg-yellow-900/20">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400 dark:text-yellow-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            This module is not available offline. Please download it when you
            have internet access.
          </p>
        </div>
      </div>
    </div>
  );
}
