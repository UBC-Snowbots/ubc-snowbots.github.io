import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { FORMSPREE_ENDPOINT, INQUIRY_TYPES, SITE, SOCIALS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with UBC Rover — ${SITE.email}. Sponsorship, recruitment, media and partnership enquiries welcome.`,
};

const fieldClass =
  "w-full border border-white/15 bg-navy-950 px-4 py-3 text-sm text-chalk transition-colors placeholder:text-chalk-dim/40 focus:border-amber-500 focus:outline-none";
const labelClass =
  "mb-2 block font-mono text-[11px] tracking-[0.16em] text-chalk-dim/70 uppercase";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title="Get in touch"
        lede="Sponsorship, recruitment, media or partnership — we would like to hear from you."
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          {/* Form — posts to the same Formspree endpoint the previous site used,
              so submissions keep landing in the team's existing inbox. It is a
              plain HTML form with no JS, so it works in the static export and
              before (or entirely without) hydration. */}
          <div>
            <Reveal>
              <h2 className="font-display text-chalk text-3xl leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-5xl">
                Send us a message
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <form action={FORMSPREE_ENDPOINT} method="POST" className="mt-10 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="first-name">
                      First name
                    </label>
                    <input
                      className={fieldClass}
                      id="first-name"
                      name="First Name"
                      type="text"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="last-name">
                      Last name
                    </label>
                    <input
                      className={fieldClass}
                      id="last-name"
                      name="Last Name"
                      type="text"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="email">
                    Email <span className="text-amber-500">*</span>
                  </label>
                  <input
                    className={fieldClass}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="inquiry">
                    Inquiry type
                  </label>
                  <select
                    className={fieldClass}
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
                </div>

                <div>
                  <label className={labelClass} htmlFor="message">
                    Message
                  </label>
                  <textarea className={fieldClass} id="message" name="Message" rows={6} />
                </div>

                <button
                  type="submit"
                  className="text-navy-950 bg-amber-500 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-amber-400"
                >
                  Send message
                </button>
              </form>
            </Reveal>
          </div>

          {/* Direct channels */}
          <Reveal delay={120}>
            <div className="bg-navy-900 border border-white/10 p-8 sm:p-10">
              <p className="text-eyebrow">Direct</p>
              <a
                href={`mailto:${SITE.email}`}
                className="group font-display text-chalk mt-4 inline-flex items-center gap-3 text-xl font-bold tracking-[-0.01em] transition-colors hover:text-amber-500 sm:text-2xl"
              >
                {SITE.email}
                <span
                  aria-hidden
                  className="text-amber-500 transition-transform duration-300 group-hover:translate-x-1"
                >
                  &#8594;
                </span>
              </a>

              <p className="text-eyebrow mt-10">Find us</p>
              <address className="text-chalk-dim/85 mt-4 text-base leading-relaxed not-italic">
                University of British Columbia
                {SITE.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <p className="text-eyebrow mt-10">Website</p>
              <a
                href={SITE.url}
                className="text-chalk-dim/85 mt-4 inline-block text-base transition-colors hover:text-amber-500"
              >
                {SITE.domain}
              </a>

              <p className="text-eyebrow mt-10">Follow</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {SOCIALS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-chalk-dim/85 inline-block border border-white/15 px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
                    >
                      <span className="uppercase">{social.label}</span>{" "}
                      <span className="text-chalk-dim/55">{social.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="stripe-rule mt-10 h-[26px] w-full" aria-hidden />

              <p className="text-chalk-dim/70 mt-10 text-sm leading-relaxed">
                We are a student team, so replies land between lectures and lab time — but
                every enquiry gets one.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
