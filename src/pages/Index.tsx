import { lazy, Suspense } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import PressQuotes from "@/components/PressQuotes";
import PressBar from "@/components/PressBar";
import LogoMarquee from "@/components/LogoMarquee";
import Features from "@/components/Features";
import Squad from "@/components/Squad";
import About from "@/components/About";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FOMONotifications from "@/components/FOMONotifications";
import LiveViewers from "@/components/LiveViewers";
import { LiveMetricsProvider } from "@/contexts/LiveMetricsContext";
import { BOOKING_URL } from "@/lib/constants";

const DemoCall = lazy(() => import("@/components/DemoCall"));
const ROICalculator = lazy(() => import("@/components/ROICalculator"));
const CallPlayer = lazy(() => import("@/components/CallPlayer"));
const CallSimulator = lazy(() => import("@/components/CallSimulator"));
const CampaignResults = lazy(() => import("@/components/CampaignResults"));
const Testimonial = lazy(() => import("@/components/Testimonial"));

const Index = () => {
  const openContact = () => {
    window.open(BOOKING_URL, "_blank");
  };

  return (
    <LiveMetricsProvider>
      <div className="min-h-screen bg-background pb-8 overflow-x-hidden">
        <ScrollProgress />
        <Navbar onContact={openContact} />
        <Hero onContact={openContact} />
        <SocialProof />
        <PressQuotes />
        <PressBar />
        <LogoMarquee />
        <Features />
        <Suspense fallback={<div className="py-20" />}>
          <DemoCall />
        </Suspense>
        <Suspense fallback={<div className="py-20" />}>
          <ROICalculator onContact={openContact} />
        </Suspense>
        <Suspense fallback={<div className="py-20" />}>
          <CallPlayer />
        </Suspense>
        <Suspense fallback={<div className="py-20" />}>
          <CallSimulator />
        </Suspense>
        <Suspense fallback={<div className="py-20" />}>
          <CampaignResults />
        </Suspense>
        <Squad />
        <About />
        <Stats />
        <Suspense fallback={<div className="py-20" />}>
          <Testimonial />
        </Suspense>
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
