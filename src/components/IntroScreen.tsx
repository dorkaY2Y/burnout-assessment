import { Language } from '../data/questions';

interface IntroScreenProps {
  onStart: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const COPY = {
  hu: {
    brand: 'Burnout Compass',
    tagline: 'Nem kell megvárnod, amíg a szervezeted szól.',
    taglineBold: 'Megmutatjuk, hol tartasz most.',
    intro1: 'A Y2Y Burnout Compass két validált tudományos skála — az MBI és a BAT — alapján mutatja meg, milyen burnout-mintázatban vagy. 22 kérdés, 5 dimenzió, ~8 perc.',
    intro2: 'Az eredményeid biztonságban vannak. Csak akkor van értelme kitöltened, ha őszinte vagy magaddal.',
    q: '22 kérdés',
    d: '5 dimenzió',
    m: '~8 perc',
    cta: 'Kezdjük el',
    sub: 'Nincsenek jó vagy rossz válaszok.',
    sciTitle: 'Tudományos alapok',
    sciDesc: 'Két validált, nyílt forrású eszköz kombinációja:',
    s1title: 'MBI — Maslach Burnout Inventory',
    s1ref: 'Maslach & Jackson, 1981',
    s2title: 'BAT — Burnout Assessment Tool',
    s2ref: 'Leiter & Maslach, 2021',
    changeLang: 'English',
  },
  en: {
    brand: 'Burnout Compass',
    tagline: "Don't wait until your body tells you.",
    taglineBold: 'See where you stand — right now.',
    intro1: 'The Y2Y Burnout Compass combines two validated scientific scales — MBI and BAT — to reveal your burnout pattern. 22 questions, 5 dimensions, ~8 minutes.',
    intro2: 'Your results are safe. This only makes sense if you are honest with yourself.',
    q: '22 questions',
    d: '5 dimensions',
    m: '~8 min',
    cta: "Let's start",
    sub: 'There are no right or wrong answers.',
    sciTitle: 'Scientific Foundation',
    sciDesc: 'A combination of two validated, open-source tools:',
    s1title: 'MBI — Maslach Burnout Inventory',
    s1ref: 'Maslach & Jackson, 1981',
    s2title: 'BAT — Burnout Assessment Tool',
    s2ref: 'Leiter & Maslach, 2021',
    changeLang: 'Magyar',
  },
};

export default function IntroScreen({ onStart, language, setLanguage }: IntroScreenProps) {
  const t = COPY[language];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative z-10">
      <div className="max-w-lg w-full text-center animate-fade-up">
        {/* Language toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === 'hu' ? 'en' : 'hu')}
            className="text-xs text-gray-500 hover:text-gray-300 border border-gray-700 rounded-lg px-3 py-1.5 transition-colors"
          >
            {t.changeLang}
          </button>
        </div>

        {/* Branding */}
        <div className="mb-8">
          <div className="text-5xl mb-3">🔥</div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-2 text-white">
            {t.brand}
          </h1>
          <p className="text-xs text-gray-500 font-medium tracking-[0.3em] uppercase">
            by Y2Y
          </p>
        </div>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-gray-300 font-light leading-tight mb-6">
          {t.tagline}
          <br />
          <span className="font-bold text-white tracking-tight">{t.taglineBold}</span>
        </p>

        {/* Description */}
        <div className="mb-8 max-w-lg mx-auto">
          <p className="text-base text-gray-400 font-light leading-relaxed mb-4">{t.intro1}</p>
          <p className="text-sm text-gray-500 font-light leading-relaxed">{t.intro2}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-8 text-gray-500 text-sm font-medium">
          <span><span className="font-mono font-bold text-lg text-red-400">22</span> {t.q}</span>
          <span className="text-gray-700">·</span>
          <span><span className="font-mono font-bold text-lg text-red-400">5</span> {t.d}</span>
          <span className="text-gray-700">·</span>
          <span><span className="font-mono font-bold text-lg text-red-400">{t.m}</span></span>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-2.5 px-10 py-4 rounded-xl font-bold text-base tracking-tight transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg bg-red-500 text-white"
        >
          {t.cta}
          <span className="transition-transform duration-200 group-hover:translate-x-1 font-normal text-lg">→</span>
        </button>

        <p className="mt-5 text-sm text-gray-600 font-light">{t.sub}</p>

        {/* Scientific foundation */}
        <div className="mt-16 pt-10 border-t border-gray-800">
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-[0.2em] mb-4">
            {t.sciTitle}
          </p>
          <p className="text-sm text-gray-500 font-light mb-5">{t.sciDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
              <p className="text-sm font-semibold text-white mb-1">{t.s1title}</p>
              <p className="text-xs text-gray-500 font-mono">{t.s1ref}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
              <p className="text-sm font-semibold text-white mb-1">{t.s2title}</p>
              <p className="text-xs text-gray-500 font-mono">{t.s2ref}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
