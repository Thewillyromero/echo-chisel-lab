import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Features from "@/components/Features";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Features />
      <About />
      <Stats />
      <Testimonial />
      <Blog />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
