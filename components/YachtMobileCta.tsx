"use client";

import { FaWhatsapp } from "react-icons/fa";

interface YachtMobileCtaProps {
  whatsappUrl: string;
  yachtName: string;
}

export default function YachtMobileCta({ whatsappUrl, yachtName }: YachtMobileCtaProps) {
  const handleScrollToForm = () => {
    const form = document.getElementById("yacht-inquiry");
    form?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#E2DDD6] px-4 py-3 safe-area-pb">
      <div className="flex gap-3 max-w-lg mx-auto">
        <button
          type="button"
          onClick={handleScrollToForm}
          className="flex-1 bg-[#003057] hover:bg-[#001f3d] text-white py-3.5 text-[0.65rem] tracking-[0.18em] uppercase font-semibold transition-colors cursor-pointer min-h-[48px]"
          aria-label={`Request information about ${yachtName}`}
        >
          Enquire
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white py-3.5 text-[0.65rem] tracking-[0.18em] uppercase font-semibold transition-colors min-h-[48px]"
          aria-label={`Chat on WhatsApp about ${yachtName}`}
        >
          <FaWhatsapp size={16} aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
