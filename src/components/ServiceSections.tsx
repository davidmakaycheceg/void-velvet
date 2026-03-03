import { motion, AnimatePresence } from "framer-motion";
import { Scissors, BookOpen, Gem, Shirt, Mic, Dumbbell, ArrowRight, X, ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
                    className="w-full" style={{ height: "calc(100vh - 65px)" }}
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
    reversed = false,
    delay = 0,
    onExplore,
}: ServiceSectionProps) => {
    return (
        <section id={id} className="relative py-20 md:py-28 px-6 bg-void overflow-hidden">
            {/* Background glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: "50%",
                    left: reversed ? "20%" : "80%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    height: 500,
                    background:
                        "radial-gradient(circle, hsl(45 75% 52% / 0.04) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? "lg:direction-rtl" : ""
                        }`}
                    style={reversed ? { direction: "rtl" } : {}}
                >
                    {/* Image Side */}
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
                                {/* Gold overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                                <div className="absolute inset-0 bg-gold-base/0 group-hover:bg-gold-base/5 transition-colors duration-700" />
                            </div>

                            {/* Decorative corner accents */}
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold-base/30 rounded-tl-lg" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold-base/30 rounded-br-lg" />
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: reversed ? -60 : 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.9, delay: delay + 0.15, ease: [0.16, 1, 0.3, 1] }}
                        style={{ direction: "ltr" }}
                    >
                        {/* Label */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gold-base/10 border border-gold-base/20 flex items-center justify-center">
                                {icon}
                            </div>
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">
                // {label}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-display font-bold text-heading-1 text-white mb-2">
                            {title}
                        </h2>
                        <p className="font-display text-lg text-gold-light/70 mb-6">
                            {subtitle}
                        </p>

                        {/* Description */}
                        <p className="font-body text-white/50 leading-relaxed mb-8 max-w-lg">
                            {description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-3 mb-8">
                            {features.map((feature, i) => (
                                <motion.li
                                    key={i}
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

                        {/* CTA */}
                        <motion.button
                            whileHover={{ scale: 1.03, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onExplore(href, title)}
                            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-gold-base/30 text-gold-light font-display text-sm uppercase tracking-wider hover:bg-gold-base/10 hover:border-gold-base/50 transition-all duration-300"
                        >
                            Explorar
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Section bottom divider */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-base/15 to-transparent" />
        </section>
    );
};

// Barbería pricing categories
const barberiaCategories = [
  {
    name: "Corte",
    items: [
      { service: "Corte Premium", price: "15€" },
    ],
  },
  {
    name: "Barbas",
    items: [
      { service: "Barba", price: "10€" },
    ],
  },
  {
    name: "Cejas",
    items: [
      { service: "Cejas", price: "4€" },
      { service: "Diseño de cejas (hilo)", price: "5€" },
      { service: "Diseño de cejas con tinte", price: "8€" },
    ],
  },
  {
    name: "Limpieza Facial",
    items: [
      { service: "Limpieza facial básica / Asesoramiento", price: "20€" },
      { service: "Limpieza facial profunda / Asesoramiento", price: "30€" },
    ],
  },
  {
    name: "Decoloración & Mechas",
    items: [
      { service: "Decoloración", price: "85€" },
      { service: "Decoloración + Corte", price: "95€" },
      { service: "Mechas", price: "65€" },
      { service: "Mechas + Corte", price: "75€" },
    ],
  },
  {
    name: "Packs",
    items: [
      { service: "Pack SKY IS THE LIMIT — Corte + Barba + Cejas", price: "22€" },
    ],
  },
];

const BarberiaSection = ({ onExplore }: { onExplore: (url: string, title: string) => void }) => (
  <section id="barberia" className="relative py-20 md:py-28 px-6 bg-void overflow-hidden">
    {/* Background glow */}
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
        {/* Image Side */}
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

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Label */}
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

          {/* Pricing Accordion */}
          <Accordion type="multiple" className="space-y-3 mb-8">
            {barberiaCategories.map((cat) => (
              <AccordionItem
                key={cat.name}
                value={cat.name}
                className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] backdrop-blur-sm px-5"
              >
                <AccordionTrigger className="hover:no-underline py-4 gap-3">
                  <span className="font-display text-sm uppercase tracking-wider text-white/90 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold-base" />
                    {cat.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-2">
                    {cat.items.map((item) => (
                      <div
                        key={item.service}
                        className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                      >
                        <span className="font-body text-sm text-white/60">{item.service}</span>
                        <span className="font-display font-semibold text-gold-base text-sm shrink-0 ml-4">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onExplore("https://skybladefinal.lovable.app", "LA BARBERÍA")}
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-gold-base/30 text-gold-light font-display text-sm uppercase tracking-wider hover:bg-gold-base/10 hover:border-gold-base/50 transition-all duration-300"
          >
            Reservar Cita
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-base/15 to-transparent" />
  </section>
);

const services = [
    {
        id: "libreria",
        label: "ARQUITECTURA MENTAL",
        title: "LIBRERÍA",
        subtitle: "El conocimiento como arma secreta.",
        description:
            "Una curación editorial de los títulos más impactantes en negocios, psicología, filosofía y desarrollo personal. Cada libro en nuestra selección ha sido elegido por su capacidad de transformar perspectivas y acelerar tu crecimiento.",
        features: [
            "Selección curada mensual",
            "Club de lectura exclusivo",
            "Resúmenes ejecutivos semanales",
            "Encuentros con autores",
            "Biblioteca digital ilimitada",
        ],
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
        icon: <BookOpen className="w-5 h-5 text-gold-base" />,
        reversed: true,
        href: "https://skypressfinal.lovable.app",
    },
    {
        id: "joyeria",
        label: "TÓTEMS DE PODER",
        title: "JOYERÍA",
        subtitle: "Cada pieza cuenta tu historia.",
        description:
            "Colecciones exclusivas de joyería masculina diseñadas para comunicar poder, gusto y sofisticación. Desde anillos signature hasta cadenas artesanales — cada pieza es un símbolo de tu ascenso.",
        features: [
            "Diseños exclusivos SKY CLUB",
            "Materiales premium: oro, plata, titanio",
            "Grabado personalizado",
            "Ediciones limitadas trimestrales",
            "Servicio de diseño a medida",
        ],
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
        icon: <Gem className="w-5 h-5 text-gold-base" />,
        href: "https://skycartelfinal.lovable.app",
    },
    {
        id: "atelier",
        label: "TU SEGUNDA PIEL",
        title: "ATELIER",
        subtitle: "La ropa no te viste — te arma.",
        description:
            "Nuestro atelier combina sastrería artesanal con asesoría de imagen integral. Desde trajes a medida hasta capsule wardrobes estratégicos — cada prenda es una inversión en cómo el mundo te percibe.",
        features: [
            "Sastrería a medida italiana",
            "Asesoría de imagen personal",
            "Capsule wardrobe estratégico",
            "Personal shopping VIP",
            "Alteraciones express 24h",
        ],
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
        icon: <Shirt className="w-5 h-5 text-gold-base" />,
        reversed: true,
        href: "https://skylabelfinal.lovable.app",
    },
    {
        id: "podcast-section",
        label: "FRECUENCIA ÉLITE",
        title: "PODCAST",
        subtitle: "Sintoniza la frecuencia del éxito.",
        description:
            "Conversaciones sin filtro con emprendedores, atletas, inversores y líderes de industria. Cada episodio es una masterclass sobre mentalidad, dinero, relaciones y la construcción de una vida extraordinaria.",
        features: [
            "Episodios semanales exclusivos",
            "Entrevistas con líderes de industria",
            "Masterclasses de mentalidad",
            "Contenido behind-the-scenes",
            "Q&A en vivo para miembros",
        ],
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
        icon: <Mic className="w-5 h-5 text-gold-base" />,
        href: "https://skyhub-tribe.lovable.app",
    },
    {
        id: "gym",
        label: "INGENIERÍA BIOLÓGICA",
        title: "SALUD & GYM",
        subtitle: "Tu cuerpo es tu vehículo de impacto.",
        description:
            "Un programa holístico de transformación física que integra entrenamiento personalizado, nutrición de precisión y biohacking. No es un gym — es un laboratorio de rendimiento humano diseñado para hombres que exigen lo máximo.",
        features: [
            "Entrenamiento personalizado 1:1",
            "Nutrición de precisión con chef",
            "Protocolos de biohacking",
            "Recovery suite: crioterapia & sauna",
            "Tracking de métricas de rendimiento",
        ],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
        icon: <Dumbbell className="w-5 h-5 text-gold-base" />,
        reversed: true,
        href: "https://skyforgefinal.lovable.app",
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
            {/* Top section divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold-base/20 to-transparent" />

            {/* Custom Barbería Section with pricing */}
            <BarberiaSection onExplore={handleExplore} />

            {services.map((service) => (
                <ServiceSection
                    key={service.id}
                    {...service}
                    delay={0.1}
                    onExplore={handleExplore}
                />
            ))}

            {/* Iframe overlay */}
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
