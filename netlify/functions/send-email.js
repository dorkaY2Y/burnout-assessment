const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const sesClient = new SESClient({
  region: process.env.SES_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET_KEY,
  },
});

const generateEmailHTML = ({ profileName, profileDescription, overallScore, dimensions }) => {
  const getOverallColor = (score) => {
    if (score >= 4.2) return '#10B981';
    if (score >= 3.4) return '#3B82F6';
    if (score >= 2.6) return '#F59E0B';
    return '#EF4444';
  };

  const overallColor = getOverallColor(overallScore);
  const percentage = Math.round((overallScore / 5) * 100);

  const dimensionSections = (dimensions || []).map((d) => {
    const dimPercentage = Math.round((d.score / 5) * 100);
    const report = d.report || {};
    return `
      <div style="background: white; border-radius: 14px; padding: 24px 28px; margin-bottom: 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); border-left: 5px solid ${d.color || '#2D5BFF'};">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;">
          <h3 style="color: #1e293b; margin: 0; font-size: 17px; font-weight: 700;">${d.name || d.dimensionId}</h3>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="background: ${d.color || '#2D5BFF'}; color: white; padding: 3px 12px; border-radius: 10px; font-size: 12px; font-weight: 700;">${d.level || ''}</span>
            <span style="color: #1e293b; font-size: 18px; font-weight: 800;">${Number(d.score).toFixed(1)}<span style="color: #94a3b8; font-size: 13px; font-weight: 400;">/5</span></span>
          </div>
        </div>
        <div style="background: #f1f5f9; border-radius: 6px; height: 10px; overflow: hidden; margin-bottom: 18px;">
          <div style="background: ${d.color || '#2D5BFF'}; height: 100%; width: ${dimPercentage}%;"></div>
        </div>
        ${report.summary ? `<p style="color: #334155; line-height: 1.65; margin: 0 0 12px 0; font-size: 14px;">${report.summary}</p>` : ''}
        ${report.strengths ? `
        <div style="background: #f0fdf4; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px;">
          <p style="margin: 0; color: #166534; font-size: 13px; font-weight: 600; margin-bottom: 4px;">✅ Erősségeid</p>
          <p style="margin: 0; color: #15803d; font-size: 13px; line-height: 1.6;">${report.strengths}</p>
        </div>` : ''}
        ${report.advice ? `
        <div style="background: #eff6ff; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px;">
          <p style="margin: 0; color: #1e40af; font-size: 13px; font-weight: 600; margin-bottom: 4px;">💡 Fejlesztési javaslat</p>
          <p style="margin: 0; color: #1d4ed8; font-size: 13px; line-height: 1.6;">${report.advice}</p>
        </div>` : ''}
        ${report.practice ? `
        <div style="background: #fefce8; border-radius: 8px; padding: 12px 14px;">
          <p style="margin: 0; color: #713f12; font-size: 13px; font-weight: 600; margin-bottom: 4px;">🎯 Gyakorlat</p>
          <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.6;">${report.practice}</p>
        </div>` : ''}
      </div>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ground by Y2Y – Személyes Vezetői Riportod</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f8fafc;">
  <div style="max-width: 620px; margin: 0 auto; padding: 32px 16px;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0B1120 0%, #131B2E 100%); border-radius: 16px; padding: 36px 32px; text-align: center; margin-bottom: 24px; border: 1px solid #1E293B;">
      <p style="color: #ded114; margin: 0 0 6px 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 700;">Ground by Y2Y</p>
      <h1 style="color: white; margin: 0 0 8px 0; font-size: 24px; font-weight: 800; line-height: 1.2;">
        Leadership Readiness Index
      </h1>
      <p style="color: #94a3b8; margin: 0; font-size: 14px;">
        A te személyes vezetői fejlődési riportod
      </p>
    </div>

    <!-- Profile Card -->
    <div style="background: white; border-radius: 16px; padding: 28px 32px; margin-bottom: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); text-align: center;">
      <h2 style="color: #1e293b; margin: 0 0 8px 0; font-size: 22px; font-weight: 800;">${profileName || ''}</h2>
      ${profileDescription ? `<p style="color: #475569; font-size: 14px; line-height: 1.65; margin: 0 0 20px 0; text-align: left;">${profileDescription}</p>` : ''}
      <div style="font-size: 56px; font-weight: 800; color: ${overallColor}; line-height: 1; margin-bottom: 4px;">${Number(overallScore).toFixed(1)}</div>
      <div style="color: #94a3b8; font-size: 14px; margin-bottom: 12px;">/ 5.0 összesített pontszám</div>
      <div style="background: #f1f5f9; border-radius: 8px; height: 14px; overflow: hidden; margin: 0 auto 16px auto; max-width: 260px;">
        <div style="background: ${overallColor}; height: 100%; width: ${percentage}%;"></div>
      </div>
    </div>

    <!-- Dimension Reports -->
    <h2 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 14px 0; padding-left: 4px;">Részletes riport dimenziónként</h2>
    ${dimensionSections}

    <!-- Next Step CTA -->
    <div style="background: linear-gradient(135deg, rgba(222,209,20,0.1) 0%, rgba(222,209,20,0.05) 100%); border: 2px solid rgba(222,209,20,0.3); border-radius: 16px; padding: 28px 32px; margin-bottom: 24px; margin-top: 8px;">
      <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 17px; font-weight: 700;">📈 Mi a következő lépés?</h2>
      <p style="color: #475569; line-height: 1.65; margin: 0; font-size: 14px;">
        Azonosítsd azt a <strong>egy dimenziót</strong>, amelyen a leginkább szeretnél fejlődni, és 90 napon át fókuszáltan dolgozz rajta. A kis, következetes lépések exponenciális fejlődést hoznak.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 16px; color: #94a3b8; font-size: 12px;">
      <p style="margin: 0 0 6px 0;">
        <strong style="color: #64748b;">Y2Y – Leadership Development</strong>
      </p>
      <p style="margin: 0 0 4px 0;">
        Kérdésed van? <a href="mailto:dorka@y2y.hu" style="color: #ded114; text-decoration: none;">dorka@y2y.hu</a>
      </p>
      <p style="margin: 8px 0 0 0; color: #cbd5e1; font-size: 11px;">
        Ezt az emailt azért kaptad, mert kitöltötted a Ground by Y2Y Leadership Readiness Index felmérést.
      </p>
    </div>

  </div>
</body>
</html>`;
};

const generateNotificationHTML = ({ to, profileName, overallScore, dimensions }) => {
  const dimRows = (dimensions || []).map((d) =>
    `<li><strong>${d.name || d.dimensionId}:</strong> ${Number(d.score).toFixed(1)} / 5.0 — ${d.level || ''}</li>`
  ).join('');

  return `
    <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #1e293b;">Új Ground kitöltés 🎉</h2>
      <p><strong>Email:</strong> ${to}</p>
      <p><strong>Profil:</strong> ${profileName || 'N/A'}</p>
      <p><strong>Összesített pontszám:</strong> ${Number(overallScore).toFixed(2)} / 5.0</p>
      <p><strong>Időpont:</strong> ${new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' })}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
      <h3 style="color: #1e293b;">Dimenziók:</h3>
      <ul style="line-height: 2;">${dimRows}</ul>
    </div>
  `;
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

  const htmlContent = generateEmailHTML({ profileName, profileDescription, overallScore, dimensions });
  const emailSubject = subject || 'Ground by Y2Y — A te személyes vezetői riportod';

  // Send result email to user
  try {
    await sesClient.send(new SendEmailCommand({
      Source: 'Ground by Y2Y <dorka@y2y.hu>',
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: ['dorka@y2y.hu'],
      Message: {
        Subject: { Data: emailSubject, Charset: 'UTF-8' },
        Body: { Html: { Data: htmlContent, Charset: 'UTF-8' } },
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
        Body: { Html: { Data: generateNotificationHTML({ to, profileName, overallScore, dimensions }), Charset: 'UTF-8' } },
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
