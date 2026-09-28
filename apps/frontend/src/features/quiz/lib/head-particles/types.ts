export type Particle = {
  x: number;
  y: number;
  radius: number;
  sprite: HTMLCanvasElement;
  fromX: number;
  fromY: number;
  phase: number;
  speed: number;
  delay: number;
};

/** Sprites by hollow level, then by opacity level. */
export type SpriteSheet = HTMLCanvasElement[][];

/** `seconds` since start animates the head, `null` draws the final frame. */
export type HeadRenderer = (seconds: number | null) => void;
