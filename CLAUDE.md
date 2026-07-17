# Back-to-Back: project notes for Claude

Static site (no backend, no build step) that finds runs of consecutive-night
NHL home games chainable within a travel-tolerance slider.

**Spec doc:** https://docs.google.com/document/d/168bO7XOp9xlqHLXqHwGVdihvdzPw-HL2KZuhIa6OtqI/edit

## Writing style

Neil's standing preference for every piece of text in this repo (UI copy,
docs, code comments, commit messages): no em dashes, no en dashes as a
sentence-joining device, short direct sentences, minimal filler. Use "and,"
"but," periods, or colons to join ideas instead of a dash. Date ranges get
written as "Jan 8 to 14," not "Jan 8–14." This applies to generated strings
in the app too (copy-to-clipboard text, badges, empty states), not just
prose. If you're about to type "—" or "–," stop and rephrase.

## Layout

- `algo.js`: embedded 2026-27 dataset (8 teams + travel-time matrix) and all
  pure algorithm functions. No DOM code. Shared by both pages.
- `index.html` / `app.js`: the planner UI.
- `how.html` / `how.js`: algorithm walkthrough, calls the real `algo.js`
  functions rather than reimplementing them, including a live-generated
  worked example.
- `theme.js`: manual dark/light toggle (persisted via `localStorage`),
  loaded synchronously at the top of `<head>` on both pages to avoid a
  flash of the wrong theme. CSS variables for both themes live in
  `styles.css` under `:root[data-theme="light"|"dark"]`, which take
  precedence over the `prefers-color-scheme` media query fallback.
- `.nojekyll`: required for GitHub Pages to serve this as-is.

There used to be a corridor schematic SVG on the homepage (a node-and-line
diagram of arena links). It was removed: hard to read, especially on
mobile, and didn't add anything the trip cards didn't already show. Don't
re-add it without checking that reasoning first.

## Known deviation from the spec doc

The doc's own smoke-test list claims a 21-night run (Jan 8 to 28) at the
widest tolerance stop. That's a false positive. It only holds under a naive
"some pair of teams across these two nights is linkable" test. The real
algorithm in `findRunDateGroups()` (`algo.js`) tracks a reachability
*frontier* instead, and correctly splits that into a 7-night West Coast run
(Jan 8 to 14, an LA/ANA shuttle) and the true longest run: 14 nights, Jan 15
to 28, because Anaheim has no travel-matrix entry to the Islanders at all.
This is documented in `algo.js`'s dev-check comments and explained on
`how.html` as an "aha" aside, not silently patched to match the doc's
number. If the spec doc is ever revised, check whether this note is still
needed.

## Testing

There's no browser automation configured in this repo. Headless smoke
testing during development used `jsdom` (`npm install --no-save jsdom`,
then a throwaway script with `JSDOM.fromFile(..., { runScripts:
"dangerously", resources: "usable" })`) and, for visual/responsive checks,
`playwright` with a locally installed headless Chromium
(`npx playwright install chromium`). Both were installed in the scratchpad
directory, not this repo, and deleted afterward. Neither is a real
dependency of the deployed site. `algo.js` also runs its own
`console.assert` dev-checks on every load (open the browser console to see
them), validating run-length invariants, hop-distance ceilings, and the
named smoke-test spans from the doc.
