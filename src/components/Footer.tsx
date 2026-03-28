import heroRobot from "@/assets/hero-robot.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src={heroRobot} alt="CALLA" className="h-6 w-6 object-contain" width={64} height={64} />
          <span className="font-display font-bold text-foreground">
            CA<span className="text-gradient">LLA</span>
          </span>
        </div>

        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
          <a href="#" className="hover:text-foreground transition-colors">Términos</a>
          <a href="#" className="hover:text-foreground transition-colors">Contacto</a>
        </div>

        <p className="text-xs text-muted-foreground/50">
          © 2026 CALLA. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
