"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import BeforeAfterSlider from "./components/BeforeAfter";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 0.8], ["100%", "-1000%"]);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-8 py-4 shadow-md bg-white z-10 relative">
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </div>

        <div className="flex items-center space-x-6">
          <nav className="flex text-lg space-x-6 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-500 transition">
              Accueil
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Services
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              À propos
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Contact
            </a>
          </nav>
          <a
            href="#"
            className="px-6 py-3 rounded-lg text-white font-semibold shadow-lg 
                       bg-gradient-to-b from-[#010D50] to-[#0328EE] 
                       hover:opacity-90 transition"
          >
            Réserver
          </a>
        </div>
      </header>

      {/* Section 1 */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-gray-50 overflow-hidden text-center px-6">
        {/* Bulle en arrière-plan */}
        <div className="absolute inset-0 right-160 bottom-30 flex items-center justify-center z-0">
          <Image
            src="/bubble.png" // Mets le nom du fichier bulle ici (ex: bulle.png)
            alt="Bulle décorative"
            width={500}
            height={500}
            className="opacity-70 pointer-events-none"
            priority
          />
        </div>

        {/* Texte au-dessus */}
        <h1 className="text-5xl text-black font-bold mb-4">
          Redonnez vie à votre voiture
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl">
          Un lavage simple, efficace et sans artifices : l’attention qu’il faut
          pour que votre auto brille à nouveau.
        </p>

        <motion.div
          style={{ x }}
          className="absolute bottom-0 right-0 w-[30vw] max-w-[800px] h-auto pointer-events-none"
        >
          <Image
            src="/bmw.png"
            alt="Car"
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </section>

      {/* Autres sections */}
      <section className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold">Section 2</h1>
        <BeforeAfterSlider
          beforeImage={"/bmw.png"}
          afterImage={"bubble.png"}
        ></BeforeAfterSlider>
      </section>
      <section className="h-screen flex items-center justify-center bg-gray-200">
        <h1 className="text-4xl font-bold">Section 3</h1>
      </section>
    </main>
  );
}
