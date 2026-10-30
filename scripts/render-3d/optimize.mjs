// Converts exported 3D renders (transparent PNG) into optimised WebP files in
// public/images/3d. Usage: node scripts/render-3d/optimize.mjs <png-folder>
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/render-3d/optimize.mjs <png-folder>");
  process.exit(1);
}
const output = path.join(root, "public/images/3d");

for (const file of (await readdir(input)).filter((f) => f.endsWith(".png"))) {
  const name = path.basename(file, ".png");
  const width = name === "hero" ? 1600 : 1200;
  // The hero poster must keep its framing so it aligns with the live canvas;
  // other renders are cropped to their content.
  let image = sharp(path.join(input, file));
  if (name !== "hero") image = sharp(await image.trim({ threshold: 1 }).toBuffer());
  const info = await image
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 90, effort: 6 })
    .toFile(path.join(output, `${name}.webp`));
  console.log(`${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}
