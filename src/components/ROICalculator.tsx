import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, TrendingDown, TrendingUp, PhoneOff, Phone,
  Users, Euro, ArrowRight, Sparkles, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Slider Component ── */
const SliderInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
  icon: React.ElementType;
  color: string;
}) => {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-foreground/80 font-medium flex items-center gap-2">
          <Icon className={`w-4 h-4 text-${color}`} />
          {label}
        </label>
        <span className="text-lg font-display font-bold text-foreground tabular-nums">
          {value.toLocaleString("es-ES")}
          <span className="text-sm text-muted-foreground font-normal ml-1">{suffix}</span>
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-secondary/60 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground
            [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background"
          style={{
            background: `linear-gradient(to right, hsl(var(--${color})) 0%, hsl(var(--${color})) ${pct}%, hsl(var(--secondary) / 0.6) ${pct}%, hsl(var(--secondary) / 0.6) 100%)`,
          }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-muted-foreground/30">{min}</span>
          <span className="text-[10px] text-muted-foreground/30">{max}</span>
        </div>
      </div>
    </div>
  );
};

/* ── Metric Card ── */
const MetricCard = ({
  label,
  value,
  prefix,
  suffix,
  color,
  negative,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  color: string;
  negative?: boolean;
}) => (
  <div className="bg-card/40 border border-border/20 rounded-xl p-4 text-center">
    <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">{label}</p>
    <p className={`text-xl sm:text-2xl font-display font-extrabold text-${color}`}>
      {negative && "-"}
      {prefix}
      {Math.abs(value).toLocaleString("es-ES")}
      {suffix}
    </p>
  </div>
);

/* ── Main Component ── */
const ROICalculator = ({ onContact }: { onContact?: () => void }) => {
  const [inputs, setInputs] = useState({
    callsPerDay: 15,
    missedPct: 30,
    avgClientValue: 300,
    receptionistCost: 1500,
    wantsOutbound: false,
    leadsPerMonth: 200,
    currentCostPerLead: 5,
  });

  const update = (key: string, value: number | boolean) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const roi = useMemo(() => {
    const workDays = 22;

    /* Inbound */
    const callsMonth = inputs.callsPerDay * workDays;
    const missedMonth = Math.round(callsMonth * (inputs.missedPct / 100));
    const revenueLost = missedMonth * inputs.avgClientValue;
    const avgCallMinutes = 2.5;
    const callaInboundCost = Math.round(callsMonth * avgCallMinutes * 0.25);

    /* Outbound */
    const outboundCalls = inputs.wantsOutbound ? inputs.leadsPerMonth : 0;
    const outboundMinutes = outboundCalls * 1.5;
    const callaOutboundCost = Math.round(outboundMinutes * 0.25);
    const currentOutboundCost = inputs.wantsOutbound
      ? inputs.leadsPerMonth * inputs.currentCostPerLead
      : 0;

    /* Totals */
    const currentTotalCost = inputs.receptionistCost + currentOutboundCost;
    const callaTotal = callaInboundCost + callaOutboundCost;
    const monthlySaving = currentTotalCost + revenueLost - callaTotal;
    const annualSaving = monthlySaving * 12;
    const roiMultiple = callaTotal > 0 ? Math.round(monthlySaving / callaTotal) : 0;

    return {
      callsMonth,
      missedMonth,
      revenueLost,
      callaInboundCost,
      callaOutboundCost,
      callaTotal,
      currentTotalCost,
      currentOutboundCost,
      monthlySaving,
      annualSaving,
      roiMultiple,
    };
  }, [inputs]);

  return (
    <section id="calculadora" className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-emerald/[0.03] blur-[180px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-brand-emerald/[0.08] border border-brand-emerald/20 rounded-full px-4 py-1.5 mb-6">
            <Calculator className="w-3.5 h-3.5 text-brand-emerald" />
            <span className="text-xs text-brand-emerald font-display font-semibold tracking-wide">
              Calculadora de ROI
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-5 tracking-tight leading-[1.1]">
            ¿Cuánto dinero estás{" "}
            <span className="text-gradient-warm">dejando en la mesa</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Introduce los datos de tu negocio y calcula al instante cuánto pierdes en llamadas sin contestar y cuánto ahorrarías con CALLA.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left: Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-border/25 bg-card/35 p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">
                  Datos de tu negocio
                </h3>
              </div>

              <SliderInput
                label="Llamadas que recibes al día"
                value={inputs.callsPerDay}
                onChange={(v) => update("callsPerDay", v)}
                min={5}
                max={100}
                step={1}
                suffix="llamadas/día"
                icon={Phone}
                color="brand-teal"
              />

              <SliderInput
                label="Llamadas que no contestas"
                value={inputs.missedPct}
                onChange={(v) => update("missedPct", v)}
                min={5}
                max={80}
                step={5}
                suffix="%"
                icon={PhoneOff}
                color="brand-rose"
              />

              <SliderInput
                label="Valor medio de un nuevo cliente"
                value={inputs.avgClientValue}
                onChange={(v) => update("avgClientValue", v)}
                min={50}
                max={2000}
                step={50}
                suffix="€"
                icon={Euro}
                color="brand-amber"
              />

              <SliderInput
                label="Coste de tu recepcionista/equipo"
                value={inputs.receptionistCost}
                onChange={(v) => update("receptionistCost", v)}
                min={0}
                max={5000}
                step={100}
                suffix="€/mes"
                icon={Users}
                color="brand-lavender"
              />

              {/* Outbound toggle */}
              <div className="pt-2 border-t border-border/20">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <button
                    onClick={() => update("wantsOutbound", !inputs.wantsOutbound)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      inputs.wantsOutbound ? "bg-brand-lavender" : "bg-secondary/60"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform duration-300 ${
                        inputs.wantsOutbound ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-foreground/80 font-medium">
                    También hago campañas de captación (outbound)
                  </span>
                </label>
              </div>

              {inputs.wantsOutbound && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 pl-2 border-l-2 border-brand-lavender/20"
                >
                  <SliderInput
                    label="Leads a contactar al mes"
                    value={inputs.leadsPerMonth}
                    onChange={(v) => update("leadsPerMonth", v)}
                    min={50}
                    max={2000}
                    step={50}
                    suffix="leads"
                    icon={Users}
                    color="brand-lavender"
                  />
                  <SliderInput
                    label="Coste actual por lead contactado"
                    value={inputs.currentCostPerLead}
                    onChange={(v) => update("currentCostPerLead", v)}
                    min={1}
                    max={30}
                    step={1}
                    suffix="€/lead"
                    icon={Euro}
                    color="brand-lavender"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {/* Dinero que pierdes */}
            <div className="rounded-2xl border border-brand-rose/20 bg-brand-rose/[0.03] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <TrendingDown className="w-5 h-5 text-brand-rose" />
                <h3 className="font-display font-bold text-lg text-foreground">
                  Lo que pierdes ahora
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <MetricCard
                  label="Llamadas perdidas/mes"
                  value={roi.missedMonth}
                  suffix=""
                  color="brand-rose"
                />
                <MetricCard
                  label="Ingresos perdidos/mes"
                  value={roi.revenueLost}
                  prefix="€"
                  color="brand-rose"
                />
                <MetricCard
                  label="Coste personal actual"
                  value={roi.currentTotalCost}
                  prefix="€"
                  suffix="/mes"
                  color="brand-rose"
                />
                <MetricCard
                  label="Pérdida total mensual"
                  value={roi.revenueLost + roi.currentTotalCost}
                  prefix="€"
                  color="brand-rose"
                />
              </div>

              <div className="bg-brand-rose/10 rounded-xl p-4 text-center">
                <p className="text-xs text-brand-rose/60 uppercase tracking-wider mb-1">
                  Estás dejando en la mesa
                </p>
                <p className="text-3xl sm:text-4xl font-display font-extrabold text-brand-rose">
                  €{(roi.revenueLost + roi.currentTotalCost).toLocaleString("es-ES")}
                  <span className="text-lg font-normal">/mes</span>
                </p>
              </div>
            </div>

            {/* Con CALLA */}
            <div className="rounded-2xl border border-brand-emerald/20 bg-brand-emerald/[0.03] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-5 h-5 text-brand-emerald" />
                <h3 className="font-display font-bold text-lg text-foreground">
                  Con CALLA
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <MetricCard
                  label="Coste CALLA inbound"
                  value={roi.callaInboundCost}
                  prefix="€"
                  suffix="/mes"
                  color="brand-emerald"
                />
                {inputs.wantsOutbound && (
                  <MetricCard
                    label="Coste CALLA outbound"
                    value={roi.callaOutboundCost}
                    prefix="€"
                    suffix="/mes"
                    color="brand-lavender"
                  />
                )}
                <MetricCard
                  label="Llamadas perdidas"
                  value={0}
                  suffix=""
                  color="brand-emerald"
                />
                <MetricCard
                  label="Ahorro mensual"
                  value={roi.monthlySaving}
                  prefix="€"
                  color="brand-emerald"
                />
              </div>

              <div className="bg-brand-emerald/10 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-brand-emerald/60 uppercase tracking-wider mb-1">
                      Ahorro anual estimado
                    </p>
                    <p className="text-3xl sm:text-4xl font-display font-extrabold text-brand-emerald">
                      €{roi.annualSaving.toLocaleString("es-ES")}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground/50 uppercase tracking-wider mb-1">ROI</p>
                    <p className="text-4xl font-display font-extrabold text-foreground">
                      {roi.roiMultiple}x
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <Button
                size="lg"
                className="w-full rounded-xl text-base h-14 font-display font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-300"
                onClick={onContact}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Quiero dejar de perder €{roi.revenueLost.toLocaleString("es-ES")}/mes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-[11px] text-muted-foreground/35 text-center mt-3">
                Consulta estratégica gratuita · 30 min · Sin compromiso
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
