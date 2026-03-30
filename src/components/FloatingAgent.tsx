interface Props {
  src: string;
  position: "left" | "right";
  color: string;
  size?: string;
}

const FloatingAgent = ({ src, position, color, size = "w-20 md:w-28" }: Props) => (
  <div className={`relative pointer-events-none hidden lg:block ${position === "left" ? "float-left -ml-4 md:ml-8" : "float-right -mr-4 md:mr-8"}`}>
    <div className="relative">
      <div className="absolute inset-0 rounded-full blur-2xl opacity-20 scale-150" style={{ background: color }} />
      <img
        src={src}
        alt=""
        className={`${size} object-contain animate-float drop-shadow-2xl opacity-30 hover:opacity-60 transition-opacity duration-700 relative z-10`}
        loading="lazy"
      />
    </div>
  </div>
);

export default FloatingAgent;
