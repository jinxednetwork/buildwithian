import gsap from "gsap";

/**
 * Single reusable reveal-timeline factory for terminal output blocks.
 * Subtle y + fade over ~0.25s with a 1–2px brightness flicker, so every block
 * enters consistently and cheaply. Uses from() so the element stays visible if
 * the animation never runs (fail-safe / reduced-motion).
 */
export function revealBlock(el: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.from(el, {
    autoAlpha: 0,
    y: 6,
    duration: 0.25,
    ease: "power2.out",
  });
  tl.fromTo(
    el,
    { filter: "brightness(1.7)" },
    { filter: "brightness(1)", duration: 0.14, ease: "none" },
    "<0.04"
  );
  return tl;
}

/** Quick brightness flash on the prompt line when a command is submitted. */
export function flashPrompt(el: HTMLElement) {
  gsap.fromTo(
    el,
    { filter: "brightness(2.2)" },
    { filter: "brightness(1)", duration: 0.28, ease: "power2.out" }
  );
}

/** Brief scanline sweep down over the avatar face. */
export function scanFace(el: HTMLElement) {
  gsap.fromTo(
    el,
    { top: "-25%", opacity: 0.85 },
    { top: "100%", opacity: 0, duration: 0.6, ease: "power1.in" }
  );
}
