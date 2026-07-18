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

- `algo.js`: embedded 2026-27 dataset (29 teams + travel-time matrix) and all
  pure algorithm functions. No DOM code. Shared by both pages. As of this
  writing, teams span these tolerance-scoped clusters (see the note below:
  clustering is recomputed per tolerance, not fixed, so what's "in" a
  cluster genuinely depends on the slider position):
  - Northeast/Great Lakes/Midwest mega-cluster: NYR, NYI, NJ, WSH, PHI,
    BOS, MTL, OTT, TOR, DET, BUF, CHI, STL, MIN, PIT, CBJ, CAR, NSH.
    Originally three separate corridors; Pittsburgh bridges Northeast to
    Great Lakes at just 4.0h (PIT-WSH ~4h, PIT-BUF ~3.3h), and Columbus,
    Carolina, and Nashville ride along. Full merge is real, not a bug:
    verified with `computeTrips` directly before trusting it.
  - West Coast/Southwest: LA, ANA, VGK, SJS, UTA. VGK joins LA/ANA at
    4.5h (~4h either way). SJS needs 6.25h (~5.2 to 5.75h). UTA only
    connects through VGK (~5.9h), not directly to LA/ANA/SJS.
  - Florida: FLA, TBL, linked at ~3.9h (within the 4.0h stop). Deliberately
    not bridged to the Northeast (Tampa/Miami to DC is 900+ miles) even
    though the wider ceiling made that a fair question to ask.
  - Pacific Northwest: VAN, SEA, linked at ~2.4h. Isolated (Seattle to San
    Jose, the nearest other team, is ~13h).
  - Alberta: CGY, EDM, linked at ~3h. Isolated (Calgary to Vancouver is
    ~10.4h).
  Deliberately excluded after checking: Winnipeg (nearest team, Minneapolis,
  is ~7h away) and Dallas (nearest team, St. Louis, is ~9.7h away). Neither
  has a realistic connection to anything in the dataset.
  Whether two clusters merge is a real product decision (see below), not
  just a data-completeness one. Don't add a travel-matrix entry between
  two previously-separate regions without checking real driving times
  first and confirming with Neil that merging them is wanted.
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

## A second, related bug, found twice

The frontier walk in `findRunDateGroups()` tracks a single thread across
every enabled team's games together. When two teams that can't currently
link to each other both have a home game on the same calendar date, a
coincidental same-team back-to-back on one side can "steal" that date and
orphan a genuine run-start on the other, silently truncating a real run.

First pass (while adding the Great Lakes teams): fixed by `teamClusters()`,
which computed connected components from the whole travel matrix and ran
each cluster through its own date-walk. This had been live since the
original 8-team dataset. LA/ANA's mere presence in the enabled set was
corrupting the Northeast frontier at the 4.0h stop specifically, and the
"4.0h true longest run is 14 nights" claim that lived in the dev-checks for
a while was itself wrong. The real answer, even before Great Lakes teams
existed, was 17 nights (Jan 12 to 28).

Second pass (while adding Pittsburgh, Columbus, Carolina, Nashville): the
first fix wasn't enough. `teamClusters()` grouped teams by "ever reachable
at *some* tolerance," which is right for permanently disconnected regions
but wrong for teams that share a wider-tolerance cluster while still being
unreachable to each other *at the tolerance actually being queried*.
Toronto and Pittsburgh only link once tolerance reaches Boston-level
distances, so at the 3.0h stop, in the SAME structural cluster, Toronto's
own back-to-back was again stealing a date from a real Northeast run, this
time within one cluster instead of across two. Fixed by making
`teamClusters(tolerance)` take the tolerance and only union teams whose
direct link is `<= tolerance`, recomputing clusters fresh at every slider
position instead of once. The "4.0h true longest run is 17 nights" claim
that replaced the 14-night one was itself then superseded again: with
Pittsburgh in the mix, the true 4.0h answer is 19 nights (Jan 13 to 31).

Moral: any time a run's boundaries look surprising after adding teams,
check with `computeTrips` directly (hop distances, exact date range) before
assuming either the old or new number is right. See the dev-checks comment
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
