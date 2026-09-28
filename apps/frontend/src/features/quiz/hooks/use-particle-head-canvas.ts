import { useEffect, useRef } from "react";
import { createHeadRenderer } from "../lib/head-particles/renderer";

/** Draws the particle head on the returned canvas: animated, or as a still frame under reduced motion. */
export function useParticleHeadCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    const render = createHeadRenderer(context);
    const isAnimated = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let startedAt: number | null = null;

    const draw = (now: number) => {
      startedAt ??= now;
      render(isAnimated ? (now - startedAt) / 1000 : null);
      if (isAnimated) {
        frame = requestAnimationFrame(draw);
      }
    };

    const resize = new ResizeObserver(() => {
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
      if (!isAnimated) {
        draw(0);
      }
    });
    resize.observe(canvas);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, []);

  return canvasRef;
}
