# Back-to-Back: 2026-27 NHL Trip Planner

A static site that finds runs of consecutive-night NHL home games you can
actually travel between, for 13 teams across three corridors: the Northeast
(Rangers, Islanders, Devils, Capitals, Flyers, Bruins), the Great Lakes
(Canadiens, Senators, Maple Leafs, Red Wings, Sabres), and Southern
California (Kings, Ducks). These three groups never link to each other at
any tolerance, the same way LA and Anaheim never link to the East Coast.

Slide the travel-tolerance slider, filter to the teams you care about, and
get trip cards grouped by trip length. Each one has a per-night itinerary,
travel hops, doubleheader flags, swappable alternate games, and a
copy-to-clipboard summary. See [`how.html`](how.html) for a walkthrough of
the algorithm.

No backend, no build step, no external runtime dependencies (besides the
Google Fonts stylesheet). The full schedule and travel-time dataset are
embedded directly in `algo.js`.

## Why I built this

I'm a Sharks fan in San Jose. I used to fly to New York a lot for work, and
I'd use the trips as an excuse to catch games. I took NJ Transit's Northeast
Corridor line from Penn Station to Newark Penn, then walked over to
Prudential Center for a Devils game. I also caught the Rangers at the
Garden once. Still the best building I've been to for hockey.

My son has never been to New York. His one bucket list item is an Islanders
game at UBS Arena, just for the chants. I'm planning a short trip, two or
three nights, and I don't want to waste a night on travel instead of a
game. That's why I built this.

If you're planning something longer, the slider goes out to Boston too.

## Running it locally

Any static file server works. From this directory:

```
python3 -m http.server 8000
```

Then open http://localhost:8000/ in a browser. (Opening `index.html`
directly via `file://` also works in most browsers, since there's no fetch
call. The data is inlined in `algo.js`.)

## Files

- `index.html` / `app.js`: the planner UI
- `how.html` / `how.js`: "how this works" page, calls the same algorithm
  functions as the planner (nothing is reimplemented)
- `algo.js`: embedded dataset + the pure algorithm functions shared by both
  pages (no DOM code)
- `styles.css`: shared stylesheet for both pages
- `.nojekyll`: tells GitHub Pages not to run this through Jekyll

## Deploying to GitHub Pages

1. Push this directory to a GitHub repo (as the repo root, or a subfolder;
   adjust the Pages source accordingly).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch".
4. Pick the branch (e.g. `main`) and the folder this site lives in (`/` or
   `/docs`), then save.
5. GitHub will publish at `https://<username>.github.io/<repo>/` within a
   minute or two. The `.nojekyll` file is already in place so Jekyll won't
   try (and fail) to process the plain HTML/CSS/JS.

No environment variables, secrets, or server config are needed. It's a pure
static site.
