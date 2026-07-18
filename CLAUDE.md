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

- `algo.js`: embedded 2026-27 dataset (18 teams + travel-time matrix) and all
  pure algorithm functions. No DOM code. Shared by both pages. Teams span
  four structurally-independent clusters that never link to each other at
  any tolerance:
  - Northeast/Boston: NYR, NYI, NJ, WSH, PHI, BOS
  - Great Lakes: MTL, OTT, TOR, DET, BUF (needs the 4.5h stop to fully
    connect, specifically Ottawa to Toronto at ~4.4h)
  - West Coast/Southwest: LA, ANA, VGK, SJS, UTA. VGK joins LA/ANA at the
    existing 4.5h stop (~4h either way). SJS needs the 6.0h stop to reach
    LA/ANA (~5.2 to 5.75h). UTA only connects through VGK (~5.9h to Vegas),
    not directly to LA/ANA/SJS, so it's reachable at 6.0h but only via that
    path.
  - Florida: FLA, TBL, a 2-team island like LA/ANA originally was, linked
    at ~3.9h (already within the 4.0h stop). Deliberately not bridged to
    the Northeast cluster (Tampa/Miami to DC is 900+ miles) even though
    raising the ceiling made that a fair question to ask.
  These clusters are intentionally never cross-linked. Don't add travel
  entries between them without checking with Neil first, that's a real
  product decision, not just a data-completeness one.
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

## A second, related bug found while adding the Great Lakes teams

The frontier walk in `findRunDateGroups()` tracks a single thread across
every enabled team's games together. When two structurally unrelated
clusters both have a home game on the same calendar date, a coincidental
same-team back-to-back in one cluster could "steal" that date and orphan a
genuine run-start in the other, silently truncating a real run even though
the two clusters were never actually linkable. This had been live since the
original 8-team dataset (LA/ANA's mere presence in the enabled set was
corrupting the Northeast frontier at the 4.0h stop specifically): the
"4.0h true longest run is 14 nights" claim that lived in the dev-checks for
a while was itself wrong. The real answer, even before Great Lakes teams
existed, was 17 nights (Jan 12 to 28). `teamClusters()` in `algo.js` fixes
this by computing connected components from the travel matrix and running
each cluster through its own date-walk, so unrelated clusters can never
contaminate each other's run detection again. See the dev-checks comment
block in `algo.js` for the full writeup.

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
