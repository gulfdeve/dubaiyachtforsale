import { chromium } from "playwright";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "http://localhost:3000";

const SLUGS = [
  "notus-58ft-azimut-2002",
  "lagoona-56ft-majesty",
  "kronos-85ft-duretti",
  "poseidon-118ft-hatteras",
  "riverside-40ft-yamaha",
  "silver-creek-61ft-majesty",
  "vassia-56ft-majesty",
  "storm-36ft-silver-craft",
  "thunder-36ft-silver-craft",
];

const yachts = JSON.parse(
  readFileSync(join(__dirname, "..", "data", "yachts.json"), "utf8")
);

const browser = await chromium.launch();
const page = await browser.newPage();
const results = [];

for (const slug of SLUGS) {
  const yacht = yachts.find((y) => y.slug === slug);
  const url = `${BASE_URL}/yachts/${slug}`;
  await page.goto(url, { waitUntil: "networkidle" });

  const galleryData = await page.evaluate(() =>
    Array.from(document.querySelectorAll("figure")).map((fig) => {
      const img = fig.querySelector("img");
      return {
        src: img?.getAttribute("src") ?? "",
        caption: fig.querySelector("figcaption p:last-child")?.textContent ?? null,
        loaded: (img?.naturalWidth ?? 0) > 0,
      };
    })
  );

  const numberedPaths = yacht.images.filter((src) => /\/[A-Za-z]+\d+\.jpg$/.test(src));
  const brokenImages = galleryData.filter((item) => !item.loaded);
  const missingCaptions = galleryData.filter(
    (item) => item.src.includes("yacht-") && !item.caption
  );

  results.push({
    slug,
    expectedImages: yacht.images.length,
    galleryFigures: galleryData.length + 1,
    numberedPaths,
    brokenImages: brokenImages.length,
    missingCaptions: missingCaptions.length,
    ok:
      numberedPaths.length === 0 &&
      brokenImages.length === 0 &&
      missingCaptions.length === 0,
  });
}

await browser.close();

console.log(JSON.stringify(results, null, 2));

const failed = results.filter((result) => !result.ok);
if (failed.length > 0) {
  process.exit(1);
}
