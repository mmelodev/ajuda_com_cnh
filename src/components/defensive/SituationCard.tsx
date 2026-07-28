import { useState } from "react";
import type { DefensiveTopic } from "../../types";
import { SEVERITY_LABEL, SEVERITY_COLOR } from "../../data/defensive";

export default function SituationCard({ topic }: { topic: DefensiveTopic }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-asphalt-700 bg-asphalt-900">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 p-3 text-left active:bg-asphalt-800"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-asphalt-950/60 text-2xl">
          <span aria-hidden>{topic.emoji}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-signal-white">{topic.title}</p>
          </div>
          {!open && <p className="mt-0.5 truncate text-xs text-asphalt-400">{topic.mistake}</p>}
        </div>
        <span className={`shrink-0 text-asphalt-500 transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && (
        <div className="space-y-2.5 border-t border-asphalt-800 px-4 pb-4 pt-3">
          {(topic.severity || topic.points !== undefined || topic.fine || topic.crimePenalty) && (
            <div className="flex flex-wrap gap-1.5">
              {topic.severity && (
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-asphalt-950"
                  style={{ backgroundColor: SEVERITY_COLOR[topic.severity] }}
                >
                  {SEVERITY_LABEL[topic.severity]}
                </span>
              )}
              {topic.points !== undefined && (
                <span className="rounded-full bg-asphalt-800 px-2.5 py-1 text-[11px] font-semibold text-asphalt-300">
                  {topic.points} pontos na CNH
                </span>
              )}
              {topic.fine && (
                <span className="rounded-full bg-asphalt-800 px-2.5 py-1 text-[11px] font-semibold text-asphalt-300">
                  {topic.fine}
                </span>
              )}
              {topic.crimePenalty && (
                <span className="rounded-full bg-signal-red/15 px-2.5 py-1 text-[11px] font-semibold text-signal-red">
                  Crime de trânsito
                </span>
              )}
            </div>
          )}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-asphalt-500">
              Erro comum
            </p>
            <p className="mt-0.5 text-sm text-asphalt-200">{topic.mistake}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-asphalt-500">
              Atitude do condutor defensivo
            </p>
            <p className="mt-0.5 text-sm text-asphalt-200">{topic.correctAction}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-asphalt-500">
              Por que importa
            </p>
            <p className="mt-0.5 text-sm text-asphalt-200">{topic.whyItMatters}</p>
          </div>
          {topic.crimePenalty && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-asphalt-500">Pena</p>
              <p className="mt-0.5 text-sm text-asphalt-200">{topic.crimePenalty}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
