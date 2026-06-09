"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./terminal.module.css";
import { FACE } from "./data";
import { useReducedMotion } from "./useReducedMotion";
import { scanFace } from "./motion";

function buildFace(blink: boolean): string {
  if (!blink) return FACE.join("\n");
  return FACE.map((row, i) =>
    i >= 12 && i <= 18
      ? row.replace(/[a-zA-Z0-9*#%@&]/g, (m) => (Math.random() > 0.5 ? m : "-"))
      : row
  ).join("\n");
}

/**
 * The ASCII glyph self-portrait. Blinks on a loop, eases toward the cursor via
 * gsap.quickTo, and runs a scanline pass on mount + whenever a "terminal:scan"
 * event fires (the whoami / avatar commands). All motion is disabled under
 * prefers-reduced-motion.
 */
export function Avatar() {
  const faceRef = useRef<HTMLSpanElement>(null);
  const scanRef = useRef<HTMLSpanElement>(null);
  const [blink, setBlink] = useState(false);
  const reduced = useReducedMotion();

  const face = useMemo(() => buildFace(blink), [blink]);

  // blink loop (plain timers — not motion-critical)
  useEffect(() => {
    if (reduced) return;
    let mounted = true;
    let off: ReturnType<typeof setTimeout> | undefined;
    const id = setInterval(() => {
      if (!mounted) return;
      setBlink(true);
      off = setTimeout(() => mounted && setBlink(false), 150);
    }, 4600);
    return () => {
      mounted = false;
      clearInterval(id);
      if (off) clearTimeout(off);
    };
  }, [reduced]);

  // eased cursor-follow + scanline pass
  useGSAP(
    () => {
      if (reduced) return;
      const el = faceRef.current;
      const scan = scanRef.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        xTo(Math.max(-7, Math.min(7, dx * 14)));
      };
      const onScan = () => scan && scanFace(scan);

      window.addEventListener("mousemove", onMove);
      window.addEventListener("terminal:scan", onScan);
      if (scan) scanFace(scan); // scan once on mount

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("terminal:scan", onScan);
      };
    },
    { dependencies: [reduced] }
  );

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span ref={faceRef} className={styles.avatar} data-avatar aria-hidden="true">
        {face}
      </span>
      <span ref={scanRef} className={styles.scanPass} data-scanpass aria-hidden="true" />
    </span>
  );
}
