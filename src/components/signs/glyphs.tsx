/**
 * Small reusable SVG pictogram primitives used to build simplified,
 * hand-drawn approximations of Brazilian traffic sign pictograms.
 * These are stylized for learning purposes, not pixel-accurate DENATRAN art.
 */

const STROKE = 7;

export function ArrowGlyph({ curved = false }: { curved?: boolean }) {
  if (curved) {
    return (
      <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 82 V40 C50 25 60 18 74 18" />
        <path d="M64 10 L78 18 L64 27 Z" fill="currentColor" stroke="none" />
      </g>
    );
  }
  return (
    <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 84 V22" />
      <path d="M32 40 L50 18 L68 40" />
    </g>
  );
}

export function ArrowForkGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 84 V45" />
      <path d="M50 45 C50 28 58 20 70 16" />
      <path d="M60 10 L74 16 L62 24" />
      <path d="M34 38 L50 22 L50 45" />
    </g>
  );
}

export function UTurnGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <path d="M62 82 V45 C62 25 46 18 34 26 C25 32 25 42 30 48" />
      <path d="M18 40 L30 48 L38 36" />
    </g>
  );
}

export function DoubleArrowGlyph({ horizontal = false }: { horizontal?: boolean }) {
  if (horizontal) {
    return (
      <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 50 H86" />
        <path d="M28 36 L14 50 L28 64" />
        <path d="M72 36 L86 50 L72 64" />
      </g>
    );
  }
  return (
    <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 14 V86" />
      <path d="M36 28 L50 14 L64 28" />
      <path d="M36 72 L50 86 L64 72" />
    </g>
  );
}

export function SlashGlyph() {
  return <path d="M14 86 L86 14" stroke="currentColor" strokeWidth={8} strokeLinecap="round" />;
}

export function CarGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 62 L24 42 C26 36 32 33 38 33 H62 C68 33 74 36 76 42 L82 62" />
      <rect x="14" y="60" width="72" height="16" rx="4" />
      <circle cx="30" cy="78" r="6" fill="currentColor" stroke="none" />
      <circle cx="70" cy="78" r="6" fill="currentColor" stroke="none" />
    </g>
  );
}

export function BikeGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="26" cy="70" r="14" />
      <circle cx="74" cy="70" r="14" />
      <path d="M26 70 L46 34 H62" />
      <path d="M40 70 H74 L58 40" />
      <path d="M46 34 L54 34" />
      <circle cx="46" cy="34" r="4" fill="currentColor" stroke="none" />
    </g>
  );
}

export function BusGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="20" width="68" height="46" rx="8" />
      <path d="M16 36 H84" />
      <path d="M28 20 V16 H72 V20" />
      <circle cx="32" cy="76" r="7" fill="currentColor" stroke="none" />
      <circle cx="68" cy="76" r="7" fill="currentColor" stroke="none" />
    </g>
  );
}

export function PersonGlyph({ small = false, offsetX = 0 }: { small?: boolean; offsetX?: number }) {
  const s = small ? 0.7 : 1;
  return (
    <g transform={`translate(${offsetX} 0) scale(${s})`}>
      <circle cx="50" cy="24" r="10" fill="currentColor" />
      <path
        d="M50 36 C36 36 32 48 32 62 L38 62 L40 88 H48 L50 64 L52 88 H60 L62 62 L68 62 C68 48 64 36 50 36 Z"
        fill="currentColor"
      />
    </g>
  );
}

export function HornGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 60 V40 L46 24 V76 L20 60 Z" fill="currentColor" stroke="none" />
      <path d="M58 34 C68 42 68 58 58 66" />
      <path d="M66 24 C82 38 82 62 66 76" />
    </g>
  );
}

export function LetterEGlyph() {
  return (
    <text
      x="50"
      y="70"
      textAnchor="middle"
      fontSize="58"
      fontWeight="800"
      fill="currentColor"
      fontFamily="inherit"
    >
      E
    </text>
  );
}

export function HourglassGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M26 16 H74 L52 50 L74 84 H26 L48 50 Z" />
    </g>
  );
}

export function RoundaboutGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round">
      <path d="M50 20 A30 30 0 1 1 20 50" />
      <path d="M10 44 L20 50 L28 38" />
    </g>
  );
}

export function CrossGlyph() {
  return (
    <g stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round">
      <path d="M50 12 V88" />
      <path d="M12 50 H88" />
    </g>
  );
}

export function TJunctionGlyph() {
  return (
    <g stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round">
      <path d="M50 12 V50" />
      <path d="M12 50 H88" />
    </g>
  );
}

export function YJunctionGlyph() {
  return (
    <g stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round">
      <path d="M50 88 V55" />
      <path d="M50 55 L20 15" />
      <path d="M50 55 L80 15" />
    </g>
  );
}

export function SideJunctionGlyph() {
  return (
    <g stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round">
      <path d="M12 50 H88" />
      <path d="M50 50 V12" />
    </g>
  );
}

export function ObliqueJunctionGlyph() {
  return (
    <g stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round">
      <path d="M12 50 H88" />
      <path d="M50 50 L26 14" />
    </g>
  );
}

export function MergeGlyph() {
  return (
    <g stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round">
      <path d="M50 88 V55" />
      <path d="M50 55 L78 15" />
      <path d="M50 55 L26 30" />
    </g>
  );
}

export function TrafficLightGlyph() {
  return (
    <g>
      <rect x="36" y="12" width="28" height="70" rx="8" fill="none" stroke="currentColor" strokeWidth={5} />
      <circle cx="50" cy="28" r="7" fill="currentColor" />
      <circle cx="50" cy="47" r="7" fill="currentColor" opacity="0.45" />
      <circle cx="50" cy="66" r="7" fill="currentColor" opacity="0.45" />
    </g>
  );
}

export function MiniStopGlyph() {
  const pts = "38,18 62,18 78,34 78,58 62,74 38,74 22,58 22,34";
  return (
    <g>
      <polygon points={pts} fill="none" stroke="currentColor" strokeWidth={6} />
      <text x="50" y="52" textAnchor="middle" fontSize="15" fontWeight="800" fill="currentColor">
        PARE
      </text>
    </g>
  );
}

export function WavyRoadGlyph() {
  return (
    <path
      d="M12 60 Q26 40 40 60 T68 60 T92 60"
      fill="none"
      stroke="currentColor"
      strokeWidth={7}
      strokeLinecap="round"
    />
  );
}

export function BumpGlyph({ dip = false }: { dip?: boolean }) {
  const d = dip ? "M10 40 Q50 78 90 40" : "M10 66 Q50 22 90 66";
  return <path d={d} fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round" />;
}

export function InclineGlyph({ down = false }: { down?: boolean }) {
  const d = down ? "M14 24 L86 76" : "M14 76 L86 24";
  return (
    <g fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
      <path d={down ? "M86 76 H62 M86 76 V52" : "M86 24 H62 M86 24 V48"} />
    </g>
  );
}

export function NarrowGlyph({ widen = false }: { widen?: boolean }) {
  const top = widen ? [22, 78] : [38, 62];
  const bottom = [10, 90];
  return (
    <g fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round">
      <path d={`M${bottom[0]} 88 L${top[0]} 12`} />
      <path d={`M${bottom[1]} 88 L${top[1]} 12`} />
    </g>
  );
}

export function SharedPathGlyph() {
  return (
    <g>
      <g transform="translate(-14 -4) scale(0.6)">
        <PersonGlyph />
      </g>
      <g transform="translate(28 14) scale(0.62)" stroke="currentColor">
        <BikeGlyph />
      </g>
    </g>
  );
}

export function BridgeGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 60 H90" />
      <path d="M24 60 V38 L36 24" />
      <path d="M76 60 V38 L64 24" />
      <path d="M10 76 Q50 54 90 76" />
    </g>
  );
}

export function ConstructionGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="38" cy="22" r="8" fill="currentColor" stroke="none" />
      <path d="M38 32 L30 60 H48 L44 88" />
      <path d="M38 32 L60 46" />
      <path d="M60 46 L78 20" />
      <path d="M30 60 H50" />
    </g>
  );
}

export function DividedRoadGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round">
      <path d="M28 12 V88" />
      <path d="M72 12 V88" />
      <path d="M50 12 V88" strokeDasharray="10 10" strokeWidth={4} />
    </g>
  );
}

export function LandslideGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 30 L30 12 L40 26 L52 8" />
      <path d="M18 78 L28 58 C30 54 34 52 38 52 H62 C66 52 70 54 72 58 L82 78" />
      <rect x="12" y="76" width="76" height="10" rx="3" />
    </g>
  );
}

export function SlipperyGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 40 L40 58 L20 66 L58 84" />
      <path d="M50 20 L74 38 L84 30" />
    </g>
  );
}

export function RailroadGlyph({ gate = false }: { gate?: boolean }) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round">
      <path d="M20 20 L80 80" />
      <path d="M80 20 L20 80" />
      {gate && <path d="M14 50 H86" strokeWidth={4} />}
    </g>
  );
}

export function AirplaneGlyph() {
  return (
    <path
      d="M50 12 L58 40 L86 54 L86 62 L58 54 L54 76 L66 84 L66 90 L50 84 L34 90 L34 84 L46 76 L42 54 L14 62 L14 54 L42 40 Z"
      fill="currentColor"
    />
  );
}

export function PinGlyph() {
  return (
    <path
      d="M50 14 C34 14 22 26 22 42 C22 62 50 88 50 88 C50 88 78 62 78 42 C78 26 66 14 50 14 Z M50 54 A12 12 0 1 1 50 30 A12 12 0 0 1 50 54Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  );
}

export function WrenchGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M64 22 A16 16 0 1 0 78 46 L88 56 L78 66 L68 56 A16 16 0 0 0 64 22 Z" />
      <path d="M22 88 L46 64" />
    </g>
  );
}

export function ForkKnifeGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round">
      <path d="M30 12 V44 M24 12 V32 C24 38 27 40 30 40 M36 12 V32 C36 38 33 40 30 40 M30 40 V88" />
      <path d="M70 12 C58 16 58 34 70 40 V88" />
    </g>
  );
}

export function PhoneGlyph() {
  return (
    <path
      d="M24 18 C22 18 20 20 20 22 C20 56 44 80 78 80 C80 80 82 78 82 76 V62 C82 60 80 58 78 58 L62 54 C60 54 58 55 57 57 L52 65 C42 60 40 58 35 48 L43 43 C45 42 46 40 46 38 L42 22 C42 20 40 18 38 18 Z"
      fill="currentColor"
    />
  );
}

export function HospitalGlyph() {
  return (
    <g>
      <rect x="20" y="20" width="60" height="60" rx="6" fill="none" stroke="currentColor" strokeWidth={6} />
      <path d="M50 32 V68 M32 50 H68" stroke="currentColor" strokeWidth={9} strokeLinecap="round" />
    </g>
  );
}

export function ShieldGlyph() {
  return (
    <path
      d="M50 12 L82 24 V48 C82 68 68 82 50 90 C32 82 18 68 18 48 V24 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth={7}
    />
  );
}
