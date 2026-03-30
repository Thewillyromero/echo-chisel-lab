import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import LogoMarquee from "@/components/LogoMarquee";
import Features from "@/components/Features";
import DemoCall from "@/components/DemoCall";
import CallPlayer from "@/components/CallPlayer";
import ROICalculator from "@/components/ROICalculator";
import CampaignResults from "@/components/CampaignResults";
import Squad from "@/components/Squad";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import FOMONotifications from "@/components/FOMONotifications";
import LiveViewers from "@/components/LiveViewers";
import ScrollRobot from "@/components/ScrollRobot";
import FloatingAgent from "@/components/FloatingAgent";
import { LiveMetricsProvider } from "@/contexts/LiveMetricsContext";

import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";
import agentSupport from "@/assets/characters/agent-support.png";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/m4SFv9fHyIZraSrAu8QT";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSource, setContactSource] = useState("general");

  const openContact = (source: string = "general") => {
    window.open(BOOKING_URL, "_blank");
  };

  return (
    <LiveMetricsProvider>
      <div className="min-h-screen bg-background pb-8">
        <Navbar onContact={() => openContact("navbar")} />
        <Hero onContact={() => openContact("hero")} />
        <SocialProof />
        <LogoMarquee />
        <div className="relative">
          <FloatingAgent src={agentInbound} position="right" color="hsl(190 60% 55%)" />
        </div>
        <Features />
        <DemoCall />
        <div className="relative">
          <FloatingAgent src={agentOutbound} position="left" color="hsl(260 50% 65%)" />
        </div>
        <ROICalculator onContact={() => openContact("roi-calculator")} />
        <CallPlayer />
        <CampaignResults />
        <div className="relative">
          <FloatingAgent src={agentAnalytics} position="right" color="hsl(35 70% 58%)" />
        </div>
        <Squad />
        <About />
        <Stats />
        <Testimonial />
        <div className="relative">
          <FloatingAgent src={agentSupport} position="left" color="hsl(340 55% 60%)" />
        </div>
        <Blog />
        <FAQ />
        <div className="relative">
          <FloatingAgent src={agentScheduler} position="right" color="hsl(160 50% 48%)" />
        </div>
        <CTA onContact={() => openContact("cta")} />
        <Footer />
        <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source={contactSource} />
        <ScrollRobot />
        <FOMONotifications />
        <LiveViewers />
      </div>
    </LiveMetricsProvider>
  );
};

export default Index;
