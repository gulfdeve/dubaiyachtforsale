"use client";

import { useState, useMemo } from "react";
import YachtCard from "@/components/YachtCard";
import type { Yacht } from "@/types/yacht";

const YACHT_TYPES = ["All", "Motor Yacht", "Sport Cruiser", "Superyacht", "Sailing Yacht", "Catamaran"];

interface Props {
  yachts: Yacht[];
}

export default function YachtListingsClient({ yachts }: Props) {
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = useMemo(() => {
    let list = yachts;
    if (selectedType !== "All") {
      list = list.filter((y) => y.type === selectedType);
    }
    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.priceAED - b.priceAED);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.priceAED - a.priceAED);
    if (sortBy === "length") list = [...list].sort((a, b) => b.lengthFt - a.lengthFt);
    if (sortBy === "year") list = [...list].sort((a, b) => b.year - a.year);
    if (sortBy === "featured") list = [...list].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return list;
  }, [yachts, selectedType, sortBy]);

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#003057] pt-36 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Exclusive Listings
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] font-light text-4xl md:text-6xl text-white">
            Yachts for Sale
          </h1>
          <p className="text-white/60 text-base mt-4 max-w-xl">
            {yachts.length} verified luxury yachts available in the UAE. All listings personally inspected by our brokers.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-[#E2DDD6] sticky top-20 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            {YACHT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`text-xs font-medium px-4 py-2 border transition-colors cursor-pointer ${
                  selectedType === type
                    ? "bg-[#003057] border-[#003057] text-white"
                    : "border-[#E2DDD6] text-[#6B7B8D] hover:border-[#C9A84C] hover:text-[#C9A84C]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-[#E2DDD6] text-[#1D2B3A] px-4 py-2 bg-white focus:outline-none focus:border-[#C9A84C] cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year">Newest First</option>
            <option value="length">Longest First</option>
          </select>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 px-6 bg-[#F8F5F0] min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-[family-name:var(--font-cormorant)] text-2xl text-[#6B7B8D]">
                No yachts found for this filter.
              </p>
              <button
                onClick={() => setSelectedType("All")}
                className="mt-4 text-sm text-[#C9A84C] underline underline-offset-4"
              >
                Clear filter
              </button>
            </div>
          ) : (
            <>
              <p className="text-[#6B7B8D] text-xs mb-6">
                Showing {filtered.length} yacht{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((yacht) => (
                  <YachtCard key={yacht.id} yacht={yacht} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
