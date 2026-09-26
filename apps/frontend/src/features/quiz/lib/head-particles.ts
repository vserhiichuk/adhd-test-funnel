import { HEAD_BOX, HEAD_PARTICLE_DATA, HEAD_PARTICLE_RGB } from "./head-particle-data";

// Placement of the head inside the visual, as in the design.
const HEAD_SHARE_OF_HEIGHT = 0.68;
const HEAD_CENTER_X = 0.515;
const HEAD_CENTER_Y = 0.53;

const ASSEMBLE_SECONDS = 1.8;
const DRIFT = 0.8;

// Particles are pre-rendered sprites: a disc whose centre turns white as it gets more hollow,
// up to a ring with an opaque white centre that hides the particles behind it.
const SPRITE_SIZE = 64;
const HOLLOW_LEVELS = 4;
const OPACITY_LEVELS = 10;
const RING_WIDTH = 0.5;
const EDGE_SOFTNESS = 0.15;
const WHITE_RGB = "255, 255, 255";

type Particle = {
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

export type HeadRenderer = (seconds: number | null) => void;

/** Draws the head; `seconds` since start animates it, `null` draws the final frame. */
export function createHeadRenderer(context: CanvasRenderingContext2D): HeadRenderer {
  const particles = decodeParticles(createSprites());
  context.imageSmoothingQuality = "high";
  return (seconds) => renderFrame(context, particles, seconds);
}

function decodeParticles(sprites: HTMLCanvasElement[][]): Particle[] {
  const random = seededRandom(7);
  const data = HEAD_PARTICLE_DATA.replace(/\s/g, "");
  const particles: Particle[] = [];

  for (let i = 0; i < data.length; i += 6) {
    const [x, y, packed] = [0, 2, 4].map((offset) => parseInt(data.slice(i + offset, i + offset + 2), 36));
    const shape = Math.floor(packed / 10);
    const angle = random() * Math.PI * 2;
    const distance = (0.5 + random() * 0.6) * HEAD_BOX.height;
    particles.push({
      x,
      y,
      radius: (shape % 16) / 2,
      sprite: sprites[Math.floor(shape / 16)][packed % 10],
      fromX: HEAD_BOX.width / 2 + Math.cos(angle) * distance,
      fromY: HEAD_BOX.height / 2 + Math.sin(angle) * distance,
      phase: random() * Math.PI * 2,
      speed: 0.6 + random() * 0.9,
      delay: random() * 0.6,
    });
  }
  // Small particles first, so the larger rings sit on top, as in the design.
  return particles.sort((a, b) => a.radius - b.radius);
}

function createSprites(): HTMLCanvasElement[][] {
  return Array.from({ length: HOLLOW_LEVELS }, (_, hollow) =>
    Array.from({ length: OPACITY_LEVELS }, (_, opacity) => createSprite(hollow, opacity)),
  );
}

function createSprite(hollow: number, opacity: number): HTMLCanvasElement {
  const sprite = document.createElement("canvas");
  sprite.width = SPRITE_SIZE;
  sprite.height = SPRITE_SIZE;
  const context = sprite.getContext("2d");
  if (context) {
    const radius = SPRITE_SIZE / 2;
    fillSoftCircle(context, radius, HEAD_PARTICLE_RGB, opacity / (OPACITY_LEVELS - 1));
    if (hollow > 0) {
      fillSoftCircle(context, radius * (1 - RING_WIDTH), WHITE_RGB, hollow / (HOLLOW_LEVELS - 1));
    }
  }
  return sprite;
}

// A disc whose edge fades out, so particles stay round and soft when drawn a few pixels wide.
function fillSoftCircle(context: CanvasRenderingContext2D, radius: number, rgb: string, alpha: number): void {
  const center = SPRITE_SIZE / 2;
  const gradient = context.createRadialGradient(center, center, 0, center, center, radius);
  gradient.addColorStop(0, `rgba(${rgb}, ${alpha})`);
  gradient.addColorStop(1 - EDGE_SOFTNESS, `rgba(${rgb}, ${alpha})`);
  gradient.addColorStop(1, `rgba(${rgb}, 0)`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
}

function renderFrame(context: CanvasRenderingContext2D, particles: Particle[], seconds: number | null): void {
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

    context.globalAlpha = progress * (0.9 + 0.1 * Math.sin(wave * 1.7));
    context.drawImage(particle.sprite, offsetX + x * scale - size / 2, offsetY + y * scale - size / 2, size, size);
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
