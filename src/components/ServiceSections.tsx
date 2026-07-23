import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Droplets,
  Dumbbell,
  ExternalLink,
  HeartPulse,
  Leaf,
  Scissors,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState } from "react";
import { buildWhatsAppUrl, generalReserveMessage } from "@/lib/whatsapp";

const BOOKSY_URL = "https://booksy.com/es-es/167828_sky-club_barberia_58087_valencia";
const SKY_STORE_URL = "https://yeasyapp.com/#/commerce/4e922d95-5660-4e1e-b687-e6e1c45b9169";
const FUXION_PARTNER_URL = buildWhatsAppUrl(
  "Hola SKY CLUB, quiero el enlace de compra partner para bebidas nutricionales Fuxion.",
);
const MARY_KAY_PARTNER_URL = buildWhatsAppUrl(
  "Hola SKY CLUB, quiero el enlace de compra partner para alta cosmética Mary Kay.",
);

// Iframe overlay for embedded service pages
const ServiceOverlay = ({ url, title, onClose }: { url: string; title: string; onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-void/95 backdrop-blur-sm"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-void-deep/80 backdrop-blur-xl">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gold-light hover:text-gold-base transition-colors duration-300 font-display text-sm uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Sky Club
          </button>
          <span className="font-display font-semibold text-white/80 text-sm uppercase tracking-wider">
            {title}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors duration-300"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Iframe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="w-full"
          style={{ height: "calc(100vh - 65px)" }}
        >
          <iframe
            src={url}
            title={title}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

interface ServiceSectionProps {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
  href: string;
  ctaLabel?: string;
  openInNewTab?: boolean;
  reversed?: boolean;
  delay?: number;
  onExplore: (url: string, title: string) => void;
}

const ServiceSection = ({
  id,
  label,
  title,
  subtitle,
  description,
  features,
  image,
  icon,
  href,
  ctaLabel = "Explorar",
  openInNewTab = false,
  reversed = false,
  delay = 0,
  onExplore,
}: ServiceSectionProps) => {
  const handleCtaClick = () => {
    if (href.startsWith("#")) {
      document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (openInNewTab) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    onExplore(href, title);
  };

  return (
    <section id={id} className="relative py-20 md:py-28 px-6 bg-void overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: reversed ? "20%" : "80%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, hsl(45 75% 52% / 0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reversed ? "lg:direction-rtl" : ""
          }`}
          style={reversed ? { direction: "rtl" } : {}}
        >
          <motion.div
            initial={{ opacity: 0, x: reversed ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ direction: "ltr" }}
          >
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gold-base/0 group-hover:bg-gold-base/5 transition-colors duration-700" />
              </div>
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold-base/30 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold-base/30 rounded-br-lg" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reversed ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: delay + 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ direction: "ltr" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold-base/10 border border-gold-base/20 flex items-center justify-center">
                {icon}
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">
                // {label}
              </span>
            </div>

            <h2 className="font-display font-bold text-heading-1 text-white mb-2">
              {title}
            </h2>
            <p className="font-display text-lg text-gold-light/70 mb-6">
              {subtitle}
            </p>
            <p className="font-body text-white/50 leading-relaxed mb-8 max-w-lg">
              {description}
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + 0.3 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-base shrink-0" />
                  <span className="font-body text-sm text-white/60">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.03, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCtaClick}
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-gold-base/30 text-gold-light font-display text-sm uppercase tracking-wider hover:bg-gold-base/10 hover:border-gold-base/50 transition-all duration-300"
            >
              {ctaLabel}
              {openInNewTab ? (
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-base/15 to-transparent" />
    </section>
  );
};

const barberiaPrices = [
  { service: "Corte", price: "15€" },
  { service: "Barba", price: "10€" },
  { service: "Cejas", price: "5€" },
  { service: "Cejas hilo", price: "7€" },
  { service: "Cejas + tinte", price: "10€" },
  { service: "Limpieza facial", price: "20€" },
  { service: "Limpieza profunda", price: "30€" },
  { service: "Decoloración mechas", price: "70€" },
  { service: "Decoloración mechas + corte", price: "75€" },
  { service: "Decoloración completo", price: "85€" },
  { service: "Decoloración completo + corte", price: "90€" },
  { service: "Decoloración completo + corte + color fantasía", price: "95€" },
];

const BarberiaSection = () => (
  <section id="barberia" className="relative py-20 md:py-28 px-6 bg-void overflow-hidden">
    <div
      className="absolute pointer-events-none"
      style={{
        top: "50%",
        left: "80%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 500,
        background: "radial-gradient(circle, hsl(45 75% 52% / 0.04) 0%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative group sticky top-24">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80"
                alt="La Barbería"
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gold-base/0 group-hover:bg-gold-base/5 transition-colors duration-700" />
            </div>
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold-base/30 rounded-tl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold-base/30 rounded-br-lg" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gold-base/10 border border-gold-base/20 flex items-center justify-center">
              <Scissors className="w-5 h-5 text-gold-base" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">
              // RITUALES DE ACERO
            </span>
          </div>

          <h2 className="font-display font-bold text-heading-1 text-white mb-2">LA BARBERÍA</h2>
          <p className="font-display text-lg text-gold-light/70 mb-6">Donde el detalle define al hombre.</p>
          <p className="font-body text-white/50 leading-relaxed mb-8 max-w-lg">
            Un santuario de cuidado masculino donde cada corte es una declaración de intención. Nuestros maestros barberos combinan técnicas clásicas con tendencias contemporáneas.
          </p>

          <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-white/10 px-5 py-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">Servicio</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">Precio</span>
              <span className="sr-only">Reserva</span>
            </div>
            {barberiaPrices.map((item) => (
              <div
                key={item.service}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-white/5 px-5 py-3 last:border-0"
              >
                <span className="font-body text-sm text-white/70 min-w-0">{item.service}</span>
                <span className="font-display font-semibold text-gold-base text-sm">{item.price}</span>
                <a
                  href={BOOKSY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 py-1 rounded-full border border-gold-base/30 text-gold-light hover:bg-gold-base hover:text-void hover:border-gold-base transition-all duration-300 font-display text-[10px] uppercase tracking-wider"
                  aria-label={`Reservar ${item.service} en Booksy`}
                >
                  Reservar
                </a>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.a
              whileHover={{ scale: 1.03, x: 4 }}
              whileTap={{ scale: 0.98 }}
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gold-base text-void font-display text-sm uppercase tracking-wider hover:bg-gold-light transition-all duration-300 shadow-gold"
            >
              <CalendarCheck className="w-4 h-4" />
              Reservar ahora
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={buildWhatsAppUrl(generalReserveMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-gold-base/30 text-gold-light font-display text-sm uppercase tracking-wider hover:bg-gold-base/10 hover:border-gold-base/50 transition-all duration-300"
            >
              Consultar por WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-base/15 to-transparent" />
  </section>
);

const faceVideos = [
  { title: "Mewing desde cero", url: "https://www.youtube.com/watch?v=5GhoMZoMLeQ" },
  { title: "Mewing paso a paso", url: "https://www.youtube.com/watch?v=vjSqHC_HGT8" },
  { title: "Respiración y postura facial", url: "https://www.youtube.com/watch?v=STjwKZYA4fE" },
];

const postureVideos = [
  { title: "Guía para principiantes", url: "https://www.youtube.com/watch?v=kVWLzYvXK-Q" },
  { title: "Postura encorvada", url: "https://www.youtube.com/watch?v=l5IX0u-siJ8" },
  { title: "Desbloquear y corregir postura", url: "https://www.youtube.com/watch?v=YSMfWl2zPZ0" },
];

const VideoLinks = ({ title, videos }: { title: string; videos: { title: string; url: string }[] }) => (
  <div>
    <p className="font-display text-sm text-white/80 mb-3">{title}</p>
    <div className="space-y-2">
      {videos.map((video) => (
        <a
          key={video.title}
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/60 hover:border-gold-base/40 hover:text-gold-light transition-colors duration-300"
        >
          {video.title}
          <ExternalLink className="w-3.5 h-3.5 text-gold-base shrink-0" />
        </a>
      ))}
    </div>
  </div>
);

const HealthSection = () => {
  const scrollToOffers = () => {
    document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="gym" className="relative py-20 md:py-28 px-6 bg-void overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-base/15 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gold-base/10 border border-gold-base/20 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-gold-base" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">
              // SALUD Y BIENESTAR
            </span>
          </div>
          <h2 className="font-display font-bold text-heading-1 text-white mb-4">
            Salud, imagen y rendimiento
          </h2>
          <p className="font-body text-white/50 leading-relaxed">
            La sección se organiza en tres bloques claros: nutrición, cuidado facial/capilar y salud corporal. Los planes de dieta y rutina pasan a pago único y se personalizan mediante formulario por email.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <Leaf className="w-5 h-5 text-gold-base" />
              <h3 className="font-display text-xl text-white">Salud nutricional</h3>
            </div>
            <div className="border-t border-white/10 pt-5">
              <p className="font-display text-sm text-gold-light mb-2">Inmunológico · Fuxion</p>
              <p className="font-body text-sm text-white/50 leading-relaxed mb-4">
                Bebidas nutricionales orientadas al apoyo diario del sistema inmune, energía, digestión y hábitos de bienestar.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {["Inmunológico", "Energía", "Digestivo", "Nutrición diaria"].map((category) => (
                  <span key={category} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">
                    {category}
                  </span>
                ))}
              </div>
              <a
                href={FUXION_PARTNER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-gold-light hover:text-gold-base"
              >
                Comprar en partner
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <Droplets className="w-5 h-5 text-gold-base" />
              <h3 className="font-display text-xl text-white">Salud facial / capilar</h3>
            </div>
            <div className="space-y-6 border-t border-white/10 pt-5">
              <div>
                <p className="font-display text-sm text-gold-light mb-2">Tratamiento en pieles · Mary Kay</p>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-4">
                  Alta cosmética para limpieza, hidratación, cuidado avanzado y mantenimiento facial con compra por enlace partner.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Limpieza", "Hidratación", "Cuidado avanzado", "Protección"].map((category) => (
                    <span key={category} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">
                      {category}
                    </span>
                  ))}
                </div>
                <a
                  href={MARY_KAY_PARTNER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-gold-light hover:text-gold-base"
                >
                  Comprar en partner
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="font-display text-sm text-gold-light mb-2">Tratamiento capilar · Edén</p>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-4">
                  Champús artesanales informativos con venta directa en tienda. Tipos disponibles: Seco y Graso.
                </p>
                <a
                  href={SKY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-gold-light hover:text-gold-base"
                >
                  Comprar en tienda
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="font-display text-sm text-gold-light mb-2">Crecimiento capilar · Kirkland</p>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-4">
                  Producto de crecimiento capilar de marca Kirkland, con venta directa desde la tienda Sky Club.
                </p>
                <a
                  href={SKY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-gold-light hover:text-gold-base"
                >
                  Comprar en tienda
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <Dumbbell className="w-5 h-5 text-gold-base" />
              <h3 className="font-display text-xl text-white">Salud corporal</h3>
            </div>
            <div className="space-y-6 border-t border-white/10 pt-5">
              <div>
                <p className="font-display text-sm text-gold-light mb-2">Rutinas / dietas personalizadas</p>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-5">
                  Pago único desde la web, email del usuario y formulario automático para edad, objetivos, nivel, restricciones, horarios y preferencias. La respuesta alimenta un prompt exclusivo de IA para generar dieta y rutina de gym a medida.
                </p>
                <button
                  type="button"
                  onClick={scrollToOffers}
                  className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-gold-light hover:text-gold-base"
                >
                  Ver pagos únicos
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="border-t border-white/10 pt-5">
                <VideoLinks title="Mejora tu cara · Mewing" videos={faceVideos} />
              </div>

              <div className="border-t border-white/10 pt-5">
                <VideoLinks title="Mejora tu postura" videos={postureVideos} />
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

const services = [
  {
    id: "tienda",
    label: "ESTILO & EXCLUSIVIDAD",
    title: "Sky Club Store",
    subtitle: "Diseñamos para quienes entienden que invertir en uno mismo no es un lujo, es un estilo de vida",
    description: "Una tienda con las piezas más exclusivas en moda masculina",
    features: [
      "Colecciones exclusivas SKY CLUB",
      "Joyería y accesorios premium",
      "Ropa de diseño seleccionada",
      "Ediciones limitadas cada temporada",
      "Envío discreto y empaquetado luxury",
    ],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    icon: <ShoppingBag className="w-5 h-5 text-gold-base" />,
    reversed: true,
    href: SKY_STORE_URL,
    ctaLabel: "Entrar en tienda",
    openInNewTab: true,
  },
  {
    id: "libreria",
    label: "ARQUITECTURA MENTAL",
    title: "LIBRERÍA",
    subtitle: "Conocimiento gratuito, sin venta ni lucro.",
    description:
      "Una curación editorial de títulos de negocios, psicología, filosofía y desarrollo personal disponible de forma gratuita para acelerar tu crecimiento sin barreras económicas.",
    features: [
      "Libros y recursos disponibles gratis",
      "Sin venta, sin comisiones y sin lucro",
      "Selección curada mensual",
      "Resúmenes ejecutivos semanales",
      "Biblioteca digital para la comunidad",
    ],
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
    icon: <BookOpen className="w-5 h-5 text-gold-base" />,
    reversed: true,
    href: "https://skypressfinal.lovable.app",
    ctaLabel: "Acceder gratis",
  },
];

const ServiceSections = () => {
  const [overlay, setOverlay] = useState<{ url: string; title: string } | null>(null);

  const handleExplore = (url: string, title: string) => {
    setOverlay({ url, title });
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setOverlay(null);
    document.body.style.overflow = "";
  };

  return (
    <div className="relative">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-base/20 to-transparent" />

      <BarberiaSection />

      {services.map((service) => (
        <ServiceSection
          key={service.id}
          {...service}
          delay={0.1}
          onExplore={handleExplore}
        />
      ))}

      <HealthSection />

      {overlay && (
        <ServiceOverlay
          url={overlay.url}
          title={overlay.title}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ServiceSections;
