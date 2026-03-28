import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="/" className="flex items-center gap-2">
          <Phone className="h-7 w-7 text-primary" />
          <span className="text-xl font-display font-bold text-foreground">
            Vox<span className="text-gradient">AI</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Nosotros</a>
          <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resultados</a>
          <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Iniciar sesión
          </Button>
          <Button size="sm" className="glow-box">
            Prueba gratis
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/50 px-6 py-4 flex flex-col gap-4">
          <a href="#features" className="text-sm text-muted-foreground">Servicios</a>
          <a href="#about" className="text-sm text-muted-foreground">Nosotros</a>
          <a href="#stats" className="text-sm text-muted-foreground">Resultados</a>
          <a href="#blog" className="text-sm text-muted-foreground">Blog</a>
          <Button size="sm" className="glow-box w-full">Prueba gratis</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
