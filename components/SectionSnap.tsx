"use client";

import { useEffect } from "react";

/**
 * Section snapping, driven from JS rather than CSS.
 *
 * WHY NOT `scroll-snap-type: y proximity`:
 * That was the first implementation and it broke scrolling outright. With
 * full-viewport sections carrying `scroll-snap-align: start`, a slow mouse
 * wheel (~120px per notch) never escapes the current snap point's capture
 * radius — Chromium animates each notch straight back. Measured on the home
 * page at 1440x900: twelve consecutive 120px notches from the top left the page
 * at scrollY 74, while the identical input with snapping disabled reached 1440.
 * Fast wheel and trackpad flicks escaped, so it looked fine unless you scrolled
 * deliberately. `mandatory` is worse, and no CSS tuning closes the gap because
 * the capture radius is a fixed fraction of the viewport.
 *
 * WHAT THIS DOES INSTEAD:
 * Nothing at all while you are scrolling — the browser scrolls natively, so a
 * gesture can never be undone mid-flight. When scrolling settles, if a section
 * boundary happens to be close by, it eases the last few pixels into alignment.
 *
 * The guards are what make it safe:
 *  - only after `scrollend` (or a debounce where that event is unsupported), so
 *    it never fights an in-progress gesture;
 *  - only if the boundary is within a quarter of the viewport;
 *  - never backwards past where the current gesture began, so a small
 *    deliberate nudge is never reversed — that was the original bug;
 *  - never when already at the top or bottom of the document, which also keeps
 *    the footer flush at the end of the page;
 *  - disabled under `prefers-reduced-motion`, and on coarse pointers where
 *    native momentum already feels right.
 *
 * Sections opt in with the `.snap-section` class.
 */
export default function SectionSnap() {
  useEffect(() => {
    const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!motionOK.matches || !finePointer.matches) return;

    // Must match `scroll-padding-top` in globals.css.
    const HEADER_OFFSET = 120;
    const THRESHOLD = () => window.innerHeight * 0.25;

    /**
     * Where the page came to rest before the current gesture.
     *
     * This must NOT be sampled inside the scroll handler: a single wheel notch
     * often delivers exactly one scroll event, by which time scrollY is already
     * at its final value. Sampling there makes "did the user move down?"
     * always false and silently suppresses every snap. Tracking the previous
     * resting position instead gives a stable reference for the whole gesture.
     */
    let restY = window.scrollY;
    let programmatic = false;
    let debounce: ReturnType<typeof setTimeout> | undefined;

    const targets = () =>
      Array.from(document.querySelectorAll<HTMLElement>(".snap-section")).map(
        (el) => el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      );

    const onScroll = () => {
      if (programmatic) return;
      if (!("onscrollend" in window)) {
        clearTimeout(debounce);
        debounce = setTimeout(settle, 140);
      }
    };

    const settle = () => {
      if (programmatic) return;

      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const start = restY;
      restY = y;

      // At either end of the document, leave it alone — pulling away from the
      // bottom would lift the footer back off the fold.
      if (y <= 2 || y >= max - 2) return;

      let best: number | null = null;
      for (const t of targets()) {
        if (t <= 2 || t >= max - 2) continue;
        if (best === null || Math.abs(t - y) < Math.abs(best - y)) best = t;
      }
      if (best === null) return;

      const delta = best - y;
      if (Math.abs(delta) < 4 || Math.abs(delta) > THRESHOLD()) return;

      // Never rewind to or past where this gesture began — that would undo a
      // deliberate nudge, which is exactly what the CSS version got wrong.
      if (y > start && best <= start) return;
      if (y < start && best >= start) return;

      programmatic = true;
      restY = best;
      window.scrollTo({ top: best, behavior: "smooth" });
      // Release once the programmatic scroll has had time to finish; the flag
      // stops our own scrolling from re-triggering the handler.
      setTimeout(() => {
        programmatic = false;
      }, 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", settle);
    }

    return () => {
      clearTimeout(debounce);
      window.removeEventListener("scroll", onScroll);
      if ("onscrollend" in window) window.removeEventListener("scrollend", settle);
    };
  }, []);

  return null;
}
