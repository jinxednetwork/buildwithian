import type { ReactNode } from "react";
import styles from "./terminal.module.css";

// Accent helper — glowing white inline text, matching the prototype's `.accent`.
const A = ({ children }: { children: ReactNode }) => (
  <span className={styles.accent}>{children}</span>
);

/**
 * Offline canned-reply "brain". Kept verbatim from the prototype on purpose.
 *
 * TODO: wire to /api/chat later — swap this single function's body to call the
 * real endpoint (e.g. `await fetch("/api/chat", ...)`). Nothing else needs to change.
 */
export function chatReply(msg: string): ReactNode {
  const m = msg.toLowerCase();
  if (!m.trim())
    return (
      <>
        type something after chat — e.g. <A>chat what do you build</A>
      </>
    );
  if (/hire|work|freelanc|available|project/.test(m))
    return (
      <>
        Yes — I take serious work. Run <A>contact</A> and book a call. I move fast.
      </>
    );
  if (/who|you|yourself|ian/.test(m))
    return (
      <>
        I&apos;m the terminal version of Ian — a designer who learned to build. Run{" "}
        <A>about</A>.
      </>
    );
  if (/ai|automation|agent|claude/.test(m))
    return (
      <>
        AI is my unfair advantage — multi-agent systems in Claude Code, MVPs shipped
        solo. See <A>ventures</A>.
      </>
    );
  if (/design|video|creative|poster/.test(m))
    return (
      <>
        Design is the origin story — 1,000+ projects. Premium creative for nightlife
        brands. See <A>ventures</A>.
      </>
    );
  if (/price|cost|rate|money/.test(m))
    return (
      <>
        Depends on the problem. The good ones are worth solving — <A>contact</A>.
      </>
    );
  if (/hello|hi|hey|yo/.test(m))
    return (
      <>
        hey. you&apos;re talking to a face made of glyphs. run <A>help</A>.
      </>
    );
  return (
    <>
      Noted. I&apos;m a small offline brain — for the real conversation, <A>contact</A>{" "}
      me.
    </>
  );
}
