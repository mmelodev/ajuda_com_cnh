import { NavLink, Outlet } from "react-router-dom";

const TABS = [
  { to: "/sinalizacao-vertical", label: "Aprender", icon: "📖", end: true },
  { to: "/sinalizacao-vertical/catalogo", label: "Catálogo", icon: "🗂️", end: false },
  { to: "/sinalizacao-vertical/quiz", label: "Quiz", icon: "❓", end: false },
];

export default function VerticalSignageLayout() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-20 bg-asphalt-900/95 backdrop-blur border-b border-asphalt-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            aria-label="Voltar para a Home"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-asphalt-800 text-signal-white active:scale-95"
          >
            ←
          </NavLink>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-signal-red">
              Módulo 1
            </p>
            <h1 className="truncate text-lg font-bold text-signal-white">Sinalização Vertical</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 pb-20">
        <Outlet />
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-md border-t border-asphalt-800 bg-asphalt-900/95 backdrop-blur">
        <div className="grid grid-cols-3">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
                  isActive ? "text-signal-yellow" : "text-asphalt-400"
                }`
              }
            >
              <span className="text-lg leading-none" aria-hidden>
                {tab.icon}
              </span>
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
