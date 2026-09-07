"use client";

import { useEffect, useRef } from "react";
import { INQUIRY_TYPES } from "@/lib/content";

/**
 * The contact form's inquiry dropdown, pre-set from `?inquiry=` when something
 * links here with a subject already in mind - the sponsors page sends people
 * over with "Sponsorship" chosen, so they arrive at a form that already knows
 * why they came.
 *
 * The select stays UNCONTROLLED and the value is written through a ref rather
 * than held in state. Two reasons:
 *
 *  - This is a static export, so the server HTML is identical for every
 *    visitor. Reading the query string during render would make the client's
 *    first paint disagree with that HTML, which is a hydration mismatch.
 *  - Assigning `.value` in an effect is a DOM write, not a setState, so it
 *    cannot cascade a re-render the way setting state in an effect does.
 *
 * An unrecognised value is ignored rather than added, so a hand-edited URL
 * cannot inject an option that the form does not offer.
 */
export default function InquirySelect({ className }: { className?: string }) {
  const ref = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("inquiry");
    if (!wanted || !ref.current) return;
    const match = INQUIRY_TYPES.find((t) => t.toLowerCase() === wanted.toLowerCase());
    if (match) ref.current.value = match;
  }, []);

  return (
    <select
      ref={ref}
      className={className}
      id="inquiry"
      name="Inquiry Type"
      defaultValue={INQUIRY_TYPES[0]}
    >
      {INQUIRY_TYPES.map((type) => (
        <option key={type} value={type} className="bg-navy-950">
          {type}
        </option>
      ))}
    </select>
  );
}
