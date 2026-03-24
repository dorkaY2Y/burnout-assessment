import { DIMENSIONS } from '../data/questions';

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  currentDimension: string;
  language?: 'hu' | 'en' | 'de';
}

export default function ProgressBar({ currentIndex, totalQuestions, currentDimension, language = 'hu' }: ProgressBarProps) {
  const progress = ((currentIndex) / totalQuestions) * 100;
  const dim = DIMENSIONS[currentDimension as keyof typeof DIMENSIONS];

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium" style={{ color: dim?.color || '#6b7280' }}>
          {dim?.emoji} {dim?.label?.[language]}
        </span>
        <span className="text-xs text-gray-500 font-mono">
          {currentIndex + 1} / {totalQuestions}
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: dim?.color || '#6b7280' }}
        />
      </div>
    </div>
  );
}
