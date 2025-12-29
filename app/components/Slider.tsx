"use client";

import Image from "next/image";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SliderPair {
  before: string;
  after: string;
  title: string;
  formula: string;
  details: string[];
}

export const Slider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // ✅ Ref du conteneur pour calculer la position
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // ✅ Drag UNIQUEMENT sur la poignée/barre
  const handleRef = useRef<HTMLDivElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

  const slides: SliderPair[] = [
    {
      before: "/cleanmerco1.svg",
      after: "/cleanmerco2.svg",
      title: "Mercedes GLC",
      formula: "Formule Premium",
      details: [
        "Shampoing des tapis, moquettes, sièges et tissus",
        "Protection UV des plastiques intérieurs",
        "Désinfection des surfaces à la vapeur",
      ],
    },
    {
      before: "/cleanporsche1.svg",
      after: "/cleanporsche2.svg",
      title: "Porsche 987",
      formula: "Formule Extérieur",
      details: [
        "Prélavage à la mousse active",
        "Lavage manuel de la carrosserie",
        "Traitement céramique déperlant (3 mois)",
      ],
    },
    {
      before: "/cleancoffre1.svg",
      after: "/cleancoffre2.svg",
      title: "Mercedes GLC",
      formula: "Formule Deluxe",
      details: [
        "Désinfection des surfaces à la vapeur",
        "Shampoing intégral des sièges et tissus",
        "Nettoyage des contours de portes et du coffre",
      ],
    },
  ];

  const current = slides[currentIndex];

  // ✅ Convertit clientX -> % dans le conteneur (inchangé)
  const updateFromClientX = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  // ✅ Navigation (inchangé)
  const changeSlide = useCallback((newIndex: number, dir: number) => {
    setDirection(dir);
    setSliderPosition(50);
    setCurrentIndex(newIndex);
  }, []);

  const prevSlide = useCallback(() => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    changeSlide(newIndex, -1);
  }, [currentIndex, slides.length, changeSlide]);

  const nextSlide = useCallback(() => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex, 1);
  }, [currentIndex, slides.length, changeSlide]);

  // ✅ Drag START sur la poignée uniquement
  const onHandlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Important pour iOS/Android : éviter scroll/zoom + sélection
      e.preventDefault();
      e.stopPropagation();

      const handle = handleRef.current;
      if (!handle) return;

      activePointerIdRef.current = e.pointerId;
      setIsDragging(true);

      // Capture = continue à recevoir les moves même si le doigt sort du handle
      try {
        handle.setPointerCapture(e.pointerId);
      } catch {}

      updateFromClientX(e.clientX);
    },
    [updateFromClientX]
  );

  // ✅ Drag MOVE (sur le handle capturé)
  const onHandlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      if (activePointerIdRef.current !== e.pointerId) return;

      e.preventDefault();
      updateFromClientX(e.clientX);
    },
    [isDragging, updateFromClientX]
  );

  // ✅ Drag END
  const endDrag = useCallback((e?: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);

    const handle = handleRef.current;
    const pid = activePointerIdRef.current;
    activePointerIdRef.current = null;

    if (handle && pid != null) {
      try {
        handle.releasePointerCapture(pid);
      } catch {}
    }

    // optionnel : empêche un "click" parasite après drag
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  // ✅ Keyboard navigation (inchangé)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // ✅ Auto-play (inchangé)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, [nextSlide, isDragging]);

  // Framer Motion variants (inchangé)
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1e40af 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-12 md:mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
          Nos <span className="text-blue-700">Prestations</span>
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Découvrez la transformation avant/après de nos prestations premium
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Slider Container */}
        <motion.div
          ref={sliderRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full lg:flex-1 aspect-[16/10] lg:aspect-[16/9] max-w-4xl rounded-3xl border-2 border-blue-800 shadow-2xl overflow-hidden bg-gray-900 select-none"
          // ✅ on ne met PLUS les pointer events sur le container
          style={{
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* After Image */}
              <Image
                alt={`${current.title} après lavage`}
                fill
                draggable={false}
                // ⚠️ ne mets pas priority sur toutes les slides si tu en as plusieurs ailleurs
                priority
                src={current.after}
                className="object-cover"
              />

              {/* Before Image (Clipped) — inchangé */}
              <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden select-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  fill
                  priority
                  draggable={false}
                  alt={`${current.title} avant lavage`}
                  src={current.before}
                  className="object-cover"
                />
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-semibold backdrop-blur-sm">
                Avant
              </div>
              <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1.5 rounded-lg text-sm font-semibold backdrop-blur-sm">
                Après
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Handle (DRAG HERE ONLY) */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white z-40 shadow-lg"
            style={{ left: `calc(${sliderPosition}% - 1px)` }}
          >
            {/* Zone de drag plus large + robuste */}
            <div
              ref={handleRef}
              role="slider"
              aria-label="Comparer avant/après"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              tabIndex={0}
              onPointerDown={onHandlePointerDown}
              onPointerMove={onHandlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              // ✅ IMPORTANT: empêche scroll/zoom pendant drag sur mobile
              style={{
                touchAction: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
              }}
              className="absolute -left-[24px] top-0 bottom-0 w-[48px] cursor-ew-resize"
            >
              {/* Poignée visuelle */}
              <div className="bg-white absolute rounded-full h-10 w-10 left-1/2 -translate-x-1/2 top-[calc(50%-20px)] shadow-xl flex items-center justify-center border-2 border-blue-600">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-4 bg-blue-600 rounded" />
                  <div className="w-0.5 h-4 bg-blue-600 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows (AU-DESSUS) */}
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 z-50 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              aria-label="Image précédente"
              className="pointer-events-auto cursor-pointer bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full shadow-lg transition backdrop-blur-sm"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              aria-label="Image suivante"
              className="pointer-events-auto cursor-pointer bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full shadow-lg transition backdrop-blur-sm"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
            </motion.button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => changeSlide(i, i > currentIndex ? 1 : -1)}
                aria-label={`Aller à l’image ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? "bg-blue-600 w-8 h-3"
                    : "bg-white/60 hover:bg-white w-3 h-3"
                }`}
                onPointerDown={(e) => e.stopPropagation()}
              />
            ))}
          </div>
        </motion.div>

        {/* Text Box */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-[420px] bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                {current.formula}
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                {current.title}
              </h3>

              <div className="w-16 h-1 bg-blue-600 rounded-full" />

              <ul className="space-y-4 text-gray-700">
                {current.details.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 inline-block w-2 h-2 bg-blue-700 rounded-full flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full cursor-pointer mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl text-center"
              >
                Estimer mon tarif
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-gray-500 text-sm mt-8 text-center"
      >
        💡 Faites glisser le curseur pour comparer avant/après
      </motion.p>
    </section>
  );
};
