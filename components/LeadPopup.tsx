"use client";

import { useState } from "react";
import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";

const input = "w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]";

export default function LeadPopup() {
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneOk, setPhoneOk] = useState(false);

  function close() {
    setOpen(false);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!phoneOk) return setError("Enter a valid phone number.");
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-title"
    >
      <div className="relative w-full max-w-md bg-white p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={close} aria-label="Close" className="absolute right-4 top-3 text-2xl text-[#6B7B8D] hover:text-[#003057]">
          ×
        </button>
        <h2 id="lead-title" className="font-[family-name:var(--font-cormorant)] font-light text-3xl text-[#003057] mb-2">
          Find Your Perfect Yacht
        </h2>
        <span className="gold-divider !mx-0 mb-6" />

        {status === "done" ? (
          <p className="text-sm text-[#1D2B3A] py-6">Thank you! A yacht specialist will contact you shortly.</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <input name="name" required placeholder="Full Name" aria-label="Full Name" className={input} />
            <IntlTelInput
              initialCountry="ae"
              separateDialCode
              loadUtils={() => import("intl-tel-input/utils")}
              onChangeNumber={setPhone}
              onChangeValidity={setPhoneOk}
              containerClass="w-full"
              inputProps={{ placeholder: "50 000 0000", autoComplete: "tel", required: true, className: input }}
            />
            <input name="email" type="email" required placeholder="Email Address" aria-label="Email Address" className={input} />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#003057] hover:bg-[#001f3d] disabled:opacity-60 text-white font-medium py-4 text-sm tracking-widest uppercase transition-colors"
            >
              {status === "loading" ? "Sending..." : "Speak to a Specialist"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
