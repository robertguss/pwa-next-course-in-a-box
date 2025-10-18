import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { NextPageLink } from "@/components/next-page-link";
import { getInterview, getInterviews } from "@/data/interviews";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

// Pre-render all interview pages at build time for offline-first PWA
export async function generateStaticParams() {
  const interviews = getInterviews();

  return interviews.map((interview) => ({
    slug: interview.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  let interview = await getInterview((await params).slug);

  return {
    title: `Interview with ${interview?.name} - Compass`,
    description: interview?.subtitle,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const interview = await getInterview((await params).slug);

  if (!interview) {
    notFound();
  }

  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb href="/interviews">Interviews</Breadcrumb>
          <BreadcrumbSeparator />
          <Breadcrumb>{interview.name}</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="-mx-2 sm:-mx-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image
            src={interview.image}
            alt={interview.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="mx-auto max-w-2xl py-14">
        <div className="space-y-6">
          <hgroup>
            <p className="text-sm/7 font-semibold text-gray-500">Interview</p>
            <h1 className="text-3xl tracking-tight text-gray-950 dark:text-white">
              {interview.name}
            </h1>
          </hgroup>
          <p className="text-base/7 text-gray-700 dark:text-gray-400">
            {interview.subtitle}
          </p>
        </div>
        <div className="mt-16 border-t border-gray-200 pt-8 dark:border-white/10">
          {interview.next ? (
            <NextPageLink
              title={interview.next.name}
              description={interview.next.subtitle}
              href={`/interviews/${interview.next.id}`}
            />
          ) : (
            <NextPageLink
              title="Resources"
              description="Before you decide where to go, you need to know where you're starting from."
              href="/resources"
            />
          )}
        </div>
      </div>
    </CenteredPageLayout>
  );
}
