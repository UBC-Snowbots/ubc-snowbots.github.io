import { APPLY } from "@/lib/content";

/**
 * Every "Apply" button on the site.
 *
 * The form opens in a new tab while recruitment is open. With no form URL,
 * the same controls show the current status and cannot submit an application.
 */
export default function ApplyLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  if (APPLY.formUrl) {
    return (
      <a
        href={APPLY.formUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <span aria-disabled="true" className={`${className ?? ""} pointer-events-none`}>
      {APPLY.bannerText}
    </span>
  );
}
