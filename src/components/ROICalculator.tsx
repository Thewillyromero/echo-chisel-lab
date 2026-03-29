import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, Phone, PhoneOff, Euro, ArrowRight, Sparkles,
  ChevronDown, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ── Sector presets ── */
const sectors = [
  { id: "dental", label: "Clínica dental", clientValue: 400, clientsPerMonth: 25 },
  { id: "salud", label: "Clínica / Centro médico", clientValue: 150, clientsPerMonth: 40 },
  { id: "legal", label: "Despacho de abogados", clientValue: 1500, clientsPerMonth: 8 },
  { id: "inmobiliaria", label: "Inmobiliaria", clientValue: 3000, clientsPerMonth: 5 },
  { id: "instalaciones", label: "Instalaciones / Energía solar", clientValue: 10000, clientsPerMonth: 4 },
  { id: "estetica", label: "Clínica estética", clientValue: 800, clientsPerMonth: 15 },
  { id: "educacion", label: "Academia / Formación", clientValue: 200, clientsPerMonth: 20 },
  { id: "hosteleria", label: "Restaurante / Hotel", clientValue: 50, clientsPerMonth: 200 },
  { id: "seguros", label: "Seguros / Asesoría", clientValue: 1200, clientsPerMonth: 6 },
  { id: "taller", label: "Taller / Reparaciones", clientValue: 350, clientsPerMonth: 30 },
  { id: "otro", label: "Otro sector", clientValue: 300, clientsPerMonth: 15 },
];

/* ── Visual phone selector (10 phones, click to mark as missed) ── */
const MissedCallSelector = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-2">
    <p className="text-xs text-muted-foreground/60 font-medium">
      De cada 10 llamadas, ¿cuántas <span className="text-brand-rose font-semibold">NO contestas</span>?
    </p>
    <div className="flex items-center gap-2 sm:gap-2.5 justify-center py-2">
      {[...Array(10)].map((_, i) => {
        const isMissed = i < value;
        return (
          <button
            key={i}
            onClick={() => onChange(i + 1 === value ? i : i + 1)}
            className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isMissed
                ? "bg-brand-rose/20 border-brand-rose/40 scale-105"
                : "bg-secondary/40 border-border/20 hover:bg-secondary/60"
            } border`}
          >
            {isMissed ? (
              <PhoneOff className="w-4 h-4 text-brand-rose" />
            ) : (
              <Phone className="w-4 h-4 text-brand-emerald/60" />
            )}
          </button>
        );
      })}
    </div>
    <p className="text-center text-sm font-display font-bold text-foreground">
      {value} de cada 10
      <span className="text-muted-foreground/40 font-normal text-xs ml-1.5">
        ({value * 10}%)
      </span>
    </p>
  </div>
);

/* ── Simple number input ── */
const SimpleInput = ({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs text-muted-foreground/60 font-medium">{label}</label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/40 pointer-events-none">
          {prefix}
        </span>
      )}
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
        className={`bg-secondary/30 border-border/25 h-11 text-base font-display font-bold text-foreground rounded-xl focus:border-primary/40 focus:ring-primary/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
          prefix ? "pl-8" : ""
        } ${suffix ? "pr-20" : ""}`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/40 pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

/* ── Main ── */
const ROICalculator = ({ onContact }: { onContact?: () => void }) => {
  const [sectorId, setSectorId] = useState("otro");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [callsPerDay, setCallsPerDay] = useState(15);
  const [missedOf10, setMissedOf10] = useState(3);
  const [clientsPerMonth, setClientsPerMonth] = useState(15);
  const [clientValue, setClientValue] = useState(300);
  const [staffCost, setStaffCost] = useState(1500);

  const selectSector = (id: string) => {
    const s = sectors.find((x) => x.id === id);
    if (s) {
      setSectorId(id);
      setClientValue(s.clientValue);
      setClientsPerMonth(s.clientsPerMonth);
    }
    setDropdownOpen(false);
  };

  const currentSector = sectors.find((s) => s.id === sectorId);

  const math = useMemo(() => {
    const workDays = 22;
    const callsMonth = callsPerDay * workDays;
    const missedPct = missedOf10 / 10;
    const missedMonth = Math.round(callsMonth * missedPct);
    const answeredMonth = callsMonth - missedMonth;

    // How many of answered calls become clients?
    // They told us they close X clients/month from the calls they DO answer
    const conversionRate = answeredMonth > 0 ? clientsPerMonth / answeredMonth : 0;

    // Apply same rate to missed calls = lost clients
    const lostClients = Math.round(missedMonth * conversionRate);
    const lostRevenue = lostClients * clientValue;

    // CALLA cost
    const avgMinPerCall = 2.5;
    const callaCost = Math.round(callsMonth * avgMinPerCall * 0.25);

    // Savings
    const monthlySaving = lostRevenue + staffCost - callaCost;
    const annualSaving = monthlySaving * 12;

    // "1 de cada X" for easy understanding
    const oneOfEvery = conversionRate > 0 ? Math.round(1 / conversionRate) : 0;

    return {
      callsMonth,
      missedMonth,
      answeredMonth,
      conversionRate,
      oneOfEvery,
      lostClients,
      lostRevenue,
      callaCost,
      monthlySaving,
      annualSaving,
    };
  }, [callsPerDay, missedOf10, clientsPerMonth, clientValue, staffCost]);

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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-brand-emerald/[0.08] border border-brand-emerald/20 rounded-full px-4 py-1.5 mb-6">
            <Calculator className="w-3.5 h-3.5 text-brand-emerald" />
            <span className="text-xs text-brand-emerald font-display font-semibold tracking-wide">
              Calculadora
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-5 tracking-tight leading-[1.1]">
            ¿Cuánto dinero pierdes en{" "}
            <span className="text-gradient-warm">llamadas sin contestar</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg font-light">
            4 datos de tu negocio. 10 segundos. La respuesta te va a sorprender.
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
            <div className="rounded-2xl border border-border/25 bg-card/35 p-5 sm:p-6 md:p-8 space-y-6">
              {/* Sector */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground/60 font-medium">Tu sector</label>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full h-11 bg-secondary/30 border border-border/25 rounded-xl px-4 text-left text-sm font-medium text-foreground flex items-center justify-between hover:border-border/40 transition-colors"
                  >
                    {currentSector?.label || "Seleccionar"}
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border/30 rounded-xl shadow-2xl z-20 max-h-56 overflow-y-auto">
                      {sectors.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => selectSector(s.id)}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary/50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                            sectorId === s.id ? "text-primary font-semibold bg-primary/5" : "text-foreground/80"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Calls per day */}
              <SimpleInput
                label="¿Cuántas llamadas recibís al día?"
                value={callsPerDay}
                onChange={setCallsPerDay}
                suffix="llamadas/día"
                min={1}
                max={500}
              />

              {/* Missed calls - visual selector */}
              <MissedCallSelector value={missedOf10} onChange={setMissedOf10} />

              {/* Clients per month */}
              <SimpleInput
                label="¿Cuántos clientes nuevos cerráis al mes?"
                value={clientsPerMonth}
                onChange={setClientsPerMonth}
                suffix="clientes/mes"
                min={1}
                max={1000}
              />

              {/* Client value */}
              <SimpleInput
                label="¿Cuánto paga un cliente de media?"
                value={clientValue}
                onChange={setClientValue}
                prefix="€"
                min={10}
                max={100000}
              />

              {/* Staff cost */}
              <SimpleInput
                label="¿Cuánto os cuesta la persona que contesta el teléfono?"
                value={staffCost}
                onChange={setStaffCost}
                prefix="€"
                suffix="/mes"
                min={0}
                max={10000}
              />
            </div>
          </motion.div>

          {/* Right: Results as a STORY */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {/* Step by step narrative */}
            <div className="rounded-2xl border border-border/25 bg-card/35 p-5 sm:p-6 md:p-8">
              <p className="text-xs text-muted-foreground/40 uppercase tracking-wider font-semibold mb-5">
                Tus números, paso a paso
              </p>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Recibís{" "}
                    <span className="font-display font-bold text-foreground">{math.callsMonth} llamadas</span>{" "}
                    al mes.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-brand-rose/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-brand-rose">2</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    No contestáis{" "}
                    <span className="font-display font-bold text-brand-rose">{math.missedMonth}</span>.
                    {" "}Esas personas llaman a otro.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-brand-amber/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-brand-amber">3</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Hoy cerráis{" "}
                    <span className="font-display font-bold text-foreground">{clientsPerMonth} clientes</span>{" "}
                    de{" "}
                    <span className="font-display font-bold text-foreground">{math.answeredMonth}</span>{" "}
                    llamadas contestadas.
                    {math.oneOfEvery > 0 && (
                      <span className="text-muted-foreground/50">
                        {" "}Es decir, 1 de cada {math.oneOfEvery} llama y contrata.
                      </span>
                    )}
                  </p>
                </div>

                {/* Step 4 - THE PUNCHLINE */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-brand-rose/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-brand-rose">4</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Si ese mismo ratio aplica a las{" "}
                    <span className="font-display font-bold text-brand-rose">{math.missedMonth}</span>{" "}
                    que NO contestáis…
                    {math.lostClients > 0 ? (
                      <>
                        {" "}estáis perdiendo{" "}
                        <span className="font-display font-bold text-brand-rose">{math.lostClients} clientes</span>{" "}
                        cada mes.
                      </>
                    ) : (
                      <> el impacto es mínimo. ¡Bien!</>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* The big number */}
            {math.lostRevenue > 0 && (
              <div className="rounded-2xl border border-brand-rose/20 bg-brand-rose/[0.03] p-5 sm:p-6 text-center">
                <p className="text-xs text-brand-rose/50 uppercase tracking-wider font-semibold mb-2">
                  {math.lostClients} clientes × €{clientValue.toLocaleString("es-ES")} =
                </p>
                <p className="text-3xl sm:text-4xl font-display font-extrabold text-brand-rose mb-1">
                  €{math.lostRevenue.toLocaleString("es-ES")}
                  <span className="text-lg font-normal text-brand-rose/60">/mes</span>
                </p>
                <p className="text-xs text-brand-rose/40">
                  en ingresos que se van a tu competencia
                </p>
              </div>
            )}

            {/* With CALLA */}
            <div className="rounded-2xl border border-brand-emerald/20 bg-brand-emerald/[0.03] p-5 sm:p-6">
              <p className="text-xs text-brand-emerald/50 uppercase tracking-wider font-semibold mb-4">
                Con CALLA, esas {math.missedMonth} llamadas se contestan solas
              </p>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm text-muted-foreground/60">Coste de CALLA</span>
                <span className="text-sm font-display font-bold text-foreground">
                  €{math.callaCost.toLocaleString("es-ES")}/mes
                </span>
              </div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm text-muted-foreground/60">Te ahorras en personal</span>
                <span className="text-sm font-display font-bold text-brand-emerald">
                  €{staffCost.toLocaleString("es-ES")}/mes
                </span>
              </div>
              <div className="border-t border-brand-emerald/15 pt-3 mt-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">Recuperas al año</span>
                  <span className="text-2xl font-display font-extrabold text-brand-emerald">
                    €{math.annualSaving.toLocaleString("es-ES")}
                  </span>
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
              Quiero dejar de perder clientes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-[10px] text-muted-foreground/30 text-center">
              Consulta gratuita · 30 min · Sin compromiso
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
