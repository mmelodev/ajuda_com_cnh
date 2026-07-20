import type { QuizOption, QuizQuestion, TrafficSign } from "../../types";
import allSigns, { CATEGORY_LABEL, SHAPE_LABEL } from "../signs";

export type TemplateKey = "meaning" | "action" | "name" | "category" | "shape";

const FAKE_CATEGORY = "Sinalização temporária";

export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function buildOptions(correctLabel: string, distractorPool: string[], count = 4): QuizOption[] {
  const uniquePool = Array.from(new Set(distractorPool.filter((l) => l !== correctLabel)));
  const distractors = shuffle(uniquePool).slice(0, count - 1);
  const labels = shuffle([correctLabel, ...distractors]);
  return labels.map((label) => ({ id: uid(), label, correct: label === correctLabel }));
}

function questionForTemplate(
  sign: TrafficSign,
  template: TemplateKey,
  pool: TrafficSign[]
): QuizQuestion | null {
  const sameCategory = pool.filter((s) => s.category === sign.category && s.id !== sign.id);
  const distractorSource = sameCategory.length >= 3 ? sameCategory : pool.filter((s) => s.id !== sign.id);

  switch (template) {
    case "meaning": {
      const options = buildOptions(
        sign.description,
        distractorSource.map((s) => s.description)
      );
      return {
        id: `${sign.id}-meaning-${uid()}`,
        signId: sign.id,
        prompt: "O que esta placa significa?",
        options,
      };
    }
    case "action": {
      const options = buildOptions(
        sign.action,
        distractorSource.map((s) => s.action)
      );
      return {
        id: `${sign.id}-action-${uid()}`,
        signId: sign.id,
        prompt: "Ao avistar esta placa, qual é a atitude correta?",
        options,
      };
    }
    case "name": {
      const options = buildOptions(
        sign.name,
        distractorSource.map((s) => s.name)
      );
      return {
        id: `${sign.id}-name-${uid()}`,
        signId: sign.id,
        prompt: "Como se chama esta placa?",
        options,
      };
    }
    case "category": {
      const correctLabel = CATEGORY_LABEL[sign.category];
      const allLabels = [...Object.values(CATEGORY_LABEL), FAKE_CATEGORY];
      const options = buildOptions(correctLabel, allLabels);
      return {
        id: `${sign.id}-category-${uid()}`,
        signId: sign.id,
        prompt: "A qual categoria de sinalização esta placa pertence?",
        options,
      };
    }
    case "shape": {
      const correctLabel = SHAPE_LABEL[sign.shape];
      const allLabels = Object.values(SHAPE_LABEL);
      const options = buildOptions(correctLabel, allLabels);
      return {
        id: `${sign.id}-shape-${uid()}`,
        signId: sign.id,
        prompt: "Qual é o formato desta placa?",
        options,
      };
    }
    default:
      return null;
  }
}

const ALL_TEMPLATES: TemplateKey[] = ["meaning", "action", "name", "category", "shape"];

/** Builds a large, freshly-randomized question pool (distractors & option order vary every call). */
export function generateQuestionPool(signs: TrafficSign[] = allSigns): QuizQuestion[] {
  const pool: QuizQuestion[] = [];
  for (const sign of signs) {
    for (const template of ALL_TEMPLATES) {
      const question = questionForTemplate(sign, template, signs);
      if (question) pool.push(question);
    }
  }
  return pool;
}

/** Samples `count` questions from a freshly generated pool, favoring distinct signs. */
export function sampleQuizSession(count: number, signs: TrafficSign[] = allSigns): QuizQuestion[] {
  const pool = shuffle(generateQuestionPool(signs));
  const seen = new Set<string>();
  const selected: QuizQuestion[] = [];

  for (const question of pool) {
    if (selected.length >= count) break;
    if (seen.has(question.signId)) continue;
    seen.add(question.signId);
    selected.push(question);
  }

  // If the requested count exceeds the number of distinct signs, fill remaining slots with repeats.
  if (selected.length < count) {
    for (const question of pool) {
      if (selected.length >= count) break;
      if (!selected.includes(question)) selected.push(question);
    }
  }

  return selected;
}

/** Exactly 4 varied questions about a single sign, used for the "featured sign" spotlight. */
export function fourQuestionsForSign(sign: TrafficSign, signs: TrafficSign[] = allSigns): QuizQuestion[] {
  const templates: TemplateKey[] = ["meaning", "action", "name", "shape"];
  return templates
    .map((t) => questionForTemplate(sign, t, signs))
    .filter((q): q is QuizQuestion => q !== null);
}
