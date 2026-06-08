import Link from "next/link";
import { FaWhatsapp, FaArrowRight, FaShieldAlt, FaHandshake, FaTrophy, FaSearch } from "react-icons/fa";
import YachtCard from "@/components/YachtCard";
import yachtsData from "@/data/yachts.json";
import type { Yacht } from "@/types/yacht";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=971547928626&text=Hi!%20I%20am%20interested%20in%20a%20yacht%20for%20sale%20in%20Dubai.";

const yachts: Yacht[] = yachtsData as Yacht[];
const featuredYachts = yachts.filter((y) => y.isFeatured).slice(0, 3);

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Yachts Sold" },
  { value: "AED 2B+", label: "Total Sales Value" },
  { value: "98%", label: "Client Satisfaction" },
];

const valueProps = [
  {
    icon: FaSearch,
    title: "Expert Curation",
    description:
      "Every yacht in our portfolio is personally inspected and verified by our expert brokers. No surprises, no hidden issues.",
  },
  {
    icon: FaShieldAlt,
    title: "Legal & Safe",
    description:
      "We handle all documentation, title transfer, and maritime legal requirements. Your investment is fully protected.",
  },
  {
    icon: FaHandshake,
    title: "Best Price Guarantee",
    description:
      "Our deep market knowledge ensures you buy or sell at the true market value. We negotiate hard on your behalf.",
  },
  {
    icon: FaTrophy,
    title: "Post-Sale Support",
    description:
      "Our relationship doesn't end at the sale. We provide ongoing support for registration, insurance, and maintenance.",
  },
];

const steps = [
  {
    step: "01",
    title: "Browse & Discover",
    desc: "Explore our curated collection of luxury yachts. Filter by size, type, price, and location.",
  },
  {
    step: "02",
    title: "Inquire & View",
    desc: "Contact our brokers directly via WhatsApp or email. We arrange private viewings at your convenience.",
  },
  {
    step: "03",
    title: "Survey & Negotiate",
    desc: "Independent survey arranged. We handle all price negotiations and ensure full transparency.",
  },
  {
    step: "04",
    title: "Own Your Yacht",
    desc: "We manage all paperwork, title transfer, and registration. You receive the keys — stress-free.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001f3d]/70 via-[#003057]/50 to-[#001f3d]/80" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="section-eyebrow mb-4">Dubai's Premier Yacht Brokerage</p>
          <h1 className="font-[family-name:var(--font-cormorant)] font-light text-5xl md:text-7xl text-white leading-tight mb-6">
            Find Your <span className="italic text-[#C9A84C]">Perfect</span>
            <br />Yacht in Dubai
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            An exclusive collection of verified luxury yachts for sale in the UAE.
            Unmatched expertise. Transparent process. Exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/yachts"
              className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#A8873A] text-white font-medium px-8 py-4 transition-colors duration-200 text-sm tracking-wide"
            >
              Browse Yachts
              <FaArrowRight size={14} />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/60 hover:border-white text-white font-medium px-8 py-4 transition-colors duration-200 text-sm tracking-wide"
            >
              <FaWhatsapp size={16} />
              Speak to a Broker
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/30" />
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-[#003057] py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold text-[#C9A84C]">
                {s.value}
              </p>
              <p className="text-white/60 text-xs tracking-wide mt-1 uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Yachts */}
      <section className="py-20 px-6 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Hand-picked Listings</p>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-4xl md:text-5xl text-[#003057]">
              Featured Yachts for Sale
            </h2>
            <span className="gold-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {featuredYachts.map((yacht) => (
              <YachtCard key={yacht.id} yacht={yacht} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/yachts"
              className="inline-flex items-center gap-2 border border-[#003057] text-[#003057] hover:bg-[#003057] hover:text-white font-medium px-8 py-3.5 text-sm tracking-wide transition-colors duration-200"
            >
              View All Listings
              <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Why Choose Us</p>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-4xl md:text-5xl text-[#003057]">
              The SellMyYacht Difference
            </h2>
            <span className="gold-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-5 border border-[#C9A84C] flex items-center justify-center group-hover:bg-[#C9A84C] transition-colors duration-200">
                  <Icon className="text-[#C9A84C] group-hover:text-white transition-colors" size={20} />
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-xl text-[#003057] mb-3">
                  {title}
                </h3>
                <p className="text-[#6B7B8D] text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#003057]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-3">
              Simple Process
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-4xl md:text-5xl text-white">
              How It Works
            </h2>
            <span className="gold-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-[#C9A84C]/30 z-0" />
                )}
                <div className="relative z-10">
                  <span className="font-[family-name:var(--font-cormorant)] text-5xl font-bold text-[#C9A84C]/20">
                    {step.step}
                  </span>
                  <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-xl text-white mt-1 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell CTA Split */}
      <section className="py-20 px-6 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden shadow-xl">
            {/* Image side */}
            <div className="relative h-72 lg:h-auto min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1520244617998-ab09c7b2b2e6?w=900&q=80"
                alt="Sell your yacht in Dubai"
                className="absolute inset-0 w-full h-full object-cover"
                width={900}
                height={600}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#001f3d]/40" />
            </div>

            {/* Content side */}
            <div className="bg-[#003057] p-10 lg:p-16 flex flex-col justify-center">
              <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4">
                Yacht Owners
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] font-light text-4xl text-white mb-5 leading-tight">
                Ready to Sell<br />Your Yacht?
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Our expert brokers will provide a complimentary valuation and create
                a bespoke marketing strategy to maximise your yacht's value. We have
                an active buyer network across the GCC and internationally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/sell-your-yacht"
                  className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A8873A] text-white font-medium px-7 py-3.5 text-sm tracking-wide transition-colors"
                >
                  List Your Yacht
                  <FaArrowRight size={13} />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-white/40 hover:border-white text-white font-medium px-7 py-3.5 text-sm tracking-wide transition-colors"
                >
                  <FaWhatsapp size={15} />
                  Free Valuation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_URL}
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
