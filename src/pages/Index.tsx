import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import LogoMarquee from "@/components/LogoMarquee";
import Features from "@/components/Features";
import DemoCall from "@/components/DemoCall";
import CallPlayer from "@/components/CallPlayer";
import CallSimulator from "@/components/CallSimulator";
import ROICalculator from "@/components/ROICalculator";
import CampaignResults from "@/components/CampaignResults";
import Squad from "@/components/Squad";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FOMONotifications from "@/components/FOMONotifications";
import LiveViewers from "@/components/LiveViewers";
import { LiveMetricsProvider } from "@/contexts/LiveMetricsContext";
import { BOOKING_URL } from "@/lib/constants";

const Index = () => {
  const openContact = () => {
    window.open(BOOKING_URL, "_blank");
  };

  return (
    <LiveMetricsProvider>
      <div className="min-h-screen bg-background pb-8 overflow-x-hidden">
        <Navbar onContact={openContact} />
        <Hero onContact={openContact} />
        <SocialProof />
        <LogoMarquee />
        <Features />
        <DemoCall />
        <ROICalculator onContact={openContact} />
        <CallPlayer />
        <CallSimulator />
        <CampaignResults />
        <Squad />
        <About />
        <Stats />
        <Testimonial />
        <FAQ />
        <CTA onContact={openContact} />
        <Footer />
        <FOMONotifications />
        <LiveViewers />
      </div>
    </LiveMetricsProvider>
  );
};

export default Index;
