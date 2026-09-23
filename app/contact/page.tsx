import type { Metadata } from "next";
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact SellMyYacht Dubai's expert brokers. Available 7 days a week via WhatsApp, phone, or email.",
};

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=971543379499&text=Hi!%20I%20would%20like%20to%20speak%20with%20a%20yacht%20broker.";

const contactCards = [
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+971 54 337 9499",
    href: WHATSAPP_URL,
    desc: "Fastest response · Available 7 days",
    color: "#25D366",
  },
  {
    icon: FaPhone,
    title: "Phone",
    value: "+971 54 337 9499",
    href: "tel:+971543379499",
    desc: "Sun–Thu 9am–7pm · Fri–Sat 10am–6pm",
    color: "#003057",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    value: "sales@sellmyyachtdubai.com",
    href: "mailto:sales@sellmyyachtdubai.com",
    desc: "We respond within 24 hours",
    color: "#C9A84C",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Office",
    value: "Dubai Marina, Dubai",
    href: "https://maps.google.com/?q=Dubai+Marina",
    desc: "UAE · By appointment",
    color: "#003057",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#003057] pt-36 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=1200&q=60')",
            }}
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4">
            We're Here to Help
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] font-light text-4xl md:text-6xl text-white mb-5">
            Contact Our Brokers
          </h1>
          <p className="text-white/65 text-base leading-relaxed">
            Whether you're buying, selling, or simply have a question — our expert team
            is ready to assist. We pride ourselves on personal service and fast response times.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 px-6 bg-[#F8F5F0]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map(({ icon: Icon, title, value, href, desc, color }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="bg-white border border-[#E2DDD6] hover:border-[#C9A84C] hover:shadow-md p-6 flex flex-col gap-3 transition-all duration-200 group"
            >
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <p className="text-[#6B7B8D] text-xs uppercase tracking-[0.12em] font-medium">{title}</p>
                <p className="text-[#003057] font-medium text-sm mt-1 group-hover:text-[#C9A84C] transition-colors break-all">
                  {value}
                </p>
                <p className="text-[#6B7B8D] text-xs mt-1">{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Main Content — Form + Hours */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-3xl text-[#003057] mb-2">
              Send a Message
            </h2>
            <span className="gold-divider !mx-0 mb-8" />

            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="c-name">
                    Full Name *
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="c-email">
                    Email *
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="c-phone">
                  Phone / WhatsApp
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C]"
                  placeholder="+971 50 000 0000"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="c-subject">
                  Subject
                </label>
                <select
                  id="c-subject"
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] bg-white focus:outline-none focus:border-[#C9A84C]"
                >
                  <option value="">Select a topic...</option>
                  <option value="buying">I want to buy a yacht</option>
                  <option value="selling">I want to sell my yacht</option>
                  <option value="valuation">Free valuation request</option>
                  <option value="other">General inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#6B7B8D] uppercase tracking-wide mb-1.5" htmlFor="c-message">
                  Message *
                </label>
                <textarea
                  id="c-message"
                  rows={5}
                  required
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#1D2B3A] focus:outline-none focus:border-[#C9A84C] resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="bg-[#003057] hover:bg-[#001f3d] text-white font-medium py-4 text-sm tracking-widest uppercase transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Hours & Info */}
          <div className="lg:col-span-2">
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-3xl text-[#003057] mb-2">
              Office Hours
            </h2>
            <span className="gold-divider !mx-0 mb-8" />

            <div className="border border-[#E2DDD6] overflow-hidden mb-8">
              {[
                { day: "Sunday – Thursday", hours: "9:00 AM – 7:00 PM" },
                { day: "Friday", hours: "10:00 AM – 6:00 PM" },
                { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
              ].map(({ day, hours }, i) => (
                <div
                  key={day}
                  className={`flex justify-between px-5 py-4 text-sm ${
                    i % 2 === 0 ? "bg-[#F8F5F0]" : "bg-white"
                  }`}
                >
                  <span className="text-[#6B7B8D]">{day}</span>
                  <span className="text-[#1D2B3A] font-medium">{hours}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#003057] p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="text-[#C9A84C]" size={16} />
                <p className="font-[family-name:var(--font-cormorant)] font-semibold text-lg">
                  After-Hours Inquiries
                </p>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Urgent? Send us a WhatsApp message any time. We monitor
                our messages 7 days a week and will respond as soon as possible.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-medium py-3 text-sm transition-colors"
              >
                <FaWhatsapp size={17} />
                WhatsApp Now
              </a>
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
