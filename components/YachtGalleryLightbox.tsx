"use client";

import { useCallback, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import type { GalleryItem } from "@/lib/yacht-gallery";

interface YachtGalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number;
  yachtName: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function YachtGalleryLightbox({
  items,
  activeIndex,
  yachtName,
  onClose,
  onNavigate,
}: YachtGalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const item = items[activeIndex];

  const handlePrevious = useCallback(() => {
    onNavigate(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
  }, [activeIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") handlePrevious();
      if (event.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrevious, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#001220]/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${yachtName} photo gallery`}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8 border-b border-white/10">
        <div className="min-w-0">
          <p className="text-[#C9A84C] text-[0.6rem] uppercase tracking-[0.28em] truncate">
            {yachtName}
          </p>
          <p className="text-white/90 font-[family-name:var(--font-cormorant)] text-lg sm:text-xl truncate">
            {item.caption ?? `Photo ${activeIndex + 1}`}
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-white/50 text-xs tracking-[0.2em] uppercase hidden sm:inline">
            {activeIndex + 1} / {items.length}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#C9A84C] transition-colors cursor-pointer"
          >
            <FaTimes size={16} />
          </button>
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 py-6 min-h-0">
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#C9A84C] transition-colors cursor-pointer"
        >
          <FaChevronLeft size={16} />
        </button>

        <figure className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center m-0">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[calc(100dvh-220px)] max-w-full w-auto h-auto object-contain shadow-2xl"
          />
          <figcaption className="mt-4 text-center sm:hidden">
            <span className="text-white/50 text-xs tracking-[0.2em] uppercase">
              {activeIndex + 1} / {items.length}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next photo"
          className="absolute right-2 sm:right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#C9A84C] transition-colors cursor-pointer"
        >
          <FaChevronRight size={16} />
        </button>
      </div>

      {items.length > 1 && (
        <div className="border-t border-white/10 px-4 py-4 sm:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin max-w-6xl mx-auto">
            {items.map((thumb, index) => (
              <button
                key={thumb.src}
                type="button"
                onClick={() => onNavigate(index)}
                aria-label={`View photo ${index + 1}${thumb.caption ? `: ${thumb.caption}` : ""}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 overflow-hidden border-2 transition-all cursor-pointer ${
                  index === activeIndex
                    ? "border-[#C9A84C] opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={thumb.src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
