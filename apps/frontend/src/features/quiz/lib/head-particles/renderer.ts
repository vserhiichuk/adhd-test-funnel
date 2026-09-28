import { clamp01, easeOutCubic, lerp } from "@/shared/lib/math";
import { ASSEMBLE_SECONDS, DRIFT, HEAD_CENTER_X, HEAD_CENTER_Y, HEAD_SHARE_OF_HEIGHT } from "./constants";
import { HEAD_BOX } from "./data";
import { decodeParticles } from "./particles";
import { createSprites } from "./sprites";
import type { HeadRenderer, Particle } from "./types";

export function createHeadRenderer(context: CanvasRenderingContext2D): HeadRenderer {
  const particles = decodeParticles(createSprites());
  context.imageSmoothingQuality = "high";
  return (seconds) => renderFrame(context, particles, seconds);
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
