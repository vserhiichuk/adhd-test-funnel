import type { CSSProperties } from "react";
import { GAUGE_CENTER, GAUGE_NEEDLE_HALF_WIDTH, GAUGE_START_ANGLE, GAUGE_STROKE } from "../constants";
import { gaugeSegments, needleAngle, needlePath } from "../lib/gauge-geometry";

type ScoreGaugeProps = {
  score: number;
  maxScore: number;
};

export function ScoreGauge({ score, maxScore }: ScoreGaugeProps) {
  const needleStyle = {
    rotate: `${needleAngle(score, maxScore)}deg`,
    transformOrigin: `${GAUGE_CENTER}px ${GAUGE_CENTER}px`,
    "--needle-from": `${GAUGE_START_ANGLE}deg`,
  } as CSSProperties;

  return (
    <svg
      viewBox="0 0 200 168"
      role="img"
      aria-label={`Score ${score} out of ${maxScore}`}
      className="w-56 shrink-0 sm:w-64"
    >
      {gaugeSegments().map(({ color, path }) => (
        <path
          key={color}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={GAUGE_STROKE}
          strokeLinecap="round"
        />
      ))}
      <g style={needleStyle} className="fill-footer motion-safe:animate-needle">
        <path d={needlePath()} />
        <circle cx={GAUGE_CENTER} cy={GAUGE_CENTER} r={GAUGE_NEEDLE_HALF_WIDTH} />
      </g>
      <text
        x={GAUGE_CENTER}
        y={150}
        textAnchor="middle"
        className="fill-muted font-sans text-[15px] font-medium"
      >
        {score} / {maxScore}
      </text>
    </svg>
  );
}
