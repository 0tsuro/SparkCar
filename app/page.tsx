"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSmoothScroll } from "./components/useSmoothScroll";
import { useIsDesktop } from "./components/useIsDesktop";
import { Slider } from "./components/Slider";
import ReservationForm from "./components/ReservationForm";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import AnimatedPngBubble from "./components/AnimatedPngBubble";
import AboutSection from "./components/AboutSection";

export default function Page() {
  const { scrollYProgress } = useScroll();

  // Smooth scroll progress (reduces jitter after refresh / uneven frames)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.25,
  });

  const isDesktop = useIsDesktop(768);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  const smoothScrollTo = useSmoothScroll();

  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  const hasAnimatedNavRef = useRef(false);

  // Parallax transforms
  const carX = useTransform(smoothProgress, [0, 0.3], [0, -3000]);
  const carY = useTransform(smoothProgress, [0, 0.3], [0, 100]);

  // Hero transforms
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);

  // Navbar scroll state (passive + rAF)
  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const next = window.scrollY > 50;
        setIsScrolled((prev) => (prev === next ? prev : next));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Active section tracking (rAF throttled)
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );
    if (!sections.length) return;

    let raf = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (raf) return;
        raf = window.requestAnimationFrame(() => {
          raf = 0;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const id = (entry.target as HTMLElement).id;
            if (id && activeSectionRef.current !== id) setActiveSection(id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((s) => observer.observe(s));

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  // Navigation handler
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      smoothScrollTo(href);
    },
    [smoothScrollTo]
  );

  const navLinks = useMemo(
    () => [
      { href: "#accueil", label: "Accueil" },
      { href: "#services", label: "Services" },
      { href: "#nosformules", label: "Formules" },
      { href: "#a-propos", label: "À propos" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((v) => !v);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <motion.header
        initial={hasAnimatedNavRef.current ? false : { y: -100 }}
        animate={{ y: 0 }}
        onAnimationComplete={() => {
          hasAnimatedNavRef.current = true;
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full flex items-center justify-between px-6 lg:px-12 py-4 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-md"
        }`}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <Image
            src="/logo2.png"
            alt="Spark’Car Logo"
            width={300}
            height={300}
            className="w-32 lg:w-64 h-auto"
            priority
            sizes="(max-width: 1024px) 128px, 144px"
          />
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center space-x-8">
          <nav className="flex text-base space-x-8 text-gray-700 font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative hover:text-blue-600 transition-colors group ${
                    isActive ? "text-blue-600" : ""
                  }`}
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-blue-600"
                    initial={false}
                    animate={{ width: isActive ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                </a>
              );
            })}
          </nav>

          <motion.a
            href="#reservation"
            onClick={(e) => handleNavClick(e, "#reservation")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg bg-gradient-to-r from-[#010D50] to-[#0328EE] hover:shadow-xl transition-all duration-300"
          >
            Réserver maintenant
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 right-0 h-full w-full bg-white z-40 lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              initial={false}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: index * 0.08, duration: 0.25 }}
              className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </motion.a>
          ))}

          <motion.a
            href="#reservation"
            onClick={(e) => handleNavClick(e, "#reservation")}
            initial={false}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ delay: 0.4, duration: 0.25 }}
            className="px-8 py-4 rounded-xl text-white text-lg font-semibold shadow-lg bg-gradient-to-r from-[#010D50] to-[#0328EE]"
          >
            Réserver
          </motion.a>
        </div>
      </motion.div>

      {/* Hero */}
      <section
        id="accueil"
        className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden text-center px-6 pt-20"
      >
        <div className="absolute top-50 left-0 z-0 pointer-events-none">
          <div className="flex flex-col gap-4">
            <div className="h-2 w-128 md:w-600 rounded-full bg-gradient-to-r from-[#010D50] to-[#0328EE] origin-left rotate-[-30deg]" />
            <div className="h-2 w-800 md:w-[600px] rounded-full bg-gradient-to-r from-[#010D50] to-[#0328EE] origin-left rotate-[-30deg]" />
          </div>
        </div>

        {/* Bubbles: desktop only (not mounted on mobile) */}
        {isDesktop && (
          <>
            <AnimatedPngBubble
              src="/bubble.png"
              size={440}
              positionClass="right-12 top-16"
              floatDuration={7}
              phase={0.2}
              opacity={0.8}
              parallax={0.45}
              intensity={1.6}
              glow
              scrollYProgress={smoothProgress}
            />
            <AnimatedPngBubble
              src="/bubble.png"
              size={260}
              positionClass="left-16 bottom-24"
              floatDuration={6}
              phase={0.6}
              opacity={0.5}
              parallax={0.3}
              intensity={1.4}
              scrollYProgress={smoothProgress}
            />
            <AnimatedPngBubble
              src="/bubble.png"
              size={180}
              positionClass="right-1/3 bottom-10 hidden lg:block"
              floatDuration={5}
              phase={1.0}
              opacity={0.4}
              parallax={0.25}
              intensity={1.3}
              scrollYProgress={smoothProgress}
            />
          </>
        )}

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-4xl transform-gpu will-change-transform"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl text-gray-900 font-extrabold mb-6 leading-tight"
          >
            Redonnez <span className="text-blue-700">vie</span> à votre voiture
            <p className="sr-only">
  Lavage auto à domicile et detailing à Saint-Omer et dans les Hauts-de-France.
</p>

          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Un lavage simple, efficace et sans artifices : l’attention qu’il faut
            pour que votre auto brille à nouveau.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#reservation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl text-white text-lg font-semibold shadow-xl bg-gradient-to-r from-[#010D50] to-[#0328EE] hover:shadow-2xl transition-all duration-300"
            >
              Réserver maintenant
            </motion.a>

            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl text-gray-700 text-lg font-semibold border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              Découvrir nos services
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Car */}
        <motion.div
          style={{ x: carX, y: carY }}
          className="absolute bottom-0 right-0 w-[50vw] md:w-[40vw] lg:w-[30vw] max-w-[800px] h-auto pointer-events-none transform-gpu will-change-transform"
        >
          <Image
            src="/bmw.png"
            alt="Véhicule après lavage auto à domicile par Spark’Car"
            width={800}
            height={600}
            className="w-full h-auto drop-shadow-2xl"
            priority
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 30vw"
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="w-full">
        <h2 className="sr-only">Services de lavage auto à domicile</h2>
        <Slider />
        
      </section>

      {/* Pricing */}
      <section id="nosformules">
        <PricingSection />
        <h2 className="sr-only">Formules et tarifs</h2>
      </section>

      {/* About */}
      <section id="a-propos" className="w-full">
        <AboutSection />
        <h2 className="sr-only">À propos de Spark’Car</h2>
      </section>

      {/* Reservation */}
      <section
        id="reservation"
        className="min-h-screen flex items-center justify-center bg-white"
      >
        <ReservationForm />
        <h2 className="sr-only">Réservation lavage auto</h2>
      </section>

      {/* Footer */}
      <section id="contact">
        <Footer />
        <h2 className="sr-only">Contact Spark’Car</h2>
      </section>
    </main>
  );
}
