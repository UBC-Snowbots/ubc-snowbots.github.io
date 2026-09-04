import PhotoGallery from "./PhotoGallery";
import type { Photo } from "@/lib/content";

/**
 * A slot in the page that will hold one photo, several, or nothing yet.
 *
 * With photos it renders them (a gallery with controls when there is more than
 * one). Without, it renders a labelled frame at the same aspect ratio carrying
 * the slot id and the filenames expected there — so the page never reflows when
 * images land, and the pending state is self-documenting: anyone can see which
 * file is supposed to go where and correct it if the mapping is wrong.
 */
export default function PhotoSlot({
  photos,
  alt,
  slot,
  caption,
  expects,
  className = "",
}: {
  photos?: Photo[];
  alt: string;
  slot: string;
  caption?: string;
  /** Source filenames earmarked for this slot, shown in the placeholder. */
  expects?: string[];
  className?: string;
}) {
  const has = photos && photos.length > 0;

  return (
    <figure className={className}>
      <div className="relative overflow-hidden border border-white/10">
        {has ? (
          <PhotoGallery photos={photos} alt={alt} />
        ) : (
          <div className="grid-wash bg-navy-900 flex aspect-[4/3] flex-col items-center justify-center border border-dashed border-amber-500/40 p-6 text-center">
            <p className="font-mono text-[11px] tracking-[0.22em] text-amber-500 uppercase">
              Photo slot
            </p>
            <p className="font-display text-chalk mt-3 text-2xl font-extrabold tracking-[-0.02em]">
              {slot}
            </p>
            <p className="text-chalk-dim/60 mt-3 max-w-xs text-xs leading-relaxed">
              {alt}
            </p>

            {expects?.length ? (
              <ul className="mt-4 space-y-1">
                {expects.map((name) => (
                  <li
                    key={name}
                    className="text-chalk-dim/45 font-mono text-[10px] tracking-[0.08em]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="text-chalk-dim/60 mt-3 font-mono text-[11px] tracking-[0.1em]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
