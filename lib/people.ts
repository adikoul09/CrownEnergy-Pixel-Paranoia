import type { StaticImageData } from "next/image";

import photoshoot from "@/assets/photography/photoshoot.png";
import roger from "@/assets/people/roger.png";
import coco from "@/assets/people/coco.png";
import lewis from "@/assets/people/lewis.png";
import leo from "@/assets/people/leo.png";
import tiger from "@/assets/people/tiger.png";
import hans from "@/assets/people/hans.png";

/**
 * The project's photographs (Assets / Mockup 2 photoshoot, Personalities).
 * Server-only consumers, so none of this reaches the client bundle.
 */

export const photoshootImage = photoshoot;

/**
 * How a landscape photograph is set into a portrait frame. Measured on each
 * source: `x` is the centre of the face and `eyes` the eye line, both as a share
 * of the photograph's width and height; `zoom` enlarges the photograph so every
 * face is about the same size in its frame (head ≈ 36% of the frame's height).
 */
export interface Frame {
  x: number;
  eyes: number;
  zoom: number;
}

export interface Person {
  key: string;
  name: string;
  field: string;
  achievement: string;
  image: StaticImageData;
  alt: string;
  /** Portrait framing, for photographs shown in The Standard. */
  frame?: Frame;
}

/** Public figures, shown as examples of achievement — never as endorsers. No quotes are attributed. */
export const standard: Person[] = [
  {
    key: "roger",
    name: "Roger Federer",
    field: "Tennis",
    achievement: "Twenty Grand Slam titles",
    image: roger,
    alt: "Roger Federer holding a championship trophy",
    frame: { x: 0.508, eyes: 0.19, zoom: 1.16 },
  },
  {
    key: "lewis",
    name: "Lewis Hamilton",
    field: "Formula One",
    achievement: "Seven World Championships",
    image: lewis,
    alt: "Lewis Hamilton waving on a podium",
    frame: { x: 0.467, eyes: 0.475, zoom: 1.8 },
  },
  {
    key: "tiger",
    name: "Tiger Woods",
    field: "Golf",
    achievement: "Fifteen major championships",
    image: tiger,
    alt: "Tiger Woods smiling on a golf course",
    frame: { x: 0.47, eyes: 0.175, zoom: 2.1 },
  },
  {
    key: "leo",
    name: "Leonardo DiCaprio",
    field: "Cinema",
    achievement: "Academy Award, Best Actor",
    image: leo,
    alt: "Leonardo DiCaprio holding an Academy Award",
    frame: { x: 0.467, eyes: 0.26, zoom: 1.06 },
  },
  {
    key: "coco",
    name: "Coco Gauff",
    field: "Tennis",
    achievement: "Grand Slam champion",
    image: coco,
    alt: "Coco Gauff holding a championship trophy",
    frame: { x: 0.53, eyes: 0.24, zoom: 1.25 },
  },
];

export const founder: Person = {
  key: "hans",
  name: "Hans Wilsdorf",
  field: "Founder · 1905",
  achievement: "Founded the house in 1905",
  image: hans,
  alt: "Archival portrait of Hans Wilsdorf",
};
