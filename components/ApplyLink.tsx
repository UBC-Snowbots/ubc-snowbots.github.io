import Link from "next/link";
import { applyHref, applyIsExternal } from "@/lib/content";

/**
 * Every "Apply" button on the site.
 *
 * The destination changes between seasons: an external Google Form while
 * recruitment is open, the /join page otherwise. Those need different markup -
 * an external form opens in a new tab and carries rel="noreferrer noopener"
 * so the form cannot reach back through window.opener, an internal route wants
 * next/link and its client-side navigation.
 *
 * Both cases live here so swapping the form URL in lib/content.ts is the only
 * edit required, rather than five call sites that would drift apart.
 */
export default function ApplyLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const href = applyHref();

  if (applyIsExternal()) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
