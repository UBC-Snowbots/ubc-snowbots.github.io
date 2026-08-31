import LeadLinks from "./LeadLinks";
import Reveal from "./Reveal";
import type { Lead } from "@/lib/content";

/**
 * Portrait above a solid caption block carrying name and role — the card shape
 * from UBC Formula Electric's team page, in our palette.
 *
 * Portraits are static by request: no grayscale, no hover zoom.
 */
export function MemberCard({ person, delay = 0 }: { person: Lead; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <figure className="bg-navy-900 h-full border border-white/10">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={person.image}
            alt={person.name}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: person.focal ?? "50% 30%" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <figcaption className="p-4 sm:p-5">
          <p className="font-display text-chalk text-base leading-tight font-bold tracking-[-0.01em] sm:text-lg">
            {person.name}
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-amber-500/80 uppercase">
            {person.role}
          </p>
          <LeadLinks links={person.links} name={person.name} />
        </figcaption>
      </figure>
    </Reveal>
  );
}

/**
 * Grid of member cards. When a sub-team has no roster yet it renders a labelled
 * placeholder rather than an empty band, so it is obvious the page is waiting on
 * content instead of looking broken.
 */
export default function MemberGrid({
  people,
  emptyNote,
}: {
  people: Lead[];
  emptyNote?: string;
}) {
  if (!people.length) {
    return (
      <div className="bg-navy-900 border border-dashed border-amber-500/40 p-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-amber-500 uppercase">
          Placeholder
        </p>
        <p className="text-chalk-dim/75 mt-3 text-sm leading-relaxed">
          {emptyNote ?? "Roster to come."}
        </p>
      </div>
    );
  }

  return (
    /* Widths are calc((100% - (n-1) * gap) / n) for 2 / 3 / 5 columns, so the
       rows match the old grid exactly while a short final row stays centred. */
    <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
      {people.map((person, i) => (
        <div
          key={person.name}
          className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.834rem)] lg:w-[calc(20%-1rem)]"
        >
          <MemberCard person={person} delay={(i % 5) * 60} />
        </div>
      ))}
    </div>
  );
}
