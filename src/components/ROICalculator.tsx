import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, ArrowRight, Sparkles, ChevronDown,
  Clock, Euro, UserX, PhoneOff, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ── Sectors (for segmentation + client value hint) ── */
const sectors = [
  { id: "dental", label: "Clínica dental", hint: 400 },
  { id: "salud", label: "Clínica / Centro médico", hint: 150 },
  { id: "legal", label: "Despacho de abogados", hint: 1500 },
  { id: "inmobiliaria", label: "Inmobiliaria", hint: 3000 },
  { id: "instalaciones", label: "Instalaciones / Energía solar", hint: 10000 },
  { id: "estetica", label: "Clínica estética", hint: 800 },
  { id: "educacion", label: "Academia / Formación", hint: 200 },
  { id: "hosteleria", label: "Restaurante / Hotel", hint: 50 },
  { id: "seguros", label: "Seguros / Asesoría", hint: 1200 },
  { id: "taller", label: "Taller / Reparaciones", hint: 350 },
  { id: "otro", label: "Otro sector", hint: 300 },
];

/* ── Simple field ── */
const Field = ({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
}) => (
  <div>
    <label className="text-xs text-muted-foreground/60 font-medium block mb-1.5">{label}</label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/40">{prefix}</span>
      )}
      <Input
        type="number"
        value={value || ""}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className={`bg-secondary/30 border-border/25 h-11 text-base font-display font-bold rounded-xl focus:border-primary/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${prefix ? "pl-8" : ""} ${suffix ? "pr-20" : ""}`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/40">{suffix}</span>
      )}
    </div>
  </div>
);

/* ── Main ── */
const ROICalculator = ({ onContact }: { onContact?: () => void }) => {
  const [sectorId, setSectorId] = useState("otro");
  const [dropOpen, setDropOpen] = useState(false);

  // What they spend TODAY
  const [staffCost, setStaffCost] = useState(1500);
  const [ownHoursPerDay, setOwnHoursPerDay] = useState(2);
  const [ownHourRate, setOwnHourRate] = useState(50);
  const [doesOutbound, setDoesOutbound] = useState(false);
  const [outboundSpend, setOutboundSpend] = useState(2000);

  // For the cherry-on-top line
  const currentSector = sectors.find((s) => s.id === sectorId);
  const clientValue = currentSector?.hint || 300;

  const selectSector = (id: string) => {
    setSectorId(id);
    setDropOpen(false);
  };

  const result = useMemo(() => {
    const workDays = 22;
    const ownTimeCost = ownHoursPerDay * ownHourRate * workDays;
    const outbound = doesOutbound ? outboundSpend : 0;

    const totalToday = staffCost + ownTimeCost + outbound;

    // CALLA estimate: base plan + usage
    // Starter €297 for inbound, Pro €697 for inbound+outbound
    const callaBase = doesOutbound ? 697 : 297;
    // Plus estimated per-minute cost (rough: 15 calls/day × 2.5 min × €0.25)
    const estimatedMinutes = 15 * 2.5 * workDays;
    const callaUsage = Math.round(estimatedMinutes * 0.25);
    const callaTotal = callaBase + callaUsage;

    const monthlySaving = totalToday - callaTotal;
    const annualSaving = monthlySaving * 12;

    return {
      ownTimeCost: Math.round(ownTimeCost),
      outbound,
      totalToday: Math.round(totalToday),
      callaBase,
      callaUsage,
      callaTotal,
      monthlySaving: Math.round(monthlySaving),
      annualSaving: Math.round(annualSaving),
    };
  }, [staffCost, ownHoursPerDay, ownHourRate, doesOutbound, outboundSpend]);

  return (
    <section id="calculadora" className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-emerald/[0.03] blur-[180px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
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
            ¿Cuánto te cuesta{" "}
            <span className="text-gradient-warm">gestionar el teléfono</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg font-light">
            Suma lo que gastas hoy. Te sorprenderá.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left: What you spend today */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-border/25 bg-card/35 p-5 sm:p-7 space-y-5">
              <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                <UserX className="w-4 h-4 text-brand-rose" />
                Lo que gastas hoy
              </h3>

              {/* Sector */}
              <div>
                <label className="text-xs text-muted-foreground/60 font-medium block mb-1.5">Tu sector</label>
                <div className="relative">
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    className="w-full h-11 bg-secondary/30 border border-border/25 rounded-xl px-4 text-left text-sm font-medium text-foreground flex items-center justify-between hover:border-border/40 transition-colors"
                  >
                    {currentSector?.label || "Seleccionar"}
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropOpen ? "rotate-180" : ""}`} />
                  </button>
                  {dropOpen && (
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

              <Field
                label="Recepcionista o persona que contesta"
                value={staffCost}
                onChange={setStaffCost}
                prefix="€"
                suffix="/mes"
              />

              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Horas que dedicas TÚ al teléfono"
                  value={ownHoursPerDay}
                  onChange={setOwnHoursPerDay}
                  suffix="h/día"
                />
                <Field
                  label="¿Tu hora vale...?"
                  value={ownHourRate}
                  onChange={setOwnHourRate}
                  prefix="€"
                  suffix="/hora"
                />
              </div>

              {/* Outbound toggle */}
              <div className="pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <button
                    onClick={() => setDoesOutbound(!doesOutbound)}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-300 shrink-0 ${
                      doesOutbound ? "bg-brand-lavender" : "bg-secondary/60"
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform duration-300 ${doesOutbound ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                  <span className="text-xs text-muted-foreground/60">
                    También gastamos en captación / llamadas de venta
                  </span>
                </label>
              </div>

              {doesOutbound && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="pl-3 border-l-2 border-brand-lavender/20"
                >
                  <Field
                    label="Gasto mensual en captación (agencia, callers, ads...)"
                    value={outboundSpend}
                    onChange={setOutboundSpend}
                    prefix="€"
                    suffix="/mes"
                  />
                </motion.div>
              )}

              {/* Total today */}
              <div className="border-t border-border/20 pt-4 mt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground/60">Tu gasto total hoy</span>
                  <span className="text-2xl font-display font-extrabold text-brand-rose">
                    €{result.totalToday.toLocaleString("es-ES")}
                    <span className="text-sm font-normal text-brand-rose/50">/mes</span>
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground/40">
                  <div className="flex justify-between">
                    <span>Personal</span>
                    <span>€{staffCost.toLocaleString("es-ES")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tu tiempo ({ownHoursPerDay}h/día × €{ownHourRate}/h)</span>
                    <span>€{result.ownTimeCost.toLocaleString("es-ES")}</span>
                  </div>
                  {doesOutbound && (
                    <div className="flex justify-between">
                      <span>Captación</span>
                      <span>€{outboundSpend.toLocaleString("es-ES")}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: With CALLA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <div className="rounded-2xl border border-brand-emerald/20 bg-brand-emerald/[0.02] p-5 sm:p-7">
              <h3 className="font-display font-bold text-foreground flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-brand-emerald" />
                Con CALLA
              </h3>

              {/* What you get */}
              <div className="space-y-3 mb-6">
                {[
                  "Todas tus llamadas contestadas, 24/7",
                  "Citas agendadas automáticamente",
                  "Cero llamadas perdidas fuera de horario",
                  doesOutbound ? "Campañas de captación automatizadas" : null,
                  "Tu tiempo libre para lo que importa",
                ].filter(Boolean).map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-emerald shrink-0" />
                    <span className="text-sm text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>

              {/* CALLA cost */}
              <div className="bg-card/40 rounded-xl p-4 mb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm text-muted-foreground/60">Plan {doesOutbound ? "Pro" : "Starter"}</span>
                  <span className="text-sm font-display font-bold text-foreground">€{result.callaBase}/mes</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground/60">Consumo estimado</span>
                  <span className="text-sm font-display font-bold text-foreground">~€{result.callaUsage}/mes</span>
                </div>
                <div className="border-t border-border/15 mt-3 pt-3 flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">Total CALLA</span>
                  <span className="text-xl font-display font-extrabold text-brand-emerald">
                    €{result.callaTotal.toLocaleString("es-ES")}
                    <span className="text-sm font-normal text-brand-emerald/50">/mes</span>
                  </span>
                </div>
              </div>

              {/* Savings */}
              {result.monthlySaving > 0 && (
                <div className="bg-brand-emerald/10 rounded-xl p-4 text-center mb-2">
                  <p className="text-[10px] text-brand-emerald/50 uppercase tracking-wider mb-1">
                    Ahorras cada mes
                  </p>
                  <p className="text-3xl font-display font-extrabold text-brand-emerald">
                    €{result.monthlySaving.toLocaleString("es-ES")}
                  </p>
                  <p className="text-xs text-muted-foreground/40 mt-1">
                    €{result.annualSaving.toLocaleString("es-ES")} al año
                  </p>
                </div>
              )}
            </div>

            {/* The cherry on top */}
            <div className="rounded-xl border border-border/15 bg-card/25 p-4 sm:p-5">
              <p className="text-sm text-foreground/70 leading-relaxed">
                <PhoneOff className="w-4 h-4 text-brand-rose inline mr-1.5 -mt-0.5" />
                Y piensa en esto: hoy pierdes llamadas fuera de horario, en reuniones, o cuando estás ocupado.{" "}
                <span className="font-display font-semibold text-foreground">
                  Si solo 1 de esas llamadas al mes era un cliente de €{clientValue.toLocaleString("es-ES")}…
                  CALLA ya se ha pagado sola.
                </span>
              </p>
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
              30 min · Sin compromiso · Te contamos cómo funciona para tu sector
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
