import { lazy, Suspense } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PressQuotes from "@/components/PressQuotes";
import PressBar from "@/components/PressBar";
import Features from "@/components/Features";
import LogoMarquee from "@/components/LogoMarquee";
import SocialProof from "@/components/SocialProof";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FOMONotifications from "@/components/FOMONotifications";
import LiveViewers from "@/components/LiveViewers";
import SectionFade from "@/components/SectionFade";
import { LiveMetricsProvider } from "@/contexts/LiveMetricsContext";
import { BOOKING_URL } from "@/lib/constants";

const DemoCall = lazy(() => import("@/components/DemoCall"));
const ROICalculator = lazy(() => import("@/components/ROICalculator"));
const CallPlayer = lazy(() => import("@/components/CallPlayer"));
const CallSimulator = lazy(() => import("@/components/CallSimulator"));
const CampaignResults = lazy(() => import("@/components/CampaignResults"));
const Stats = lazy(() => import("@/components/Stats"));
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

        {/* 1. Hero — qué hace CALLA */}
        <Hero onContact={openContact} />

        {/* 2. Forbes — credibilidad inmediata */}
        <SectionFade><PressQuotes /></SectionFade>
        <SectionFade><PressBar /></SectionFade>

        {/* 3. Los 4 agentes — el equipo de monigotes */}
        <SectionFade><Features /></SectionFade>

        {/* 4. Demo ARIA + simulación de chat juntos */}
        <SectionFade>
          <Suspense fallback={<div className="py-20" />}>
            <DemoCall />
          </Suspense>
        </SectionFade>
        <SectionFade>
          <Suspense fallback={<div className="py-20" />}>
            <CallSimulator />
          </Suspense>
        </SectionFade>

        {/* 5. ROI — beneficio claro, por qué mejor que alternativas */}
        <SectionFade>
          <Suspense fallback={<div className="py-20" />}>
            <ROICalculator onContact={openContact} />
          </Suspense>
        </SectionFade>

        {/* 6. Datos de campaña + Resultados probados (juntos) */}
        <SectionFade>
          <Suspense fallback={<div className="py-20" />}>
            <CampaignResults />
          </Suspense>
        </SectionFade>
        <SectionFade>
          <Suspense fallback={<div className="py-20" />}>
            <CallPlayer />
          </Suspense>
        </SectionFade>
        <SectionFade>
          <Suspense fallback={<div className="py-20" />}>
            <Stats />
          </Suspense>
        </SectionFade>

        {/* 7. Logos clientes */}
        <SectionFade><LogoMarquee /></SectionFade>

        {/* 8. Conócenos */}
        <SectionFade><About /></SectionFade>

        {/* 9. Social proof + Testimonios (cierre) */}
        <SectionFade><SocialProof /></SectionFade>
        <SectionFade>
          <Suspense fallback={<div className="py-20" />}>
            <Testimonial />
          </Suspense>
        </SectionFade>

        {/* 10. FAQ + CTA final */}
        <SectionFade><FAQ /></SectionFade>
        <SectionFade><CTA onContact={openContact} /></SectionFade>

        <Footer />
        <FOMONotifications />
        <LiveViewers />
      </div>
    </LiveMetricsProvider>
  );
};

export default Index;
