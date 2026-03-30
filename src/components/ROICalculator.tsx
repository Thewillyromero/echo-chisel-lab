import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, ArrowRight, Sparkles, ChevronDown,
  UserX, Check,
} from "lucide-react";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CALENDAR_URL = "https://api.leadconnectorhq.com/widget/booking/m4SFv9fHyIZraSrAu8QT";

const sectors = [
  { id: "dental", label: "Clínica dental", hint: 400 },
  { id: "salud", label: "Centro médico", hint: 150 },
  { id: "legal", label: "Despacho legal", hint: 1500 },
  { id: "inmobiliaria", label: "Inmobiliaria", hint: 3000 },
  { id: "instalaciones", label: "Instalaciones / Energía", hint: 10000 },
  { id: "estetica", label: "Clínica estética", hint: 800 },
  { id: "educacion", label: "Academia", hint: 200 },
  { id: "hosteleria", label: "Restaurante / Hotel", hint: 50 },
  { id: "seguros", label: "Seguros", hint: 1200 },
  { id: "taller", label: "Taller", hint: 350 },
  { id: "otro", label: "Otro sector", hint: 300 },
];

const hourOptions = [0, 1, 2, 3, 4];

const ROICalculator = ({ onContact }: { onContact?: () => void }) => {
  const [sectorId, setSectorId] = useState("dental");
  const [dropOpen, setDropOpen] = useState(false);
  const [staffCost, setStaffCost] = useState(1500);
  const [ownHours, setOwnHours] = useState(2);

  const currentSector = sectors.find((s) => s.id === sectorId);
  const clientValue = currentSector?.hint || 300;

  const result = useMemo(() => {
    const ownTimeCost = ownHours * 50 * 22;
    const totalToday = staffCost + ownTimeCost;
    const callaTotal = 503; // 297 plan + 206 estimated usage
    const monthlySaving = totalToday - callaTotal;
    const annualSaving = monthlySaving * 12;

    return { ownTimeCost, totalToday, callaTotal, monthlySaving, annualSaving };
  }, [staffCost, ownHours]);

  return (
    <section id="calculadora" className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-emerald/[0.03] blur-[180px] pointer-events-none" />
      {/* Background character — BYTE */}
      <div className="absolute right-0 top-0 pointer-events-none select-none">
        <img src={agentAnalytics} alt="" className="w-[280px] md:w-[650px] opacity-[0.04] rotate-6" loading="lazy" />
      </div>

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight leading-[1.1]">
            ¿Cuánto te cuesta{" "}
            <span className="text-gradient-warm">gestionar el teléfono</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg font-light">
            3 datos. 10 segundos. La respuesta te sorprenderá.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* LEFT — What you spend today */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-border/25 bg-card/35 p-5 sm:p-7 h-full flex flex-col">
              <h3 className="font-display font-bold text-foreground flex items-center gap-2 mb-6">
                <UserX className="w-4 h-4 text-brand-rose" />
                Lo que gastas hoy
              </h3>

              <div className="space-y-5 flex-1">
                {/* Sector dropdown */}
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
                            onClick={() => { setSectorId(s.id); setDropOpen(false); }}
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

                {/* Staff cost */}
                <div>
                  <label className="text-xs text-muted-foreground/60 font-medium block mb-1.5">
                    ¿Cuánto pagas al mes a quien contesta las llamadas?
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/40">€</span>
                    <Input
                      type="number"
                      value={staffCost || ""}
                      onChange={(e) => setStaffCost(Math.max(0, Number(e.target.value)))}
                      className="bg-secondary/30 border-border/25 h-11 text-base font-display font-bold rounded-xl focus:border-primary/40 pl-8 pr-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/40">/mes</span>
                  </div>
                </div>

                {/* Hours chips */}
                <div>
                  <label className="text-xs text-muted-foreground/60 font-medium block mb-2">
                    ¿Cuántas horas al día dedicas TÚ al teléfono?
                  </label>
                  <div className="flex gap-2">
                    {hourOptions.map((h) => (
                      <button
                        key={h}
                        onClick={() => setOwnHours(h)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                          ownHours === h
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60"
                        }`}
                      >
                        {h === 4 ? "4h+" : `${h}h`}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground/30 mt-1.5">
                    Tu tiempo como CEO vale mínimo €50/h
                  </p>
                </div>
              </div>

              {/* Total today */}
              <div className="border-t border-border/20 pt-4 mt-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm text-muted-foreground/60">Tu gasto total hoy</span>
                  <span className="text-xl font-display font-extrabold text-brand-rose">
                    €{result.totalToday.toLocaleString("es-ES")}<span className="text-sm font-normal text-brand-rose/50">/mes</span>
                  </span>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground/40">
                  <div className="flex justify-between">
                    <span>Personal</span>
                    <span>€{staffCost.toLocaleString("es-ES")}</span>
                  </div>
                  {ownHours > 0 && (
                    <div className="flex justify-between">
                      <span>Tu tiempo ({ownHours}h/día × €50/h)</span>
                      <span>€{result.ownTimeCost.toLocaleString("es-ES")}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — With CALLA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-brand-emerald/20 bg-brand-emerald/[0.02] p-5 sm:p-7 h-full flex flex-col">
              <h3 className="font-display font-bold text-foreground flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-brand-emerald" />
                Con CALLA
              </h3>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                {[
                  "Todas tus llamadas contestadas, 24/7",
                  "Citas agendadas automáticamente",
                  "Cero llamadas perdidas",
                  "Tu tiempo libre para lo que importa",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-emerald shrink-0" />
                    <span className="text-sm text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>

              {/* CALLA cost breakdown */}
              <div className="bg-card/40 rounded-xl p-4 mb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm text-muted-foreground/60">Plan Starter</span>
                  <span className="text-sm font-display font-bold text-foreground">€297/mes</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground/60">Consumo estimado</span>
                  <span className="text-sm font-display font-bold text-foreground">~€206/mes</span>
                </div>
                <div className="border-t border-border/15 mt-3 pt-3 flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">Total CALLA</span>
                  <span className="text-xl font-display font-extrabold text-brand-emerald">
                    €503<span className="text-sm font-normal text-brand-emerald/50">/mes</span>
                  </span>
                </div>
              </div>

              {/* Savings box */}
              {result.monthlySaving > 0 && (
                <div className="bg-brand-emerald/10 rounded-xl p-5 text-center mb-4">
                  <p className="text-[10px] text-brand-emerald/50 uppercase tracking-wider font-semibold mb-1">
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

              {/* Cherry on top */}
              <div className="rounded-xl border border-border/15 bg-card/25 p-4 mb-5">
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Y piensa en esto: si solo 1 llamada extra al mes se convierte en un cliente de{" "}
                  <span className="font-display font-bold text-foreground">
                    €{clientValue.toLocaleString("es-ES")}
                  </span>
                  … CALLA se paga sola.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <Button
                  size="lg"
                  className="w-full rounded-xl text-sm sm:text-base h-13 font-display font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-300"
                  onClick={() => window.open(CALENDAR_URL, "_blank")}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Reservar consulta gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-[10px] text-muted-foreground/30 text-center mt-2">
                  30 min · Sin compromiso · Te contamos cómo funciona para tu sector
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
