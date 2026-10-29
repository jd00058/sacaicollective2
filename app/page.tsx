import { photos } from "./content";
import manifest from "./generated/assets.json";
import { getEvents } from "@/lib/luma";
import Nav from "@/components/Nav";
import Opening from "@/components/Opening";
import Marquee from "@/components/Marquee";
import Formats from "@/components/Formats";
import NameTags from "@/components/NameTags";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Partners from "@/components/Partners";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";
import type { ResolvedPhoto } from "@/components/Photo";

const assets = manifest as { photos: string[]; partners: string[] };

// Re-check Luma for new events every 30 minutes.
export const revalidate = 1800;

const resolvedPhotos: Record<string, ResolvedPhoto> = Object.fromEntries(
  Object.entries(photos).map(([key, p]) => [
    key,
    { ...p, src: assets.photos.includes(p.file) ? `/photos/${p.file}` : null },
  ]),
);

const partnerLogos = assets.partners.map((file) => ({
  src: `/partners/${file}`,
  name: file.replace(/\.[a-z]+$/i, "").replace(/[-_]+/g, " "),
}));

export default async function Home() {
  const { upcoming, past } = await getEvents();

  return (
    <>
      <Nav />
      <main>
        <Opening />
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
