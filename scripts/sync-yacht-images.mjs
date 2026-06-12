import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const yachtsPath = join(root, "data", "yachts.json");

/** Original numbered order → descriptive filename (from visual cataloging). */
const YACHT_IMAGE_MAP = {
  notus: [
    "yacht-exterior.jpg",
    "yacht-foredeck.jpg",
    "yacht-sun-deck.jpg",
    "yacht-upper-deck.jpg",
    "yacht-forward-deck.jpg",
    "yacht-main-saloon.jpg",
    "yacht-saloon-lounge.jpg",
    "yacht-entertainment-lounge.jpg",
    "yacht-master-cabin.jpg",
    "yacht-guest-cabin.jpg",
    "yacht-bridge.jpg",
    "yacht-helm-controls.jpg",
    "yacht-galley.jpg",
    "yacht-head-bathroom.jpg",
  ],
  lagoona: [
    "yacht-exterior-profile.jpg",
    "yacht-aft-deck.jpg",
    "yacht-main-saloon.jpg",
    "yacht-saloon-bridge.jpg",
    "yacht-entertainment-lounge.jpg",
    "yacht-galley.jpg",
    "yacht-master-cabin.jpg",
    "yacht-guest-cabin.jpg",
    "yacht-guest-cabin-vip.jpg",
    "yacht-head-bathroom.jpg",
    "yacht-head-bathroom-ensuite.jpg",
    "yacht-flybridge.jpg",
    "yacht-flybridge-lounge.jpg",
    "yacht-upper-deck-helm.jpg",
    "yacht-foredeck.jpg",
    "yacht-exterior.jpg",
    "yacht-exterior-stern-profile.jpg",
    "yacht-swim-platform.jpg",
    "yacht-exterior-bow.jpg",
    "yacht-exterior-port-profile.jpg",
  ],
  kronos: [
    "yacht-exterior-profile.jpg",
    "yacht-main-saloon.jpg",
    "yacht-saloon-lounge.jpg",
    "yacht-bridge.jpg",
    "yacht-master-cabin.jpg",
    "yacht-master-cabin-lounge.jpg",
    "yacht-master-cabin-ensuite.jpg",
    "yacht-guest-cabin-twin.jpg",
    "yacht-guest-cabin.jpg",
    "yacht-head-bathroom.jpg",
    "yacht-head-bathroom-ensuite.jpg",
    "yacht-flybridge.jpg",
    "yacht-flybridge-bar.jpg",
    "yacht-foredeck.jpg",
    "yacht-forward-deck.jpg",
    "yacht-aft-deck.jpg",
    "yacht-exterior.jpg",
    "yacht-swim-platform.jpg",
    "yacht-exterior-stern.jpg",
  ],
  poseidon: [
    "yacht-exterior-stern.jpg",
    "yacht-main-saloon.jpg",
    "yacht-saloon-lounge.jpg",
    "yacht-entertainment-lounge.jpg",
    "yacht-main-saloon-tv.jpg",
    "yacht-saloon-lounge-seating.jpg",
    "yacht-main-saloon-dining.jpg",
    "yacht-saloon-lounge-dining.jpg",
    "yacht-master-cabin.jpg",
    "yacht-master-cabin-lounge.jpg",
    "yacht-guest-cabin.jpg",
    "yacht-guest-cabin-vip.jpg",
    "yacht-head-bathroom.jpg",
    "yacht-head-bathroom-bidet.jpg",
    "yacht-head-bathroom-vanity.jpg",
    "yacht-aft-deck.jpg",
    "yacht-aft-deck-dining.jpg",
    "yacht-exterior-side-deck.jpg",
    "yacht-foredeck.jpg",
    "yacht-forward-deck.jpg",
    "yacht-flybridge.jpg",
    "yacht-aft-deck-lounge.jpg",
    "yacht-flybridge-bar.jpg",
    "yacht-flybridge-dining.jpg",
    "yacht-exterior-bow.jpg",
    "yacht-exterior.jpg",
    "yacht-exterior-profile.jpg",
    "yacht-exterior-aft.jpg",
    "yacht-exterior-stern-cruising.jpg",
    "yacht-exterior-bow-profile.jpg",
  ],
  riverside: [
    "yacht-exterior-profile.jpg",
    "yacht-aft-deck.jpg",
    "yacht-aft-deck-entrance.jpg",
    "yacht-main-saloon.jpg",
    "yacht-saloon-lounge.jpg",
    "yacht-master-cabin.jpg",
    "yacht-head-bathroom.jpg",
    "yacht-flybridge.jpg",
    "yacht-helm-controls.jpg",
    "yacht-sun-deck.jpg",
    "yacht-upper-deck.jpg",
    "yacht-exterior.jpg",
    "yacht-exterior-cruising.jpg",
  ],
  "silver-creek": [
    "yacht-exterior-profile.jpg",
    "yacht-aft-deck.jpg",
    "yacht-main-saloon.jpg",
    "yacht-saloon-lounge.jpg",
    "yacht-bridge.jpg",
    "yacht-master-cabin.jpg",
    "yacht-guest-cabin-twin.jpg",
    "yacht-guest-cabin-vip.jpg",
    "yacht-master-cabin-corridor.jpg",
    "yacht-sun-deck.jpg",
    "yacht-flybridge.jpg",
    "yacht-flybridge-lounge.jpg",
    "yacht-upper-deck-helm.jpg",
    "yacht-aft-deck-seating.jpg",
    "yacht-exterior-stern.jpg",
    "yacht-exterior-stern-cruising.jpg",
    "yacht-exterior-aft.jpg",
    "yacht-exterior.jpg",
    "yacht-exterior-port-profile.jpg",
  ],
  vassia: [
    "yacht-exterior-profile.jpg",
    "yacht-aft-deck.jpg",
    "yacht-main-saloon.jpg",
    "yacht-saloon-lounge.jpg",
    "yacht-entertainment-lounge.jpg",
    "yacht-main-saloon-galley.jpg",
    "yacht-galley.jpg",
    "yacht-guest-cabin-twin.jpg",
    "yacht-master-cabin.jpg",
    "yacht-master-cabin-bed.jpg",
    "yacht-head-bathroom.jpg",
    "yacht-flybridge.jpg",
    "yacht-flybridge-seating.jpg",
    "yacht-upper-deck.jpg",
    "yacht-foredeck.jpg",
    "yacht-exterior-stern.jpg",
    "yacht-exterior.jpg",
    "yacht-exterior-aft.jpg",
  ],
  storm: [
    "yacht-exterior-profile.jpg",
    "yacht-aft-deck.jpg",
    "yacht-saloon-lounge.jpg",
    "yacht-aft-deck-fishing.jpg",
    "yacht-bridge.jpg",
    "yacht-aft-deck-seating.jpg",
    "yacht-helm-controls.jpg",
    "yacht-foredeck.jpg",
    "yacht-forward-deck.jpg",
    "yacht-exterior.jpg",
    "yacht-exterior-cruising.jpg",
    "yacht-exterior-stern.jpg",
  ],
  thunder: [
    "yacht-exterior-profile.jpg",
    "yacht-main-saloon.jpg",
    "yacht-aft-deck.jpg",
    "yacht-bridge.jpg",
    "yacht-foredeck.jpg",
    "yacht-forward-deck.jpg",
    "yacht-forward-deck-bow.jpg",
    "yacht-exterior.jpg",
    "yacht-exterior-stern.jpg",
    "yacht-exterior-cruising.jpg",
  ],
};

const SLUG_TO_FOLDER = {
  "notus-58ft-azimut-2002": "notus",
  "lagoona-56ft-majesty": "lagoona",
  "kronos-85ft-duretti": "kronos",
  "poseidon-118ft-hatteras": "poseidon",
  "riverside-40ft-yamaha": "riverside",
  "silver-creek-61ft-majesty": "silver-creek",
  "vassia-56ft-majesty": "vassia",
  "storm-36ft-silver-craft": "storm",
  "thunder-36ft-silver-craft": "thunder",
};

const yachts = JSON.parse(readFileSync(yachtsPath, "utf8"));
const errors = [];

for (const yacht of yachts) {
  const folder = SLUG_TO_FOLDER[yacht.slug];
  if (!folder) continue;

  const files = YACHT_IMAGE_MAP[folder];
  if (!files) {
    errors.push(`No mapping for folder: ${folder}`);
    continue;
  }

  for (const file of files) {
    const fullPath = join(publicDir, folder, file);
    try {
      readFileSync(fullPath);
    } catch {
      errors.push(`Missing file: ${folder}/${file} (yacht: ${yacht.name})`);
    }
  }

  const images = files.map((f) => `/${folder}/${f}`);
  yacht.images = images;
  yacht.mainImage = images[0];
  delete yacht.imageCaptions;
}

if (errors.length > 0) {
  console.error("Errors:\n" + errors.join("\n"));
  process.exit(1);
}

writeFileSync(yachtsPath, JSON.stringify(yachts, null, 2) + "\n");
console.log(`Updated ${Object.keys(SLUG_TO_FOLDER).length} yachts in data/yachts.json`);
