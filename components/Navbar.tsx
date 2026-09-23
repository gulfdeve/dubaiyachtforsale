"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import SiteLogo from "@/components/SiteLogo";

const navLinks = [
  { label: "Yachts for Sale", href: "/yachts" },
  { label: "Sell Your Yacht", href: "/sell-your-yacht" },
  { label: "Contact", href: "/contact" },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=971543379499&text=Hi!%20I%20am%20interested%20in%20a%20yacht%20for%20sale%20in%20Dubai.";

const isActivePath = (pathname: string, href: string) => {
  if (href === "/yachts") {
    return pathname === "/yachts" || pathname.startsWith("/yachts/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function Navbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const hasTransparentHero = isHomepage;

  const [isScrolled, setIsScrolled] = useState(!hasTransparentHero);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!hasTransparentHero) {
      setIsScrolled(true);
      return;
    }
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasTransparentHero]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const solid = isScrolled || !hasTransparentHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2DDD6]"
          : "bg-gradient-to-b from-[#001f3d]/55 via-[#001f3d]/20 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 flex items-center justify-between h-[4.5rem] sm:h-20">
        <SiteLogo inverted={!solid} />

        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 lg:px-4 py-2 text-sm font-medium tracking-wide transition-colors min-h-[44px] inline-flex items-center ${
                  active
                    ? "text-[#C9A84C]"
                    : solid
                      ? "text-[#1D2B3A] hover:text-[#C9A84C]"
                      : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute bottom-1 left-3 right-3 lg:left-4 lg:right-4 h-px bg-[#C9A84C]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <span
            className={`h-6 w-px ${solid ? "bg-[#E2DDD6]" : "bg-white/25"}`}
            aria-hidden="true"
          />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#A8873A] text-white text-sm font-semibold px-5 py-2.5 tracking-wide transition-colors duration-200 min-h-[44px]"
          >
            <FaWhatsapp size={16} aria-hidden="true" />
            WhatsApp Us
          </a>
        </div>

        <button
          type="button"
          className={`md:hidden p-2.5 -mr-2 transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center cursor-pointer ${
            solid ? "text-[#003057]" : "text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden bg-white border-t border-[#E2DDD6] px-5 py-5 flex flex-col gap-1 shadow-lg max-h-[calc(100dvh-4.5rem)] overflow-y-auto"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-medium text-base py-3.5 px-2 border-b border-[#E2DDD6]/60 transition-colors min-h-[48px] flex items-center ${
                  active
                    ? "text-[#C9A84C]"
                    : "text-[#1D2B3A] hover:text-[#C9A84C]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A8873A] text-white font-semibold px-5 py-3.5 tracking-wide transition-colors min-h-[48px]"
          >
            <FaWhatsapp size={18} aria-hidden="true" />
            WhatsApp Us
          </a>
        </nav>
      )}
    </header>
  );
}
