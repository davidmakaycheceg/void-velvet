import NoiseOverlay from "@/components/NoiseOverlay";
import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import ServiceSections from "@/components/ServiceSections";
import MembershipSection from "@/components/MembershipSection";
import Testimonials from "@/components/Testimonials";
import Marquee from "@/components/Marquee";
import PodcastVisualizer from "@/components/PodcastVisualizer";
import ConciergeButton from "@/components/ConciergeButton";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="relative bg-void min-h-screen overflow-x-hidden">
      {/* Noise Texture Overlay */}
      <NoiseOverlay />

      {/* Floating Island Navigation */}
      <FloatingNav />

      {/* Hero Section - The Gate */}
      <Hero />

      {/* Bento Grid Hub - The Constellation */}
      <BentoGrid />

      {/* Service Sections - Detailed Content */}
      <ServiceSections />

      {/* Marquee - Lookbook Infinito */}
      <Marquee />

      {/* Membership Section - The Altar */}
      <MembershipSection />

      {/* Testimonials - Proof of Ascension */}
      <Testimonials />

      {/* Podcast Visualizer - Live Signal */}
      <PodcastVisualizer />

      {/* Footer - Base Operations */}
      <Footer />

      {/* Concierge FAB */}
      <ConciergeButton />

      {/* WhatsApp quick reserve */}
      <WhatsAppFloat />
    </main>
  );
};

export default Index;
