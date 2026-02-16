import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState } from "react";

interface BentoCardProps {
  title: string;
  subtitle: string;
  image: string;
  className?: string;
  delay?: number;
  scrollTo?: string;
}

const BentoCard = ({ title, subtitle, image, className = "", delay = 0, scrollTo }: BentoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (scrollTo) {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`group relative bg-void border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-gold ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 transition-all duration-700 ease-out">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`
            w-full h-full object-cover transition-all duration-700
            ${isHovered ? 'opacity-80 scale-105' : 'opacity-70 scale-100'}
          `}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end min-h-[200px]">
        <motion.div
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-display font-bold text-heading-3 text-white mb-2">
            {title}
          </h3>
          <p className="font-body text-sm text-white/50">{subtitle}</p>
        </motion.div>

        {/* Arrow Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8"
        >
          <div className="w-12 h-12 rounded-full border border-gold-base/50 bg-gold-base/10 backdrop-blur-sm flex items-center justify-center">
            <ArrowDown className="w-5 h-5 text-gold-base" />
          </div>
        </motion.div>
      </div>

      {/* Hover Border */}
      <div
        className={`
          absolute inset-0 rounded-2xl border-2 pointer-events-none transition-all duration-500
          ${isHovered ? 'border-gold-base/50' : 'border-transparent'}
        `}
      />
    </motion.div>
  );
};

const AudioWave = () => (
  <div className="audio-wave ml-3">
    {[...Array(5)].map((_, i) => (
      <span key={i} className="bg-gold-base" />
    ))}
  </div>
);

const BentoGrid = () => {
  return (
    <section id="vision" className="relative py-24 md:py-32 px-6 bg-void">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">
            // THE CONSTELLATION
          </span>
          <h2 className="font-display font-bold text-heading-1 text-white mt-4">
            Tu Universo de <span className="text-gold-gradient">Elevación</span>
          </h2>
          <p className="font-body text-white/40 mt-4 max-w-md mx-auto">
            Explora cada pilar de tu transformación. Haz clic para descubrir más.
          </p>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[180px]">
        {/* Barbershop - Large */}
        <BentoCard
          title="LA BARBERÍA"
          subtitle="Rituales de Acero"
          image="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80"
          className="md:col-span-2 md:row-span-2"
          delay={0}
          scrollTo="barberia"
        />

        {/* Library */}
        <BentoCard
          title="LIBRERÍA"
          subtitle="Arquitectura Mental"
          image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80"
          className="md:col-span-1 md:row-span-1"
          delay={0.1}
          scrollTo="libreria"
        />

        {/* Jewelry - Tall */}
        <BentoCard
          title="JOYERÍA"
          subtitle="Tótems de Poder"
          image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
          className="md:col-span-1 md:row-span-2"
          delay={0.2}
          scrollTo="joyeria"
        />

        {/* Atelier */}
        <BentoCard
          title="ATELIER"
          subtitle="Tu Segunda Piel"
          image="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80"
          className="md:col-span-1 md:row-span-1"
          delay={0.3}
          scrollTo="atelier"
        />

        {/* Podcast with Audio Wave */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => document.getElementById('podcast-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative bg-void border border-white/10 rounded-2xl overflow-hidden cursor-pointer md:col-span-1 md:row-span-1 hover:shadow-gold transition-shadow duration-700"
        >
          <div className="absolute inset-0 transition-all duration-700 group-hover:opacity-60">
            <img
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80"
              alt="Podcast"
              loading="lazy"
              className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
          </div>
          <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
            <div className="flex items-center">
              <h3 className="font-display font-bold text-heading-3 text-white">PODCAST</h3>
              <AudioWave />
            </div>
            <p className="font-body text-sm text-white/50 mt-2">Frecuencia Élite</p>
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold-base/50 pointer-events-none transition-all duration-500" />
        </motion.div>

        {/* Health Club - Wide */}
        <BentoCard
          title="SALUD & GYM"
          subtitle="Ingeniería Biológica"
          image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
          className="md:col-span-2 md:row-span-1"
          delay={0.5}
          scrollTo="gym"
        />
      </div>
    </section>
  );
};

export default BentoGrid;
