"use client";

import { useEffect, useRef } from "react";

/**
 * 1-bit Bayer-dithered field — an always-dissolving halftone, rendered by the
 * `art` command. Deliberately low-res (300x150) with image-rendering:pixelated,
 * so it is NOT DPR-scaled. Pauses on document.hidden; cleans up on unmount.
 */
export function DitherField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const bayer = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ];
    let t = 0;

    function frame() {
      const img = ctx!.createImageData(W, H);
      for (let py = 0; py < H; py++) {
        for (let px = 0; px < W; px++) {
          const cx = W / 2 + Math.cos(t * 0.012) * 60;
          const cy = H / 2 + Math.sin(t * 0.017) * 30;
          const d = Math.hypot(px - cx, py - cy);
          let v = 0.5 + 0.5 * Math.sin(d * 0.06 - t * 0.05);
          v *= 1 - Math.min(1, d / 200);
          v += 0.12 * Math.sin((px + py) * 0.05 + t * 0.03);
          const thr = (bayer[py & 3][px & 3] + 0.5) / 16;
          const i = (py * W + px) * 4;
          const c = v > thr ? 235 : 8;
          img.data[i] = c;
          img.data[i + 1] = c;
          img.data[i + 2] = c;
          img.data[i + 3] = 255;
        }
      }
      ctx!.putImageData(img, 0, 0);
      t++;
    }

    let raf = 0;
    let disposed = false;
    const loop = () => {
      frame();
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

    start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas ref={ref} width={300} height={150} className={className} aria-hidden="true" />
  );
}
