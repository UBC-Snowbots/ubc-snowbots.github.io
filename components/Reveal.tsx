"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll-reveal primitive.
 *
 * Perf notes — why this is built the way it is:
 *  - ONE IntersectionObserver is shared by every <Reveal> on the page. Creating
 *    an observer per element is the usual cause of jank on long pages; a single
 *    observer keeps the work O(1) per scroll frame regardless of element count.
 *  - Elements unobserve themselves the moment they reveal, so the observer set
 *    shrinks as you scroll instead of growing.
 *  - The animation itself is pure CSS (see `[data-reveal]` in globals.css) and
 *    only touches opacity/transform, so it runs on the compositor. React does
 *    no per-frame work at all.
 *  - No state, so revealing never triggers a re-render.
 */

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer?.unobserve(entry.target);
          }
        }
      },
      // Fire slightly before the element reaches the viewport edge so the
      // motion reads as "already settling" rather than "popping in late".
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
  }
  return observer;
}

type RevealProps = {
  children: ReactNode;
  /** Stagger, in ms. Applied via CSS custom property, not JS timers. */
  delay?: number;
  className?: string;
  as?: ElementType;
  /**
   * Renders already-revealed in the SERVER HTML, skipping the observer.
   *
   * Use this for anything in the first viewport. A plain <Reveal> starts at
   * `opacity: 0` in the static markup and is only released once React hydrates,
   * so gating above-the-fold content on it means the headline is invisible
   * until the JS bundle lands — about a second on desktop and far worse on a
   * phone. The stagger still applies, so the entrance is unchanged for anyone
   * whose JS arrives quickly; it simply can no longer hide the hero.
   */
  initiallyVisible?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  initiallyVisible = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (initiallyVisible) return;

    const node = ref.current;
    if (!node) return;

    const io = getObserver();
    if (!io) {
      // No IntersectionObserver (very old browser): show content immediately
      // rather than leaving it invisible forever.
      node.dataset.revealed = "true";
      return;
    }

    io.observe(node);
    return () => io.unobserve(node);
  }, [initiallyVisible]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-revealed={initiallyVisible ? "true" : undefined}
      className={className}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
