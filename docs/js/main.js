(() => {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const tabs = document.querySelectorAll("[data-tab]");
  const panels = document.querySelectorAll("[data-panel]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.getAttribute("data-tab");
      tabs.forEach((t) => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", String(t === tab));
      });
      panels.forEach((panel) => {
        const match = panel.getAttribute("data-panel") === id;
        panel.classList.toggle("is-active", match);
        panel.hidden = !match;
      });
    });
  });

  const revealTargets = document.querySelectorAll(
    ".mission-point, .duo-card, .pillar, .novel-grid article, .timeline li, .tier, .fgroup, .os-list li"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  // ── What's new: filter by entry kind ──────────────────────────────────────
  const chips = document.querySelectorAll("[data-wn-filter]");
  const entries = document.querySelectorAll(".wn-entry");

  if (chips.length && entries.length) {
    const list = document.querySelector(".wn-list");
    const empty = document.createElement("p");
    empty.className = "wn-empty";
    empty.hidden = true;
    empty.textContent = "No entries of that kind yet.";
    if (list && list.parentNode) list.parentNode.insertBefore(empty, list.nextSibling);

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const want = chip.getAttribute("data-wn-filter");
        chips.forEach((c) => c.classList.toggle("is-active", c === chip));

        let shown = 0;
        entries.forEach((entry) => {
          const match = want === "all" || entry.getAttribute("data-wn-kind") === want;
          entry.hidden = !match;
          if (match) shown += 1;
        });
        empty.hidden = shown > 0;
      });
    });
  }

  // ── Scroll progress bar ───────────────────────────────────────────────────
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);

  // ── Back to top ───────────────────────────────────────────────────────────
  const toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  // The provided icon set, rotated, rather than a typographic arrow — the rest
  // of the page draws every glyph from assets/icons.
  const arrow = document.createElement("img");
  arrow.src = "assets/icons/SolidArrow-Right.svg";
  arrow.alt = "";
  arrow.width = 16;
  arrow.height = 16;
  toTop.appendChild(arrow);
  toTop.addEventListener("click", () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  document.body.appendChild(toTop);

  const onProgress = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    progress.style.transform = "scaleX(" + ratio + ")";
    toTop.classList.toggle("is-shown", window.scrollY > 600);
  };
  onProgress();
  window.addEventListener("scroll", onProgress, { passive: true });
  window.addEventListener("resize", onProgress, { passive: true });

  // ── Highlight the section currently in view ───────────────────────────────
  const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const seen = new Map();
    const spy = new IntersectionObserver(
      (obs) => {
        obs.forEach((o) => seen.set(o.target, o.intersectionRatio));
        let best = null;
        let bestRatio = 0;
        seen.forEach((ratio, el) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = el;
          }
        });
        navLinks.forEach((a) =>
          a.classList.toggle("is-current", best !== null && a.getAttribute("href") === "#" + best.id)
        );
      },
      { threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    sections.forEach((sec) => spy.observe(sec));
  }
})();
