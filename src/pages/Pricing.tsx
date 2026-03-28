import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, Crown, Building2 } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    icon: Zap,
    price: "297",
    period: "/mes",
    description: "Ideal para negocios que quieren automatizar sus llamadas entrantes.",
    accent: "brand-teal",
    accentClass: "text-brand-teal",
    glowClass: "hover:shadow-[0_0_40px_hsl(190_55%_58%/0.15)]",
    badge: null,
    features: [
      "1 agente IA (Inbound)",
      "Hasta 500 llamadas/mes",
      "Agenda de citas automática",
      "Horario personalizado",
      "Transcripción de llamadas",
      "Soporte por email",
      "Panel de métricas básico",
    ],
    cta: "Empezar ahora",
    popular: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: "697",
    period: "/mes",
    description: "Para equipos que necesitan inbound + outbound y analítica avanzada.",
    accent: "brand-lavender",
    accentClass: "text-brand-lavender",
    glowClass: "shadow-[0_0_50px_hsl(260_45%_65%/0.12)] hover:shadow-[0_0_60px_hsl(260_45%_65%/0.2)]",
    badge: "Más popular",
    features: [
      "3 agentes IA (Inbound + Outbound)",
      "Hasta 2.000 llamadas/mes",
      "Campañas outbound automatizadas",
      "CRM integrado",
      "Analítica avanzada con BYTE",
      "Soporte prioritario",
      "Personalización de voz y tono",
      "Webhook e integraciones API",
    ],
    cta: "Elegir Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Custom",
    period: "",
    description: "Solución a medida para grandes volúmenes y necesidades específicas.",
    accent: "brand-amber",
    accentClass: "text-brand-amber",
    glowClass: "hover:shadow-[0_0_40px_hsl(35_65%_62%/0.15)]",
    badge: null,
    features: [
      "Agentes IA ilimitados",
      "Llamadas ilimitadas",
      "Squad completo personalizado",
      "Onboarding dedicado",
      "SLA garantizado 99.9%",
      "Manager de cuenta dedicado",
      "Integraciones custom",
      "Multi-idioma y multi-sede",
      "Facturación personalizada",
    ],
    cta: "Contactar",
    popular: false,
  },
];

const faqs = [
  {
    q: "¿Puedo cambiar de plan en cualquier momento?",
    a: "Sí, puedes subir o bajar de plan cuando quieras. Los cambios se aplican en el siguiente ciclo de facturación.",
  },
  {
    q: "¿Qué pasa si supero el límite de llamadas?",
    a: "Te avisamos antes de llegar al límite. Las llamadas extra se facturan a tarifa reducida, sin cortes de servicio.",
  },
  {
    q: "¿Hay periodo de permanencia?",
    a: "No. Todos los planes son mensuales sin permanencia. Cancela cuando quieras.",
  },
  {
    q: "¿Cuánto tarda el setup?",
    a: "Menos de 30 minutos. Nuestro equipo configura todo por ti y te entrega tu agente listo para funcionar.",
  },
];

const Pricing = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-lavender/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-brand-teal/[0.04] blur-[100px]" />

        <div className="container mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-primary/80 font-display text-sm tracking-[0.2em] uppercase mb-3 font-medium">
              Planes y precios
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight">
              Elige tu <span className="text-gradient">plan perfecto</span>
            </h1>
            <p className="text-muted-foreground text-lg font-light">
              Sin permanencia. Sin sorpresas. Escala cuando lo necesites.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm font-medium transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
                Mensual
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? "bg-primary" : "bg-secondary"}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-foreground transition-transform duration-300 ${annual ? "translate-x-7" : "translate-x-0.5"}`} />
              </button>
              <span className={`text-sm font-medium transition-colors ${annual ? "text-foreground" : "text-muted-foreground"}`}>
                Anual
              </span>
              {annual && (
                <span className="text-xs font-bold text-brand-emerald bg-brand-emerald/10 px-2 py-0.5 rounded-full">
                  -20%
                </span>
              )}
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
            {tiers.map((tier) => {
              const displayPrice = tier.price === "Custom"
                ? "Custom"
                : annual
                  ? Math.round(parseInt(tier.price) * 0.8).toString()
                  : tier.price;

              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-[1px] transition-all duration-500 ${tier.glowClass} ${
                    tier.popular
                      ? "md:-mt-4 md:mb-4"
                      : ""
                  }`}
                >
                  {/* Gradient border for popular */}
                  <div className={`rounded-2xl p-6 lg:p-8 h-full ${
                    tier.popular
                      ? "glass-warm border border-brand-lavender/20"
                      : "glass border-border/20"
                  }`}>
                    {tier.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-brand-lavender to-brand-rose text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                          {tier.badge}
                        </span>
                      </div>
                    )}

                    {/* Icon + Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-${tier.accent}/10 flex items-center justify-center`}>
                        <tier.icon className={`h-5 w-5 ${tier.accentClass}`} />
                      </div>
                      <h3 className="font-display font-bold text-xl text-foreground">{tier.name}</h3>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      {displayPrice === "Custom" ? (
                        <span className="text-4xl font-display font-extrabold text-gradient">A medida</span>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl lg:text-5xl font-display font-extrabold text-foreground">
                            €{displayPrice}
                          </span>
                          <span className="text-muted-foreground text-sm">{tier.period}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 font-light leading-relaxed">
                      {tier.description}
                    </p>

                    {/* CTA */}
                    <Button
                      size="lg"
                      className={`w-full mb-6 text-base ${tier.popular ? "glow-box" : ""}`}
                      variant={tier.popular ? "default" : "outline"}
                      onClick={() => setContactOpen(true)}
                    >
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    {/* Features */}
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tier.accentClass}`} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-center mb-10 tracking-tight">
              Preguntas <span className="text-gradient">frecuentes</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="glass rounded-xl group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-display font-semibold text-foreground hover:text-primary transition-colors">
                    {faq.q}
                    <span className="text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-xl">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground font-light leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="pricing" />
    </div>
  );
};

export default Pricing;
