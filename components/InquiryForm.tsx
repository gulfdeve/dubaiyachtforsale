"use client";

import { useState } from "react";
import { FaWhatsapp, FaCheckCircle } from "react-icons/fa";

interface Props {
  yachtName: string;
  yachtSlug: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const WHATSAPP_BASE =
  "https://api.whatsapp.com/send?phone=971547928626&text=Hi!%20I%20am%20interested%20in%20the%20";

export default function InquiryForm({ yachtName, yachtSlug }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: `I am interested in the ${yachtName} and would like more information.`,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const whatsappUrl = `${WHATSAPP_BASE}${encodeURIComponent(yachtName)}%20for%20sale.`;

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, yachtName, yachtSlug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="p-8 text-center border border-[#E2DDD6] bg-white shadow-lg">
        <FaCheckCircle className="text-[#C9A84C] mx-auto mb-4" size={36} />
        <p className="font-[family-name:var(--font-cormorant)] font-semibold text-xl text-[#003057] mb-2">
          Inquiry Sent!
        </p>
        <p className="text-[#6B7B8D] text-sm leading-relaxed">
          Thank you, {form.name}. Our brokers will be in touch within 24 hours.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-medium py-3 text-sm transition-colors"
        >
          <FaWhatsapp size={17} />
          Also Message Us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="border border-[#E2DDD6] bg-white shadow-lg">
      <div className="bg-[#003057] px-6 py-5">
        <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-1">
          Interested?
        </p>
        <p className="font-[family-name:var(--font-cormorant)] font-semibold text-xl text-white">
          Request More Info
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="inq-name">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="inq-name"
              type="text"
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
              className={`w-full border px-3 py-2.5 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C] ${errors.name ? "border-red-400 bg-red-50" : "border-[#E2DDD6]"}`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="inq-email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="inq-email"
              type="email"
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
              className={`w-full border px-3 py-2.5 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C] ${errors.email ? "border-red-400 bg-red-50" : "border-[#E2DDD6]"}`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="inq-phone">
              Phone
            </label>
            <input
              id="inq-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-[#E2DDD6] px-3 py-2.5 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
              placeholder="+971 50 000 0000"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="inq-message">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="inq-message"
              rows={3}
              value={form.message}
              onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: undefined }); }}
              className={`w-full border px-3 py-2.5 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C] resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-[#E2DDD6]"}`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          {serverError && (
            <p className="text-red-500 text-xs bg-red-50 border border-red-200 px-3 py-2">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#003057] hover:bg-[#001f3d] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 text-sm tracking-wide transition-colors"
          >
            {status === "loading" ? "Sending…" : "Send Inquiry"}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-[#E2DDD6]">
          <p className="text-center text-[#6B7B8D] text-xs mb-3">Or contact us directly</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-medium py-3 text-sm transition-colors"
          >
            <FaWhatsapp size={17} />
            WhatsApp About This Yacht
          </a>
        </div>
      </div>
    </div>
  );
}
