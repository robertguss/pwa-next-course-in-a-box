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
      // Lesson thumbnail images
      {
        url: "/images/lesson-video-thumbnail-01.png",
        type: "image",
        size: 300000,
      },
      {
        url: "/images/lesson-video-thumbnail-02.png",
        type: "image",
        size: 300000,
      },
      {
        url: "/images/lesson-video-thumbnail-04.png",
        type: "image",
        size: 300000,
      },
      // MDX content images (light and dark variants)
      {
        url: "/images/perceived-options.light.png",
        type: "image",
        size: 800000,
      },
      {
        url: "/images/perceived-options.dark.png",
        type: "image",
        size: 800000,
      },
      {
        url: "/images/maze.light.png",
        type: "image",
        size: 600000,
      },
      {
        url: "/images/maze.dark.png",
        type: "image",
        size: 600000,
      },
      {
        url: "/images/libet.light.png",
        type: "image",
        size: 500000,
      },
      {
        url: "/images/libet.dark.png",
        type: "image",
        size: 500000,
      },
      {
        url: "/images/behaviour-model.light.png",
        type: "image",
        size: 700000,
      },
      {
        url: "/images/behaviour-model.dark.png",
        type: "image",
        size: 700000,
      },
      {
        url: "/images/behaviour-model-three.light.png",
        type: "image",
        size: 650000,
      },
      {
        url: "/images/behaviour-model-three.dark.png",
        type: "image",
        size: 650000,
      },
      {
        url: "/images/behaviour-model-two.light.png",
        type: "image",
        size: 700000,
      },
      {
        url: "/images/behaviour-model-two.dark.png",
        type: "image",
        size: 700000,
      },
    ],
  },
  {
    id: "direction",
    title: "Direction: Choosing a Path",
    description:
      "Experience the sensation of choice without the burden of true responsibility.",
    assets: [
      // Lesson thumbnail images
      {
        url: "/images/lesson-video-thumbnail-01.png",
        type: "image",
        size: 300000,
      },
      {
        url: "/images/lesson-video-thumbnail-03.png",
        type: "image",
        size: 300000,
      },
      {
        url: "/images/lesson-video-thumbnail-05.png",
        type: "image",
        size: 300000,
      },
      // MDX content images (light and dark variants)
      {
        url: "/images/causal-forces.light.png",
        type: "image",
        size: 700000,
      },
      {
        url: "/images/causal-forces.dark.png",
        type: "image",
        size: 700000,
      },
      {
        url: "/images/randomness.light.png",
        type: "image",
        size: 900000,
      },
      {
        url: "/images/randomness.dark.png",
        type: "image",
        size: 900000,
      },
      {
        url: "/images/path-determination.light.png",
        type: "image",
        size: 650000,
      },
      {
        url: "/images/path-determination.dark.png",
        type: "image",
        size: 650000,
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation: Steering Through the Inevitable",
    description:
      "Techniques for aligning with your inevitable trajectory while avoiding nihilism.",
    assets: [
      // Lesson thumbnail images
      {
        url: "/images/lesson-video-thumbnail-02.png",
        type: "image",
        size: 300000,
      },
      // MDX content images (light and dark variants)
      {
        url: "/images/coincidence.light.png",
        type: "image",
        size: 700000,
      },
      {
        url: "/images/coincidence.dark.png",
        type: "image",
        size: 700000,
      },
      {
        url: "/images/anxiety.light.png",
        type: "image",
        size: 450000,
      },
      {
        url: "/images/anxiety.dark.png",
        type: "image",
        size: 450000,
      },
      {
        url: "/images/jung.light.png",
        type: "image",
        size: 700000,
      },
      {
        url: "/images/jung.dark.png",
        type: "image",
        size: 700000,
      },
    ],
  },
  {
    id: "destination",
    title: "Destination: Arriving Where You Must",
    description:
      "How to be content with the inconsequential destiny you've been given.",
    assets: [
      // Lesson thumbnail images
      {
        url: "/images/lesson-video-thumbnail-01.png",
        type: "image",
        size: 300000,
      },
      {
        url: "/images/lesson-video-thumbnail-02.png",
        type: "image",
        size: 300000,
      },
      {
        url: "/images/lesson-video-thumbnail-04.png",
        type: "image",
        size: 300000,
      },
      {
        url: "/images/lesson-video-thumbnail-05.png",
        type: "image",
        size: 300000,
      },
      // MDX content images (light and dark variants)
      {
        url: "/images/success.light.png",
        type: "image",
        size: 500000,
      },
      {
        url: "/images/success.dark.png",
        type: "image",
        size: 500000,
      },
    ],
  },
];
