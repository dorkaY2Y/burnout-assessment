// ============================================================
// Y2Y LEADERSHIP READINESS INDEX - Browser Version
// Neuroscience-based leadership assessment tool
// 5 dimensions × 4 questions = 20 questions
// ============================================================

const DIMENSIONS = [
  {
    id: "cognitive_flexibility",
    name: "Kognitív Rugalmasság",
    shortName: "Kognitív\nRugalmasság",
    icon: "🧠",
    science: "Prefrontális kéreg aktivitás, kognitív flexibilitás (Diamond, 2013)",
    description: "Mennyire képes a vezető gyorsan váltani kontextusok, gondolkodási módok és ember-AI együttműködés között.",
    color: "#2D5BFF",
  },
  {
    id: "uncertainty_tolerance",
    name: "Bizonytalanság-tűrés",
    shortName: "Bizonytalanság-\ntűrés",
    icon: "🌊",
    science: "SCARF modell: Certainty dimenzió (Rock, 2008), Intolerance of Uncertainty Scale (Buhr & Dugas, 2002)",
    description: "Hogyan kezeli a vezető a FLUX évtized kiszámíthatatlanságát és az állandó változást.",
    color: "#00C2A8",
  },
  {
    id: "autonomy_design",
    name: "Autonómia-tervezés",
    shortName: "Autonómia-\ntervezés",
    icon: "🎯",
    science: "SCARF modell: Autonomy dimenzió (Rock, 2008), Self-Determination Theory (Deci & Ryan, 2000)",
    description: "Mennyire képes a vezető valódi döntési teret adni a csapatának ahelyett, hogy mikro-menedzselne.",
    color: "#FF6B35",
  },
  {
    id: "psychological_safety",
    name: "Pszichológiai Biztonság",
    shortName: "Pszichológiai\nBiztonság",
    icon: "🛡️",
    science: "Edmondson (1999), SCARF: Relatedness & Status (Rock, 2008)",
    description: "Mennyire teremt olyan közeget, ahol az emberek mernek hibázni, kérdezni és innoválni.",
    color: "#A855F7",
  },
  {
    id: "adaptive_decision",
    name: "Adaptív Döntéshozatal",
    shortName: "Adaptív\nDöntéshozatal",
    icon: "⚡",
    science: "Dual-Process Theory (Kahneman, 2011), SCARF: Fairness (Rock, 2008)",
    description: "Hogyan hoz döntéseket gyorsan változó környezetben, mennyire ismeri fel saját kognitív torzításait.",
    color: "#F43F5E",
  },
  {
    id: "group_culture",
    name: "Csoportkultúra-tudatosság",
    shortName: "Csoportkultúra-\ntudatosság",
    icon: "🧩",
    science: "Riemann-féle csoportdinamikai modell (1961), Csoportkultúra-tipológia",
    description: "Mennyire tudatosan alakítja a vezető a csapata kultúráját, és mennyire képes kezelni a különböző kultúratípusok dinamikáját.",
    color: "#FACC15",
  },
];

const QUESTIONS = [
  // COGNITIVE FLEXIBILITY (4)
  {
    dimension: "cognitive_flexibility",
    text: "Amikor egy jól bevált folyamatról kiderül, hogy már nem működik, hogyan reagálsz?",
    answers: [
      { text: "Azonnal elkezdem keresni az alternatívákat és kísérletezni", score: 5 },
      { text: "Összegyűjtöm az adatokat és átgondolom a lehetőségeket", score: 4 },
      { text: "Megpróbálom először finomhangolni a meglévő folyamatot", score: 3 },
      { text: "Várok, hátha a helyzet magától rendeződik", score: 2 },
      { text: "Ragaszkodom a bevált módszerhez – eddig működött", score: 1 },
    ],
  },
  {
    dimension: "cognitive_flexibility",
    text: "Egy nap alatt stratégiai meetingről operatív tűzoltásba, onnan coaching beszélgetésbe váltasz. Hogyan éled meg?",
    answers: [
      { text: "Élvezem a változatosságot, könnyen váltok módok között", score: 5 },
      { text: "Tudatosan készülök a váltásokra, szüneteket iktatok be", score: 4 },
      { text: "Megbirkózom vele, de a nap végére kimerülök", score: 3 },
      { text: "Nehezen váltok, az egyik téma gondolatai átszűrődnek a másikba", score: 2 },
      { text: "Ez a tempó szétszed – nem tudok egyikre sem fókuszálni", score: 1 },
    ],
  },
  {
    dimension: "cognitive_flexibility",
    text: "Egy kollégád radikálisan más megközelítést javasol egy projektre, mint amit te elképzeltél. Mi a reakciód?",
    answers: [
      { text: "Kíváncsi vagyok – kérem, hogy fejtse ki részletesen az érveit", score: 5 },
      { text: "Meghallgatom, de közben összehasonlítom a sajátommal", score: 4 },
      { text: "Elfogadom, de belül azért fenntartásaim vannak", score: 3 },
      { text: "Udvariasan meghallgatom, de ragaszkodom az eredetihez", score: 2 },
      { text: "Frusztráló, hogy nem látja be, miért jobb az én elképzelésem", score: 1 },
    ],
  },
  {
    dimension: "cognitive_flexibility",
    text: "Egy AI asszisztens javasol egy teljesen új munkafolyamatot, ami 80%-kal hatékonyabb, de teljesen más, mint amit megszoktál. Mit teszel?",
    answers: [
      { text: "Azonnal kipróbálom – a hatékonyság számít, nem a megszokás", score: 5 },
      { text: "Először teszteljük kis körben, majd ha működik, bevezetjük", score: 4 },
      { text: "Vegyesen alkalmazzuk az új és a régi elemeket", score: 3 },
      { text: "Kísérletezgetem, de inkább a régi marad a fő", score: 2 },
      { text: "Maradok a bevált módszernél – az AI nem ismeri a mi valóságunkat", score: 1 },
    ],
  },
  // UNCERTAINTY TOLERANCE (4)
  {
    dimension: "uncertainty_tolerance",
    text: "A piac hirtelen 30%-ot esik, a csapatod pánikban van. Te mit teszel?",
    answers: [
      { text: "Nyugodt vagyok – ez a piac természete, van rá tervünk", score: 5 },
      { text: "Megnyugtatom a csapatot, majd azonnal adatokat gyűjtök", score: 4 },
      { text: "Kicsit megijedek, de gyorsan összeszedem magam", score: 3 },
      { text: "Pánikolok, de igyekszem ezt nem mutatni", score: 2 },
      { text: "Teljesen kétségbeesem – ez a végünk", score: 1 },
    ],
  },
  {
    dimension: "uncertainty_tolerance",
    text: "Egy új projekt során nem tudod, milyen eredményre számíts. Mennyire vagy kényelmes ezzel?",
    answers: [
      { text: "Imádom a kihívásokat, ez inspirál", score: 5 },
      { text: "Kicsit idegesít, de kezelhető", score: 4 },
      { text: "Szívesebben tudnám a kimenetelt", score: 3 },
      { text: "Nagyon zavar, inkább kerülném az ilyen projekteket", score: 2 },
      { text: "Nem bírom a bizonytalanságot", score: 1 },
    ],
  },
  {
    dimension: "uncertainty_tolerance",
    text: "Egy fontos döntés előtt állsz, de nincs elég információd. Mit teszel?",
    answers: [
      { text: "Megbízom az intuíciómban és döntök", score: 5 },
      { text: "Minél több adatot gyűjtök, majd döntök", score: 4 },
      { text: "Várom meg, amíg több infóm lesz", score: 3 },
      { text: "Halogatom a döntést", score: 2 },
      { text: "Átengedem másnak a döntést", score: 1 },
    ],
  },
  {
    dimension: "uncertainty_tolerance",
    text: "A céged egy teljesen új piacra lépne. Mennyire támogatnád?",
    answers: [
      { text: "Teljesen – a változás a növekedés", score: 5 },
      { text: "Óvatosan, de nyitottan", score: 4 },
      { text: "Inkább a meglévő piacra koncentrálnék", score: 3 },
      { text: "Szkeptikus vagyok, de nem ellenzem", score: 2 },
      { text: "Nem támogatnám – túl kockázatos", score: 1 },
    ],
  },
  // AUTONOMY DESIGN (4)
  {
    dimension: "autonomy_design",
    text: "Egy csapattagad hibázik egy fontos projekten. Mi a reakciód?",
    answers: [
      { text: "Megbeszéljük, mit tanultunk belőle", score: 5 },
      { text: "Segítek javítani, de ő is legyen benne", score: 4 },
      { text: "Megmutatom, hol hibázott", score: 3 },
      { text: "Magam javítom, hogy biztos legyen", score: 2 },
      { text: "Lehetetlenítem el, hogy újra hibázzon", score: 1 },
    ],
  },
  {
    dimension: "autonomy_design",
    text: "Mennyire bízol meg a csapatodat önálló feladatokkal?",
    answers: [
      { text: "Teljesen – tudom, hogy jól fogják csinálni", score: 5 },
      { text: "Nagyjában, de ellenőrzöm", score: 4 },
      { text: "Kisebb feladatokat igen", score: 3 },
      { text: "Nagyon ritkán", score: 2 },
      { text: "Soha – mindent én csinálok", score: 1 },
    ],
  },
  {
    dimension: "autonomy_design",
    text: "Egy csapattagad más megközelítést javasol, mint a tiéd. Mit teszel?",
    answers: [
      { text: "Kíváncsian meghallgatom és kipróbálom", score: 5 },
      { text: "Megfontolom, de a tiéd marad", score: 4 },
      { text: "Udvariasan elutasítom", score: 3 },
      { text: "Érthetetlen, miért nem a tiédet választja", score: 2 },
      { text: "Tiltakozom ellene", score: 1 },
    ],
  },
  {
    dimension: "autonomy_design",
    text: "Mennyire gyakran kérdezed meg a csapatodat fontos döntések előtt?",
    answers: [
      { text: "Mindig – az ő véleményük számít", score: 5 },
      { text: "Gyakran, de a végső döntés az enyém", score: 4 },
      { text: "Néha, ha releváns", score: 3 },
      { text: "Ritkán, inkább egyedül döntök", score: 2 },
      { text: "Soha – én vagyok a vezető", score: 1 },
    ],
  },
  // PSYCHOLOGICAL SAFETY (4)
  {
    dimension: "psychological_safety",
    text: "Egy csapattagad merész ötlettel áll elő, ami kockázatos. Mit teszel?",
    answers: [
      { text: "Dicsérem a bátorságát és kipróbáljuk", score: 5 },
      { text: "Megbeszéljük a kockázatokat", score: 4 },
      { text: "Elmentem, de nem csináljuk", score: 3 },
      { text: "Lebeszélem róla", score: 2 },
      { text: "Kinevetem", score: 1 },
    ],
  },
  {
    dimension: "psychological_safety",
    text: "Valaki hibát vall a meetingen. Mi a reakciód?",
    answers: [
      { text: "Köszönöm az őszinteséget, tanuljunk belőle", score: 5 },
      { text: "Megnyugtatom, hogy ez előfordul", score: 4 },
      { text: "Röviden megemlítem, de továbbmegyünk", score: 3 },
      { text: "Kicsit megszégyenítem", score: 2 },
      { text: "Kiabálok vele", score: 1 },
    ],
  },
  {
    dimension: "psychological_safety",
    text: "Mennyire mernek a csapattagjaid ellentmondani neked?",
    answers: [
      { text: "Nyugodtan és gyakran", score: 5 },
      { text: "Néha, ha udvariasan", score: 4 },
      { text: "Ritkán, csak nagyon óvatosan", score: 3 },
      { text: "Szinte soha", score: 2 },
      { text: "Soha – félnek tőlem", score: 1 },
    ],
  },
  {
    dimension: "psychological_safety",
    text: "Milyen gyakran kérdeznek tőled a csapattagjaid, ha nem értenek valamit?",
    answers: [
      { text: "Folyamatosan – tudják, hogy segítőkész vagyok", score: 5 },
      { text: "Gyakran, de nem túl gyakran", score: 4 },
      { text: "Néha, ha nagyon fontos", score: 3 },
      { text: "Ritkán, inkább maguk próbálják megoldani", score: 2 },
      { text: "Soha – félnek butának tűnni", score: 1 },
    ],
  },
  // ADAPTIVE DECISION (4)
  {
    dimension: "adaptive_decision",
    text: "Két lehetőséged van: egy biztonságos, de lassú, és egy kockázatos, de gyors. Melyiket választod?",
    answers: [
      { text: "A kockázatosat – a sebesség számít", score: 5 },
      { text: "A helyzettől függ", score: 4 },
      { text: "Inkább a biztonságost", score: 3 },
      { text: "Nagyon ritkán választok kockázatosat", score: 2 },
      { text: "Soha a kockázatosat", score: 1 },
    ],
  },
  {
    dimension: "adaptive_decision",
    text: "Mennyire vagy tudatában a saját előítéleteidnek döntéshozatal közben?",
    answers: [
      { text: "Folyamatosan ellenőrzöm őket", score: 5 },
      { text: "Gyakran eszembe jutnak", score: 4 },
      { text: "Néha, de nem mindig", score: 3 },
      { text: "Ritkán gondolok rájuk", score: 2 },
      { text: "Soha – nem vagyok előítéletes", score: 1 },
    ],
  },
  {
    dimension: "adaptive_decision",
    text: "Egy döntés után kiderül, hogy hibáztál. Mit teszel?",
    answers: [
      { text: "Azonnal beismerem és javítom", score: 5 },
      { text: "Kicsit később, de beismerem", score: 4 },
      { text: "Titokban javítom", score: 3 },
      { text: "Próbálom elrejteni", score: 2 },
      { text: "Másokat hibáztatok", score: 1 },
    ],
  },
  {
    dimension: "adaptive_decision",
    text: "Mennyire használod az adatokat döntéshozatalban?",
    answers: [
      { text: "Mindig – az adatok vezérlik a döntéseimet", score: 5 },
      { text: "Gyakran, de az intuíció is számít", score: 4 },
      { text: "Néha, ha rendelkezésre állnak", score: 3 },
      { text: "Ritkán, inkább a megérzéseimre hagyatkozom", score: 2 },
      { text: "Soha – nem bízom az adatokban", score: 1 },
    ],
  },
  // GROUP CULTURE (4)
  {
    dimension: "group_culture",
    text: "Mennyire vagy tudatában a csapatod kultúrájának?",
    answers: [
      { text: "Folyamatosan figyelem és formálom", score: 5 },
      { text: "Gyakran gondolok rá", score: 4 },
      { text: "Néha eszembe jut", score: 3 },
      { text: "Ritkán foglalkozom vele", score: 2 },
      { text: "Soha – nem fontos", score: 1 },
    ],
  },
  {
    dimension: "group_culture",
    text: "Mennyire tudsz különböző kultúratípusú emberekkel dolgozni?",
    answers: [
      { text: "Könnyen alkalmazkodom mindenkihez", score: 5 },
      { text: "Többnyire igen", score: 4 },
      { text: "Néha nehéz", score: 3 },
      { text: "Gyakran problémát okoz", score: 2 },
      { text: "Soha – csak a hozzám hasonlókkal tudok", score: 1 },
    ],
  },
  {
    dimension: "group_culture",
    text: "Mennyire tudatosan alakítod a csapatod dinamikáját?",
    answers: [
      { text: "Folyamatosan tudatosan formálom", score: 5 },
      { text: "Gyakran igyekszem", score: 4 },
      { text: "Néha eszembe jut", score: 3 },
      { text: "Ritkán gondolok rá", score: 2 },
      { text: "Soha – magától alakul", score: 1 },
    ],
  },
  {
    dimension: "group_culture",
    text: "Mennyire figyeled a csapatod hangulatát?",
    answers: [
      { text: "Folyamatosan érzékelem és reagálok rá", score: 5 },
      { text: "Gyakran észreveszem", score: 4 },
      { text: "Néha, ha valami nagy változás van", score: 3 },
      { text: "Ritkán veszem észre", score: 2 },
      { text: "Soha – nem figyelem", score: 1 },
    ],
  },
];

// Google Forms konfiguráció
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeW8harqt7zoZPimF9VIkJtFzNYgLMBZAu8O31hYHVWm7nI9w/formResponse";

const GOOGLE_FORM_ENTRIES = {
  email: "entry.774123597",
  score1: "entry.307381788", // Önismeret
  score2: "entry.1049293008", // Érzelmi intelligencia
  score3: "entry.1686494736", // Kommunikáció
  score4: "entry.1767359167", // Döntéshozatal
  score5: "entry.2058760180", // Vízió és stratégia
  score6: "entry.740678", // Csapatépítés
  score7: "entry.860803405", // Változáskezelés
  score8: "entry.1061577670", // Etika és integritás
};

// Main App Component
const App = () => {
  const [phase, setPhase] = React.useState("intro"); // intro, quiz, result, email
  const [currentQ, setCurrentQ] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [animating, setAnimating] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailSent, setEmailSent] = React.useState(false);
  const [emailSending, setEmailSending] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [fadeIn, setFadeIn] = React.useState(true);

  const shuffledQuestions = React.useRef(null);
  if (!shuffledQuestions.current) {
    // Shuffle questions within each dimension, keep dimension order
    const grouped = {};
    QUESTIONS.forEach(q => {
      if (!grouped[q.dimension]) grouped[q.dimension] = [];
      grouped[q.dimension].push(q);
    });
    const ordered = [];
    DIMENSIONS.forEach(d => {
      const dimQs = grouped[d.id] || [];
      for (let i = dimQs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dimQs[i], dimQs[j]] = [dimQs[j], dimQs[i]];
      }
      ordered.push(...dimQs);
    });
    shuffledQuestions.current = ordered;
  }

  const questions = shuffledQuestions.current;

  const calcScores = () => {
    const scores = {};
    DIMENSIONS.forEach(d => {
      scores[d.id] = [];
    });

    answers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const answer = question.answers[answerIndex];
      scores[question.dimension].push(answer.score);
    });

    return DIMENSIONS.map(d => {
      const dimScores = scores[d.id];
      return dimScores.reduce((a, b) => a + b, 0) / dimScores.length;
    });
  };

  const handleAnswer = (answerIndex) => {
    if (animating) return;
    
    setAnimating(true);
    setSelectedAnswer(answerIndex);
    setFadeIn(false);

    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[currentQ] = answerIndex;
      setAnswers(newAnswers);

      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
        setFadeIn(true);
      } else {
        setPhase("result");
        setFadeIn(true);
      }
      setAnimating(false);
    }, 300);
  };

  const handleEmailSubmit = async () => {
    if (!email || !email.includes("@")) {
      setEmailError("Kérlek adj meg egy érvényes email címet");
      return;
    }

    setEmailSending(true);
    setEmailError("");

    try {
      const scores = calcScores();
      
      // Google Forms submit
      const formData = new FormData();
      formData.append(GOOGLE_FORM_ENTRIES.email, email);
      formData.append(GOOGLE_FORM_ENTRIES.score1, scores[0].toFixed(2));
      formData.append(GOOGLE_FORM_ENTRIES.score2, scores[1].toFixed(2));
      formData.append(GOOGLE_FORM_ENTRIES.score3, scores[2].toFixed(2));
      formData.append(GOOGLE_FORM_ENTRIES.score4, scores[3].toFixed(2));
      formData.append(GOOGLE_FORM_ENTRIES.score5, scores[4].toFixed(2));
      formData.append(GOOGLE_FORM_ENTRIES.score6, scores[5].toFixed(2));
      formData.append(GOOGLE_FORM_ENTRIES.score7, scores[6].toFixed(2));
      formData.append(GOOGLE_FORM_ENTRIES.score8, scores[7].toFixed(2));

      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      setEmailSent(true);
    } catch (error) {
      console.error("Email sending error:", error);
      setEmailError("Hiba történt. Kérlek próbáld újra később.");
    } finally {
      setEmailSending(false);
    }
  };

  const restart = () => {
    setPhase("intro");
    setCurrentQ(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setAnimating(false);
    setShowResults(false);
    setEmail("");
    setEmailSent(false);
    setEmailSending(false);
    setEmailError("");
    setFadeIn(true);
  };

  // Render methods
  if (phase === "intro") {
    return (
      <div className={`app-container ${fadeIn ? "fade-in" : ""}`}>
        <div className="intro-container">
          <div className="intro-header">
            <h1 className="intro-title">
              <span className="intro-title-main">Y2Y</span>
              <span className="intro-title-sub">Leadership Readiness Index</span>
            </h1>
            <p className="intro-subtitle">
              Neuroscience-based leadership assessment for the FLUX decade
            </p>
          </div>

          <div className="intro-content">
            <div className="intro-section">
              <h2 className="intro-section-title">🧠 Mi ez?</h2>
              <p className="intro-text">
                Egy 20 kérdéses, tudományosan alapozott vezetői felmérés, amely méri a 6 kulcsfontosságú vezetői kompetenciát a FLUX évtized kihívásaihoz igazodva.
              </p>
            </div>

            <div className="intro-section">
              <h2 className="intro-section-title">⏱️ Mennyi idő?</h2>
              <p className="intro-text">
                Kb. 8-10 perc. Nincsenek jó vagy rossz válaszok – csak őszinte válaszok.
              </p>
            </div>

            <div className="intro-section">
              <h2 className="intro-section-title">🎯 Miért?</h2>
              <p className="intro-text">
                Azért, hogy tudd, hol tartasz vezetőként, és mire érdemes fókuszálnod a fejlődésedben.
              </p>
            </div>

            <div className="intro-dimensions">
              <h2 className="intro-section-title">📊 Mérjük:</h2>
              <div className="dimensions-grid">
                {DIMENSIONS.map((dim) => (
                  <div key={dim.id} className="dimension-card">
                    <div className="dimension-icon">{dim.icon}</div>
                    <div className="dimension-name">{dim.shortName}</div>
                  </div>
                ))}
              </div>
            </div>

            <button className="intro-start-btn" onClick={() => setPhase("quiz")}>
              Kezdéshez →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    const question = questions[currentQ];
    const dimension = DIMENSIONS.find(d => d.id === question.dimension);
    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <div className={`app-container ${fadeIn ? "fade-in" : ""}`}>
        <div className="quiz-container">
          <div className="quiz-header">
            <div className="quiz-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="progress-text">
                {currentQ + 1} / {questions.length}
              </div>
            </div>
            <div className="dimension-indicator" style={{ backgroundColor: dimension.color }}>
              <span className="dimension-icon">{dimension.icon}</span>
              <span className="dimension-name">{dimension.name}</span>
            </div>
          </div>

          <div className="quiz-content">
            <div className="question-container">
              <h2 className="question-text">{question.text}</h2>
            </div>

            <div className="answers-container">
              {question.answers.map((answer, index) => (
                <button
                  key={index}
                  className={`answer-btn ${selectedAnswer === index ? "selected" : ""}`}
                  onClick={() => handleAnswer(index)}
                  disabled={animating}
                >
                  <span className="answer-text">{answer.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const scores = calcScores();
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    return (
      <div className={`app-container ${fadeIn ? "fade-in" : ""}`}>
        <div className="result-container">
          <div className="result-header">
            <h1 className="result-title">🎯 Eredményeid</h1>
            <p className="result-subtitle">
              Leadership Readiness Index: {avgScore.toFixed(1)} / 5.0
            </p>
          </div>

          <div className="result-content">
            <div className="overall-score">
              <div className="score-circle">
                <div className="score-value">{avgScore.toFixed(1)}</div>
                <div className="score-max">/ 5.0</div>
              </div>
            </div>

            <div className="dimensions-results">
              {DIMENSIONS.map((dim, index) => (
                <div key={dim.id} className="dimension-result">
                  <div className="dimension-header">
                    <span className="dimension-icon">{dim.icon}</span>
                    <span className="dimension-name">{dim.name}</span>
                  </div>
                  <div className="score-bar">
                    <div className="score-fill" style={{ width: `${(scores[index] / 5) * 100}%`, backgroundColor: dim.color }} />
                  </div>
                  <div className="score-value">{scores[index].toFixed(1)}</div>
                </div>
              ))}
            </div>

            <div className="result-actions">
              <button className="restart-btn" onClick={restart}>
                Újra kezdés
              </button>
              <button className="email-btn" onClick={() => setPhase("email")}>
                Eredmények emailben
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "email") {
    const scores = calcScores();
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    return (
      <div className={`app-container ${fadeIn ? "fade-in" : ""}`}>
        <div className="email-container">
          <div className="email-header">
            <h1 className="email-title">📧 Eredményeid emailben</h1>
            <p className="email-subtitle">
              Küldjük el a részletes riportot az email címedre
            </p>
          </div>

          <div className="email-content">
            <div className="email-summary">
              <div className="summary-score">
                <div className="summary-value">{avgScore.toFixed(1)}</div>
                <div className="summary-max">/ 5.0</div>
              </div>
              <div className="summary-text">
                Leadership Readiness Index
              </div>
            </div>

            {!emailSent ? (
              <div className="email-form">
                <div className="form-group">
                  <input
                    type="email"
                    className="email-input"
                    placeholder="email@ceg.hu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !emailSending && handleEmailSubmit()}
                    disabled={emailSending}
                  />
                  <button 
                    className="submit-btn" 
                    onClick={handleEmailSubmit}
                    disabled={emailSending}
                  >
                    {emailSending ? "Küldés..." : "Küldés →"}
                  </button>
                </div>
                
                {emailError && (
                  <div className="error-message">
                    ⚠️ {emailError}
                  </div>
                )}
                
                <p className="email-note">
                  Nem küldünk spamot. Csak a riportot kapod meg.
                </p>
              </div>
            ) : (
              <div className="email-success">
                <div className="success-icon">✅</div>
                <h3>Sikeresen elküldve!</h3>
                <p>A riport hamarosan megérkezik az email címedre.</p>
                <button className="restart-btn" onClick={restart}>
                  Újra kezdés
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
