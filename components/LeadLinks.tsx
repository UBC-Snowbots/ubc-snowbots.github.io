import type { LeadLink } from "@/lib/content";

/**
 * Per-lead social buttons.
 *
 * Opt-in by design: a lead appears with links only if they added entries to
 * their own record in lib/content.ts. When the list is empty we render inert,
 * dimmed placeholder chips so the slot is visibly reserved on the page — that
 * shows the team where their links will land without publishing a profile
 * nobody asked to publish.
 *
 * TODO(team): each lead adds their own `links: [{ kind, href }]`.
 */

const ICONS: Record<LeadLink["kind"], { label: string; path: string }> = {
  github: {
    label: "GitHub",
    path: "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
  },
  linkedin: {
    label: "LinkedIn",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z",
  },
  website: {
    label: "Website",
    path: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm7.94 7h-3.2a15.6 15.6 0 0 0-1.4-3.62A10.03 10.03 0 0 1 19.94 7ZM12 2.06c.83 1.2 1.48 2.53 1.92 4.94h-3.84c.44-2.41 1.09-3.74 1.92-4.94ZM2.26 14a9.9 9.9 0 0 1 0-4h3.66a20.6 20.6 0 0 0 0 4H2.26Zm.82 2h3.2c.33 1.28.8 2.5 1.4 3.62A10.03 10.03 0 0 1 3.08 16Zm3.2-8h-3.2a10.03 10.03 0 0 1 4.6-3.62A15.6 15.6 0 0 0 6.28 8ZM12 21.94c-.83-1.2-1.48-2.53-1.92-4.94h3.84c-.44 2.41-1.09 3.74-1.92 4.94ZM14.34 15H9.66a18.4 18.4 0 0 1 0-6h4.68a18.4 18.4 0 0 1 0 6Zm.6 4.62c.6-1.12 1.07-2.34 1.4-3.62h3.2a10.03 10.03 0 0 1-4.6 3.62ZM18.08 14a20.6 20.6 0 0 0 0-4h3.66a9.9 9.9 0 0 1 0 4h-3.66Z",
  },
};

const chip =
  "flex h-8 w-8 items-center justify-center border transition-colors duration-200";

export default function LeadLinks({ links, name }: { links?: LeadLink[]; name: string }) {
  const has = links && links.length > 0;

  if (!has) {
    return (
      <ul className="mt-3 flex gap-2" aria-label={`${name} — links not yet added`}>
        {(["github", "linkedin", "website"] as const).map((kind) => (
          <li key={kind}>
            <span
              title="Placeholder — this lead has not added a link yet"
              className={`${chip} border-white/10 text-white/15`}
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                <path d={ICONS[kind].path} />
              </svg>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="mt-3 flex gap-2">
      {links.map((link) => (
        <li key={link.kind}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${name} on ${ICONS[link.kind].label}`}
            className={`${chip} text-chalk-dim/70 hover:text-navy-950 border-white/20 hover:border-amber-500 hover:bg-amber-500`}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d={ICONS[link.kind].path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
