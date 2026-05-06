"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, Fragment } from "react";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";

const VEHICLES = [
  { id: "berline", label: "Berline", emoji: "🚗", desc: "Berline standard" },
  { id: "citadine", label: "Citadine", emoji: "🚙", desc: "Petite voiture urbaine" },
  { id: "suv", label: "SUV", emoji: "🛻", desc: "Grand gabarit, 4×4" },
  { id: "mono5", label: "Mono 5", emoji: "🚐", desc: "Monospace familiale" },
];

const FORMULAS = [
  {
    id: "express",
    label: "Express",
    price: "69 €",
    highlight: false,
    namespace: "nettoyage-express",
    calLink: "sparkcar/nettoyage-express",
    features: [
      "Aspiration complète de l'habitacle",
      "Dépoussiérage intérieur",
      "Nettoyage des vitres intérieures",
    ],
  },
  {
    id: "approfondi",
    label: "Approfondi",
    price: "89 €",
    highlight: true,
    namespace: "nettoyage-approfondi",
    calLink: "sparkcar/nettoyage-approfondi",
    features: [
      "Formule Express incluse",
      "Shampoing moquettes & tapis",
      "Protection UV des plastiques",
      "Nettoyage contours de portes",
    ],
  },
  {
    id: "premium",
    label: "Premium",
    price: "129 €",
    highlight: false,
    namespace: "nettoyage-premium",
    calLink: "sparkcar/nettoyage-premium",
    features: [
      "Formule Approfondi incluse",
      "Shampoing intégral sièges & cuirs",
      "Désinfection vapeur des surfaces",
    ],
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stepVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: EASE } },
};

const STEP_LABELS = ["Votre véhicule", "Votre formule", "Votre créneau"];

type Formula = typeof FORMULAS[number];

function CalEmbed({ formula }: { formula: Formula }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: formula.namespace });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [formula.namespace]);

  return (
    <Cal
      namespace={formula.namespace}
      calLink={formula.calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
    />
  );
}

export default function PricingSection() {
  const [step, setStep] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);

  const vehicle = VEHICLES.find((v) => v.id === selectedVehicle);
  const formula = FORMULAS.find((f) => f.id === selectedFormula);
  const canAdvance = step === 0 ? !!selectedVehicle : !!selectedFormula;

  const handleNext = useCallback(() => {
    setStep((s) => Math.min(s + 1, 2));
  }, []);

  const handleBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-8 md:py-24 px-6 md:px-8 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5 md:mb-14"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-2 md:mb-4">
          <span className="text-blue-700">Réserver</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
          Sélectionnez votre véhicule et votre formule, puis choisissez un
          créneau disponible.
        </p>
      </motion.div>

      {/* Step indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-lg mx-auto mb-5 md:mb-12"
      >
        <div className="flex items-start justify-between">
          {STEP_LABELS.map((label, i) => (
            <Fragment key={label}>
              <div className="flex flex-col items-center gap-1 md:gap-2 flex-shrink-0">
                <motion.div
                  animate={{
                    backgroundColor: i <= step ? "#1d4ed8" : "#e5e7eb",
                    color: i <= step ? "#ffffff" : "#9ca3af",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${
                    i === step ? "ring-4 ring-blue-200" : ""
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : i + 1}
                </motion.div>
                <span
                  className={`text-[10px] md:text-xs font-semibold text-center max-w-[56px] md:max-w-[72px] leading-tight ${
                    i <= step ? "text-blue-700" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className="flex-1 h-1 mt-4 md:mt-5 mx-2 md:mx-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-700 rounded-full"
                    animate={{ width: i < step ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </motion.div>

      {/* Step content */}
      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">

          {/* Step 1 – Vehicle */}
          {step === 0 && (
            <motion.div
              key="vehicle"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-8 text-center">
                Quel est votre véhicule ?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-10">
                {VEHICLES.map((v) => (
                  <motion.button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVehicle(v.id)}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative border-2 rounded-2xl p-3 md:p-6 flex flex-col items-center gap-1.5 md:gap-3 transition-all duration-200 cursor-pointer ${
                      selectedVehicle === v.id
                        ? "border-blue-600 bg-blue-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    {selectedVehicle === v.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="absolute top-2 right-2 w-4 h-4 md:w-5 md:h-5 bg-blue-600 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                      </motion.div>
                    )}
                    <span className="text-2xl md:text-4xl select-none">{v.emoji}</span>
                    <span className="font-bold text-gray-900 text-sm md:text-lg">{v.label}</span>
                    <span className="hidden md:block text-xs text-gray-500 text-center leading-snug">
                      {v.desc}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 – Formula */}
          {step === 1 && (
            <motion.div
              key="formula"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-8 text-center">
                Quelle formule vous convient ?
              </h3>
              {/* Mobile: 3 cols compacts / Desktop: 3 cols full */}
              <div className="grid grid-cols-3 gap-2 md:gap-8 mb-4 md:mb-10 items-center">
                {FORMULAS.map((f) => (
                  <motion.button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFormula(f.id)}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative border-2 rounded-2xl p-3 md:p-8 flex flex-col items-center text-center transition-all duration-200 cursor-pointer ${
                      selectedFormula === f.id
                        ? "border-blue-600 bg-gradient-to-br from-blue-50 to-white shadow-2xl"
                        : f.highlight
                        ? "border-blue-400 bg-gradient-to-br from-blue-50/50 to-white hover:border-blue-600 hover:shadow-xl"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
                    } ${f.highlight ? "md:scale-110 z-10" : ""}`}
                  >
                    {f.highlight && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                        className="absolute -top-3 md:-top-4 bg-blue-600 text-white text-[9px] md:text-xs font-bold px-2 md:px-4 py-1 md:py-1.5 rounded-full shadow-md whitespace-nowrap"
                      >
                        ⭐ Populaire
                      </motion.span>
                    )}
                    {selectedFormula === f.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="absolute top-2 right-2 w-5 h-5 md:top-3 md:right-3 md:w-6 md:h-6 bg-blue-600 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </motion.div>
                    )}
                    <h4 className="text-sm md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">{f.label}</h4>
                    <p className="text-blue-700 font-extrabold text-base md:text-3xl mb-0 md:mb-6">{f.price}</p>
                    {/* Features : visibles uniquement sur desktop */}
                    <ul className="hidden md:flex flex-col space-y-3 text-sm text-gray-700 text-left w-full mt-6">
                      {f.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3 – Calendar */}
          {step === 2 && formula && (
            <motion.div
              key="calendar"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Selection summary chips */}
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-8 flex-wrap">
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-1.5 md:gap-2">
                  <span className="text-base md:text-xl">{vehicle?.emoji}</span>
                  <span className="font-semibold text-blue-800 text-xs md:text-sm">
                    {vehicle?.label}
                  </span>
                </div>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-1.5 md:gap-2">
                  <span className="font-semibold text-blue-800 text-xs md:text-sm">
                    {formula.label}
                  </span>
                  <span className="text-blue-600 font-bold text-xs md:text-sm">
                    {formula.price}
                  </span>
                </div>
              </div>

              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-6 text-center">
                Choisissez votre créneau
              </h3>

              <div className="w-full rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-white">
                <CalEmbed key={formula.id} formula={formula} />
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-4 md:mt-8">
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={step > 0 ? { x: -3 } : {}}
            className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all ${
              step === 0
                ? "invisible pointer-events-none"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            Retour
          </motion.button>

          {step < 2 && (
            <motion.button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance}
              whileHover={canAdvance ? { x: 3 } : {}}
              whileTap={canAdvance ? { scale: 0.97 } : {}}
              className={`flex items-center gap-1.5 md:gap-2 px-5 md:px-8 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all shadow-md ${
                canAdvance
                  ? "bg-gradient-to-r from-[#010D50] to-[#0328EE] text-white hover:shadow-xl hover:brightness-110"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Suivant
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
