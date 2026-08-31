#!/usr/bin/env bash
#
# optimize-media.sh — shrink public/media using ImageMagick.
#
# The team decision was to ship the ORIGINAL photos, so this is opt-in and does
# nothing until you pass --apply. Run it when the homepage feels heavy.
#
#   bun run optimize:media            # dry run: report what would change
#   bun run optimize:media -- --apply # actually rewrite public/media
#
# --apply first copies every original into assets-src/ (gitignored) so nothing
# is lost, then rewrites public/media in place at web-appropriate dimensions.
#
# Uses stock ImageMagick — no custom encoder, nothing to maintain.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MEDIA="$ROOT/public/media"
BACKUP="$ROOT/assets-src"

APPLY=0
[[ "${1:-}" == "--apply" ]] && APPLY=1

command -v magick >/dev/null || { echo "ImageMagick ('magick') not found."; exit 1; }

# Longest edge, by role. Photos never need to exceed 2000px for a full-bleed
# hero on a 2x display; portraits and logos need far less.
max_edge_for() {
  case "$1" in
    */people/*)   echo 900  ;;
    */sponsors/*) echo 600  ;;
    */brand/*)    echo 600  ;;
    *)            echo 2000 ;;
  esac
}

before=$(du -sb "$MEDIA" | cut -f1)
printf '%-52s %10s %10s\n' "FILE" "NOW" "AFTER"
printf '%s\n' "--------------------------------------------------------------------------"

total_after=0
while IFS= read -r -d '' f; do
  rel="${f#"$MEDIA"/}"
  edge=$(max_edge_for "$f")
  now=$(stat -c%s "$f")

  # The temp file MUST keep the source extension. ImageMagick picks its encoder
  # from the extension, so a .png written to a .jpg temp would come back as JPEG
  # bytes under a .png name — served as image/png, and with the alpha channel
  # flattened. The sponsor logos and the white wordmark are transparent PNGs
  # rendered with `brightness-0 invert`, so losing alpha would wreck them.
  ext="${f##*.}"
  tmp="$(mktemp --suffix=".$ext")"

  # -auto-orient honours EXIF rotation before stripping metadata, so photos
  # shot in portrait do not end up sideways once the EXIF tag is removed.
  magick "$f" -auto-orient -strip -resize "${edge}x${edge}>" -quality 82 "$tmp"
  after=$(stat -c%s "$tmp")
  total_after=$((total_after + after))

  printf '%-52s %9sK %9sK\n' "${rel:0:52}" "$((now / 1024))" "$((after / 1024))"

  if [[ $APPLY -eq 1 ]]; then
    mkdir -p "$(dirname "$BACKUP/$rel")"
    [[ -f "$BACKUP/$rel" ]] || cp "$f" "$BACKUP/$rel"
    mv "$tmp" "$f"
  else
    rm -f "$tmp"
  fi
done < <(find "$MEDIA" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0)

printf '%s\n' "--------------------------------------------------------------------------"
printf 'TOTAL  %sM  ->  %sM\n' "$((before / 1048576))" "$((total_after / 1048576))"

if [[ $APPLY -eq 1 ]]; then
  echo "Applied. Originals preserved in assets-src/ (gitignored)."
else
  echo "Dry run only. Re-run with '-- --apply' to write these changes."
fi
