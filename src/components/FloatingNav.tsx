import { motion } from "framer-motion";
import { Home, Crown, Eye, LogIn } from "lucide-react";

const navItems = [
  { icon: Home, label: "Inicio", href: "#home" },
  { icon: Crown, label: "Membresía", href: "#membership" },
  { icon: Eye, label: "Visión", href: "#vision" },
  { icon: LogIn, label: "Acceso", href: "#login" },
];

const FloatingNav = () => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="glass-panel rounded-full px-2 py-2 flex items-center gap-1"
      >
        {navItems.map((item, index) => (
          <motion.a
            key={item.label}
            href={item.href}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + index * 0.1 }}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 hover:bg-white/5"
          >
            <item.icon className="w-5 h-5 text-white/60 group-hover:text-gold-base transition-colors duration-300" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-void-deep border border-white/10 text-xs font-mono uppercase tracking-wider text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {item.label}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default FloatingNav;
