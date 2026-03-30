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

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/m4SFv9fHyIZraSrAu8QT";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSource, setContactSource] = useState("general");

  const openContact = (source: string = "general") => {
    window.open(BOOKING_URL, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContact={() => openContact("navbar")} />
      <Hero onContact={() => openContact("hero")} />
      <SocialProof />
      <LogoMarquee />
      <Features />
      <DemoCall />
      <ROICalculator onContact={() => openContact("roi-calculator")} />
      <CallPlayer />
      <CampaignResults />
      <Squad />
      <About />
      <Stats />
      <Testimonial />
      <Blog />
      <FAQ />
      <CTA onContact={() => openContact("cta")} />
      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source={contactSource} />
    </div>
  );
};

export default Index;
