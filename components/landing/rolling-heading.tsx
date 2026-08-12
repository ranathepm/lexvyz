"use client";

import { useEffect, useState } from "react";

// Rolling box effect — the word stays in place, flips upward and out,
// then the next word rises up from below the box (slot machine style).
const ROLL_WORDS = ["More Calls.", "More Cases.", "More Money."];
const ROLL_INTERVAL = 2200; // ms per word

export function RollingHeading() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % ROLL_WORDS.length);
    }, ROLL_INTERVAL);
    return () => clearInterval(id);
  }, [index]);

  return (
    <span
      className="relative inline-block overflow-hidden align-bottom"
      style={{ perspective: "400px" }}
    >
      {/* Reserve height of the tallest word so layout doesn't jump */}
      <span className="invisible" aria-hidden="true">
        {ROLL_WORDS[2]}
      </span>

      {/* Outgoing word — flips up and out */}
      {prevIndex !== null && (
        <span key={`out-${prevIndex}`} className="absolute inset-0 roll-up-out">
          {ROLL_WORDS[prevIndex]}
        </span>
      )}

      {/* Incoming word — rises from below */}
      <span
        key={`in-${index}`}
        className={`absolute inset-0 ${prevIndex === null ? "" : "roll-up-in"}`}
      >
        {ROLL_WORDS[index]}
      </span>
    </span>
  );
}
