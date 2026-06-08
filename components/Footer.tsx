import Link from "next/link";
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=971547928626&text=Hi!%20I%20am%20interested%20in%20a%20yacht%20for%20sale%20in%20Dubai.";

export default function Footer() {
  return (
    <footer className="bg-[#001f3d] text-white">
      {/* CTA Band */}
      <div className="bg-[#C9A84C] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-white">
              Ready to find your perfect yacht?
            </p>
            <p className="text-white/80 text-sm mt-1">
              Our experts are available 7 days a week
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-[#003057] font-semibold px-6 py-3 rounded-sm hover:bg-[#F5EDD6] transition-colors whitespace-nowrap"
          >
            <FaWhatsapp size={18} />
            WhatsApp Now
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <span className="font-[family-name:var(--font-cormorant)] font-semibold text-2xl tracking-wide text-white">
              SellMyYacht
            </span>
            <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-[#C9A84C] mt-0.5">
              Dubai
            </span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Dubai&apos;s premier luxury yacht brokerage. We connect discerning
            buyers and sellers with the finest vessels in the Arabian Gulf.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
              <FaInstagram size={14} />
            </a>
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
              <FaFacebookF size={14} />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
              <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { label: "Yachts for Sale", href: "/yachts" },
              { label: "Sell Your Yacht", href: "/sell-your-yacht" },
              { label: "Contact Us", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Yacht Types */}
        <div>
          <h3 className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4">
            Yacht Types
          </h3>
          <ul className="space-y-3">
            {["Motor Yachts", "Sport Cruisers", "Superyachts", "Sailing Yachts", "Catamarans"].map((t) => (
              <li key={t}>
                <Link
                  href={`/yachts?type=${t.toLowerCase().replace(" ", "-")}`}
                  className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4">
            Contact
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#C9A84C] mt-0.5 shrink-0" size={14} />
              <span className="text-white/60 text-sm leading-relaxed">
                Dubai Marina,<br />Dubai, UAE
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-[#C9A84C] shrink-0" size={13} />
              <a href="tel:+971547928626" className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors">
                +971 54 792 8626
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#C9A84C] shrink-0" size={13} />
              <a href="mailto:sales@sellmyyachtdubai.com" className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors">
                sales@sellmyyachtdubai.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaWhatsapp className="text-[#C9A84C] shrink-0" size={14} />
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors">
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} SellMyYacht Dubai. All rights reserved.</p>
          <p>Luxury Yacht Brokerage in the UAE</p>
        </div>
      </div>
    </footer>
  );
}
