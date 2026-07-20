import { Link } from "react-router-dom";
import FeaturedSignQuiz from "../../components/home/FeaturedSignQuiz";
import { signsByCategory } from "../../data/signs";

const STATS = [
  { key: "regulamentacao", label: "Regulamentação", color: "text-signal-red" },
  { key: "advertencia", label: "Advertência", color: "text-signal-yellow" },
  { key: "indicacao", label: "Indicação", color: "text-signal-blue" },
] as const;

export default function ModuleHome() {
  return (
    <div className="space-y-5 px-4 py-5">
      <section>
        <p className="text-sm leading-relaxed text-asphalt-200">
          As placas verticais são divididas em três famílias. Domine o formato, a cor e o
          significado de cada uma — isso garante pontos certos na prova e mais segurança na
          direção.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {STATS.map((s) => (
            <div
              key={s.key}
              className="rounded-xl border border-asphalt-700 bg-asphalt-900 px-2 py-3 text-center"
            >
              <p className={`text-xl font-extrabold ${s.color}`}>{signsByCategory[s.key].length}</p>
              <p className="mt-0.5 text-[11px] leading-tight text-asphalt-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <FeaturedSignQuiz />

      <section className="grid grid-cols-2 gap-3">
        <Link
          to="/sinalizacao-vertical/catalogo"
          className="rounded-2xl border border-asphalt-700 bg-asphalt-900 p-4 active:scale-[0.98]"
        >
          <span className="text-2xl" aria-hidden>
            🗂️
          </span>
          <p className="mt-2 text-sm font-bold text-signal-white">Catálogo completo</p>
          <p className="mt-0.5 text-xs text-asphalt-400">Veja todas as placas por categoria</p>
        </Link>
        <Link
          to="/sinalizacao-vertical/quiz"
          className="rounded-2xl border border-asphalt-700 bg-asphalt-900 p-4 active:scale-[0.98]"
        >
          <span className="text-2xl" aria-hidden>
            ❓
          </span>
          <p className="mt-2 text-sm font-bold text-signal-white">Quiz completo</p>
          <p className="mt-0.5 text-xs text-asphalt-400">Perguntas variam a cada tentativa</p>
        </Link>
      </section>
    </div>
  );
}
