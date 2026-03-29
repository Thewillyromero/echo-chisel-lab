import { useState } from "react";
import { motion } from "framer-motion";
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
    hsl: "190 60% 55%",
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
    cta: "Reservar consulta gratuita",
    popular: false,
    paymentLinks: {
      monthly: "https://buy.stripe.com/28E5kD9ZR0Mwf1fa2yfEk00",
      annual: "https://buy.stripe.com/7sY7sL1tl52M7yN3EafEk02",
    },
  },
  {
    name: "Pro",
    icon: Crown,
    price: "697",
    period: "/mes",
    description: "Para equipos que necesitan inbound + outbound y analítica avanzada.",
    accent: "brand-lavender",
    accentClass: "text-brand-lavender",
    hsl: "260 50% 65%",
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
    cta: "Reservar consulta gratuita",
    popular: true,
    paymentLinks: {
      monthly: "https://buy.stripe.com/3cI7sL1tlfHq6uJ2A6fEk01",
      annual: "https://buy.stripe.com/28E5kD2xpcve7yN1w2fEk03",
    },
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Custom",
    period: "",
    description: "Solución a medida para grandes volúmenes y necesidades específicas.",
    accent: "brand-amber",
    accentClass: "text-brand-amber",
    hsl: "35 70% 58%",
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
    cta: "Hablar con el equipo",
    popular: false,
    paymentLinks: null,
  },
];

const faqs = [
  { q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí, puedes subir o bajar de plan cuando quieras. Los cambios se aplican en el siguiente ciclo de facturación." },
  { q: "¿Qué pasa si supero el límite de llamadas?", a: "Te avisamos antes de llegar al límite. Las llamadas extra se facturan a tarifa reducida, sin cortes de servicio." },
  { q: "¿Hay periodo de permanencia?", a: "No. Todos los planes son mensuales sin permanencia. Cancela cuando quieras." },
  { q: "¿Cuánto tarda el setup?", a: "Menos de 30 minutos. Nuestro equipo configura todo por ti y te entrega tu agente listo para funcionar." },
];

const cardVariants = (i: number) => ({
  hidden: { opacity: 0, y: 40, x: i === 0 ? -30 : i === 2 ? 30 : 0 },
  visible: {
    opacity: 1, y: 0, x: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  },
});

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/30-min-meeting333-5466de86-217d-4157-a735-59dcb4fcc11f-444718d0-b968-4988-a435-8a8529fcab09";

const Pricing = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-lavender/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-brand-teal/[0.04] blur-[100px]" />

        <div className="container mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
          >
            <p className="text-primary/80 font-display text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-medium">
              Planes y precios
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight leading-[1.1]">
              Elige tu <span className="text-gradient">plan perfecto</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg font-light">
              Sin permanencia. Sin sorpresas. Escala cuando lo necesites.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm font-medium transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Mensual</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? "bg-primary" : "bg-secondary"}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-foreground transition-transform duration-300 ${annual ? "translate-x-7" : "translate-x-0"}`} />
              </button>
              <span className={`text-sm font-medium transition-colors ${annual ? "text-foreground" : "text-muted-foreground"}`}>Anual</span>
              {annual && (
                <span className="text-xs font-bold text-brand-emerald bg-brand-emerald/10 px-2 py-0.5 rounded-full">-20%</span>
              )}
            </div>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto items-start">
            {tiers.map((tier, i) => {
              const displayPrice = tier.price === "Custom" ? "Custom" : annual ? Math.round(parseInt(tier.price) * 0.8).toString() : tier.price;

              return (
                <motion.div
                  key={tier.name}
                  variants={cardVariants(i)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-60px" }}
                  className={`relative transition-all duration-500 ${tier.popular ? "md:-mt-4 md:mb-4" : ""}`}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  <div
                    className={`rounded-2xl p-5 sm:p-6 lg:p-8 h-full transition-all duration-500 ${
                      tier.popular
                        ? "glass-warm border border-brand-lavender/20"
                        : "glass border-border/20 hover:border-border/30"
                    }`}
                    style={{
                      boxShadow: tier.popular
                        ? `0 0 50px hsl(${tier.hsl} / 0.12)`
                        : undefined,
                    }}
                  >
                    {tier.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="bg-gradient-to-r from-brand-lavender to-brand-rose text-primary-foreground text-[11px] font-bold px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
                          {tier.badge}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-${tier.accent}/10 flex items-center justify-center shrink-0`}>
                        <tier.icon className={`h-5 w-5 ${tier.accentClass}`} />
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">{tier.name}</h3>
                    </div>

                    <div className="mb-4">
                      {displayPrice === "Custom" ? (
                        <span className="text-3xl sm:text-4xl font-display font-extrabold text-gradient">A medida</span>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-foreground">€{displayPrice}</span>
                          <span className="text-muted-foreground text-sm">{tier.period}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-5 sm:mb-6 font-light leading-relaxed">{tier.description}</p>

                    <Button
                      size="lg"
                      className={`w-full mb-5 sm:mb-6 text-sm sm:text-base rounded-xl ${tier.popular ? "glow-box" : ""}`}
                      variant={tier.popular ? "default" : "outline"}
                      onClick={() => window.open(BOOKING_URL, "_blank")}
                    >
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <ul className="space-y-2.5 sm:space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 sm:gap-3 text-sm">
                          <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tier.accentClass}`} />
                          <span className="text-muted-foreground text-[13px] sm:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ */}
          <div className="mt-16 md:mt-24 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-display font-extrabold text-center mb-8 md:mb-10 tracking-tight"
            >
              Preguntas <span className="text-gradient">frecuentes</span>
            </motion.h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, i) => (
                <motion.details
                  key={faq.q}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="glass rounded-xl group"
                >
                  <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none font-display font-semibold text-foreground hover:text-primary transition-colors text-sm sm:text-base">
                    {faq.q}
                    <span className="text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-xl ml-4 shrink-0">+</span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-muted-foreground font-light leading-relaxed">
                    {faq.a}
                  </div>
                </motion.details>
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
