"use client";

import { useCallback, useSyncExternalStore } from "react";
import sound, { type SoundName } from "@/lib/sound/sound-manager";

// ---------------------------------------------------------------------------
// useSound — tiny hook for components that need the sound system.
//
// Returns:
//  • `enabled` — reactive sound preference (updates via storage events when
//                toggled from another tab).
//  • `play`    — safe play function; every cue is wrapped by the manager so
//                audio failures can never break component logic.
// ---------------------------------------------------------------------------

const listeners = new Set<() => void>();
let cache: boolean | null = null;

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function getSnapshot(): boolean {
  if (cache === null) cache = sound.isEnabled();
  return cache;
}

// Notified by the toggle whenever the preference flips.
export function notifySoundChange(): void {
  cache = null;
  listeners.forEach((fn) => fn());
}

export function useSound() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const play = useCallback((name: SoundName) => {
    sound.play(name);
  }, []);

  return { enabled, play };
}
