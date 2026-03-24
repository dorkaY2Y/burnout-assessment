import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import EmailCapture from './components/EmailCapture';
import { calculateResults, BurnoutResult, PROFILE_INFO } from './utils/scoring';
import { DIMENSIONS, Language } from './data/questions';

type Screen = 'intro' | 'quiz' | 'email' | 'result';

async function sendResultEmail(email: string, result: BurnoutResult, language: Language) {
  const profile = PROFILE_INFO[result.profile];

  const dimensions = [
    { id: 'physical', name: DIMENSIONS.physical.label[language], emoji: DIMENSIONS.physical.emoji, color: DIMENSIONS.physical.color, score: result.physical },
    { id: 'emotional', name: DIMENSIONS.emotional.label[language], emoji: DIMENSIONS.emotional.emoji, color: DIMENSIONS.emotional.color, score: result.emotional },
    { id: 'cognitive', name: DIMENSIONS.cognitive.label[language], emoji: DIMENSIONS.cognitive.emoji, color: DIMENSIONS.cognitive.color, score: result.cognitive },
    { id: 'team', name: DIMENSIONS.team.label[language], emoji: DIMENSIONS.team.emoji, color: DIMENSIONS.team.color, score: result.team },
  ];

  try {
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        language,
        profileTitle: profile.title[language],
        profileDesc: profile.desc[language],
        profileEmoji: profile.emoji,
        overall: result.overall,
        riskLevel: result.riskLevel,
        dimensions,
      }),
    });
  } catch (e) {
    console.error('Email send failed:', e);
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [_answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<BurnoutResult | null>(null);
  const [language, setLanguage] = useState<Language>('hu');

  const handleQuizComplete = (ans: Record<number, number>) => {
    setAnswers(ans);
    const res = calculateResults(ans);
    setResult(res);
    setScreen('email');
  };

  const handleEmailSubmit = async (email: string) => {
    if (result) await sendResultEmail(email, result, language);
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
          setLanguage={setLanguage}
          onRetake={handleRetake}
        />
      )}
    </div>
  );
}
