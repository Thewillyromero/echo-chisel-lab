import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Features from "@/components/Features";
import About from "@/components/About";
import Squad from "@/components/Squad";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSource, setContactSource] = useState("general");

  const openContact = (source: string = "general") => {
    setContactSource(source);
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContact={() => openContact("navbar")} />
      <Hero onContact={() => openContact("hero")} />
      <LogoMarquee />
      <Features />
      <Squad />
      <About />
      <Stats />
      <Testimonial />
      <Blog />
      <CTA onContact={() => openContact("cta")} />
      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source={contactSource} />
    </div>
  );
};

export default Index;
