"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./terminal.module.css";
import { FACE } from "./data";
import { useReducedMotion } from "./useReducedMotion";

function buildFace(blink: boolean): string {
  if (!blink) return FACE.join("\n");
  return FACE.map((row, i) =>
    i >= 12 && i <= 18
      ? row.replace(/[a-zA-Z0-9*#%@&]/g, (m) => (Math.random() > 0.5 ? m : "-"))
      : row
  ).join("\n");
}

/**
 * The ASCII glyph self-portrait. Blinks on a loop and follows the cursor.
 * Both behaviors are disabled under prefers-reduced-motion.
 * (GSAP smooths the cursor-follow + adds the scanline pass in the motion layer.)
 */
export function Avatar() {
  const faceRef = useRef<HTMLSpanElement>(null);
  const scanRef = useRef<HTMLSpanElement>(null);
  const [blink, setBlink] = useState(false);
  const reduced = useReducedMotion();

  const face = useMemo(() => buildFace(blink), [blink]);

  // blink loop
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

  // cursor-follow (plain transform; upgraded to gsap.quickTo in the motion layer)
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = faceRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      el.style.transform = `translateX(${Math.max(-7, Math.min(7, dx * 14))}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span ref={faceRef} className={styles.avatar} data-avatar aria-hidden="true">
        {face}
      </span>
      <span ref={scanRef} className={styles.scanPass} data-scanpass aria-hidden="true" />
    </span>
  );
}
