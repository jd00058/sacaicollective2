import Image from "next/image";
import { Camera } from "lucide-react";

export type ResolvedPhoto = { src: string | null; alt: string; shot: string; file: string };

// Renders the real photo when one exists in /public/photos, otherwise a designed
// placeholder that says which shot belongs there.
export default function Photo({
  photo,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  priority = false,
}: {
  photo: ResolvedPhoto;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  if (photo.src) {
    return (
      <div className={`relative overflow-hidden bg-navy ${className}`}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={photo.alt}
      data-placeholder={`public/photos/${photo.file}`}
      className={`relative isolate overflow-hidden bg-navy ${className}`}
    >
      <div aria-hidden className="absolute -left-1/4 -top-1/3 size-[90%] rounded-full bg-blue/45 blur-[60px]" />
      <div aria-hidden className="absolute -bottom-1/3 -right-1/4 size-[70%] rounded-full bg-orange/25 blur-[70px]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(rgb(245 240 230 / 0.9) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* Viewfinder corners */}
      <div aria-hidden className="absolute inset-4">
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-cream/40" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-cream/40" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-cream/40" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-cream/40" />
      </div>
      <div className="absolute inset-x-6 bottom-6 flex items-center gap-2.5 text-[0.8rem] text-cream/80">
        <Camera className="size-4 shrink-0" aria-hidden />
        <span>Photo: {photo.shot}</span>
      </div>
    </div>
  );
}
