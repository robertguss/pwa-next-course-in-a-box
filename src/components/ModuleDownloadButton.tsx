"use client";

import type { ModuleAsset } from "@/data/course";
import { CheckmarkIcon } from "@/icons/checkmark-icon";
import { DownloadIcon } from "@/icons/download-icon";
import {
  getModuleStatus,
  setModuleStatus,
  type DownloadStatus,
} from "@/lib/db";
import clsx from "clsx";
import { useEffect, useState } from "react";

type ModuleDownloadButtonProps = {
  moduleId: string;
  assets: ModuleAsset[];
};

export function ModuleDownloadButton({
  moduleId,
  assets,
}: ModuleDownloadButtonProps) {
  const [status, setStatus] = useState<DownloadStatus>("not-downloaded");
  const [error, setError] = useState<string | null>(null);

  // Load initial status from IndexedDB on mount
  useEffect(() => {
    async function loadStatus() {
      const currentStatus = await getModuleStatus(moduleId);
      setStatus(currentStatus);
    }
    loadStatus();
  }, [moduleId]);

  // Handle download process
  async function handleDownload() {
    try {
      // Clear any previous errors
      setError(null);

      // Update UI state to downloading immediately
      setStatus("downloading");
      await setModuleStatus(moduleId, "downloading");

      // Check if service worker is available
      if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
        throw new Error(
          "Service worker not available. Please reload the page.",
        );
      }

      // Store controller reference for TypeScript
      const swController = navigator.serviceWorker.controller;

      // Prepare asset URLs for caching
      const assetUrls = assets.map((asset) => asset.url);

      // Send message to service worker to cache assets
      return new Promise<void>((resolve, reject) => {
        // Create message channel for response
        const messageChannel = new MessageChannel();

        messageChannel.port1.onmessage = async (event) => {
          if (event.data.type === "CACHE_COMPLETE") {
            // Success - update status to downloaded
            setStatus("downloaded");
            await setModuleStatus(moduleId, "downloaded");
            resolve();
          } else if (event.data.type === "CACHE_ERROR") {
            // Error - update status and show error message
            setStatus("error");
            await setModuleStatus(moduleId, "error");
            setError(
              event.data.error || "Failed to download module. Please retry.",
            );
            reject(new Error(event.data.error));
          }
        };

        // Send message to service worker
        swController.postMessage(
          {
            type: "CACHE_MODULE_ASSETS",
            moduleId,
            assets: assetUrls,
          },
          [messageChannel.port2],
        );

        // Set timeout for download (30 seconds)
        setTimeout(() => {
          reject(new Error("Download timeout. Please check your connection."));
        }, 30000);
      });
    } catch (err) {
      // Handle errors
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      setStatus("error");
      await setModuleStatus(moduleId, "error");
    }
  }

  // Render button based on status
  if (status === "downloaded") {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3.5 py-2 text-sm/6 font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400"
      >
        <CheckmarkIcon className="h-4 w-4" />
        Offline Available
      </button>
    );
  }

  if (status === "downloading") {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-2 text-sm/6 font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      >
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Downloading...
      </button>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-2">
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          onClick={handleDownload}
          className={clsx(
            "inline-flex items-center gap-2 rounded-full bg-red-100 px-3.5 py-2 text-sm/6 font-semibold text-red-800 hover:bg-red-200 focus:outline-2 focus:outline-offset-2 focus:outline-red-500 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50",
          )}
        >
          <DownloadIcon className="h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  // Default: not-downloaded state
  return (
    <button
      onClick={handleDownload}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full bg-gray-950 px-3.5 py-2 text-sm/6 font-semibold text-white hover:bg-gray-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 dark:bg-gray-700 dark:hover:bg-gray-600",
      )}
    >
      <DownloadIcon className="h-4 w-4" />
      Download Module
    </button>
  );
}
