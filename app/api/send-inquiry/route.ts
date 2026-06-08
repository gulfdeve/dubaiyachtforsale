import { NextRequest, NextResponse } from "next/server";
import { createTransporter, TO, FROM } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, yachtName, yachtSlug } = body;

    // Server-side validation
    if (!name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    if (!message?.trim()) return NextResponse.json({ error: "Message is required." }, { status: 400 });

    const transporter = createTransporter();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `🛥️ Yacht Inquiry: ${yachtName || "Unknown Yacht"}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #E2DDD6;border-radius:4px;overflow:hidden">
          <div style="background:#003057;padding:24px 32px">
            <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px">New Yacht Inquiry</p>
            <h1 style="color:#fff;font-size:22px;margin:0">${yachtName || "Yacht Inquiry"}</h1>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;width:120px;text-transform:uppercase;letter-spacing:1px">Name</td><td style="padding:8px 0;color:#1D2B3A;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#003057">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Phone</td><td style="padding:8px 0"><a href="tel:${phone}" style="color:#003057">${phone}</a></td></tr>` : ""}
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top">Message</td><td style="padding:8px 0;color:#1D2B3A;line-height:1.6">${message.replace(/\n/g, "<br>")}</td></tr>
            </table>
            ${yachtSlug ? `<div style="margin-top:24px"><a href="${siteUrl}/yachts/${yachtSlug}" style="display:inline-block;background:#003057;color:#fff;text-decoration:none;padding:12px 24px;font-size:13px;border-radius:2px">View Yacht Listing →</a></div>` : ""}
          </div>
          <div style="background:#F8F5F0;padding:16px 32px;font-size:11px;color:#6B7B8D">
            Received from sellmyyachtdubai.com · ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })} (Dubai Time)
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-inquiry error:", err);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
