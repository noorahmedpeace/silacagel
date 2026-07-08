import confetti from "canvas-confetti";
import gsap from "gsap";

type CelebrationElements = {
  gift: HTMLElement | null;
  lid: HTMLElement | null;
  badge: HTMLElement | null;
};

function playCelebrationTone() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.55);
    gain.connect(context.destination);

    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start(context.currentTime + index * 0.08);
      oscillator.stop(context.currentTime + 0.42 + index * 0.08);
    });

    window.setTimeout(() => void context.close(), 800);
  } catch {
    // Audio is an enhancement and may be blocked by browser policy.
  }
}

export function runDiscountCelebration(
  elements: CelebrationElements,
  reducedMotion: boolean,
) {
  if (reducedMotion) return;

  playCelebrationTone();

  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  timeline
    .fromTo(elements.gift, { y: 28, scale: 0.72, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.55 })
    .to(elements.lid, { y: -24, rotate: -9, duration: 0.38, ease: "back.out(2)" }, "-=0.08")
    .fromTo(
      elements.badge,
      { y: 16, scale: 0.45, opacity: 0 },
      { y: -18, scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.8)" },
      "-=0.18",
    );

  const gold = ["#f7d774", "#d7a72f", "#fff0b3", "#ffffff"];
  const end = Date.now() + 1800;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 70,
      startVelocity: 38,
      origin: { x: 0, y: 0.72 },
      colors: gold,
      ticks: 170,
      gravity: 0.85,
      scalar: 0.9,
      disableForReducedMotion: true,
      zIndex: 10002,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 70,
      startVelocity: 38,
      origin: { x: 1, y: 0.72 },
      colors: gold,
      ticks: 170,
      gravity: 0.85,
      scalar: 0.9,
      disableForReducedMotion: true,
      zIndex: 10002,
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  };

  frame();
}
