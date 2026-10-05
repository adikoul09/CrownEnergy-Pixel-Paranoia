// Verifies every text/background pairing the design system allows, on every surface.
// Run: node scripts/contrast.mjs  (exits 1 if any pair falls below its minimum)

// Each surface mirrors a scope in app/globals.css.
const surfaces = {
  // :root and .surface-ink — the vault
  ink: {
    "ink-0": "#080704",
    "ink-1": "#0f0d09",
    "ink-2": "#15130e",
    bone: "#faf8f3",
    "bone-2": "#aca698",
    "bone-3": "#8b8578",
    gold: "#b8941f",
    "gold-hi": "#d4af37",
    "gold-lo": "#9a7b1a",
    earned: "#d4af37",
    laurel: "#00804d",
    signal: "#d98b76",
  },
  // .surface-ivory — paper
  ivory: {
    "ink-0": "#faf8f3",
    "ink-1": "#f5f0e6",
    "ink-2": "#efe8d9",
    bone: "#080704",
    "bone-2": "#47423a",
    "bone-3": "#625c50",
    gold: "#735c20",
    "gold-hi": "#5c4813",
    "gold-lo": "#9a7b1a",
    earned: "#9a7b1a",
    laurel: "#006039",
    signal: "#a4442c",
  },
  // .surface-warm — the deeper paper
  warm: {
    "ink-0": "#f5f0e6",
    "ink-1": "#efe8d9",
    "ink-2": "#e9e1cf",
    bone: "#080704",
    "bone-2": "#47423a",
    "bone-3": "#625c50",
    gold: "#735c20",
    "gold-hi": "#5c4813",
    "gold-lo": "#9a7b1a",
    earned: "#9a7b1a",
    laurel: "#006039",
    signal: "#a4442c",
  },
};

// The lacquered plates: text is checked against the lightest stop of each
// gradient (the top edge, where the reference sits).
const plateText = { bone: "#faf8f3", "bone-2": "#ece6d8", "bone-3": "#dad3c2", gold: "#e8d48b", "gold-hi": "#f6ebc4" };
const plates = { verdant: "#005a30", aurum: "#6e5510", noir: "#1a1916" };

// The green navigation bar.
const green = { bar: "#006039", bone: "#faf8f3", "gold-hi": "#e8d48b", gold: "#d4af37" };

// Print: the certificate is printed on white.
const print = { paper: "#ffffff", ink: "#050505", gold: "#7a6224", laurel: "#00804d" };

// [foreground, background, minimum ratio, usage] — evaluated on each paper/ink surface
const surfacePairs = [
  ["bone", "ink-0", 7, "primary text"],
  ["bone", "ink-2", 7, "primary text on raised surface"],
  ["bone-2", "ink-0", 4.5, "secondary text"],
  ["bone-2", "ink-2", 4.5, "secondary text on raised surface"],
  ["bone-3", "ink-0", 4.5, "tertiary text / captions"],
  ["bone-3", "ink-1", 4.5, "tertiary text on surface"],
  ["bone-3", "ink-2", 4.5, "tertiary text on raised surface"],
  ["gold", "ink-0", 4.5, "reference numerals, labels"],
  ["gold", "ink-2", 4.5, "labels on raised surface"],
  ["gold-hi", "ink-0", 4.5, "hover text, focus ring"],
  ["gold-hi", "ink-1", 4.5, "hover text on surface"],
  ["earned", "ink-0", 3, "earned word — display sizes (≥ 24px) only"],
  ["earned", "ink-1", 3, "earned word on surface — display sizes only"],
  ["gold-lo", "ink-0", 3, "large display accents only"],
  // Laurel is a non-text indicator (WCAG 1.4.11: 3:1 against adjacent colours).
  ["laurel", "ink-0", 3, "progress rule, selected choice"],
  ["laurel", "ink-1", 3, "selected allocation choice"],
  ["laurel", "ink-2", 3, "indicator on raised surface"],
  ["signal", "ink-0", 4.5, "form error text"],
];

const toLinear = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failed = 0;
const check = (fgHex, bgHex, min, label) => {
  const r = ratio(fgHex, bgHex);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? "pass" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${label}`);
};

for (const [name, t] of Object.entries(surfaces)) {
  console.log(`\n— ${name}`);
  for (const [fg, bg, min, usage] of surfacePairs) check(t[fg], t[bg], min, `${fg} on ${bg} — ${usage}`);
}

console.log("\n— plates (lightest stop)");
for (const [plate, bg] of Object.entries(plates)) {
  for (const [role, fg] of Object.entries(plateText)) check(fg, bg, 4.5, `${role} on ${plate} plate`);
}

console.log("\n— navigation bar");
check(green.bone, green.bar, 7, "link and wordmark text on green");
check(green["gold-hi"], green.bar, 4.5, "hovered link text on green");
check(green["gold-hi"], green.bar, 3, "current-page rule on green (non-text)");
check(green["gold-hi"], green.bar, 3, "focus ring on green (non-text)");

console.log("\n— print");
check(print.ink, print.paper, 7, "printed certificate text");
check(print.gold, print.paper, 4.5, "printed certificate numerals, labels, seal");
check(print.laurel, print.paper, 3, "seal ring on the printed certificate");

console.log(failed ? `\n${failed} pairing(s) below minimum.` : "\nAll pairings meet WCAG AA.");
process.exit(failed ? 1 : 0);
