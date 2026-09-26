import { NextRequest, NextResponse } from "next/server";
import { createTransporter, TO, FROM } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, yachtName, year, lengthFt, askingPrice, location, notes } = body;

    if (!name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    if (!phone?.trim()) return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    if (!yachtName?.trim()) return NextResponse.json({ error: "Yacht name/model is required." }, { status: 400 });
    if (!year || isNaN(Number(year)) || Number(year) < 1990 || Number(year) > new Date().getFullYear())
      return NextResponse.json({ error: "Please enter a valid year." }, { status: 400 });

    const transporter = createTransporter();

    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `🛥️ Yachts For Sale in Dubai Request: ${yachtName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #E2DDD6;border-radius:4px;overflow:hidden">
          <div style="background:#003057;padding:24px 32px">
            <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px">Sell Your Yacht Request</p>
            <h1 style="color:#fff;font-size:22px;margin:0">${yachtName}</h1>
          </div>
          <div style="padding:32px">
            <p style="color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;padding-bottom:8px;border-bottom:1px solid #E2DDD6">Owner Details</p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;width:140px;text-transform:uppercase;letter-spacing:1px">Name</td><td style="padding:8px 0;color:#1D2B3A;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#003057">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Phone</td><td style="padding:8px 0"><a href="tel:${phone}" style="color:#003057">${phone}</a></td></tr>
            </table>
            <p style="color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;padding-bottom:8px;border-bottom:1px solid #E2DDD6">Yacht Details</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;width:140px;text-transform:uppercase;letter-spacing:1px">Model</td><td style="padding:8px 0;color:#1D2B3A;font-weight:600">${yachtName}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Year</td><td style="padding:8px 0;color:#1D2B3A">${year}</td></tr>
              ${lengthFt ? `<tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Length</td><td style="padding:8px 0;color:#1D2B3A">${lengthFt} ft</td></tr>` : ""}
              ${askingPrice ? `<tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Asking Price</td><td style="padding:8px 0;color:#1D2B3A">AED ${Number(askingPrice).toLocaleString()}</td></tr>` : ""}
              ${location ? `<tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px">Location</td><td style="padding:8px 0;color:#1D2B3A">${location}</td></tr>` : ""}
              ${notes ? `<tr><td style="padding:8px 0;color:#6B7B8D;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top">Notes</td><td style="padding:8px 0;color:#1D2B3A;line-height:1.6">${notes.replace(/\n/g, "<br>")}</td></tr>` : ""}
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
    console.error("sell-yacht error:", err);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
