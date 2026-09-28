import {
  GAUGE_CENTER,
  GAUGE_NEEDLE_HALF_WIDTH,
  GAUGE_NEEDLE_LENGTH,
  GAUGE_RADIUS,
  GAUGE_SEGMENT_COLORS,
  GAUGE_SEGMENT_GAP,
  GAUGE_START_ANGLE,
  GAUGE_SWEEP,
} from "../constants";
import type { GaugeSegment } from "../types";

export function gaugeSegments(): GaugeSegment[] {
  const segmentSweep = GAUGE_SWEEP / GAUGE_SEGMENT_COLORS.length;
  return GAUGE_SEGMENT_COLORS.map((color, index) => {
    const from = GAUGE_START_ANGLE + index * segmentSweep + GAUGE_SEGMENT_GAP / 2;
    return { color, path: arcPath(from, from + segmentSweep - GAUGE_SEGMENT_GAP) };
  });
}

export function needleAngle(score: number, maxScore: number): number {
  return GAUGE_START_ANGLE + (score / maxScore) * GAUGE_SWEEP;
}

/** A needle pointing right from the centre; it is rotated to the score. */
export function needlePath(): string {
  const tip = GAUGE_CENTER + GAUGE_NEEDLE_LENGTH;
  return `M${GAUGE_CENTER} ${GAUGE_CENTER - GAUGE_NEEDLE_HALF_WIDTH} L${tip} ${GAUGE_CENTER} L${GAUGE_CENTER} ${GAUGE_CENTER + GAUGE_NEEDLE_HALF_WIDTH} Z`;
}

function arcPath(fromAngle: number, toAngle: number): string {
  const [x1, y1] = polar(fromAngle);
  const [x2, y2] = polar(toAngle);
  const largeArc = toAngle - fromAngle > 180 ? 1 : 0;
  return `M${x1} ${y1} A${GAUGE_RADIUS} ${GAUGE_RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`;
}

function polar(angle: number): [number, number] {
  const radians = (angle * Math.PI) / 180;
  return [GAUGE_CENTER + GAUGE_RADIUS * Math.cos(radians), GAUGE_CENTER + GAUGE_RADIUS * Math.sin(radians)];
}
