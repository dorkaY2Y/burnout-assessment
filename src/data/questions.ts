// Y2Y Burnout Compass — Kérdésbank
// Alapja: CBI (Copenhagen Burnout Inventory) + OLBI (Oldenburg Burnout Inventory)
// Foxconn leadership kontextus — 4 dimenzió
// Skála: 1-5 Likert (egyáltalán nem jellemző → teljes mértékben jellemző)
// Háromnyelvű: hu + en + de

export type Language = 'hu' | 'en' | 'de';

export interface BurnoutQuestion {
  id: number;
  text: { hu: string; en: string; de: string };
  dimension: 'physical' | 'emotional' | 'cognitive' | 'team';
  reversed?: boolean; // reversed: 5 = alacsony burnout
}

export const QUESTIONS: BurnoutQuestion[] = [
  // ─── 🔴 FIZIKAI KIMERÜLTSÉG (6 kérdés) ──────────────────────────────────
  {
    id: 1,
    text: {
      hu: 'Fizikailag kimerültnek érzem magam a munkanapom végére.',
      en: 'I feel physically exhausted by the end of my workday.',
      de: 'Ich bin am Ende meines Arbeitstages körperlich erschöpft.',
    },
    dimension: 'physical',
  },
  {
    id: 2,
    text: {
      hu: 'Reggel már fáradtan ébredek, amikor munkába kell mennem.',
      en: 'I wake up feeling tired on workdays.',
      de: 'Ich wache an Arbeitstagen müde auf.',
    },
    dimension: 'physical',
  },
  {
    id: 3,
    text: {
      hu: 'Egyre több pihenésre van szükségem ahhoz, hogy visszanyerjem az erőmet.',
      en: 'I need more and more rest to recover my energy.',
      de: 'Ich brauche immer mehr Erholung, um neue Energie zu tanken.',
    },
    dimension: 'physical',
  },
  {
    id: 4,
    text: {
      hu: 'A munkanapokon kevés energiám marad a magánéletemre.',
      en: 'I have little energy left for my personal life on workdays.',
      de: 'An Arbeitstagen habe ich kaum noch Energie für mein Privatleben.',
    },
    dimension: 'physical',
  },
  {
    id: 5,
    text: {
      hu: 'A testem jelzi a túlterheltséget (fejfájás, izomfeszülés, alvászavar).',
      en: 'My body signals overload (headaches, muscle tension, sleep problems).',
      de: 'Mein Körper zeigt Zeichen von Überlastung (Kopfschmerzen, Muskelverspannungen, Schlafprobleme).',
    },
    dimension: 'physical',
  },
  {
    id: 6,
    text: {
      hu: 'Munka után elegendő energiám van a számomra fontos tevékenységekre.',
      en: 'After work, I still have enough energy for activities that matter to me.',
      de: 'Nach der Arbeit habe ich noch genug Energie für Aktivitäten, die mir wichtig sind.',
    },
    dimension: 'physical',
    reversed: true,
  },

  // ─── 🟠 ÉRZELMI KIMERÜLTSÉG (6 kérdés) ──────────────────────────────────
  {
    id: 7,
    text: {
      hu: 'Érzelmileg megterhelőnek érzem a munkámat.',
      en: 'I find my work emotionally draining.',
      de: 'Meine Arbeit empfinde ich als emotional belastend.',
    },
    dimension: 'emotional',
  },
  {
    id: 8,
    text: {
      hu: 'Frusztrált vagyok a munkahelyi helyzetek miatt.',
      en: 'I feel frustrated by situations at work.',
      de: 'Ich bin frustriert über Situationen an meinem Arbeitsplatz.',
    },
    dimension: 'emotional',
  },
  {
    id: 9,
    text: {
      hu: 'Úgy érzem, hogy a végső határaimon vagyok.',
      en: 'I feel like I am at the end of my rope.',
      de: 'Ich habe das Gefühl, an meinen Grenzen angekommen zu sein.',
    },
    dimension: 'emotional',
  },
  {
    id: 10,
    text: {
      hu: 'Nehezebben viselem a munkahelyi konfliktusokat, mint korábban.',
      en: 'I find it harder to cope with workplace conflicts than before.',
      de: 'Ich finde es schwerer als früher, mit Konflikten am Arbeitsplatz umzugehen.',
    },
    dimension: 'emotional',
  },
  {
    id: 11,
    text: {
      hu: 'Munka közben gyakran érzek szorongást vagy feszültséget.',
      en: 'I often feel anxious or tense during work.',
      de: 'Während der Arbeit fühle ich mich oft ängstlich oder angespannt.',
    },
    dimension: 'emotional',
  },
  {
    id: 12,
    text: {
      hu: 'Képes vagyok elengedni a munkahelyi stresszt, amikor hazamegyek.',
      en: 'I am able to let go of work-related stress when I go home.',
      de: 'Ich kann den Arbeitsstress loslassen, wenn ich nach Hause komme.',
    },
    dimension: 'emotional',
    reversed: true,
  },

  // ─── 🟡 KOGNITÍV TÁVOLSÁGTARTÁS (5 kérdés) ─────────────────────────────
  {
    id: 13,
    text: {
      hu: 'Egyre kevésbé érdekel, hogy mi történik a munkahelyemen.',
      en: 'I am less and less interested in what happens at my workplace.',
      de: 'Ich interessiere mich immer weniger dafür, was an meinem Arbeitsplatz passiert.',
    },
    dimension: 'cognitive',
  },
  {
    id: 14,
    text: {
      hu: 'Cinikusabbá váltam a munkámmal kapcsolatban.',
      en: 'I have become more cynical about my work.',
      de: 'Ich bin zynischer gegenüber meiner Arbeit geworden.',
    },
    dimension: 'cognitive',
  },
  {
    id: 15,
    text: {
      hu: 'Megkérdőjelezem, hogy van-e értelme annak, amit csinálok.',
      en: 'I question whether what I do has any real purpose.',
      de: 'Ich hinterfrage, ob das, was ich tue, einen echten Sinn hat.',
    },
    dimension: 'cognitive',
  },
  {
    id: 16,
    text: {
      hu: 'A munkámat mechanikusan végzem, belső motiváció nélkül.',
      en: 'I do my work mechanically, without inner motivation.',
      de: 'Ich erledige meine Arbeit mechanisch, ohne innere Motivation.',
    },
    dimension: 'cognitive',
  },
  {
    id: 17,
    text: {
      hu: 'A munkám továbbra is fontos és értékes számomra.',
      en: 'My work continues to be important and meaningful to me.',
      de: 'Meine Arbeit ist mir weiterhin wichtig und bedeutsam.',
    },
    dimension: 'cognitive',
    reversed: true,
  },

  // ─── 🔵 CSAPAT- ÉS SZERVEZETI KAPCSOLAT (5 kérdés) ─────────────────────
  {
    id: 18,
    text: {
      hu: 'A csapatom irányítása egyre inkább megterhelő számomra.',
      en: 'Managing my team has become increasingly burdensome.',
      de: 'Das Führen meines Teams empfinde ich als zunehmend belastend.',
    },
    dimension: 'team',
  },
  {
    id: 19,
    text: {
      hu: 'Nehezen találom meg a türelmet a beosztottjaim problémáihoz.',
      en: "I struggle to find patience for my team members' problems.",
      de: 'Es fällt mir schwer, Geduld für die Probleme meiner Mitarbeiter aufzubringen.',
    },
    dimension: 'team',
  },
  {
    id: 20,
    text: {
      hu: 'Úgy érzem, a szervezet nem értékeli eléggé az erőfeszítéseimet.',
      en: 'I feel the organization does not sufficiently value my efforts.',
      de: 'Ich habe das Gefühl, dass die Organisation meinen Einsatz nicht ausreichend wertschätzt.',
    },
    dimension: 'team',
  },
  {
    id: 21,
    text: {
      hu: 'Vezetőként magányosnak érzem magam a döntéseim súlya alatt.',
      en: 'As a leader, I feel lonely under the weight of my decisions.',
      de: 'Als Führungskraft fühle ich mich unter dem Gewicht meiner Entscheidungen einsam.',
    },
    dimension: 'team',
  },
  {
    id: 22,
    text: {
      hu: 'Jó kapcsolatom van a csapatommal, és támogatónak érzem a környezetemet.',
      en: 'I have a good relationship with my team and feel supported.',
      de: 'Ich habe eine gute Beziehung zu meinem Team und fühle mich unterstützt.',
    },
    dimension: 'team',
    reversed: true,
  },
];

export const DIMENSIONS: Record<
  BurnoutQuestion['dimension'],
  { label: { hu: string; en: string; de: string }; emoji: string; color: string }
> = {
  physical: {
    label: { hu: 'Fizikai Kimerültség', en: 'Physical Exhaustion', de: 'Körperliche Erschöpfung' },
    emoji: '🔴',
    color: '#ef4444',
  },
  emotional: {
    label: { hu: 'Érzelmi Kimerültség', en: 'Emotional Exhaustion', de: 'Emotionale Erschöpfung' },
    emoji: '🟠',
    color: '#f97316',
  },
  cognitive: {
    label: { hu: 'Kognitív Távolságtartás', en: 'Cognitive Distancing', de: 'Kognitive Distanzierung' },
    emoji: '🟡',
    color: '#eab308',
  },
  team: {
    label: { hu: 'Csapat & Szervezet', en: 'Team & Organization', de: 'Team & Organisation' },
    emoji: '🔵',
    color: '#3b82f6',
  },
};
