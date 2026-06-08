"use client";

import Link from "next/link";
import { FaRuler, FaCalendarAlt, FaBed, FaMapMarkerAlt } from "react-icons/fa";
import type { Yacht } from "@/types/yacht";

interface YachtCardProps {
  yacht: Yacht;
}

function formatPrice(aed: number): string {
  if (aed >= 1_000_000) {
    return `AED ${(aed / 1_000_000).toFixed(1)}M`;
  }
  return `AED ${aed.toLocaleString()}`;
}

export default function YachtCard({ yacht }: YachtCardProps) {
  return (
    <Link
      href={`/yachts/${yacht.slug}`}
      className="group block bg-white border border-[#E2DDD6] hover:border-[#C9A84C] hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-56 bg-[#F8F5F0] overflow-hidden">
        <img
          src={yacht.mainImage}
          alt={yacht.name}
          width={600}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80";
          }}
          loading="lazy"
        />
        {/* Type badge */}
        <span className="absolute top-3 left-3 bg-[#003057] text-white text-[0.65rem] font-medium tracking-[0.12em] uppercase px-3 py-1">
          {yacht.type}
        </span>
        {/* Featured badge */}
        {yacht.isFeatured && (
          <span className="absolute top-3 right-3 bg-[#C9A84C] text-white text-[0.65rem] font-medium tracking-[0.12em] uppercase px-3 py-1">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name & Builder */}
        <div className="mb-3">
          <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-xl text-[#003057] leading-tight group-hover:text-[#C9A84C] transition-colors">
            {yacht.name}
          </h3>
          <p className="text-[#6B7B8D] text-xs tracking-wide mt-0.5">
            {yacht.builder}
          </p>
        </div>

        {/* Specs row */}
        <div className="grid grid-cols-3 gap-2 border-t border-[#E2DDD6] pt-4 mt-3">
          <div className="flex flex-col items-center text-center gap-1">
            <FaRuler className="text-[#C9A84C]" size={13} />
            <span className="text-[#1D2B3A] text-sm font-medium">{yacht.lengthFt}ft</span>
            <span className="text-[#6B7B8D] text-[0.65rem] uppercase tracking-wide">Length</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <FaCalendarAlt className="text-[#C9A84C]" size={13} />
            <span className="text-[#1D2B3A] text-sm font-medium">{yacht.year}</span>
            <span className="text-[#6B7B8D] text-[0.65rem] uppercase tracking-wide">Year</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <FaBed className="text-[#C9A84C]" size={13} />
            <span className="text-[#1D2B3A] text-sm font-medium">{yacht.cabins}</span>
            <span className="text-[#6B7B8D] text-[0.65rem] uppercase tracking-wide">Cabins</span>
          </div>
        </div>

        {/* Location & Price */}
        <div className="mt-4 pt-4 border-t border-[#E2DDD6] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#6B7B8D] text-xs">
            <FaMapMarkerAlt size={11} />
            <span>{yacht.location}</span>
          </div>
          <span className="font-[family-name:var(--font-cormorant)] font-semibold text-lg text-[#003057]">
            {formatPrice(yacht.priceAED)}
          </span>
        </div>
      </div>
    </Link>
  );
}
