import { useId } from "react";
import type { TrafficSign } from "../../types";
import {
  ArrowForkGlyph,
  ArrowGlyph,
  AirplaneGlyph,
  BikeGlyph,
  BridgeGlyph,
  BumpGlyph,
  BusGlyph,
  CarGlyph,
  ConstructionGlyph,
  CrossGlyph,
  DividedRoadGlyph,
  DoubleArrowGlyph,
  ForkKnifeGlyph,
  HornGlyph,
  HospitalGlyph,
  HourglassGlyph,
  InclineGlyph,
  LandslideGlyph,
  LetterEGlyph,
  MergeGlyph,
  MiniStopGlyph,
  NarrowGlyph,
  ObliqueJunctionGlyph,
  PersonGlyph,
  PhoneGlyph,
  PinGlyph,
  RailroadGlyph,
  RoundaboutGlyph,
  SharedPathGlyph,
  ShieldGlyph,
  SideJunctionGlyph,
  SlashGlyph,
  SlipperyGlyph,
  TJunctionGlyph,
  TrafficLightGlyph,
  UTurnGlyph,
  WavyRoadGlyph,
  WrenchGlyph,
  YJunctionGlyph,
} from "./glyphs";

interface SignIconProps {
  sign: TrafficSign;
  size?: number;
  className?: string;
}

const TONE_BG: Record<string, string> = {
  blue: "#0072ce",
  green: "#0aa860",
  white: "#f5f7fa",
  brown: "#7a4a1e",
};

function GlyphInner({ sign }: { sign: TrafficSign }) {
  const rotate = sign.glyphRotate ?? 0;
  const mirror = sign.glyphMirror ?? false;
  const transform = `rotate(${rotate} 50 50) ${mirror ? "scale(-1 1) translate(-100 0)" : ""}`;

  const content = (() => {
    switch (sign.glyph) {
      case "text":
        return null; // handled separately (supports multiline)
      case "blank":
        return null;
      case "arrowStraight":
        return <ArrowGlyph />;
      case "arrowCurve":
        return <ArrowGlyph curved />;
      case "arrowFork":
        return <ArrowForkGlyph />;
      case "uTurn":
        return <UTurnGlyph />;
      case "doubleArrowVertical":
        return <DoubleArrowGlyph />;
      case "doubleArrowHorizontal":
        return <DoubleArrowGlyph horizontal />;
      case "noEntryBar":
        return (
          <rect x="18" y="43" width="64" height="14" rx="3" fill="currentColor" />
        );
      case "carSlash":
        return (
          <>
            <CarGlyph />
            <SlashGlyph />
          </>
        );
      case "bike":
        return <BikeGlyph />;
      case "bus":
        return <BusGlyph />;
      case "pedestrian":
        return <PersonGlyph />;
      case "pedestrianSlash":
        return (
          <>
            <PersonGlyph />
            <SlashGlyph />
          </>
        );
      case "pedestrianChild":
        return (
          <>
            <PersonGlyph offsetX={-14} />
            <PersonGlyph small offsetX={22} />
          </>
        );
      case "hornSlash":
        return (
          <>
            <HornGlyph />
            <SlashGlyph />
          </>
        );
      case "overtakeSlash":
        return (
          <>
            <g transform="translate(-14 8) scale(0.55)">
              <CarGlyph />
            </g>
            <g transform="translate(14 -14) scale(0.55)">
              <CarGlyph />
            </g>
            <SlashGlyph />
          </>
        );
      case "laneChangeSlash":
        return (
          <>
            <ArrowGlyph curved />
            <SlashGlyph />
          </>
        );
      case "letterE":
        return <LetterEGlyph />;
      case "letterESlash":
        return (
          <>
            <LetterEGlyph />
            <SlashGlyph />
          </>
        );
      case "hourglassSlash":
        return (
          <>
            <HourglassGlyph />
            <SlashGlyph />
          </>
        );
      case "roundabout":
        return <RoundaboutGlyph />;
      case "crossPlus":
        return <CrossGlyph />;
      case "junctionT":
        return <TJunctionGlyph />;
      case "junctionY":
        return <YJunctionGlyph />;
      case "junctionSide":
        return <SideJunctionGlyph />;
      case "junctionOblique":
        return <ObliqueJunctionGlyph />;
      case "junctionMerge":
        return <MergeGlyph />;
      case "trafficLight":
        return <TrafficLightGlyph />;
      case "miniStop":
        return <MiniStopGlyph />;
      case "wavyRoad":
        return <WavyRoadGlyph />;
      case "bump":
        return <BumpGlyph />;
      case "dip":
        return <BumpGlyph dip />;
      case "incline":
        return <InclineGlyph />;
      case "narrow":
        return <NarrowGlyph />;
      case "widen":
        return <NarrowGlyph widen />;
      case "sharedPath":
        return <SharedPathGlyph />;
      case "bridge":
        return <BridgeGlyph />;
      case "construction":
        return <ConstructionGlyph />;
      case "dividedRoad":
        return <DividedRoadGlyph />;
      case "landslide":
        return <LandslideGlyph />;
      case "slippery":
        return <SlipperyGlyph />;
      case "railroadX":
        return <RailroadGlyph />;
      case "railroadGate":
        return <RailroadGlyph gate />;
      case "airplane":
        return <AirplaneGlyph />;
      case "pin":
        return <PinGlyph />;
      case "wrench":
        return <WrenchGlyph />;
      case "fork":
        return <ForkKnifeGlyph />;
      case "phone":
        return <PhoneGlyph />;
      case "hospital":
        return <HospitalGlyph />;
      case "shield":
        return <ShieldGlyph />;
      default:
        return null;
    }
  })();

  if (sign.glyph === "text" && sign.glyphText) {
    const lines = sign.glyphText.split("\n");
    const maxLen = Math.max(...lines.map((l) => l.length));
    let fontSize = 34;
    if (maxLen > 16) fontSize = 10;
    else if (maxLen > 12) fontSize = 12;
    else if (maxLen > 9) fontSize = 15;
    else if (maxLen > 6) fontSize = 19;
    else if (maxLen > 4) fontSize = 26;
    if (lines.length > 1) fontSize = Math.min(fontSize, 17);
    const lineHeight = fontSize + 4;
    const startY = 50 - ((lines.length - 1) * lineHeight) / 2 + fontSize / 3;
    return (
      <g>
        {lines.map((line, i) => (
          <text
            key={i}
            x="50"
            y={startY + i * lineHeight}
            textAnchor="middle"
            fontSize={fontSize}
            fontWeight={800}
            fill="currentColor"
          >
            {line}
          </text>
        ))}
      </g>
    );
  }

  return (
    <g transform={transform}>
      {content}
      {sign.slash && <SlashGlyph />}
    </g>
  );
}

function shapeClipAndFrame(sign: TrafficSign) {
  switch (sign.shape) {
    case "octagon": {
      const pts = "30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30";
      return (
        <>
          <polygon points={pts} fill="#e2231a" stroke="#f5f7fa" strokeWidth={4} />
        </>
      );
    }
    case "triangle-down": {
      const pts = "6,10 94,10 50,94";
      return (
        <>
          <polygon points={pts} fill="#f5f7fa" stroke="#e2231a" strokeWidth={10} strokeLinejoin="round" />
        </>
      );
    }
    case "diamond": {
      return (
        <polygon
          points="50,4 96,50 50,96 4,50"
          fill="#ffcc00"
          stroke="#111827"
          strokeWidth={4}
        />
      );
    }
    case "circle": {
      const mandatory = sign.variant === "mandatory";
      if (mandatory) {
        return <circle cx="50" cy="50" r="48" fill="#0072ce" stroke="#f5f7fa" strokeWidth={4} />;
      }
      return (
        <>
          <circle cx="50" cy="50" r="48" fill="#f5f7fa" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#e2231a" strokeWidth={9} />
        </>
      );
    }
    case "rectangle": {
      const tone = sign.tone ?? "blue";
      const bg = TONE_BG[tone];
      const isWhite = tone === "white";
      return (
        <rect
          x="4"
          y="16"
          width="92"
          height="68"
          rx="8"
          fill={bg}
          stroke={isWhite ? "#111827" : "#f5f7fa"}
          strokeWidth={isWhite ? 5 : 3}
        />
      );
    }
    default:
      return null;
  }
}

function clipShape(sign: TrafficSign) {
  switch (sign.shape) {
    case "octagon":
      return <polygon points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32" />;
    case "triangle-down":
      return <polygon points="12,16 88,16 50,88" />;
    case "diamond":
      return <polygon points="50,10 90,50 50,90 10,50" />;
    case "circle":
      return <circle cx="50" cy="50" r="40" />;
    case "rectangle":
      return <rect x="8" y="20" width="84" height="60" rx="6" />;
    default:
      return null;
  }
}

function iconTextColor(sign: TrafficSign) {
  if (sign.shape === "octagon") return "#f5f7fa";
  if (sign.shape === "triangle-down") return "#e2231a";
  if (sign.shape === "diamond") return "#111827";
  if (sign.shape === "circle") return sign.variant === "mandatory" ? "#f5f7fa" : "#111827";
  if (sign.shape === "rectangle") return sign.tone === "white" ? "#111827" : "#f5f7fa";
  return "#111827";
}

export default function SignIcon({ sign, size = 72, className = "" }: SignIconProps) {
  const reactId = useId();
  const clipId = `sign-clip-${reactId}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={sign.name}
    >
      <defs>
        <clipPath id={clipId}>{clipShape(sign)}</clipPath>
      </defs>
      {shapeClipAndFrame(sign)}
      <g color={iconTextColor(sign)} clipPath={`url(#${clipId})`}>
        <GlyphInner sign={sign} />
      </g>
    </svg>
  );
}
