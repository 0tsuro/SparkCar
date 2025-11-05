"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Transition, // 👈 importe le type
} from "framer-motion";
import { useMemo } from "react";

type Props = {
  src: string;
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
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const x = useTransform(scrollYProgress, [0, 1], [0, -parallax * 90]);
  const y = useTransform(scrollYProgress, [0, 1], [0, parallax * 60]);

  // Memoize amplitudes
  const amplitudes = useMemo(
    () => ({
      y: 16 * intensity,
      rotation: 1.2 * intensity,
      scale: 0.03 * intensity,
    }),
    [intensity]
  );

  // Animation variants
  const animationStates = useMemo(
    () =>
      prefersReducedMotion
        ? { scale: 1, rotate: 0, y: 0 }
        : {
            y: [0, -amplitudes.y, 0, amplitudes.y * 0.8, 0],
            rotate: [
              -amplitudes.rotation,
              amplitudes.rotation * 1.4,
              -amplitudes.rotation * 0.7,
              amplitudes.rotation,
              -amplitudes.rotation,
            ],
            scale: [1, 1 + amplitudes.scale, 1, 1 - amplitudes.scale * 0.7, 1],
          },
    [prefersReducedMotion, amplitudes]
  );

  // ✅ Typage explicite + tuple pour ease
  const transition: Transition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: floatDuration,
            ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
            repeat: Infinity,
            repeatType: "mirror",
            delay: phase,
          },
    [prefersReducedMotion, floatDuration, phase]
  );

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${positionClass} will-change-transform`}
      style={{
        x,
        y,
        opacity,
        width: size,
        height: size,
      }}
      initial={{ scale: 0.95, rotate: 0, y: 0 }}
      animate={animationStates}
      transition={transition}
    >
      <div className="relative w-full h-full">
        {/* Main bubble image */}
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          priority
          className={`w-full h-auto ${
            glow ? "drop-shadow-[0_0_35px_rgba(120,170,255,0.4)]" : ""
          }`}
          style={{ objectFit: "contain" }}
        />

        {/* Light reflection effect */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              background:
                "linear-gradient(75deg, rgba(255,255,255,0) 15%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 85%)",
              mixBlendMode: "screen",
            }}
            initial={{ x: "-120%" }}
            animate={{ x: ["-120%", "140%"] }}
            transition={{
              duration: floatDuration * 1.3,
              repeat: Infinity,
              ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
              delay: phase * 0.6,
            }}
          />
        )}

        {/* Additional subtle glow for depth */}
        {glow && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(100,150,255,0.15) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: floatDuration * 0.8,
              repeat: Infinity,
              ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
              delay: phase,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
