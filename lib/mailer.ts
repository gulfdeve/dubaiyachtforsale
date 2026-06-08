import nodemailer from "nodemailer";

export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export const TO = process.env.LEAD_EMAIL_TO || process.env.SMTP_USER || "";
export const FROM = `SellMyYacht Dubai <${process.env.SMTP_USER}>`;
