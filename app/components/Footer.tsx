"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* === Bloc gauche : Logo / Présentation === */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Spark'Car
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs mb-6">
              Spécialiste du detailing automobile haut de gamme. Entretien
              complet intérieur et extérieur pour redonner tout son éclat à
              votre véhicule.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex gap-4">
              <a
                href="#https://www.facebook.com/SparkCarAutoMoto"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#https://www.instagram.com/sparkcar62/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#https://www.linkedin.com/in/pierre-clipet-5700b32b1/"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* === Bloc central : Navigation === */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              Navigation rapide
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#accueil"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-3 transition-all" />
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-3 transition-all" />
                  Prestations
                </a>
              </li>
              <li>
                <a
                  href="#nosformules"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-3 transition-all" />
                  Formules & Tarifs
                </a>
              </li>
              <li>
                <a
                  href="#a-propos"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-3 transition-all" />
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-3 transition-all" />
                  Réserver
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-3 transition-all" />
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* === Bloc droit : Contact === */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              Nous contacter
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <a
                    href="tel:+33612345678"
                    className="hover:text-blue-400 transition-colors block"
                  >
                    06 48 34 97 52
                  </a>
                  <span className="text-xs text-gray-500">
                    Lun - Dim: 8h - 19h
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:sparkcar.contact@gmail.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  sparkcar.contact@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="block">Saint-Omer et alentours</span>
                  <span className="text-xs text-gray-500">Hauts-de-France</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* === Barre de séparation === */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {currentYear} Spark'Car. Tous droits réservés.</p>
            <p className="flex items-center gap-2">
              Site développé par{" "}
              <span className="text-blue-400 font-semibold">Nathan Chaput</span>
            </p>
            <div className="flex gap-6 text-xs">
              <Link
                href="/legal/mentions-legales"
                className="hover:text-blue-400 transition-colors"
                >Mentions légales</Link>
              <Link href="/legal/cgv" className="hover:text-blue-400 transition-colors">
                CGV
              </Link>  
              <Link
                href="/legal/politique-de-confidentialite"
                className="hover:text-blue-400 transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
