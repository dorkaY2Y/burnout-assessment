import { QUESTIONS } from '../data/questions';

export interface BurnoutResult {
  overall: number;       // 0-100 Y2Y Burnout Index
  physical: number;      // 0-100
  emotional: number;     // 0-100
  cognitive: number;     // 0-100
  team: number;          // 0-100
  profile: BurnoutProfile;
  riskLevel: RiskLevel;
}

export type RiskLevel = 'low' | 'moderate' | 'high' | 'crisis';

export type BurnoutProfile =
  | 'balanced'           // Alacsony mindenben — zöld zóna
  | 'at_risk'            // Enyhe jelzések — figyelj oda
  | 'exhausted'          // Fizikai + érzelmi domináns
  | 'detached'           // Kognitív távolságtartás + közöny
  | 'isolated_leader'    // Csapat/szervezet kapcsolat domináns
  | 'burned_out';        // Magas mindenben

export function calculateResults(answers: Record<number, number>): BurnoutResult {
  const dimScores: Record<string, number[]> = {
    physical: [], emotional: [], cognitive: [], team: []
  };

  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    if (raw === undefined) continue;
    // 1-5 → 0-100 (reversed: 5 = alacsony burnout → flip)
    const normalized = q.reversed ? (6 - raw - 1) * 25 : (raw - 1) * 25;
    dimScores[q.dimension].push(normalized);
  }

  const avg = (arr: number[]) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const physical = avg(dimScores.physical);
  const emotional = avg(dimScores.emotional);
  const cognitive = avg(dimScores.cognitive);
  const team = avg(dimScores.team);
  const overall = avg([physical, emotional, cognitive, team]);

  const riskLevel = getRiskLevel(overall);
  const profile = determineProfile(overall, physical, emotional, cognitive, team);

  return { overall, physical, emotional, cognitive, team, profile, riskLevel };
}

function getRiskLevel(overall: number): RiskLevel {
  if (overall < 30) return 'low';
  if (overall < 55) return 'moderate';
  if (overall < 75) return 'high';
  return 'crisis';
}

function determineProfile(
  overall: number,
  physical: number,
  emotional: number,
  cognitive: number,
  team: number
): BurnoutProfile {
  if (overall < 30) return 'balanced';
  if (overall < 45) return 'at_risk';

  // Domináns dimenzió alapján profil
  const max = Math.max(physical, emotional, cognitive, team);
  if (max === physical || max === emotional) {
    if (physical > 60 && emotional > 60) return 'exhausted';
  }
  if (max === cognitive && cognitive > 60) return 'detached';
  if (max === team && team > 60) return 'isolated_leader';

  // Ha minden magas
  if (overall >= 65) return 'burned_out';
  return 'exhausted';
}

export const RISK_INFO: Record<RiskLevel, { label: { hu: string; en: string; de: string }; color: string; emoji: string }> = {
  low: {
    emoji: '🟢',
    color: '#10b981',
    label: { hu: 'Kiegyensúlyozott', en: 'Balanced', de: 'Ausgeglichen' },
  },
  moderate: {
    emoji: '🟡',
    color: '#f59e0b',
    label: { hu: 'Figyelj oda magadra', en: 'Worth watching', de: 'Aufmerksamkeit erforderlich' },
  },
  high: {
    emoji: '🔴',
    color: '#ef4444',
    label: { hu: 'Aktív burnout-jelzések', en: 'Active burnout signals', de: 'Aktive Burnout-Signale' },
  },
  crisis: {
    emoji: '⚫',
    color: '#6b7280',
    label: { hu: 'Krízis — azonnal cselekedj', en: 'Crisis — act now', de: 'Krise — sofort handeln' },
  },
};

export const PROFILE_INFO: Record<
  BurnoutProfile,
  { title: { hu: string; en: string; de: string }; desc: { hu: string; en: string; de: string }; emoji: string }
> = {
  balanced: {
    emoji: '🌱',
    title: { hu: 'Kiegyensúlyozott', en: 'Balanced', de: 'Ausgeglichen' },
    desc: {
      hu: 'Alacsony burnout-kockázat. Tartsd fenn a jelenlegi egyensúlyt rendszeres önreflexióval!',
      en: 'Low burnout risk. Maintain your balance with regular self-reflection.',
      de: 'Geringes Burnout-Risiko. Halte dein aktuelles Gleichgewicht mit regelmäßiger Selbstreflexion aufrecht.',
    },
  },
  at_risk: {
    emoji: '⚠️',
    title: { hu: 'Figyelmeztető jelzések', en: 'Warning signs', de: 'Warnsignale' },
    desc: {
      hu: 'Enyhe jelzések több dimenzióban. Érdemes preventív lépéseket tenni, mielőtt fokozódnának.',
      en: 'Mild signals across dimensions. Worth taking preventive steps before they escalate.',
      de: 'Leichte Signale in mehreren Dimensionen. Es lohnt sich, präventive Schritte zu unternehmen.',
    },
  },
  exhausted: {
    emoji: '😴',
    title: { hu: 'Kimerült Vezető', en: 'Exhausted Leader', de: 'Erschöpfte Führungskraft' },
    desc: {
      hu: 'Fizikai és érzelmi kimerülés dominál. Prioritás: valódi pihenés, határok felállítása, regeneráció.',
      en: 'Physical and emotional exhaustion dominant. Priority: real rest, boundaries, recovery.',
      de: 'Körperliche und emotionale Erschöpfung dominiert. Priorität: echte Erholung, Grenzen setzen, Regeneration.',
    },
  },
  detached: {
    emoji: '🫧',
    title: { hu: 'Távolságtartó', en: 'Detached', de: 'Distanziert' },
    desc: {
      hu: 'Elidegenedés és értelemvesztés. A motiváció és a célok újrafelfedezése szükséges.',
      en: 'Alienation and loss of meaning. Rediscovering motivation and purpose is needed.',
      de: 'Entfremdung und Sinnverlust. Motivation und Ziele müssen neu entdeckt werden.',
    },
  },
  isolated_leader: {
    emoji: '🏝️',
    title: { hu: 'Elszigetelt Vezető', en: 'Isolated Leader', de: 'Isolierte Führungskraft' },
    desc: {
      hu: 'A vezetői szerep magányossá vált. Fontos a támogató hálózat és a szervezeti kapcsolatok erősítése.',
      en: 'Leadership has become isolating. Strengthening support networks and organizational bonds is key.',
      de: 'Die Führungsrolle ist isolierend geworden. Unterstützungsnetzwerke und organisationale Bindungen stärken.',
    },
  },
  burned_out: {
    emoji: '🔥',
    title: { hu: 'Kiégett', en: 'Burned Out', de: 'Ausgebrannt' },
    desc: {
      hu: 'Minden dimenzióban magas értékek. Azonnali beavatkozás szükséges — kérj szakmai segítséget.',
      en: 'High scores across all dimensions. Immediate intervention needed — seek professional help.',
      de: 'Hohe Werte in allen Dimensionen. Sofortiger Eingriff erforderlich — professionelle Hilfe suchen.',
    },
  },
};
