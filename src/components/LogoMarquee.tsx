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
  { name: "Direct Public Funding", logo: null },
  { name: "Capify", logo: null },
  { name: "Dental 101", logo: null },
  { name: "Advanced Plumbing", logo: null },
  { name: "Tesla Energy", logo: null },
  { name: "Houwzer", logo: null },
  { name: "COX Business", logo: null },
  { name: "USHealth Group", logo: null },
  { name: "Kobe Digital", logo: null },
  { name: "Northwest Lighting", logo: null },
];

const LogoMarquee = () => {
  const tripled = [...logos, ...logos, ...logos];

  return (
    <section className="py-5 md:py-8 border-y border-border/10 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee items-center">
        {tripled.map((item, i) => (
          <div
            key={i}
            className="mx-5 md:mx-8 flex items-center justify-center min-w-[100px] md:min-w-[130px] shrink-0 group"
          >
            {item.logo ? (
              <div className="relative">
                {/* Glow behind logo */}
                <div className="absolute inset-0 bg-white/[0.04] rounded-lg blur-xl scale-150 group-hover:bg-white/[0.08] transition-all duration-500" />
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-8 md:h-9 w-auto object-contain max-w-[100px] relative z-10 opacity-50 group-hover:opacity-80 transition-all duration-500"
                  style={{
                    filter: "brightness(2) grayscale(1) contrast(0.8)",
                    mixBlendMode: "screen",
                  }}
                  loading="lazy"
                />
              </div>
            ) : (
              <span className="text-muted-foreground/20 font-display font-semibold text-xs tracking-wide whitespace-nowrap group-hover:text-muted-foreground/40 transition-colors duration-500">
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
