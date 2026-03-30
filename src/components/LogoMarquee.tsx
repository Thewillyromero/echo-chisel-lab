import logoReputationLoop from "@/assets/logos/reputation-loop.png";
import logoMonitronics from "@/assets/logos/monitronics.png";
import logoInvictus from "@/assets/logos/invictus-advisors.png";
import logoRehab from "@/assets/logos/rehab-system.png";
import logoHartmetall from "@/assets/logos/hartmetall-usa.png";
import logoConveyAll from "@/assets/logos/convey-all.png";
import logoBeyondGroup from "@/assets/logos/beyondgrouptravel.png";
import logoAvian from "@/assets/logos/avian-digital.png";
import logoTutor from "@/assets/logos/tutor-doctor.png";
import logoIntelligent from "@/assets/logos/intelligent-office.png";
import logoEasyMobile from "@/assets/logos/easymobile.png";
import logoMcKenzie from "@/assets/logos/mckenzie-law.png";
import logoCornerstone from "@/assets/logos/cornerstone.png";
import logoRedRoot from "@/assets/logos/redroot.png";

const logos = [
  { name: "Reputation Loop", logo: logoReputationLoop },
  { name: "Monitronics Security", logo: logoMonitronics },
  { name: "Invictus Advisors", logo: logoInvictus },
  { name: "Rehab System", logo: logoRehab },
  { name: "Tutor Doctor", logo: logoTutor },
  { name: "Hartmetall USA", logo: logoHartmetall },
  { name: "Convey-All Industries", logo: logoConveyAll },
  { name: "BeyondGroupTravel", logo: logoBeyondGroup },
  { name: "Avian Digital", logo: logoAvian },
  { name: "Intelligent Office", logo: logoIntelligent },
  { name: "EasyMobile", logo: logoEasyMobile },
  { name: "McKenzie Law", logo: logoMcKenzie },
  { name: "Cornerstone", logo: logoCornerstone },
  { name: "RedRoot", logo: logoRedRoot },
  { name: "Tesla Energy", logo: null },
  { name: "Houwzer", logo: null },
  { name: "COX Business", logo: null },
  { name: "USHealth Group", logo: null },
  { name: "Kobe Digital", logo: null },
  { name: "Direct Public Funding", logo: null },
  { name: "Capify", logo: null },
  { name: "Legend Solar", logo: null },
];

const LogoMarquee = () => {
  const tripled = [...logos, ...logos, ...logos];

  return (
    <section className="py-6 md:py-10 border-y border-border/10 overflow-hidden relative">
      {/* Stronger edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee items-center">
        {tripled.map((item, i) => (
          <div
            key={i}
            className="mx-6 md:mx-10 flex items-center justify-center min-w-[100px] md:min-w-[140px] shrink-0 group"
          >
            {item.logo ? (
              <div className="relative py-2">
                {/* Soft glow behind logo */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
                    transform: "scale(2.5)",
                    filter: "blur(12px)",
                  }}
                />
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-7 md:h-8 w-auto object-contain max-w-[120px] relative z-10 transition-all duration-700 opacity-35 group-hover:opacity-75 grayscale group-hover:grayscale-0"
                  style={{
                    filter: "brightness(1.8) contrast(0.9)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "brightness(1.2) contrast(1) drop-shadow(0 0 8px hsl(217 91% 60% / 0.3))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "brightness(1.8) contrast(0.9)";
                  }}
                  loading="lazy"
                />
              </div>
            ) : (
              <span className="text-muted-foreground/15 font-display font-bold text-[11px] tracking-widest whitespace-nowrap uppercase group-hover:text-muted-foreground/40 transition-all duration-700 relative">
                {item.name}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, hsl(217 91% 60% / 0.06) 0%, transparent 70%)",
                    transform: "scale(3)",
                    filter: "blur(8px)",
                  }}
                />
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
