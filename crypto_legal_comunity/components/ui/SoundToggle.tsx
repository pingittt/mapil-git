"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { editorialEase } from "@/lib/motion";
import { sound } from "@/lib/sound/sound-manager";
import { notifySoundChange, useSound } from "@/lib/sound/use-sound";

// ---------------------------------------------------------------------------
// SoundToggle — the single control that enables or mutes every interaction
// sound on the site. Preference persists in localStorage ("sound_enabled"),
// survives reloads, and defaults to OFF so nothing ever plays without the
// user explicitly asking for it (also keeps autoplay policies happy).
// The reactive `enabled` comes from useSound (useSyncExternalStore), so the
// icon updates without effects or hydration-sensitive mount tricks.
// ---------------------------------------------------------------------------

export default function SoundToggle() {
  const { enabled } = useSound();

  const handleToggle = () => {
    const next = !enabled;
    // Persist + confirm audibly on enable / silence instantly on disable.
    sound.setEnabled(next);
    // Re-render every component observing the preference.
    notifySoundChange();
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.25, ease: editorialEase }}
      aria-pressed={enabled}
      aria-label={enabled ? "Matikan suara" : "Aktifkan suara"}
      title={enabled ? "Sound ON" : "Sound OFF"}
      className={`inline-flex h-9 w-9 items-center justify-center border transition-colors duration-300 ${
        enabled
          ? "border-bronze/60 text-bronze-soft"
          : "border-surface-2 text-mute hover:border-paper/40 hover:text-paper"
      }`}
    >
      {enabled ? (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      ) : (
        <VolumeX className="h-4 w-4" aria-hidden="true" />
      )}
    </motion.button>
  );
}
