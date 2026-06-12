"use client";

import { useMemo, useState } from "react";
import { FaExpand } from "react-icons/fa";
import {
  buildGalleryItems,
  getAvailableCategories,
  GALLERY_CATEGORY_LABELS,
  type GalleryCategory,
} from "@/lib/yacht-gallery";
import YachtGalleryLightbox from "@/components/YachtGalleryLightbox";

interface YachtGalleryProps {
  yachtName: string;
  images: string[];
  imageCaptions?: string[];
}

export default function YachtGallery({
  yachtName,
  images,
  imageCaptions,
}: YachtGalleryProps) {
  const items = useMemo(
    () => buildGalleryItems(images, yachtName, imageCaptions),
    [images, yachtName, imageCaptions]
  );
  const categories = useMemo(() => getAvailableCategories(items), [items]);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const handleOpen = (globalIndex: number) => setLightboxIndex(globalIndex);
  const handleClose = () => setLightboxIndex(null);

  return (
    <>
      <section id="gallery" className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="section-eyebrow mb-4">
              Visual Tour
            </p>
            <h2
              className="font-display font-medium text-[#003057] leading-none"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            >
              Explore {yachtName}
            </h2>
            <div className="w-10 h-px bg-[#C9A84C] mx-auto mt-6 mb-4" />
            <p className="text-[#6B7B8D] text-sm tracking-wide">
              {items.length} curated photograph{items.length !== 1 ? "s" : ""} · Tap to enlarge
            </p>
          </div>

          {categories.length > 2 && (
            <div
              className="flex flex-wrap justify-center gap-2 mb-10"
              role="tablist"
              aria-label="Gallery categories"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2.5 text-[0.65rem] tracking-[0.18em] uppercase font-semibold transition-colors cursor-pointer min-h-[44px] ${
                    activeCategory === category
                      ? "bg-[#003057] text-white"
                      : "bg-[#FAFAF8] text-[#6B7B8D] border border-[#E2DDD6] hover:border-[#C9A84C] hover:text-[#003057]"
                  }`}
                >
                  {GALLERY_CATEGORY_LABELS[category]}
                </button>
              ))}
            </div>
          )}

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredItems.map((item) => (
              <figure
                key={item.src}
                className="break-inside-avoid group relative m-0 overflow-hidden bg-white shadow-sm border border-[#E2DDD6]/60"
              >
                <button
                  type="button"
                  onClick={() => handleOpen(item.index)}
                  className="relative block w-full cursor-pointer text-left"
                  aria-label={`Enlarge ${item.caption ?? item.alt}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001220]/85 via-[#001220]/25 to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#003057] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md motion-reduce:transition-none">
                    <FaExpand size={12} aria-hidden="true" />
                  </span>
                  {item.caption && (
                    <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pointer-events-none">
                      <p className="text-[#C9A84C] text-[0.55rem] tracking-[0.25em] uppercase mb-1">
                        {GALLERY_CATEGORY_LABELS[item.category]}
                      </p>
                      <p className="text-white font-display text-xl sm:text-2xl leading-tight">
                        {item.caption}
                      </p>
                    </figcaption>
                  )}
                </button>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <YachtGalleryLightbox
          items={items}
          activeIndex={lightboxIndex}
          yachtName={yachtName}
          onClose={handleClose}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
