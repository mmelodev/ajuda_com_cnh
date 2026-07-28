import type { LinePattern, MarkingColor, MarkingVisual, RoadMarking } from "../../types";
import horizontal from "./horizontal";

export const COLOR_LABEL: Record<MarkingColor, string> = {
  branca: "Branca",
  amarela: "Amarela",
  vermelha: "Vermelha",
};

export const PATTERN_LABEL: Record<LinePattern, string> = {
  continua: "Contínua",
  tracejada: "Tracejada (seccionada)",
  "dupla-continua": "Dupla contínua",
  mista: "Dupla mista (contínua + tracejada)",
};

export const VISUAL_LABEL: Record<MarkingVisual, string> = {
  line: "Linha longitudinal",
  crosswalk: "Faixa de pedestres",
  text: "Inscrição escrita no pavimento",
  arrow: "Seta direcional",
  hatched: "Área hachurada",
  "exclusive-lane": "Faixa exclusiva colorida",
  "retention-line": "Linha de retenção",
};

export function getMarkingById(id: string): RoadMarking | undefined {
  return horizontal.find((m) => m.id === id);
}

export function getRandomMarking(exclude?: string): RoadMarking {
  const pool = exclude ? horizontal.filter((m) => m.id !== exclude) : horizontal;
  return pool[Math.floor(Math.random() * pool.length)];
}

export { horizontal };
export default horizontal;
