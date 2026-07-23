import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check, Dumbbell, Leaf, Mail, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useAuth } from "@/hooks/useAuth";

interface PricingCardProps {
  tier: string;
  price: number;
  icon: React.ReactNode;
  features: string[];
  cta: string;
  note?: string;
  isPopular?: boolean;
  isPremium?: boolean;
  delay?: number;
  onCtaClick?: () => void;
}

const formatEuro = (value: number) => `${value.toFixed(2).replace(".", ",")}€`;

const PricingCard = ({
  tier,
  price,
  icon,
  features,
  cta,
  note,
  isPopular,
  isPremium,
  delay = 0,
  onCtaClick,
}: PricingCardProps) => {
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

  useEffect(() => {
    if (hasAnimated) return;

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
      { threshold: 0.3 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [price, hasAnimated]);

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
          ? "bg-[#0a0a0a] border-beam scale-105 md:scale-110 shadow-gold-lg z-10"
          : isPopular
            ? "glass-panel border border-white/20"
            : "bg-white/5 border border-white/10"
        }
      `}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-void text-xs font-semibold uppercase tracking-wider">
          Más Elegido
        </div>
      )}

      {isPremium && (
        <div className="absolute inset-0 rounded-3xl shadow-gold-glow opacity-30 pointer-events-none" />
      )}

      <div className={`mb-6 ${isPremium ? "animate-float" : ""}`}>
        {icon}
      </div>

      <h3 className={`font-display font-bold text-xl mb-2 ${isPremium ? "text-gold-gradient" : "text-white"}`}>
        {tier}
      </h3>

      <div className="mb-6">
        <span className={`font-display font-bold text-5xl ${isPremium ? "text-gold-base" : "text-white"}`}>
          {formatEuro(displayPrice)}
        </span>
        <span className="block text-white/40 text-sm mt-2">pago único</span>
        {note && (
          <p className="text-gold-base/70 text-xs mt-2 font-mono">
            {note}
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            <Check className={`w-4 h-4 ${isPremium ? "text-gold-base" : "text-white/60"}`} />
            <span className="text-white/70">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onCtaClick}
        className={`
          relative z-20 cursor-pointer
          w-full py-4 rounded-full font-display font-semibold text-sm uppercase tracking-wider
          transition-all duration-300
          ${isPremium
            ? "bg-gold-gradient text-void shimmer hover:shadow-gold"
            : isPopular
              ? "bg-white text-void hover:bg-white/90"
              : "border border-white/30 text-white hover:bg-white/10"
          }
        `}
      >
        {cta}
      </button>
    </motion.div>
  );
};

const MembershipSection = () => {
  const { user } = useAuth();
  const { openCheckout, closeCheckout, isOpen, checkoutElement } = useStripeCheckout();
  const [checkoutEmail, setCheckoutEmail] = useState("");

  useEffect(() => {
    if (user?.email && !checkoutEmail) {
      setCheckoutEmail(user.email);
    }
  }, [user?.email, checkoutEmail]);

  const handlePurchase = (priceId: string) => {
    openCheckout({
      priceId,
      customerEmail: checkoutEmail.trim() || user?.email || undefined,
      userId: user?.id ?? "",
      returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  };

  return (
    <section id="membership" className="relative py-24 md:py-32 px-6 bg-void overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-base/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">
            // PAGO ÚNICO
          </span>
          <h2 className="font-display font-bold text-heading-1 text-white mt-4 mb-4">
            Elige Tu <span className="text-gold-gradient">Elevación</span>
          </h2>
          <p className="font-body text-white/50 max-w-xl mx-auto">
            Dieta, rutina o pack completo. Tras el pago recibirás por email el formulario para personalizar objetivos, nivel, restricciones y horarios.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-16"
        >
          <label htmlFor="checkout-email" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
            <Mail className="w-4 h-4 text-gold-base" />
            Email para recibir el formulario
          </label>
          <input
            id="checkout-email"
            type="email"
            value={checkoutEmail}
            onChange={(event) => setCheckoutEmail(event.target.value)}
            placeholder="tu@email.com"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-white/25 outline-none focus:border-gold-base/50 focus:ring-2 focus:ring-gold-base/10"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center">
          <PricingCard
            tier="Dieta"
            price={14.99}
            icon={<Leaf className="w-10 h-10 text-white/60" />}
            features={[
              "Formulario nutricional por email",
              "Objetivos y restricciones alimentarias",
              "Preferencias, horarios y estilo de vida",
              "Plan personalizado con IA exclusiva",
            ]}
            cta="Pagar dieta"
            note="14,99€"
            delay={0.1}
            onCtaClick={() => handlePurchase("sky_diet_one_time")}
          />
          <PricingCard
            tier="Rutina"
            price={14.99}
            icon={<Dumbbell className="w-10 h-10 text-white" />}
            features={[
              "Formulario de nivel y experiencia",
              "Objetivos físicos y disponibilidad",
              "Material, lesiones y limitaciones",
              "Rutina de gym personalizada",
            ]}
            cta="Pagar rutina"
            note="14,99€"
            isPopular
            delay={0.2}
            onCtaClick={() => handlePurchase("sky_routine_one_time")}
          />
          <PricingCard
            tier="Dieta + Rutina"
            price={20}
            icon={<Sparkles className="w-12 h-12 text-gold-base" />}
            features={[
              "Full Pack personalizado",
              "Dieta y entrenamiento conectados",
              "Formulario completo por email",
              "Mejor valor por pago único",
            ]}
            cta="Pagar full pack"
            note="20,00€"
            isPremium
            delay={0.3}
            onCtaClick={() => handlePurchase("sky_full_pack_one_time")}
          />
        </div>

        <Dialog open={isOpen} onOpenChange={(o) => !o && closeCheckout()}>
          <DialogContent className="max-w-2xl bg-void border-white/10 text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-gold-gradient">Completa tu pago único</DialogTitle>
            </DialogHeader>
            {checkoutElement}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default MembershipSection;
