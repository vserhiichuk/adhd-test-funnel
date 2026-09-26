import { HEAD_BOX, HEAD_PARTICLE_DATA, HEAD_PARTICLE_RGB } from "./head-particle-data";

// Placement of the head inside the visual, as in the design.
const HEAD_SHARE_OF_HEIGHT = 0.68;
const HEAD_CENTER_X = 0.515;
const HEAD_CENTER_Y = 0.53;

const ASSEMBLE_SECONDS = 1.8;
const DRIFT = 0.8;

// A soft bubble with a translucent centre and a denser rim, like the design's particles.
const SPRITE_SIZE = 64;
const BUBBLE_STOPS: [offset: number, alpha: number][] = [
  [0, 0.5],
  [0.5, 0.62],
  [0.8, 1],
  [0.92, 0.9],
  [1, 0],
];

type Particle = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  fromX: number;
  fromY: number;
  phase: number;
  speed: number;
  delay: number;
};

export type HeadRenderer = (seconds: number | null) => void;

/** Draws the head; `seconds` since start animates it, `null` draws the final frame. */
export function createHeadRenderer(context: CanvasRenderingContext2D): HeadRenderer {
  const particles = decodeParticles();
  const sprite = createBubbleSprite();
  context.imageSmoothingQuality = "high";
  return (seconds) => renderFrame(context, particles, sprite, seconds);
}

function decodeParticles(): Particle[] {
  const random = seededRandom(7);
  const data = HEAD_PARTICLE_DATA.replace(/\s/g, "");
  const particles: Particle[] = [];

  for (let i = 0; i < data.length; i += 6) {
    const [x, y, size] = [0, 2, 4].map((offset) => parseInt(data.slice(i + offset, i + offset + 2), 36));
    const angle = random() * Math.PI * 2;
    const distance = (0.5 + random() * 0.6) * HEAD_BOX.height;
    particles.push({
      x,
      y,
      radius: Math.floor(size / 10) / 2,
      opacity: (size % 10) / 9,
      fromX: HEAD_BOX.width / 2 + Math.cos(angle) * distance,
      fromY: HEAD_BOX.height / 2 + Math.sin(angle) * distance,
      phase: random() * Math.PI * 2,
      speed: 0.6 + random() * 0.9,
      delay: random() * 0.6,
    });
  }
  return particles;
}

function createBubbleSprite(): HTMLCanvasElement {
  const sprite = document.createElement("canvas");
  sprite.width = SPRITE_SIZE;
  sprite.height = SPRITE_SIZE;
  const context = sprite.getContext("2d");
  if (context) {
    const center = SPRITE_SIZE / 2;
    const gradient = context.createRadialGradient(center, center, 0, center, center, center);
    for (const [offset, alpha] of BUBBLE_STOPS) {
      gradient.addColorStop(offset, `rgba(${HEAD_PARTICLE_RGB}, ${alpha})`);
    }
    context.fillStyle = gradient;
    context.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
  }
  return sprite;
}

function renderFrame(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  sprite: HTMLCanvasElement,
  seconds: number | null,
): void {
  const { width, height } = context.canvas;
  const scale = (height * HEAD_SHARE_OF_HEIGHT) / HEAD_BOX.height;
  const offsetX = width * HEAD_CENTER_X - (HEAD_BOX.width * scale) / 2;
  const offsetY = height * HEAD_CENTER_Y - (HEAD_BOX.height * scale) / 2;

  context.clearRect(0, 0, width, height);

  for (const particle of particles) {
    const progress =
      seconds === null ? 1 : easeOutCubic(clamp01((seconds - particle.delay) / ASSEMBLE_SECONDS));
    const wave = particle.phase + (seconds ?? 0) * particle.speed;
    const x = lerp(particle.fromX, particle.x, progress) + Math.sin(wave) * DRIFT * progress;
    const y = lerp(particle.fromY, particle.y, progress) + Math.cos(wave * 0.8) * DRIFT * progress;
    const size = particle.radius * 2 * scale;

    context.globalAlpha = particle.opacity * progress * (0.85 + 0.15 * Math.sin(wave * 1.7));
    context.drawImage(sprite, offsetX + x * scale - size / 2, offsetY + y * scale - size / 2, size, size);
  }
  context.globalAlpha = 1;
}

function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;
const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;
