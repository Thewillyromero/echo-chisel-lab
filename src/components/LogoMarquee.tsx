const logos = [
  { name: "Reputation Loop", initials: "RL" },
  { name: "American Monitronics", initials: "AM" },
  { name: "Invictus Advisors", initials: "IA" },
  { name: "Rehab System", initials: "RS" },
  { name: "RedRoot Strategies", initials: "RR" },
  { name: "Hartmetall USA", initials: "HU" },
  { name: "Convey-All Industries", initials: "CA" },
  { name: "BeyondGroupTravel", initials: "BG" },
  { name: "Avian Digital", initials: "AD" },
  { name: "Tutor Doctor", initials: "TD" },
  { name: "Capify", initials: "Ca" },
  { name: "Dental 101", initials: "D1" },
  { name: "Intelligent Office", initials: "IO" },
  { name: "EasyMobile", initials: "EM" },
  { name: "McKenzie Law Firm", initials: "ML" },
  { name: "Cornerstone Hospitality", initials: "CH" },
];

const LogoMarquee = () => {
  return (
    <section className="py-10 border-y border-border/15 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="mx-8 flex items-center gap-2.5 min-w-[160px]"
          >
            <div className="w-7 h-7 rounded-md bg-muted/40 border border-border/20 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-display font-bold text-muted-foreground/40 leading-none">
                {logo.initials}
              </span>
            </div>
            <span className="text-muted-foreground/25 font-display font-medium text-xs tracking-wide">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
