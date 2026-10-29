import { photos } from "./content";
import manifest from "./generated/assets.json";
import { getEvents } from "@/lib/luma";
import Nav from "@/components/Nav";
import Opening from "@/components/Opening";
import RoomReveal from "@/components/RoomReveal";
import Marquee from "@/components/Marquee";
import Formats from "@/components/Formats";
import NameTags from "@/components/NameTags";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Partners from "@/components/Partners";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";
import type { ResolvedPhoto } from "@/components/Photo";

const assets = manifest as { photos: string[]; partners: { file: string; width: number; height: number }[] };

// Re-check Luma for new events every 30 minutes.
export const revalidate = 1800;

const resolvedPhotos: Record<string, ResolvedPhoto> = Object.fromEntries(
  Object.entries(photos).map(([key, p]) => [
    key,
    { ...p, src: assets.photos.includes(p.file) ? `/photos/${p.file}` : null },
  ]),
);

// The file name becomes the alt text: city-of-rancho-cordova.png → "City of Rancho Cordova". Words with digits keep their case (n8n).
const smallWords = new Set(["of", "and", "the", "for", "at"]);
const partnerLogos = assets.partners.map(({ file, width, height }) => ({
  src: `/partners/${file}`,
  width,
  height,
  name: file
    .replace(/\.[a-z]+$/i, "")
    .split(/[-_]+/)
    .map((w, i) => (/\d/.test(w) || (i > 0 && smallWords.has(w)) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" "),
}));

export default async function Home() {
  const { upcoming, past } = await getEvents();

  return (
    <>
      <Nav />
      <main>
        <Opening />
        <RoomReveal photos={resolvedPhotos} />
        <Marquee />
        <Formats photos={resolvedPhotos} />
        <NameTags />
        <Events upcoming={upcoming} past={past} />
        <Gallery photos={resolvedPhotos} />
        <Partners logos={partnerLogos} />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
