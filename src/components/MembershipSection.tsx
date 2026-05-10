import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Key, Crown, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface PricingCardProps {
  tier: string;
  price: number;
  originalPrice?: number;
  offerLabel?: string;
  icon: React.ReactNode;
  features: string[];
  cta: string;
  isPopular?: boolean;
  isPremium?: boolean;
  isFree?: boolean;
  delay?: number;
  onCtaClick?: () => void;
}

const PricingCard = ({ tier, price, originalPrice, offerLabel, icon, features, cta, isPopular, isPremium, isFree, delay = 0, onCtaClick }: PricingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Initial count up animation
  useEffect(() => {
    if (hasAnimated || isFree) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayPrice(Math.floor(price * eased * 100) / 100);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayPrice(price);
            }
          };
          animate();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [price, hasAnimated, isFree]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={`
        relative rounded-3xl p-8 transition-all duration-500
        ${isPremium
          ? 'bg-[#0a0a0a] border-beam scale-105 md:scale-110 shadow-gold-lg z-10'
          : isPopular
            ? 'glass-panel border border-white/20'
            : 'bg-white/5 border border-white/10'
        }
      `}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-void text-xs font-semibold uppercase tracking-wider">
          Más Elegido
        </div>
      )}

      {/* Offer Badge */}
      {offerLabel && (
        <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-gold-base text-void text-xs font-semibold uppercase tracking-wider shadow-gold animate-pulse-slow">
          {offerLabel}
        </div>
      )}

      {/* Premium Glow */}
      {isPremium && (
        <div className="absolute inset-0 rounded-3xl shadow-gold-glow opacity-30" />
      )}

      {/* Icon */}
      <div className={`mb-6 ${isPremium ? 'animate-float' : ''}`}>
        {icon}
      </div>

      {/* Tier Name */}
      <h3 className={`font-display font-bold text-xl mb-2 ${isPremium ? 'text-gold-gradient' : 'text-white'}`}>
        {tier}
      </h3>

      {/* Price */}
      <div className="mb-6">
        {isFree ? (
          <span className="font-display font-bold text-5xl text-white">
            Gratis
          </span>
        ) : (
          <>
            {originalPrice && (
              <span className="font-display text-xl text-white/30 line-through mr-3">
                {originalPrice.toFixed(2)}€
              </span>
            )}
            <span className={`font-display font-bold text-5xl ${isPremium ? 'text-gold-base' : 'text-white'}`}>
              {displayPrice.toFixed(2)}€
            </span>
            <span className="text-white/40 text-sm">/mes</span>
            {originalPrice && (
              <p className="text-gold-base/70 text-xs mt-1 font-mono">
                Primeros 3 meses · después {originalPrice.toFixed(2)}€/mes
              </p>
            )}
          </>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <Check className={`w-4 h-4 ${isPremium ? 'text-gold-base' : 'text-white/60'}`} />
            <span className="text-white/70">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onCtaClick}
        className={`
          w-full py-4 rounded-full font-display font-semibold text-sm uppercase tracking-wider
          transition-all duration-300
          ${isPremium
            ? 'bg-gold-gradient text-void shimmer hover:shadow-gold'
            : isPopular
              ? 'bg-white text-void hover:bg-white/90'
              : 'border border-white/30 text-white hover:bg-white/10'
          }
        `}
      >
        {cta}
      </button>
    </motion.div>
  );
};

const MembershipSection = () => {
  const [sliderValue, setSliderValue] = useState(100);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { openCheckout, closeCheckout, isOpen, checkoutElement } = useStripeCheckout();

  const multiplier = 2.5 + (sliderValue / 100) * 5;
  const projectedValue = Math.round(sliderValue * multiplier);

  const handleSubscribe = (priceId: string) => {
    if (!user) {
      navigate(`/auth?redirect=${encodeURIComponent("/#membership")}`);
      return;
    }
    openCheckout({
      priceId,
      customerEmail: user.email ?? undefined,
      userId: user.id,
      returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  };

  const handleFree = () => {
    if (!user) navigate("/auth");
  };

  return (
    <section id="membership" className="relative py-24 md:py-32 px-6 bg-void overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-base/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">
            // THE ALTAR
          </span>
          <h2 className="font-display font-bold text-heading-1 text-white mt-4 mb-4">
            Elige Tu <span className="text-gold-gradient">Elevación</span>
          </h2>
          <p className="font-body text-white/50 max-w-md mx-auto">
            El coste de la ignorancia es mayor que el precio de la excelencia.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center mb-24">
          <PricingCard
            tier="GRATUITA"
            price={0}
            isFree
            icon={<Key className="w-10 h-10 text-white/40" />}
            features={["Acceso Digital Básico", "Contenido Comunitario", "Newsletter Semanal", "Comunidad Discord"]}
            cta="Empezar Gratis"
            delay={0.1}
            onCtaClick={handleFree}
          />
          <PricingCard
            tier="NIVEL ATMOSFÉRICO"
            price={7.99}
            originalPrice={9.99}
            offerLabel="¡Oferta 3 meses!"
            icon={<Crown className="w-10 h-10 text-white" />}
            features={["Todo lo Gratuito +", "Contenido Exclusivo Premium", "Descuentos 15%", "Eventos Mensuales", "Mentoría Grupal"]}
            cta="Elevarse"
            isPopular
            delay={0.2}
            onCtaClick={() => handleSubscribe("sky_atmospheric_monthly")}
          />
          <PricingCard
            tier="CÍRCULO INTERNO"
            price={15.99}
            icon={<Sparkles className="w-12 h-12 text-gold-base" />}
            features={["Todo lo Atmosférico +", "Acceso VIP 24/7", "Mentoría Privada", "Sastrería a Medida", "Black Card Física"]}
            cta="Reclamar Trono"
            isPremium
            delay={0.3}
            onCtaClick={() => handleSubscribe("sky_inner_circle_monthly")}
          />
        </div>

        <Dialog open={isOpen} onOpenChange={(o) => !o && closeCheckout()}>
          <DialogContent className="max-w-2xl bg-void border-white/10 text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-gold-gradient">Completa tu suscripción</DialogTitle>
            </DialogHeader>
            {checkoutElement}
          </DialogContent>
        </Dialog>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display font-bold text-heading-2 text-white mb-4">
                ¿Cuánto Vale Tu <span className="text-gold-gradient">Imagen</span>?
              </h3>
              <p className="text-white/50 mb-8">
                Desliza para ver el impacto potencial de tu inversión en ti mismo.
              </p>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer 
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-6 
                    [&::-webkit-slider-thumb]:h-6 
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-gold-gradient 
                    [&::-webkit-slider-thumb]:shadow-gold 
                    [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="font-mono text-xs text-white/30">50€</span>
                  <span className="font-mono text-xs text-white/30">500€</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold-base/60">
                Impacto Proyectado
              </span>
              <div className="flex items-baseline justify-center md:justify-end gap-2 mt-2">
                <span className="font-display font-bold text-6xl text-gold-gradient">
                  {projectedValue}€
                </span>
                <span className="text-white/40">/mes</span>
              </div>
              <p className="text-white/40 text-sm mt-2">
                En oportunidades, confianza y retorno de imagen
              </p>
            </div>
          </div>
        </motion.div>

        {/* Black Card Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="relative animate-float">
            <div className="w-80 h-48 rounded-2xl bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border border-gold-base/30 shadow-gold-lg p-6 flex flex-col justify-between">
              {/* Chip */}
              <div className="w-12 h-10 rounded-md bg-gradient-to-br from-gold-light via-gold-base to-gold-dark" />

              {/* Card Info */}
              <div>
                <div className="font-display font-bold text-gold-gradient text-xl tracking-wider">
                  SKY CLUB
                </div>
                <div className="font-mono text-xs text-white/30 uppercase tracking-widest mt-1">
                  The Inner Circle
                </div>
              </div>
            </div>

            {/* Smoke/Glow Effect */}
            <div className="absolute -inset-10 bg-gold-base/5 blur-3xl rounded-full -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipSection;
