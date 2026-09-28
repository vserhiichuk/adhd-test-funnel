import { seededRandom } from "@/shared/lib/math";
import { PARTICLE_SEED } from "./constants";
import { HEAD_BOX, HEAD_PARTICLE_DATA } from "./data";
import type { Particle, SpriteSheet } from "./types";

export function decodeParticles(sprites: SpriteSheet): Particle[] {
  const random = seededRandom(PARTICLE_SEED);
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
