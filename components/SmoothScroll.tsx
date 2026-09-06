"use client";

import { useEffect } from "react";

/** Fraction of the remaining distance closed each frame at 60fps. */
const EASE = 0.11;
/** Below this, snap and stop — chasing sub-pixels keeps a rAF loop alive. */
const EPSILON = 0.4;

/**
 * Eased wheel scrolling, in the register Anduril and Relativity use: the page
 * carries a little momentum past the gesture instead of stopping dead.
 *
 * Deliberately narrow, because taking over scrolling is the easiest way to
 * ruin a site:
 *
 * - **Mouse and trackpad only.** Touch already has momentum from the platform,
 *    and re-integrating it on top produces the drifting, unstoppable feel that
 *    makes hijacked scrolling notorious. Coarse pointers get native scroll.
 * - **Wheel only.** Keyboard (space, Page Down, arrows), scrollbar drags,
 *    find-in-page and scrollIntoView are all left to the browser. Anything that
 *    moves the page by a route we did not cause resyncs the target instead of
 *    fighting it — the failure mode otherwise is the page snapping back to
 *    where this component still thinks it should be.
 * - **Off under prefers-reduced-motion**, where added inertia is exactly the
 *    thing being opted out of.
 *
 * The gesture still travels the same distance it natively would: `deltaY` is
 * added to the target untouched, so this changes how the page arrives, never
 * how far it goes.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    let target = window.scrollY;
    let raf: number | null = null;
    /**
     * The last position WE wrote.
     *
     * Distinguishing our own scrolling from everyone else's cannot be done with
     * a flag set around the scrollTo call: scroll events are dispatched
     * asynchronously, so the flag is already back to false by the time the
     * event arrives. The first version did exactly that, and every frame's own
     * event reset the target to the current position — ten 120px notches moved
     * the page 130px instead of 1200px. Comparing against the position we wrote
     * survives the async gap.
     */
    let lastSetY = window.scrollY;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const step = () => {
      const diff = target - window.scrollY;
      const next = Math.abs(diff) < EPSILON ? target : window.scrollY + diff * EASE;
      lastSetY = next;
      window.scrollTo(0, next);
      raf = Math.abs(diff) < EPSILON ? null : requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      // Leave modified wheels alone: ctrl+wheel is browser zoom, and a wheel
      // inside a scrollable child (the photo galleries) belongs to that child.
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented) return;
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const cs = getComputedStyle(el);
        if (/(auto|scroll)/.test(cs.overflowY + cs.overflowX)) {
          const scrollableY = el.scrollHeight > el.clientHeight;
          const scrollableX = el.scrollWidth > el.clientWidth;
          if (scrollableY || scrollableX) return;
        }
        el = el.parentElement;
      }

      e.preventDefault();
      target = Math.min(Math.max(target + e.deltaY, 0), maxScroll());
      if (raf === null) raf = requestAnimationFrame(step);
    };

    // Anything that moved the page without us — keyboard, anchor, restoration —
    // becomes the new truth.
    const onScroll = () => {
      // Within a pixel or two of where we last wrote? Then it was us.
      if (Math.abs(window.scrollY - lastSetY) < 2) return;
      target = window.scrollY;
      lastSetY = window.scrollY;
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    const onResize = () => {
      target = Math.min(target, maxScroll());
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
