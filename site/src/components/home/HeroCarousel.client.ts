/**
 * HeroCarousel client-side controller
 * Handles carousel navigation, autoplay, and active slide tracking
 */

export function initHeroCarousel() {
  const root = document.querySelector("[data-hero-root]");
  const scroller = root?.querySelector("[data-carousel]");
  const prev = root?.querySelector("[data-prev]");
  const next = root?.querySelector("[data-next]");
  const slides = Array.from(root?.querySelectorAll("[data-slide]") ?? []);
  const dots = Array.from(root?.querySelectorAll("[data-dot]") ?? []);

  if (!root || !scroller || slides.length === 0) return;

  const total = slides.length;
  let activeIndex = 0;

  const setActive = (index: number) => {
    activeIndex = index;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  };

  const leftOfIndex = (index: number): number | null => {
    const target = slides[index];
    if (!target) return null;
    return target.offsetLeft;
  };

  const scrollToIndex = (index: number) => {
    const left = leftOfIndex(index);
    if (left == null) return;
    scroller.scrollTo({ left, behavior: "smooth" });
  };

  const scrollByOne = (direction: number) => {
    const width = scroller.clientWidth;
    scroller.scrollBy({ left: direction * width, behavior: "smooth" });
  };

  prev?.addEventListener("click", () => scrollByOne(-1));
  next?.addEventListener("click", () => scrollByOne(1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = Number(dot.getAttribute("data-dot-index"));
      if (!Number.isNaN(idx)) scrollToIndex(idx);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      let best: IntersectionObserverEntry | null = null;
      for (const e of entries) {
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
      }
      if (!best || !best.isIntersecting) return;
      const idx = Number(best.target.getAttribute("data-index"));
      if (!Number.isNaN(idx)) setActive(idx);
    },
    { root: scroller, threshold: [0.4, 0.6, 0.8] }
  );

  slides.forEach((s) => io.observe(s));

  // Autoplay
  const AUTOPLAY_MS = 6000;
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let timer: ReturnType<typeof setInterval> | null = null;
  let paused = false;

  const stopAutoplay = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const startAutoplay = () => {
    if (prefersReducedMotion) return;
    if (timer) return;
    timer = setInterval(() => {
      if (paused) return;
      const nextIndex = (activeIndex + 1) % total;
      scrollToIndex(nextIndex);
    }, AUTOPLAY_MS);
  };

  const pause = () => { paused = true; };
  const resume = () => { paused = false; };

  root.addEventListener("mouseenter", pause);
  root.addEventListener("mouseleave", resume);
  root.addEventListener("focusin", pause);
  root.addEventListener("focusout", resume);
  root.addEventListener("touchstart", pause, { passive: true });
  root.addEventListener("touchend", () => { setTimeout(resume, 800); }, { passive: true });

  if (total >= 2) startAutoplay();
  setActive(0);

  document.addEventListener("astro:before-swap", () => {
    stopAutoplay();
    io.disconnect();
  }, { once: true });
}

