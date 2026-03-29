import { BurnoutResult, PROFILE_INFO, RISK_INFO } from '../utils/scoring';
import { DIMENSIONS, Language } from '../data/questions';

interface ResultScreenProps {
  result: BurnoutResult;
  language: Language;
  setLanguage: (lang: Language) => void;
  onRetake: () => void;
}

const COPY = {
  hu: {
    title: 'Az eredményed',
    overall: 'Y2Y Burnout Index',
    breakdown: 'Dimenzió-bontás',
    recommendation: 'Következő lépés',
    retake: 'Újra kitöltöm',
    footer: 'Ez az eszköz tájékoztató jellegű, nem helyettesíti a szakemberrel való konzultációt.',
    recommendations: {
      low: 'Tartsd fenn a jelenlegi egyensúlyt! Rendszeres önreflexió és preventív szokások segítenek megőrizni ezt az állapotot.',
      moderate: 'Érdemes odafigyelni. Javaslunk egy coaching-konzultációt a jelzések feldolgozásához, mielőtt fokozódnának.',
      high: 'Aktív burnout-jelzések. Kérjük, keress fel egy szakembert vagy coachot, és tegyél azonnali lépéseket a regeneráció érdekében.',
      crisis: 'Krízis jelzések. Kérjük, azonnal keress fel egy mentálhigiénés szakembert vagy orvost.',
    },
    cta: 'Coaching konzultáció',
    methodNote: 'A Y2Y Burnout Index a CBI (Kristensen et al., 2005) és az OLBI (Demerouti & Bakker, 2008) súlyozott kombinációján alapul. 22 kérdés, 4 dimenzió, 0–100-as skála.',
  },
  en: {
    title: 'Your Results',
    overall: 'Y2Y Burnout Index',
    breakdown: 'Dimension Breakdown',
    recommendation: 'Next Step',
    retake: 'Retake assessment',
    footer: 'This tool is informational only and does not replace consultation with a professional.',
    recommendations: {
      low: 'Keep up your current balance! Regular self-reflection and preventive habits will help you maintain this state.',
      moderate: 'Worth paying attention to. We recommend a coaching consultation to process these signals before they escalate.',
      high: 'Active burnout signals. Please reach out to a professional or coach and take immediate steps toward recovery.',
      crisis: 'Crisis signals. Please immediately seek support from a mental health professional or physician.',
    },
    cta: 'Coaching consultation',
    methodNote: 'The Y2Y Burnout Index is based on a weighted combination of CBI (Kristensen et al., 2005) and OLBI (Demerouti & Bakker, 2008). 22 questions, 4 dimensions, 0–100 scale.',
  },
  de: {
    title: 'Deine Ergebnisse',
    overall: 'Y2Y Burnout Index',
    breakdown: 'Dimensionsaufschlüsselung',
    recommendation: 'Nächster Schritt',
    retake: 'Erneut ausfüllen',
    footer: 'Dieses Tool ist informativ und ersetzt keine Beratung durch Fachkräfte.',
    recommendations: {
      low: 'Halte dein aktuelles Gleichgewicht aufrecht! Regelmäßige Selbstreflexion und präventive Gewohnheiten helfen, diesen Zustand zu erhalten.',
      moderate: 'Es lohnt sich, aufzupassen. Wir empfehlen eine Coaching-Konsultation, um diese Signale zu verarbeiten, bevor sie eskalieren.',
      high: 'Aktive Burnout-Signale. Bitte wende dich an einen Fachmann oder Coach und unternimm sofortige Schritte zur Erholung.',
      crisis: 'Krisensignale. Bitte suche sofort Unterstützung bei einem Psychologen oder Arzt.',
    },
    cta: 'Coaching-Konsultation',
    methodNote: 'Der Y2Y Burnout Index basiert auf einer gewichteten Kombination von CBI (Kristensen et al., 2005) und OLBI (Demerouti & Bakker, 2008). 22 Fragen, 4 Dimensionen, 0–100 Skala.',
  },
};

// Dimenziónkénti kockázati szín: zöld / sárga / piros (WHO: zöld-sárga-piros skála)
function getDimRiskColor(score: number): string {
  if (score < 30) return '#10b981'; // zöld
  if (score < 55) return '#f59e0b'; // sárga
  return '#ef4444';                 // piros (high + crisis egyaránt)
}

const WHO_NOTE = {
  hu: 'A kiégést a WHO 2022-ben az ICD-11 nemzetközi osztályozásba vette fel (QD85) — elismert, komoly egészségügyi állapot. Az üzleti coaching hatékony eszköz a megelőzésben és a korai jelzések feldolgozásában. Ha azonban valódi kiégés gyanúja áll fenn, pszichoterápia vagy orvosi konzultáció is indokolt lehet. Vedd komolyan.',
  en: 'Burnout was officially recognized by the WHO in the ICD-11 classification in 2022 (QD85) — it is a serious, acknowledged health condition. Business coaching is a powerful tool for prevention and early intervention. However, if genuine burnout is suspected, psychotherapy or medical consultation may also be appropriate. Take it seriously.',
  de: 'Burnout wurde 2022 von der WHO in die ICD-11-Klassifikation aufgenommen (QD85) — es ist ein ernstzunehmendes, anerkanntes Gesundheitsphänomen. Business-Coaching ist ein wirksames Instrument zur Prävention und frühzeitigen Begleitung. Bei konkretem Burnout-Verdacht kann jedoch auch Psychotherapie oder ärztliche Beratung angezeigt sein. Nimm es ernst.',
};

function DimensionBar({ label, value, emoji, dimColor }: { label: string; value: number; emoji: string; dimColor: string }) {
  const riskColor = getDimRiskColor(value);
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: dimColor }}>
          {emoji} {label}
        </span>
        <span className="text-sm font-bold font-mono" style={{ color: riskColor }}>
          {Math.round(value)}%
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: riskColor }}
        />
      </div>
    </div>
  );
}

export default function ResultScreen({ result, language, setLanguage, onRetake }: ResultScreenProps) {
  const t = COPY[language];
  const profile = PROFILE_INFO[result.profile];
  const risk = RISK_INFO[result.riskLevel];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-5 py-10">
      <div className="max-w-lg w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-white">{t.title}</h1>
          <div className="flex gap-1.5">
            {(['hu', 'en', 'de'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-xs border rounded-lg px-2.5 py-1 transition-colors ${
                  language === lang
                    ? 'border-red-500 text-red-400 bg-red-500/10'
                    : 'border-gray-700 text-gray-500 hover:text-gray-300'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

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
          <DimensionBar label={DIMENSIONS.physical.label[language]} value={result.physical} emoji={DIMENSIONS.physical.emoji} dimColor={DIMENSIONS.physical.color} />
          <DimensionBar label={DIMENSIONS.emotional.label[language]} value={result.emotional} emoji={DIMENSIONS.emotional.emoji} dimColor={DIMENSIONS.emotional.color} />
          <DimensionBar label={DIMENSIONS.cognitive.label[language]} value={result.cognitive} emoji={DIMENSIONS.cognitive.emoji} dimColor={DIMENSIONS.cognitive.color} />
          <DimensionBar label={DIMENSIONS.team.label[language]} value={result.team} emoji={DIMENSIONS.team.emoji} dimColor={DIMENSIONS.team.color} />
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
            href="https://y2y.hu/kapcsolat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110"
            style={{ backgroundColor: risk.color }}
          >
            {t.cta} →
          </a>
          <p className="mt-3 text-xs text-gray-600">Nem küldünk spam-et.</p>
        </div>

        {/* WHO note */}
        <div className="mb-6 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            {language === 'hu' ? 'Fontos tudni' : language === 'de' ? 'Wichtig zu wissen' : 'Important to know'}
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">{WHO_NOTE[language]}</p>
        </div>

        {/* Retake */}
        <button
          onClick={onRetake}
          className="w-full py-3 rounded-xl text-sm text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-700 transition-colors"
        >
          {t.retake}
        </button>

        {/* Methodology note */}
        <div className="mt-8 pt-6 border-t border-gray-900">
          <p className="text-[11px] text-gray-700 text-center leading-relaxed mb-2">{t.methodNote}</p>
          <p className="text-[11px] text-gray-700 text-center leading-relaxed">{t.footer}</p>
        </div>

        <div className="mt-4 text-center">
          <a href="https://y2y.hu/en" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">
            y2y.hu
          </a>
        </div>
      </div>
    </div>
  );
}
