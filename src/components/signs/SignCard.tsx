import { useState } from "react";
import type { TrafficSign } from "../../types";
import SignIcon from "./SignIcon";

export default function SignCard({ sign }: { sign: TrafficSign }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-asphalt-700 bg-asphalt-900">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 p-3 text-left active:bg-asphalt-800"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-asphalt-950/40">
          <SignIcon sign={sign} size={48} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {sign.code && (
              <span className="shrink-0 rounded bg-asphalt-800 px-1.5 py-0.5 text-[10px] font-bold text-asphalt-400">
                {sign.code}
              </span>
            )}
            <p className="truncate text-sm font-semibold text-signal-white">{sign.name}</p>
          </div>
          {!open && <p className="mt-0.5 truncate text-xs text-asphalt-400">{sign.description}</p>}
        </div>
        <span className={`shrink-0 text-asphalt-500 transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && (
        <div className="space-y-2 border-t border-asphalt-800 px-4 pb-4 pt-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-asphalt-500">
              Significado
            </p>
            <p className="mt-0.5 text-sm text-asphalt-200">{sign.description}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-asphalt-500">
              Atitude correta
            </p>
            <p className="mt-0.5 text-sm text-asphalt-200">{sign.action}</p>
          </div>
        </div>
      )}
    </div>
  );
}
