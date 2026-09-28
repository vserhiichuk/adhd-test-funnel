import { EDGE_SOFTNESS, HOLLOW_LEVELS, OPACITY_LEVELS, RING_WIDTH, SPRITE_SIZE, WHITE_RGB } from "./constants";
import { HEAD_PARTICLE_RGB } from "./data";
import type { SpriteSheet } from "./types";

export function createSprites(): SpriteSheet {
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
