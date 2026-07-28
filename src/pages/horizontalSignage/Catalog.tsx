import { useMemo, useState } from "react";
import MarkingCard from "../../components/markings/MarkingCard";
import horizontal from "../../data/markings";

export default function Catalog() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return horizontal;
    return horizontal.filter(
      (m) => m.name.toLowerCase().includes(term) || m.description.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar marcação por nome..."
        className="w-full rounded-xl border border-asphalt-700 bg-asphalt-900 px-4 py-2.5 text-sm text-signal-white placeholder:text-asphalt-500 focus:border-signal-yellow focus:outline-none"
      />

      <p className="text-xs text-asphalt-500">
        {filtered.length} {filtered.length === 1 ? "marcação encontrada" : "marcações encontradas"}
      </p>

      <div className="space-y-2.5">
        {filtered.map((marking) => (
          <MarkingCard key={marking.id} marking={marking} />
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-asphalt-500">
            Nenhuma marcação encontrada para "{search}".
          </p>
        )}
      </div>

      <p className="pb-4 pt-2 text-center text-[10px] text-asphalt-600">
        Linhas de fluxo, faixa de pedestres, inscrições e demais marcas de solo — {horizontal.length}{" "}
        marcações no total.
      </p>
    </div>
  );
}
