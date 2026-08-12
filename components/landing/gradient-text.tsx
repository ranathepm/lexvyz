"use client";

// Reproduces the hero H1's rotating word (BlurWord) color treatment exactly:
// each letter gets a color lerped across the same 5-color gradient,
// positioned by letter index — same math as BlurWord in hero-section.tsx.
const GRADIENT_COLORS = ["#eca8d6", "#a78bfa", "#67e8f9", "#fbbf24", "#eca8d6"];

const hex2rgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

export function GradientText({ text, className = "" }: { text: string; className?: string }) {
  const letters = text.split("");
  return (
    <span className={`inline-block ${className}`}>
      {letters.map((char, i) => {
        const colorIndex =
          (i / Math.max(letters.length - 1, 1)) * (GRADIENT_COLORS.length - 1);
        const lower = Math.floor(colorIndex);
        const upper = Math.min(lower + 1, GRADIENT_COLORS.length - 1);
        const t = colorIndex - lower;
        const [r1, g1, b1] = hex2rgb(GRADIENT_COLORS[lower]);
        const [r2, g2, b2] = hex2rgb(GRADIENT_COLORS[upper]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
        return (
          <span
            key={i}
            style={{ color: `rgb(${r},${g},${b})`, display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}
