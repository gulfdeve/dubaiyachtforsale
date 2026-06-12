import { buildGalleryItems } from "@/lib/yacht-gallery";

interface YachtGalleryProps {
  yachtName: string;
  images: string[];
  totalImageCount: number;
  imageCaptions?: string[];
}

export default function YachtGallery({
  yachtName,
  images,
  totalImageCount,
  imageCaptions,
}: YachtGalleryProps) {
  if (images.length === 0) return null;

  const items = buildGalleryItems(images, yachtName, imageCaptions);
  const captionedCount = items.filter((item) => item.caption).length;

  return (
    <>
      <section className="bg-[#003057] py-20 px-6 text-center">
        <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.32em] mb-4">
          Visual Tour
        </p>
        <h2
          className="font-[family-name:var(--font-cormorant)] font-light text-white leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Explore {yachtName}
        </h2>
        <div className="w-10 h-px bg-[#C9A84C] mx-auto mt-6 mb-4" />
        <p className="text-white/40 text-xs tracking-[0.2em] uppercase">
          {totalImageCount} Photograph{totalImageCount !== 1 ? "s" : ""}
          {captionedCount > 0 ? " · Exterior & Interior" : ""}
        </p>
      </section>

      <div className="bg-[#080f18] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3px]">
        {items.map((item, index) => {
          const isFeatured = index === 0;

          return (
            <figure
              key={item.src}
              className={`group relative overflow-hidden m-0 ${
                isFeatured ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  isFeatured ? "min-h-[320px] h-full" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  loading={index < 4 ? "eager" : "lazy"}
                />
                {item.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                )}
              </div>
              {item.caption && (
                <figcaption className="absolute bottom-0 left-0 p-4 sm:p-5">
                  <p className="text-[#C9A84C] text-[0.58rem] tracking-[0.25em] uppercase mb-0.5">
                    {yachtName}
                  </p>
                  <p className="text-white font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl">
                    {item.caption}
                  </p>
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </>
  );
}
