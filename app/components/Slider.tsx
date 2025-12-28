"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
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

  // Handle mouse/touch movement
  const handleMove = useCallback(
    (clientX: number, rect: DOMRect) => {
      if (!isDragging) return;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percent);
    },
    [isDragging]
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    handleMove(event.clientX, rect);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    handleMove(event.touches[0].clientX, rect);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // Navigation functions
  const changeSlide = useCallback((newIndex: number, dir: number) => {
    setDirection(dir);
    setSliderPosition(50);
    setCurrentIndex(newIndex);
  }, []);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    changeSlide(newIndex, -1);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex, 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Auto-play (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);

  // Framer Motion variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
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
        {/* Gradient Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

        {/* Dotted Pattern */}
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

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full lg:flex-1 aspect-[16/10] lg:aspect-[16/9] max-w-4xl rounded-3xl border-2 border-blue-800 shadow-2xl overflow-hidden bg-gray-900"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchEnd={handleMouseUp}
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
              {/* After Image (Background) */}
              <Image
                alt={`${current.title} après lavage`}
                fill
                draggable={false}
                priority
                src={current.after}
                className="object-cover"
              />

              {/* Before Image (Clipped) */}
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

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-lg"
            style={{ left: `calc(${sliderPosition}% - 1px)` }}
          >
            <div className="bg-white absolute rounded-full h-10 w-10 -left-[18px] top-[calc(50%-20px)] shadow-xl flex items-center justify-center border-2 border-blue-600">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-4 bg-blue-600 rounded" />
                <div className="w-0.5 h-4 bg-blue-600 rounded" />
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 z-30 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              aria-label="Image précédente"
              className="pointer-events-auto cursor-pointer bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full shadow-lg transition backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              aria-label="Image suivante"
              className="pointer-events-auto cursor-pointer bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full shadow-lg transition backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
            </motion.button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => changeSlide(i, i > currentIndex ? 1 : -1)}
                aria-label={`Aller à l'image ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? "bg-blue-600 w-8 h-3"
                    : "bg-white/60 hover:bg-white w-3 h-3"
                }`}
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
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                {current.formula}
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                {current.title}
              </h3>

              {/* Divider */}
              <div className="w-16 h-1 bg-blue-600 rounded-full" />

              {/* Features List */}
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

              {/* CTA Button */}
<motion.a
  href="#contact"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="w-full px-14 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl text-center"
>
  Estimer mon tarif
</motion.a>

            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Helper Text */}
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
