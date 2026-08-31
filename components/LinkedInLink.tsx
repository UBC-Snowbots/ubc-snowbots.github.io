import type { Person } from "@/lib/content";

/**
 * LinkedIn button for a member card.
 *
 * LinkedIn only — the earlier version reserved three chips (GitHub, LinkedIn,
 * website) and rendered inert placeholders for the two nobody had filled in,
 * which cost a whole row on every card for no information. People without a
 * LinkedIn simply get nothing.
 *
 * Sits inline beside the name rather than on its own line, so the caption block
 * stays two lines regardless.
 */
export default function LinkedInLink({ person }: { person: Person }) {
  const link = person.links?.find((l) => l.kind === "linkedin");
  if (!link) return null;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${person.name} on LinkedIn`}
      className="text-chalk-dim/60 hover:text-navy-950 -m-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-white/15 p-1 transition-colors hover:border-amber-500 hover:bg-amber-500"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
      </svg>
    </a>
  );
}
