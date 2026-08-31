/**
 * THE ROVER — DISABLED.
 *
 * This file is intentionally NOT named `page.tsx`, so Next does not route it.
 * There is currently no /rover page on the site.
 *
 * WHY IT IS OFF
 * The subsystem write-ups that used to live here (chassis, drivetrain, arm, end
 * effector, rover lab, power, comms, control base) were moved into each
 * sub-team's own "What we do" section on /subteams/<slug>, next to the people
 * who actually build them. Nothing was lost in the move.
 *
 * WHAT THIS PAGE SHOULD BECOME
 * A single scroll-driven sequence of the whole rover: it starts assembled,
 * pulls apart into an exploded view as you scroll, and surfaces each subsystem's
 * detail as its part comes forward — all on one page, no navigation.
 *
 * WHAT IT NEEDS FIRST
 *  1. A rigged CAD export. Web-friendly GLB/GLTF, with each subsystem as a
 *     NAMED node so parts can be addressed and moved independently. A single
 *     welded mesh cannot be exploded.
 *  2. Named nodes matching the SUBSYSTEMS slugs in lib/content.ts, so the copy
 *     alongside the model needs no second mapping table.
 *  3. A renderer. `three` + `@react-three/fiber` + `@react-three/drei`, driven
 *     by scroll progress rather than a timeline.
 *
 * THINGS TO GET RIGHT WHEN IT IS BUILT
 *  - Keep it off the critical path: the model must lazy-load, and the page has
 *    to render its text content before (and without) WebGL. A CAD export is
 *    easily tens of MB.
 *  - Honour `prefers-reduced-motion`: fall back to a static exploded still plus
 *    the same subsystem copy.
 *  - Provide a non-WebGL fallback — this is a recruitment site, and a blank
 *    canvas on an old laptop is worse than a photo.
 *
 * TO RE-ENABLE
 * Rename this file to `page.tsx`, add `{ label: "The Rover", href: "/rover" }`
 * back to NAV in lib/content.ts, and set `CAD.modelUrl`.
 *
 * The previous NASA-style implementation is in git history if it is ever wanted
 * back:  git log --oneline -- app/rover/page.tsx
 */

export {};
