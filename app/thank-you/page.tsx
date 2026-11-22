import type { Metadata } from "next";
import Link from "next/link";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import GtagConversionPageView from "@/components/GtagConversionPageView";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=971566912999&text=Hi!%20I%20would%20like%20to%20speak%20with%20a%20yacht%20broker.";

export default function ThankYouPage() {
  return (
    <>
      {/* Fires the Google conversion event on every lead */}
      <GtagConversionPageView />

      <section className="bg-[#003057] pt-36 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FaCheckCircle className="text-[#C9A84C] mx-auto mb-5" size={44} />
          <h1 className="font-[family-name:var(--font-cormorant)] font-light text-4xl md:text-6xl text-white mb-5">
            Thank You
          </h1>
          <p className="text-white/65 text-base leading-relaxed">
            We&apos;ve received your details. A yacht specialist will contact you shortly.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F8F5F0]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#1D2B3A] text-sm leading-relaxed mb-8">
            Need an answer sooner? Message us on WhatsApp, available 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-medium px-8 py-4 text-sm transition-colors"
            >
              <FaWhatsapp size={17} />
              WhatsApp Now
            </a>
            <Link
              href="/yachts"
              className="bg-[#003057] hover:bg-[#001f3d] text-white font-medium px-8 py-4 text-sm tracking-widest uppercase transition-colors"
            >
              Browse Yachts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
