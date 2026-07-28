import { useMemo, useState } from "react";
import MarkingIcon from "../markings/MarkingIcon";
import QuestionBlock from "../quiz/QuestionBlock";
import { fourQuestionsForMarking } from "../../data/questions/generateMarkingQuestions";
import { getRandomMarking } from "../../data/markings";

export default function FeaturedMarkingQuiz() {
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const marking = useMemo(() => getRandomMarking(), [round]);
  const questions = useMemo(() => fourQuestionsForMarking(marking), [marking]);

  const handleAnswered = (correct: boolean) => {
    setAnsweredCount((n) => n + 1);
    if (correct) setCorrectCount((n) => n + 1);
  };

  const handleNewMarking = () => {
    setRound((r) => r + 1);
    setCorrectCount(0);
    setAnsweredCount(0);
  };

  const finished = answeredCount === questions.length;

  return (
    <section className="rounded-2xl border border-asphalt-700 bg-gradient-to-b from-asphalt-900 to-asphalt-900/60 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-signal-yellow">
          Marcação em destaque
        </h2>
        {finished && (
          <span className="rounded-full bg-asphalt-800 px-2.5 py-1 text-xs font-semibold text-signal-white">
            {correctCount}/{questions.length} corretas
          </span>
        )}
      </div>

      <div className="mb-4 flex flex-col items-center gap-2 rounded-xl bg-asphalt-950/60 py-6">
        <MarkingIcon marking={marking} size={80} />
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <QuestionBlock key={q.id} index={i + 1} question={q} onAnswered={handleAnswered} />
        ))}
      </div>

      <button
        type="button"
        onClick={handleNewMarking}
        className="mt-4 w-full rounded-xl bg-signal-yellow py-3 text-sm font-bold text-asphalt-950 active:scale-[0.98]"
      >
        🔀 Testar outra marcação
      </button>
    </section>
  );
}
