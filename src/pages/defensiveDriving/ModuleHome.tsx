import { Link } from "react-router-dom";
import FeaturedDefensiveQuiz from "../../components/home/FeaturedDefensiveQuiz";
import topics from "../../data/defensive";

export default function ModuleHome() {
  const crimesCount = topics.filter((t) => t.crimePenalty).length;
  const gravissimaCount = topics.filter((t) => t.severity === "gravissima").length;

  return (
    <div className="space-y-5 px-4 py-5">
      <section>
        <p className="text-sm leading-relaxed text-asphalt-200">
          No trânsito não existem decisões neutras: cada escolha tem uma consequência. Aqui você vai
          reconhecer os erros mais comuns, a atitude do condutor defensivo em cada situação e o
          motivo real — nem sempre é só multa — por trás de cada regra.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-asphalt-700 bg-asphalt-900 px-2 py-3 text-center">
            <p className="text-xl font-extrabold text-signal-blue">{topics.length}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-asphalt-400">situações no catálogo</p>
          </div>
          <div className="rounded-xl border border-asphalt-700 bg-asphalt-900 px-2 py-3 text-center">
            <p className="text-xl font-extrabold text-signal-red">{gravissimaCount}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-asphalt-400">infrações gravíssimas</p>
          </div>
          <div className="rounded-xl border border-asphalt-700 bg-asphalt-900 px-2 py-3 text-center">
            <p className="text-xl font-extrabold text-signal-red">{crimesCount}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-asphalt-400">crimes de trânsito</p>
          </div>
        </div>
      </section>

      <FeaturedDefensiveQuiz />

      <section className="grid grid-cols-2 gap-3">
        <Link
          to="/direcao-defensiva/catalogo"
          className="rounded-2xl border border-asphalt-700 bg-asphalt-900 p-4 active:scale-[0.98]"
        >
          <span className="text-2xl" aria-hidden>
            🗂️
          </span>
          <p className="mt-2 text-sm font-bold text-signal-white">Catálogo completo</p>
          <p className="mt-0.5 text-xs text-asphalt-400">Veja todas as situações e consequências</p>
        </Link>
        <Link
          to="/direcao-defensiva/quiz"
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
