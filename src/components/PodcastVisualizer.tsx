import { motion } from "framer-motion";
import { Play, Radio } from "lucide-react";
import { useState } from "react";

const AudioBars = () => {
  return (
    <div className="flex items-end gap-1 h-12">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: [
              Math.random() * 20 + 10,
              Math.random() * 40 + 20,
              Math.random() * 20 + 10,
            ],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
          className="w-1 bg-gold-gradient rounded-full"
          style={{ minHeight: 8 }}
        />
      ))}
    </div>
  );
};

const PodcastVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative bg-void border-t border-gold-base/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Info */}
          <div className="flex items-center gap-6">
            {/* Play Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold group"
            >
              <Play className="w-6 h-6 text-void ml-1" fill="currentColor" />
              
              {/* Ping Animation */}
              <span className="absolute inset-0 rounded-full bg-gold-base/50 animate-ping-slow" />
            </motion.button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Radio className="w-4 h-4 text-gold-base" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold-base">
                  On Air
                </span>
              </div>
              <h3 className="font-display font-semibold text-white text-lg md:text-xl">
                Episodio 42 — La Psicología del Dinero
              </h3>
              <p className="font-body text-white/40 text-sm">
                Con Alejandro Romero • 45 min
              </p>
            </div>
          </div>

          {/* Center - Audio Visualizer */}
          <div className="hidden md:block flex-1 max-w-md">
            <AudioBars />
          </div>

          {/* Right - Subscribe */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full border border-gold-base/30 text-gold-light font-display text-sm uppercase tracking-wider hover:bg-gold-base/10 transition-colors duration-300"
          >
            Escuchar Ahora
          </motion.button>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gold-gradient opacity-20 blur-xl" />
    </section>
  );
};

export default PodcastVisualizer;
