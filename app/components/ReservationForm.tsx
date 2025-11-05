"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    }

    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Veuillez entrer un numéro de téléphone valide";
    }

    if (form.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Demande envoyée :", form);
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setForm({ name: "", phone: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Téléphone",
      value: "06 11 22 33 44",
      href: "tel:+33611223344",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message direct",
      href: "https://wa.me/33611223344",
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      target: "_blank",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@sparkcar.fr",
      href: "mailto:contact@sparkcar.fr",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full bg-gradient-to-b from-white to-gray-50 py-20 md:py-28 px-6 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Prenez <span className="text-blue-700">contact</span> avec nous
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nous sommes à votre écoute pour répondre à toutes vos questions et
            réserver votre prestation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Block - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Service à domicile
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nous venons laver votre véhicule directement à votre domicile ou
                sur votre lieu de travail. Réponse rapide garantie sous 2 heures
                !
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.target}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className={`flex items-center gap-4 p-4 rounded-xl ${contact.bgColor} ${contact.hoverColor} transition-all group`}
                  >
                    <div
                      className={`${contact.color} p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        {contact.label}
                      </p>
                      <p
                        className={`text-lg font-semibold ${contact.color} group-hover:underline`}
                      >
                        {contact.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 space-y-3"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Zone d'intervention
                  </p>
                  <p className="text-gray-600">
                    Saint-Omer et alentours (30km)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Horaires</p>
                  <p className="text-gray-600">Lundi – Samedi : 8h00 – 19h00</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Dimanche sur rendez-vous
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Block - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-10 space-y-6 relative overflow-hidden"
            >
              {/* Success Overlay */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-green-50 flex flex-col items-center justify-center z-20 rounded-3xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-green-600 mb-4" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Message envoyé !
                  </h4>
                  <p className="text-gray-600">
                    Nous vous répondrons très rapidement
                  </p>
                </motion.div>
              )}

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Demande de réservation
                </h3>
                <p className="text-gray-600">
                  Remplissez le formulaire et nous vous recontacterons
                </p>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all`}
                  placeholder="Martin Dupont"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={form.phone}
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value });
                    setErrors({ ...errors, phone: "" });
                  }}
                  className={`w-full border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all`}
                  placeholder="06 12 34 56 78"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Votre demande <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    setErrors({ ...errors, message: "" });
                  }}
                  className={`w-full border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 resize-none transition-all`}
                  placeholder="Bonjour, je souhaiterais un lavage complet pour ma BMW à Arques. Je suis disponible mercredi matin."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer la demande
                  </>
                )}
              </motion.button>

              <p className="text-center text-gray-500 text-sm">
                🔒 Vos données sont sécurisées et ne seront jamais partagées
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
