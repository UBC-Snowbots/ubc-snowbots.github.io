"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/content";

/**
 * Multi-image viewer for a photo slot.
 *
 * Built on a native horizontally-scrollable, scroll-snapping strip rather than a
 * JS-driven carousel:
 *  - it works before hydration and without JS — you can still swipe or trackpad
 *    across the images; the buttons are an enhancement, not the mechanism
 *  - touch gets real momentum scrolling for free
 *  - only `scrollLeft` changes, so nothing re-renders while you drag
 *
 * The current index comes from an IntersectionObserver scoped to the strip, not
 * a scroll handler, matching the rest of the codebase.
 */
export default function PhotoGallery({ photos, alt }: { photos: Photo[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  /**
   * Slides after the first sit outside a clipped horizontal track, so a plain
   * `loading="lazy"` defers them until the click that scrolls them in — you get
   * an empty frame for as long as the fetch takes. But eager-loading every
   * slide up front would pull several megabytes for galleries that are still
   * far below the fold.
   *
   * So: stay lazy until the gallery itself reaches the vertical viewport, then
   * flip the rest to eager. Promoting a pending lazy image to eager starts its
   * load immediately (HTML spec: the lazy load resumes when the attribute
   * changes), so by the time the first next-click lands the images are already
   * in flight or done.
   */
  const [warm, setWarm] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || photos.length < 2) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.slide);
            if (!Number.isNaN(i)) setIndex(i);
          }
        }
      },
      { root: track, threshold: 0.6 },
    );

    for (const slide of track.querySelectorAll("[data-slide]")) io.observe(slide);
    return () => io.disconnect();
  }, [photos.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || photos.length < 2 || warm) return;

    // Against the document viewport (root: null), not the track — this asks
    // "has the gallery scrolled into the page yet", a different question from
    // "which slide is showing".
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setWarm(true);
      },
      { rootMargin: "400px" },
    );

    io.observe(track);
    return () => io.disconnect();
  }, [photos.length, warm]);

  const go = useCallback(
    (delta: number) => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.min(photos.length - 1, Math.max(0, index + delta));
      const smooth = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
      track.scrollTo({
        left: next * track.clientWidth,
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [index, photos.length],
  );

  const single = photos.length < 2;

  return (
    <div className="relative isolate">
      <div
        ref={trackRef}
        className={`no-scrollbar flex w-full ${single ? "" : "snap-x snap-mandatory overflow-x-auto"}`}
        // A scrollable region needs to be focusable so keyboard users can reach
        // the images even when the buttons are not used.
        tabIndex={single ? undefined : 0}
        role={single ? undefined : "group"}
        aria-label={single ? undefined : `${alt} — ${photos.length} images`}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            data-slide={i}
            className="relative aspect-[4/3] w-full shrink-0 snap-center overflow-hidden"
          >
            {photo.kind === "video" ? (
              <video
                src={photo.src}
                controls
                playsInline
                preload="metadata"
                className="bg-navy-950 absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <img
                src={photo.src}
                alt={photo.caption ?? alt}
                loading={warm ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Controls sit inside the picture box, along its bottom edge. */}
      {single ? null : (
        <div className="from-navy-950/85 pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t to-transparent p-3">
          <p className="text-chalk pointer-events-auto font-mono text-[11px] tracking-[0.16em]">
            {index + 1} / {photos.length}
          </p>

          <div className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Previous image"
              className="bg-navy-950/70 text-chalk hover:text-navy-950 disabled:hover:bg-navy-950/70 disabled:hover:text-chalk flex h-8 w-8 items-center justify-center border border-white/25 transition-colors hover:border-amber-500 hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/25"
            >
              <span aria-hidden>&#8592;</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={index === photos.length - 1}
              aria-label="Next image"
              className="bg-navy-950/70 text-chalk hover:text-navy-950 disabled:hover:bg-navy-950/70 disabled:hover:text-chalk flex h-8 w-8 items-center justify-center border border-white/25 transition-colors hover:border-amber-500 hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/25"
            >
              <span aria-hidden>&#8594;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
