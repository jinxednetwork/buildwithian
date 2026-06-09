"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen falling-glyph "code rain" behind the terminal.
 * - DPR capped at 2 for retina crispness without melting low-end devices
 * - pauses on document.hidden, cleans up rAF + resize listener on unmount
 */
export function CodeRain({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const glyphs =
      "01{}[]()<>/\\|=+-*#&$%@!?;:.ABCDEFabcdef0123456789IAN".split("");
    const COL = 14;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let cols = 0;
    let drops: number[] = [];

    function size() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / COL);
      drops = Array(cols)
        .fill(0)
        .map(() => Math.random() * -h);
    }

    function draw() {
      ctx!.fillStyle = "rgba(5,5,5,0.08)";
      ctx!.fillRect(0, 0, w, h);
      ctx!.font = "13px monospace";
      for (let i = 0; i < cols; i++) {
        const ch = glyphs[(Math.random() * glyphs.length) | 0];
        const px = i * COL;
        const py = drops[i];
        const lead = Math.random() > 0.977;
        ctx!.fillStyle = lead
          ? "rgba(255,255,255,0.85)"
          : "rgba(170,170,170,0.45)";
        ctx!.fillText(ch, px, py);
        if (py > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += COL;
      }
    }

    let raf = 0;
    let disposed = false;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    size();
    start();
    window.addEventListener("resize", size);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      stop();
      window.removeEventListener("resize", size);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
