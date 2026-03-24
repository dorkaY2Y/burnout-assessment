import { QUESTIONS } from '../data/questions';

export interface BurnoutResult {
  overall: number;       // 0-100 (magasabb = nagyobb burnout kockázat)
  emotional: number;
  detachment: number;
  cognitive: number;
  efficacy: number;      // reversed: magasabb = alacsonyabb hatékonyság (=nagyobb burnout)
  somatic: number;
  profile: BurnoutProfile;
  riskLevel: RiskLevel;
}

export type RiskLevel = 'low' | 'moderate' | 'high' | 'crisis';

export type BurnoutProfile =
  | 'balanced'           // Alacsony mindenben
  | 'at_risk'            // Enyhe jelzések
  | 'exhausted'          // Fizikai + érzelmi domináns
  | 'detached'           // Mentális distancia + cinizmus
  | 'lost_leader'        // Hatékonyság + értelem hiány
  | 'burned_hero';       // Magas teljesítmény + alacsony jutalom (legveszélyesebb)

export function calculateResults(answers: Record<number, number>): BurnoutResult {
  const dimScores: Record<string, number[]> = {
    emotional: [], detachment: [], cognitive: [], efficacy: [], somatic: []
  };

  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    if (raw === undefined) continue;
    // 1-5 → 0-100 (reversed: 5=low burnout → flip)
    const normalized = q.reversed ? (6 - raw - 1) * 25 : (raw - 1) * 25;
    dimScores[q.dimension].push(normalized);
  }

  const avg = (arr: number[]) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const emotional = avg(dimScores.emotional);
  const detachment = avg(dimScores.detachment);
  const cognitive = avg(dimScores.cognitive);
  const efficacy = avg(dimScores.efficacy);
  const somatic = avg(dimScores.somatic);
  const overall = avg([emotional, detachment, cognitive, efficacy, somatic]);

  const riskLevel = getRiskLevel(overall);
  const profile = determineProfile(overall, emotional, detachment, cognitive, efficacy, somatic);

  return { overall, emotional, detachment, cognitive, efficacy, somatic, profile, riskLevel };
}

function getRiskLevel(overall: number): RiskLevel {
  if (overall < 30) return 'low';
  if (overall < 55) return 'moderate';
  if (overall < 75) return 'high';
  return 'crisis';
}

function determineProfile(
  overall: number,
  emotional: number,
  detachment: number,
  cognitive: number,
  efficacy: number,
  somatic: number
): BurnoutProfile {
  if (overall < 30) return 'balanced';
  if (overall < 45) return 'at_risk';
  if (somatic > 65 && emotional > 65) return 'exhausted';
  if (detachment > 65 && cognitive > 55) return 'detached';
  if (efficacy > 65 && overall > 55) return 'lost_leader';
  return 'burned_hero';
}

export const RISK_INFO: Record<RiskLevel, { label: { hu: string; en: string }; color: string; emoji: string }> = {
  low: {
    emoji: '🟢',
    color: '#10b981',
    label: { hu: 'Kiegyensúlyozott', en: 'Balanced' },
  },
  moderate: {
    emoji: '🟡',
    color: '#f59e0b',
    label: { hu: 'Figyelj oda magadra', en: 'Worth watching' },
  },
  high: {
    emoji: '🔴',
    color: '#ef4444',
    label: { hu: 'Aktív burnout jelzések', en: 'Active burnout signals' },
  },
  crisis: {
    emoji: '⚫',
    color: '#6b7280',
    label: { hu: 'Krízis — azonnal cselekedj', en: 'Crisis — act now' },
  },
};

export const PROFILE_INFO: Record<
  BurnoutProfile,
  { title: { hu: string; en: string }; desc: { hu: string; en: string }; emoji: string }
> = {
  balanced: {
    emoji: '🌱',
    title: { hu: 'Kiegyensúlyozott', en: 'Balanced' },
    desc: {
      hu: 'Alacsony burnout kockázat. Tarts fenn rendszeres önreflexiót és preventív szokásokat!',
      en: 'Low burnout risk. Keep up regular self-reflection and preventive habits.',
    },
  },
  at_risk: {
    emoji: '⚠️',
    title: { hu: 'Figyelj oda magadra', en: 'Watch yourself' },
    desc: {
      hu: 'Enyhe jelzések több dimenzióban. Érdemes preventív lépéseket tenni, mielőtt fokozódnak.',
      en: 'Mild signals across dimensions. Worth taking preventive steps before they escalate.',
    },
  },
  exhausted: {
    emoji: '😴',
    title: { hu: 'Kimerült Szervező', en: 'Exhausted Organizer' },
    desc: {
      hu: 'Fizikai és érzelmi kimerülés dominál. Prioritás: valódi pihenés, határok és regeneráció.',
      en: 'Physical and emotional exhaustion dominant. Priority: real rest, boundaries, and recovery.',
    },
  },
  detached: {
    emoji: '🫧',
    title: { hu: 'Elszigetelt Szakértő', en: 'Detached Expert' },
    desc: {
      hu: 'Mentális distancia és cinizmus. Emberi kapcsolatokra és értelemre van szükséged.',
      en: 'Mental detachment and cynicism. You need human connection and renewed sense of meaning.',
    },
  },
  lost_leader: {
    emoji: '🌫️',
    title: { hu: 'Elveszett Vezető', en: 'Lost Leader' },
    desc: {
      hu: 'Hatékonyság és értelem hiánya. Célok és értékek újradefinálása szükséges.',
      en: 'Loss of efficacy and meaning. Goals and values need redefining.',
    },
  },
  burned_hero: {
    emoji: '🔥',
    title: { hu: 'Kiégett Hős', en: 'Burned-out Hero' },
    desc: {
      hu: 'Magas teljesítmény, alacsony jutalom. A legveszélyesebb minta — azonnal cselekedj.',
      en: 'High performance, low reward. The most dangerous pattern — act immediately.',
    },
  },
};
