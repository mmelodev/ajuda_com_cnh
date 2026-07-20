import { useState } from "react";
import type { QuizQuestion } from "../../types";

interface QuestionBlockProps {
  index: number;
  question: QuizQuestion;
  onAnswered?: (correct: boolean) => void;
}

export default function QuestionBlock({ index, question, onAnswered }: QuestionBlockProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (optionId: string, correct: boolean) => {
    if (selectedId) return;
    setSelectedId(optionId);
    onAnswered?.(correct);
  };

  return (
    <div className="rounded-2xl border border-asphalt-700 bg-asphalt-900 p-4">
      <p className="mb-3 text-sm font-semibold text-signal-white">
        <span className="mr-1.5 text-asphalt-400">{index}.</span>
        {question.prompt}
      </p>
      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = selectedId === option.id;
          const revealed = selectedId !== null;
          let stateClasses =
            "border-asphalt-700 bg-asphalt-800 text-asphalt-200 active:scale-[0.99]";
          if (revealed && option.correct) {
            stateClasses = "border-signal-green bg-signal-green/15 text-signal-white";
          } else if (revealed && isSelected && !option.correct) {
            stateClasses = "border-signal-red bg-signal-red/15 text-signal-white";
          } else if (revealed) {
            stateClasses = "border-asphalt-800 bg-asphalt-900 text-asphalt-500";
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={revealed}
              onClick={() => handleSelect(option.id, option.correct)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors ${stateClasses}`}
            >
              <span className="flex items-center gap-2">
                {revealed && option.correct && <span aria-hidden>✅</span>}
                {revealed && isSelected && !option.correct && <span aria-hidden>❌</span>}
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
