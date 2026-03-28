import { Phone, Clock, CalendarCheck, PhoneOutgoing } from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "Atiende llamadas por ti",
    description: "Tu asistente responde llamadas entrantes para que puedas centrarte en tu negocio.",
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "Tus clientes siempre reciben respuesta, incluso fuera de horario laboral.",
  },
  {
    icon: CalendarCheck,
    title: "Agenda citas automáticamente",
    description: "Recoge pedidos y agenda citas sin intervención humana.",
  },
  {
    icon: PhoneOutgoing,
    title: "Campañas Outbound",
    description: "Lanza campañas de llamadas salientes para appointment setting y generación de leads.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            ¿Qué <span className="text-gradient">hacemos</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Automatizamos tu comunicación telefónica de principio a fin, tanto entrante como saliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass rounded-xl p-6 hover:glow-box transition-shadow duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
