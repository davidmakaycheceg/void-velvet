import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { name: "La Barbería", href: "#" },
  { name: "Librería", href: "#" },
  { name: "Joyería", href: "#" },
  { name: "Atelier", href: "#" },
  { name: "Podcast", href: "#" },
];

const legalLinks = [
  { name: "Términos de Uso", href: "#" },
  { name: "Política de Privacidad", href: "#" },
  { name: "Política de Reembolso", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative bg-void border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gold-gradient mb-4"
            >
              SKY
              <br />
              CLUB
            </motion.h2>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
              EST. 2024 // GLOBAL HQ
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
              Ecosistema
            </h3>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 font-body text-white/60 hover:text-gold-base transition-colors duration-300"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-base group-hover:w-full transition-all duration-300" />
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
              Legal
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/30 hover:text-white/50 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordinates */}
          <div className="md:col-span-1">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
              Coordenadas
            </h3>
            <div className="font-mono text-xs text-white/30 space-y-2">
              <p>LAT 40.4168° N</p>
              <p>LONG 3.7038° W</p>
              <p className="pt-4 text-white/20">
                MADRID // SPAIN
              </p>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative rounded-2xl overflow-hidden h-64 border border-white/10"
        >
          {/* Dark Styled Map Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale opacity-40"
            style={{
              backgroundImage: `url("https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-3.7038,40.4168,12,0/1200x400@2x?access_token=pk.placeholder")`,
              backgroundColor: "#0a0a0a",
            }}
          />
          <div className="absolute inset-0 bg-void/60" />
          
          {/* Location Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-4 h-4 rounded-full bg-gold-base shadow-gold" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold-base/30 animate-ping-slow" />
            </motion.div>
          </div>

          {/* Overlay Text */}
          <div className="absolute bottom-4 left-4">
            <span className="font-mono text-xs uppercase tracking-widest text-gold-base/60">
              SKY CLUB HQ
            </span>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/20">
            © 2024 Sky Club. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/10">
            Architected by Paimon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
