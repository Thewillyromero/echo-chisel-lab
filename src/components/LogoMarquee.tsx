const logos = [
  "Reputation Loop",
  "American Monitronics",
  "Invictus Advisors",
  "Rehab System",
  "RedRoot Strategies",
  "Hartmetall USA",
  "Convey-All Industries",
  "BeyondGroupTravel",
  "Avian Digital",
  "Tutor Doctor",
  "Capify",
  "Dental 101",
  "Intelligent Office",
  "EasyMobile",
  "McKenzie Law Firm",
  "Cornerstone Hospitality",
];

const LogoMarquee = () => {
  return (
    <section className="py-12 border-y border-border/20 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((name, i) => (
          <div
            key={i}
            className="mx-10 flex items-center justify-center min-w-[140px]"
          >
            <span className="text-muted-foreground/30 font-display font-semibold text-sm tracking-wider uppercase">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
