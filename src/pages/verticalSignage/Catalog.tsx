import { useMemo, useState } from "react";
import SignCard from "../../components/signs/SignCard";
import allSigns, { CATEGORY_LABEL } from "../../data/signs";
import type { SignCategory } from "../../types";

const FILTERS: { key: SignCategory | "all"; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "regulamentacao", label: "Regulamentação" },
  { key: "advertencia", label: "Advertência" },
  { key: "indicacao", label: "Indicação" },
];

export default function Catalog() {
  const [filter, setFilter] = useState<SignCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return allSigns.filter((sign) => {
      const matchesCategory = filter === "all" || sign.category === filter;
      const matchesSearch =
        !term ||
        sign.name.toLowerCase().includes(term) ||
        sign.code?.toLowerCase().includes(term) ||
        sign.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar placa por nome ou código..."
          className="w-full rounded-xl border border-asphalt-700 bg-asphalt-900 px-4 py-2.5 text-sm text-signal-white placeholder:text-asphalt-500 focus:border-signal-yellow focus:outline-none"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === f.key
                ? "bg-signal-yellow text-asphalt-950"
                : "bg-asphalt-800 text-asphalt-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-asphalt-500">
        {filtered.length} {filtered.length === 1 ? "placa encontrada" : "placas encontradas"}
      </p>

      <div className="space-y-2.5">
        {filtered.map((sign) => (
          <SignCard key={sign.id} sign={sign} />
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-asphalt-500">
            Nenhuma placa encontrada para "{search}".
          </p>
        )}
      </div>

      <p className="pb-4 pt-2 text-center text-[10px] text-asphalt-600">
        {CATEGORY_LABEL.regulamentacao}, {CATEGORY_LABEL.advertencia} e{" "}
        {CATEGORY_LABEL.indicacao} — {allSigns.length} placas no total.
      </p>
    </div>
  );
}
