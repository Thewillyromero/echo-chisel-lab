import Navbar from "@/components/Navbar";

const FontTest = () => (
  <div className="min-h-screen bg-background p-10">
    <Navbar />
    <div className="container mx-auto pt-24 space-y-16">
      <div>
        <p className="text-sm text-brand-emerald font-bold mb-2">★ Outfit (actual) + glow suave</p>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground text-glow">
          Tus llamadas, <span className="text-gradient text-glow-teal">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-brand-emerald font-bold mb-2">★ Fredoka + glow suave</p>
        <h1 className="text-5xl md:text-7xl tracking-tight text-foreground text-glow" style={{ fontFamily: "'Fredoka', cursive", fontWeight: 700 }}>
          Tus llamadas, <span className="text-gradient text-glow-teal">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-brand-emerald font-bold mb-2">★ Baloo 2 + glow suave</p>
        <h1 className="text-5xl md:text-7xl font-puffy-1 tracking-tight text-foreground text-glow">
          Tus llamadas, <span className="text-gradient text-glow-teal">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-brand-emerald font-bold mb-2">★ Outfit + glow colores</p>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-foreground text-glow mb-4">
          ¿Cuánto te cuesta <span className="text-gradient-warm text-glow-warm">gestionar el teléfono?</span>
        </h2>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-foreground text-glow mb-4">
          Habla con <span className="text-gradient text-glow-teal">ARIA ahora mismo</span>
        </h2>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-foreground text-glow">
          Lo que dicen <span className="text-gradient text-glow-emerald">nuestros clientes</span>
        </h2>
      </div>

      <hr className="border-border/30" />

      <div>
        <p className="text-sm text-muted-foreground mb-2">Lilita One + glow</p>
        <h1 className="text-5xl md:text-7xl font-puffy-2 tracking-tight text-foreground text-glow">
          Tus llamadas, <span className="text-gradient text-glow-teal">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Rubik Bubbles + glow</p>
        <h1 className="text-5xl md:text-7xl font-puffy-3 tracking-tight text-foreground text-glow">
          Tus llamadas, <span className="text-gradient text-glow-teal">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Sin efecto (control)</p>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground">
          Tus llamadas, <span className="text-gradient">resueltas por IA</span>
        </h1>
      </div>
    </div>
  </div>
);

export default FontTest;
