"use client";

import { useState } from "react";

const input = "w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]";
const label = "block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (status === "done")
    return <p className="text-sm text-[#1D2B3A] py-8">Thank you! We&apos;ll get back to you shortly.</p>;

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label} htmlFor="c-name">Full Name *</label>
          <input id="c-name" name="name" required className={input} placeholder="Your name" />
        </div>
        <div>
          <label className={label} htmlFor="c-email">Email *</label>
          <input id="c-email" name="email" type="email" required className={input} placeholder="your@email.com" />
        </div>
      </div>
      <div>
        <label className={label} htmlFor="c-phone">Phone / WhatsApp</label>
        <input id="c-phone" name="phone" type="tel" className={input} placeholder="+971 50 000 0000" />
      </div>
      <div>
        <label className={label} htmlFor="c-subject">Subject</label>
        <select id="c-subject" name="subject" className={`${input} bg-white`}>
          <option value="">Select a topic...</option>
          <option value="buying">I want to buy a yacht</option>
          <option value="selling">I want to sell my yacht</option>
          <option value="valuation">Free valuation request</option>
          <option value="other">General inquiry</option>
        </select>
      </div>
      <div>
        <label className={label} htmlFor="c-message">Message *</label>
        <textarea id="c-message" name="message" rows={5} required className={`${input} resize-none`} placeholder="Tell us how we can help..." />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[#003057] hover:bg-[#001f3d] disabled:opacity-60 text-white font-medium py-4 text-sm tracking-widest uppercase transition-colors"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
