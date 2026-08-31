import Link from "next/link";
import { ALL_NAV, SITE, SOCIALS } from "@/lib/content";

/**
 * Deliberately compact.
 *
 * The home page's final section is the recruitment CTA, and the requirement is
 * that the CTA and the whole footer are visible together at the bottom of the
 * page. Since the footer sits flush with the document bottom, that is only
 * possible when `CTA height + footer height <= viewport height`. An airy footer
 * broke this on every 768px-tall laptop and on every phone.
 *
 * So: tight vertical padding, and the link columns go 2-up rather than stacking
 * on small screens — a stacked footer ran to 1115px on a 390px-wide phone,
 * which no amount of CTA trimming could compensate for.
 */
export default function Footer() {
  const columns = [
    {
      heading: "Explore",
      links: ALL_NAV.map((item) => ({
        label: item.label,
        href: item.href,
        external: false,
      })),
    },
    {
      heading: "Follow",
      links: [
        ...SOCIALS.map((s) => ({
          label: `${s.label} — ${s.handle}`,
          href: s.href,
          external: true,
        })),
        { label: "GitHub", href: "https://github.com/ubcrover", external: true },
      ],
    },
  ];

  return (
    <footer className="bg-navy-950 relative border-t border-white/10">
      <div className="stripe-rule-thin h-[3px] w-full" aria-hidden />

      <div className="mx-auto max-w-[1600px] px-5 py-9 sm:px-8 sm:py-11">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr] md:gap-10">
          {/* Identity */}
          <div>
            <p className="font-display text-chalk text-2xl leading-none font-extrabold tracking-[-0.03em] sm:text-3xl">
              UBC <span className="text-amber-500">ROVER</span>
            </p>
            <p className="text-chalk-dim/70 mt-3 max-w-sm text-xs leading-relaxed">
              {SITE.blurb}
            </p>
            <p className="text-eyebrow mt-4">{SITE.tagline}</p>
          </div>

          {/* Link columns — 2-up on mobile so the footer stays short. */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:gap-10">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <p className="text-chalk-dim/70 mb-3 font-mono text-[10px] tracking-[0.18em] uppercase">
                  {col.heading}
                </p>
                <ul className="space-y-1.5">
                  {col.links.map((link) =>
                    link.external ? (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-chalk-dim/80 text-xs transition-colors hover:text-amber-500"
                        >
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-chalk-dim/80 text-xs transition-colors hover:text-amber-500"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="text-chalk-dim/70 mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-[11px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            <a
              href={`mailto:${SITE.email}`}
              className="transition-colors hover:text-amber-500"
            >
              {SITE.email}
            </a>
            <span aria-hidden className="text-chalk-dim/35 mx-2">
              /
            </span>
            {SITE.address}
            <span aria-hidden className="text-chalk-dim/35 mx-2">
              /
            </span>
            {SITE.domain}
          </p>
          <p className="font-mono tracking-[0.12em] uppercase">
            &copy; {new Date().getFullYear()} UBC Rover
          </p>
        </div>
      </div>
    </footer>
  );
}
