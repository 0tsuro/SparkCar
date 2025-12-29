"use client";

import { motion } from "framer-motion";

export default function SiteLoader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#010D50] to-[#0328EE]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-gray-600 font-medium">Chargement…</p>
      </div>
    </div>
  );
}
