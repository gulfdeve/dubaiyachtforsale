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

export function buildGalleryItems(
  images: string[],
  yachtName: string,
  explicitCaptions?: string[]
) {
  return images.map((src, index) => {
    const caption = getImageCaption(src, explicitCaptions?.[index]);
    return {
      src,
      caption,
      alt: caption ?? `${yachtName} photograph ${index + 1}`,
    };
  });
}
