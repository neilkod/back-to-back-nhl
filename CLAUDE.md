# Back-to-Back — project notes for Claude

Static site (no backend, no build step) that finds runs of consecutive-night
NHL home games chainable within a travel-tolerance slider.

**Spec doc:** https://docs.google.com/document/d/168bO7XOp9xlqHLXqHwGVdihvdzPw-HL2KZuhIa6OtqI/edit

## Layout

- `algo.js` — embedded 2026-27 dataset (8 teams + travel-time matrix) and all
  pure algorithm functions. No DOM code. Shared by both pages.
- `index.html` / `app.js` — the planner UI.
- `how.html` / `how.js` — algorithm walkthrough; calls the real `algo.js`
  functions rather than reimplementing them, including a live-generated
  worked example.
- `theme.js` — manual dark/light toggle (persisted via `localStorage`),
  loaded synchronously at the top of `<head>` on both pages to avoid a
  flash of the wrong theme. CSS variables for both themes live in
  `styles.css` under `:root[data-theme="light"|"dark"]`, which take
  precedence over the `prefers-color-scheme` media query fallback.
- `.nojekyll` — required for GitHub Pages to serve this as-is.

## Known deviation from the spec doc

The doc's own smoke-test list claims a 21-night run (Jan 8–28) at the widest
tolerance stop. That's a false positive: it only holds under a naive "some
pair of teams across these two nights is linkable" test. The real algorithm
in `findRunDateGroups()` (`algo.js`) tracks a reachability *frontier* instead,
and correctly splits that into a 7-night West Coast run (Jan 8–14, an LA/ANA
shuttle) and the true longest run — 14 nights, Jan 15–28 — because Anaheim
has no travel-matrix entry to the Islanders at all. This is documented in
`algo.js`'s dev-check comments and explained on `how.html` as an "aha" aside,
not silently patched to match the doc's number. If the spec doc is ever
revised, check whether this note is still needed.

## Testing

There's no browser automation configured in this repo. Headless smoke
testing during development used `jsdom` (`npm install --no-save jsdom`,
then a throwaway script with `JSDOM.fromFile(..., { runScripts:
"dangerously", resources: "usable" })`), deleted afterward along with
`node_modules` — this is not a real dependency of the deployed site.
`algo.js` also runs its own `console.assert` dev-checks on every load
(open the browser console to see them), validating run-length invariants,
hop-distance ceilings, and the named smoke-test spans from the doc.
