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
  { name: "RedRoot", logo: logoRedRoot },
  { name: "Hartmetall USA", logo: logoHartmetall },
  { name: "Convey-All Industries", logo: logoConveyAll },
  { name: "BeyondGroupTravel", logo: logoBeyondGroup },
  { name: "Avian Digital", logo: logoAvian },
  { name: "Tutor Doctor", logo: logoTutor },
  { name: "Intelligent Office", logo: logoIntelligent },
  { name: "EasyMobile", logo: logoEasyMobile },
  { name: "McKenzie Law Firm", logo: logoMcKenzie },
  { name: "Cornerstone Hospitality", logo: logoCornerstone },
];

const LogoMarquee = () => {
  return (
    <section className="py-10 border-y border-border/15 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {[...logos, ...logos].map((item, i) => (
          <div
            key={i}
            className="mx-8 flex items-center min-w-[100px] shrink-0"
          >
            <img
              src={item.logo}
              alt={item.name}
              className="h-8 w-auto object-contain opacity-80 max-w-[100px]"
              loading="lazy"
              style={{ background: 'transparent' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;