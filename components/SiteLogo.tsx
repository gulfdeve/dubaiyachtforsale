import Link from "next/link";

interface SiteLogoProps {
  /** Light text for transparent/dark hero backgrounds */
  inverted?: boolean;
}

export default function SiteLogo({ inverted = false }: SiteLogoProps) {
  const wordmarkColor = inverted ? "text-white" : "text-[#003057]";
  const ruleColor = inverted ? "bg-[#C9A84C]/80" : "bg-[#C9A84C]";

  return (
    <Link
      href="/"
      className="group flex items-center gap-3.5 min-w-0 focus-visible:outline-offset-4"
      aria-label="Yachts For Sale in Dubai — Home"
    >
      <span
        className={`hidden sm:block w-px h-10 shrink-0 ${ruleColor} transition-opacity group-hover:opacity-100 opacity-90`}
        aria-hidden="true"
      />
      <span className="flex flex-col leading-none min-w-0">
        <span
          className={`font-logo font-semibold uppercase tracking-[0.14em] text-[0.95rem] sm:text-[1.05rem] ${wordmarkColor} transition-colors group-hover:text-[#C9A84C]`}
        >
          Yachts For Sale in Dubai
        </span>
        <span className="mt-1.5 text-[0.5rem] sm:text-[0.52rem] tracking-[0.34em] uppercase text-[#C9A84C] font-sans font-medium">
          Dubai
        </span>
      </span>
    </Link>
  );
}
