import nodemailer from "nodemailer";

// Reads SMTP configuration from environment variables (see .env.example).
// Throws a clear error if required values are missing so misconfiguration is obvious.
export function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in .env.local."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: { user, pass },
  });
}

export const mailConfig = {
  from: process.env.SMTP_FROM || process.env.SMTP_USER || "",
  fromName: process.env.SMTP_FROM_NAME || "Hampton Family Dental Website",
  to: process.env.ENQUIRY_TO || "info@hamptonfamilydentist.com",
  /**
   * Second copy of every submission, so a lead is not lost if the primary
   * inbox rejects, filters or silently drops it.
   *
   * Sent as a separate message rather than a Bcc: a Bcc shares one SMTP
   * transaction, so a hard bounce on the primary recipient can take the backup
   * down with it - which defeats the point of having one.
   *
   * Set ENQUIRY_BACKUP_TO="" to disable.
   */
  backupTo:
    process.env.ENQUIRY_BACKUP_TO ?? "info@hamptonfamilydentist.com",
};
