import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FaWhatsapp,
  FaRuler,
  FaCalendarAlt,
  FaBed,
  FaUsers,
  FaArrowLeft,
  FaAnchor,
  FaBolt,
} from "react-icons/fa";
import InquiryForm from "@/components/InquiryForm";
import yachtsData from "@/data/yachts.json";
import type { Yacht } from "@/types/yacht";

const yachts: Yacht[] = (yachtsData as Yacht[]).filter((y) => !y.hidden);

const WHATSAPP_BASE =
  "https://api.whatsapp.com/send?phone=971547928626&text=Hi!%20I%20am%20interested%20in%20the%20";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return yachts.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const yacht = yachts.find((y) => y.slug === slug);
  if (!yacht) return {};
  return {
    title: `${yacht.name} for Sale | Sell My Yacht Dubai`,
    description: `${yacht.name} — ${yacht.lengthFt}ft ${yacht.builder} ${yacht.type} for sale in ${yacht.location}. ${yacht.cabins} cabins, ${yacht.guests} guests. Contact us for pricing.`,
  };
}

function formatPrice(aed: number): string {
  if (!aed || aed === 0) return "Price on Request";
  if (aed >= 1_000_000) return `AED ${(aed / 1_000_000).toFixed(1)}M`;
  return `AED ${aed.toLocaleString()}`;
}

export default async function YachtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const yacht = yachts.find((y) => y.slug === slug);
  if (!yacht) notFound();

  const whatsappUrl = `${WHATSAPP_BASE}${encodeURIComponent(yacht.name)}%20yacht%20for%20sale.%20Please%20send%20more%20details.`;

  const quickStats = [
    { icon: FaRuler, label: "Length", value: `${yacht.lengthFt}ft / ${yacht.lengthM}m` },
    { icon: FaCalendarAlt, label: "Year Built", value: String(yacht.year) },
    { icon: FaAnchor, label: "Builder", value: yacht.builder },
    { icon: FaBed, label: "Cabins", value: yacht.cabins === 0 ? "No Cabin" : `${yacht.cabins} Cabins` },
    { icon: FaUsers, label: "Capacity", value: `${yacht.guests} Guests` },
    { icon: FaBolt, label: "Max Speed", value: yacht.specs.maxSpeed },
  ];

  const perfSpecs = [
    { label: "Length Overall", value: `${yacht.lengthFt}ft / ${yacht.lengthM}m` },
    { label: "Beam", value: yacht.specs.beam },
    { label: "Draft", value: yacht.specs.draft },
    { label: "Engines", value: yacht.specs.engines },
    { label: "Max Speed", value: yacht.specs.maxSpeed },
    { label: "Cruising Speed", value: yacht.specs.cruisingSpeed },
    ...(yacht.decks ? [{ label: "Decks", value: yacht.decks }] : []),
    {
      label: "Cabins",
      value:
        yacht.cabins === 0
          ? "No Cabin"
          : `${yacht.cabins}${yacht.cabins > 1 ? " (all en-suite)" : ""}`,
    },
    { label: "Guest Capacity", value: `${yacht.guests} Guests` },
    ...(yacht.extendedSpecs ?? []),
  ];

  // images[0] is hero, rest are gallery
  const [heroImg, ...galleryImgs] = yacht.images;

  return (
    <>
      {/* ─────────────────────────────────────────────
          1. CINEMATIC FULL-VIEWPORT HERO
      ───────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden">
        <img
          src={heroImg || yacht.mainImage}
          alt={yacht.name}
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          loading="eager"
        />
        {/* Dark gradient — heavier at bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001220] via-[#001220]/55 to-[#001220]/5" />

        {/* Back link */}
        <div className="absolute top-0 left-0 right-0 pt-24 px-6 md:px-10 z-10">
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 text-white/60 text-xs tracking-[0.18em] uppercase hover:text-[#C9A84C] transition-colors"
          >
            <FaArrowLeft size={10} />
            All Listings
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative z-10 px-6 md:px-10 pb-14 max-w-7xl mx-auto w-full">
          <p className="text-[#C9A84C] text-[0.65rem] tracking-[0.35em] uppercase font-medium mb-4">
            {yacht.type} &nbsp;·&nbsp; {yacht.status} &nbsp;·&nbsp; {yacht.location}
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-none mb-3"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
            {yacht.name}
          </h1>
          <p className="text-white/50 text-sm tracking-[0.22em] uppercase mb-10">
            {yacht.builder} &nbsp;·&nbsp; {yacht.lengthFt} Feet
            {yacht.year > 0 && <> &nbsp;·&nbsp; {yacht.year}</>}
          </p>

          {/* Price + primary CTA */}
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <p className="text-white/40 text-[0.6rem] uppercase tracking-widest mb-1">Asking Price</p>
              <p className="font-[family-name:var(--font-cormorant)] text-[2rem] font-semibold text-[#C9A84C]">
                {formatPrice(yacht.priceAED)}
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#C9A84C] hover:bg-[#b8963e] text-white px-8 py-3.5 text-xs tracking-[0.18em] uppercase font-semibold transition-colors"
            >
              <FaWhatsapp size={14} />
              Enquire Now
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 right-8 hidden md:flex flex-col items-center gap-2 text-white/25">
          <span className="text-[0.55rem] tracking-[0.3em] uppercase rotate-90 origin-right translate-x-8">
            Scroll to Explore
          </span>
          <span className="w-px h-10 bg-white/20" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          2. QUICK STATS BAR (navy strip)
      ───────────────────────────────────────────── */}
      <section className="bg-[#003057]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-white/10">
          {quickStats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center justify-center py-7 px-4 text-center">
              <Icon className="text-[#C9A84C] mb-2.5" size={13} />
              <p className="text-white font-medium text-sm leading-tight">{value}</p>
              <p className="text-white/35 text-[0.58rem] uppercase tracking-[0.18em] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. OVERVIEW + STICKY INQUIRY
      ───────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* ── Left: Content ── */}
          <div className="lg:col-span-2 space-y-16">

            {/* About */}
            <div>
              <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.28em] font-medium mb-3">
                About This Yacht
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[2.6rem] text-[#003057] leading-tight mb-5">
                A Private Escape to<br />Luxury on the High Seas
              </h2>
              <div className="w-10 h-px bg-[#C9A84C] mb-6" />
              <p className="text-[#4B5A6B] leading-[1.85] text-[1.0625rem]">
                {yacht.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.28em] font-medium mb-3">
                Equipment & Features
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-3xl text-[#003057] mb-5">
                What&apos;s On Board
              </h2>
              <div className="w-10 h-px bg-[#C9A84C] mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-[#EDEAE5]">
                {yacht.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 py-3 border-b border-[#EDEAE5] pr-4">
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C] shrink-0 mt-px" />
                    <span className="text-[#1D2B3A] text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.28em] font-medium mb-3">
                Technical Details
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-3xl text-[#003057] mb-5">
                Specifications
              </h2>
              <div className="w-10 h-px bg-[#C9A84C] mb-6" />
              <div className="border border-[#E2DDD6] divide-y divide-[#E2DDD6]">
                {perfSpecs.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className={`flex justify-between px-5 py-3.5 text-sm ${
                      i % 2 === 0 ? "bg-[#F8F5F0]" : "bg-white"
                    }`}
                  >
                    <span className="text-[#6B7B8D] font-medium">{label}</span>
                    <span className="text-[#1D2B3A] font-medium text-right max-w-[55%] leading-snug">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {yacht.insurance && (
              <div className="border border-[#E2DDD6] bg-[#F8F5F0] p-6">
                <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.28em] font-medium mb-2">
                  Insurance
                </p>
                <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-xl text-[#003057] mb-5">
                  Marine Hull — Valid Until {yacht.insurance.validUntil}
                </h3>
                <div className="space-y-3 border-t border-[#E2DDD6] pt-4">
                  {[
                    ["Insurance Type", "Marine Hull"],
                    ["Hull Value", yacht.insurance.hullValue],
                    ["Third Party Liability", yacht.insurance.thirdPartyLiability],
                    ["Coverage", yacht.insurance.coverage],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between text-sm gap-4">
                      <span className="text-[#6B7B8D] shrink-0">{label}</span>
                      <span className="text-[#1D2B3A] font-medium text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ownership note */}
            <div className="flex items-start gap-4 border-l-2 border-[#C9A84C] pl-5 py-1">
              <p className="text-[#4B5A6B] text-sm leading-relaxed italic">
                &ldquo;Privately owned and operated with meticulous care throughout its ownership. Full service records available. Sea trial can be arranged for serious buyers.&rdquo;
              </p>
            </div>

          </div>

          {/* ── Right: Sticky Inquiry ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-3">

              {/* Price card */}
              <div className="bg-[#003057] text-white p-6">
                <p className="text-[#C9A84C] text-[0.6rem] uppercase tracking-[0.28em] mb-1">Asking Price</p>
                <p className="font-[family-name:var(--font-cormorant)] font-semibold text-[2rem] leading-tight">
                  {formatPrice(yacht.priceAED)}
                </p>
                <p className="text-white/40 text-xs mt-2">Contact us for full pricing details</p>
              </div>

              {/* Inquiry form */}
              <InquiryForm yachtName={yacht.name} yachtSlug={yacht.slug} />

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white py-4 text-xs tracking-[0.15em] uppercase font-semibold transition-colors"
              >
                <FaWhatsapp size={15} />
                Chat on WhatsApp
              </a>

              {/* Trust note */}
              <p className="text-[#6B7B8D] text-[0.65rem] text-center tracking-wide leading-relaxed pt-1">
                Privately owned · Full documentation available<br />Sea trial can be arranged
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. GALLERY — only when images exist
      ───────────────────────────────────────────── */}
      {galleryImgs.length > 0 && (
        <>
          {/* Gallery header */}
          <section className="bg-[#003057] py-20 px-6 text-center">
            <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.32em] mb-4">Visual Tour</p>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              Explore {yacht.name}
            </h2>
            <div className="w-10 h-px bg-[#C9A84C] mx-auto mt-6 mb-4" />
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase">
              {yacht.images.length} Photographs · Exterior &amp; Interior
            </p>
          </section>

          {/* ── EXTERIOR BENTO GRID ── */}
          {/* [foredeck large] [sun-deck] [upper-deck] [forward-deck] */}
          <div className="bg-[#080f18] grid grid-cols-2 md:grid-cols-4 gap-[3px]">
            {/* Large left — foredeck */}
            {galleryImgs[0] && (
              <div className="col-span-2 md:row-span-2 relative overflow-hidden group"
                style={{ minHeight: "320px" }}>
                <img
                  src={galleryImgs[0]}
                  alt="Foredeck"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  style={{ minHeight: "320px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-[#C9A84C] text-[0.58rem] tracking-[0.25em] uppercase mb-0.5">Exterior</p>
                  <p className="text-white font-[family-name:var(--font-cormorant)] text-2xl">Foredeck</p>
                </div>
              </div>
            )}
            {/* Top-right images */}
            {[
              { img: galleryImgs[1], label: "Sun Deck", sub: "Outdoor" },
              { img: galleryImgs[2], label: "Upper Deck", sub: "Exterior" },
              { img: galleryImgs[3], label: "Forward Deck", sub: "Exterior" },
            ].map(({ img, label, sub }) =>
              img ? (
                <div key={label} className="relative aspect-[4/3] overflow-hidden group">
                  <img
                    src={img}
                    alt={label}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <p className="text-[#C9A84C] text-[0.55rem] tracking-widest uppercase mb-0.5">{sub}</p>
                    <p className="text-white font-[family-name:var(--font-cormorant)] text-lg">{label}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>

          {/* ── INTERIOR EDITORIAL SECTION ── */}
          <section className="bg-[#F8F5F0] py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.28em] mb-3">Living Spaces</p>
                <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[2.5rem] text-[#003057] leading-tight mb-5">
                  Modern Salon &<br />Entertainment Areas
                </h2>
                <div className="w-10 h-px bg-[#C9A84C] mb-6" />
                <p className="text-[#4B5A6B] leading-[1.85] text-base">
                  The interior salon is designed with comfort in mind, featuring plush seating,
                  full air-conditioning, and large panoramic windows offering uninterrupted views
                  of the water. Ambient lighting and premium wood finishes create an atmosphere
                  of sophisticated warmth throughout.
                </p>
              </div>
              {galleryImgs[4] && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={galleryImgs[4]}
                    alt="Main Saloon"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Saloon + Entertainment side by side */}
          {(galleryImgs[5] || galleryImgs[6]) && (
            <div className="bg-[#080f18] grid grid-cols-1 md:grid-cols-2 gap-[3px]">
              {[
                { img: galleryImgs[5], label: "Saloon Lounge", sub: "Interior" },
                { img: galleryImgs[6], label: "Entertainment Lounge", sub: "Interior" },
              ].map(({ img, label, sub }) =>
                img ? (
                  <div key={label} className="relative aspect-[4/3] overflow-hidden group">
                    <img
                      src={img}
                      alt={label}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <p className="text-[#C9A84C] text-[0.58rem] tracking-[0.28em] uppercase mb-1">{sub}</p>
                      <p className="text-white font-[family-name:var(--font-cormorant)] text-3xl">{label}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}

          {/* ── CABINS SECTION ── */}
          {(galleryImgs[7] || galleryImgs[8]) && (
            <section className="bg-white py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                  <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.28em] mb-3">Accommodation</p>
                  <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[2.5rem] text-[#003057] leading-tight">
                    {yacht.cabins} Luxurious Cabin{yacht.cabins !== 1 ? "s" : ""},<br />
                    {yacht.cabins > 1 ? "Each with En-Suite Bathroom" : "With En-Suite Bathroom"}
                  </h2>
                  <div className="w-10 h-px bg-[#C9A84C] mt-5 mb-5" />
                  <p className="text-[#4B5A6B] text-base leading-relaxed max-w-2xl">
                    Whether you&apos;re planning an overnight stay or an extended voyage, {yacht.name}
                    offers the privacy and comfort of a fine boutique hotel on the water.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      img: galleryImgs[7],
                      name: "Master Cabin",
                      detail: "King bed · Full en-suite · Premium finishes · Natural light",
                    },
                    {
                      img: galleryImgs[8],
                      name: "Guest Cabin",
                      detail: "Twin beds · En-suite bathroom · Built-in storage · AC",
                    },
                  ].map(({ img, name, detail }) =>
                    img ? (
                      <div key={name} className="group">
                        <div className="relative aspect-[4/3] overflow-hidden mb-5">
                          <img
                            src={img}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                          />
                        </div>
                        <p className="text-[#C9A84C] text-[0.6rem] uppercase tracking-[0.25em] mb-1">Accommodation</p>
                        <p className="font-[family-name:var(--font-cormorant)] font-semibold text-2xl text-[#003057] mb-2">
                          {name}
                        </p>
                        <p className="text-[#6B7B8D] text-sm">{detail}</p>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ── BRIDGE FULL-BLEED ── */}
          {galleryImgs[9] && (
            <div className="relative overflow-hidden" style={{ height: "55vh", minHeight: "380px" }}>
              <img
                src={galleryImgs[9]}
                alt="Navigation Bridge"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#001220]/55" />
              <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                <div>
                  <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.32em] mb-4">Navigation</p>
                  <h2 className="font-[family-name:var(--font-cormorant)] font-light text-white leading-none"
                    style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
                    Command the Seas
                  </h2>
                  <p className="text-white/50 text-sm mt-4 tracking-widest uppercase">
                    Full Navigation Bridge · {yacht.specs.engines} · {yacht.specs.maxSpeed}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── HELM + GALLEY + BATHROOM 3-GRID ── */}
          <div className="bg-[#080f18] grid grid-cols-1 md:grid-cols-3 gap-[3px]">
            {[
              { img: galleryImgs[10], label: "Helm Controls", sub: "Navigation" },
              { img: galleryImgs[11], label: "Galley Kitchen", sub: "Amenities" },
              { img: galleryImgs[12], label: "En-Suite Bathroom", sub: "Amenities" },
            ].map(({ img, label, sub }) =>
              img ? (
                <div key={label} className="relative aspect-[4/3] overflow-hidden group">
                  <img
                    src={img}
                    alt={label}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-[#C9A84C] text-[0.58rem] tracking-[0.25em] uppercase mb-0.5">{sub}</p>
                    <p className="text-white font-[family-name:var(--font-cormorant)] text-2xl">{label}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </>
      )}

      {/* ─────────────────────────────────────────────
          5. FINAL CTA — dark navy
      ───────────────────────────────────────────── */}
      <section className="bg-[#003057] py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.32em] mb-4">
            Ready to Make {yacht.name} Yours?
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
            Begin Your Inquiry Today
          </h2>
          <div className="w-10 h-px bg-[#C9A84C] mx-auto mb-7" />
          <p className="text-white/50 text-sm leading-[1.8] mb-10 max-w-lg mx-auto">
            {yacht.name} is a rare opportunity — a {yacht.lengthFt}ft {yacht.builder} {yacht.type.toLowerCase()}
            available in {yacht.location}. Our team can arrange viewings, sea trials, and provide
            full documentation on request.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white px-10 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors"
            >
              <FaWhatsapp size={14} />
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white px-10 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors"
            >
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <FaWhatsapp size={26} />
      </a>
    </>
  );
}

