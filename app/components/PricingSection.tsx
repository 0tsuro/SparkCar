"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Standard",
      price: "À partir de 35€*",
      color: "border-gray-300",
      hoverColor: "hover:border-gray-400",
      features: [
        "Aspiration complète de l’habitacle (sièges, tapis, coffre)",
        "Dépoussiérage complet",
        "Nettoyage de tous les plastiques intérieurs",
        "Nettoyage des vitres intérieures",
      ],
    },
    {
      name: "Premium",
      price: "À partir de 50€*",
      color: "border-blue-600",
      hoverColor: "hover:border-blue-700",
      features: [
        "Formule Standard incluse",
        "Shampoing des tapis et moquettes",
        "Protection UV des plastiques intérieurs",
        "Nettoyage des contours de portes et du coffre",
      ],
      highlight: true,
    },
    {
      name: "Deluxe",
      price: "À partir de 85€*",
      color: "border-yellow-500",
      hoverColor: "hover:border-yellow-600",
      features: [
        "Formule Standard + Premium incluses",
        "Shampoing intégral des sièges et tissus",
        "Traitement et nettoyage des cuirs",
        "Désinfection des surfaces à la vapeur",
      ],
    },
  ];

  // Tuple cubic-bezier typé pour éviter l'erreur TS
  const easeBezier: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeBezier },
    },
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-24 px-8 flex flex-col items-center">
      {/* ===== TITRE ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Nos <span className="text-blue-700">formules</span>
        </h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Entretien intérieur professionnel
        </h3>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Choisissez votre niveau de prestation. Les tarifs varient selon la
          taille et l’état du véhicule.
        </p>
      </motion.div>

      {/* ===== CARTES INTÉRIEUR ===== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className={`relative border-2 ${plan.color} ${
              plan.hoverColor
            } rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl ${
              plan.highlight
                ? "bg-gradient-to-br from-blue-50 to-white border-blue-600 scale-105 md:scale-110"
                : "bg-white"
            }`}
          >
            {/* Badge "Populaire" */}
            {plan.highlight && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="absolute -top-4 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md"
              >
                ⭐ Populaire
              </motion.span>
            )}

            <h3 className="text-3xl font-bold mb-2 text-gray-900">
              {plan.name}
            </h3>

            <div className="mb-6">
              <p className="text-blue-700 font-bold text-2xl">{plan.price}</p>
            </div>

            <ul className="space-y-4 mb-8 text-gray-700 text-left w-full">
              {plan.features.map((feature, idx) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-auto w-full ${
                plan.highlight
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-gray-800 hover:bg-gray-900"
              } text-white cursor-pointer font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-xl text-center`}
            >
              Estimer mon tarif
            </motion.a>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== SECTION EXTÉRIEUR ===== */}
      <div className="w-full max-w-7xl mt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Nettoyage <span className="text-blue-700">extérieur</span>
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Donnez un nouvel éclat à votre véhicule grâce à un lavage extérieur
            professionnel. <br className="hidden md:block" />
            <span className="text-gray-500">
              Tarif variable selon la catégorie du véhicule.
            </span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Carte unique extérieur (même taille) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-white shadow-xl p-8 min-h-[520px] flex flex-col"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-full shadow">
                  EXTÉRIEUR
                </span>
                <h4 className="text-3xl font-bold text-gray-900 mt-4">
                  Formule Extérieur
                </h4>
                <p className="text-blue-700 font-extrabold text-2xl mt-2">
                  À partir de 40€*
                </p>
              </div>
            </div>

            <ul className="mt-8 space-y-4 text-gray-700">
              {[
                "Prélavage à la mousse active",
                "Lavage manuel de la carrosserie",
                "Rinçage haute pression",
                "Nettoyage des vitres extérieures",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

<motion.a
  href="#contact"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  className="mt-auto w-full cursor-pointer bg-gradient-to-r from-[#010D50] to-[#0328EE] hover:brightness-110 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-xl text-center"
>
  Estimer mon tarif
</motion.a>


            <p className="text-gray-500 text-xs mt-4">
              * Tarif indicatif selon gabarit/état du véhicule.
            </p>
          </motion.div>

          {/* Options extérieur (même taille) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-gray-200 bg-white shadow-lg p-8 min-h-[520px] flex flex-col"
          >
            <h4 className="text-2xl font-bold text-gray-900 mb-2">
              Options extérieur
            </h4>
            <p className="text-gray-600 mb-6">
              Personnalisez la prestation selon vos besoins.
            </p>

            <div className="space-y-4">
              {[
                { name: "Nettoyage jantes & passages de roues", price: "20€" },
                { name: "Décontamination ferreuse", price: "10€" },
                {
                  name: "Traitement céramique déperlant (3 mois)",
                  price: "15€",
                },
                { name: "Nettoyage compartiment moteur", price: "6€" },
              ].map((opt) => (
                <div
                  key={opt.name}
                  className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/40 transition"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-block w-2 h-2 bg-blue-700 rounded-full flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">{opt.name}</p>
                      <p className="text-sm text-gray-500">
                        Ajout possible lors de la réservation
                      </p>
                    </div>
                  </div>
                  <div className="text-blue-700 font-extrabold text-lg whitespace-nowrap">
                    {opt.price}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
                <p className="text-sm text-gray-700">
                  💡 Conseil : les options “jantes” + “décontamination” donnent
                  souvent le meilleur rendu visuel sur carrosserie claire ou
                  jantes encrassées.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Note de bas de page */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 text-sm mt-12 text-center max-w-2xl"
      >
        * Tarifs indicatifs selon la taille et l'état du véhicule. Devis
        personnalisé disponible sur demande.
      </motion.p>
    </section>
  );
}
