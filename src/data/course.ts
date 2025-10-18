export type ModuleAsset = {
  url: string;
  type: "audio" | "pdf" | "image";
  size: number; // Size in bytes
};

export type CourseModule = {
  id: string;
  title: string;
  description: string;
  assets: ModuleAsset[];
};

export function getCourseModules(): CourseModule[] {
  return courseModules;
}

// Sample module data with placeholder asset URLs for testing
const courseModules: CourseModule[] = [
  {
    id: "orientation",
    title: "Orientation: Understanding Where You Are",
    description:
      "You need to know where you're starting from, before you can pretend to decide where you're going.",
    assets: [
      {
        url: "/audio/orientation-intro.mp3",
        type: "audio",
        size: 2048000, // 2MB
      },
      {
        url: "/pdfs/orientation-workbook.pdf",
        type: "pdf",
        size: 1024000, // 1MB
      },
      {
        url: "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-01.png",
        type: "image",
        size: 512000, // 512KB
      },
    ],
  },
  {
    id: "direction",
    title: "Direction: Choosing a Path",
    description:
      "Experience the sensation of choice without the burden of true responsibility.",
    assets: [
      {
        url: "/audio/direction-intro.mp3",
        type: "audio",
        size: 2048000, // 2MB
      },
      {
        url: "/pdfs/direction-workbook.pdf",
        type: "pdf",
        size: 1024000, // 1MB
      },
      {
        url: "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-03.png",
        type: "image",
        size: 512000, // 512KB
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation: Steering Through the Inevitable",
    description:
      "Techniques for aligning with your inevitable trajectory while avoiding nihilism.",
    assets: [
      {
        url: "/audio/navigation-intro.mp3",
        type: "audio",
        size: 2048000, // 2MB
      },
      {
        url: "/pdfs/navigation-workbook.pdf",
        type: "pdf",
        size: 1024000, // 1MB
      },
      {
        url: "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-02.png",
        type: "image",
        size: 512000, // 512KB
      },
    ],
  },
  {
    id: "destination",
    title: "Destination: Arriving Where You Must",
    description:
      "How to be content with the inconsequential destiny you've been given.",
    assets: [
      {
        url: "/audio/destination-intro.mp3",
        type: "audio",
        size: 2048000, // 2MB
      },
      {
        url: "/pdfs/destination-workbook.pdf",
        type: "pdf",
        size: 1024000, // 1MB
      },
      {
        url: "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-04.png",
        type: "image",
        size: 512000, // 512KB
      },
    ],
  },
];
