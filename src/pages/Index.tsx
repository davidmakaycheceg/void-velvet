import NoiseOverlay from "@/components/NoiseOverlay";
import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import MembershipSection from "@/components/MembershipSection";
import Testimonials from "@/components/Testimonials";
import Marquee from "@/components/Marquee";
import PodcastVisualizer from "@/components/PodcastVisualizer";
import CommunityTeaser from "@/components/CommunityTeaser";
import TransformationSlider from "@/components/TransformationSlider";
import ConciergeButton from "@/components/ConciergeButton";
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

      {/* Marquee - Lookbook Infinito */}
      <Marquee />

      {/* Membership Section - The Altar */}
      <MembershipSection />

      {/* Testimonials - Proof of Ascension */}
      <Testimonials />

      {/* Podcast Visualizer - Live Signal */}
      <PodcastVisualizer />

      {/* Community Teaser - The Locker Room */}
      <CommunityTeaser />

      {/* Transformation Slider - The Mirror */}
      <TransformationSlider />

      {/* Footer - Base Operations */}
      <Footer />

      {/* Concierge FAB */}
      <ConciergeButton />
    </main>
  );
};

export default Index;
