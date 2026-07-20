import { useState } from "react";
import SignIcon from "../../components/signs/SignIcon";
import QuestionBlock from "../../components/quiz/QuestionBlock";
import { sampleQuizSession } from "../../data/questions/generateQuestions";
import { getSignById } from "../../data/signs";
import type { QuizQuestion } from "../../types";

const LENGTH_OPTIONS = [10, 15, 20];

type Stage = "setup" | "playing" | "finished";

export default function Quiz() {
  const [stage, setStage] = useState<Stage>("setup");
  const [length, setLength] = useState(10);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const startQuiz = () => {
    setQuestions(sampleQuizSession(length));
    setIndex(0);
    setScore(0);
    setAnswered(false);
    setLastCorrect(null);
    setStage("playing");
  };

  const handleAnswered = (correct: boolean) => {
    setAnswered(true);
    setLastCorrect(correct);
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      setStage("finished");
      return;
    }
    setIndex((i) => i + 1);
    setAnswered(false);
    setLastCorrect(null);
  };

  if (stage === "setup") {
    return (
      <div className="flex flex-col gap-5 px-4 py-6">
        <div className="rounded-2xl border border-asphalt-700 bg-asphalt-900 p-5 text-center">
          <span className="text-4xl" aria-hidden>
            🚦
          </span>
          <h2 className="mt-3 text-lg font-bold text-signal-white">Quiz de Sinalização Vertical</h2>
          <p className="mt-2 text-sm text-asphalt-300">
            As perguntas e alternativas são sorteadas de um banco grande a cada tentativa — quanto
            mais você jogar, mais placas diferentes vai revisar.
          </p>
        </div>

        <div>
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-asphalt-400">
            Quantidade de perguntas
          </p>
          <div className="grid grid-cols-3 gap-2">
            {LENGTH_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setLength(n)}
                className={`rounded-xl border py-3 text-sm font-bold transition-colors ${
                  length === n
                    ? "border-signal-yellow bg-signal-yellow/15 text-signal-yellow"
                    : "border-asphalt-700 bg-asphalt-900 text-asphalt-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={startQuiz}
          className="w-full rounded-xl bg-signal-red py-3.5 text-sm font-bold text-signal-white active:scale-[0.98]"
        >
          Começar quiz
        </button>
      </div>
    );
  }

  if (stage === "finished") {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚";
    return (
      <div className="flex flex-col items-center gap-5 px-4 py-10 text-center">
        <span className="text-5xl" aria-hidden>
          {emoji}
        </span>
        <div>
          <h2 className="text-2xl font-extrabold text-signal-white">
            {score} / {questions.length}
          </h2>
          <p className="mt-1 text-sm text-asphalt-300">
            Você acertou {pct}% das perguntas dessa rodada.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <button
            type="button"
            onClick={startQuiz}
            className="w-full rounded-xl bg-signal-yellow py-3 text-sm font-bold text-asphalt-950 active:scale-[0.98]"
          >
            🔁 Tentar novamente (novas perguntas)
          </button>
          <button
            type="button"
            onClick={() => setStage("setup")}
            className="w-full rounded-xl border border-asphalt-700 bg-asphalt-900 py-3 text-sm font-semibold text-asphalt-200 active:scale-[0.98]"
          >
            Alterar quantidade
          </button>
        </div>
      </div>
    );
  }

  const question = questions[index];
  const sign = getSignById(question.signId);

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs text-asphalt-400">
          <span>
            Pergunta {index + 1} de {questions.length}
          </span>
          <span>
            Acertos: <span className="font-semibold text-signal-green">{score}</span>
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-asphalt-800">
          <div
            className="h-full rounded-full bg-signal-yellow transition-all"
            style={{ width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {sign && (
        <div className="flex flex-col items-center gap-2 rounded-xl bg-asphalt-900 py-6">
          <SignIcon sign={sign} size={100} />
          {sign.code && (
            <span className="rounded-full bg-asphalt-800 px-2 py-0.5 text-[11px] font-semibold text-asphalt-400">
              {sign.code}
            </span>
          )}
        </div>
      )}

      <QuestionBlock key={question.id} index={index + 1} question={question} onAnswered={handleAnswered} />

      {answered && (
        <div className="space-y-2">
          {lastCorrect === false && sign && (
            <p className="rounded-xl bg-asphalt-900 px-3.5 py-2.5 text-xs text-asphalt-300">
              💡 <span className="font-semibold text-signal-white">{sign.name}:</span> {sign.action}
            </p>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="w-full rounded-xl bg-signal-green py-3 text-sm font-bold text-asphalt-950 active:scale-[0.98]"
          >
            {index + 1 >= questions.length ? "Ver resultado" : "Próxima pergunta →"}
          </button>
        </div>
      )}
    </div>
  );
}
