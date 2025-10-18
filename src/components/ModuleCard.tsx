"use client";

import type { CourseModule } from "@/data/course";
import type { Module } from "@/data/lessons";
import { getModuleStatus, type DownloadStatus } from "@/lib/db";
import { useOnlineStatus } from "@/lib/network-status";
import { useEffect, useState } from "react";
import { ContentLink } from "./content-link";
import { ModuleDownloadButton } from "./ModuleDownloadButton";
import { OfflineWarning } from "./OfflineWarning";

type ModuleCardProps = {
  module: Module;
  courseModule?: CourseModule;
};

export function ModuleCard({ module, courseModule }: ModuleCardProps) {
  const isOnline = useOnlineStatus();
  const [downloadStatus, setDownloadStatus] =
    useState<DownloadStatus>("not-downloaded");

  // Load download status from IndexedDB
  useEffect(() => {
    if (courseModule) {
      getModuleStatus(courseModule.id).then(setDownloadStatus);
    }
  }, [courseModule]);

  const isDownloaded = downloadStatus === "downloaded";

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl/7 font-medium tracking-tight text-pretty text-gray-950 dark:text-white">
        {module.title}
      </h2>
      <p className="mt-4 text-base/7 text-gray-700 sm:text-sm/7 dark:text-gray-400">
        {module.description}
      </p>

      {courseModule && (
        <div className="mt-6">
          <ModuleDownloadButton
            moduleId={courseModule.id}
            assets={courseModule.assets}
          />
        </div>
      )}

      {/* Show offline warning if user is offline and module not downloaded */}
      {courseModule && (
        <div className="mt-4">
          <OfflineWarning isDownloaded={isDownloaded} isOnline={isOnline} />
        </div>
      )}

      <ol className="mt-6 space-y-4">
        {module.lessons.map((lesson) => (
          <li key={lesson.id}>
            <ContentLink
              title={lesson.title}
              description={lesson.description}
              href={`/${lesson.id}`}
              type="article"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
