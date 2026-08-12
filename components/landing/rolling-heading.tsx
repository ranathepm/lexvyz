"use client";

import { useEffect, useState } from "react";

// Rolling box effect — words roll up one after another like a slot machine.
const ROLL_WORDS = ["More Calls.", "More Cases.", "More Money."];
const ROLL_INTERVAL = 2200; // ms per word

export function RollingHeading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLL_WORDS.length);
    }, ROLL_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="relative inline-block overflow-hidden align-bottom"
      style={{ perspective: "400px" }}
    >
      {/* Reserve height of the tallest word so layout doesn't jump */}
      <span className="invisible" aria-hidden="true">
        {ROLL_WORDS[2]}
      </span>
      <span
        key={index}
        className="absolute inset-0 roll-up"
        style={{ transformOrigin: "50% 100%" }}
      >
        {ROLL_WORDS[index]}
      </span>
    </span>
  );
}
