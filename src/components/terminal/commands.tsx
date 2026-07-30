"use client";

import type { ReactNode } from "react";
import styles from "./terminal.module.css";
import { useTerminal } from "./context";

// ----- inline token helpers (mirror the prototype's classes) -----
const M = ({ children }: { children: ReactNode }) => (
  <span className={styles.muted}>{children}</span>
);
const A = ({ children }: { children: ReactNode }) => (
  <span className={styles.accent}>{children}</span>
);
const Dim = ({ children }: { children: ReactNode }) => (
  <span className={styles.dimmer}>{children}</span>
);
const L = ({ href, children }: { href: string; children: ReactNode }) => (
  <a className={styles.link} href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

/** Clickable command word — runs the command on click (the prototype's `.k`). */
export function Cmd({ children, cmd }: { children: ReactNode; cmd?: string }) {
  const { run } = useTerminal();
  const word = (cmd ?? (typeof children === "string" ? children : "")).trim();
  return (
    <span
      className={styles.k}
      role="button"
      tabIndex={0}
      onClick={() => run(word)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          run(word);
        }
      }}
    >
      {children}
    </span>
  );
}

/** Commands offered to Tab autocomplete (same set as the prototype). */
export const CMDS = [
  "about",
  "ventures",
  "stack",
  "avatar",
  "art",
  "contact",
  "chat",
  "sound",
  "clear",
  "help",
  "tools",
  "work",
];

// ----- section copy (verbatim from the prototype) -----

export function AboutCopy() {
  return (
    <div className={styles.line}>
      <M># whoami</M>
      {"\n"}
      <span className={styles.sweep} style={{ fontSize: "1.05em" }}>
        Ian Almeida — designer, builder, creative technologist.
      </span>
      {"\n"}
      {"Self-taught designer & video editor (1,000+ projects). I mix design and"}
      {"\n"}
      {"technology to solve creative problems, build companies, and help people."}
      {"\n"}
      {"Based in Mumbai. Treats agency work as the floor, products as the ceiling."}
    </div>
  );
}

export function VenturesCopy() {
  return (
    <div className={styles.line}>
      <M># ventures --active</M>
      {"\n"}
      <A>Jinxed Network</A>
      {"      boutique creative agency — premium design & video"}
      {"\n"}
      {"                     for nightlife event companies (US · UK · UAE)"}
      {"\n"}
      <A>The Bombay AI Co.</A>
      {"   AI, automation & fractional-CTO consulting."}
      {"\n"}
      {"                     Forward-deployed engineering — ships artifacts, not decks."}
      {"\n"}
      <M>building toward</M>
      {"      products + the YC / SF ecosystem"}
    </div>
  );
}

export function StackCopy() {
  return (
    <div className={styles.line}>
      <M># stack</M>
      {"\n"}
      {"design     Figma · Photoshop · motion · brand systems"}
      {"\n"}
      {"build      Next.js · Tailwind · Shadcn · Supabase · Vercel"}
      {"\n"}
      {"ai         Claude Code · multi-agent systems · Fal.ai · FLUX"}
      {"\n"}
      {'edge       turning "what if" into a shipped thing by friday'}
    </div>
  );
}

export function ContactCopy() {
  return (
    <div className={styles.line}>
      <M># contact</M>
      {"\n"}
      {"linkedin   "}
      <L href="https://linkedin.com/in/ianalmeida">/in/ianalmeida</L>
      {"\n"}
      {"instagram  "}
      <L href="https://instagram.com/ian.almeida">@ian.almeida</L>
      {"\n"}
      {"youtube    "}
      <L href="https://youtube.com/@ianalmeida">@ianalmeida</L>
      {"\n"}
      {"email      "}
      <L href="mailto:ian@jinxednetwork.com">ian@jinxednetwork.com</L>
      {"\n"}
      {"call       "}
      <L href="https://cal.com/ian-almeida">cal.com/ian-almeida</L>
    </div>
  );
}

export function HelpCopy() {
  return (
    <div className={styles.line}>
      <M># available commands</M>
      {"\n"}
      <Cmd>about</Cmd>
      {"      who I am"}
      {"\n"}
      <Cmd>ventures</Cmd>
      {"   what I'm building"}
      {"\n"}
      <Cmd>stack</Cmd>
      {"      tools & weapons of choice"}
      {"\n"}
      <Cmd>avatar</Cmd>
      {"     summon the face"}
      {"\n"}
      <Cmd>art</Cmd>
      {"        dither pixel field"}
      {"\n"}
      <Cmd>contact</Cmd>
      {"    how to reach me"}
      {"\n"}
      <Cmd>chat</Cmd>
      {" "}
      <Dim>[msg]</Dim>
      {"  talk to the terminal"}
      {"\n"}
      <Cmd>sound</Cmd>
      {"      mute / unmute the bleeps"}
      {"\n"}
      <Cmd>clear</Cmd>
      {"      wipe the screen"}
      {"\n"}
      <Cmd>help</Cmd>
      {"       this list"}
      {"\n"}
      <span className={styles.hint}>
        up/down history · tab autocomplete · or click a command
      </span>
    </div>
  );
}
