"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import styles from "./terminal.module.css";
import { IAN } from "./data";
import { Avatar } from "./Avatar";
import { TerminalContext } from "./context";
import {
  AboutCopy,
  Cmd,
  CMDS,
  ContactCopy,
  HelpCopy,
  StackCopy,
  VenturesCopy,
} from "./commands";
import { chatReply } from "./chat";
import { CodeRain } from "@/components/fx/CodeRain";
import { GlyphFire } from "@/components/fx/GlyphFire";
import { DitherField } from "@/components/fx/DitherField";
import { Overlays } from "@/components/fx/Overlays";

type Block = { id: number; node: ReactNode };

const M = ({ children }: { children: ReactNode }) => (
  <span className={styles.muted}>{children}</span>
);
const A = ({ children }: { children: ReactNode }) => (
  <span className={styles.accent}>{children}</span>
);

function Hero() {
  return (
    <div className={styles.hero} data-hero>
      <Avatar />
      <div className={styles.ian}>
        <span className={styles.sweep} data-ian>
          {IAN.join("\n")}
        </span>
        <div className={styles.tag}>
          designer · indie-hacker · builder of cool sh*t — mumbai
        </div>
      </div>
    </div>
  );
}

export function Terminal() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const historyRef = useRef<string[]>([]);
  const hiRef = useRef(0);

  const nextId = () => ++idRef.current;

  const echo = (raw: string): ReactNode => (
    <div className={styles.line}>
      <span className={styles.ps1} style={{ margin: 0 }}>
        ian@almeida:~$
      </span>{" "}
      <span className={styles.cmdEcho}>{raw}</span>
    </div>
  );

  const run = useCallback((raw: string) => {
    const trimmed = raw.trim();
    const firstTok = trimmed.split(/\s+/)[0] || "";
    const cmd = firstTok.toLowerCase();
    const rest = trimmed.slice(firstTok.length).trim();

    if (cmd === "clear" || cmd === "cls") {
      setBlocks([]);
      return;
    }

    let result: ReactNode = null;
    switch (cmd) {
      case "":
        break;
      case "help":
      case "?":
        result = <HelpCopy />;
        break;
      case "about":
      case "whoami":
        result = <AboutCopy />;
        break;
      case "ventures":
      case "work":
        result = <VenturesCopy />;
        break;
      case "stack":
      case "tools":
        result = <StackCopy />;
        break;
      case "contact":
      case "connect":
        result = <ContactCopy />;
        break;
      case "avatar":
      case "face":
        result = (
          <div className={styles.line}>
            <Avatar />
            {"\n"}
            <M>— move your cursor. it watches.</M>
          </div>
        );
        break;
      case "chat":
      case "ask":
        result = (
          <div className={styles.line}>
            <M>{rest}</M>
            {"\n"}
            {chatReply(rest)}
          </div>
        );
        break;
      case "ls":
        result = (
          <div className={styles.line}>
            about&nbsp;&nbsp;ventures&nbsp;&nbsp;stack&nbsp;&nbsp;avatar&nbsp;&nbsp;art&nbsp;&nbsp;contact&nbsp;&nbsp;chat
          </div>
        );
        break;
      case "art":
      case "dither":
        result = (
          <div className={styles.line}>
            <DitherField className={styles.dither} />
            {"\n"}
            <M>— 1-bit dither field. always dissolving.</M>
          </div>
        );
        break;
      case "sudo":
        result = (
          <div className={styles.line}>
            <M>nice try.</M>
          </div>
        );
        break;
      default:
        result = (
          <div className={styles.line}>
            <M>command not found: {cmd}</M>
            {"\n"}
            type <Cmd>help</Cmd>, or <A>chat {raw}</A> to talk.
          </div>
        );
    }

    setBlocks((b) => {
      const next = [...b, { id: nextId(), node: echo(raw) }];
      if (result !== null) next.push({ id: nextId(), node: result });
      return next;
    });
  }, []);

  const submit = () => {
    const v = value;
    if (v.trim()) historyRef.current.push(v);
    hiRef.current = historyRef.current.length;
    setValue("");
    run(v);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const hist = historyRef.current;
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hiRef.current > 0) {
        hiRef.current--;
        setValue(hist[hiRef.current] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hiRef.current < hist.length - 1) {
        hiRef.current++;
        setValue(hist[hiRef.current] || "");
      } else {
        hiRef.current = hist.length;
        setValue("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const p = value.toLowerCase();
      const hit = p && CMDS.find((c) => c.startsWith(p));
      if (hit) setValue(hit);
    }
  };

  // boot sequence (the GSAP motion layer enhances this in the next commit)
  useEffect(() => {
    const lines = [
      "> system boot sequence",
      "> initializing black_box v2.0 ...",
      "> rendering user glyph [1-bit dither] ...",
      "> identity verified",
    ];
    const initial: Block[] = lines.map((t) => ({
      id: nextId(),
      node: (
        <div className={styles.line}>
          <M>{t}</M>
        </div>
      ),
    }));
    initial.push({ id: nextId(), node: <div className={styles.line}>&nbsp;</div> });
    initial.push({ id: nextId(), node: <Hero /> });
    initial.push({ id: nextId(), node: <div className={styles.line}>&nbsp;</div> });
    initial.push({
      id: nextId(),
      node: (
        <div className={styles.line}>
          <M>welcome. this site is a terminal. type a command to explore.</M>
        </div>
      ),
    });
    initial.push({ id: nextId(), node: <HelpCopy /> });
    setBlocks(initial);
    inputRef.current?.focus();
  }, []);

  // keep the log pinned to the newest output
  useEffect(() => {
    const el = termRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [blocks]);

  const focusInput = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a,[role=button]")) return;
    inputRef.current?.focus();
  };

  const ctx = useMemo(() => ({ run }), [run]);

  return (
    <TerminalContext.Provider value={ctx}>
      <div className={styles.root} onClick={focusInput}>
        <CodeRain className={styles.rain} />
        <GlyphFire className={styles.fire} />
        <Overlays />

        <div className={styles.wrap}>
          <div className={styles.topbar}>
            <span>
              <span className={styles.dot} />
              <span className={styles.glyph}>ian@almeida</span> : ~/terminal
            </span>
            <span>black_box v2.0 // mumbai</span>
          </div>

          <div className={styles.term} ref={termRef} role="log" aria-live="polite">
            {blocks.map((b) => (
              <div key={b.id} data-block>
                {b.node}
              </div>
            ))}
          </div>

          <div className={styles.inputrow}>
            <span className={styles.ps1}>ian@almeida:~$</span>
            <span className={styles.render}>{value}</span>
            <span className={styles.caret} />
            <input
              ref={inputRef}
              className={styles.input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() =>
                inputRef.current?.scrollIntoView({ block: "nearest" })
              }
              aria-label="terminal input"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              autoFocus
            />
          </div>
        </div>
      </div>
    </TerminalContext.Provider>
  );
}
