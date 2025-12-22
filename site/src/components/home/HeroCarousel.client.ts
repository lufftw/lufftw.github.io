/**
 * HeroCarousel client-side controller
 * Handles carousel navigation, autoplay, and active slide tracking
 */

// Store cleanup functions to prevent duplicate initialization
const cleanupMap = new WeakMap<HTMLElement, () => void>();

export function initHeroCarousel() {
  const root = document.querySelector("[data-hero-root]") as HTMLElement | null;
  const scroller = root?.querySelector("[data-carousel]") as HTMLElement | null;
  const prev = root?.querySelector("[data-prev]") as HTMLButtonElement | null;
  const next = root?.querySelector("[data-next]") as HTMLButtonElement | null;
  const slides = Array.from(root?.querySelectorAll("[data-slide]") ?? []) as HTMLElement[];
  const dots = Array.from(root?.querySelectorAll("[data-dot]") ?? []) as HTMLButtonElement[];

  if (!root || !scroller || slides.length === 0) return;

  // Clean up previous initialization if exists
  const existingCleanup = cleanupMap.get(root);
  if (existingCleanup) {
    existingCleanup();
  }

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

  const handlePrevClick = () => scrollByOne(-1);
  const handleNextClick = () => scrollByOne(1);
  
  prev?.addEventListener("click", handlePrevClick);
  next?.addEventListener("click", handleNextClick);

  const dotClickHandlers: Array<() => void> = [];
  dots.forEach((dot) => {
    const handleDotClick = () => {
      const idx = Number(dot.getAttribute("data-dot-index"));
      if (!Number.isNaN(idx)) scrollToIndex(idx);
    };
    dot.addEventListener("click", handleDotClick);
    dotClickHandlers.push(handleDotClick);
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
  const handleTouchStart = () => pause();
  const handleTouchEnd = () => { setTimeout(resume, 800); };
  root.addEventListener("touchstart", handleTouchStart, { passive: true });
  root.addEventListener("touchend", handleTouchEnd, { passive: true });

  if (total >= 2) startAutoplay();
  setActive(0);

  const handleBeforeSwap = () => {
    stopAutoplay();
    io.disconnect();
  };
  document.addEventListener("astro:before-swap", handleBeforeSwap, { once: true });

  // Store cleanup function
  cleanupMap.set(root, () => {
    stopAutoplay();
    io.disconnect();
    prev?.removeEventListener("click", handlePrevClick);
    next?.removeEventListener("click", handleNextClick);
    dots.forEach((dot, i) => {
      if (dotClickHandlers[i]) {
        dot.removeEventListener("click", dotClickHandlers[i]);
      }
    });
    root.removeEventListener("mouseenter", pause);
    root.removeEventListener("mouseleave", resume);
    root.removeEventListener("focusin", pause);
    root.removeEventListener("focusout", resume);
    root.removeEventListener("touchstart", handleTouchStart);
    root.removeEventListener("touchend", handleTouchEnd);
    document.removeEventListener("astro:before-swap", handleBeforeSwap);
  });
}

