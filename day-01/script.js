// Day 01 — Invoker Commands
// Feature-detects native support, loads a polyfill only when needed, and
// wires up the custom "--show-confetti" command dispatched by the demo button.

const supportsInvokers =
  "CommandEvent" in window && "command" in HTMLButtonElement.prototype;

if (!supportsInvokers) {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/invokers-polyfill@latest/dist/compat/invoker-commands.js";
  script.defer = true;
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsInvokers
      ? "✅ Your browser supports Invoker Commands natively."
      : "⏳ No native support detected — running on the invokers-polyfill instead.";
    status.classList.add(supportsInvokers ? "ok" : "nok");
  }

  const stage = document.querySelector("#confetti-stage");
  if (!stage) return;

  stage.addEventListener("command", (event) => {
    if (event.command !== "--show-confetti") return;
    burstConfetti(stage);
  });
});

function burstConfetti(stage, count = 24) {
  const colors = ["#7c5cff", "#22d3ee", "#ff8fa3", "#ffd166", "#4ade80"];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.setProperty("--x", `${(Math.random() - 0.5) * 320}px`);
    piece.style.setProperty("--rotate", `${Math.random() * 720 - 360}deg`);
    piece.style.setProperty("--delay", `${Math.random() * 120}ms`);
    piece.style.background = colors[i % colors.length];
    stage.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}
