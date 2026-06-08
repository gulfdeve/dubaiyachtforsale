import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp, FaRuler, FaCalendarAlt, FaBed, FaUsers, FaMapMarkerAlt, FaArrowLeft, FaAnchor } from "react-icons/fa";
import YachtCard from "@/components/YachtCard";
import yachtsData from "@/data/yachts.json";
import type { Yacht } from "@/types/yacht";

const yachts: Yacht[] = yachtsData as Yacht[];

const WHATSAPP_BASE =
  "https://api.whatsapp.com/send?phone=971547928626&text=Hi!%20I%20am%20interested%20in%20the%20";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return yachts.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const yacht = yachts.find((y) => y.slug === slug);
  if (!yacht) return {};
  return {
    title: `${yacht.name} for Sale`,
    description: `${yacht.name} (${yacht.year}) — ${yacht.lengthFt}ft ${yacht.type} for sale in ${yacht.location}. AED ${yacht.priceAED.toLocaleString()}.`,
  };
}

function formatPrice(aed: number): string {
  if (aed >= 1_000_000) return `AED ${(aed / 1_000_000).toFixed(1)}M`;
  return `AED ${aed.toLocaleString()}`;
}

export default async function YachtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const yacht = yachts.find((y) => y.slug === slug);
  if (!yacht) notFound();

  const whatsappUrl = `${WHATSAPP_BASE}${encodeURIComponent(yacht.name)}%20for%20sale.`;
  const similar = yachts.filter((y) => y.slug !== yacht.slug && y.type === yacht.type).slice(0, 3);

  const mainSpecs = [
    { icon: FaRuler, label: "Length", value: `${yacht.lengthFt}ft / ${yacht.lengthM}m` },
    { icon: FaCalendarAlt, label: "Year", value: String(yacht.year) },
    { icon: FaBed, label: "Cabins", value: String(yacht.cabins) },
    { icon: FaUsers, label: "Guests", value: String(yacht.guests) },
    { icon: FaMapMarkerAlt, label: "Location", value: yacht.location },
    { icon: FaAnchor, label: "Builder", value: yacht.builder },
  ];

  const perfSpecs = [
    { label: "Beam", value: yacht.specs.beam },
    { label: "Draft", value: yacht.specs.draft },
    { label: "Engines", value: yacht.specs.engines },
    { label: "Max Speed", value: yacht.specs.maxSpeed },
    { label: "Cruising Speed", value: yacht.specs.cruisingSpeed },
    { label: "Fuel Capacity", value: yacht.specs.fuelCapacity },
    { label: "Water Capacity", value: yacht.specs.waterCapacity },
  ];

  return (
    <>
      {/* Back Nav */}
      <div className="bg-white border-b border-[#E2DDD6] pt-24 pb-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 text-[#6B7B8D] text-sm hover:text-[#003057] transition-colors"
          >
            <FaArrowLeft size={12} />
            Back to Listings
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="bg-[#001f3d]">
        <div className="max-w-7xl mx-auto">
        <img
            src={yacht.mainImage}
            alt={yacht.name}
            width={1400}
            height={700}
            className="w-full h-[50vh] md:h-[65vh] object-cover"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left — Details */}
          <div className="lg:col-span-2">
            {/* Title */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium">
                  {yacht.type} · {yacht.status}
                </span>
                <h1 className="font-[family-name:var(--font-cormorant)] font-semibold text-4xl md:text-5xl text-[#003057] mt-1">
                  {yacht.name}
                </h1>
                <p className="text-[#6B7B8D] text-sm mt-1">{yacht.builder}</p>
              </div>
              <div className="text-right">
                <p className="font-[family-name:var(--font-cormorant)] font-semibold text-3xl text-[#003057]">
                  {formatPrice(yacht.priceAED)}
                </p>
                <p className="text-[#6B7B8D] text-xs mt-1">
                  ≈ USD {yacht.priceUSD.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Main Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {mainSpecs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[#F8F5F0] border border-[#E2DDD6] p-4 flex items-center gap-3">
                  <Icon className="text-[#C9A84C] shrink-0" size={16} />
                  <div>
                    <p className="text-[#6B7B8D] text-[0.65rem] uppercase tracking-wide">{label}</p>
                    <p className="text-[#1D2B3A] text-sm font-medium mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-2xl text-[#003057] mb-4">
                About this Yacht
              </h2>
              <span className="gold-divider !mx-0 mb-5" />
              <p className="text-[#6B7B8D] leading-relaxed text-base">{yacht.description}</p>
            </div>

            {/* Features */}
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-2xl text-[#003057] mb-4">
                Features & Equipment
              </h2>
              <span className="gold-divider !mx-0 mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {yacht.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-sm text-[#1D2B3A]">
                    <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-2xl text-[#003057] mb-4">
                Technical Specifications
              </h2>
              <span className="gold-divider !mx-0 mb-5" />
              <div className="border border-[#E2DDD6] overflow-hidden">
                {perfSpecs.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className={`flex justify-between px-5 py-3 text-sm ${
                      i % 2 === 0 ? "bg-[#F8F5F0]" : "bg-white"
                    }`}
                  >
                    <span className="text-[#6B7B8D] font-medium">{label}</span>
                    <span className="text-[#1D2B3A] font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Inquiry Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 border border-[#E2DDD6] bg-white shadow-lg">
              <div className="bg-[#003057] px-6 py-5">
                <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-1">
                  Interested?
                </p>
                <p className="font-[family-name:var(--font-cormorant)] font-semibold text-xl text-white">
                  Request More Info
                </p>
              </div>

              <div className="p-6">
                <form className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full border border-[#E2DDD6] px-3 py-2.5 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full border border-[#E2DDD6] px-3 py-2.5 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full border border-[#E2DDD6] px-3 py-2.5 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                      placeholder="+971 50 000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full border border-[#E2DDD6] px-3 py-2.5 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C] resize-none"
                      defaultValue={`I am interested in the ${yacht.name} and would like more information.`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#003057] hover:bg-[#001f3d] text-white font-medium py-3 text-sm tracking-wide transition-colors"
                  >
                    Send Inquiry
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
          </div>
        </div>
      </section>

      {/* Similar Yachts */}
      {similar.length > 0 && (
        <section className="py-14 px-6 bg-[#F8F5F0]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <p className="section-eyebrow mb-2">You Might Also Like</p>
              <h2 className="font-[family-name:var(--font-cormorant)] font-light text-3xl text-[#003057]">
                Similar Yachts
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((y) => (
                <YachtCard key={y.id} yacht={y} />
              ))}
            </div>
          </div>
        </section>
      )}

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
