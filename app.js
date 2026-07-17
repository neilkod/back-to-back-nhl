"use strict";
/* Back-to-Back — rendering + interactions. Depends on algo.js (loaded first). */

const state = {
  sliderIndex: 3, // default to "Full corridor" — the stop where the corridor first fully connects
  enabledTeams: new Set(TEAM_ORDER),
  overrides: Object.create(null), // runKey -> { date: abbr }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function currentTolerance() {
  return SLIDER_STOPS[state.sliderIndex].hours;
}

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else if (v !== null && v !== undefined) node.setAttribute(k, v);
    }
  }
  for (const child of children || []) {
    if (child === null || child === undefined) continue;
    node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}

/* ===== slider ===== */
function renderStopTicks() {
  const wrap = document.getElementById("stop-ticks");
  wrap.innerHTML = "";
  SLIDER_STOPS.forEach((s) => wrap.appendChild(el("span", { text: s.hours + "h" }, [])));
}

function updateSliderReadout() {
  const stop = SLIDER_STOPS[state.sliderIndex];
  document.getElementById("slider-value-label").textContent = stop.label;
  document.getElementById("slider-value-hours").textContent = stop.hours.toFixed(2).replace(/\.?0+$/, "") + "h";
  document.getElementById("slider-helper").textContent = stop.helper;
  document.getElementById("tolerance-slider").setAttribute("aria-valuetext", `${stop.label}, ${stop.hours} hours`);
}

/* ===== team chips ===== */
function renderTeamChips() {
  const wrap = document.getElementById("team-chips");
  wrap.innerHTML = "";
  for (const abbr of TEAM_ORDER) {
    const team = DATA.teams[abbr];
    const enabled = state.enabledTeams.has(abbr);
    const chip = el(
      "button",
      {
        type: "button",
        class: "team-chip",
        style: `--chip-color:${team.color}`,
        "aria-pressed": String(enabled),
        onclick: () => {
          if (state.enabledTeams.has(abbr)) state.enabledTeams.delete(abbr);
          else state.enabledTeams.add(abbr);
          renderTeamChips();
          render();
        },
      },
      [el("span", { class: "dot" }, []), document.createTextNode(team.abbr)]
    );
    wrap.appendChild(chip);
  }
}

/* ===== corridor schematic ===== */
const CORRIDOR_POS = {
  BOS: [50, 34], NYR: [170, 40], NYI: [232, 66], NJ: [206, 104],
  PHI: [330, 104], WSH: [470, 104], LA: [70, 156], ANA: [170, 156],
};

function renderCorridor() {
  const host = document.getElementById("corridor");
  const tolerance = currentTolerance();
  const edges = Object.keys(DATA.travel);
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 560 190");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Schematic map of arenas; links light up as travel tolerance rises");
  svg.setAttribute("height", "190");

  for (const key of edges) {
    const [a, b] = key.split("-");
    if (!CORRIDOR_POS[a] || !CORRIDOR_POS[b]) continue;
    const [x1, y1] = CORRIDOR_POS[a];
    const [x2, y2] = CORRIDOR_POS[b];
    const active = isLinkable(a, b, tolerance);
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", x1); line.setAttribute("y1", y1);
    line.setAttribute("x2", x2); line.setAttribute("y2", y2);
    line.setAttribute("class", "corridor-link" + (active ? " active" : ""));
    if (active) line.setAttribute("stroke", DATA.teams[a].color);
    svg.appendChild(line);
  }

  for (const abbr of TEAM_ORDER) {
    const [x, y] = CORRIDOR_POS[abbr];
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", x); circle.setAttribute("cy", y); circle.setAttribute("r", 9);
    circle.setAttribute("fill", DATA.teams[abbr].color);
    circle.setAttribute("stroke", "var(--bg-raised)");
    circle.setAttribute("stroke-width", "2");
    const enabled = state.enabledTeams.has(abbr);
    circle.setAttribute("opacity", enabled ? "1" : "0.25");
    svg.appendChild(circle);

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", x); label.setAttribute("y", y - 14);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("class", "corridor-node-label");
    label.textContent = abbr;
    svg.appendChild(label);
  }

  host.innerHTML = "";
  host.appendChild(svg);
}

/* ===== results rendering ===== */
function pluralNights(n) { return n === 1 ? "night" : "nights"; }
function pluralGames(n) { return n === 1 ? "game" : "games"; }
function pluralTrips(n) { return n === 1 ? "trip" : "trips"; }

function tripItineraryText(run) {
  const lines = [`${formatDateFull(run.startDate)} – ${formatDateFull(run.endDate)} — ${run.range} ${pluralNights(run.range)}, ${run.games} ${pluralGames(run.games)}`];
  for (const n of run.nights) {
    const team = DATA.teams[n.game.abbr];
    lines.push(`${formatDateShort(n.date)}: ${team.fullName} vs ${n.game.opp} — ${n.game.time} @ ${team.arena}, ${team.city}`);
    if (n.doubleheader) {
      const other = n.doubleheader.matinee.abbr === n.game.abbr ? n.doubleheader.evening : n.doubleheader.matinee;
      const otherTeam = DATA.teams[other.abbr];
      lines[lines.length - 1] += ` (+ doubleheader: ${otherTeam.fullName} vs ${other.opp}, ${other.time})`;
    }
  }
  return lines.join("\n");
}

function copyItinerary(run, btn) {
  const text = tripItineraryText(run);
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = original; }, 1500);
  }).catch(() => {
    btn.textContent = "Copy failed";
  });
}

function renderNightRow(run, night, tolerance) {
  const team = DATA.teams[night.game.abbr];
  const rows = [];

  if (night.hopFromPrev !== null) {
    const tight = night.hopFromPrev >= tolerance * 0.85;
    rows.push(el("div", { class: "hop-row" + (tight ? " hop-tight" : "") }, [
      el("span", { class: "hop-arrow", text: "→" }, []),
      document.createTextNode(`${night.hopFromPrev}h to ${team.city.split(",")[0]}`),
    ]));
  }

  const mainChildren = [];
  if (night.doubleheader) {
    mainChildren.push(el("span", { class: "doubleheader-badge", text: `Doubleheader — 2 games!` }, []));
    const games = [night.doubleheader.matinee, night.doubleheader.evening];
    for (const g of games) {
      const t = DATA.teams[g.abbr];
      mainChildren.push(el("div", { class: "doubleheader-game" }, [
        el("span", {}, [document.createTextNode(`${t.name} vs ${g.opp}`)]),
        el("span", { class: "night-time", text: g.time }, []),
      ]));
      if (g !== games[games.length - 1]) mainChildren.push(el("div", { class: "doubleheader-arrow", text: "↓ same day" }, []));
    }
  } else {
    mainChildren.push(el("div", { class: "night-matchup", text: `${team.name} vs ${night.game.opp}` }, []));
    mainChildren.push(el("div", { class: "night-meta", text: `${team.arena}, ${team.city}` }, []));
  }

  if (night.alternatives.length > 1) {
    const picker = el("div", { class: "alt-picker" }, []);
    for (const alt of night.alternatives) {
      const altTeam = DATA.teams[alt.abbr];
      const pressed = alt.abbr === night.game.abbr;
      picker.appendChild(el("button", {
        type: "button",
        class: "alt-chip",
        style: `--alt-color:${altTeam.color}`,
        "aria-pressed": String(pressed),
        title: `${altTeam.name} — ${alt.time}`,
        onclick: () => {
          if (!state.overrides[run.key]) state.overrides[run.key] = {};
          state.overrides[run.key][night.date] = alt.abbr;
          render();
        },
      }, [document.createTextNode(altTeam.abbr)]));
    }
    mainChildren.push(picker);
  }

  const row = el("li", { class: "night-row" }, [
    el("div", { class: "night-date", text: formatDateShort(night.date) }, []),
    el("div", { class: "night-stripe", style: `--stripe-color:${team.color}` }, []),
    el("div", { class: "night-main" }, mainChildren),
    night.doubleheader ? null : el("div", { class: "night-time", text: night.game.time }, []),
  ]);

  rows.push(row);
  return rows;
}

function renderTripCard(run, tolerance) {
  const header = el("div", { class: "trip-card-header" }, [
    el("div", {}, [
      el("div", { class: "trip-card-dates", text: `${formatDateFull(run.startDate)} – ${formatDateFull(run.endDate)}` }, []),
      el("div", { class: "game-count-note", text: run.games > run.range ? `${run.range} ${pluralNights(run.range)} · ${run.games} ${pluralGames(run.games)}` : `${run.games} ${pluralGames(run.games)}` }, []),
    ]),
    el("div", { class: "trip-card-badges" }, [
      el("span", { class: "night-count-badge", text: `${run.range} ${pluralNights(run.range)}` }, []),
      el("button", { type: "button", class: "copy-btn", onclick: (e) => copyItinerary(run, e.target) }, [document.createTextNode("Copy itinerary")]),
    ]),
  ]);

  const list = el("ul", { class: "night-list" }, []);
  for (const night of run.nights) {
    for (const rowEl of renderNightRow(run, night, tolerance)) list.appendChild(rowEl);
  }

  return el("article", { class: "trip-card" }, [header, list]);
}

function renderResults(data, tolerance) {
  const main = document.getElementById("results");
  main.innerHTML = "";

  if (data.rangeGroups.length === 0) {
    main.appendChild(el("div", { class: "empty-state" }, [
      document.createTextNode("No multi-night runs at this range — widen your travel or add teams."),
    ]));
    return;
  }

  const top = data.rangeGroups[0];
  if (top.range >= 4) {
    main.appendChild(el("div", { class: "hero-callout" }, [
      document.createTextNode("Longest trip at this tolerance: "),
      el("strong", { text: `${top.range} ${pluralNights(top.range)}` }, []),
      document.createTextNode(` starting ${formatDateShort(top.runs[0].startDate)}.`),
    ]));
  }

  for (const rg of data.rangeGroups) {
    const section = el("section", { class: "range-section" }, [
      el("div", { class: "range-section-header" }, [
        el("h2", { text: `${rg.range}-night runs` }, []),
        el("span", { class: "range-count-badge", text: `${rg.runs.length} ${pluralTrips(rg.runs.length)}` }, []),
      ]),
    ]);
    const cardsWrap = el("div", { class: "trip-cards" }, []);
    for (const run of rg.runs) cardsWrap.appendChild(renderTripCard(run, tolerance));
    section.appendChild(cardsWrap);
    main.appendChild(section);
  }
}

/* ===== main render cycle ===== */
function render() {
  const tolerance = currentTolerance();
  const data = computeTrips(state.enabledTeams, tolerance, state.overrides);

  document.getElementById("live-stat").innerHTML =
    `At this range: <strong>${data.totalRuns}</strong> ${pluralTrips(data.totalRuns)} of up to <strong>${data.maxRange}</strong> ${pluralNights(data.maxRange)}`;

  renderResults(data, tolerance);
  renderCorridor();
}

/* ===== init ===== */
function init() {
  renderStopTicks();
  updateSliderReadout();
  renderTeamChips();

  document.getElementById("footer-note").textContent = DATA.meta.note;

  const slider = document.getElementById("tolerance-slider");
  slider.addEventListener("input", () => {
    state.sliderIndex = Number(slider.value);
    state.overrides = Object.create(null); // tolerance change can invalidate prior swaps
    updateSliderReadout();
    render();
  });

  document.getElementById("teams-all").addEventListener("click", () => {
    state.enabledTeams = new Set(TEAM_ORDER);
    renderTeamChips();
    render();
  });
  document.getElementById("teams-none").addEventListener("click", () => {
    state.enabledTeams = new Set();
    renderTeamChips();
    render();
  });

  render();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
