import type { Metadata } from "next";
import { FaWhatsapp, FaArrowRight, FaCamera, FaFileAlt, FaHandshake } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Sell Your Yacht",
  description:
    "List your yacht for sale in Dubai with the UAE's trusted yacht brokerage. Free valuation, expert marketing, and access to an active buyer network.",
};

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=971547928626&text=Hi!%20I%20would%20like%20to%20sell%20my%20yacht.%20Can%20you%20provide%20a%20free%20valuation?";

const steps = [
  {
    icon: FaFileAlt,
    step: "01",
    title: "Submit Your Details",
    desc: "Complete our simple form with your yacht's information. Our team reviews every submission within 24 hours.",
  },
  {
    icon: FaCamera,
    step: "02",
    title: "Valuation & Listing",
    desc: "We conduct a complimentary on-site inspection and professional photography. Your yacht is listed across all major platforms.",
  },
  {
    icon: FaHandshake,
    step: "03",
    title: "We Close the Deal",
    desc: "We handle negotiations, surveys, and all legal paperwork. You receive your funds — we take care of everything.",
  },
];

export default function SellYourYachtPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1520244617998-ab09c7b2b2e6?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001f3d]/90 to-[#003057]/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4">
            Yacht Owners
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] font-light text-5xl md:text-6xl text-white leading-tight mb-5">
            Sell Your Yacht <span className="italic text-[#C9A84C]">with Confidence</span>
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-xl mx-auto">
            Expert marketing, an active buyer network, and end-to-end brokerage services —
            so you get the best price with zero hassle.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#list-form"
              className="bg-[#C9A84C] hover:bg-[#A8873A] text-white font-medium px-8 py-4 text-sm tracking-wide transition-colors inline-flex items-center gap-2"
            >
              List Your Yacht <FaArrowRight size={13} />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/60 hover:border-white text-white font-medium px-8 py-4 text-sm tracking-wide transition-colors inline-flex items-center gap-2"
            >
              <FaWhatsapp size={16} /> Free Valuation
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Our Process</p>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-4xl text-[#003057]">
              Simple, Transparent, Effective
            </h2>
            <span className="gold-divider mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="relative inline-flex">
                  <div className="w-16 h-16 border border-[#C9A84C] flex items-center justify-center mx-auto mb-5">
                    <Icon className="text-[#C9A84C]" size={22} />
                  </div>
                  <span className="absolute -top-3 -right-3 font-[family-name:var(--font-cormorant)] text-4xl font-bold text-[#C9A84C]/15 leading-none">
                    {step}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-xl text-[#003057] mb-3">
                  {title}
                </h3>
                <p className="text-[#6B7B8D] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="list-form" className="py-20 px-6 bg-[#F8F5F0]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Get Started</p>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-4xl text-[#003057]">
              Tell Us About Your Yacht
            </h2>
            <span className="gold-divider mt-4" />
          </div>

          <div className="bg-white border border-[#E2DDD6] p-8 md:p-12 shadow-sm">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Personal Details */}
              <div className="sm:col-span-2">
                <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4 pb-2 border-b border-[#E2DDD6]">
                  Your Details
                </p>
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="sell-name">
                  Full Name *
                </label>
                <input
                  id="sell-name"
                  type="text"
                  required
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="sell-email">
                  Email *
                </label>
                <input
                  id="sell-email"
                  type="email"
                  required
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="sell-phone">
                  Phone / WhatsApp *
                </label>
                <input
                  id="sell-phone"
                  type="tel"
                  required
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                  placeholder="+971 50 000 0000"
                />
              </div>

              {/* Yacht Details */}
              <div className="sm:col-span-2 mt-2">
                <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4 pb-2 border-b border-[#E2DDD6]">
                  Yacht Details
                </p>
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="sell-yacht-name">
                  Yacht Name / Model *
                </label>
                <input
                  id="sell-yacht-name"
                  type="text"
                  required
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                  placeholder="e.g. Azimut 75"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="sell-year">
                  Year Built *
                </label>
                <input
                  id="sell-year"
                  type="number"
                  required
                  min={1990}
                  max={new Date().getFullYear()}
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                  placeholder="e.g. 2019"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="sell-length">
                  Length (ft)
                </label>
                <input
                  id="sell-length"
                  type="number"
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                  placeholder="e.g. 75"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="sell-asking">
                  Asking Price (AED)
                </label>
                <input
                  id="sell-asking"
                  type="number"
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                  placeholder="e.g. 5000000"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="sell-location">
                  Current Location
                </label>
                <input
                  id="sell-location"
                  type="text"
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                  placeholder="e.g. Dubai Marina"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="sell-notes">
                  Additional Notes
                </label>
                <textarea
                  id="sell-notes"
                  rows={4}
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C] resize-none"
                  placeholder="Any notable features, recent refits, reason for selling..."
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#003057] hover:bg-[#001f3d] text-white font-medium py-4 text-sm tracking-widest uppercase transition-colors"
                >
                  Submit Listing Request
                </button>
                <p className="text-center text-[#6B7B8D] text-xs mt-3">
                  Or{" "}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline inline-flex items-center gap-1">
                    <FaWhatsapp size={11} /> WhatsApp us directly
                  </a>{" "}
                  for a faster response.
                </p>
              </div>
            </form>
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
