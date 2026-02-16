import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";

// Generate stable star positions
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    });
  }
  return stars;
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const stars = useMemo(() => generateStars(60), []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Magnetic button effect
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);
  const buttonSpringX = useSpring(buttonX, { damping: 15, stiffness: 150 });
  const buttonSpringY = useSpring(buttonY, { damping: 15, stiffness: 150 });

  const handleButtonMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    buttonX.set((e.clientX - centerX) * 0.3);
    buttonY.set((e.clientY - centerY) * 0.3);
  };

  const handleButtonMouseLeave = () => {
    buttonX.set(0);
    buttonY.set(0);
    setIsButtonHovered(false);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-void"
    >
      {/* Atmospheric Background */}
      <div className="absolute inset-0 bg-void" />

      {/* Starfield */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-gold-base/40"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>

      {/* Animated Storm Clouds Effect */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20, 20, 20, 0.8) 0%, transparent 50%),
              radial-gradient(ellipse 60% 30% at 30% 20%, rgba(30, 30, 30, 0.6) 0%, transparent 40%),
              radial-gradient(ellipse 50% 25% at 70% 30%, rgba(25, 25, 25, 0.5) 0%, transparent 35%)
            `,
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Golden Light Ray */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 0%, hsl(45 75% 52% / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Subtle Gradient Orb */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(45 75% 52% / 0.1) 0%, transparent 60%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Micro Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            // EST. 2024 — GLOBAL ELEVATION NETWORK
          </span>
        </motion.div>

        {/* Main Headline with 3D Parallax */}
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="relative"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-gold-gradient animate-pulse-slow"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
          >
            SKY
            <br />
            <span className="relative inline-block text-gold-gradient">
              CLUB
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-2 left-0 w-full h-[2px] bg-gold-gradient origin-left"
              />
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 font-display font-semibold text-2xl md:text-3xl tracking-wide uppercase"
          style={{ color: "hsl(43 60% 38%)" }}
        >
          Sky is the limit
        </motion.p>

        {/* Gandhi Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-6 font-body italic text-base md:text-lg text-white/40 max-w-lg mx-auto leading-relaxed"
        >
          "La forma más rápida de cambiar tu vida es cambiar lo que haces todos los días."
          <span className="block mt-2 not-italic font-mono text-xs uppercase tracking-[0.2em] text-white/25">
            — Mahatma Gandhi
          </span>
        </motion.p>

        {/* CTA Button - Magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-12"
          onMouseMove={handleButtonMouseMove}
          onMouseLeave={handleButtonMouseLeave}
          onMouseEnter={() => setIsButtonHovered(true)}
        >
          <motion.button
            ref={buttonRef}
            style={{ x: buttonSpringX, y: buttonSpringY }}
            onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
            className={`
              relative px-8 py-4 rounded-full font-display font-semibold text-sm uppercase tracking-widest
              border transition-all duration-500 overflow-hidden
              ${isButtonHovered
                ? 'bg-gold-base text-void border-gold-base shadow-gold'
                : 'bg-transparent text-gold-light border-gold-base/30 hover:border-gold-base/60'
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-3">
              Iniciar Ascenso
              <ArrowDown className="w-4 h-4 rotate-[-45deg]" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
