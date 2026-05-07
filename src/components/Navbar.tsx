import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroRobot from "@/assets/hero-robot.webp";
import { sectors } from "@/data/sectors";

const Navbar = ({ onContact }: { onContact?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSectorsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (hash: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    scrollToSection(hash);
  };

  const handleMobileNavClick = (hash: string) => {
    setOpen(false);
    scrollToSection(hash);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-background/80 backdrop-blur-2xl border-b border-border/30 shadow-lg shadow-black/20"
        : "bg-transparent"
    }`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2.5">
          <img src={heroRobot} alt="CALLA" className="h-8 w-8 object-contain" width={64} height={64} />
          <span className="text-xl font-display font-bold text-foreground tracking-tight">
            CA<span className="text-gradient-blue">LLA</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          <a href="#features" onClick={(e) => handleNavClick(e, "#features")} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50">Servicios</a>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setSectorsOpen(!sectorsOpen)}
              className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
            >
              Sectores
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${sectorsOpen ? "rotate-180" : ""}`} />
            </button>

            {sectorsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] glass-elevated rounded-xl p-2 animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="grid grid-cols-2 gap-0.5">
                  {sectors.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.slug}
                        to={`/sectores/${s.slug}`}
                        onClick={() => setSectorsOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
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

          <a href="#squad" onClick={(e) => handleNavClick(e, "#squad")} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50">Squad</a>
          <a href="#stats" onClick={(e) => handleNavClick(e, "#stats")} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50">Resultados</a>
          <Link to="/blog" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50">Blog</Link>
          <Link to="/precios" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50">Precios</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 shadow-lg shadow-primary/20" onClick={onContact}>
            Empezar gratis
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/30 px-6 py-5 flex flex-col gap-1">
          <button onClick={() => handleMobileNavClick("#features")} className="py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors text-left">Servicios</button>
          <button
            onClick={() => setMobileSectorsOpen(!mobileSectorsOpen)}
            className="flex items-center justify-between py-2.5 text-sm text-muted-foreground"
          >
            Sectores
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileSectorsOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileSectorsOpen && (
            <div className="pl-4 flex flex-col gap-1 pb-2">
              {sectors.map((s) => {
                const Icon = s.icon;
                return (
                  <Link key={s.slug} to={`/sectores/${s.slug}`} onClick={() => { setOpen(false); setMobileSectorsOpen(false); }}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                    <Icon className="h-3.5 w-3.5 text-primary/70" />
                    {s.name}
                  </Link>
                );
              })}
            </div>
          )}
          <button onClick={() => handleMobileNavClick("#squad")} className="py-2.5 text-sm text-muted-foreground text-left">Squad</button>
          <button onClick={() => handleMobileNavClick("#stats")} className="py-2.5 text-sm text-muted-foreground text-left">Resultados</button>
          <Link to="/blog" className="py-2.5 text-sm text-muted-foreground" onClick={() => setOpen(false)}>Blog</Link>
          <Link to="/precios" className="py-2.5 text-sm text-muted-foreground" onClick={() => setOpen(false)}>Precios</Link>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full mt-3 shadow-lg shadow-primary/20" onClick={() => { setOpen(false); onContact?.(); }}>
            Empezar gratis
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
