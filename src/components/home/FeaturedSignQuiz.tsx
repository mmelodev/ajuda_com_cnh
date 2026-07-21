import { useMemo, useState } from "react";
import SignIcon from "../signs/SignIcon";
import QuestionBlock from "../quiz/QuestionBlock";
import { fourQuestionsForSign } from "../../data/questions/generateQuestions";
import { getRandomSign } from "../../data/signs";

export default function FeaturedSignQuiz() {
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const sign = useMemo(() => getRandomSign(), [round]);
  const questions = useMemo(() => fourQuestionsForSign(sign), [sign]);

  const handleAnswered = (correct: boolean) => {
    setAnsweredCount((n) => n + 1);
    if (correct) setCorrectCount((n) => n + 1);
  };

  const handleNewSign = () => {
    setRound((r) => r + 1);
    setCorrectCount(0);
    setAnsweredCount(0);
  };

  const finished = answeredCount === questions.length;

  return (
    <section className="rounded-2xl border border-asphalt-700 bg-gradient-to-b from-asphalt-900 to-asphalt-900/60 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-signal-yellow">
          Placa em destaque
        </h2>
        {finished && (
          <span className="rounded-full bg-asphalt-800 px-2.5 py-1 text-xs font-semibold text-signal-white">
            {correctCount}/{questions.length} corretas
          </span>
        )}
      </div>

      <div className="mb-4 flex flex-col items-center gap-2 rounded-xl bg-asphalt-950/60 py-6">
        <SignIcon key={sign.id} sign={sign} size={104} />
        {sign.code && (
          <span className="rounded-full bg-asphalt-800 px-2 py-0.5 text-[11px] font-semibold text-asphalt-400">
            {sign.code}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <QuestionBlock key={q.id} index={i + 1} question={q} onAnswered={handleAnswered} />
        ))}
      </div>

      <button
        type="button"
        onClick={handleNewSign}
        className="mt-4 w-full rounded-xl bg-signal-yellow py-3 text-sm font-bold text-asphalt-950 active:scale-[0.98]"
      >
        🔀 Testar outra placa
      </button>
    </section>
  );
}
