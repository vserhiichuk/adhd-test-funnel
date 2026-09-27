import type { CSSProperties } from "react";

// Speedometer from bottom-left to bottom-right (angles in SVG degrees, 0° = right, clockwise).
const START_ANGLE = 150;
const SWEEP = 240;
const SEGMENT_COLORS = ["#a6cfa7", "#e6d36f", "#ebb85c", "#e2704f"];
// Wide enough for the round caps to leave a visible gap between segments.
const SEGMENT_GAP = 14;
const CENTER = 100;
const RADIUS = 78;
const STROKE = 16;

type ScoreGaugeProps = {
  score: number;
  maxScore: number;
};

export function ScoreGauge({ score, maxScore }: ScoreGaugeProps) {
  const needleAngle = START_ANGLE + (score / maxScore) * SWEEP;
  const segmentSweep = SWEEP / SEGMENT_COLORS.length;
  const needleStyle = {
    rotate: `${needleAngle}deg`,
    transformOrigin: `${CENTER}px ${CENTER}px`,
    "--needle-from": `${START_ANGLE}deg`,
  } as CSSProperties;

  return (
    <svg
      viewBox="0 0 200 168"
      role="img"
      aria-label={`Score ${score} out of ${maxScore}`}
      className="w-56 shrink-0 sm:w-64"
    >
      {SEGMENT_COLORS.map((color, index) => {
        const from = START_ANGLE + index * segmentSweep + SEGMENT_GAP / 2;
        return (
          <path
            key={color}
            d={arcPath(from, from + segmentSweep - SEGMENT_GAP)}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
        );
      })}
      <g style={needleStyle} className="fill-footer motion-safe:animate-needle">
        <path d={`M${CENTER} ${CENTER - 7} L${CENTER + 50} ${CENTER} L${CENTER} ${CENTER + 7} Z`} />
        <circle cx={CENTER} cy={CENTER} r={7} />
      </g>
      <text
        x={CENTER}
        y={150}
        textAnchor="middle"
        className="fill-muted font-sans text-[15px] font-medium"
      >
        {score} / {maxScore}
      </text>
    </svg>
  );
}

function arcPath(fromAngle: number, toAngle: number): string {
  const [x1, y1] = polar(fromAngle);
  const [x2, y2] = polar(toAngle);
  const largeArc = toAngle - fromAngle > 180 ? 1 : 0;
  return `M${x1} ${y1} A${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`;
}

function polar(angle: number): [number, number] {
  const radians = (angle * Math.PI) / 180;
  return [CENTER + RADIUS * Math.cos(radians), CENTER + RADIUS * Math.sin(radians)];
}
