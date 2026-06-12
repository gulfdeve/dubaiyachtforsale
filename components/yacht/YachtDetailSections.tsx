"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaWhatsapp,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaHandshake,
  FaSearch,
  FaTrophy,
  FaChevronDown,
} from "react-icons/fa";
import YachtCard from "@/components/YachtCard";
import type { Yacht } from "@/types/yacht";

const BUYING_STEPS = [
  {
    step: "01",
    title: "Express Interest",
    desc: "Contact us via WhatsApp or the inquiry form. We respond within hours with full details and availability.",
  },
  {
    step: "02",
    title: "Private Viewing",
    desc: "Arrange an exclusive viewing at the yacht's berth. Walk every deck, cabin, and engine room at your pace.",
  },
  {
    step: "03",
    title: "Survey & Negotiate",
    desc: "Independent marine survey arranged. We handle price negotiations with complete transparency.",
  },
  {
    step: "04",
    title: "Close & Sail Away",
    desc: "We manage all documentation, title transfer, and registration. You receive the keys — stress-free.",
  },
];

const BROKER_STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Yachts Sold" },
  { value: "AED 2B+", label: "Total Sales Value" },
  { value: "24h", label: "Response Time" },
];

const FAQ_ITEMS = [
  {
    q: "Can I arrange a sea trial before purchasing?",
    a: "Yes. Sea trials can be arranged for serious buyers once preliminary terms are agreed. Our brokers coordinate timing, crew, and marina access.",
  },
  {
    q: "Is the price negotiable?",
    a: "Most listings have room for negotiation. Share your budget and timeline — we will advise on a realistic offer and negotiate on your behalf.",
  },
  {
    q: "What documents will I receive?",
    a: "Full ownership history, service records, insurance certificates, and survey reports are available on request before you commit.",
  },
  {
    q: "Do you help with registration and transfer?",
    a: "Absolutely. We manage the entire transfer process including UAE maritime registration, flag state documentation, and legal clearance.",
  },
];

interface YachtHighlightsProps {
  features: string[];
}

export const YachtHighlights = ({ features }: YachtHighlightsProps) => {
  const highlights = features.slice(0, 6);
  if (highlights.length === 0) return null;

  return (
    <section className="bg-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E2DDD6]" aria-label="Yacht highlights">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="section-eyebrow mb-3">At a Glance</p>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#003057]">
            Why This Yacht Stands Out
          </h2>
          <span className="gold-divider mt-4" />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {highlights.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 border border-[#E2DDD6] bg-[#FAFAF8] px-5 py-4"
            >
              <FaCheckCircle className="text-[#C9A84C] shrink-0 mt-0.5" size={14} aria-hidden="true" />
              <span className="text-[#1D2B3A] text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const YachtTrustBar = () => (
  <section className="bg-[#003057] py-12 sm:py-14 px-4 sm:px-6 lg:px-8" aria-label="Broker credentials">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.28em] font-medium mb-3">
          Trusted Brokerage
        </p>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white">
          Dubai&apos;s Premier Yacht Specialists
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
        {BROKER_STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-display text-3xl sm:text-4xl text-[#C9A84C] font-medium">{value}</p>
            <p className="text-white/45 text-[0.6rem] uppercase tracking-[0.2em] mt-2">{label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: FaSearch, title: "Expert Curation", desc: "Every yacht personally inspected by our brokers." },
          { icon: FaShieldAlt, title: "Fully Protected", desc: "Complete documentation and legal compliance handled." },
          { icon: FaHandshake, title: "Fair Pricing", desc: "Deep market knowledge ensures true market value." },
          { icon: FaTrophy, title: "After-Sale Care", desc: "Maintenance, crew, and marina referrals available." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="border border-white/10 px-5 py-5">
            <Icon className="text-[#C9A84C] mb-3" size={18} aria-hidden="true" />
            <h3 className="font-display text-lg text-white mb-2">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const YachtBuyingProcess = ({ yachtName }: { yachtName: string }) => (
  <section className="bg-[#FAFAF8] py-16 sm:py-20 px-4 sm:px-6 lg:px-8" aria-label="How to purchase">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 sm:mb-14">
        <p className="section-eyebrow mb-3">Your Path to Ownership</p>
        <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#003057]">
          How to Acquire {yachtName}
        </h2>
        <span className="gold-divider mt-4" />
        <p className="text-[#6B7B8D] text-sm max-w-xl mx-auto mt-5 leading-relaxed">
          From first enquiry to keys in hand — a seamless, transparent process guided by our expert brokers.
        </p>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {BUYING_STEPS.map((step, i) => (
          <li key={step.step} className="relative">
            {i < BUYING_STEPS.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[#C9A84C]/25 z-0" aria-hidden="true" />
            )}
            <div className="relative z-10">
              <span className="font-display text-5xl font-medium text-[#C9A84C]/20 leading-none">
                {step.step}
              </span>
              <h3 className="font-display font-medium text-xl text-[#003057] mt-2 mb-3">{step.title}</h3>
              <p className="text-[#6B7B8D] text-sm leading-relaxed">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

interface YachtLocationProps {
  yachtName: string;
  location: string;
  whatsappUrl: string;
}

export const YachtLocationSection = ({ yachtName, location, whatsappUrl }: YachtLocationProps) => (
  <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E2DDD6]" aria-label="Viewing location">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <p className="section-eyebrow mb-3">See It In Person</p>
        <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#003057] mb-5">
          Private Viewings in {location}
        </h2>
        <div className="w-10 h-px bg-[#C9A84C] mb-6" />
        <p className="text-[#4B5A6B] leading-[1.85] text-base mb-6 max-w-prose">
          {yachtName} is currently berthed in {location}. Schedule an exclusive walk-through at a time
          that suits you — evenings and weekends available for international buyers visiting Dubai.
        </p>
        <ul className="space-y-3 mb-8">
          {[
            "Flexible viewing times including weekends",
            "Guided tour of every deck and cabin",
            "Engine room and technical briefing on request",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[#1D2B3A] text-sm">
              <FaCheckCircle className="text-[#C9A84C] shrink-0 mt-0.5" size={12} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-[#003057] hover:bg-[#001f3d] text-white px-8 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors min-h-[48px]"
        >
          <FaWhatsapp size={15} aria-hidden="true" />
          Book a Viewing
        </a>
      </div>
      <div className="border border-[#E2DDD6] bg-[#FAFAF8] p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center border border-[#C9A84C]">
            <FaMapMarkerAlt className="text-[#C9A84C]" size={18} aria-hidden="true" />
          </div>
          <div>
            <p className="text-[#6B7B8D] text-[0.6rem] uppercase tracking-[0.2em]">Current Berth</p>
            <p className="font-display text-xl text-[#003057]">{location}</p>
          </div>
        </div>
        <p className="text-[#6B7B8D] text-sm leading-relaxed mb-6">
          Dubai&apos;s premier marina district offers world-class facilities, easy access from DXB airport,
          and the finest yachting infrastructure in the Middle East.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center w-full border border-[#003057] text-[#003057] hover:bg-[#003057] hover:text-white px-6 py-3.5 text-xs tracking-[0.18em] uppercase font-semibold transition-colors min-h-[48px]"
        >
          Contact Our Brokers
        </Link>
      </div>
    </div>
  </section>
);

export const YachtFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-[#FAFAF8] py-16 sm:py-20 px-4 sm:px-6 lg:px-8" aria-label="Frequently asked questions">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="section-eyebrow mb-3">Common Questions</p>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#003057]">
            Buyer FAQ
          </h2>
          <span className="gold-divider mt-4" />
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q} className="border border-[#E2DDD6] bg-white">
                <button
                  type="button"
                  id={`faq-trigger-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => handleToggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left cursor-pointer min-h-[56px]"
                >
                  <span className="font-medium text-[#003057] text-sm sm:text-base leading-snug">
                    {item.q}
                  </span>
                  <FaChevronDown
                    className={`text-[#C9A84C] shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={12}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  hidden={!isOpen}
                  className="px-5 sm:px-6 pb-5 text-[#6B7B8D] text-sm leading-relaxed border-t border-[#E2DDD6]"
                >
                  <p className="pt-4">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface SimilarYachtsProps {
  yachts: Yacht[];
}

export const SimilarYachts = ({ yachts }: SimilarYachtsProps) => {
  if (yachts.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E2DDD6]" aria-label="Similar yachts">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="section-eyebrow mb-3">Explore More</p>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#003057]">
            Similar Yachts You May Like
          </h2>
          <span className="gold-divider mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yachts.map((yacht) => (
            <YachtCard key={yacht.slug} yacht={yacht} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/yachts"
            className="inline-flex items-center justify-center border border-[#003057] text-[#003057] hover:bg-[#003057] hover:text-white px-10 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors min-h-[48px]"
          >
            View All Listings
          </Link>
        </div>
      </div>
    </section>
  );
};
