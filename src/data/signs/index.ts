import type { SignCategory, SignShape, TrafficSign } from "../../types";
import regulamentacao from "./regulamentacao";
import advertencia from "./advertencia";
import indicacao from "./indicacao";

const allSigns: TrafficSign[] = [...regulamentacao, ...advertencia, ...indicacao];

export const signsByCategory: Record<SignCategory, TrafficSign[]> = {
  regulamentacao,
  advertencia,
  indicacao,
};

export const CATEGORY_LABEL: Record<SignCategory, string> = {
  regulamentacao: "Regulamentação",
  advertencia: "Advertência",
  indicacao: "Indicação",
};

export const CATEGORY_DESCRIPTION: Record<SignCategory, string> = {
  regulamentacao: "Ordens obrigatórias: proíbem, restringem ou obrigam uma ação.",
  advertencia: "Alertas preventivos sobre perigos e situações especiais à frente.",
  indicacao: "Informações úteis sobre direções, serviços e pontos de interesse.",
};

export const SHAPE_LABEL: Record<SignShape, string> = {
  octagon: "Octógono (oito lados)",
  "triangle-down": "Triângulo invertido",
  circle: "Círculo",
  diamond: "Losango",
  rectangle: "Retângulo",
};

export function getSignById(id: string): TrafficSign | undefined {
  return allSigns.find((sign) => sign.id === id);
}

export function getRandomSign(exclude?: string): TrafficSign {
  const pool = exclude ? allSigns.filter((s) => s.id !== exclude) : allSigns;
  return pool[Math.floor(Math.random() * pool.length)];
}

export { regulamentacao, advertencia, indicacao };
export default allSigns;
