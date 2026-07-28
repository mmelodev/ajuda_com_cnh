import { Link } from "react-router-dom";
import FeaturedMarkingQuiz from "../../components/home/FeaturedMarkingQuiz";
import horizontal from "../../data/markings";

export default function ModuleHome() {
  return (
    <div className="space-y-5 px-4 py-5">
      <section>
        <p className="text-sm leading-relaxed text-asphalt-200">
          A sinalização horizontal é o mapa desenhado direto no chão: linhas, faixas e inscrições
          que organizam o tráfego e ficam sempre sob suas rodas enquanto você dirige. Cor e tipo de
          linha mudam completamente o que você pode ou não fazer.
        </p>
        <div className="mt-4 rounded-xl border border-asphalt-700 bg-asphalt-900 px-4 py-3 text-center">
          <p className="text-xl font-extrabold text-signal-yellow">{horizontal.length}</p>
          <p className="mt-0.5 text-[11px] leading-tight text-asphalt-400">
            marcações de solo no catálogo
          </p>
        </div>
      </section>

      <FeaturedMarkingQuiz />

      <section className="grid grid-cols-2 gap-3">
        <Link
          to="/sinalizacao-horizontal/catalogo"
          className="rounded-2xl border border-asphalt-700 bg-asphalt-900 p-4 active:scale-[0.98]"
        >
          <span className="text-2xl" aria-hidden>
            🗂️
          </span>
          <p className="mt-2 text-sm font-bold text-signal-white">Catálogo completo</p>
          <p className="mt-0.5 text-xs text-asphalt-400">Veja todas as marcações de solo</p>
        </Link>
        <Link
          to="/sinalizacao-horizontal/quiz"
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
