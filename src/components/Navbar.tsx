import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroRobot from "@/assets/hero-robot.png";

const Navbar = ({ onContact }: { onContact?: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-t-0 border-x-0 border-b border-border/20">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <a href="/" className="flex items-center gap-2">
          <img src={heroRobot} alt="CALLA" className="h-8 w-8 object-contain" width={64} height={64} />
          <span className="text-xl font-display font-bold text-foreground">
            CA<span className="text-gradient">LLA</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
          <a href="#squad" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Squad</a>
          <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resultados</a>
          <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Iniciar sesión
          </Button>
          <Button size="sm" className="glow-box" onClick={onContact}>
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
          <a href="#squad" className="text-sm text-muted-foreground">Squad</a>
          <a href="#stats" className="text-sm text-muted-foreground">Resultados</a>
          <a href="#blog" className="text-sm text-muted-foreground">Blog</a>
          <Button size="sm" className="glow-box w-full" onClick={() => { setOpen(false); onContact?.(); }}>
            Prueba gratis
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
