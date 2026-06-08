"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Yachts for Sale", href: "/yachts" },
  { label: "Sell Your Yacht", href: "/sell-your-yacht" },
  { label: "Contact", href: "/contact" },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=971547928626&text=Hi!%20I%20am%20interested%20in%20a%20yacht%20for%20sale%20in%20Dubai.";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md border-b border-[#E2DDD6]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className={`font-[family-name:var(--font-cormorant)] font-semibold text-2xl tracking-wide transition-colors ${
              isScrolled ? "text-[#003057]" : "text-white"
            }`}
          >
            SellMyYacht
          </span>
          <span
            className={`text-[0.6rem] tracking-[0.25em] uppercase transition-colors ${
              isScrolled ? "text-[#C9A84C]" : "text-[#C9A84C]"
            }`}
          >
            Dubai
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-[#C9A84C] ${
                isScrolled ? "text-[#1D2B3A]" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#A8873A] text-white text-sm font-medium px-5 py-2.5 rounded-sm transition-colors duration-200"
          >
            <FaWhatsapp size={16} />
            WhatsApp Us
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 transition-colors ${
            isScrolled ? "text-[#003057]" : "text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#E2DDD6] px-6 py-6 flex flex-col gap-5 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[#1D2B3A] font-medium text-base hover:text-[#C9A84C] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#C9A84C] text-white font-medium px-5 py-3 rounded-sm"
          >
            <FaWhatsapp size={18} />
            WhatsApp Us
          </a>
        </div>
      )}
    </header>
  );
}
