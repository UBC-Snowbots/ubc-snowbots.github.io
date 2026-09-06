"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ALL_NAV, NAV, NAV_EMPHASIS } from "@/lib/content";

const MOBILE_LINKS = ALL_NAV;

/**
 * Fixed header that starts transparent over the hero and turns opaque once you
 * scroll past it.
 *
 * Perf note: the opaque/transparent switch is driven by an IntersectionObserver
 * watching a 1px sentinel at the top of the document — NOT a scroll listener.
 * A scroll handler would fire on every frame and force a style read; the
 * sentinel fires exactly twice (crossing in, crossing out).
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /** Which drop-down is open, by label. */
  const [menu, setMenu] = useState<string | null>(null);
  /**
   * Closing is delayed so the pointer can cross the gap between the trigger and
   * the panel without the panel vanishing underneath it — the classic
   * drop-down bug. Any re-entry cancels the pending close.
   */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  // Escape closes the drop-down, and leaving the page does too.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  // No effect closing this on route change: every link inside the panel closes
  // it on click, and a synchronous setState in an effect is the cascading-render
  // pattern the lint rule exists to catch.

  useEffect(() => {
    const node = sentinel.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // The panel is `lg:hidden`, so once the viewport crosses into desktop it is
  // no longer painted — but its scroll lock would survive, leaving the whole
  // site unscrollable. Close it when the breakpoint is crossed.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  // While the panel is open: lock body scroll, wire up Escape, and keep Tab
  // inside the panel so focus cannot wander into the page behind the overlay.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button") ?? []);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      // Simple focus trap: the panel plus its trigger form the cycle.
      const items = [...focusables(), triggerRef.current].filter(
        Boolean,
      ) as HTMLElement[];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    focusables()[0]?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Note: the panel closes from each link's onClick rather than from an effect
  // on `pathname`. Setting state in an effect would queue a second render on
  // every navigation (React 19's lint flags it); closing on the click that
  // causes the navigation is one render, and it also handles taps on the
  // already-active route, where pathname never changes.
  const closeAndReturnFocus = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-px w-full" />

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`relative transition-colors duration-500 ${
            scrolled || open || menu
              ? // Opaque whenever the drop-down is open, not only once scrolled.
                // Transparent, the panel sat directly on the hero photo and its
                // labels were unreadable — a menu has to bring its own ground.
                "bg-navy-950/97 border-b border-white/10 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          {/* Legibility scrim for the transparent state. Over a bright hero sky
              the nav labels drop to roughly 2:1 against the photo; this keeps
              them readable without making the bar look solid. */}
          {!scrolled && !open && !menu ? (
            <div
              aria-hidden
              className="from-navy-950/92 via-navy-950/55 pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b to-transparent"
            />
          ) : null}
          <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-4 sm:h-20 sm:px-5">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3"
              aria-label="UBC Rover — home"
            >
              {/* The white-on-transparent mark — the other export in the media
                folder is dark artwork and disappears against the navy bar. */}
              <img
                src="/media/brand/rover-wordmark-white.png"
                alt=""
                width={40}
                height={40}
                className="h-9 w-auto sm:h-10"
              />
              <span className="font-display text-chalk text-lg leading-none font-extrabold tracking-[-0.02em] sm:text-xl">
                UBC <span className="text-amber-500">ROVER</span>
              </span>
            </Link>

            {/* Desktop nav. Order is fixed in lib/content.ts: the five
                informational pages, then Sponsors and Join Us emphasised as the
                two calls to action. */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-8 lg:flex"
              onPointerLeave={scheduleClose}
            >
              {NAV.map((item) => {
                const active = item.href
                  ? isActive(item.href)
                  : !!item.menu?.items.some((i) => isActive(i.href));
                const cls = `hover:text-chalk relative py-1 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-amber-500 after:transition-[width] after:duration-300 ${
                  active
                    ? "text-chalk after:w-full"
                    : "text-chalk-dim/90 after:w-0 hover:after:w-full"
                }`;

                // A group heading with no page of its own is a button, not a
                // link — there is nowhere for it to navigate to.
                if (item.menu) {
                  return (
                    <button
                      key={item.label}
                      type="button"
                      aria-expanded={menu === item.label}
                      aria-haspopup="true"
                      onPointerEnter={(e) =>
                        e.pointerType === "mouse" && openMenu(item.label)
                      }
                      onFocus={() => openMenu(item.label)}
                      onClick={() =>
                        setMenu((m) => (m === item.label ? null : item.label))
                      }
                      className={cls}
                    >
                      {item.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href as string}
                    aria-current={active ? "page" : undefined}
                    onPointerEnter={(e) => e.pointerType === "mouse" && scheduleClose()}
                    className={cls}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {NAV_EMPHASIS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-1 font-mono text-[11px] font-bold tracking-[0.16em] uppercase transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-amber-500 after:transition-[width] after:duration-300 hover:text-amber-500 ${
                    isActive(item.href)
                      ? "text-amber-500 after:w-full"
                      : "text-chalk after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile trigger */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span
                className={`bg-chalk h-px w-6 transition-transform duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`bg-chalk h-px w-6 transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`bg-chalk h-px w-6 transition-transform duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>

          {/* Drop-down. It grows out of the bar rather than floating over the
              page — the header itself gets taller, which is what makes it read
              as the bar opening rather than a menu landing on top of things.
              It sits above the stripe rule so the rule stays the header's
              bottom edge at either height.

              Animated on grid-template-rows, not height: the open size is then
              the content's own, where a max-height ceiling would either clip a
              longer menu or ease wrongly for a short one. */}
          {NAV.filter((n) => n.menu).map((item) => (
            <div
              key={item.label}
              onPointerEnter={() => openMenu(item.label)}
              onPointerLeave={scheduleClose}
              className={`hidden overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid ${
                menu === item.label
                  ? "grid-rows-[1fr] opacity-100"
                  : "pointer-events-none grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <div className="mx-auto grid max-w-[1800px] grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-16 px-4 pt-6 pb-10 sm:px-5">
                  <div>
                    <p className="text-chalk-dim/50 font-mono text-[10px] tracking-[0.22em] uppercase">
                      {item.label}
                    </p>
                    <p className="text-chalk-dim/85 mt-5 max-w-sm text-sm leading-relaxed">
                      {item.menu?.description}
                    </p>
                  </div>

                  <ul className="grid gap-x-10 sm:grid-cols-2">
                    {item.menu?.items.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={() => setMenu(null)}
                          className="group/item flex items-baseline gap-3 border-b border-white/10 py-3 transition-colors hover:border-amber-500/50"
                        >
                          <span
                            aria-hidden
                            className="font-mono text-xs text-amber-500/60 transition-colors group-hover/item:text-amber-500"
                          >
                            +
                          </span>
                          <span className="min-w-0">
                            <span className="text-chalk block text-base transition-colors group-hover/item:text-amber-500">
                              {sub.label}
                            </span>
                            <span className="text-chalk-dim/75 mt-0.5 block font-mono text-[10px] tracking-[0.1em]">
                              {sub.blurb}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          <div className="stripe-rule-thin h-[3px] w-full" aria-hidden />
        </div>
      </header>

      {/* Mobile panel.
          `overflow-y-auto` matters: on a short viewport (small phone, or any
          phone in landscape) the six links exceed the screen, and without it
          the body scroll lock would make the last ones unreachable. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="bg-navy-950/98 fixed inset-0 z-40 overflow-y-auto overscroll-contain pt-24 pb-12 backdrop-blur-lg lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col px-5">
          {MOBILE_LINKS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAndReturnFocus}
              className={`font-display border-b border-white/10 py-5 text-3xl tracking-[-0.02em] transition-colors hover:text-amber-500 ${
                i >= NAV.length ? "text-chalk font-extrabold" : "text-chalk font-bold"
              }`}
            >
              <span className="mr-4 font-mono text-xs text-amber-500/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
