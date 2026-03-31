import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckCircle, ArrowRight, Target, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import { sectors } from "@/data/sectors";
import { FadeIn } from "@/hooks/useFadeInOnScroll";

const SectorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const sector = sectors.find((s) => s.slug === slug);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!sector) return <Navigate to="/" replace />;

  const Icon = sector.icon;

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="container mx-auto relative z-10 max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <Icon className="h-4 w-4 text-primary" />
              <span className="text-xs font-display font-medium text-primary/80 uppercase tracking-wider">
                {sector.name}
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-6 tracking-tight">
              {sector.heroTitle}{" "}
              <span className="text-gradient">{sector.heroHighlight}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {sector.description}
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <Button size="lg" className="glow-box text-base px-8" onClick={() => setContactOpen(true)}>
              {sector.cta} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-6">
            {sector.stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="glass rounded-2xl p-6 text-center hover:glow-box transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0}>
              <div className="glass-warm rounded-2xl p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="h-5 w-5 text-brand-rose" />
                  <h2 className="font-display font-bold text-lg text-foreground">
                    Problemas que resolvemos
                  </h2>
                </div>
                <ul className="space-y-4">
                  {sector.painPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-rose/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-brand-rose">{i + 1}</span>
                      </span>
                      <span className="text-sm text-foreground/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="glass rounded-2xl p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="h-5 w-5 text-brand-emerald" />
                  <h2 className="font-display font-bold text-lg text-foreground">
                    Nuestra solución
                  </h2>
                </div>
                <ul className="space-y-4">
                  {sector.solutions.map((solution, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="glass-warm rounded-2xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/[0.05] blur-[80px]" />
              <div className="relative z-10">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-4" />
                <h2 className="text-2xl md:text-4xl font-display font-extrabold mb-4 tracking-tight">
                  ¿Listo para crecer en{" "}
                  <span className="text-gradient">{sector.name.toLowerCase()}</span>?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Agenda una consulta gratuita y te mostramos cómo podemos generar resultados reales para tu negocio en {sector.name.toLowerCase()}.
                </p>
                <Button size="lg" className="glow-box text-base px-8" onClick={() => setContactOpen(true)}>
                  {sector.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source={`sector-${sector.slug}`} />
    </div>
  );
};

export default SectorPage;
