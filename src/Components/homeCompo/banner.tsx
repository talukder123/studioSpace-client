import musicImg from "@/assets/hero/music.png";
import podcastImg from "@/assets/hero/podcast.png";
import seminarHallImg from "@/assets/hero/seminar hall.png";

import { HeroSlider, type HeroSlide } from "./HeroSlider";

const slides: HeroSlide[] = [
  {
    id: "music",
    eyebrow: "Music Studio",
    title: "Find the Perfect Space for Your Sounds.",
    description:
      "Rehearsal rooms, live stages, and recording-ready spaces built for artists who care about how they sound.",
    image: musicImg,
    imageAlt:
      "Music studio with acoustic guitars on the wall and a treble clef mural",
  },
  {
    id: "podcast",
    eyebrow: "Podcast Studio",
    title: "Your Next Big Idea Deserves a Great Space.",
    description:
      "Voice booths, video sets, and acoustically tuned rooms that make every episode sound like your best one.",
    image: podcastImg,
    imageAlt:
      "Podcast studio with velvet armchairs, microphones, and a yellow bookshelf",
  },
  {
    id: "hosting",
    eyebrow: "Event & Hosting",
    title: "Turn Your Creative Space Into an Opportunity.",
    description:
      "List your hall, studio, or event space and turn quiet weekends into a steady stream of creative bookings.",
    image: seminarHallImg,
    imageAlt:
      "Spacious seminar hall with rows of golden chairs under warm ceiling lights",
  },
];

const BannerSection = () => {
  return <HeroSlider slides={slides} />;
};

export default BannerSection;
