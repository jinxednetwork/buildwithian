"use client";

import { useEffect, useRef } from "react";

/**
 * Glyph-based fire simulation along the bottom edge.
 * Heat propagates upward through a coarse grid and is rendered as density glyphs.
 * - canvas internal height tracks the element's CSS height (responsive strip)
 * - DPR capped at 2; pauses on document.hidden; full cleanup on unmount
 */
export function GlyphFire({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CH = 14;
    const chars = " ..:::++**oo##%%@@".split("");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let cw = 0;
    let rh = 0;
    let heat = new Float32Array(0);

    const idx = (cx: number, cy: number) => cy * cw + cx;

    function size() {
      w = window.innerWidth;
      // follow the CSS height of the strip so mobile media queries are honored
      h = canvas!.clientHeight || 240;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cw = Math.floor(w / CH) + 1;
      rh = Math.floor(h / CH) + 1;
      heat = new Float32Array(cw * rh);
    }

    function step() {
      for (let cx = 0; cx < cw; cx++) {
        const n = Math.random();
        heat[idx(cx, rh - 1)] =
          n > 0.32 ? 0.6 + Math.random() * 0.4 : Math.random() * 0.3;
      }
      for (let cy = 0; cy < rh - 1; cy++) {
        for (let cx = 0; cx < cw; cx++) {
          const below = heat[idx(cx, cy + 1)];
          const bl = heat[idx((cx - 1 + cw) % cw, cy + 1)];
          const br = heat[idx((cx + 1) % cw, cy + 1)];
          const v =
            below * 0.55 + bl * 0.2 + br * 0.2 - (0.06 + Math.random() * 0.05);
          heat[idx(cx, cy)] = v < 0 ? 0 : v;
        }
      }
    }

    function draw() {
      step();
      ctx!.clearRect(0, 0, w, h);
      ctx!.font = CH + "px monospace";
      ctx!.textBaseline = "top";
      for (let cy = 0; cy < rh; cy++) {
        for (let cx = 0; cx < cw; cx++) {
          const v = heat[idx(cx, cy)];
          if (v <= 0.05) continue;
          const ch = chars[Math.min(chars.length - 1, (v * (chars.length - 1)) | 0)];
          const lum = Math.min(255, 80 + v * 200);
          ctx!.fillStyle =
            "rgba(" + lum + "," + lum + "," + lum + "," + Math.min(1, v + 0.15) + ")";
          ctx!.fillText(ch, cx * CH, cy * CH);
        }
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
