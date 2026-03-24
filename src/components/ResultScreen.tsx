import { BurnoutResult, PROFILE_INFO, RISK_INFO } from '../utils/scoring';
import { DIMENSIONS, Language } from '../data/questions';

interface ResultScreenProps {
  result: BurnoutResult;
  language: Language;
  onRetake: () => void;
}

const COPY = {
  hu: {
    title: 'Az eredményed',
    overall: 'Összesített Burnout Score',
    breakdown: 'Dimenzió-bontás',
    recommendation: 'Következő lépés',
    retake: 'Újra kitöltöm',
    share: 'Megosztás',
    footer: 'Ez az eszköz tájékoztató jellegű, nem helyettesíti a szakemberrel való konzultációt.',
    recommendations: {
      low: 'Tartsd fenn a jelenlegi egyensúlyt! Rendszeres önreflexió és preventív szokások segítenek megőrizni ezt az állapotot.',
      moderate: 'Érdemes odafigyelni. Javaslunk egy coaching-konzultációt a jelzések feldolgozásához, mielőtt fokozódnának.',
      high: 'Aktív burnout-jelzések. Kérjük, keress fel egy szakembert vagy coachot, és tegyél azonnali lépéseket a regeneráció érdekében.',
      crisis: 'Krízis jelzések. Kérjük, azonnal keress fel egy mentálhigiénés szakembert vagy orvost.',
    },
    cta: 'Coaching konzultáció',
  },
  en: {
    title: 'Your Results',
    overall: 'Overall Burnout Score',
    breakdown: 'Dimension Breakdown',
    recommendation: 'Next Step',
    retake: 'Retake assessment',
    share: 'Share',
    footer: 'This tool is informational only and does not replace consultation with a professional.',
    recommendations: {
      low: 'Keep up your current balance! Regular self-reflection and preventive habits will help you maintain this state.',
      moderate: 'Worth paying attention to. We recommend a coaching consultation to process these signals before they escalate.',
      high: 'Active burnout signals. Please reach out to a professional or coach and take immediate steps toward recovery.',
      crisis: 'Crisis signals. Please immediately seek support from a mental health professional or physician.',
    },
    cta: 'Coaching consultation',
  },
};

function DimensionBar({ label, value, emoji, color }: { label: string; value: number; emoji: string; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-300 font-medium">{emoji} {label}</span>
        <span className="text-sm font-bold font-mono" style={{ color }}>
          {Math.round(value)}%
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function ResultScreen({ result, language, onRetake }: ResultScreenProps) {
  const t = COPY[language];
  const profile = PROFILE_INFO[result.profile];
  const risk = RISK_INFO[result.riskLevel];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-5 py-10">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-black text-white mb-8 text-center">{t.title}</h1>

        {/* Overall score */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6 text-center">
          <div className="text-6xl mb-3">{profile.emoji}</div>
          <div
            className="text-6xl font-black font-mono mb-2"
            style={{ color: risk.color }}
          >
            {Math.round(result.overall)}%
          </div>
          <div className="text-sm text-gray-500 mb-3">{t.overall}</div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm border"
            style={{ color: risk.color, borderColor: `${risk.color}40`, backgroundColor: `${risk.color}10` }}
          >
            {risk.emoji} {risk.label[language]}
          </div>
          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            <strong className="text-white">{profile.title[language]}</strong> — {profile.desc[language]}
          </p>
        </div>

        {/* Dimension breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">{t.breakdown}</h2>
          <DimensionBar label={DIMENSIONS.emotional.label[language]} value={result.emotional} emoji={DIMENSIONS.emotional.emoji} color={DIMENSIONS.emotional.color} />
          <DimensionBar label={DIMENSIONS.detachment.label[language]} value={result.detachment} emoji={DIMENSIONS.detachment.emoji} color={DIMENSIONS.detachment.color} />
          <DimensionBar label={DIMENSIONS.cognitive.label[language]} value={result.cognitive} emoji={DIMENSIONS.cognitive.emoji} color={DIMENSIONS.cognitive.color} />
          <DimensionBar label={DIMENSIONS.efficacy.label[language]} value={result.efficacy} emoji={DIMENSIONS.efficacy.emoji} color={DIMENSIONS.efficacy.color} />
          <DimensionBar label={DIMENSIONS.somatic.label[language]} value={result.somatic} emoji={DIMENSIONS.somatic.emoji} color={DIMENSIONS.somatic.color} />
        </div>

        {/* Recommendation */}
        <div
          className="border rounded-2xl p-6 mb-6"
          style={{ borderColor: `${risk.color}40`, backgroundColor: `${risk.color}08` }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: risk.color }}>
            {t.recommendation}
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {t.recommendations[result.riskLevel]}
          </p>
          <a
            href="https://y2y.hu/coaching"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110"
            style={{ backgroundColor: risk.color }}
          >
            {t.cta} →
          </a>
        </div>

        {/* Retake */}
        <button
          onClick={onRetake}
          className="w-full py-3 rounded-xl text-sm text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-700 transition-colors"
        >
          {t.retake}
        </button>

        <p className="mt-6 text-xs text-gray-700 text-center leading-relaxed">{t.footer}</p>

        <div className="mt-6 text-center">
          <a href="https://y2y.hu/en" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">
            y2y.hu
          </a>
        </div>
      </div>
    </div>
  );
}
