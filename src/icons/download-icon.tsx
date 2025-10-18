import clsx from "clsx";
import type React from "react";

export function DownloadIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={clsx(className, "h-4 shrink-0")}
      {...props}
    >
      <path
        d="M8 1.75V10.25M8 10.25L11.25 7M8 10.25L4.75 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 14.25H13.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
