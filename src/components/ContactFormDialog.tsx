import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroRobot from "@/assets/hero-robot.png";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

const ContactFormDialog = ({ open, onOpenChange, source = "general" }: ContactFormDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Por favor, completa al menos tu nombre y email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Por favor, introduce un email válido.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("contact_leads").insert({
        name: form.name.trim().slice(0, 100),
        email: form.email.trim().toLowerCase().slice(0, 255),
        phone: form.phone.trim().slice(0, 30) || null,
        company: form.company.trim().slice(0, 100) || null,
        message: form.message.trim().slice(0, 1000) || null,
        source,
      });

      if (error) throw error;
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      toast.error("Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setTimeout(() => setSuccess(false), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-warm border-border/30 sm:max-w-lg">
        {success ? (
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-emerald/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-brand-emerald" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-extrabold">¡Mensaje enviado!</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2">
                Nos pondremos en contacto contigo en menos de 24 horas. Prepárate para conocer a tu nuevo equipo de agentes IA.
              </DialogDescription>
            </DialogHeader>
            <img src={heroRobot} alt="" className="w-24 opacity-60 mt-2" width={1024} height={1024} />
            <Button variant="outline" onClick={() => handleClose(false)} className="mt-2">
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-extrabold">
                Empieza con <span className="text-gradient">CALLA</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Déjanos tus datos y te contactamos para configurar tu asistente virtual en menos de 30 minutos.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                    required
                    className="bg-secondary/50 border-border/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@empresa.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                    required
                    className="bg-secondary/50 border-border/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    placeholder="+34 600 000 000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    maxLength={30}
                    className="bg-secondary/50 border-border/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    placeholder="Tu empresa"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    maxLength={100}
                    className="bg-secondary/50 border-border/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos qué necesitas..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={1000}
                  rows={3}
                  className="bg-secondary/50 border-border/40 resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full glow-box text-base" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Solicitar demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground/60 text-center">
                Sin compromiso · Respuesta en &lt;24h · Setup en 30 min
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
