export type Interview = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
};

export function getInterviews(): Interview[] {
  return interviews;
}

export async function getInterview(slug: string) {
  const index = interviews.findIndex(({ id }) => id === slug);

  if (index === -1) {
    return null;
  }

  const interview = interviews[index];

  return {
    ...interview,
    next: index < interviews.length - 1 ? interviews[index + 1] : null,
  };
}

const interviews = [
  {
    id: "annie-king",
    name: "Annie King",
    subtitle: "If the universe already has a plan, why don't you?",
    image:
      "https://assets.tailwindcss.com/templates/compass/annie-king-video-thumbnail.png",
  },
  {
    id: "nolan-grayson",
    name: "Dr. Nolan Grayson",
    subtitle: "Is Quantum Nirvana the key to true freedom?",
    image:
      "https://assets.tailwindcss.com/templates/compass/nolan-grayson-video-thumbnail.png",
  },
  {
    id: "eleanor-vann",
    name: "Eleanor Vann",
    subtitle: "The Passenger and the Path.",
    image:
      "https://assets.tailwindcss.com/templates/compass/eleanor-vann-video-thumbnail.png",
  },
  {
    id: "sophia-reid",
    name: "Sophia Reid",
    subtitle: "Are we destined by design?",
    image:
      "https://assets.tailwindcss.com/templates/compass/sophia-reid-video-thumbnail.png",
  },
  {
    id: "mick-larson",
    name: "Mick Larson",
    subtitle: "How to jailbreak reality and hack your fate.",
    image:
      "https://assets.tailwindcss.com/templates/compass/mick-larson-video-thumbnail.png",
  },
  {
    id: "tom-harris",
    name: "Tom Harris",
    subtitle: "Turning the tables on Tom.",
    image:
      "https://assets.tailwindcss.com/templates/compass/tom-harris-interview-video-thumbnail.png",
  },
];
