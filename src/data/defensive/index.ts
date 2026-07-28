import type { DefensiveTopic, InfractionSeverity } from "../../types";
import topics from "./topics";

export const SEVERITY_LABEL: Record<InfractionSeverity, string> = {
  leve: "Leve",
  media: "Média",
  grave: "Grave",
  gravissima: "Gravíssima",
};

export const SEVERITY_COLOR: Record<InfractionSeverity, string> = {
  leve: "var(--color-signal-yellow)",
  media: "var(--color-signal-orange)",
  grave: "var(--color-signal-deep-orange)",
  gravissima: "var(--color-signal-red)",
};

export function getTopicById(id: string): DefensiveTopic | undefined {
  return topics.find((t) => t.id === id);
}

export function getRandomTopic(exclude?: string): DefensiveTopic {
  const pool = exclude ? topics.filter((t) => t.id !== exclude) : topics;
  return pool[Math.floor(Math.random() * pool.length)];
}

export { topics };
export default topics;
