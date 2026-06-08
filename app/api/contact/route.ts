import { NextRequest, NextResponse } from "next/server";
import { createTransporter, TO, FROM } from "@/lib/mailer";

const SUBJECTS: Record<string, string> = {
  buying: "Buying Inquiry",
  selling: "Selling Inquiry",
  valuation: "Free Valuation Request",
  other: "General Inquiry",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    if (!message?.trim()) return NextResponse.json({ error: "Message is required." }, { status: 400 });

    const transporter = createTransporter();
    const subjectLabel = SUBJECTS[subject] || subject || "General Inquiry";

    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `📩 Contact: ${subjectLabel} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #E2DDD6;border-radius:4px;overflow:hidden">
          <div style="background:#003057;padding:24px 32px">
            <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px">Contact Form Message</p>
            <h1 style="color:#fff;font-size:22px;margin:0">${subjectLabel}</h1>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;width:120px;text-transform:uppercase;letter-spacing:1px">Name</td><td style="padding:8px 0;color:#1D2B3A;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#003057">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Phone</td><td style="padding:8px 0"><a href="tel:${phone}" style="color:#003057">${phone}</a></td></tr>` : ""}
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Topic</td><td style="padding:8px 0;color:#1D2B3A">${subjectLabel}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top">Message</td><td style="padding:8px 0;color:#1D2B3A;line-height:1.6">${message.replace(/\n/g, "<br>")}</td></tr>
            </table>
          </div>
          <div style="background:#F8F5F0;padding:16px 32px;font-size:11px;color:#6B7B8D">
            Received from sellmyyachtdubai.com · ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })} (Dubai Time)
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact error:", err);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
