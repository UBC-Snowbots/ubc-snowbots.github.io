"use client";

import { useEffect, useRef, useState } from "react";

/** Glyphs the scramble cycles through. Monospace-safe, no letters that could
 *  momentarily spell something. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#%$@&";

const FRAME_MS = 19;
/** Frames a character spends scrambling before it locks to its real value.
 *  Tuned so the longest label (~30 chars) settles in about 0.7s: at the first
 *  values it took 1.1s, which is long enough that a pointer passing over the
 *  tile never saw it finish. */
const SETTLE = 5;
/** Frames between successive characters starting to settle. */
const STAGGER = 1.2;

/**
 * Text that resolves out of noise, the way Anduril's labels do.
 *
 * Each character locks in on its own schedule, left to right, so the string
 * "develops" rather than flipping. Spaces never scramble — keeping the word
 * gaps fixed is what stops it reading as random junk mid-animation.
 *
 * The DOM always holds the final text: the scrambled glyphs are painted into a
 * sibling marked aria-hidden, and the real string sits in a visually-hidden
 * span. So assistive tech and page-search see the sentence, never the noise,
 * and if JS never runs the real text is what shows.
 */
export default function DecodeText({
  text,
  active,
  className = "",
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  // "" means nothing has been painted yet; the settled text is DERIVED below
  // rather than written with setState. An earlier version reset it inside the
  // effect on every deactivate, which is a synchronous setState in an effect —
  // the cascading-render pattern the lint rule exists to catch.
  const [display, setDisplay] = useState("");
  const frame = useRef(0);
  const raf = useRef<number | null>(null);
  const last = useRef(0);

  useEffect(() => {
    if (!active) return;
    // Someone who asked for less motion gets the text, not the animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    frame.current = 0;
    last.current = 0;

    const tick = (now: number) => {
      if (now - last.current >= FRAME_MS) {
        last.current = now;
        const f = frame.current++;

        let out = "";
        let done = true;
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " ") {
            out += " ";
            continue;
          }
          const startsAt = i * STAGGER;
          if (f >= startsAt + SETTLE) {
            out += ch;
          } else if (f >= startsAt) {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            done = false;
          } else {
            // Not yet reached: blank, so the line grows into place.
            out += " ";
            done = false;
          }
        }

        setDisplay(out);
        if (done) {
          raf.current = null;
          return;
        }
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [active, text]);

  // Inactive always shows the real string, so a fast pointer in-and-out can
  // never strand a half-decoded line on screen.
  const shown = active && display ? display : text;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden style={{ whiteSpace: "pre-wrap" }}>
        {shown}
      </span>
    </span>
  );
}
