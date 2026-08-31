import LinkedInLink from "./LinkedInLink";
import Reveal from "./Reveal";
import type { Person } from "@/lib/content";

/** "Jennifer Phung" -> "JP". Used when there is no portrait. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Portrait above a solid caption block carrying name and role — the card shape
 * from UBC Formula Electric's team page, in our palette.
 *
 * The role is passed in rather than stored on the person: several people hold
 * two roles (captain and a sub-team lead, or two sub-teams), so the same person
 * renders with a different title depending on which band they appear in.
 *
 * Portraits are static by request: no grayscale, no hover zoom. Where someone
 * has no photo yet the card shows their initials rather than a stock
 * silhouette, which reads as deliberate instead of broken.
 */
export function MemberCard({
  person,
  role,
  delay = 0,
}: {
  person: Person;
  role: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <figure className="bg-navy-900 h-full border border-white/10">
        <div className="relative aspect-[3/4] overflow-hidden">
          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: person.focal ?? "50% 30%" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="grid-wash bg-navy-950 absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <span className="font-display text-4xl font-extrabold tracking-[-0.03em] text-amber-500/45 sm:text-5xl">
                {initials(person.name)}
              </span>
            </div>
          )}
        </div>
        <figcaption className="p-4 sm:p-5">
          {/* Name and LinkedIn share a row so the caption is two lines whether
              or not the person has a link. */}
          <div className="flex items-start justify-between gap-3">
            <p className="font-display text-chalk text-base leading-tight font-bold tracking-[-0.01em] sm:text-lg">
              {person.name}
            </p>
            <LinkedInLink person={person} />
          </div>
          <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-amber-500/80 uppercase">
            {role}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

/**
 * Grid of member cards. Widths are calc((100% - (n-1) * gap) / n) for 2 / 3 / 5
 * columns, so full rows tile exactly while a short final row stays centred — a
 * CSS grid would pin that row to the left.
 */
export default function MemberGrid({
  people,
  role,
  emptyNote,
}: {
  people: Person[];
  role: string;
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
    <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
      {people.map((person, i) => (
        <div
          key={person.name}
          className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.834rem)] lg:w-[calc(20%-1rem)]"
        >
          <MemberCard person={person} role={role} delay={(i % 5) * 60} />
        </div>
      ))}
    </div>
  );
}
