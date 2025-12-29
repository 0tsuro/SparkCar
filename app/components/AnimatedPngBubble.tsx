"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type Transition,
} from "framer-motion";
import { useMemo } from "react";

type Props = {
  src: string;
  scrollYProgress: MotionValue<number>;
  size?: number;
  positionClass?: string;
  opacity?: number;
  floatDuration?: number;
  phase?: number;
  parallax?: number;
  intensity?: number;
  glow?: boolean;
};

export default function AnimatedPngBubble({
  src,
  scrollYProgress,
  size = 420,
  positionClass = "top-10 right-10",
  opacity = 0.8,
  floatDuration = 6.5,
  phase = 0,
  parallax = 0.35,
  intensity = 1.6,
  glow = true,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  // Parallax only affects transforms (cheap)
  const x = useTransform(scrollYProgress, [0, 1], [0, -parallax * 90]);
  const y = useTransform(scrollYProgress, [0, 1], [0, parallax * 60]);

  const amp = useMemo(
    () => ({
      y: 10 * intensity,
      r: 1.0 * intensity,
      s: 0.02 * intensity,
    }),
    [intensity]
  );

  const animate = useMemo(() => {
    if (prefersReducedMotion) return { y: 0, rotate: 0, scale: 1 };
    return {
      y: [0, -amp.y, 0, amp.y * 0.7, 0],
      rotate: [-amp.r, amp.r, -amp.r * 0.6, amp.r * 0.8, -amp.r],
      scale: [1, 1 + amp.s, 1, 1 - amp.s * 0.7, 1],
    };
  }, [prefersReducedMotion, amp]);

  const transition: Transition = useMemo(() => {
    if (prefersReducedMotion) return { duration: 0 };
    return {
      duration: floatDuration,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
      repeat: Infinity,
      repeatType: "mirror",
      delay: phase,
    };
  }, [prefersReducedMotion, floatDuration, phase]);

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${positionClass} transform-gpu will-change-transform`}
      style={{ x, y, opacity, width: size, height: size }}
      initial={false}
      animate={animate}
      transition={transition}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          className={`w-full h-auto ${glow ? "drop-shadow-[0_0_28px_rgba(120,170,255,0.32)]" : ""}`}
          style={{ objectFit: "contain" }}
        />

        {/* Very cheap static overlay (no animation) */}
        {glow && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 35%, transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
