"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { usePointerFine } from "@/lib/utils/use-pointer-fine";

type CursorVariant = "default" | "hover" | "click";

export function CustomCursor() {
  const enabled = usePointerFine();
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const ringX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.6 });

  const dotX = useSpring(x, { stiffness: 900, damping: 35, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 35, mass: 0.2 });

  const labelX = useSpring(x, { stiffness: 380, damping: 28, mass: 0.4 });
  const labelY = useSpring(y, { stiffness: 380, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    function handleOver(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest("[data-cursor]");
      if (target) {
        setHoverLabel(target.getAttribute("data-cursor") || "");
        setVariant("hover");
      } else {
        setHoverLabel(null);
        setVariant((v) => (v === "click" ? v : "default"));
      }
    }

    function down() {
      setVariant("click");
    }
    function up() {
      setVariant((v) => (v === "click" ? "default" : v));
    }

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isHover = variant === "hover";
  const isClick = variant === "click";

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          html, body, * { cursor: none !important; }
        }
      `}</style>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHover ? 72 : 36,
            height: isHover ? 72 : 36,
            borderWidth: isHover ? 1 : 1.5,
            scale: isClick ? 0.9 : 1,
            opacity: isHover ? 0.85 : 0.6,
          }}
          transition={{ duration: 0.32, ease: [0.7, 0, 0.3, 1] }}
          style={{
            border: "1.5px solid currentColor",
            color: "var(--accent, #ffffff)",
            mixBlendMode: "difference",
            backgroundColor: "transparent",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHover ? 4 : 8,
            height: isHover ? 4 : 8,
            scale: isClick ? 1.6 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.7, 0, 0.3, 1] }}
          style={{
            backgroundColor: "var(--accent, #ffffff)",
            mixBlendMode: "difference",
          }}
        />
      </motion.div>

      <AnimatePresence>
        {hoverLabel && (
          <motion.div
            key={hoverLabel}
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-[9999]"
            style={{ x: labelX, y: labelY }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.7, 0, 0.3, 1] }}
          >
            <span
              className="absolute whitespace-nowrap font-display uppercase tracking-[0.3em] text-[10px] px-3 py-1.5"
              style={{
                left: 38,
                top: 28,
                background: "var(--accent, #ffffff)",
                color: "var(--bg, #000000)",
                letterSpacing: "0.18em",
              }}
            >
              {hoverLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full"
          initial={false}
          animate={{
            width: isClick ? 96 : 36,
            height: isClick ? 96 : 36,
            opacity: isClick ? 0 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            border: "1px solid var(--accent, #ffffff)",
            mixBlendMode: "difference",
          }}
        />
      </motion.div>
    </>
  );
}
