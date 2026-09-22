(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const control = document.querySelector('.motion-control');
  const backgroundFilm = document.querySelector('#background-film');
  const hero = document.querySelector('.hero');
  let paused = reduced.matches;
  let heroVisible = false;
  let frame = 0;

  function sync() {
    const stopped = paused || document.hidden;
    document.body.classList.toggle('motion-paused', stopped);
    control.setAttribute('aria-pressed', String(paused));
    control.innerHTML = paused ? 'Resume motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    if (stopped || !heroVisible) backgroundFilm.pause();
    else if (backgroundFilm.paused) backgroundFilm.play().catch(() => {});
    if (stopped && frame) { cancelAnimationFrame(frame); frame = 0; }
    if (!stopped) schedule();
  }

  function render() {
    frame = 0;
    if (paused || document.hidden) return;
    const heroBox = hero.getBoundingClientRect();
    hero.style.setProperty('--hero-drift', `${Math.min(Math.max(-heroBox.top, 0), heroBox.height) * .15}px`);
  }

  function schedule() {
    if (!frame && !paused && !document.hidden) frame = requestAnimationFrame(render);
  }

  control.hidden = false;
  control.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.target === hero) heroVisible = entry.isIntersecting;
    }
    sync();
  }, { threshold: .08 });
  observer.observe(hero);
  sync();
})();
