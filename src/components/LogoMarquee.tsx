import logoReputationLoop from "@/assets/logos/reputation-loop.jpg";
import logoMonitronics from "@/assets/logos/monitronics.jpg";
import logoInvictus from "@/assets/logos/invictus-advisors.png";
import logoRehab from "@/assets/logos/rehab-system.jpg";
import logoHartmetall from "@/assets/logos/hartmetall-usa.jpg";
import logoConveyAll from "@/assets/logos/convey-all.png";
import logoBeyondGroup from "@/assets/logos/beyondgrouptravel.jpg";
import logoAvian from "@/assets/logos/avian-digital.jpg";
import logoTutor from "@/assets/logos/tutor-doctor.jpg";
import logoIntelligent from "@/assets/logos/intelligent-office.jpg";
import logoEasyMobile from "@/assets/logos/easymobile.jpg";
import logoMcKenzie from "@/assets/logos/mckenzie-law.jpg";
import logoCornerstone from "@/assets/logos/cornerstone.jpg";
import logoRedRoot from "@/assets/logos/redroot.jpg";

const logos = [
  { name: "Reputation Loop", logo: logoReputationLoop },
  { name: "Monitronics Security", logo: logoMonitronics },
  { name: "Invictus Advisors", logo: logoInvictus },
  { name: "Rehab System", logo: logoRehab },
  { name: "RedRoot Strategies", logo: logoRedRoot },
  { name: "Hartmetall USA", logo: logoHartmetall },
  { name: "Convey-All Industries", logo: logoConveyAll },
  { name: "BeyondGroupTravel", logo: logoBeyondGroup },
  { name: "Avian Digital", logo: logoAvian },
  { name: "Tutor Doctor", logo: logoTutor },
  { name: "Intelligent Office", logo: logoIntelligent },
  { name: "EasyMobile", logo: logoEasyMobile },
  { name: "McKenzie Law Firm", logo: logoMcKenzie },
  { name: "Cornerstone Hospitality", logo: logoCornerstone },
  // Companies from the PDF without extracted logos — text-only
  { name: "Direct Public Funding", logo: null },
  { name: "Capify", logo: null },
  { name: "Dental 101", logo: null },
  { name: "Advanced Plumbing Systems", logo: null },
  { name: "Marketing Automation Group", logo: null },
  { name: "Crowdfund Mafia", logo: null },
  { name: "DLC Consulting", logo: null },
  { name: "USHealth Group", logo: null },
  { name: "Northwest Lighting", logo: null },
  { name: "Kobedigtau Financial", logo: null },
];

const LogoMarquee = () => {
  // Triple the logos for seamless infinite scroll
  const tripled = [...logos, ...logos, ...logos];

  return (
    <section className="py-10 border-y border-border/15 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee items-center">
        {tripled.map((item, i) => (
          <div
            key={i}
            className="mx-6 flex items-center justify-center min-w-[120px] shrink-0"
          >
            {item.logo ? (
              <div className="relative group">
                {/* Glow behind logo */}
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-8 w-auto object-contain max-w-[90px] relative z-10 mix-blend-screen opacity-70 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ) : (
              <span className="text-muted-foreground/40 font-display font-semibold text-xs tracking-wide whitespace-nowrap hover:text-muted-foreground/70 transition-colors duration-300">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
