import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { clsx } from "clsx";
import { GeistMono } from "geist/font/mono";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type React from "react";
import "./globals.css";

const InterVariable = localFont({
  variable: "--font-inter",
  src: [
    { path: "./InterVariable.woff2", style: "normal" },
    { path: "./InterVariable-Italic.woff2", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "Compass",
  description: "Offline-first Progressive Web App for course delivery",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Compass",
  },
  icons: {
    apple: "/icons/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        GeistMono.variable,
        InterVariable.variable,
        "scroll-pt-16 font-sans antialiased dark:bg-gray-950",
      )}
    >
      <body>
        <ServiceWorkerRegistration />
        <div className="isolate">{children}</div>
      </body>
    </html>
  );
}
