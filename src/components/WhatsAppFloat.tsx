import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

import { BOOKSY_URL } from "@/lib/serviceLinks";

const InstagramFloat = () => {
  return (
    <motion.a
      href={BOOKSY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar en Booksy"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 left-4 sm:bottom-8 sm:left-8 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-gold-base animate-ping-slow opacity-30" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gold-base shadow-[0_8px_32px_rgba(212,175,55,0.45)] text-void">
        <CalendarCheck className="w-7 h-7" />
      </span>
      <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-void-deep/90 backdrop-blur-xl border border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Reservar en Booksy
      </span>
    </motion.a>
  );
};

export default InstagramFloat;
