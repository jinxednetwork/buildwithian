"use client";

/**
 * Terminal sound effects, synthesized on the fly with WebAudio.
 * ponytail: no sample files to ship, license, or preload — every sound here
 * is one oscillator and an envelope. Swap in samples only if these get boring.
 *
 * The AudioContext is created lazily on the first sound (browsers refuse to
 * start one before a user gesture, and every caller here is gesture-driven).
 * Mute state persists in localStorage; the `sound` command toggles it.
 */

const KEY = "black_box:sfx";

let ctx: AudioContext | null = null;
let muted: boolean | null = null;

function isMuted(): boolean {
  if (muted === null) {
    try {
      muted = localStorage.getItem(KEY) === "off";
    } catch {
      muted = false; // private mode / storage blocked — just play
    }
  }
  return muted;
}

function audio(): AudioContext | null {
  if (typeof window === "undefined" || isMuted()) return null;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type Tone = {
  freq: number;
  /** glide to this frequency over the tone's life */
  to?: number;
  dur: number;
  type?: OscillatorType;
  vol?: number;
};

function tone({ freq, to, dur, type = "square", vol = 0.04 }: Tone) {
  const c = audio();
  if (!c) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);

  // exponential ramps can't touch zero, hence the 0.0001 floor
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

export const sfx = {
  /** dry click under each keystroke — detuned per press so it doesn't drone */
  key: () =>
    tone({ freq: 1320 + Math.random() * 220, dur: 0.022, vol: 0.014 }),

  /** rising blip on Enter */
  submit: () =>
    tone({ freq: 480, to: 920, dur: 0.09, type: "triangle", vol: 0.045 }),

  /** falling sweep as the hero flies into the corner */
  whoosh: () =>
    tone({ freq: 880, to: 120, dur: 0.5, type: "sine", vol: 0.05 }),

  /** flips mute, persists it, returns the new muted state */
  toggle(): boolean {
    const next = !isMuted();
    muted = next;
    try {
      localStorage.setItem(KEY, next ? "off" : "on");
    } catch {
      // storage blocked — the toggle still holds for this session
    }
    if (!next) sfx.submit(); // confirm we're audible again
    return next;
  },

  isMuted,
};
