/* Visual enhancements only. All content and controls work without this file. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const cards = [...document.querySelectorAll('.duo-card, .stat, .ask, .hand-card, .tier')];
  const icons = [...document.querySelectorAll('.mission-point > img, .duo-head > img, .pillar > img, .tier > img, .novel-grid article > img')];
  const running = new Set();
  const frames = new Map();
  const played = new WeakSet();

  cards.forEach(card => {
    card.classList.add('motion-card');
    card.addEventListener('pointermove', event => {
      if (reduce.matches || !pointer.matches || event.pointerType === 'touch') return;
      if (frames.has(card)) cancelAnimationFrame(frames.get(card));
      frames.set(card, requestAnimationFrame(() => {
        frames.delete(card);
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
        card.classList.add('pointer-active');
      }));
    });
    card.addEventListener('pointerleave', () => {
      if (frames.has(card)) cancelAnimationFrame(frames.get(card));
      frames.delete(card);
      card.classList.remove('pointer-active');
    });
  });

  const animateIcon = icon => {
    if (reduce.matches || played.has(icon) || typeof icon.animate !== 'function') return;
    played.add(icon);
    const animation = icon.animate([
      { transform: 'translateY(8px) scale(.82) rotate(-8deg)', opacity: .2 },
      { transform: 'translateY(-3px) scale(1.08) rotate(3deg)', opacity: 1, offset: .65 },
      { transform: 'translateY(0) scale(1) rotate(0deg)', opacity: 1 }
    ], { duration: 850, easing: 'cubic-bezier(.22,1,.36,1)', delay: 100 });
    running.add(animation);
    animation.onfinish = () => running.delete(animation);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateIcon(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .6 });
    icons.forEach(icon => observer.observe(icon));
  }

  // The schematic is illustrative, not a live server indicator.
  const diagram = document.querySelector('.hero-signal');
  let diagramVisible = true;
  const updatePlayback = () => {
    diagram?.classList.toggle('motion-paused', document.hidden || !diagramVisible || reduce.matches);
  };
  if (diagram && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      diagramVisible = entries[0].isIntersecting;
      updatePlayback();
    });
    observer.observe(diagram);
  }
  document.addEventListener('visibilitychange', updatePlayback);
  reduce.addEventListener('change', () => {
    if (reduce.matches) {
      running.forEach(animation => animation.cancel());
      running.clear();
      frames.forEach(frame => cancelAnimationFrame(frame));
      frames.clear();
      cards.forEach(card => card.classList.remove('pointer-active'));
    }
    updatePlayback();
  });
  updatePlayback();
})();
