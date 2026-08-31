import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Headphones, Pause, Play, Radio } from "lucide-react";
import { useRef, useState } from "react";
import episodioAudio from "@/assets/episodio-42.m4a";

const skyClubChannel = {
  title: "Podcast del Club",
  description:
    "El canal principal de Sky Club: conversaciones para construir criterio, ambición y una vida con más dirección.",
  url: "https://www.youtube.com/results?search_query=Sky+Club+Podcast+Sky+is+the+limit",
};

const featuredSkyClubEpisodes = [
  {
    title: "1 podcast Sky is the limit",
    meta: "Canal principal",
    url: "https://www.youtube.com/results?search_query=%221+podcast%22+%22Sky+is+the+limit%22+%22Sky+Club%22",
  },
  {
    title: "Conversaciones del Club",
    meta: "Selección interna",
    url: "https://www.youtube.com/results?search_query=Sky+Club+podcast+desarrollo+personal",
  },
];

const podcastPillars = [
  {
    pillar: "Pilar 1",
    title: "Mentalidad de Éxito y Superación Personal",
    channels: [
      {
        name: "El Podcast de Marian Rojas Estapé",
        episode: "Cómo gestionar las personas y situaciones que nos estresan (el cortisol)",
        url: "https://www.youtube.com/watch?v=RI_dIDTD06U",
      },
      {
        name: "Tim Ferriss - The Tim Ferriss Show",
        episode: "Define tus miedos en lugar de tus metas (Fear-setting)",
        url: "https://www.youtube.com/watch?v=5J6jAC6XxAI",
      },
    ],
  },
  {
    pillar: "Pilar 2",
    title: "Finanzas Personales, Inversiones y Emprendimiento",
    channels: [
      {
        name: "Value School",
        episode: "Los pilares de la salud financiera y la inversión indexada",
        url: "https://valueschool.es/curso-practico-inversion-indexada/",
      },
      {
        name: "Tengo Un Plan",
        episode: "La entrevista con el empresario José Elías",
        url: "https://www.youtube.com/watch?v=5VUG2OPwbvs",
      },
    ],
  },
  {
    pillar: "Pilar 3",
    title: "Hábitos Atómicos, Productividad y Disciplina",
    channels: [
      {
        name: "Andrew Huberman - Huberman Lab",
        episode: "Sleep Toolkit: herramientas para optimizar sueño, energía y horarios",
        url: "https://www.hubermanlab.com/episode/sleep-toolkit-tools-for-optimizing-sleep-and-sleep-wake-timing",
      },
      {
        name: "El Estoico",
        episode: "Cómo aplicar la Dicotomía del Control para eliminar la ansiedad",
        url: "https://elestoico.com/dicotomia-control/",
      },
      {
        name: "Diario Estoico / Ryan Holiday - The Daily Stoic",
        episode: "El obstáculo es el camino (The Obstacle is the Way)",
        url: "https://dailystoic.com/turn-the-tables-ryan-holiday-reflects-on-10-years-of-the-obstacle-is-the-way/",
      },
    ],
  },
];

const AudioBars = ({ isPlaying }: { isPlaying: boolean }) => {
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
            repeat: isPlaying ? Infinity : 0,
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
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section id="podcast-section" className="relative py-20 md:py-28 px-6 bg-void border-t border-gold-base/30 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gold-gradient opacity-20 blur-xl" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">
            // FRECUENCIA ÉLITE
          </span>
          <h2 className="font-display font-bold text-heading-1 text-white mt-4 mb-4">
            Podcast <span className="text-gold-gradient">Sky Club</span>
          </h2>
          <p className="font-body text-white/50 max-w-2xl">
            Primero el canal del club. Después, una biblioteca recomendada dividida en tres pilares para entrenar mente, dinero y disciplina.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gold-base/25 bg-white/[0.03] p-6"
          >
            <audio ref={audioRef} src={episodioAudio} onEnded={handleAudioEnd} />

            <div className="flex items-center gap-6 mb-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="relative w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold group shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-void" fill="currentColor" />
                ) : (
                  <Play className="w-6 h-6 text-void ml-1" fill="currentColor" />
                )}
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
                  Episodio 42 - La Psicología del Dinero
                </h3>
                <p className="font-body text-white/40 text-sm">
                  Con Alejandro Romero - 45 min
                </p>
              </div>
            </div>

            <AudioBars isPlaying={isPlaying} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gold-base/10 border border-gold-base/20 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-gold-base" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">
                // CANAL PRINCIPAL
              </span>
            </div>
            <h3 className="font-display text-3xl text-white mb-3">{skyClubChannel.title}</h3>
            <p className="font-body text-white/50 leading-relaxed mb-6">
              {skyClubChannel.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {featuredSkyClubEpisodes.map((video) => (
                <a
                  key={video.title}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 hover:border-gold-base/40 transition-colors duration-300"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-base/60">
                    {video.meta}
                  </span>
                  <span className="block font-display text-lg text-white mt-2">{video.title}</span>
                </a>
              ))}
            </div>
            <a
              href={skyClubChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-wider text-gold-light hover:text-gold-base transition-colors"
            >
              Entrar al canal
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gold-base/10 border border-gold-base/20 flex items-center justify-center">
              <Radio className="w-5 h-5 text-gold-base" />
            </div>
            <h3 className="font-display text-heading-2 text-white">Recomendaciones por pilares</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {podcastPillars.map((pillar, pillarIndex) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: pillarIndex * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold-base/60">
                  {pillar.pillar}
                </span>
                <h4 className="font-display text-xl text-white mt-3 mb-6">{pillar.title}</h4>
                <div className="space-y-4">
                  {pillar.channels.map((channel) => (
                    <a
                      key={channel.name}
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border border-white/10 px-4 py-4 hover:border-gold-base/40 transition-colors duration-300"
                    >
                      <span className="font-display text-sm text-white">{channel.name}</span>
                      <span className="block font-body text-sm text-white/45 leading-relaxed mt-2">
                        {channel.episode}
                      </span>
                      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-base/70 mt-4">
                        Abrir recurso
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastVisualizer;
