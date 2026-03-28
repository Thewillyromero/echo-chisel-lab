const logos = [
  "Empresa A", "Empresa B", "Empresa C", "Empresa D", "Empresa E", "Empresa F"
];

const LogoMarquee = () => {
  return (
    <section className="py-12 border-y border-border/30 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((name, i) => (
          <div
            key={i}
            className="mx-12 flex items-center justify-center min-w-[150px]"
          >
            <span className="text-muted-foreground/40 font-display font-semibold text-lg tracking-wider uppercase">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
