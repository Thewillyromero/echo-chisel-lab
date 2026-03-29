import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, TrendingDown, TrendingUp, PhoneOff, Phone,
  Euro, ArrowRight, Sparkles, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ── Sector presets ── */
const sectors = [
  {
    id: "salud",
    label: "Clínica / Salud",
    defaults: { callsPerDay: 20, missedPct: 25, clientValue: 150, isRecurring: true, conversionPct: 40 },
  },
  {
    id: "dental",
    label: "Clínica dental",
    defaults: { callsPerDay: 15, missedPct: 30, clientValue: 400, isRecurring: false, conversionPct: 35 },
  },
  {
    id: "legal",
    label: "Despacho legal",
    defaults: { callsPerDay: 10, missedPct: 35, clientValue: 1500, isRecurring: false, conversionPct: 20 },
  },
  {
    id: "inmobiliaria",
    label: "Inmobiliaria",
    defaults: { callsPerDay: 25, missedPct: 40, clientValue: 3000, isRecurring: false, conversionPct: 10 },
  },
  {
    id: "instalaciones",
    label: "Instalaciones / Energía solar",
    defaults: { callsPerDay: 12, missedPct: 30, clientValue: 10000, isRecurring: false, conversionPct: 8 },
  },
  {
    id: "estetica",
    label: "Clínica estética",
    defaults: { callsPerDay: 18, missedPct: 25, clientValue: 800, isRecurring: false, conversionPct: 25 },
  },
  {
    id: "educacion",
    label: "Academia / Educación",
    defaults: { callsPerDay: 15, missedPct: 20, clientValue: 200, isRecurring: true, conversionPct: 45 },
  },
  {
    id: "hosteleria",
    label: "Restaurante / Hostelería",
    defaults: { callsPerDay: 30, missedPct: 20, clientValue: 50, isRecurring: true, conversionPct: 70 },
  },
  {
    id: "seguros",
    label: "Seguros",
    defaults: { callsPerDay: 20, missedPct: 30, clientValue: 1200, isRecurring: false, conversionPct: 12 },
  },
  {
    id: "otro",
    label: "Otro sector",
    defaults: { callsPerDay: 15, missedPct: 25, clientValue: 300, isRecurring: false, conversionPct: 20 },
  },
];

/* ── Number Input with label ── */
const NumberField = ({
  label,
  value,
  onChange,
  suffix,
  icon: Icon,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix: string;
  icon: React.ElementType;
  min?: number;
  max?: number;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs text-muted-foreground/60 font-medium flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </label>
    <div className="relative">
      <Input
        type="number"
        value={value}
        onChange={(e) => {
          let v = Number(e.target.value);
          if (min !== undefined && v < min) v = min;
          if (max !== undefined && v > max) v = max;
          onChange(v);
        }}
        min={min}
        max={max}
        className="bg-secondary/30 border-border/25 h-11 text-base font-display font-bold text-foreground rounded-xl pr-16 focus:border-primary/40 focus:ring-primary/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/40 pointer-events-none">
        {suffix}
      </span>
    </div>
  </div>
);

/* ── Result card ── */
const ResultCard = ({
  label,
  value,
  prefix,
  color,
  large,
}: {
  label: string;
  value: number;
  prefix?: string;
  color: string;
  large?: boolean;
}) => (
  <div className={`text-center ${large ? "bg-card/50 rounded-xl p-4 border border-border/15" : ""}`}>
    <p className="text-[10px] text-muted-foreground/40 uppercase tracking-wider mb-0.5">{label}</p>
    <p className={`font-display font-extrabold text-${color} ${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
      {prefix}{Math.round(value).toLocaleString("es-ES")}
    </p>
  </div>
);

/* ── Main ── */
const ROICalculator = ({ onContact }: { onContact?: () => void }) => {
  const [selectedSector, setSelectedSector] = useState("otro");
  const [sectorOpen, setSectorOpen] = useState(false);
  const [inputs, setInputs] = useState({
    callsPerDay: 15,
    missedPct: 25,
    clientValue: 300,
    isRecurring: false,
    conversionPct: 20,
    receptionistCost: 1500,
  });

  const update = (key: string, value: number | boolean) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const selectSector = (id: string) => {
    const sector = sectors.find((s) => s.id === id);
    if (sector) {
      setSelectedSector(id);
      setInputs((prev) => ({ ...prev, ...sector.defaults }));
    }
    setSectorOpen(false);
  };

  const currentSector = sectors.find((s) => s.id === selectedSector);

  const roi = useMemo(() => {
    const workDays = 22;
    const callsMonth = inputs.callsPerDay * workDays;
    const missedMonth = Math.round(callsMonth * (inputs.missedPct / 100));

    // Not every missed call = lost sale. Apply conversion rate.
    const potentialClients = Math.round(missedMonth * (inputs.conversionPct / 100));
    const revenueLost = potentialClients * inputs.clientValue;

    // CALLA cost at €0.25/min, avg 2.5 min/call, ALL calls answered
    const avgCallMin = 2.5;
    const callaMinuteCost = callsMonth * avgCallMin * 0.25;

    // Savings
    const monthlySaving = revenueLost + inputs.receptionistCost - callaMinuteCost;
    const annualSaving = monthlySaving * 12;
    const roiMultiple = callaMinuteCost > 0 ? Math.round(monthlySaving / callaMinuteCost) : 0;

    return {
      callsMonth,
      missedMonth,
      potentialClients,
      revenueLost,
      callaMinuteCost: Math.round(callaMinuteCost),
      monthlySaving: Math.round(monthlySaving),
      annualSaving: Math.round(annualSaving),
      roiMultiple,
    };
  }, [inputs]);

  return (
    <section id="calculadora" className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-emerald/[0.03] blur-[180px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-brand-emerald/[0.08] border border-brand-emerald/20 rounded-full px-4 py-1.5 mb-6">
            <Calculator className="w-3.5 h-3.5 text-brand-emerald" />
            <span className="text-xs text-brand-emerald font-display font-semibold tracking-wide">
              Calculadora de ROI
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-5 tracking-tight leading-[1.1]">
            Calcula tu{" "}
            <span className="text-gradient-warm">ahorro real</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Introduce los datos de tu negocio. Sin trampas, con números reales.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left: Inputs (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-border/25 bg-card/35 p-5 sm:p-6 md:p-8 space-y-5">
              {/* Sector selector */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground/60 font-medium">
                  ¿En qué sector trabajas?
                </label>
                <div className="relative">
                  <button
                    onClick={() => setSectorOpen(!sectorOpen)}
                    className="w-full h-11 bg-secondary/30 border border-border/25 rounded-xl px-4 text-left text-sm font-medium text-foreground flex items-center justify-between hover:border-border/40 transition-colors"
                  >
                    {currentSector?.label || "Seleccionar sector"}
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${sectorOpen ? "rotate-180" : ""}`} />
                  </button>
                  {sectorOpen && (
                    <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border/30 rounded-xl shadow-2xl z-20 max-h-64 overflow-y-auto">
                      {sectors.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => selectSector(s.id)}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary/50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                            selectedSector === s.id ? "text-primary font-semibold bg-primary/5" : "text-foreground/80"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Input grid */}
              <div className="grid grid-cols-2 gap-4">
                <NumberField
                  label="Llamadas al día"
                  value={inputs.callsPerDay}
                  onChange={(v) => update("callsPerDay", v)}
                  suffix="llamadas"
                  icon={Phone}
                  min={1}
                  max={500}
                />
                <NumberField
                  label="% que no contestas"
                  value={inputs.missedPct}
                  onChange={(v) => update("missedPct", v)}
                  suffix="%"
                  icon={PhoneOff}
                  min={0}
                  max={100}
                />
              </div>

              {/* Client value + type toggle */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <NumberField
                    label="Valor de un cliente"
                    value={inputs.clientValue}
                    onChange={(v) => update("clientValue", v)}
                    suffix="€"
                    icon={Euro}
                    min={10}
                    max={100000}
                  />
                  <NumberField
                    label="% llamadas que convierten"
                    value={inputs.conversionPct}
                    onChange={(v) => update("conversionPct", v)}
                    suffix="%"
                    icon={TrendingUp}
                    min={1}
                    max={100}
                  />
                </div>

                {/* Recurring toggle */}
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <button
                    onClick={() => update("isRecurring", !inputs.isRecurring)}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-300 shrink-0 ${
                      inputs.isRecurring ? "bg-brand-emerald" : "bg-secondary/60"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform duration-300 ${
                        inputs.isRecurring ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                  <span className="text-xs text-muted-foreground/60">
                    {inputs.isRecurring
                      ? "Mis clientes pagan mensualmente"
                      : "Mis clientes pagan una sola vez"}
                  </span>
                </label>
              </div>

              <NumberField
                label="Coste actual de personal (recepcionista, telefonista...)"
                value={inputs.receptionistCost}
                onChange={(v) => update("receptionistCost", v)}
                suffix="€/mes"
                icon={Euro}
                min={0}
                max={10000}
              />

              <p className="text-[10px] text-muted-foreground/25 leading-relaxed">
                Cálculo basado en 22 días laborables, 2,5 min de media por llamada, y tarifa CALLA de €0,25/min.
                {inputs.isRecurring
                  ? " Para clientes recurrentes se calcula el valor mensual."
                  : " Para ventas puntuales se aplica la tasa de conversión sobre llamadas perdidas."}
              </p>
            </div>
          </motion.div>

          {/* Right: Results (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            {/* What you lose */}
            <div className="rounded-2xl border border-brand-rose/15 bg-brand-rose/[0.02] p-5">
              <p className="text-[10px] text-brand-rose/50 uppercase tracking-wider font-semibold mb-4 flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5" />
                Sin CALLA
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-muted-foreground/60">Llamadas perdidas</span>
                  <span className="text-sm font-display font-bold text-foreground">{roi.missedMonth}/mes</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-muted-foreground/60">Clientes que no cierras</span>
                  <span className="text-sm font-display font-bold text-foreground">{roi.potentialClients}/mes</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-muted-foreground/60">Ingresos perdidos</span>
                  <span className="text-sm font-display font-bold text-brand-rose">€{roi.revenueLost.toLocaleString("es-ES")}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-muted-foreground/60">+ Coste personal</span>
                  <span className="text-sm font-display font-bold text-brand-rose">€{inputs.receptionistCost.toLocaleString("es-ES")}</span>
                </div>
              </div>
              <div className="border-t border-brand-rose/10 pt-3">
                <ResultCard
                  label="Pierdes cada mes"
                  value={roi.revenueLost + inputs.receptionistCost}
                  prefix="€"
                  color="brand-rose"
                  large
                />
              </div>
            </div>

            {/* With CALLA */}
            <div className="rounded-2xl border border-brand-emerald/15 bg-brand-emerald/[0.02] p-5">
              <p className="text-[10px] text-brand-emerald/50 uppercase tracking-wider font-semibold mb-4 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Con CALLA
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-muted-foreground/60">Llamadas perdidas</span>
                  <span className="text-sm font-display font-bold text-brand-emerald">0</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-muted-foreground/60">Coste CALLA</span>
                  <span className="text-sm font-display font-bold text-foreground">€{roi.callaMinuteCost.toLocaleString("es-ES")}/mes</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-muted-foreground/60">Ahorro anual</span>
                  <span className="text-sm font-display font-bold text-brand-emerald">€{roi.annualSaving.toLocaleString("es-ES")}</span>
                </div>
              </div>
              <div className="border-t border-brand-emerald/10 pt-3 flex items-center justify-between">
                <ResultCard
                  label="Ahorras al mes"
                  value={roi.monthlySaving}
                  prefix="€"
                  color="brand-emerald"
                  large
                />
                <div className="text-center px-3">
                  <p className="text-[10px] text-muted-foreground/30 uppercase tracking-wider mb-0.5">ROI</p>
                  <p className="text-3xl font-display font-extrabold text-foreground">
                    {roi.roiMultiple}x
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="w-full rounded-xl text-sm sm:text-base h-13 font-display font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-300"
              onClick={onContact}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Reservar consulta gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-[10px] text-muted-foreground/30 text-center">
              30 min · Sin compromiso · Análisis personalizado
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
