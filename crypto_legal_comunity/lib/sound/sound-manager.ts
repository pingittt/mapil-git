"use client";

// ---------------------------------------------------------------------------
// Sound manager for CLC.
//
// Design goals (per the motion/sound spec):
//  • No autoplay: sounds only ever play after a real user interaction. The
//    preference defaults to ON so the site doesn't feel dead-quiet, and can
//    be muted anytime via the footer toggle; actual playback is still gated
//    by browser autoplay policies (first gesture unlocks the context).
//  • Zero required assets: every cue is synthesized with the Web Audio API
//    (a few oscillator notes), so nothing can 404 and nothing has to be
//    downloaded. If you want custom audio later, drop royalty-free files in
//    `public/sounds/` (click.mp3, success.mp3, error.mp3, notification.mp3)
//    and they automatically take priority over the synthesized cues.
//  • Failure isolated: every play path is wrapped in try/catch. If the
//    browser blocks audio (autoplay policy, missing permission, no device),
//    the site keeps working exactly as before — never an error UI.
//  • One shared AudioContext, created lazily on first interaction. Browsers
//    cap the number of AudioContexts, so components never create their own.
// ---------------------------------------------------------------------------

export type SoundName =
  | "click" // very short, subtle — generic button press
  | "success" // two-note positive cue — form verified
  | "confirm" // slightly richer success — confirmation page
  | "error" // short, soft — validation errors
  | "whoosh" // light airy cue — dropdown open / nav interactions
  | "notification"; // gentle ping — WhatsApp hand-off

const STORAGE_KEY = "sound_enabled";

type OverlayCue = {
  file: string;
  volume: number;
};

// Optional user-supplied assets (public/sounds/*). When a file exists it is
// used instead of the synthesized cue; when it doesn't, the synth plays and
// the failed fetch is silently ignored.
const OVERLAY: Record<SoundName, OverlayCue> = {
  click: { file: "/sounds/click.mp3", volume: 0.24 },
  success: { file: "/sounds/success.mp3", volume: 0.3 },
  confirm: { file: "/sounds/success.mp3", volume: 0.34 },
  error: { file: "/sounds/error.mp3", volume: 0.28 },
  whoosh: { file: "/sounds/hover.mp3", volume: 0.16 },
  notification: { file: "/sounds/notification.mp3", volume: 0.32 },
};

// Per-cue probe timestamps — files are re-checked at most once a minute,
// so adding files later starts working without a code change.
const OVERLAY_RETRY_MS = 60_000;
const overlayLastCheck = new Map<SoundName, number>();

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let unlockArmed = false;
const overlayCache = new Map<SoundName, string>();

// --- AudioContext lifecycle ------------------------------------------------

function createCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);
    return ctx;
  } catch {
    ctx = null;
    master = null;
    return null;
  }
}

// Autoplay policies start a fresh AudioContext in "suspended" state until a
// user gesture occurs. We resume on the first gesture and keep the context
// for the whole session.
function armUnlock(): void {
  if (unlockArmed || typeof window === "undefined") return;
  unlockArmed = true;
  const unlock = () => {
    try {
      const c = ctx ?? createCtx();
      if (c && c.state === "suspended") void c.resume().catch(() => undefined);
    } catch {
      /* ignore */
    }
  };
  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("keydown", unlock, { passive: true });
}

// --- Preference ------------------------------------------------------------

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // Default ON: first-time visitors get the subtle interaction sounds
    // (after their first gesture, per autoplay policy). Muting once sticks.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === "1";
  } catch {
    return true;
  }
}

export function setSoundEnabled(enabled: boolean): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    /* ignore — preference just won't persist */
  }
  if (enabled) {
    // Disabling suspends the shared context — wake it up first, then confirm
    // with a click so the toggle gives audible feedback on enable.
    try {
      if (ctx && ctx.state === "suspended") {
        void ctx
          .resume()
          .then(() => play("click"))
          .catch(() => undefined);
        return;
      }
    } catch {
      /* ignore */
    }
    void play("click");
  } else {
    // Respect the off switch instantly: stop anything still sounding.
    try {
      ctx?.suspend().catch(() => undefined);
    } catch {
      /* ignore */
    }
  }
}

// Subscribe mechanism for anything that needs to observe the preference
// (kept as part of the manager's public API). The React hook in use-sound.ts
// handles the UI side via useSyncExternalStore.
type Listener = (enabled: boolean) => void;

export function onSoundEnabledChange(fn: Listener): () => void {
  if (typeof window === "undefined") return () => undefined;
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) fn(e.newValue === "1");
  };
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("storage", onStorage);
  };
}

// --- Synthesized cues --------------------------------------------------------
// Each cue is a handful of oscillator notes with quick exponential ramps.
// Quiet by design: peak gains live between 0.05 and 0.2.

type Note = {
  f: number; // frequency (Hz)
  t: number; // start offset (s)
  d: number; // duration (s)
  v: number; // peak gain
  type?: OscillatorType;
};

const CUES: Record<SoundName, Note[]> = {
  click: [
    { f: 1150, t: 0, d: 0.07, v: 0.1 },
    { f: 2300, t: 0.012, d: 0.045, v: 0.04 },
  ],
  whoosh: [
    { f: 300, t: 0, d: 0.16, v: 0.05, type: "triangle" },
    { f: 620, t: 0.05, d: 0.18, v: 0.04, type: "triangle" },
  ],
  success: [
    { f: 523.25, t: 0, d: 0.16, v: 0.12 },
    { f: 783.99, t: 0.1, d: 0.24, v: 0.1 },
  ],
  confirm: [
    { f: 392.0, t: 0, d: 0.18, v: 0.1 },
    { f: 587.33, t: 0.11, d: 0.2, v: 0.1 },
    { f: 783.99, t: 0.22, d: 0.42, v: 0.09 },
  ],
  error: [
    { f: 220, t: 0, d: 0.14, v: 0.09, type: "triangle" },
    { f: 185, t: 0.1, d: 0.2, v: 0.08, type: "triangle" },
  ],
  notification: [
    { f: 880, t: 0, d: 0.12, v: 0.1 },
    { f: 1174.66, t: 0.09, d: 0.26, v: 0.09 },
  ],
};

function scheduleNotes(notes: Note[]): void {
  const c = ctx;
  if (!c || !master) return;
  const now = c.currentTime;

  for (const n of notes) {
    const osc = c.createOscillator();
    const gain = c.createGain();
    const type = n.type ?? "sine";
    osc.type = type;
    osc.frequency.value = n.f;
    const start = now + n.t;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(n.v, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + n.d);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + n.d + 0.05);
  }
}

// --- Optional asset overlay --------------------------------------------------

async function tryPlayOverlay(name: SoundName): Promise<void> {
  if (typeof window === "undefined" || typeof Audio === "undefined") return;

  const now = Date.now();
  const last = overlayLastCheck.get(name) ?? 0;
  const shouldCheck = now - last > OVERLAY_RETRY_MS;

  let src = overlayCache.get(name);
  if (shouldCheck && !src) {
    overlayLastCheck.set(name, now);
    const probe = new Audio();
    const url = OVERLAY[name].file;
    await new Promise<void>((resolve) => {
      let done = false;
      const finish = () => {
        if (!done) {
          done = true;
          resolve();
        }
      };
      probe.addEventListener("canplaythrough", finish, { once: true });
      probe.addEventListener("error", finish, { once: true });
      try {
        probe.preload = "auto";
        probe.src = url;
      } catch {
        finish();
      }
      window.setTimeout(finish, 1500);
    });
    if (probe.error === null && probe.readyState >= 3) {
      overlayCache.set(name, url);
      src = url;
    }
  }
  if (!src) return;

  try {
    const audio = new Audio(src);
    audio.volume = OVERLAY[name].volume;
    audio.preload = "auto";
    await audio.play();
  } catch {
    /* asset failed this time — nothing to do, silence is fine */
  }
}

// --- Public API --------------------------------------------------------------

export function play(name: SoundName): void {
  // Fast path: preference off → no-op. Checked first so the common case
  // costs nothing.
  if (!isSoundEnabled()) return;

  try {
    armUnlock();
    const c = ctx ?? createCtx();
    if (!c) return;

    if (c.state === "suspended") {
      // Autoplay policy: no user gesture has reached this context yet, so it
      // can't sound. Queueing notes now would dump them all at once after
      // the unlock — wake it and skip this cue instead.
      void c.resume().catch(() => undefined);
      return;
    }

    scheduleNotes(CUES[name]);
  } catch {
    return; // audio failure is isolated — the UI keeps working
  }

  // Overlay assets are attempted outside the try so a rejected promise
  // can't surface as an unhandled rejection.
  void tryPlayOverlay(name).catch(() => undefined);
}

export const sound = {
  play,
  isEnabled: isSoundEnabled,
  setEnabled: setSoundEnabled,
  onChange: onSoundEnabledChange,
};

export default sound;
