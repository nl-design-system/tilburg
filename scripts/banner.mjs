/* `node scripts/banner.mjs`: write .github/banner.svg, the coloured terminal banner for the README. GitHub drops
   terminal colours from markdown, so it is an image; drawn as shapes, not text, so it does not depend on the reader's
   fonts. scripts/docs.test.mjs fails when it is out of date. */
import { readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT } from './dev-config.mjs';
import { bannerColour, bannerLines } from './lib/cli-utils.mjs';

export const FILE = resolve(ROOT, '.github/banner.svg');

/* One terminal cell, and the gap between the two strokes of a ═ ║ ╔ line. */
const W = 10;
const H = 20;
const GAP = 3;

/* The double-line characters as [horizontal, vertical]: which way each one runs from the middle of its cell. */
const CORNERS = { '╔': [1, 1], '╗': [-1, 1], '╚': [1, -1], '╝': [-1, -1] };

/** The SVG path of one character at cell (x, y), or null for a space. */
function shape(char, x, y) {
  const [cx, cy] = [x + W / 2, y + H / 2];
  if (char === '█') return `M${x} ${y}h${W}v${H}h${-W}z`;
  if (char === '═') return `M${x} ${cy - GAP}h${W}M${x} ${cy + GAP}h${W}`;
  if (char === '║') return `M${cx - GAP} ${y}v${H}M${cx + GAP} ${y}v${H}`;
  const corner = CORNERS[char];
  if (!corner) return null;
  const [hx, vy] = corner;
  const edgeX = hx > 0 ? x + W : x;
  const edgeY = vy > 0 ? y + H : y;
  /* The outer stroke turns on the far side of the middle, the inner one on the near side. */
  return [-1, 1]
    .map((side) => {
      const [px, py] = [cx + side * hx * GAP, cy + side * vy * GAP];
      return `M${edgeX} ${py}H${px}V${edgeY}`;
    })
    .join('');
}

export function renderSvg() {
  const width = Math.max(...bannerLines.map((line) => line.length)) * W;
  const height = bannerLines.length * H;
  const paths = bannerLines.flatMap((line, row) =>
    [...line].flatMap((char, column) => {
      const d = shape(char, column * W, row * H);
      if (!d) return [];
      const fill = `rgb(${bannerColour(char, column).join(',')})`;
      return [char === '█' ? `<path d="${d}" fill="${fill}"/>` : `<path d="${d}" stroke="${fill}" fill="none"/>`];
    }),
  );
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Tilburg">`,
    '<title>Tilburg</title>',
    '<g stroke-width="1.5" shape-rendering="crispEdges">',
    ...paths,
    '</g>',
    '</svg>',
    '',
  ].join('\n');
}

/* ROOT is the real path; argv[1] is as typed, so through a symlink it would otherwise do nothing and exit 0. */
if (process.argv[1] && realpathSync(resolve(process.argv[1])) === resolve(ROOT, 'scripts/banner.mjs')) {
  let before = '';
  try {
    before = readFileSync(FILE, 'utf8');
  } catch {
    /* first run */
  }
  const after = renderSvg();
  if (after === before) console.log('  .github/banner.svg is up to date.');
  else {
    writeFileSync(FILE, after);
    console.log('  Wrote .github/banner.svg.');
  }
}
