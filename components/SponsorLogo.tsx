"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Sponsor } from "@/lib/content";

const PANEL_MAX = 360;
const GAP = 10;
const EDGE = 12;

/**
 * A sponsor logo chip that reveals that sponsor's write-up on hover.
 *
 * Everything awkward here is because a hover panel has to survive three things
 * a CSS-only `:hover` panel does not, each of which broke a first attempt:
 *
 *  1. **Touch has no hover.** Gating on :hover alone hides the writing from
 *     every phone and tablet with no way to open it. So it also opens on
 *     tap/focus. But on touch the event order is focus -> click, so a naive
 *     click-toggle closed the panel that focus had just opened, and tapping
 *     appeared to do nothing at all. The toggle therefore keys off whether the
 *     panel was open when the press *started*, not when the click landed.
 *
 *  2. **Keyboard focus scrolls.** Tabbing to an off-screen chip makes the
 *     browser scroll it into view. An earlier version closed the panel on any
 *     scroll, so it closed itself instantly on every keyboard focus. Scrolling
 *     now re-anchors the panel instead of dismissing it.
 *
 *  3. **Edges, both axes.** The chips sit in a grid inside a padded section, so
 *     an absolutely-positioned panel on an edge column would be clipped — and
 *     silently, since the body is `overflow-x: hidden`. The placement below
 *     clamps to the viewport on both axes, flipping above the chip when there
 *     is no room under it. It measures the panel before placing it, which is
 *     why this is a layout effect rather than styles from render: it runs after
 *     the DOM is up but before paint, so nothing is seen mispositioned.
 *
 *  4. **`position: fixed` is not enough on its own.** Fixed positioning is
 *     relative to the viewport only while no ancestor has a transform, filter
 *     or containment — any of those become the containing block instead. Every
 *     chip here sits inside <Reveal>, which animates with translate3d, so the
 *     panel was being positioned inside that box: computed top 388px, actual
 *     top 1008px in a 900px viewport. Hence the portal to document.body, which
 *     is the only reliable way out of a transformed ancestor.
 */
export default function SponsorLogo({ logo, blurb }: { logo: Sponsor; blurb?: string }) {
  const chipRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const panelId = useId();

  /** Was the panel already open when this press began? Drives the tap toggle. */
  const openAtPressStart = useRef(false);
  const pointerType = useRef("");

  const place = useCallback(() => {
    const chip = chipRef.current;
    const panel = panelRef.current;
    if (!chip || !panel) return;

    const r = chip.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(PANEL_MAX, vw - EDGE * 2);

    // Width must be applied BEFORE the height is read. Measuring first gave the
    // height of an unconstrained shrink-to-fit box, so every panel was placed
    // against a height it would never actually have.
    panel.style.width = `${w}px`;
    const h = panel.offsetHeight;

    const left = Math.min(Math.max(r.left + r.width / 2 - w / 2, EDGE), vw - w - EDGE);

    // Prefer below the chip; flip above when it would overflow; if neither
    // side fits, sit it against the bottom edge rather than off-screen.
    let top = r.bottom + GAP;
    if (top + h > vh - EDGE) {
      const above = r.top - h - GAP;
      top = above >= EDGE ? above : Math.max(EDGE, vh - h - EDGE);
    }

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // Re-anchor rather than dismiss: dismissing on scroll made keyboard focus
    // impossible, since focusing an off-screen chip scrolls the page.
    let frame = 0;
    const reflow = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };
    window.addEventListener("scroll", reflow, { passive: true });
    window.addEventListener("resize", reflow);
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", reflow);
      window.removeEventListener("resize", reflow);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, place]);

  const chip = (
    <div
      ref={chipRef}
      className="bg-chalk/92 relative flex aspect-[3/2] items-center justify-center rounded-sm p-5"
    >
      {/* Light chip. These marks are a mix of transparent PNGs and opaque JPEGs
          drawn on white, so a knockout filter cannot work across the set — it
          flattens the opaque ones into solid slabs. Giving every logo the light
          ground it was designed for is what keeps all fifteen legible. */}
      <img
        src={logo.src}
        alt={logo.name}
        loading="lazy"
        decoding="async"
        className="max-h-full max-w-full object-contain"
      />
      {blurb ? (
        // Without a marker, a logo that opens a panel looks identical to one
        // that does not, and nobody discovers the writing behind it.
        <span
          aria-hidden
          className="text-navy-950 absolute right-1.5 bottom-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 font-mono text-[11px] leading-none font-bold"
        >
          +
        </span>
      ) : null}
    </div>
  );

  if (!blurb) return chip;

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={`${logo.name} — what their support built`}
        className="block w-full cursor-pointer text-left transition-transform duration-200 hover:-translate-y-0.5"
        onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
        onPointerDown={(e) => {
          pointerType.current = e.pointerType;
          openAtPressStart.current = open;
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => {
          // Mouse already opened it on enter; a click would only fight hover.
          if (pointerType.current === "mouse") return;
          setOpen(!openAtPressStart.current);
          pointerType.current = "";
        }}
      >
        {chip}
      </button>

      {open
        ? createPortal(
            <div
              ref={panelRef}
              id={panelId}
              role="tooltip"
              className="border-navy-600 bg-navy-900 fixed z-50 border p-5 shadow-2xl shadow-black/50"
            >
              <p className="font-display text-chalk text-base font-bold tracking-[-0.01em]">
                {logo.name}
              </p>
              <p className="text-chalk-dim/85 mt-2.5 text-sm leading-relaxed">{blurb}</p>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
