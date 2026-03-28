import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroRobot from "@/assets/hero-robot.png";
import { sectors } from "@/data/sectors";

const Navbar = ({ onContact }: { onContact?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSectorsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

          {/* Sectors Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setSectorsOpen(!sectorsOpen)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sectores
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${sectorsOpen ? "rotate-180" : ""}`} />
            </button>

            {sectorsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[320px] glass rounded-xl border border-border/30 p-2 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="grid grid-cols-2 gap-1">
                  {sectors.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.slug}
                        to={`/sectores/${s.slug}`}
                        onClick={() => setSectorsOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                      >
                        <Icon className="h-4 w-4 text-primary/70 shrink-0" />
                        {s.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <a href="#squad" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Squad</a>
          <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resultados</a>
          <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a>
          <Link to="/precios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Precios</Link>
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

          {/* Mobile Sectors */}
          <button
            onClick={() => setMobileSectorsOpen(!mobileSectorsOpen)}
            className="flex items-center justify-between text-sm text-muted-foreground"
          >
            Sectores
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileSectorsOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileSectorsOpen && (
            <div className="pl-4 flex flex-col gap-2">
              {sectors.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    to={`/sectores/${s.slug}`}
                    onClick={() => { setOpen(false); setMobileSectorsOpen(false); }}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary/70" />
                    {s.name}
                  </Link>
                );
              })}
            </div>
          )}

          <a href="#squad" className="text-sm text-muted-foreground">Squad</a>
          <a href="#stats" className="text-sm text-muted-foreground">Resultados</a>
          <a href="#blog" className="text-sm text-muted-foreground">Blog</a>
          <Link to="/precios" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Precios</Link>
          <Button size="sm" className="glow-box w-full" onClick={() => { setOpen(false); onContact?.(); }}>
            Prueba gratis
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
