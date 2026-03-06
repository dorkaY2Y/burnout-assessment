const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const sesClient = new SESClient({
  region: process.env.SES_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET_KEY,
  },
});

const getScoreMeta = (score) => {
  if (score >= 4.2) return { color: '#10B981', label: 'KIEMELKEDŐ', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' };
  if (score >= 3.4) return { color: '#DED114', label: 'FEJLŐDŐ',    bg: 'rgba(222,209,20,0.12)',  border: 'rgba(222,209,20,0.3)' };
  if (score >= 2.6) return { color: '#F59E0B', label: 'ALAPOZÓ',    bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)' };
  return               { color: '#EF4444', label: 'KEZDŐ',      bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)'  };
};

const generateEmailHTML = ({ profileName, profileDescription, overallScore, dimensions }) => {
  const meta = getScoreMeta(overallScore);
  const pct  = Math.round((overallScore / 5) * 100);

  const dimCards = (dimensions || []).map((d) => {
    const dimPct  = Math.round((d.score / 5) * 100);
    const color   = d.color || '#2D5BFF';
    const report  = d.report || {};
    const hasBody = report.summary || report.strengths || report.advice || report.practice;

    return `
    <div style="background:#ffffff;border-radius:14px;margin-bottom:10px;overflow:hidden;border-left:4px solid ${color};box-shadow:0 1px 4px rgba(0,0,0,0.06);">

      <!-- Dimension top row -->
      <div style="padding:18px 22px 14px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td style="vertical-align:top;">
              <div style="font-size:15px;font-weight:700;color:#0f172a;line-height:1.3;">${d.name || d.dimensionId}</div>
              ${d.level ? `<div style="display:inline-block;margin-top:5px;background:${color}1a;border:1px solid ${color}44;border-radius:4px;padding:2px 9px;font-size:10px;font-weight:700;color:${color};letter-spacing:0.8px;text-transform:uppercase;">${d.level}</div>` : ''}
            </td>
            <td style="text-align:right;vertical-align:top;white-space:nowrap;">
              <span style="font-size:30px;font-weight:800;color:#0f172a;letter-spacing:-1px;line-height:1;">${Number(d.score).toFixed(1)}</span><span style="font-size:13px;color:#94a3b8;font-weight:400;">&thinsp;/5</span>
            </td>
          </tr>
        </table>
        <div style="background:#f1f5f9;border-radius:3px;height:5px;margin-top:13px;overflow:hidden;">
          <div style="background:${color};height:5px;width:${dimPct}%;border-radius:3px;"></div>
        </div>
      </div>

      <!-- Dimension body -->
      ${hasBody ? `
      <div style="padding:0 22px 18px 20px;border-top:1px solid #f1f5f9;">
        ${report.summary ? `<p style="font-size:13px;color:#475569;line-height:1.75;margin:14px 0 10px;">${report.summary}</p>` : ''}
        ${report.strengths ? `
        <div style="background:#f0fdf4;border-radius:8px;padding:11px 14px;margin-bottom:8px;">
          <div style="font-size:10px;font-weight:700;color:#15803d;letter-spacing:0.8px;text-transform:uppercase;margin-bottom:4px;">✅ Erősségeid</div>
          <div style="font-size:12.5px;color:#166534;line-height:1.65;">${report.strengths}</div>
        </div>` : ''}
        ${report.advice ? `
        <div style="background:#eff6ff;border-radius:8px;padding:11px 14px;margin-bottom:8px;">
          <div style="font-size:10px;font-weight:700;color:#1d4ed8;letter-spacing:0.8px;text-transform:uppercase;margin-bottom:4px;">💡 Fejlesztési javaslat</div>
          <div style="font-size:12.5px;color:#1e40af;line-height:1.65;">${report.advice}</div>
        </div>` : ''}
        ${report.practice ? `
        <div style="background:#fefce8;border-radius:8px;padding:11px 14px;">
          <div style="font-size:10px;font-weight:700;color:#92400e;letter-spacing:0.8px;text-transform:uppercase;margin-bottom:4px;">🎯 Gyakorlat</div>
          <div style="font-size:12.5px;color:#78350f;line-height:1.65;">${report.practice}</div>
        </div>` : ''}
      </div>` : ''}

    </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ground by Y2Y – Személyes Vezetői Riportod</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

<div style="max-width:600px;margin:0 auto;padding:28px 16px 40px;">

  <!-- ═══ HERO ═══ -->
  <div style="background:linear-gradient(160deg,#080e1a 0%,#0d1525 55%,#111e35 100%);border-radius:20px;padding:44px 36px 40px;text-align:center;margin-bottom:10px;">

    <!-- Logo pill -->
    <div style="display:inline-block;background:rgba(222,209,20,0.1);border:1px solid rgba(222,209,20,0.35);border-radius:20px;padding:5px 18px;margin-bottom:30px;">
      <span style="color:#DED114;font-size:10px;letter-spacing:2.5px;font-weight:700;text-transform:uppercase;">Ground&nbsp;&nbsp;·&nbsp;&nbsp;by Y2Y</span>
    </div>

    <!-- Big score -->
    <div style="margin-bottom:6px;">
      <span style="font-size:88px;font-weight:900;color:${meta.color};letter-spacing:-4px;line-height:1;">${Number(overallScore).toFixed(1)}</span>
      <span style="font-size:22px;color:#475569;font-weight:400;vertical-align:bottom;padding-bottom:10px;display:inline-block;">&thinsp;/&thinsp;5</span>
    </div>

    <!-- Score badge -->
    <div style="display:inline-block;background:${meta.bg};border:1px solid ${meta.border};border-radius:6px;padding:5px 18px;margin-bottom:22px;">
      <span style="color:${meta.color};font-size:11px;letter-spacing:2.5px;font-weight:800;">${meta.label}</span>
    </div>

    <!-- Progress bar -->
    <div style="background:rgba(255,255,255,0.08);border-radius:4px;height:7px;max-width:300px;margin:0 auto 28px;overflow:hidden;">
      <div style="background:${meta.color};height:7px;width:${pct}%;border-radius:4px;"></div>
    </div>

    <!-- Titles -->
    <div style="color:#e2e8f0;font-size:18px;font-weight:700;letter-spacing:-0.3px;margin-bottom:4px;">Leadership Readiness Index</div>
    <div style="color:#4a5568;font-size:12px;letter-spacing:0.4px;">Személyes vezetői fejlődési riportod</div>
  </div>

  <!-- ═══ PROFILE CARD ═══ -->
  ${profileName || profileDescription ? `
  <div style="background:#ffffff;border-radius:14px;padding:22px 26px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.07);">
    ${profileName ? `<div style="font-size:19px;font-weight:800;color:#0f172a;margin-bottom:${profileDescription ? '8px' : '0'};">${profileName}</div>` : ''}
    ${profileDescription ? `<div style="font-size:13.5px;color:#475569;line-height:1.75;">${profileDescription}</div>` : ''}
  </div>` : ''}

  <!-- ═══ SECTION LABEL ═══ -->
  <div style="padding:18px 4px 10px;">
    <span style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;">Dimenziónkénti részletes riport</span>
  </div>

  <!-- ═══ DIMENSION CARDS ═══ -->
  ${dimCards}

  <!-- ═══ CTA ═══ -->
  <div style="background:#080e1a;border:1px solid rgba(222,209,20,0.2);border-radius:16px;padding:26px 30px;margin-top:4px;margin-bottom:10px;">
    <div style="font-size:15px;font-weight:700;color:#f8fafc;margin-bottom:8px;">📈 Mi a következő lépés?</div>
    <div style="font-size:13px;color:#718096;line-height:1.75;">
      Azonosítsd azt az <strong style="color:#DED114;font-weight:700;">egy dimenziót</strong>, amelyen a leginkább szeretnél fejlődni, és 90 napon át fókuszáltan dolgozz rajta. A kis, következetes lépések exponenciális fejlődést hoznak.
    </div>
  </div>

  <!-- ═══ FOOTER ═══ -->
  <div style="text-align:center;padding:20px 16px 8px;">
    <div style="font-size:12px;font-weight:700;color:#64748b;margin-bottom:5px;letter-spacing:0.3px;">Y2Y – Leadership Development</div>
    <div style="font-size:12px;color:#94a3b8;">
      Kérdésed van?&nbsp;<a href="mailto:dorka@y2y.hu" style="color:#DED114;text-decoration:none;font-weight:600;">dorka@y2y.hu</a>
    </div>
    <div style="margin-top:16px;font-size:11px;color:#cbd5e1;line-height:1.6;">
      Ezt az emailt azért kaptad, mert kitöltötted<br>a Ground by Y2Y Leadership Readiness Index felmérést.
    </div>
  </div>

</div>
</body>
</html>`;
};

const generateNotificationHTML = ({ to, profileName, overallScore, dimensions }) => {
  const meta   = getScoreMeta(overallScore);
  const dimRows = (dimensions || []).map((d) =>
    `<tr>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#1e293b;font-weight:600;">${d.name || d.dimensionId}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#475569;text-align:right;">
        <span style="font-weight:700;color:#0f172a;">${Number(d.score).toFixed(1)}/5</span>
        ${d.level ? `&nbsp;<span style="background:${d.color || '#2D5BFF'}1a;color:${d.color || '#2D5BFF'};border-radius:4px;padding:2px 8px;font-size:11px;font-weight:700;">${d.level}</span>` : ''}
      </td>
    </tr>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:520px;margin:0 auto;padding:28px 16px;">

  <div style="background:#080e1a;border-radius:14px;padding:24px 28px;margin-bottom:12px;">
    <div style="font-size:10px;letter-spacing:2px;font-weight:700;color:#DED114;text-transform:uppercase;margin-bottom:10px;">Ground by Y2Y · Új kitöltés</div>
    <div style="font-size:28px;font-weight:900;color:${meta.color};letter-spacing:-1px;margin-bottom:2px;">${Number(overallScore).toFixed(1)}<span style="font-size:14px;color:#475569;font-weight:400;">&thinsp;/5</span></div>
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
        <td style="padding:8px 0;font-size:13px;color:#0f172a;font-weight:700;text-align:right;border-bottom:1px solid #f1f5f9;">${profileName || '—'}</td>
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

  const { to, subject, profileName, profileDescription, overallScore, dimensions } = payload;

  if (!to || !to.includes('@')) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing or invalid email address' }),
    };
  }

  const htmlContent  = generateEmailHTML({ profileName, profileDescription, overallScore, dimensions });
  const emailSubject = subject || 'Ground by Y2Y — A te személyes vezetői riportod';

  // Send result email to user
  try {
    await sesClient.send(new SendEmailCommand({
      Source: 'Ground by Y2Y <dorka@y2y.hu>',
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: ['dorka@y2y.hu'],
      Message: {
        Subject: { Data: emailSubject, Charset: 'UTF-8' },
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

  // Send notification to dorka@y2y.hu (best-effort)
  try {
    await sesClient.send(new SendEmailCommand({
      Source: 'Ground by Y2Y <dorka@y2y.hu>',
      Destination: { ToAddresses: ['dorka@y2y.hu'] },
      Message: {
        Subject: { Data: `Új Ground kitöltés: ${to}`, Charset: 'UTF-8' },
        Body:    { Html: { Data: generateNotificationHTML({ to, profileName, overallScore, dimensions }), Charset: 'UTF-8' } },
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
