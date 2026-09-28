"use client";

import { useParticleHeadCanvas } from "../hooks/use-particle-head-canvas";

export function ParticleHead({ className }: { className?: string }) {
  const canvasRef = useParticleHeadCanvas();
  return <canvas ref={canvasRef} className={className} />;
}
