import Link from "next/link";
import { MemberCard, PlaceholderCard } from "./MemberCard";
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
  image = TEAM_PHOTO,
  people,
  role,
  emptyNote,
  footerHref,
  footerLabel,
}: {
  title: string;
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

  // Nobody on record: keep the band layout and put a card-shaped placeholder
  // where the lead card goes. The previous full-width-band-plus-note version
  // read as a separate section rather than an unfilled team band.
  const half = Math.ceil(people.length / 2);
  const split = people.length > 1;
  const left = split ? people.slice(0, half) : [];
  const right = split ? people.slice(half) : people;

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10">
      <div
        className={`grid items-stretch gap-5 ${
          left.length
            ? "lg:grid-cols-[18rem_minmax(0,1fr)_18rem]"
            : "lg:grid-cols-[minmax(0,1fr)_20rem]"
        }`}
      >
        {/* `order` matters. In DOM order the left-hand cards come first, which
            on a single-column phone layout stacks them ABOVE the band heading —
            so Software's leads appeared to belong to the sub-team named above
            them. On mobile the banner is forced first and every card follows it;
            the left/banner/right arrangement is restored at lg. */}
        {left.length ? (
          <div className="order-2 flex flex-col gap-5 lg:order-1">
            {left.map((p, i) => (
              <MemberCard key={p.name} person={p} role={role} delay={i * 60} />
            ))}
          </div>
        ) : null}

        <div className="order-1 lg:order-2">
          <TeamBanner title={title} image={image} inline />
        </div>

        <div className="order-3 flex flex-col gap-5">
          {right.length ? (
            right.map((p, i) => (
              <MemberCard key={p.name} person={p} role={role} delay={i * 60} />
            ))
          ) : (
            <PlaceholderCard note={emptyNote ?? "Lead to be announced."} />
          )}
        </div>
      </div>

      {footer}
    </section>
  );
}
