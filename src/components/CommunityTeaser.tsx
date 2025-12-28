import { motion } from "framer-motion";
import { Lock, Users } from "lucide-react";

const CommunityTeaser = () => {
  return (
    <section className="relative py-16 px-6 bg-void">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-base/5 blur-[100px] rounded-full" />

          {/* Icon */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-void border border-gold-base/30 mb-6">
            <Lock className="w-8 h-8 text-gold-base" />
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl bg-gold-base/10"
            />
          </div>

          {/* Content */}
          <h3 className="font-display font-bold text-heading-2 text-white mb-4">
            El <span className="text-gold-gradient">Vestuario VIP</span>
          </h3>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-4 h-4 text-gold-base" />
            <span className="font-mono text-sm text-gold-base">
              500+ miembros activos ahora mismo
            </span>
          </div>

          <p className="font-body text-white/50 max-w-md mx-auto mb-8">
            Negocios cerrándose en tiempo real. Conexiones que transforman carreras. 
            Acceso exclusivo para miembros del Inner Circle.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 font-display text-sm text-white/40 cursor-not-allowed">
              <Lock className="w-4 h-4" />
              Discord
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 font-display text-sm text-white/40 cursor-not-allowed">
              <Lock className="w-4 h-4" />
              Telegram
            </button>
          </div>

          <p className="mt-6 font-mono text-xs text-white/20 uppercase tracking-widest">
            Solo Miembros Verificados
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityTeaser;
