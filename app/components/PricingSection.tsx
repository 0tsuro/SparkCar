"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Standard",
      price: "à partir de 49€",
      color: "border-gray-300",
      badgeColor: "bg-gray-500",
      hoverColor: "hover:border-gray-400",
      features: [
        "Nettoyage extérieur complet",
        "Aspiration intérieure rapide",
        "Vitres intérieures / extérieures",
      ],
    },
    {
      name: "Premium",
      price: "à partir de 89€",
      color: "border-blue-600",
      badgeColor: "bg-blue-600",
      hoverColor: "hover:border-blue-700",
      features: [
        "Lustrage carrosserie",
        "Rénovation plastiques extérieurs",
        "Nettoyage intérieur approfondi",
        "Protection hydrophobe express",
      ],
      highlight: true,
    },
    {
      name: "Deluxe",
      price: "à partir de 149€",
      color: "border-yellow-500",
      badgeColor: "bg-yellow-500",
      hoverColor: "hover:border-yellow-600",
      features: [
        "Polissage complet 2 phases",
        "Cire céramique de protection",
        "Rénovation jantes et sièges",
        "Finition professionnelle intérieure / extérieure",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
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
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Choisissez la formule qui correspond à vos besoins et à votre
          véhicule. Chaque prestation est réalisée avec soin et
          professionnalisme.
        </p>
      </motion.div>

      {/* ===== CARTES ===== */}
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
            whileHover={{
              y: -8,
              transition: { duration: 0.3 },
            }}
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

            {/* Nom de la formule */}
            <h3 className="text-3xl font-bold mb-2 text-gray-900">
              {plan.name}
            </h3>

            {/* Prix */}
            <div className="mb-6">
              <p className="text-blue-700 font-bold text-2xl">{plan.price}</p>
            </div>

            {/* Features */}
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

            {/* Bouton */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-auto w-full ${
                plan.highlight
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-gray-800 hover:bg-gray-900"
              } text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-xl`}
            >
              Choisir cette formule
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Note de bas de page */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 text-sm mt-12 text-center max-w-2xl"
      >
        💡 Tarifs indicatifs selon la taille et l'état du véhicule. Devis
        personnalisé disponible sur demande.
      </motion.p>
    </section>
  );
}
