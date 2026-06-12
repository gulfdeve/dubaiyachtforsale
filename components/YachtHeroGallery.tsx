"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaImages, FaWhatsapp } from "react-icons/fa";
import {
  buildGalleryItems,
  getHeroMosaicItems,
  type GalleryItem,
} from "@/lib/yacht-gallery";
import YachtGalleryLightbox from "@/components/YachtGalleryLightbox";

interface YachtHeroGalleryProps {
  yachtName: string;
  images: string[];
  imageCaptions?: string[];
  formattedPrice: string;
  whatsappUrl: string;
  yachtType: string;
  yachtStatus: string;
  location: string;
  builder: string;
  lengthFt: number;
  year: number;
}

export default function YachtHeroGallery({
  yachtName,
  images,
  imageCaptions,
  formattedPrice,
  whatsappUrl,
  yachtType,
  yachtStatus,
  location,
  builder,
  lengthFt,
  year,
}: YachtHeroGalleryProps) {
  const allItems = useMemo(
    () => buildGalleryItems(images, yachtName, imageCaptions),
    [images, yachtName, imageCaptions]
  );
  const heroItems = useMemo(() => getHeroMosaicItems(allItems, 5), [allItems]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (heroItems.length === 0) return null;

  const heroItem = heroItems[0];
  const mosaicItems = heroItems.slice(1, 5);
  const remainingCount = Math.max(0, allItems.length - heroItems.length);

  const handleOpen = (item: GalleryItem) => setLightboxIndex(item.index);
  const handleClose = () => setLightboxIndex(null);

  return (
    <>
      <section
        aria-label={`${yachtName} listing`}
        className="bg-white border-b border-[#E2DDD6]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-10">
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 text-[#6B7B8D] text-[0.65rem] tracking-[0.18em] uppercase hover:text-[#C9A84C] transition-colors mb-6"
          >
            <FaArrowLeft size={10} aria-hidden="true" />
            All Listings
          </Link>

          {/* Photo mosaic — images lead, no dark wrapper */}
          <div className="overflow-hidden border border-[#E2DDD6] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#E2DDD6] lg:min-h-[400px]">
              <HeroTile
                item={heroItem}
                onOpen={handleOpen}
                className="lg:col-span-7 lg:row-span-2 min-h-[220px] sm:min-h-[300px] lg:min-h-[400px]"
                priority
              />

              <div className="hidden lg:grid lg:col-span-5 lg:row-span-2 grid-cols-2 grid-rows-2 gap-px bg-[#E2DDD6]">
                {mosaicItems.map((item, i) => (
                  <HeroTile
                    key={item.src}
                    item={item}
                    onOpen={handleOpen}
                    className="min-h-[198px]"
                    showOverlay={i === mosaicItems.length - 1 && remainingCount > 0}
                    overlayCount={remainingCount}
                  />
                ))}
                {mosaicItems.length < 4 &&
                  Array.from({ length: 4 - mosaicItems.length }).map((_, i) => (
                    <div
                      key={`placeholder-${i}`}
                      className="bg-[#F8F5F0]"
                      aria-hidden="true"
                    />
                  ))}
              </div>

              <div className="flex lg:hidden gap-px overflow-x-auto bg-[#E2DDD6] snap-x snap-mandatory">
                {heroItems.slice(1).map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => handleOpen(item)}
                    className="relative shrink-0 w-32 h-24 sm:w-40 sm:h-28 overflow-hidden snap-start cursor-pointer group bg-[#F8F5F0]"
                    aria-label={`View ${item.caption ?? `exterior photo ${i + 2}`}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none"
                      loading="lazy"
                    />
                    {i === heroItems.length - 2 && remainingCount > 0 && (
                      <span className="absolute inset-0 bg-white/85 flex items-center justify-center text-[#003057] text-xs tracking-[0.15em] uppercase font-semibold">
                        +{remainingCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {allItems.length > heroItems.length && (
            <button
              type="button"
              onClick={() => handleOpen(heroItem)}
              className="mt-4 w-full text-center text-[#6B7B8D] hover:text-[#003057] text-[0.6rem] tracking-[0.18em] uppercase transition-colors cursor-pointer py-1"
            >
              View all {allItems.length} photos including interior
            </button>
          )}

          {/* Listing header — light editorial layout */}
          <div className="mt-8 sm:mt-10">
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 xl:gap-12">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center bg-[#003057] text-white text-[0.58rem] tracking-[0.2em] uppercase font-semibold px-3 py-1">
                    {yachtType}
                  </span>
                  <span className="inline-flex items-center bg-[#FAFAF8] border border-[#E2DDD6] text-[#003057] text-[0.58rem] tracking-[0.2em] uppercase font-semibold px-3 py-1">
                    {yachtStatus}
                  </span>
                  <span className="text-[#6B7B8D] text-[0.62rem] tracking-[0.16em] uppercase">
                    {location}
                  </span>
                </div>
                <h1
                  className="font-display font-medium text-[#003057] leading-[1.05] mb-3"
                  style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)" }}
                >
                  {yachtName}
                </h1>
                <p className="text-[#6B7B8D] text-sm tracking-[0.12em] uppercase">
                  {builder} · {lengthFt} Feet{year > 0 && <> · {year}</>}
                </p>
              </div>

              <div className="w-full xl:w-[420px] shrink-0 space-y-4">
                <div className="border border-[#E2DDD6] bg-[#FAFAF8] px-6 py-5">
                  <p className="section-eyebrow mb-1.5">Asking Price</p>
                  <p className="font-display text-[1.85rem] sm:text-[2rem] font-medium text-[#003057] leading-tight">
                    {formattedPrice}
                  </p>
                  <p className="text-[#6B7B8D] text-xs mt-2">
                    Contact us for full pricing &amp; availability
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A8873A] text-white h-12 px-4 text-[0.62rem] tracking-[0.16em] uppercase font-semibold transition-colors"
                  >
                    <FaWhatsapp size={14} aria-hidden="true" />
                    Enquire Now
                  </a>
                  <a
                    href="#gallery"
                    className="inline-flex items-center justify-center gap-2 border border-[#003057] text-[#003057] hover:bg-[#003057] hover:text-white h-12 px-4 text-[0.62rem] tracking-[0.16em] uppercase font-semibold transition-colors"
                  >
                    <FaImages size={13} aria-hidden="true" />
                    View Gallery
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <YachtGalleryLightbox
          items={allItems}
          activeIndex={lightboxIndex}
          yachtName={yachtName}
          onClose={handleClose}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

interface HeroTileProps {
  item: GalleryItem;
  onOpen: (item: GalleryItem) => void;
  className?: string;
  showOverlay?: boolean;
  overlayCount?: number;
  priority?: boolean;
}

function HeroTile({
  item,
  onOpen,
  className = "",
  showOverlay = false,
  overlayCount = 0,
  priority = false,
}: HeroTileProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`relative overflow-hidden group cursor-pointer text-left w-full bg-[#F8F5F0] ${className}`}
      aria-label={`View ${item.caption ?? "yacht photo"}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
        loading={priority ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-[#003057]/0 group-hover:bg-[#003057]/10 transition-colors duration-300 pointer-events-none motion-reduce:transition-none" />
      {item.caption && !showOverlay && (
        <span className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-left pointer-events-none">
          <span className="inline-block bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[#003057] text-[0.55rem] tracking-[0.2em] uppercase font-semibold border border-[#E2DDD6]/80">
            {item.caption}
          </span>
        </span>
      )}
      {showOverlay && overlayCount > 0 && (
        <span className="absolute inset-0 bg-white/88 flex flex-col items-center justify-center gap-2">
          <FaImages className="text-[#C9A84C]" size={20} aria-hidden="true" />
          <span className="text-[#003057] text-xs tracking-[0.18em] uppercase font-semibold">
            +{overlayCount} Photos
          </span>
        </span>
      )}
    </button>
  );
}
