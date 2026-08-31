import Link from "next/link";
import MemberGrid, { MemberCard } from "./MemberCard";
import Reveal from "./Reveal";
import TeamBanner from "./TeamBanner";
import { TEAM_PHOTO, type Person } from "@/lib/content";

/**
 * One band on /team: the header photo plus the people in it.
 *
 * Layout is chosen from how many people there are, so no band ever leaves a
 * mostly-empty row:
 *
 *   0  full-width band, then a placeholder note
 *   1  band on the left, the single card on the right
 *   2+ people split evenly either side of the band — 1|banner|1, 2|banner|2
 *
 * The split puts the first half on the left in listed order, so the ordering in
 * lib/content.ts controls who appears where.
 */
export default function TeamSection({
  title,
  eyebrow,
  image = TEAM_PHOTO,
  people,
  role,
  emptyNote,
  footerHref,
  footerLabel,
}: {
  title: string;
  eyebrow?: string;
  image?: string;
  people: Person[];
  role: string;
  emptyNote?: string;
  footerHref?: string;
  footerLabel?: string;
}) {
  const footer =
    footerHref && footerLabel ? (
      <Reveal>
        <Link
          href={footerHref}
          className="group mt-6 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-amber-500 uppercase"
        >
          <span className="border-b border-amber-500/40 pb-1 transition-colors group-hover:border-amber-500">
            {footerLabel}
          </span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &#8594;
          </span>
        </Link>
      </Reveal>
    ) : null;

  // No one on record — keep the full-width band and say so plainly.
  if (people.length === 0) {
    return (
      <div>
        <TeamBanner title={title} eyebrow={eyebrow} image={image} />
        <section className="mx-auto max-w-[1600px] px-5 pt-7 pb-12 sm:px-8 sm:pt-9 sm:pb-16">
          <MemberGrid people={people} role={role} emptyNote={emptyNote} />
          {footer}
        </section>
      </div>
    );
  }

  const half = Math.ceil(people.length / 2);
  const left = people.length === 1 ? [] : people.slice(0, half);
  const right = people.length === 1 ? people : people.slice(half);

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10">
      <div
        className={`grid items-stretch gap-5 ${
          left.length
            ? "lg:grid-cols-[18rem_minmax(0,1fr)_18rem]"
            : "lg:grid-cols-[minmax(0,1fr)_20rem]"
        }`}
      >
        {left.length ? (
          <div className="flex flex-col gap-5">
            {left.map((p, i) => (
              <MemberCard key={p.name} person={p} role={role} delay={i * 60} />
            ))}
          </div>
        ) : null}

        <TeamBanner title={title} eyebrow={eyebrow} image={image} inline />

        <div className="flex flex-col gap-5">
          {right.map((p, i) => (
            <MemberCard key={p.name} person={p} role={role} delay={i * 60} />
          ))}
        </div>
      </div>

      {footer}
    </section>
  );
}
