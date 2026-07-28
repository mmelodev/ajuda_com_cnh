import { useState } from "react";
import type { RoadMarking } from "../../types";
import MarkingIcon from "./MarkingIcon";
import { COLOR_LABEL, PATTERN_LABEL } from "../../data/markings";

export default function MarkingCard({ marking }: { marking: RoadMarking }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-asphalt-700 bg-asphalt-900">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 p-3 text-left active:bg-asphalt-800"
      >
        <div className="flex h-16 w-12 shrink-0 items-center justify-center">
          <MarkingIcon marking={marking} size={40} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-signal-white">{marking.name}</p>
          </div>
          {!open && <p className="mt-0.5 truncate text-xs text-asphalt-400">{marking.description}</p>}
        </div>
        <span className={`shrink-0 text-asphalt-500 transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && (
        <div className="space-y-2 border-t border-asphalt-800 px-4 pb-4 pt-3">
          {(marking.color || marking.pattern) && (
            <div className="flex gap-2">
              {marking.color && (
                <span className="rounded-full bg-asphalt-800 px-2.5 py-1 text-[11px] font-semibold text-asphalt-300">
                  {COLOR_LABEL[marking.color]}
                </span>
              )}
              {marking.pattern && (
                <span className="rounded-full bg-asphalt-800 px-2.5 py-1 text-[11px] font-semibold text-asphalt-300">
                  {PATTERN_LABEL[marking.pattern]}
                </span>
              )}
            </div>
          )}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-asphalt-500">
              Significado
            </p>
            <p className="mt-0.5 text-sm text-asphalt-200">{marking.description}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-asphalt-500">
              Atitude correta
            </p>
            <p className="mt-0.5 text-sm text-asphalt-200">{marking.action}</p>
          </div>
        </div>
      )}
    </div>
  );
}
