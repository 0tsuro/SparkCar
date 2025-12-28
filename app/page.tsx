"use client";

import Image from "next/image";
import { motion, useTransform, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useSmoothScroll } from "./components/useSmoothScroll";
import { Slider } from "./components/Slider";
import ReservationForm from "./components/ReservationForm";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import AnimatedPngBubble from "./components/AnimatedPngBubble";
import AboutSection from "./components/AboutSection";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const smoothScrollTo = useSmoothScroll();

  // Parallax effect for car
  const carX = useTransform(scrollYProgress, [0, 0.3], [0, -3000]);
  const carY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  // Hero text animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px", // Trigger when section is 20% from top
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Close mobile menu on navigation
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    smoothScrollTo(href);
  };

  const navLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#services", label: "Services" },
    { href: "#nosformules", label: "Formules" },
    { href: "#a-propos", label: "À propos" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar - Sticky with blur effect */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
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
            src="/logo.png"
            alt="Spark’Car Logo"
            width={150}
            height={150}
            className="w-32 lg:w-36 h-auto"
            priority
          />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <nav className="flex text-base space-x-8 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative hover:text-blue-600 transition-colors group ${
                  activeSection === link.href.substring(1)
                    ? "text-blue-600"
                    : ""
                }`}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      activeSection === link.href.substring(1) ? "100%" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <motion.a
            href="#reservation"
            onClick={(e) => handleNavClick(e, "#reservation")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg 
                       bg-gradient-to-r from-[#010D50] to-[#0328EE] 
                       hover:shadow-xl transition-all duration-300"
          >
            Réserver maintenant
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: index * 0.1 }}
              className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#reservation"
            onClick={(e) => handleNavClick(e, "#reservation")}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ delay: 0.4 }}
            className="px-8 py-4 rounded-xl text-white text-lg font-semibold shadow-lg 
                       bg-gradient-to-r from-[#010D50] to-[#0328EE]"
          >
            Réserver
          </motion.a>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section
        id="accueil"
        className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden text-center px-6 pt-20"
      >
        <div className="absolute top-50 left-0 z-0 pointer-events-none">
          <div className="flex flex-col gap-4">
            <div
              className="h-2 w-128 md:w-128 rounded-full
                 bg-gradient-to-r from-[#010D50] to-[#0328EE]
                 origin-left rotate-[-30deg]"
            />
            <div
              className="h-2 w-80 md:w-[600px] rounded-full
                 bg-gradient-to-r from-[#010D50] to-[#0328EE]
                 origin-left rotate-[-30deg]"
            />
          </div>
        </div>

        {/* Animated Bubbles */}
        <AnimatedPngBubble
          src="/bubble.png"
          size={440}
          positionClass="right-12 top-16 hidden md:block"
          floatDuration={7}
          phase={0.2}
          opacity={0.8}
          parallax={0.45}
          intensity={1.6}
          glow
        />
        <AnimatedPngBubble
          src="/bubble.png"
          size={260}
          positionClass="left-16 bottom-24 hidden md:block"
          floatDuration={6}
          phase={0.6}
          opacity={0.5}
          parallax={0.3}
          intensity={1.4}
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
        />

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl text-gray-900 font-extrabold mb-6 leading-tight"
          >
            Redonnez <span className="text-blue-700">vie</span> à votre voiture
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Un lavage simple, efficace et sans artifices : l’attention
            qu’il faut pour que votre auto brille à nouveau.
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
              className="px-8 py-4 rounded-xl text-white text-lg font-semibold shadow-xl 
                         bg-gradient-to-r from-[#010D50] to-[#0328EE] 
                         hover:shadow-2xl transition-all duration-300"
            >
              Réserver maintenant
            </motion.a>

            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl text-gray-700 text-lg font-semibold 
                         border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600
                         transition-all duration-300"
            >
              Découvrir nos services
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Parallax Car */}
        <motion.div
          style={{ x: carX, y: carY }}
          className="absolute bottom-0 right-0 w-[50vw] md:w-[40vw] lg:w-[30vw] max-w-[800px] h-auto pointer-events-none"
        >
          <Image
            src="/bmw.png"
            alt="BMW voiture de luxe"
            width={800}
            height={600}
            className="w-full h-auto drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Scroll Indicator */}
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

      {/* Services Section */}
      <section id="services" className="w-full">
        <Slider />
      </section>

      {/* Pricing Section */}
      <section id="nosformules">
        <PricingSection />
      </section>

      <section id="a-propos" className="w-full">
        <AboutSection />
      </section>

      {/* Reservation Section */}
      <section
        id="reservation"
        className="min-h-screen flex items-center justify-center bg-white"
      >
        <ReservationForm />
      </section>

      {/* Footer */}
      <section id="contact">
        <Footer />
      </section>
    </main>
  );
}
