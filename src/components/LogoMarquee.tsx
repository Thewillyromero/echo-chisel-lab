import logoReputationLoop from "@/assets/logos/reputation-loop.webp";
import logoMonitronics from "@/assets/logos/monitronics.webp";
import logoInvictus from "@/assets/logos/invictus-advisors.webp";
import logoRehab from "@/assets/logos/rehab-system.webp";
import logoHartmetall from "@/assets/logos/hartmetall-usa.webp";
import logoConveyAll from "@/assets/logos/convey-all.webp";
import logoBeyondGroup from "@/assets/logos/beyondgrouptravel.webp";
import logoAvian from "@/assets/logos/avian-digital.webp";
import logoTutor from "@/assets/logos/tutor-doctor.webp";
import logoIntelligent from "@/assets/logos/intelligent-office.webp";
import logoEasyMobile from "@/assets/logos/easymobile.webp";
import logoMcKenzie from "@/assets/logos/mckenzie-law.webp";
import logoCornerstone from "@/assets/logos/cornerstone.webp";
import logoRedRoot from "@/assets/logos/redroot.webp";
import logoCox from "@/assets/logos/cox-business.webp";
import logoNorthwest from "@/assets/logos/northwest-lighting.webp";
import logoAdvancedPlumbing from "@/assets/logos/advanced-plumbing.webp";
import logoMarketingAuto from "@/assets/logos/marketing-automation.webp";
import logoHouwzer from "@/assets/logos/houwzer.webp";
import logoCapify from "@/assets/logos/capify.webp";
import logoConsole from "@/assets/logos/console-hollawell.webp";
import logoUSHealth from "@/assets/logos/ushealth.webp";
import logoDLC from "@/assets/logos/dlc-consulting.webp";
import logoTesla from "@/assets/logos/tesla-energy.webp";
import logoThreeRivers from "@/assets/logos/three-rivers-dental.webp";
import logoCrowdfund from "@/assets/logos/crowdfund-mafia.webp";
import logoPCS from "@/assets/logos/pcs-software.webp";
import logoGeniusDen from "@/assets/logos/genius-den.webp";

const logos = [
  logoReputationLoop, logoMonitronics, logoCox, logoHartmetall,
  logoInvictus, logoRehab, logoPCS, logoAdvancedPlumbing,
  logoRedRoot, logoHouwzer, logoMcKenzie, logoNorthwest,
  logoConveyAll, logoCapify, logoCornerstone, logoBeyondGroup,
  logoUSHealth, logoGeniusDen, logoDLC, logoConsole,
  logoAvian, logoTutor, logoTesla, logoMarketingAuto,
  logoThreeRivers, logoIntelligent, logoEasyMobile, logoCrowdfund,
];

const LogoMarquee = () => {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-7 md:py-10 border-y border-white/[0.04] overflow-hidden relative bg-black/20" style={{ contain: 'layout style paint' }}>
      {/* Deep edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-28 md:w-52 bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 md:w-52 bg-gradient-to-l from-background via-background/90 to-transparent z-10 pointer-events-none" />

      {/* Subtle top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="flex animate-marquee items-center" style={{ willChange: 'transform' }}>
        {doubled.map((logo, i) => (
          <div
            key={i}
            className="mx-5 md:mx-10 flex items-center justify-center min-w-[80px] md:min-w-[130px] shrink-0 group cursor-default"
          >
            <div className="relative py-1">
              {/* Glow orb behind logo on hover */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, hsl(210 80% 65% / 0.12) 0%, hsl(210 80% 65% / 0.04) 50%, transparent 80%)",
                  filter: "blur(10px)",
                  transform: "translate(-50%, -50%) scale(1.8)",
                }}
              />
              <img
                src={logo}
                alt=""
                className="h-5 md:h-7 w-auto object-contain max-w-[90px] md:max-w-[130px] relative z-10 transition-all duration-700"
                style={{
                  opacity: 0.4,
                  filter: "grayscale(1) brightness(2.2) contrast(0.7)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = "0.85";
                  el.style.filter = "grayscale(0) brightness(1.3) contrast(1.05) drop-shadow(0 0 12px hsl(210 80% 65% / 0.25))";
                  el.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = "0.4";
                  el.style.filter = "grayscale(1) brightness(2.2) contrast(0.7)";
                  el.style.transform = "scale(1)";
                }}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
