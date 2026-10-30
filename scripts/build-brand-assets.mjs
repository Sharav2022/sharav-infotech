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
];

for (const { from, to, size, width = size, height = size } of outputs) {
  await sharp(from, { density: 300 })
    .resize(width, height)
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "public", to));
  console.log("wrote", to);
}

// Social card: outlined type from source/og-image.svg plus the 3D hero render.
const render = await sharp(path.join(root, "public/images/3d/hero.webp"))
  .resize({ width: 640 })
  .toBuffer();
await sharp(source("og-image.svg"), { density: 150 })
  .resize(1200, 630)
  .composite([{ input: render, left: 600, top: 40 }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public/brand/og-image.png"));
console.log("wrote brand/og-image.png");

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
