// Rasterizes the vector brand sources in public/brand into the PNG / ICO
// assets browsers and social platforms need. Run with `npm run brand:assets`
// after changing any SVG in public/brand.
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brand = path.join(root, "public/brand");
const source = (file) => path.join(brand, "source", file);

const outputs = [
  { from: source("app-icon.svg"), to: "brand/apple-touch-icon.png", size: 180 },
  { from: source("app-icon.svg"), to: "brand/icon-192.png", size: 192 },
  { from: source("app-icon.svg"), to: "brand/icon-512.png", size: 512 },
  { from: source("og-image.svg"), to: "brand/og-image.png", width: 1200, height: 630 },
];

for (const { from, to, size, width = size, height = size } of outputs) {
  await sharp(from, { density: 300 })
    .resize(width, height)
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "public", to));
  console.log("wrote", to);
}

// favicon.ico: a single 32×32 PNG wrapped in an ICO container.
const png = await sharp(path.join(brand, "favicon.svg"), { density: 300 })
  .resize(32, 32)
  .png()
  .toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18); // image offset
await writeFile(path.join(root, "public/favicon.ico"), Buffer.concat([header, png]));
console.log("wrote favicon.ico");
