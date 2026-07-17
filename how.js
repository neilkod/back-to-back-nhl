"use strict";
/* Back-to-Back: "how it works" page. Depends on algo.js (loaded first).
   Every demo below calls the real algorithm functions. Nothing here
   reimplements or hardcodes a result. */

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (v !== null && v !== undefined) node.setAttribute(k, v);
    }
  }
  for (const child of children || []) {
    if (child === null || child === undefined) continue;
    node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}

/* ===== 1. link-test demo: NYR<->BOS across every slider stop ===== */
function renderLinkDemo() {
  const wrap = document.getElementById("link-demo");
  const a = "NYR", b = "BOS";
  const hours = getTravelHours(a, b);
  for (const stop of SLIDER_STOPS) {
    const linkable = isLinkable(a, b, stop.hours);
    const card = el("div", { class: "mini-slider-card" }, [
      el("h3", { text: `${stop.label} (${stop.hours}h)` }, []),
      el("div", { class: linkable ? "link-ok" : "link-no", text: `${DATA.teams[a].name} ↔ ${DATA.teams[b].name}: ${hours}h` }, []),
      el("p", { text: linkable ? "Linkable at this tolerance." : "Not linkable yet." }, []),
    ]);
    wrap.appendChild(card);
  }
}

/* ===== worked example: the real 14-night run at 3.0h, all teams enabled ===== */
function renderWorkedExample() {
  const wrap = document.getElementById("worked-example");
  const tolerance = 3.0;
  const { rangeGroups } = computeTrips(new Set(TEAM_ORDER), tolerance, {});
  const longest = rangeGroups[0].runs[0];

  wrap.appendChild(el("p", {}, [
    `${formatDateFull(longest.startDate)} to ${formatDateFull(longest.endDate)}: ${longest.range} nights, ${longest.games} games.`,
  ]));

  for (const night of longest.nights) {
    const team = DATA.teams[night.game.abbr];
    const hop = night.hopFromPrev === null ? "start of trip" : `${night.hopFromPrev}h from previous arena`;
    wrap.appendChild(el("div", { class: "worked-example-row" }, [
      el("span", { text: formatDateShort(night.date) }, []),
      el("span", { class: "ok", text: team.name }, []),
      el("span", { text: `vs ${night.game.opp}` }, []),
      el("span", { text: hop }, []),
    ]));
  }
}

function init() {
  renderLinkDemo();
  renderWorkedExample();
  const footer = document.getElementById("footer-note-how");
  if (footer) footer.textContent = DATA.meta.note;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
