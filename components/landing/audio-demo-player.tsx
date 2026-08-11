"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Audio demo player — "Hear a real AI intake call"
// Drop your audio file at: public/audio/lexvyz-demo-call.mp3
// (update AUDIO_SRC below if you name it differently)
// ─────────────────────────────────────────────────────────────
const AUDIO_SRC = "/audio/lexvyz-demo-call.mp3";

// Fake waveform bars for the idle/playing visualization
const WAVE_BARS = Array.from({ length: 32 }, (_, i) => {
  // deterministic pseudo-random heights
  const h = 8 + ((i * 37) % 22);
  return h;
});

export function AudioDemoPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {
        // Audio file not added yet — still show UI without erroring
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="inline-flex items-center gap-5 border border-white/15 bg-white/[0.04] backdrop-blur-md rounded-xl px-5 py-4 max-w-full">
      <audio ref={audioRef} src={AUDIO_SRC} preload="none" />

      {/* Play / Pause button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause demo call" : "Play demo call"}
        className="shrink-0 w-12 h-12 rounded-full bg-[#ff4d6d] hover:bg-[#ff4d6d]/85 text-white flex items-center justify-center transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </button>

      {/* Label + waveform */}
      <div className="min-w-0">
        <p className="text-white text-sm font-medium mb-1.5 whitespace-nowrap">
          Hear a real AI intake call
        </p>
        <div className="flex items-end gap-[3px] h-6" aria-hidden="true">
          {WAVE_BARS.map((h, i) => (
            <span
              key={i}
              className={`w-[3px] rounded-full transition-all duration-300 ${
                isPlaying ? "bg-[#ff4d6d]" : "bg-white/30"
              }`}
              style={{
                height: `${h}px`,
                animation: isPlaying
                  ? `wave-bounce 0.9s ease-in-out ${i * 0.05}s infinite`
                  : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Duration placeholder */}
      <span className="shrink-0 text-xs font-mono text-white/40">
        0:45
      </span>

      <style jsx>{`
        @keyframes wave-bounce {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
