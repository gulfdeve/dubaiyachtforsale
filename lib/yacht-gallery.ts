const NUMBERED_IMAGE_PATTERN = /^[a-z]*\d+$/i;

const CAPTION_OVERRIDES: Record<string, string> = {
  galley: "Galley & Kitchen",
  "main-saloon-galley": "Saloon & Galley",
  "head-bathroom": "Bathroom",
  "head-bathroom-ensuite": "En-Suite Bathroom",
  "head-bathroom-bidet": "En-Suite Bathroom",
  "head-bathroom-vanity": "Bathroom Vanity",
};

const ACRONYMS = new Set(["vip", "tv", "bbq"]);

function titleCaseWords(words: string[]): string {
  return words
    .map((word) =>
      ACRONYMS.has(word) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export function getImageCaption(
  src: string,
  explicitCaption?: string
): string | undefined {
  if (explicitCaption?.trim()) return explicitCaption.trim();

  const filename = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  if (!filename || NUMBERED_IMAGE_PATTERN.test(filename)) return undefined;

  if (!filename.startsWith("yacht-")) return undefined;

  const descriptor = filename.slice(6);
  if (CAPTION_OVERRIDES[descriptor]) return CAPTION_OVERRIDES[descriptor];

  return titleCaseWords(descriptor.split("-"));
}

export type GalleryCategory =
  | "all"
  | "exterior"
  | "interior"
  | "decks"
  | "cabins"
  | "bridge";

export interface GalleryItem {
  src: string;
  caption?: string;
  alt: string;
  category: GalleryCategory;
  index: number;
}

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  all: "All Photos",
  exterior: "Exterior",
  interior: "Interior",
  decks: "Decks",
  cabins: "Cabins",
  bridge: "Bridge",
};

export function inferGalleryCategory(caption?: string, src?: string): GalleryCategory {
  const text = `${caption ?? ""} ${src ?? ""}`.toLowerCase();

  if (/exterior|bow|stern|profile|cruising|side-deck|port-profile/.test(text)) {
    return "exterior";
  }
  if (/saloon|lounge|galley|entertainment|dining|kitchen|bathroom|head|ensuite|vanity|bidet/.test(text)) {
    return "interior";
  }
  if (/deck|flybridge|foredeck|sun-deck|swim-platform|upper-deck|forward-deck/.test(text)) {
    return "decks";
  }
  if (/cabin|master|guest|vip|bedroom|stateroom/.test(text)) {
    return "cabins";
  }
  if (/bridge|helm|controls/.test(text)) {
    return "bridge";
  }

  return "exterior";
}

export function buildGalleryItems(
  images: string[],
  yachtName: string,
  explicitCaptions?: string[]
): GalleryItem[] {
  return images.map((src, index) => {
    const caption = getImageCaption(src, explicitCaptions?.[index]);
    return {
      src,
      caption,
      alt: caption ?? `${yachtName} photograph ${index + 1}`,
      category: inferGalleryCategory(caption, src),
      index,
    };
  });
}

export function getAvailableCategories(items: GalleryItem[]): GalleryCategory[] {
  const categories = new Set<GalleryCategory>(["all"]);
  for (const item of items) {
    categories.add(item.category);
  }
  return (["all", "exterior", "interior", "decks", "cabins", "bridge"] as const).filter(
    (c) => categories.has(c)
  );
}

const HERO_CATEGORY_PRIORITY: GalleryCategory[] = [
  "exterior",
  "decks",
  "bridge",
  "cabins",
  "interior",
];

/** Pick the best exterior-first images for the above-the-fold hero mosaic. */
export function getHeroMosaicItems(items: GalleryItem[], count = 5): GalleryItem[] {
  const picked: GalleryItem[] = [];
  const used = new Set<string>();

  for (const category of HERO_CATEGORY_PRIORITY) {
    for (const item of items) {
      if (item.category !== category || used.has(item.src)) continue;
      picked.push(item);
      used.add(item.src);
      if (picked.length >= count) return picked;
    }
  }

  for (const item of items) {
    if (used.has(item.src)) continue;
    picked.push(item);
    if (picked.length >= count) break;
  }

  return picked;
}
