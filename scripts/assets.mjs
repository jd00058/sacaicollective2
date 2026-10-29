// Writes app/generated/assets.json listing which photos and partner logos exist in /public.
// Runs before dev and build, so dropping a file into public/photos or public/partners is all it takes.
// Partner logos also record their pixel size so the wall can give each one the same visual weight.
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const list = (dir) =>
  existsSync(join(root, "public", dir))
    ? readdirSync(join(root, "public", dir)).filter((f) => /\.(jpe?g|png|webp|avif|svg)$/i.test(f)).sort()
    : [];

// Reads width and height from the file header (PNG, JPEG, WebP, SVG). Falls back to a 3:2 box.
function dimensions(file) {
  const buf = readFileSync(file);
  if (buf.toString("ascii", 1, 4) === "PNG") return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    for (let i = 2; i < buf.length - 9; ) {
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  if (buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  const svg = buf.toString("utf8", 0, 2000);
  const viewBox = svg.match(/viewBox="[\d.-]+[ ,]+[\d.-]+[ ,]+([\d.]+)[ ,]+([\d.]+)"/);
  if (viewBox) return { width: Number(viewBox[1]), height: Number(viewBox[2]) };
  return { width: 3, height: 2 };
}

const manifest = {
  photos: list("photos"),
  partners: list("partners").map((file) => ({ file, ...dimensions(join(root, "public", "partners", file)) })),
};
mkdirSync(join(root, "app", "generated"), { recursive: true });
writeFileSync(join(root, "app", "generated", "assets.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`assets: ${manifest.photos.length} photos, ${manifest.partners.length} partner logos`);
