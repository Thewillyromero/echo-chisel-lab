export const TrustpilotStar = ({ size = 20, filled = true }: { size?: number; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" rx="2" fill={filled ? "#00b67a" : "#dcdce6"} />
    <path d="M10 3.5l1.95 4.1 4.35.6-3.15 3.05.75 4.35L10 13.35 6.1 15.6l.75-4.35L3.7 8.2l4.35-.6L10 3.5z" fill="#fff" fillOpacity={filled ? 1 : 0.3} />
  </svg>
);

export const TrustpilotStars = ({ rating = 5, size = 20, count = 5 }: { rating?: number; size?: number; count?: number }) => {
  const full = Math.floor(rating);
  const partial = rating % 1 > 0;
  return (
    <div className="flex items-center" style={{ gap: '2px' }}>
      {[...Array(count)].map((_, i) => {
        if (i < full) return <TrustpilotStar key={i} size={size} filled />;
        if (i === full && partial) return (
          <div key={i} className="relative" style={{ width: size, height: size }}>
            <TrustpilotStar size={size} filled={false} />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}><TrustpilotStar size={size} filled /></div>
          </div>
        );
        return <TrustpilotStar key={i} size={size} filled={false} />;
      })}
    </div>
  );
};
