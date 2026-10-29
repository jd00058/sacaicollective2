// Writes app/generated/assets.json listing which photos and partner logos exist in /public.
// Runs before dev and build, so dropping a file into public/photos or public/partners is all it takes.
import { mkdirSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const list = (dir) =>
  existsSync(join(root, "public", dir))
    ? readdirSync(join(root, "public", dir)).filter((f) => /\.(jpe?g|png|webp|avif|svg)$/i.test(f)).sort()
    : [];

const manifest = { photos: list("photos"), partners: list("partners") };
mkdirSync(join(root, "app", "generated"), { recursive: true });
writeFileSync(join(root, "app", "generated", "assets.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`assets: ${manifest.photos.length} photos, ${manifest.partners.length} partner logos`);
