const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const sesClient = new SESClient({
  region: process.env.SES_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET_KEY,
  },
});

const getDimInsight = (dimension, score, lang) => {
  const isHu = lang === 'hu';
  const level = score < 30 ? 'low' : score < 55 ? 'moderate' : score < 75 ? 'high' : 'crisis';

  const insights = {
    physical: {
      low: {
        hu: { summary: 'Fizikai energiád egyensúlyban van — ez a jó regeneráció jele.', advice: 'Tartsd fenn a jelenlegi alvás- és mozgásrutint. Megelőzés a legjobb stratégia.' },
        en: { summary: 'Your physical energy is balanced — a sign of good recovery.', advice: 'Keep your current sleep and movement routine. Prevention is the best strategy.' },
      },
      moderate: {
        hu: { summary: 'Időnként fizikailag is érzed a terhelést — ez figyelmeztető jel.', advice: 'Vizsgáld meg az alvásminőségedet és a napi mozgást. Kis változtatások nagy hatást hozhatnak.' },
        en: { summary: 'You occasionally feel physical strain — this is a warning sign.', advice: 'Look at your sleep quality and daily movement. Small changes can have big impact.' },
      },
      high: {
        hu: { summary: 'Komoly fizikai kimerülés jelei mutatkoznak. A tested küld üzenetet.', advice: 'A regeneráció most prioritás — nem luxus. Orvosi kivizsgálás és rendszeres pihenő beiktatása szükséges.' },
        en: { summary: 'Significant signs of physical exhaustion. Your body is sending a message.', advice: 'Recovery is a priority now — not a luxury. Medical check-up and scheduled rest are essential.' },
      },
      crisis: {
        hu: { summary: 'Fizikai összeomlás közelében vagy. Ez orvosi és nem csak coaching kérdés.', advice: 'Kérjük, azonnal fordulj orvoshoz. A munka bármikor megvárhat — a tested nem.' },
        en: { summary: 'You are close to physical collapse. This is a medical, not just a coaching issue.', advice: 'Please see a doctor immediately. Work can always wait — your body cannot.' },
      },
    },
    emotional: {
      low: {
        hu: { summary: 'Érzelmileg stabilan és rugalmasan kezeled a munkahelyi kihívásokat.', advice: 'Tartsd fenn az érzelmi hygiene szokásokat — önreflexió, kapcsolatok ápolása.' },
        en: { summary: 'You handle workplace challenges with emotional stability and resilience.', advice: 'Keep your emotional hygiene habits — self-reflection, nurturing relationships.' },
      },
      moderate: {
        hu: { summary: 'Érzelmi terhelés van jelen — a frusztráció és feszültség összegyűlhet.', advice: 'Határok felállítása és relaxációs technikák (pl. mindfulness, légzőgyakorlatok) segíthetnek.' },
        en: { summary: 'Emotional load is present — frustration and tension can accumulate.', advice: 'Setting boundaries and relaxation techniques (e.g. mindfulness, breathing exercises) can help.' },
      },
      high: {
        hu: { summary: 'Érzelmileg kimerült vagy. A "bírom még egy kicsit" stratégia itt nem működik.', advice: 'Coaching vagy pszichológus segíthet feldolgozni. Keress legalább egy megbízható személyt, akivel valóban beszélhetsz.' },
        en: { summary: 'You are emotionally exhausted. The "I can push through" strategy doesn\'t work here.', advice: 'Coaching or a psychologist can help. Find at least one trusted person you can truly talk to.' },
      },
      crisis: {
        hu: { summary: 'Érzelmi krízis jelzések. Ez sürgős — ne várj.', advice: 'Azonnal kérj szakmai segítséget: pszichológus, pszichiáter vagy krízisszolgálat.' },
        en: { summary: 'Emotional crisis signals. This is urgent — do not wait.', advice: 'Seek professional help immediately: psychologist, psychiatrist, or crisis service.' },
      },
    },
    cognitive: {
      low: {
        hu: { summary: 'Bevonódva és motiváltan állsz a munkádhoz — a célok és értelem jelen vannak.', advice: 'Ápold a céltudatosságot. Rendszeres reflexió a "miért" kérdésre megőrzi ezt az állapotot.' },
        en: { summary: 'You are engaged and motivated in your work — purpose and meaning are present.', advice: 'Nurture your sense of purpose. Regular reflection on the "why" preserves this state.' },
      },
      moderate: {
        hu: { summary: 'Enyhe távolságtartás és cinizmus érezhető — a motiváció csúszik.', advice: 'Érdemes a munka értelmét és személyes céljaidat újragondolni. Egy coaching-konzultáció sokat segíthet.' },
        en: { summary: 'Mild detachment and cynicism are present — motivation is slipping.', advice: 'It\'s worth rethinking the meaning of your work and personal goals. A coaching consultation can help a lot.' },
      },
      high: {
        hu: { summary: 'Elidegenedtél a munkádtól. A "mit csinálok itt egyáltalán" érzés dominál.', advice: 'Értékalapú coaching segíthet visszatalálni. Ez nem gyengeség — ez bátorság.' },
        en: { summary: 'You have become detached from your work. "What am I even doing here" feeling dominates.', advice: 'Values-based coaching can help you find your way back. This is not weakness — it\'s courage.' },
      },
      crisis: {
        hu: { summary: 'Mély cinizmus és értelmetlen-érzés. Ez a kiégés legmélyebb rétege.', advice: 'Szakmai segítség és karrierváltás gondolata is felmerülhet — mindkettő legitim. Ne csináld ezt egyedül.' },
        en: { summary: 'Deep cynicism and meaninglessness. This is the deepest layer of burnout.', advice: 'Professional help and even career change may be on the table — both are legitimate. Don\'t do this alone.' },
      },
    },
    team: {
      low: {
        hu: { summary: 'Jól érzed magad a csapatodban és a szervezetedben — ez értékes tőke.', advice: 'Ápold a kapcsolatokat és add tovább a biztonságos légkört. Mások számára is modell vagy.' },
        en: { summary: 'You feel good within your team and organization — this is valuable capital.', advice: 'Nurture relationships and pass on the safe atmosphere. You are also a model for others.' },
      },
      moderate: {
        hu: { summary: 'Némi feszültség érezhető a csapatkapcsolataidban vagy a szervezet iránti bizalomban.', advice: 'Nyílt kommunikáció és elvárások tisztázása segíthet. Kinek szólhatsz bizalmasan a szervezetben?' },
        en: { summary: 'Some tension is felt in your team relationships or trust in the organization.', advice: 'Open communication and clarifying expectations can help. Who can you speak to confidentially in the organization?' },
      },
      high: {
        hu: { summary: 'Komoly elszigeteltséget érzel vezetőként — a döntések súlya egyedül nehezedik rád.', advice: 'Leadership coaching és peer-to-peer közösség (más vezetők) sokat segíthet. A magány nem a vezető természetes állapota.' },
        en: { summary: 'You feel significantly isolated as a leader — the weight of decisions falls on you alone.', advice: 'Leadership coaching and peer communities (other leaders) can help greatly. Loneliness is not a leader\'s natural state.' },
      },
      crisis: {
        hu: { summary: 'Teljes elszigeteltség a szervezettől. Ez fenntarthatatlan.', advice: 'Azonnali változás szükséges — akár a szerep, a szervezet vagy a támogató struktúra tekintetében.' },
        en: { summary: 'Complete disconnection from the organization. This is unsustainable.', advice: 'Immediate change is needed — whether in the role, the organization, or the support structure.' },
      },
    },
  };

  const dimData = insights[dimension]?.[level];
  if (!dimData) return null;
  return isHu ? dimData.hu : dimData.en;
};

const RISK_LABELS = {
  low:      { hu: 'KIEGYENSÚLYOZOTT',   en: 'BALANCED',               de: 'AUSGEGLICHEN' },
  moderate: { hu: 'FIGYELJ ODA',        en: 'WORTH WATCHING',         de: 'AUFMERKSAMKEIT' },
  high:     { hu: 'AKTÍV JELZÉSEK',     en: 'ACTIVE SIGNALS',         de: 'AKTIVE SIGNALE' },
  crisis:   { hu: 'KRÍZIS',             en: 'CRISIS',                 de: 'KRISE' },
};

const getRiskMeta = (riskLevel, language = 'hu') => {
  const labels = RISK_LABELS[riskLevel] || RISK_LABELS.moderate;
  const label = labels[language] || labels.en;
  switch (riskLevel) {
    case 'low':      return { color: '#10B981', label, bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)' };
    case 'moderate': return { color: '#F59E0B', label, bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' };
    case 'high':     return { color: '#EF4444', label, bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)' };
    case 'crisis':   return { color: '#6B7280', label, bg: 'rgba(107,114,128,0.12)',border: 'rgba(107,114,128,0.3)' };
    default:         return { color: '#F59E0B', label, bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' };
  }
};

const generateEmailHTML = ({ profileTitle, profileDesc, profileEmoji, overall, riskLevel, dimensions, language }) => {
  const meta = getRiskMeta(riskLevel, language);
  const pct = Math.round(overall);
  const isHu = language === 'hu';
  const isDe = language === 'de';

  const dimCards = (dimensions || []).map((d) => {
    const dimPct = Math.round(d.score);
    const insight = getDimInsight(d.id, d.score, language);
    return `
    <div style="background:#ffffff;border-radius:14px;margin-bottom:10px;overflow:hidden;border-left:4px solid ${d.color};box-shadow:0 1px 4px rgba(0,0,0,0.06);">
      <div style="padding:18px 22px 14px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td style="vertical-align:top;">
              <div style="font-size:15px;font-weight:700;color:#0f172a;line-height:1.3;">${d.emoji} ${d.name}</div>
            </td>
            <td style="text-align:right;vertical-align:top;white-space:nowrap;">
              <span style="font-size:30px;font-weight:800;color:${d.color};letter-spacing:-1px;line-height:1;">${dimPct}</span><span style="font-size:13px;color:#94a3b8;font-weight:400;">%</span>
            </td>
          </tr>
        </table>
        <div style="background:#f1f5f9;border-radius:3px;height:5px;margin-top:13px;overflow:hidden;">
          <div style="background:${d.color};height:5px;width:${dimPct}%;border-radius:3px;"></div>
        </div>
      </div>
      ${insight ? `
      <div style="padding:0 22px 18px 20px;border-top:1px solid #f8fafc;">
        <p style="font-size:13px;color:#475569;line-height:1.75;margin:14px 0 10px;">${insight.summary}</p>
        <div style="background:#f8fafc;border-radius:8px;padding:11px 14px;">
          <div style="font-size:10px;font-weight:700;color:#64748b;letter-spacing:0.8px;text-transform:uppercase;margin-bottom:4px;">
            ${isHu ? '💡 Javaslat' : isDe ? '💡 Empfehlung' : '💡 Recommendation'}
          </div>
          <div style="font-size:12.5px;color:#334155;line-height:1.65;">${insight.advice}</div>
        </div>
      </div>` : ''}
    </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Y2Y Burnout Compass — ${isHu ? 'Eredményed' : isDe ? 'Deine Ergebnisse' : 'Your Results'}</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

<div style="max-width:600px;margin:0 auto;padding:28px 16px 40px;">

  <!-- HERO -->
  <div style="background:linear-gradient(160deg,#080e1a 0%,#0d1525 55%,#111e35 100%);border-radius:20px;padding:44px 36px 40px;text-align:center;margin-bottom:10px;">

    <div style="display:inline-block;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.35);border-radius:20px;padding:5px 18px;margin-bottom:30px;">
      <span style="color:#ef4444;font-size:10px;letter-spacing:2.5px;font-weight:700;text-transform:uppercase;">Y2Y&nbsp;&nbsp;·&nbsp;&nbsp;Burnout Compass</span>
    </div>

    <div style="margin-bottom:6px;">
      <span style="font-size:88px;font-weight:900;color:${meta.color};letter-spacing:-4px;line-height:1;">${pct}</span>
      <span style="font-size:22px;color:#475569;font-weight:400;vertical-align:bottom;padding-bottom:10px;display:inline-block;">%</span>
    </div>

    <div style="display:inline-block;background:${meta.bg};border:1px solid ${meta.border};border-radius:6px;padding:5px 18px;margin-bottom:22px;">
      <span style="color:${meta.color};font-size:11px;letter-spacing:2.5px;font-weight:800;">${meta.label}</span>
    </div>

    <div style="background:rgba(255,255,255,0.08);border-radius:4px;height:7px;max-width:300px;margin:0 auto 28px;overflow:hidden;">
      <div style="background:${meta.color};height:7px;width:${pct}%;border-radius:4px;"></div>
    </div>

    <div style="color:#e2e8f0;font-size:18px;font-weight:700;letter-spacing:-0.3px;margin-bottom:4px;">Y2Y Burnout Index</div>
    <div style="color:#4a5568;font-size:12px;letter-spacing:0.4px;">${isHu ? 'Személyes kiégés-felmérésed eredménye' : isDe ? 'Deine persönlichen Burnout-Ergebnisse' : 'Your personal burnout assessment results'}</div>
  </div>

  <!-- PROFILE -->
  <div style="background:#ffffff;border-radius:14px;padding:22px 26px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.07);">
    <div style="font-size:19px;font-weight:800;color:#0f172a;margin-bottom:8px;">${profileEmoji} ${profileTitle}</div>
    <div style="font-size:13.5px;color:#475569;line-height:1.75;">${profileDesc}</div>
  </div>

  <!-- SECTION LABEL -->
  <div style="padding:18px 4px 10px;">
    <span style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;">${isHu ? 'Dimenziónkénti bontás' : isDe ? 'Dimensionsaufschlüsselung' : 'Dimension Breakdown'}</span>
  </div>

  <!-- DIMENSION CARDS -->
  ${dimCards}

  <!-- CTA -->
  <div style="background:#080e1a;border:1px solid rgba(239,68,68,0.2);border-radius:16px;padding:30px 30px;margin-top:4px;margin-bottom:10px;text-align:center;">
    <div style="font-size:11px;font-weight:700;color:#ef4444;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:12px;">Y2Y Leadership Coaching</div>
    <div style="font-size:20px;font-weight:800;color:#f8fafc;margin-bottom:10px;line-height:1.3;">
      ${isHu ? 'Készen állsz a következő lépésre?' : isDe ? 'Bereit für den nächsten Schritt?' : 'Ready to take the next step?'}
    </div>
    <div style="font-size:13px;color:#94a3b8;line-height:1.8;margin-bottom:20px;max-width:400px;margin-left:auto;margin-right:auto;">
      ${isHu
        ? 'Az Y2Y egyéni coaching programjai 13 nyelven elérhetők, kifejezetten vezetők számára. Nem terápia — hanem strukturált fejlődési folyamat, ami megmutatja a kiutat.'
        : isDe
        ? 'Y2Y individuelle Coaching-Programme sind in 13 Sprachen verfügbar, speziell für Führungskräfte. Kein Therapieangebot — sondern ein strukturierter Entwicklungsprozess, der den Weg nach vorne aufzeigt.'
        : 'Y2Y individual coaching programs are available in 13 languages, designed specifically for leaders. Not therapy — but a structured development process that shows the way forward.'
      }
    </div>
    <a href="https://y2y.hu/coaching" style="display:inline-block;background:#ef4444;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">
      ${isHu ? 'Egyéni coaching konzultáció →' : isDe ? 'Individuelle Coaching-Beratung →' : 'Individual coaching consultation →'}
    </a>
    <div style="margin-top:14px;font-size:11px;color:#475569;">
      ${isHu ? '🌍 Magyar · English · Deutsch · és még 10 nyelv' : isDe ? '🌍 Deutsch · Magyar · English · und 10 weitere Sprachen' : '🌍 English · Magyar · Deutsch · and 10 more languages'}
    </div>
  </div>

  <!-- FOOTER -->
  <div style="text-align:center;padding:20px 16px 8px;">
    <div style="font-size:12px;font-weight:700;color:#64748b;margin-bottom:5px;letter-spacing:0.3px;">Y2Y – Leadership Development</div>
    <div style="font-size:12px;color:#94a3b8;">
      ${isHu ? 'Kérdésed van?' : isDe ? 'Fragen?' : 'Questions?'}&nbsp;<a href="mailto:dorka@y2y.hu" style="color:#ef4444;text-decoration:none;font-weight:600;">dorka@y2y.hu</a>
    </div>
    <div style="margin-top:16px;font-size:11px;color:#cbd5e1;line-height:1.6;">
      ${isHu
        ? 'Ezt az emailt azért kaptad, mert kitöltötted<br>a Y2Y Burnout Compass felmérést.'
        : isDe
        ? 'Du hast diese E-Mail erhalten, weil du<br>das Y2Y Burnout Compass ausgefüllt hast.'
        : 'You received this email because you completed<br>the Y2Y Burnout Compass assessment.'
      }
    </div>
  </div>

</div>
</body>
</html>`;
};

const generateNotificationHTML = ({ to, profileTitle, overall, riskLevel, dimensions }) => {
  const meta = getRiskMeta(riskLevel);
  const dimRows = (dimensions || []).map((d) =>
    `<tr>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#1e293b;font-weight:600;">${d.emoji} ${d.name}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#475569;text-align:right;">
        <span style="font-weight:700;color:#0f172a;">${Math.round(d.score)}%</span>
      </td>
    </tr>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:520px;margin:0 auto;padding:28px 16px;">

  <div style="background:#080e1a;border-radius:14px;padding:24px 28px;margin-bottom:12px;">
    <div style="font-size:10px;letter-spacing:2px;font-weight:700;color:#ef4444;text-transform:uppercase;margin-bottom:10px;">Burnout Compass · Új kitöltés</div>
    <div style="font-size:28px;font-weight:900;color:${meta.color};letter-spacing:-1px;margin-bottom:2px;">${Math.round(overall)}<span style="font-size:14px;color:#475569;font-weight:400;">%</span></div>
    <div style="font-size:10px;font-weight:700;color:${meta.color};letter-spacing:2px;">${meta.label}</div>
  </div>

  <div style="background:#ffffff;border-radius:14px;padding:20px 24px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding:8px 0;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;border-bottom:1px solid #f1f5f9;">Email</td>
        <td style="padding:8px 0;font-size:13px;color:#0f172a;font-weight:700;text-align:right;border-bottom:1px solid #f1f5f9;">${to}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;border-bottom:1px solid #f1f5f9;">Profil</td>
        <td style="padding:8px 0;font-size:13px;color:#0f172a;font-weight:700;text-align:right;border-bottom:1px solid #f1f5f9;">${profileTitle || '—'}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">Időpont</td>
        <td style="padding:8px 0;font-size:13px;color:#0f172a;font-weight:700;text-align:right;">${new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' })}</td>
      </tr>
    </table>
  </div>

  <div style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${dimRows}
    </table>
  </div>

</div>
</body>
</html>`;
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  const { to, language, profileTitle, profileDesc, profileEmoji, overall, riskLevel, dimensions } = payload;

  if (!to || !to.includes('@')) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing or invalid email address' }),
    };
  }

  const isHu = language === 'hu';
  const isDe = language === 'de';
  const subject = isHu
    ? 'Y2Y Burnout Compass — Az eredményed'
    : isDe
    ? 'Y2Y Burnout Compass — Deine Ergebnisse'
    : 'Y2Y Burnout Compass — Your Results';

  const htmlContent = generateEmailHTML({ profileTitle, profileDesc, profileEmoji, overall, riskLevel, dimensions, language });

  // Send result email to user
  try {
    await sesClient.send(new SendEmailCommand({
      Source: 'Y2Y Burnout Compass <dorka@y2y.hu>',
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: ['dorka@y2y.hu'],
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body:    { Html: { Data: htmlContent, Charset: 'UTF-8' } },
      },
    }));
  } catch (err) {
    console.error('SES send error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to send email', detail: err.message }),
    };
  }

  // Notification to dorka (best-effort)
  try {
    await sesClient.send(new SendEmailCommand({
      Source: 'Y2Y Burnout Compass <dorka@y2y.hu>',
      Destination: { ToAddresses: ['dorka@y2y.hu'] },
      Message: {
        Subject: { Data: `Új Burnout Compass kitöltés: ${to}`, Charset: 'UTF-8' },
        Body:    { Html: { Data: generateNotificationHTML({ to, profileTitle, overall, riskLevel, dimensions }), Charset: 'UTF-8' } },
      },
    }));
  } catch (err) {
    console.error('Notification email error (non-fatal):', err);
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true }),
  };
};
