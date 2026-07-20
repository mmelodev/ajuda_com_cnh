import modules from "../data/modules";
import ModuleCard from "../components/home/ModuleCard";

export default function Home() {
  const available = modules.filter((m) => m.status === "available").length;

  return (
    <div className="flex flex-1 flex-col">
      <header className="relative overflow-hidden bg-gradient-to-b from-asphalt-900 to-asphalt-950 px-5 pb-6 pt-8">
        <div className="road-dashes absolute inset-x-0 top-0 h-1.5 opacity-90" />
        <p className="text-xs font-semibold uppercase tracking-widest text-signal-yellow">
          Rumo à CNH AB
        </p>
        <h1 className="mt-1 text-2xl font-bold text-signal-white">Treino de Trânsito</h1>
        <p className="mt-2 text-sm leading-relaxed text-asphalt-200">
          Fixe o conteúdo da prova teórica com catálogos completos e quizzes que mudam a cada
          tentativa.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-asphalt-800/80 px-3 py-1.5 text-xs font-medium text-asphalt-200 ring-1 ring-asphalt-700">
          <span className="h-2 w-2 rounded-full bg-signal-green" />
          {available} de {modules.length} módulos disponíveis
        </div>
      </header>

      <main className="flex-1 space-y-3 px-5 py-6">
        <h2 className="mb-1 px-1 text-sm font-semibold uppercase tracking-wide text-asphalt-400">
          Etapas do aprendizado
        </h2>
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </main>

      <footer className="px-5 pb-8 pt-2 text-center text-[11px] text-asphalt-600">
        Conteúdo de estudo pessoal — não substitui o material oficial do DETRAN.
      </footer>
    </div>
  );
}
