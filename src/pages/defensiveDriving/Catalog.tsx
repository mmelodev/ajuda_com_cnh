import { useMemo, useState } from "react";
import SituationCard from "../../components/defensive/SituationCard";
import topics from "../../data/defensive";
import { SEVERITY_LABEL } from "../../data/defensive";
import type { InfractionSeverity } from "../../types";

const FILTERS: { key: InfractionSeverity | "crime" | "all"; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "gravissima", label: "Gravíssima" },
  { key: "grave", label: "Grave" },
  { key: "media", label: "Média" },
  { key: "crime", label: "Crimes" },
];

export default function Catalog() {
  const [filter, setFilter] = useState<InfractionSeverity | "crime" | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return topics.filter((t) => {
      const matchesFilter =
        filter === "all" || (filter === "crime" ? Boolean(t.crimePenalty) : t.severity === filter);
      const matchesSearch =
        !term ||
        t.title.toLowerCase().includes(term) ||
        t.mistake.toLowerCase().includes(term) ||
        t.correctAction.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar situação..."
        className="w-full rounded-xl border border-asphalt-700 bg-asphalt-900 px-4 py-2.5 text-sm text-signal-white placeholder:text-asphalt-500 focus:border-signal-yellow focus:outline-none"
      />

      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === f.key ? "bg-signal-yellow text-asphalt-950" : "bg-asphalt-800 text-asphalt-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-asphalt-500">
        {filtered.length} {filtered.length === 1 ? "situação encontrada" : "situações encontradas"}
      </p>

      <div className="space-y-2.5">
        {filtered.map((topic) => (
          <SituationCard key={topic.id} topic={topic} />
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-asphalt-500">
            Nenhuma situação encontrada para "{search}".
          </p>
        )}
      </div>

      <p className="pb-4 pt-2 text-center text-[10px] text-asphalt-600">
        {SEVERITY_LABEL.leve}, {SEVERITY_LABEL.media}, {SEVERITY_LABEL.grave} e{" "}
        {SEVERITY_LABEL.gravissima} — {topics.length} situações no total.
      </p>
    </div>
  );
}
