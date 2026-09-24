import { motion } from "framer-motion";
import { Dumbbell, Eye, HeartPulse, Home, MapPin, Mic, Scissors } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { icon: Home, label: "Inicio", href: "#home" },
  { icon: Eye, label: "Visión", href: "#vision" },
  { icon: Scissors, label: "Servicios", href: "#barberia" },
  { icon: HeartPulse, label: "Salud", href: "#gym" },
  { icon: Dumbbell, label: "Planes", href: "#membership" },
  { icon: Mic, label: "Podcast", href: "#podcast-section" },
  { icon: MapPin, label: "Contacto", href: "#footer" },
];

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ x: "-50%", y: 100, opacity: 0 }}
      animate={{ x: "-50%", y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 sm:bottom-8 left-1/2 z-40 max-w-[calc(100%-2rem)]"
    >
      <motion.div
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="backdrop-blur-2xl bg-void-deep/70 border border-white/10 rounded-full px-3 py-2 flex items-center gap-0.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.08 }}
              className={`group relative flex shrink-0 items-center justify-center w-9 sm:w-11 h-11 rounded-full transition-all duration-300 ${isActive ? "bg-gold-base/15" : "hover:bg-white/5"
                }`}
            >
              <item.icon
                className={`w-4.5 h-4.5 transition-colors duration-300 ${isActive ? "text-gold-base" : "text-white/50 group-hover:text-gold-base"
                  }`}
              />
              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-gold-base"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-void-deep/90 backdrop-blur-xl border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </motion.a>
          );
        })}
      </motion.div>
    </motion.nav>
  );
};

export default FloatingNav;
