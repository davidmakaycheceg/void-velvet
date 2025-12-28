import { motion } from "framer-motion";
import { useState } from "react";
import blancoExitoso from "@/assets/blanco-exitoso.jpeg";
import latinoExitoso from "@/assets/latino-exitoso.jpeg";
import negroExitoso from "@/assets/negro-exitoso.jpeg";

interface TestimonialCardProps {
  name: string;
  role: string;
  achievement: string;
  quote: string;
  image: string;
  delay?: number;
}

const TestimonialCard = ({ name, role, achievement, quote, image, delay = 0 }: TestimonialCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      style={{ transform: "translateY(0)", willChange: "transform" }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`
            w-full h-full object-cover transition-all duration-700
            ${isHovered ? 'grayscale-0 saturate-[0.8]' : 'grayscale saturate-0'}
          `}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />

        {/* Quote on Hover */}
        <motion.div
          initial={false}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-x-6 bottom-24 text-center"
        >
          <p className="font-body italic text-white/80 text-sm leading-relaxed">
            "{quote}"
          </p>
        </motion.div>

        {/* Info Card */}
        <div className="absolute inset-x-4 bottom-4 glass-panel rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-display font-semibold text-white">{name}</h4>
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">{role}</p>
            </div>
            <div className="text-right">
              <p className={`font-display font-bold text-sm transition-colors duration-300 ${isHovered ? 'text-gold-base' : 'text-white/60'}`}>
                {achievement}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "MARCUS V.",
      role: "Arquitecto",
      achievement: "Facturación x3",
      quote: "Sky Club cambió mi perspectiva. No se trata solo de imagen, se trata de mentalidad.",
      image: blancoExitoso,
    },
    {
      name: "DANIEL R.",
      role: "Empresario",
      achievement: "2 Startups",
      quote: "El networking aquí vale más que cualquier MBA. Conexiones reales, resultados reales.",
      image: latinoExitoso,
    },
    {
      name: "ADRIÁN M.",
      role: "Director Creativo",
      achievement: "+40% Clientes",
      quote: "Cada detalle cuenta. Sky Club me enseñó que la excelencia no es negociable.",
      image: negroExitoso,
    },
  ];

  return (
    <section className="relative py-24 md:py-32 px-6 bg-void overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">
            // PROOF OF ASCENSION
          </span>
          <h2 className="font-display font-bold text-heading-1 text-white mt-4">
            Los <span className="text-gold-gradient">Ascendidos</span>
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
