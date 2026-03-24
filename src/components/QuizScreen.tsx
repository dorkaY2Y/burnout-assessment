import { useState } from 'react';
import { QUESTIONS, DIMENSIONS, Language } from '../data/questions';
import ProgressBar from './ProgressBar';

interface QuizScreenProps {
  onComplete: (answers: Record<number, number>) => void;
  language: Language;
}

const SCALE_LABELS = {
  hu: ['Soha', 'Ritkán', 'Néha', 'Gyakran', 'Mindig'],
  en: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
  de: ['Nie', 'Selten', 'Manchmal', 'Oft', 'Immer'],
};

export default function QuizScreen({ onComplete, language }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const q = QUESTIONS[currentIndex];
  const labels = SCALE_LABELS[language];

  const handleSelect = (value: number) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
        setAnimating(false);
      }, 250);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((i) => i - 1);
      setSelected(answers[QUESTIONS[currentIndex - 1].id] ?? null);
      setAnimating(false);
    }, 200);
  };

  const dim = DIMENSIONS[q.dimension];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8">
      <div className="max-w-lg w-full">
        {/* Back button */}
        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-300 text-sm mb-3 transition-colors"
          >
            ← {language === 'hu' ? 'Vissza' : language === 'de' ? 'Zurück' : 'Back'}
          </button>
        )}

        <ProgressBar
          currentIndex={currentIndex}
          totalQuestions={QUESTIONS.length}
          currentDimension={q.dimension}
          language={language}
        />

        {/* Question */}
        <div
          className={`transition-all duration-250 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        >
          <div className="mb-10" style={{ minHeight: '80px' }}>
            <h2 className="text-lg sm:text-xl font-semibold leading-relaxed text-white">
              {q.text[language]}
            </h2>
          </div>

          {/* Likert scale */}
          <div className="mb-8">
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleSelect(val)}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all duration-150 hover:scale-105 active:scale-95 ${
                    selected === val
                      ? 'border-current text-white scale-105'
                      : 'border-gray-800 text-gray-600 hover:border-gray-600 hover:text-gray-400'
                  }`}
                  style={
                    selected === val
                      ? { borderColor: dim.color, backgroundColor: `${dim.color}15`, color: dim.color }
                      : {}
                  }
                >
                  <span className="text-lg font-bold">{val}</span>
                  <span className="text-[10px] font-medium leading-tight text-center hidden sm:block">
                    {labels[val - 1]}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-600 sm:hidden">
              <span>{labels[0]}</span>
              <span>{labels[4]}</span>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={selected === null}
            className={`w-full py-4 rounded-xl font-bold text-base tracking-tight transition-all duration-200 ${
              selected !== null
                ? 'bg-red-500 text-white hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] shadow-lg'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {currentIndex < QUESTIONS.length - 1
              ? language === 'hu' ? 'Következő' : language === 'de' ? 'Weiter' : 'Next'
              : language === 'hu' ? 'Eredmény megtekintése' : language === 'de' ? 'Ergebnisse anzeigen' : 'See results'}
          </button>
        </div>
      </div>
    </div>
  );
}
