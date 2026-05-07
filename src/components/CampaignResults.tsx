import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Phone, PhoneOutgoing, Clock, Users, BarChart3, ChevronRight } from "lucide-react";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";

const metrics = [
  { label: "Leads procesados", value: "662", icon: Users, color: "brand-teal", suffix: "" },
  { label: "Llamadas realizadas", value: "1.767", icon: PhoneOutgoing, color: "brand-lavender", suffix: "" },
  { label: "Llamadas contestadas", value: "561", icon: Phone, color: "brand-emerald", suffix: "" },
  { label: "Tasa de conexión", value: "84,7", icon: TrendingUp, color: "brand-amber", suffix: "%" },
  { label: "Tiempo medio de respuesta", value: "22", icon: Clock, color: "brand-rose", suffix: "s" },
  { label: "Llamadas transferidas", value: "3", icon: BarChart3, color: "primary", suffix: "" },
];

const dashboardCards = [
  {
    title: "Leads Overview",
    items: [
      { label: "Leads con actividad", value: "662", change: "+100%" },
      { label: "Lead Connect Rate", value: "84,7%", change: "+100%" },
      { label: "Leads llamados", value: "662", change: "+100%" },
      { label: "Leads contestados", value: "561", change: "+100%" },
    ],
  },
  {
    title: "Distribución de llamadas",
    items: [
      { label: "Mejor hora", value: "11 AM", change: "" },
      { label: "Mejor día", value: "Miércoles", change: "" },
      { label: "Media por hora", value: "3,3", change: "llamadas" },
      { label: "Pico diario", value: "490", change: "leads" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const CampaignResults = () => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section id="resultados" className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden">
      {/* Background character — BYTE (left) */}
      <div className="absolute -left-10 top-1/3 pointer-events-none select-none">
        <img src={agentAnalytics} alt="" className="w-[150px] sm:w-[250px] md:w-[350px] lg:w-[500px] opacity-[0.06] sm:opacity-[0.08] lg:opacity-[0.12] -rotate-6" loading="lazy" />
      </div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/10 to-transparent" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-brand-amber/[0.03] blur-[180px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-brand-amber/[0.08] border border-brand-amber/20 rounded-full px-4 py-1.5 mb-6">
            <BarChart3 className="w-3.5 h-3.5 text-brand-amber" />
            <span className="text-xs text-brand-amber font-display font-semibold tracking-wide">
              Resultados reales
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight leading-[1.1] text-glow">
            Datos de una{" "}
            <span className="text-gradient-warm text-glow-warm">campaña real</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Sin capturas retocadas ni promesas vacías. Estos son los números reales de una campaña de 662 leads ejecutada con CALLA.
          </p>
        </motion.div>

        {/* KPI strip */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-card/40 border border-border/25 rounded-2xl p-4 text-center group hover:border-border/40 transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: `0 0 0 0 hsl(var(--${m.color}) / 0)`,
              }}
              whileHover={{
                boxShadow: `0 0 30px hsl(var(--${m.color}) / 0.06)`,
              }}
            >
              <m.icon className={`w-4 h-4 text-${m.color} mx-auto mb-2 opacity-60`} />
              <div className="text-2xl md:text-3xl font-display font-extrabold text-foreground leading-none mb-1">
                {m.value}
                <span className={`text-${m.color} text-lg`}>{m.suffix}</span>
              </div>
              <p className="text-[11px] text-muted-foreground/60 leading-tight">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative rounded-3xl border border-border/25 overflow-hidden">
            {/* Dashboard top bar */}
            <div className="bg-card/60 border-b border-border/20 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img loading="lazy" src={agentAnalytics} alt="BYTE" className="w-8 h-8 object-contain" width={512} height={512} />
                <div>
                  <span className="text-sm font-display font-bold text-brand-amber">BYTE</span>
                  <span className="text-xs text-muted-foreground ml-2">Campaign Analytics</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                <span className="bg-secondary/60 px-3 py-1 rounded-full border border-border/20">
                  27 Feb — 29 Mar, 2026
                </span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="bg-gradient-to-br from-card/40 via-background/60 to-card/30 p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-5">
                {dashboardCards.map((card, ci) => (
                  <div
                    key={ci}
                    className={`rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                      activeCard === ci
                        ? "border-brand-amber/25 bg-brand-amber/[0.03]"
                        : "border-border/20 bg-card/30 hover:border-border/30"
                    }`}
                    onClick={() => setActiveCard(ci)}
                  >
                    <h4 className="font-display font-bold text-sm text-foreground mb-4 flex items-center justify-between">
                      {card.title}
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeCard === ci ? "rotate-90 text-brand-amber" : "text-muted-foreground/30"}`} />
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {card.items.map((item, ii) => (
                        <div key={ii} className="space-y-0.5">
                          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">{item.label}</p>
                          <p className="text-lg font-display font-bold text-foreground">{item.value}</p>
                          {item.change && (
                            <p className="text-[10px] text-emerald-400">{item.change}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Donut chart mockup */}
              <div className="mt-5 rounded-2xl border border-border/20 bg-card/30 p-5 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-32 h-32 shrink-0">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="48" fill="none" stroke="hsl(var(--border))" strokeWidth="12" opacity="0.15" />
                    <circle cx="60" cy="60" r="48" fill="none" stroke="hsl(var(--brand-teal))" strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={`${0.847 * 2 * Math.PI * 48} ${2 * Math.PI * 48}`} />
                    <circle cx="60" cy="60" r="48" fill="none" stroke="hsl(var(--brand-lavender))" strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={`${0.153 * 2 * Math.PI * 48} ${2 * Math.PI * 48}`}
                      strokeDashoffset={`${-0.847 * 2 * Math.PI * 48}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-display font-extrabold text-foreground">84,7%</span>
                    <span className="text-[9px] text-muted-foreground">conectados</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-2 h-2 rounded-full bg-brand-teal mx-auto mb-1" />
                    <p className="text-lg font-display font-bold text-brand-teal">561</p>
                    <p className="text-[10px] text-muted-foreground">Contestadas</p>
                    <p className="text-[10px] text-muted-foreground/40">84,7%</p>
                  </div>
                  <div>
                    <div className="w-2 h-2 rounded-full bg-brand-lavender mx-auto mb-1" />
                    <p className="text-lg font-display font-bold text-brand-lavender">101</p>
                    <p className="text-[10px] text-muted-foreground">No contestadas</p>
                    <p className="text-[10px] text-muted-foreground/40">15,3%</p>
                  </div>
                  <div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30 mx-auto mb-1" />
                    <p className="text-lg font-display font-bold text-muted-foreground/60">0</p>
                    <p className="text-[10px] text-muted-foreground">Sin llamar</p>
                    <p className="text-[10px] text-muted-foreground/40">0%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignResults;
