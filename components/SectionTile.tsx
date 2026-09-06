import HoverPanel from "./HoverPanel";
import type { SectionTile as Tile } from "@/lib/content";

/**
 * Home page Explore grid entry — a thin configuration of <HoverPanel>.
 *
 * Everything about the interaction lives in HoverPanel so this grid and the
 * competition panels cannot drift apart.
 */
export default function SectionTile({
  tile,
  priority = false,
}: {
  tile: Tile;
  priority?: boolean;
}) {
  return (
    <HoverPanel
      href={tile.href}
      image={tile.image}
      title={tile.title}
      decode={tile.blurb}
      priority={priority}
      className={tile.span === "wide" ? "" : ""}
    />
  );
}
