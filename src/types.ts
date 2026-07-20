export type SignCategory = "regulamentacao" | "advertencia" | "indicacao";

export type SignShape =
  | "octagon"
  | "triangle-down"
  | "circle"
  | "diamond"
  | "rectangle";

export type RegulationVariant = "restrictive" | "mandatory";

export type IndicationTone = "blue" | "green" | "white" | "brown";

export type GlyphKey =
  | "text"
  | "blank"
  | "arrowStraight"
  | "arrowCurve"
  | "arrowFork"
  | "uTurn"
  | "doubleArrowVertical"
  | "doubleArrowHorizontal"
  | "noEntryBar"
  | "carSlash"
  | "bike"
  | "bus"
  | "pedestrian"
  | "pedestrianSlash"
  | "pedestrianChild"
  | "hornSlash"
  | "overtakeSlash"
  | "laneChangeSlash"
  | "letterE"
  | "letterESlash"
  | "hourglassSlash"
  | "roundabout"
  | "crossPlus"
  | "junctionT"
  | "junctionY"
  | "junctionSide"
  | "junctionOblique"
  | "junctionMerge"
  | "trafficLight"
  | "miniStop"
  | "wavyRoad"
  | "bump"
  | "dip"
  | "incline"
  | "narrow"
  | "widen"
  | "sharedPath"
  | "bridge"
  | "construction"
  | "dividedRoad"
  | "landslide"
  | "slippery"
  | "railroadX"
  | "railroadGate"
  | "airplane"
  | "pin"
  | "wrench"
  | "fork"
  | "phone"
  | "hospital"
  | "shield";

export interface TrafficSign {
  id: string;
  code?: string;
  category: SignCategory;
  name: string;
  shape: SignShape;
  /** Only relevant for category === "regulamentacao" */
  variant?: RegulationVariant;
  /** Only relevant for category === "indicacao" */
  tone?: IndicationTone;
  glyph: GlyphKey;
  glyphRotate?: number;
  glyphMirror?: boolean;
  glyphText?: string;
  /** Overlays a diagonal prohibition bar on top of the base glyph */
  slash?: boolean;
  description: string;
  action: string;
}

export interface QuizOption {
  id: string;
  label: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  signId: string;
  prompt: string;
  options: QuizOption[];
}

export type ModuleStatus = "available" | "soon";

export interface LearningModule {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  status: ModuleStatus;
  accent: string;
  emoji: string;
  path?: string;
}
