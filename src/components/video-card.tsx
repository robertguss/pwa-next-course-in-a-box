import Image from "next/image";
import Link from "next/link";

export function VideoCard({
  url,
  target,
  thumbnailUrl,
  title,
  subtitle,
}: {
  url: string;
  target?: string;
  thumbnailUrl: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link href={url} target={target}>
      <div className="relative">
        <Image
          src={thumbnailUrl}
          width={400}
          height={225}
          alt=""
          className="aspect-video w-full rounded-lg bg-gray-950 object-cover dark:bg-gray-900"
        />
      </div>
      <p className="mt-4 text-sm/6 font-semibold text-gray-950 dark:text-white">
        {title}
      </p>
      <p className="text-sm/6 text-gray-600 dark:text-gray-400">{subtitle}</p>
    </Link>
  );
}
