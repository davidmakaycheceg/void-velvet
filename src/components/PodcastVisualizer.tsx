import { motion } from "framer-motion";
import { ExternalLink, Headphones, Play } from "lucide-react";
import { useRef, useState } from "react";
import episodioAudio from "@/assets/episodio-42.m4a";

const suggestedVideos = [
  { id: "RI_dIDTD06U", title: "Cómo bajar el cortisol y atraer cosas buenas a tu vida", author: "Marian Rojas Estapé · Malasmadres", topic: "Mentalidad" },
  { id: "5J6jAC6XxAI", title: "Define tus miedos en lugar de tus metas", author: "Tim Ferriss · TED (en inglés)", topic: "Superación personal" },
  { id: "5VUG2OPwbvs", title: "Una conversación sin filtro con José Elías", author: "Tengo un Plan", topic: "Emprendimiento" },
];

// The club has supplied audio, but not its own video yet.
const clubVideoId = import.meta.env.VITE_SKY_CLUB_VIDEO_ID?.trim();
const clubVideo = clubVideoId && /^[a-zA-Z0-9_-]{11}$/.test(clubVideoId)
  ? { id: clubVideoId, title: "Podcast Sky Club", author: "Sky Club", topic: "Podcast del club" }
  : null;
const videos = clubVideo ? [clubVideo, ...suggestedVideos] : suggestedVideos;

const PodcastVisualizer = () => {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playVideo = (video: typeof activeVideo) => {
    audioRef.current?.pause();
    setActiveVideo(video);
    setIsVideoLoaded(true);
  };

  return (
    <section id="podcast-section" className="relative py-20 md:py-28 px-6 bg-void border-t border-gold-base/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-base/60">// FRECUENCIA ÉLITE</span>
          <h2 className="font-display font-bold text-heading-1 text-white mt-4 mb-4">Podcast <span className="text-gold-gradient">Sky Club</span></h2>
          <p className="font-body text-white/50 max-w-2xl">Conversaciones sobre mentalidad, crecimiento personal y emprendimiento.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 items-start">
          <div className="min-w-0">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black border border-white/10">
              {isVideoLoaded ? (
                <iframe key={activeVideo.id} src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`} title={activeVideo.title} className="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              ) : (
                <button type="button" onClick={() => playVideo(activeVideo)} aria-label={`Reproducir ${activeVideo.title}`} className="relative block w-full h-full group">
                  <img src={`https://i.ytimg.com/vi/${activeVideo.id}/hqdefault.jpg`} alt={activeVideo.title} loading="lazy" className="w-full h-full object-contain" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-gold-base text-void shadow-lg group-hover:bg-gold-light transition-colors"><Play className="w-7 h-7" fill="currentColor" /></span>
                  </span>
                </button>
              )}
            </div>
            <p className="text-gold-base text-xs mt-5 mb-2">{activeVideo.id === clubVideo?.id ? "Podcast del club" : "Vídeo sugerido"} · {activeVideo.topic}</p>
            <h3 className="font-display text-xl text-white">{activeVideo.title}</h3>
            <p className="text-sm text-white/50 mt-2">{activeVideo.author}</p>
            <a href={`https://www.youtube.com/watch?v=${activeVideo.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gold-light mt-4 hover:text-gold-base">Ver en YouTube <ExternalLink className="w-4 h-4" /></a>
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="flex items-center gap-2 font-display text-lg text-white mb-4"><Headphones className="w-5 h-5 text-gold-base" />Audio del club</h3>
              <p className="text-sm text-white/50 mb-4">Episodio 42 · La Psicología del Dinero</p>
              <audio ref={audioRef} controls preload="none" src={episodioAudio} onPlay={() => setIsVideoLoaded(false)} className="w-full" aria-label="Audio del podcast Sky Club" />
            </div>
          </div>
          <aside className="min-w-0" aria-label="Selección de vídeos">
            <h3 className="font-display text-xl text-white mb-5">Vídeos sugeridos</h3>
            <div className="space-y-5">
              {videos.map((video) => (
                <button key={video.id} type="button" onClick={() => playVideo(video)} aria-pressed={activeVideo.id === video.id} className={`w-full grid grid-cols-[112px_minmax(0,1fr)] sm:grid-cols-[140px_minmax(0,1fr)] gap-4 text-left p-2 rounded-lg border transition-colors ${activeVideo.id === video.id ? "border-gold-base/60 bg-gold-base/5" : "border-white/10 hover:border-gold-base/40"}`}>
                  <img src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} alt="" loading="lazy" className="w-full aspect-video object-cover rounded" />
                  <span className="min-w-0">
                    <span className="block text-xs text-gold-base mb-1">{video.topic}</span>
                    <span className="block text-sm font-display text-white leading-snug">{video.title}</span>
                    <span className="block text-xs text-white/45 mt-2">{video.author}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default PodcastVisualizer;
