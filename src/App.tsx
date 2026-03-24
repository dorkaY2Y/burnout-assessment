import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import EmailCapture from './components/EmailCapture';
import { calculateResults, BurnoutResult } from './utils/scoring';
import { Language } from './data/questions';

type Screen = 'intro' | 'quiz' | 'email' | 'result';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function saveResult(email: string, result: BurnoutResult) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/burnout_results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        email,
        overall_score: Math.round(result.overall),
        emotional: Math.round(result.emotional),
        detachment: Math.round(result.detachment),
        cognitive: Math.round(result.cognitive),
        efficacy: Math.round(result.efficacy),
        somatic: Math.round(result.somatic),
        profile: result.profile,
        risk_level: result.riskLevel,
      }),
    });
  } catch (e) {
    console.error('Supabase save failed:', e);
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<BurnoutResult | null>(null);
  const [language, setLanguage] = useState<Language>('hu');

  const handleQuizComplete = (ans: Record<number, number>) => {
    setAnswers(ans);
    const res = calculateResults(ans);
    setResult(res);
    setScreen('email');
  };

  const handleEmailSubmit = async (email: string) => {
    if (result) await saveResult(email, result);
    setScreen('result');
  };

  const handleRetake = () => {
    setAnswers({});
    setResult(null);
    setScreen('intro');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {screen === 'intro' && (
        <IntroScreen
          onStart={() => setScreen('quiz')}
          language={language}
          setLanguage={setLanguage}
        />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          onComplete={handleQuizComplete}
          language={language}
        />
      )}
      {screen === 'email' && (
        <EmailCapture
          onSubmit={handleEmailSubmit}
          onSkip={() => setScreen('result')}
          language={language}
        />
      )}
      {screen === 'result' && result && (
        <ResultScreen
          result={result}
          language={language}
          onRetake={handleRetake}
        />
      )}
    </div>
  );
}
