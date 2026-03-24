import { Language } from '../data/questions';

interface IntroScreenProps {
  onStart: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LANG_CYCLE: Language[] = ['hu', 'en', 'de'];
const LANG_LABELS: Record<Language, string> = { hu: 'Magyar', en: 'English', de: 'Deutsch' };

const COPY = {
  hu: {
    brand: 'Burnout Compass',
    tagline: 'Nem kell megvárnod, amíg a szervezeted szól.',
    taglineBold: 'Megmutatjuk, hol tartasz most.',
    intro1: 'A Y2Y Burnout Compass két nemzetközileg validált tudományos skála kombinációján alapul. Nem egy kvíz — hanem egy komoly mérőeszköz, amelyet az Y2Y leadership kontextusra adaptált.',
    intro2: 'Az eredményeid biztonságban vannak. Csak akkor van értelme kitöltened, ha őszinte vagy magaddal.',
    q: 'kérdés',
    d: 'dimenzió',
    m: '~20 perc',
    cta: 'Kezdjük el',
    sub: 'Nincsenek jó vagy rossz válaszok.',
    notTitle: 'Mi NEM ez az eszköz',
    not1: 'Nem diagnosztikai eszköz — nem helyettesíti az orvosi szakvéleményt',
    not2: 'Nem egyéni "leleplezés" — az adatok kizárólag a résztvevőé',
    not3: 'Nem kötelező az utánkövetés — a felmérés önmagában is értékes',
    sciTitle: 'Módszertan',
    sciDesc: 'A két eszköz egymást kiegészíti: a CBI a kimerülés fizikai és érzelmi oldalát méri, az OLBI az elkötelezettség csökkenését és a munkától való eltávolodást. Az Y2Y modell a két skálát súlyozottan kombinálja — egyetlen összesített burnout indexet (Y2Y Burnout Index, 0–100) ad, 4 dimenzió részletes bontásával.',
    s1title: 'CBI — Copenhagen Burnout Inventory',
    s1desc: 'Fizikai és érzelmi kimerülést mér. Különlegessége, hogy nem csak munkavégzőkre alkalmazható — a kiégést általános emberi jelenségként közelíti meg.',
    s1ref: 'Kristensen et al., 2005 · Work & Stress',
    s2title: 'OLBI — Oldenburg Burnout Inventory',
    s2desc: 'A kimerülés mellett az elkötelezettség és a distancia dimenzióját is vizsgálja. Az egyik legszélesebb körben validált burnout-eszköz, 20+ országban alkalmazva.',
    s2ref: 'Demerouti & Bakker, 2008 · Journal of Vocational Behavior',
    disclaimer: 'Ez az eszköz tájékoztató jellegű és nem helyettesíti a klinikai diagnózist vagy a szakemberrel való konzultációt.',
  },
  en: {
    brand: 'Burnout Compass',
    tagline: "Don't wait until your body tells you.",
    taglineBold: 'See where you stand — right now.',
    intro1: 'The Y2Y Burnout Compass is built on a combination of two internationally validated scientific scales. Not a quiz — but a serious measurement tool, adapted by Y2Y for leadership contexts.',
    intro2: 'Your results are safe. This only makes sense if you are honest with yourself.',
    q: 'questions',
    d: 'dimensions',
    m: '~20 min',
    cta: "Let's start",
    sub: 'There are no right or wrong answers.',
    notTitle: 'What this tool is NOT',
    not1: 'Not a diagnostic tool — does not replace medical opinion',
    not2: 'Not individual "exposure" — data belongs exclusively to the participant',
    not3: 'No follow-up required — the assessment is valuable on its own',
    sciTitle: 'Methodology',
    sciDesc: 'The two tools complement each other: CBI measures the physical and emotional sides of exhaustion, while OLBI captures declining engagement and cognitive distancing from work. The Y2Y model combines both scales with weighted scoring — producing a single Y2Y Burnout Index (0–100) with a detailed breakdown across four dimensions.',
    s1title: 'CBI — Copenhagen Burnout Inventory',
    s1desc: 'Measures physical and emotional exhaustion. Unique in treating burnout as a universal human phenomenon — not limited to helping professions.',
    s1ref: 'Kristensen et al., 2005 · Work & Stress',
    s2title: 'OLBI — Oldenburg Burnout Inventory',
    s2desc: 'Captures both exhaustion and disengagement. One of the most widely validated burnout instruments, applied in 20+ countries across industries.',
    s2ref: 'Demerouti & Bakker, 2008 · Journal of Vocational Behavior',
    disclaimer: 'This tool is informational and does not replace clinical diagnosis or consultation with a professional.',
  },
  de: {
    brand: 'Burnout Compass',
    tagline: 'Warte nicht, bis dein Körper die Grenze zieht.',
    taglineBold: 'Zeige, wo du gerade stehst.',
    intro1: 'Der Y2Y Burnout Compass basiert auf der Kombination zweier international validierter wissenschaftlicher Skalen. Kein Quiz — sondern ein ernsthaftes Messinstrument, das von Y2Y für Leadership-Kontexte adaptiert wurde.',
    intro2: 'Deine Ergebnisse sind sicher. Das ergibt nur Sinn, wenn du ehrlich mit dir selbst bist.',
    q: 'Fragen',
    d: 'Dimensionen',
    m: '~20 Min.',
    cta: 'Jetzt starten',
    sub: 'Es gibt keine richtigen oder falschen Antworten.',
    notTitle: 'Was dieses Tool NICHT ist',
    not1: 'Kein Diagnoseinstrument — ersetzt kein medizinisches Gutachten',
    not2: 'Keine individuelle "Enthüllung" — Daten gehören ausschließlich dem Teilnehmer',
    not3: 'Keine Nachverfolgung erforderlich — die Befragung ist für sich allein wertvoll',
    sciTitle: 'Methodik',
    sciDesc: 'Die beiden Instrumente ergänzen sich: CBI misst die physische und emotionale Erschöpfung, OLBI erfasst nachlassendes Engagement und kognitive Distanzierung von der Arbeit. Das Y2Y-Modell kombiniert beide Skalen gewichtet — und liefert einen einzigen zusammengefassten Burnout-Index (Y2Y Burnout Index, 0–100) mit detaillierter Aufschlüsselung in vier Dimensionen.',
    s1title: 'CBI — Copenhagen Burnout Inventory',
    s1desc: 'Misst physische und emotionale Erschöpfung. Einzigartig, da Burnout als allgemeines menschliches Phänomen betrachtet wird — nicht nur für helfende Berufe.',
    s1ref: 'Kristensen et al., 2005 · Work & Stress',
    s2title: 'OLBI — Oldenburg Burnout Inventory',
    s2desc: 'Erfasst sowohl Erschöpfung als auch Disengagement. Eines der am weitesten validierten Burnout-Instrumente, in 20+ Ländern und Branchen eingesetzt.',
    s2ref: 'Demerouti & Bakker, 2008 · Journal of Vocational Behavior',
    disclaimer: 'Dieses Tool ist informativ und ersetzt keine klinische Diagnose oder professionelle Beratung.',
  },
};

export default function IntroScreen({ onStart, language, setLanguage }: IntroScreenProps) {
  const t = COPY[language];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative z-10">
      <div className="max-w-lg w-full text-center animate-fade-up">

        {/* Language toggle */}
        <div className="flex justify-end mb-6 gap-2">
          {LANG_CYCLE.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`text-xs border rounded-lg px-3 py-1.5 transition-colors ${
                language === lang
                  ? 'border-red-500 text-red-400 bg-red-500/10'
                  : 'border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
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
          <span><span className="font-mono font-bold text-lg text-red-400">4</span> {t.d}</span>
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

        {/* Mi NEM */}
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">{t.notTitle}</p>
          <ul className="space-y-2.5">
            {[t.not1, t.not2, t.not3].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                <span className="text-gray-600 mt-0.5 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scientific foundation */}
        <div className="mt-10 pt-10 border-t border-gray-800 text-left">
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-[0.2em] mb-4 text-center">
            {t.sciTitle}
          </p>
          <p className="text-sm text-gray-400 leading-relaxed mb-6 text-center max-w-md mx-auto">{t.sciDesc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
              <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">01</p>
              <p className="text-sm font-semibold text-white mb-2">{t.s1title}</p>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">{t.s1desc}</p>
              <p className="text-[10px] text-gray-600 font-mono">{t.s1ref}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
              <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">02</p>
              <p className="text-sm font-semibold text-white mb-2">{t.s2title}</p>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">{t.s2desc}</p>
              <p className="text-[10px] text-gray-600 font-mono">{t.s2ref}</p>
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-700 text-center leading-relaxed max-w-md mx-auto">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
