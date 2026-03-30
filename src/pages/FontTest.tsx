import Navbar from "@/components/Navbar";

const FontTest = () => (
  <div className="min-h-screen bg-background p-10">
    <Navbar />
    <div className="container mx-auto pt-24 space-y-16">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Fuente actual (font-display / Outfit)</p>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground">
          Tus llamadas, <span className="text-gradient">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Fredoka (actual text-puffy)</p>
        <h1 className="text-5xl md:text-7xl tracking-tight text-foreground" style={{ fontFamily: "'Fredoka', cursive", fontWeight: 700 }}>
          Tus llamadas, <span className="text-gradient">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Opción 1: Baloo 2 (redondeada, amigable)</p>
        <h1 className="text-5xl md:text-7xl font-puffy-1 tracking-tight text-foreground">
          Tus llamadas, <span className="text-gradient">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Opción 2: Lilita One (chunky, Pixar)</p>
        <h1 className="text-5xl md:text-7xl font-puffy-2 tracking-tight text-foreground">
          Tus llamadas, <span className="text-gradient">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Opción 3: Rubik Bubbles (burbuja total)</p>
        <h1 className="text-5xl md:text-7xl font-puffy-3 tracking-tight text-foreground">
          Tus llamadas, <span className="text-gradient">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Opción 1 + sombra 3D</p>
        <h1 className="text-5xl md:text-7xl font-puffy-1 tracking-tight text-foreground text-puffy">
          Tus llamadas, <span className="text-gradient text-puffy-teal">resueltas por IA</span>
        </h1>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Opción 2 + sombra 3D</p>
        <h1 className="text-5xl md:text-7xl font-puffy-2 tracking-tight text-foreground text-puffy">
          Tus llamadas, <span className="text-gradient text-puffy-teal">resueltas por IA</span>
        </h1>
      </div>
    </div>
  </div>
);

export default FontTest;
