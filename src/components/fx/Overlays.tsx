import styles from "@/components/terminal/terminal.module.css";

/**
 * Purely-CSS atmosphere layers: film grain, moving scanlines, and a vignette.
 * No canvas / no JS loop — the scanline drift is a CSS animation that the
 * module's prefers-reduced-motion rule already disables.
 */
export function Overlays() {
  return (
    <>
      <div className={styles.vig} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.scan} aria-hidden="true" />
    </>
  );
}
