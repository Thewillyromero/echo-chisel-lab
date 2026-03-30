import { Link } from "react-router-dom";
import heroRobot from "@/assets/hero-robot.webp";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 pt-12 md:pt-16 pb-8 px-5 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img loading="lazy" src={heroRobot} alt="CALLA" className="h-8 w-8 object-contain" width={64} height={64} />
              <span className="text-lg font-display font-bold text-foreground tracking-tight">
                CA<span className="text-gradient-blue">LLA</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground/60 font-light leading-relaxed max-w-xs">
              Empleados IA que atienden llamadas, agendan citas y gestionan tu comunicación 24/7.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase mb-4">Producto</h4>
            <ul className="space-y-2.5">
              <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Servicios</a></li>
              <li><Link to="/precios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Precios</Link></li>
              <li><a href="#squad" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Squad</a></li>
              <li><a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resultados</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase mb-4">Recursos</h4>
            <ul className="space-y-2.5">
              <li><a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonios</a></li>
              <li><a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre nosotros</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="https://api.leadconnectorhq.com/widget/booking/m4SFv9fHyIZraSrAu8QT" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacidad</a></li>
              <li><a href="https://api.leadconnectorhq.com/widget/booking/m4SFv9fHyIZraSrAu8QT" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Términos</a></li>
              <li><a href="https://api.leadconnectorhq.com/widget/booking/m4SFv9fHyIZraSrAu8QT" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/40">
            © 2026 CALLA. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground/30">
            Hecho con IA · Desde España 🇪🇸
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
