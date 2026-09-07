(() => {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Keep the final visible state intact; motion is an optional enhancement.
  const animateEntry = (element, delay = 0) => {
    if (motionPreference.matches || typeof element.animate !== "function") return;
    element.getAnimations().forEach((animation) => animation.cancel());
    element.animate(
      [{ opacity: 0.55, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }],
      { duration: 320, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" }
    );
  };

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
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  const tabs = document.querySelectorAll("[data-tab]");
  const panels = document.querySelectorAll("[data-panel]");

  tabs.forEach((tab, index) => {
    const id = tab.getAttribute("data-tab");
    tab.id = "tab-" + id;
    tab.setAttribute("aria-controls", "panel-" + id);
    tab.tabIndex = tab.classList.contains("is-active") ? 0 : -1;
    const panel = Array.from(panels).find((p) => p.getAttribute("data-panel") === id);
    if (panel) {
      panel.id = "panel-" + id;
      panel.setAttribute("aria-labelledby", tab.id);
      panel.tabIndex = 0;
    }
    tab.addEventListener("click", () => {
      const id = tab.getAttribute("data-tab");
      tabs.forEach((t) => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", String(t === tab));
        t.tabIndex = t === tab ? 0 : -1;
      });
      panels.forEach((panel) => {
        const match = panel.getAttribute("data-panel") === id;
        panel.classList.toggle("is-active", match);
        panel.hidden = !match;
      });
      window.requestAnimationFrame(onProgress);
    });
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    });
  });

  const revealTargets = document.querySelectorAll(
    ".mission-point, .duo-card, .pillar, .novel-grid article, .timeline li, .tier, .fgroup, .os-list li, .stat, .ask, .hand-card, .tier-block, .wn-entry"
  );
  const siblingOrder = new Map();
  let revealObserver;

  const finishReveals = () => {
    if (revealObserver) revealObserver.disconnect();
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  };

  if (!motionPreference.matches && "IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -24px 0px", threshold: 0.04 }
    );
    revealTargets.forEach((el) => {
      const index = siblingOrder.get(el.parentElement) || 0;
      siblingOrder.set(el.parentElement, index + 1);
      el.style.setProperty("--reveal-delay", Math.min(index, 4) * 60 + "ms");
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  } else {
    finishReveals();
  }
  motionPreference.addEventListener("change", (event) => {
    if (event.matches) {
      finishReveals();
      document.getAnimations().forEach((animation) => animation.cancel());
    }
  });

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
      chip.setAttribute("aria-pressed", String(chip.classList.contains("is-active")));
      chip.addEventListener("click", () => {
        const want = chip.getAttribute("data-wn-filter");
        chips.forEach((c) => {
          c.classList.toggle("is-active", c === chip);
          c.setAttribute("aria-pressed", String(c === chip));
        });

        let shown = 0;
        entries.forEach((entry) => {
          const match = want === "all" || entry.getAttribute("data-wn-kind") === want;
          entry.hidden = !match;
          if (match) {
            // Filtered content must be readable immediately, including entries
            // the scroll observer has not reached yet.
            entry.classList.add("is-visible");
            if (revealObserver) revealObserver.unobserve(entry);
            animateEntry(entry, Math.min(shown, 3) * 45);
            shown += 1;
          }
        });
        empty.hidden = shown > 0;
        window.requestAnimationFrame(onProgress);
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
