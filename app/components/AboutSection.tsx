"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
} as const;

export default function AboutSection() {
  return (
    <section
      className="relative bg-white min-h-screen flex items-center overflow-hidden px-6 py-24"
    >
      <div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-300 to-blue-600 opacity-40 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex mb-5 px-4 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
              À propos
            </span>
            <p className="sr-only">
  Spark’Car : lavage auto à domicile et detailing à Saint-Omer et Hauts-de-France.
</p>


            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Une approche simple, <br />
              <span className="text-blue-700">efficace</span> et soignée
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
              En parallèle de mes études, j’ai lancé Spark’Car pour proposer un
nettoyage automobile professionnel à domicile, à Saint-Omer et alentours.

            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
              Travail propre, résultats visibles, sans artifices. Chaque véhicule
              est traité avec méthode et précision, pour un rendu net et durable.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Je privilégie les bons gestes, les bons produits et le respect des
              matériaux — parce que le détail fait toute la différence.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-blue-700">+50</span>
                <span className="text-sm text-gray-500">
                  Véhicules entretenus
                </span>
              </div>

              <div className="hidden sm:block w-px h-10 bg-gray-300" />

              <div className="flex flex-col">
                <span className="text-3xl font-bold text-blue-700">100%</span>
                <span className="text-sm text-gray-500">Satisfaction</span>
              </div>

              <div className="hidden sm:block w-px h-10 bg-gray-300" />

              <div className="flex flex-col">
                <span className="text-3xl font-bold text-blue-700">1</span>
                <span className="text-sm text-gray-500">
                  Objectif : Propreté
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="w-full flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[560px]">
              <div className="relative rounded-3xl p-4 md:p-5 bg-white border border-gray-200 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 relative overflow-hidden rounded-2xl aspect-[16/9]">
                    <Image
                      src="/photo1.svg"
                      alt="Détail de finition après lavage auto à domicile Spark’Car"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 560px"
                      loading="eager"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 pointer-events-none" />
                  </div>

                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <Image
                      src="/photo2.svg"
                      alt="Nettoyage intérieur : détails et précision Spark’Car"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 280px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                  </div>

                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <Image
                      src="/photo3.svg"
                      alt="Brillance carrosserie après nettoyage extérieur Spark’Car"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 280px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-sm text-gray-600">
                    Avant / après, finitions, détails — tout compte.
                  </p>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    Finition premium
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
