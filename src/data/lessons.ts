export type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  image: string | null;
};

export function getModules(): Module[] {
  return lessons;
}

export async function getLesson(
  slug: string,
): Promise<(Lesson & { module: Module; next: Lesson | null }) | null> {
  let module = lessons.find(({ lessons }) =>
    lessons.some(({ id }) => id === slug),
  );

  if (!module) {
    return null;
  }

  let index = module.lessons.findIndex(({ id }) => id === slug);

  return {
    ...module.lessons[index],
    module,
    next: index < module.lessons.length - 1 ? module.lessons[index + 1] : null,
  };
}

export async function getLessonContent(slug: string) {
  return (await import(`@/data/lessons/${slug}.mdx`)).default;
}

const lessons = [
  {
    id: "orientation",
    title: "Orientation: Understanding Where You Are",
    description:
      "You need to know where you're starting from, before you can pretend to decide where you're going.",
    lessons: [
      {
        id: "landscape-of-choice",
        title: "The Landscape of Choice",
        description:
          "A practical map for navigating the illusion that you actually have any agency at all.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-01.png",
      },
      {
        id: "paradox-of-agency",
        title: "The Paradox of Agency",
        description:
          "Explore whether you're living your life or just reacting to everyone else's.",
        image: null,
      },
      {
        id: "liberation-from-regret",
        title: "Liberation from Regret",
        description:
          "If no alternative choice was ever possible, regret becomes logically unnecessary.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-02.png",
      },
      {
        id: "recognizing-patterns",
        title: "Recognizing Patterns",
        description:
          "Failures weren't freely chosen but were inevitable given your circumstances.",
        image: null,
      },
      {
        id: "values-and-goals",
        title: "Values and Goals",
        description:
          "Identify patterns in your interests and abilities that reveal your predetermined direction.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-04.png",
      },
    ],
  },
  {
    id: "direction",
    title: "Direction: Choosing a Path",
    description:
      "Experience the sensation of choice without the burden of true responsibility.",
    lessons: [
      {
        id: "mapping-causal-factors",
        title: "Mapping the Causal Factors",
        description:
          "The causes acting on you can give you insight into where they might take you.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-03.png",
      },
      {
        id: "reframing-uncertainty",
        title: "Reframing Uncertainty as Agency",
        description:
          "If you squint, not being able to predict the future looks sort of like free will.",
        image: null,
      },
      {
        id: "decision-paralysis",
        title: "Overcoming Decision Paralysis",
        description:
          "You can't be paralysed by choices you don't actually have.",
        image: null,
      },
      {
        id: "path-of-least-resistance",
        title: "Perceiving the Path of Least Resistance",
        description:
          "Recognizing which direction requires the least psychological struggle.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-01.png",
      },
      {
        id: "surrendering-outcome",
        title: "Surrendering to the Outcome",
        description:
          "Accepting that whatever path you choose has no bearing on where you'll go.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-05.png",
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation: Steering Through the Inevitable",
    description:
      "Techniques for aligning with your inevitable trajectory while avoiding nihilism.",
    lessons: [
      {
        id: "widening-field-of-view",
        title: "Widening Your Field of View",
        description:
          "The universe can be cruel and it's important to see that coming.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-02.png",
      },
      {
        id: "dealing-with-coincidence",
        title: "Dealing with Coincidence",
        description:
          "If something does go the way you intended, realize that this was purely coincidental.",
        image: null,
      },
      {
        id: "forgiving-others",
        title: "Forgiving Others",
        description:
          "When actions are beyond one's control, punishment is illogical.",
        image: null,
      },
      {
        id: "anxiety-messages",
        title: "What Anxiety Is Trying to Tell You",
        description:
          "A lack of control can make you anxious, but realize this has no bearing on outcomes.",
        image: null,
      },
      {
        id: "maintaining-self",
        title: "Maintaining a Sense of Self",
        description:
          "Who you think you are has been assigned to you by circumstance.",
        image: null,
      },
    ],
  },
  {
    id: "destination",
    title: "Destination: Arriving Where You Must",
    description:
      "How to be content with the inconsequential destiny you've been given.",
    lessons: [
      {
        id: "reframing-achievement",
        title: "Reframing Achievement and Failure",
        description:
          "Pride and regret are just psychological coping mechanisms.",
        image: null,
      },
      {
        id: "surrendering-to-success",
        title: "Surrendering to Success",
        description:
          "Achievements reveal capabilities that were always present rather than self development.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-02.png",
      },
      {
        id: "giving-credit",
        title: "Giving Credit Where it's Due",
        description:
          "Recognize the broader system that produced your achievement.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-04.png",
      },
      {
        id: "unburden-accountability",
        title: "Unburden Yourself from Accountability",
        description:
          "When things haven't gone your way, it literally couldn't have been your fault.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-05.png",
      },
      {
        id: "writing-autobiography",
        title: "Exercise: Writing your autobiography",
        description: "A way to come to grips with your inconsequence.",
        image:
          "https://assets.tailwindcss.com/templates/compass/lesson-video-thumbnail-01.png",
      },
    ],
  },
];
