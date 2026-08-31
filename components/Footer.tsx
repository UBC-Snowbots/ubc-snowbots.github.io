import Link from "next/link";
import { NAV, SITE, SOCIALS } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-navy-950 relative border-t border-white/10">
      <div className="stripe-rule-thin h-[3px] w-full" aria-hidden />

      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-chalk text-4xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">
              UBC <span className="text-amber-500">ROVER</span>
            </p>
            <p className="text-chalk-dim/70 mt-5 max-w-sm text-sm leading-relaxed">
              {SITE.blurb} Hands-on experience in robotics, software, and mechanical
              design.
            </p>
            <p className="text-eyebrow mt-8">{SITE.triad.join(" ")}</p>
          </div>

          <nav aria-label="Footer">
            <p className="text-chalk-dim/70 mb-5 font-mono text-[11px] tracking-[0.18em] uppercase">
              Explore
            </p>
            <ul className="space-y-3">
              {[...NAV, { label: "Join Us", href: "/join" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-chalk-dim/80 text-sm transition-colors hover:text-amber-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-chalk-dim/70 mb-5 font-mono text-[11px] tracking-[0.18em] uppercase">
              Contact
            </p>
            <ul className="text-chalk-dim/80 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-amber-500"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="leading-relaxed">{SITE.address}</li>
            </ul>

            <p className="text-chalk-dim/70 mt-8 mb-5 font-mono text-[11px] tracking-[0.18em] uppercase">
              Follow
            </p>
            <ul className="text-chalk-dim/80 space-y-3 text-sm">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-amber-500"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/ubcrover"
                  className="transition-colors hover:text-amber-500"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-chalk-dim/70 mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} UBC Rover. University of British Columbia.
          </p>
          <p className="font-mono tracking-[0.14em] uppercase">{SITE.domain}</p>
        </div>
      </div>
    </footer>
  );
}
