import {
  HONEYPOT_FIELD,
  normalizeContact,
  validateContact,
} from "../../src/lib/contact";
import { sendEmail } from "../../src/lib/mail";

// Best-effort, per-instance rate limit. Serverless instances do not share
// memory, so this only slows down naive abuse; see docs for a durable option.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const recentRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (recentRequests.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recentRequests.set(ip, hits);
  if (recentRequests.size > 5000) recentRequests.clear();
  return hits.length > MAX_REQUESTS;
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return (typeof forwarded === "string" && forwarded.split(",")[0].trim()) ||
    req.socket?.remoteAddress ||
    "unknown";
}

// Header-bound values must never contain line breaks.
const singleLine = (value) => value.replace(/[\r\n]+/g, " ");

export const config = {
  api: { bodyParser: { sizeLimit: "16kb" } },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  if (!req.headers["content-type"]?.includes("application/json")) {
    return res.status(415).json({ message: "Unsupported content type." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  // Silently accept bot submissions so the honeypot is not revealed.
  if (body[HONEYPOT_FIELD]) {
    return res.status(200).json({ message: "Thank you." });
  }

  if (isRateLimited(clientIp(req))) {
    return res
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
  }

  const values = normalizeContact(body);
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return res
      .status(400)
      .json({ message: "Please correct the highlighted fields.", errors });
  }

  const text = [
    "New project enquiry from sharavinfotech.com",
    "",
    `Name:          ${values.name}`,
    `Email:         ${values.email}`,
    `Phone:         ${values.phone || "-"}`,
    `Organization:  ${values.company || "-"}`,
    `Interest:      ${values.interest || "-"}`,
    "",
    "Message:",
    values.message,
  ].join("\n");

  try {
    await sendEmail({
      to: process.env.CONTACT_TO_EMAIL || "sharavinfotech@gmail.com",
      from: process.env.CONTACT_FROM_EMAIL || "sharavinfotech@gmail.com",
      replyTo: values.email,
      subject: singleLine(`Project enquiry: ${values.name}`).slice(0, 140),
      text,
    });
  } catch (error) {
    console.error("[contact] delivery failed:", error.message);
    return res.status(502).json({
      message:
        "We could not send your message just now. Please email info@sharavinfotech.com or call (647) 564-6789.",
    });
  }

  return res.status(200).json({ message: "Thank you." });
}
