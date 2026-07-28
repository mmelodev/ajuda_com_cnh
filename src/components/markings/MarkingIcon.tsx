import { useId } from "react";
import type { RoadMarking } from "../../types";
import { ArrowGlyph, BusGlyph } from "../signs/glyphs";

const ASPHALT = "#1a2030";
const WHITE = "#f5f7fa";
const YELLOW = "#ffcc00";
const RED = "#e2231a";

interface MarkingIconProps {
  marking: RoadMarking;
  size?: number;
  className?: string;
}

function lineColor(color?: RoadMarking["color"]) {
  if (color === "amarela") return YELLOW;
  if (color === "vermelha") return RED;
  return WHITE;
}

function LinePattern({ marking }: { marking: RoadMarking }) {
  const stroke = lineColor(marking.color);
  const dash = "12 12";

  switch (marking.pattern) {
    case "continua":
      return <line x1="50" y1="4" x2="50" y2="146" stroke={stroke} strokeWidth={7} strokeLinecap="round" />;
    case "tracejada":
      return (
        <line
          x1="50"
          y1="4"
          x2="50"
          y2="146"
          stroke={stroke}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={dash}
        />
      );
    case "dupla-continua":
      return (
        <>
          <line x1="43" y1="4" x2="43" y2="146" stroke={stroke} strokeWidth={6} strokeLinecap="round" />
          <line x1="57" y1="4" x2="57" y2="146" stroke={stroke} strokeWidth={6} strokeLinecap="round" />
        </>
      );
    case "mista":
      return (
        <>
          <line x1="43" y1="4" x2="43" y2="146" stroke={stroke} strokeWidth={6} strokeLinecap="round" />
          <line
            x1="57"
            y1="4"
            x2="57"
            y2="146"
            stroke={stroke}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={dash}
          />
        </>
      );
    default:
      return null;
  }
}

function Crosswalk() {
  const ys = [14, 34, 54, 74, 94, 114, 134];
  return (
    <>
      {ys.map((y) => (
        <rect key={y} x="14" y={y - 6} width="72" height="12" rx="2" fill={WHITE} />
      ))}
    </>
  );
}

function RetentionLine() {
  return (
    <>
      <line x1="50" y1="8" x2="50" y2="55" stroke={WHITE} strokeWidth={5} strokeDasharray="10 10" opacity={0.4} />
      <rect x="12" y="66" width="76" height="11" rx="2" fill={WHITE} />
      <line x1="50" y1="90" x2="50" y2="146" stroke={WHITE} strokeWidth={5} strokeDasharray="10 10" opacity={0.4} />
    </>
  );
}

function GroundText({ text }: { text: string }) {
  return (
    <text x="50" y="82" textAnchor="middle" fontSize="26" fontWeight={800} fill={WHITE}>
      {text}
    </text>
  );
}

function Hatched() {
  const offsets = Array.from({ length: 10 }, (_, i) => -30 + i * 16);
  return (
    <>
      {offsets.map((o) => (
        <line key={o} x1={o} y1="150" x2={o + 60} y2="0" stroke={WHITE} strokeWidth={5} />
      ))}
    </>
  );
}

function ExclusiveLane() {
  return (
    <>
      <rect x="10" y="6" width="80" height="138" rx="6" fill={RED} opacity={0.28} />
      <g transform="translate(20 48) scale(0.6)" color={WHITE}>
        <BusGlyph />
      </g>
    </>
  );
}

function Arrow() {
  return (
    <g transform="translate(12 25) scale(0.76)" color={WHITE}>
      <ArrowGlyph />
    </g>
  );
}

export default function MarkingIcon({ marking, size = 90, className = "" }: MarkingIconProps) {
  const reactId = useId();
  const clipId = `marking-clip-${reactId}`;

  const content = (() => {
    switch (marking.visual) {
      case "line":
        return <LinePattern marking={marking} />;
      case "crosswalk":
        return <Crosswalk />;
      case "retention-line":
        return <RetentionLine />;
      case "text":
        return <GroundText text={marking.visualText ?? ""} />;
      case "hatched":
        return <Hatched />;
      case "exclusive-lane":
        return <ExclusiveLane />;
      case "arrow":
        return <Arrow />;
      default:
        return null;
    }
  })();

  return (
    <svg
      viewBox="0 0 100 150"
      width={size}
      height={size * 1.5}
      className={className}
      role="img"
      aria-label={marking.name}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="4" y="4" width="92" height="142" rx="10" />
        </clipPath>
      </defs>
      <rect x="4" y="4" width="92" height="142" rx="10" fill={ASPHALT} stroke="#384158" strokeWidth={2} />
      <g clipPath={`url(#${clipId})`}>{content}</g>
    </svg>
  );
}
