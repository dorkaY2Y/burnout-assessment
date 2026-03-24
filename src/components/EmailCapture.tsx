import { useState } from 'react';
import { Language } from '../data/questions';

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
  onSkip: () => void;
  language: Language;
}

const COPY = {
  hu: {
    title: 'Kérd el az eredményedet emailben!',
    subtitle: 'Elküldjük a részletes elemzést, amit bármikor visszanézhetsz.',
    placeholder: 'email@cim.hu',
    submit: 'Küldöm az eredményemet',
    skip: 'Kihagyom',
    privacy: 'Nem küldünk spamot. Bármikor leiratkozhatsz.',
  },
  en: {
    title: 'Get your results by email!',
    subtitle: "We'll send you the detailed analysis so you can revisit it anytime.",
    placeholder: 'your@email.com',
    submit: 'Send me my results',
    skip: 'Skip',
    privacy: "We won't spam you. Unsubscribe anytime.",
  },
  de: {
    title: 'Ergebnisse per E-Mail erhalten!',
    subtitle: 'Wir senden dir die detaillierte Analyse, die du jederzeit abrufen kannst.',
    placeholder: 'deine@email.de',
    submit: 'Ergebnisse zusenden',
    skip: 'Überspringen',
    privacy: 'Kein Spam. Jederzeit abmeldbar.',
  },
};

export default function EmailCapture({ onSubmit, onSkip, language }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const t = COPY[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    // Supabase submit is handled in App.tsx via onSubmit callback
    onSubmit(email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-6">📬</div>
        <h2 className="text-2xl font-bold text-white mb-3">{t.title}</h2>
        <p className="text-gray-400 text-sm mb-8">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !email.includes('@')}
            className={`w-full py-4 rounded-xl font-bold text-base tracking-tight transition-all duration-200 ${
              email.includes('@') && !loading
                ? 'bg-red-500 text-white hover:brightness-110 hover:scale-[1.01]'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {loading ? '...' : t.submit}
          </button>
        </form>

        <button
          onClick={onSkip}
          className="mt-4 text-sm text-gray-600 hover:text-gray-400 transition-colors"
        >
          {t.skip}
        </button>

        <p className="mt-6 text-xs text-gray-700">{t.privacy}</p>
      </div>
    </div>
  );
}
