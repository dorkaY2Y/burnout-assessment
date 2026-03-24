// Y2Y Burnout Compass — Kérdésbank
// Alapja: MBI (Maslach Burnout Inventory) + BAT (Burnout Assessment Tool, Leiter & Maslach 2021)
// Skála: 1-5 (soha / never → mindig / always)
// Kétnyelvű: hu + en

export type Language = 'hu' | 'en';

export interface BurnoutQuestion {
  id: number;
  text: { hu: string; en: string };
  dimension: 'emotional' | 'detachment' | 'cognitive' | 'efficacy' | 'somatic';
  reversed?: boolean; // reversed: 5 = alacsony burnout
}

export const QUESTIONS: BurnoutQuestion[] = [
  // ─── ÉRZELMI KIMERÜLTSÉG (6 kérdés) ─────────────────────────────────────
  {
    id: 1,
    text: {
      hu: 'Kimerülten érzem magam, mire a munkanapom véget ér.',
      en: 'I feel emotionally drained by the end of my workday.',
    },
    dimension: 'emotional',
  },
  {
    id: 2,
    text: {
      hu: 'Reggel már fáradtan kelek, amikor munkanapra kell felkelni.',
      en: 'I feel tired when I get up in the morning and have to face another day at work.',
    },
    dimension: 'emotional',
  },
  {
    id: 3,
    text: {
      hu: 'Érzem, hogy a végső határomon vagyok.',
      en: 'I feel I am at the end of my rope.',
    },
    dimension: 'emotional',
  },
  {
    id: 4,
    text: {
      hu: 'Munkám emocionálisan kimer.',
      en: 'Working with people all day is really a strain for me.',
    },
    dimension: 'emotional',
  },
  {
    id: 5,
    text: {
      hu: 'Frusztrált érzem magam a munkámtól.',
      en: 'I feel frustrated by my job.',
    },
    dimension: 'emotional',
  },
  {
    id: 6,
    text: {
      hu: 'Közvetlenül emberekkel dolgozni megterhelő számomra.',
      en: 'I feel I give more than I get back from my work.',
    },
    dimension: 'emotional',
  },

  // ─── MENTÁLIS DISTANCIA / DEPERSZONALIZÁCIÓ (4 kérdés) ───────────────────
  {
    id: 7,
    text: {
      hu: 'Azt érzem, hogy közömbössé váltam mások problémáival szemben.',
      en: 'I have become less interested in the problems of the people I work with.',
    },
    dimension: 'detachment',
  },
  {
    id: 8,
    text: {
      hu: 'Attól tartok, a munkám érzéketlenné tesz.',
      en: 'I worry that this job is hardening me emotionally.',
    },
    dimension: 'detachment',
  },
  {
    id: 9,
    text: {
      hu: 'Nem igazán érdekel, mi történik a kollégáimmal.',
      en: 'I don\'t really care what happens to some of the people I work with.',
    },
    dimension: 'detachment',
  },
  {
    id: 10,
    text: {
      hu: 'Cinikusabbá váltam, mióta itt dolgozom.',
      en: 'I have become more cynical about whether my work matters.',
    },
    dimension: 'detachment',
  },

  // ─── KOGNITÍV FUNKCIÓK (4 kérdés) ────────────────────────────────────────
  {
    id: 11,
    text: {
      hu: 'Nehezen koncentrálok munkavégzés közben.',
      en: 'I find it difficult to concentrate at work.',
    },
    dimension: 'cognitive',
  },
  {
    id: 12,
    text: {
      hu: 'Feladataim ellátása közben hibákat vetek, ami korábban nem volt jellemző rám.',
      en: 'I make more mistakes at work than I used to.',
    },
    dimension: 'cognitive',
  },
  {
    id: 13,
    text: {
      hu: 'Nehezen hozok döntéseket, ami korábban nem volt jellemző rám.',
      en: 'I find it harder to make decisions than I used to.',
    },
    dimension: 'cognitive',
  },
  {
    id: 14,
    text: {
      hu: 'Munkám közben nehezen tartom fenn a fókuszomat.',
      en: 'I struggle to maintain focus during work tasks.',
    },
    dimension: 'cognitive',
  },

  // ─── TELJESÍTMÉNYÉRZET (4 kérdés — reversed!) ────────────────────────────
  {
    id: 15,
    text: {
      hu: 'Hatékonyan megoldom a munkámban felmerülő problémákat.',
      en: 'I effectively deal with the problems that arise in my work.',
    },
    dimension: 'efficacy',
    reversed: true,
  },
  {
    id: 16,
    text: {
      hu: 'Pozitívan befolyásolom mások életét a munkámon keresztül.',
      en: 'I feel I am positively influencing other people\'s lives through my work.',
    },
    dimension: 'efficacy',
    reversed: true,
  },
  {
    id: 17,
    text: {
      hu: 'Könnyen megteremtem a nyugodt légkört a csapatommal.',
      en: 'I can easily create a relaxed atmosphere with the people I work with.',
    },
    dimension: 'efficacy',
    reversed: true,
  },
  {
    id: 18,
    text: {
      hu: 'Energikusnak érzem magam a munkámban.',
      en: 'I feel energized and accomplished when I finish work.',
    },
    dimension: 'efficacy',
    reversed: true,
  },

  // ─── SZOMATIKUS JELZÉSEK (4 kérdés) ──────────────────────────────────────
  {
    id: 19,
    text: {
      hu: 'Fejfájással, izomfeszüléssel ébredek.',
      en: 'I wake up with headaches or muscle tension.',
    },
    dimension: 'somatic',
  },
  {
    id: 20,
    text: {
      hu: 'Alvási problémáim vannak (nehezen alszom el vagy éjjel felébredek).',
      en: 'I have trouble sleeping (falling asleep or staying asleep).',
    },
    dimension: 'somatic',
  },
  {
    id: 21,
    text: {
      hu: 'Testi tüneteket (pl. hasi görcs, szívdobogás) tapasztalok munkával kapcsolatos stressz esetén.',
      en: 'I experience physical symptoms (e.g. stomach ache, palpitations) when stressed at work.',
    },
    dimension: 'somatic',
  },
  {
    id: 22,
    text: {
      hu: 'Az elmúlt időszakban betegséggel töltött napjaim száma nőtt.',
      en: 'The number of sick days I have taken has increased recently.',
    },
    dimension: 'somatic',
  },
];

export const DIMENSIONS: Record<
  BurnoutQuestion['dimension'],
  { label: { hu: string; en: string }; emoji: string; color: string }
> = {
  emotional: {
    label: { hu: 'Érzelmi Kimerültség', en: 'Emotional Exhaustion' },
    emoji: '💔',
    color: '#ef4444',
  },
  detachment: {
    label: { hu: 'Mentális Distancia', en: 'Mental Detachment' },
    emoji: '🌫️',
    color: '#8b5cf6',
  },
  cognitive: {
    label: { hu: 'Kognitív Terhelés', en: 'Cognitive Impairment' },
    emoji: '🧠',
    color: '#f97316',
  },
  efficacy: {
    label: { hu: 'Teljesítményérzet', en: 'Personal Efficacy' },
    emoji: '⚡',
    color: '#3b82f6',
  },
  somatic: {
    label: { hu: 'Testi Jelzések', en: 'Physical Signals' },
    emoji: '😴',
    color: '#10b981',
  },
};
