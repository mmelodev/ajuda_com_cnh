import { Link } from "react-router-dom";
import type { LearningModule } from "../../types";

const ACCENT_RING: Record<string, string> = {
  red: "from-signal-red/25 to-signal-red/5 text-signal-red ring-signal-red/30",
  yellow: "from-signal-yellow/25 to-signal-yellow/5 text-signal-yellow ring-signal-yellow/30",
  green: "from-signal-green/25 to-signal-green/5 text-signal-green ring-signal-green/30",
  blue: "from-signal-blue/25 to-signal-blue/5 text-signal-blue ring-signal-blue/30",
};

export default function ModuleCard({ module }: { module: LearningModule }) {
  const isAvailable = module.status === "available";
  const accent = ACCENT_RING[module.accent] ?? ACCENT_RING.blue;

  const inner = (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
        isAvailable
          ? "border-asphalt-700 bg-asphalt-900 active:scale-[0.98] active:bg-asphalt-800"
          : "border-asphalt-800 bg-asphalt-900/50"
      }`}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ring-1 ${accent}`}
      >
        <span aria-hidden>{module.emoji}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className={`font-semibold leading-snug ${isAvailable ? "text-signal-white" : "text-asphalt-200"}`}>
          {module.title}
        </h3>
        <p className="mt-0.5 text-sm text-asphalt-400 line-clamp-2">{module.description}</p>
        {isAvailable ? (
          <span className="mt-2 inline-block rounded-full bg-signal-green/15 px-2.5 py-1 text-[11px] font-semibold text-signal-green ring-1 ring-signal-green/30">
            Praticar
          </span>
        ) : (
          <span className="mt-2 inline-block rounded-full bg-asphalt-800 px-2.5 py-1 text-[11px] font-semibold text-asphalt-400">
            Em breve
          </span>
        )}
      </div>
    </div>
  );

  if (!isAvailable || !module.path) {
    return <div className="opacity-70">{inner}</div>;
  }

  return (
    <Link to={module.path} className="block">
      {inner}
    </Link>
  );
}
