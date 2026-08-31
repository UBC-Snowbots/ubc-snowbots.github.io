import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden">
      <div aria-hidden className="grid-wash absolute inset-0 -z-10 opacity-40" />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-32 sm:px-8">
        <p className="text-eyebrow">Error 404</p>
        <h1 className="font-display text-chalk mt-5 text-[clamp(3.5rem,14vw,11rem)] leading-[0.85] font-extrabold tracking-[-0.045em]">
          Off<span className="text-amber-500">-</span>course
        </h1>
        <div className="stripe-rule mt-8 h-[26px] w-full max-w-md" aria-hidden />
        <p className="text-chalk-dim/80 mt-8 max-w-lg text-base leading-relaxed">
          That page is not on the map. Navigation error — recalculating.
        </p>
        <Link
          href="/"
          className="text-navy-950 mt-10 inline-block bg-amber-500 px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-amber-400"
        >
          Return to base
        </Link>
      </div>
    </section>
  );
}
