"use client";

import { useScroll } from "framer-motion";
import AnimatedPngBubble from "./AnimatedPngBubble";

export default function BubblesLayer() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <AnimatedPngBubble
        src="/bubbles/b1.png"
        positionClass="top-10 right-10"
        scrollYProgress={scrollYProgress}
        size={420}
        phase={0.2}
      />
      <AnimatedPngBubble
        src="/bubbles/b2.png"
        positionClass="bottom-24 left-10"
        scrollYProgress={scrollYProgress}
        size={260}
        phase={0.6}
        parallax={0.25}
        intensity={1.2}
      />
    </>
  );
}
