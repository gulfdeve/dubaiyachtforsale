import { NextRequest, NextResponse } from "next/server";
import { createTransporter, TO, FROM, esc } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email } = await req.json();
    if (!name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    if (!phone?.trim() || phone.replace(/\D/g, "").length < 7)
      return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });

    await createTransporter().sendMail({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New Lead (Popup): ${String(name).replace(/[\r\n]/g, " ")}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #E2DDD6">
          <div style="background:#003057;padding:24px 32px">
            <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px">Find Your Perfect Yacht</p>
            <h1 style="color:#fff;font-size:22px;margin:0">Speak to a Specialist</h1>
          </div>
          <div style="padding:32px;line-height:2">
            <b>Name:</b> ${esc(name)}<br>
            <b>Phone:</b> <a href="tel:${esc(phone)}">${esc(phone)}</a><br>
            <b>Email:</b> <a href="mailto:${esc(email)}">${esc(email)}</a>
          </div>
          <div style="background:#F8F5F0;padding:16px 32px;font-size:11px;color:#6B7B8D">
            Popup lead · ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })} (Dubai Time)
          </div>
        </div>`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("lead error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
