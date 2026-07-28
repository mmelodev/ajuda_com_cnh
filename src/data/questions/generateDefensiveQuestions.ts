import type { DefensiveTopic, QuizQuestion } from "../../types";
import topics, { SEVERITY_LABEL } from "../defensive";
import { shuffle } from "./generateQuestions";

export type DefensiveTemplateKey = "title" | "mistake" | "correctAction" | "whyItMatters" | "severity" | "points";

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
  topic: DefensiveTopic,
  template: DefensiveTemplateKey,
  pool: DefensiveTopic[]
): QuizQuestion | null {
  const others = pool.filter((t) => t.id !== topic.id);

  switch (template) {
    case "title": {
      const options = buildOptions(
        topic.title,
        others.map((t) => t.title)
      );
      return {
        id: `${topic.id}-title-${uid()}`,
        refId: topic.id,
        prompt: "A qual situação do trânsito essa dica se refere?",
        options,
      };
    }
    case "mistake": {
      const options = buildOptions(
        topic.mistake,
        others.map((t) => t.mistake)
      );
      return {
        id: `${topic.id}-mistake-${uid()}`,
        refId: topic.id,
        prompt: `Qual é o erro comum relacionado a "${topic.title}"?`,
        options,
      };
    }
    case "correctAction": {
      const options = buildOptions(
        topic.correctAction,
        others.map((t) => t.correctAction)
      );
      return {
        id: `${topic.id}-correctAction-${uid()}`,
        refId: topic.id,
        prompt: `Diante de "${topic.title}", qual é a atitude do condutor defensivo?`,
        options,
      };
    }
    case "whyItMatters": {
      const options = buildOptions(
        topic.whyItMatters,
        others.map((t) => t.whyItMatters)
      );
      return {
        id: `${topic.id}-whyItMatters-${uid()}`,
        refId: topic.id,
        prompt: `Por que "${topic.title}" é uma preocupação real no trânsito?`,
        options,
      };
    }
    case "severity": {
      if (!topic.severity) return null;
      const correctLabel = SEVERITY_LABEL[topic.severity];
      const allLabels = Object.values(SEVERITY_LABEL);
      const options = buildOptions(correctLabel, allLabels);
      return {
        id: `${topic.id}-severity-${uid()}`,
        refId: topic.id,
        prompt: `Qual a gravidade da infração "${topic.title}"?`,
        options,
      };
    }
    case "points": {
      if (topic.points === undefined) return null;
      const correctLabel = `${topic.points} pontos`;
      const pointsPool = pool.filter((t) => t.points !== undefined).map((t) => `${t.points} pontos`);
      const options = buildOptions(correctLabel, pointsPool);
      return {
        id: `${topic.id}-points-${uid()}`,
        refId: topic.id,
        prompt: `Quantos pontos "${topic.title}" soma na CNH?`,
        options,
      };
    }
    default:
      return null;
  }
}

const ALL_TEMPLATES: DefensiveTemplateKey[] = [
  "title",
  "mistake",
  "correctAction",
  "whyItMatters",
  "severity",
  "points",
];

/** Builds a large, freshly-randomized question pool (distractors & option order vary every call). */
export function generateDefensiveQuestionPool(pool: DefensiveTopic[] = topics): QuizQuestion[] {
  const result: QuizQuestion[] = [];
  for (const topic of pool) {
    for (const template of ALL_TEMPLATES) {
      const question = questionForTemplate(topic, template, pool);
      if (question) result.push(question);
    }
  }
  return result;
}

/** Samples `count` questions from a freshly generated pool, favoring distinct topics. */
export function sampleDefensiveQuizSession(count: number, pool: DefensiveTopic[] = topics): QuizQuestion[] {
  const shuffled = shuffle(generateDefensiveQuestionPool(pool));
  const seen = new Set<string>();
  const selected: QuizQuestion[] = [];

  for (const question of shuffled) {
    if (selected.length >= count) break;
    if (seen.has(question.refId)) continue;
    seen.add(question.refId);
    selected.push(question);
  }

  if (selected.length < count) {
    for (const question of shuffled) {
      if (selected.length >= count) break;
      if (!selected.includes(question)) selected.push(question);
    }
  }

  return selected;
}

/** Exactly 4 varied, always-available questions about a single topic. */
export function fourQuestionsForTopic(topic: DefensiveTopic, pool: DefensiveTopic[] = topics): QuizQuestion[] {
  const templates: DefensiveTemplateKey[] = ["title", "mistake", "correctAction", "whyItMatters"];
  return templates
    .map((t) => questionForTemplate(topic, t, pool))
    .filter((q): q is QuizQuestion => q !== null);
}
