import type { QuizQuestion, RoadMarking } from "../../types";
import horizontal, { COLOR_LABEL, PATTERN_LABEL, VISUAL_LABEL } from "../markings";
import { shuffle } from "./generateQuestions";

export type MarkingTemplateKey = "meaning" | "action" | "name" | "color" | "pattern" | "visual";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function buildOptions(correctLabel: string, distractorPool: string[], count = 4) {
  const uniquePool = Array.from(new Set(distractorPool.filter((l) => l !== correctLabel)));
  const distractors = shuffle(uniquePool).slice(0, count - 1);
  const labels = shuffle([correctLabel, ...distractors]);
  return labels.map((label) => ({ id: uid(), label, correct: label === correctLabel }));
}

function questionForTemplate(
  marking: RoadMarking,
  template: MarkingTemplateKey,
  pool: RoadMarking[]
): QuizQuestion | null {
  const others = pool.filter((m) => m.id !== marking.id);

  switch (template) {
    case "meaning": {
      const options = buildOptions(
        marking.description,
        others.map((m) => m.description)
      );
      return {
        id: `${marking.id}-meaning-${uid()}`,
        refId: marking.id,
        prompt: "O que essa marcação no chão significa?",
        options,
      };
    }
    case "action": {
      const options = buildOptions(
        marking.action,
        others.map((m) => m.action)
      );
      return {
        id: `${marking.id}-action-${uid()}`,
        refId: marking.id,
        prompt: "Diante dessa marcação, qual é a atitude correta?",
        options,
      };
    }
    case "name": {
      const options = buildOptions(
        marking.name,
        others.map((m) => m.name)
      );
      return {
        id: `${marking.id}-name-${uid()}`,
        refId: marking.id,
        prompt: "Como se chama essa marcação?",
        options,
      };
    }
    case "color": {
      if (!marking.color) return null;
      const correctLabel = COLOR_LABEL[marking.color];
      const allLabels = Object.values(COLOR_LABEL);
      const options = buildOptions(correctLabel, allLabels);
      return {
        id: `${marking.id}-color-${uid()}`,
        refId: marking.id,
        prompt: "Qual a cor dessa linha?",
        options,
      };
    }
    case "pattern": {
      if (!marking.pattern) return null;
      const correctLabel = PATTERN_LABEL[marking.pattern];
      const allLabels = Object.values(PATTERN_LABEL);
      const options = buildOptions(correctLabel, allLabels);
      return {
        id: `${marking.id}-pattern-${uid()}`,
        refId: marking.id,
        prompt: "Que tipo de linha é essa?",
        options,
      };
    }
    case "visual": {
      const correctLabel = VISUAL_LABEL[marking.visual];
      const allLabels = Object.values(VISUAL_LABEL);
      const options = buildOptions(correctLabel, allLabels);
      return {
        id: `${marking.id}-visual-${uid()}`,
        refId: marking.id,
        prompt: "Como essa marcação se apresenta no pavimento?",
        options,
      };
    }
    default:
      return null;
  }
}

const ALL_TEMPLATES: MarkingTemplateKey[] = ["meaning", "action", "name", "color", "pattern", "visual"];

/** Builds a large, freshly-randomized question pool (distractors & option order vary every call). */
export function generateMarkingQuestionPool(markings: RoadMarking[] = horizontal): QuizQuestion[] {
  const pool: QuizQuestion[] = [];
  for (const marking of markings) {
    for (const template of ALL_TEMPLATES) {
      const question = questionForTemplate(marking, template, markings);
      if (question) pool.push(question);
    }
  }
  return pool;
}

/** Samples `count` questions from a freshly generated pool, favoring distinct markings. */
export function sampleMarkingQuizSession(count: number, markings: RoadMarking[] = horizontal): QuizQuestion[] {
  const pool = shuffle(generateMarkingQuestionPool(markings));
  const seen = new Set<string>();
  const selected: QuizQuestion[] = [];

  for (const question of pool) {
    if (selected.length >= count) break;
    if (seen.has(question.refId)) continue;
    seen.add(question.refId);
    selected.push(question);
  }

  if (selected.length < count) {
    for (const question of pool) {
      if (selected.length >= count) break;
      if (!selected.includes(question)) selected.push(question);
    }
  }

  return selected;
}

/** Exactly 4 varied questions about a single marking, used for the "featured marking" spotlight. */
export function fourQuestionsForMarking(
  marking: RoadMarking,
  markings: RoadMarking[] = horizontal
): QuizQuestion[] {
  const templates: MarkingTemplateKey[] = marking.pattern
    ? ["meaning", "action", "name", "pattern"]
    : ["meaning", "action", "name", "visual"];

  return templates
    .map((t) => questionForTemplate(marking, t, markings))
    .filter((q): q is QuizQuestion => q !== null);
}
