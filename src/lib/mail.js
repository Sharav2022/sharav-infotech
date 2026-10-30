// Sends mail through the SendGrid v3 HTTP API. Server-side only.
// Requires SENDGRID_API_KEY; sender and recipient are configurable so the
// verified SendGrid sender can change without a code change.

const SENDGRID_ENDPOINT = "https://api.sendgrid.com/v3/mail/send";

export class MailError extends Error {}

// Most likely cause for each SendGrid failure, written to the server log so
// delivery problems can be diagnosed from Vercel → Logs.
const SENDGRID_HINTS = {
  400: "malformed request or invalid email address",
  401: "API key is missing, revoked or mistyped; check SENDGRID_API_KEY and redeploy",
  403: "sender not verified or key lacks Mail Send permission; verify CONTACT_FROM_EMAIL in SendGrid Sender Authentication",
  413: "message too large",
  429: "SendGrid rate limit or plan quota reached",
};

export async function sendEmail({ to, from, replyTo, subject, text }) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) throw new MailError("SENDGRID_API_KEY is not configured");

  const response = await fetch(SENDGRID_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: "Sharav Infotech Website" },
      reply_to: replyTo ? { email: replyTo } : undefined,
      subject,
      content: [{ type: "text/plain", value: text }],
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new MailError(
      `SendGrid responded ${response.status} (${SENDGRID_HINTS[response.status] ?? "unexpected error"}): ${detail.slice(0, 300)}`
    );
  }
}
