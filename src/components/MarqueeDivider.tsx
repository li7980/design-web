import { Language, UI_COPY } from '../data/portfolioData';

interface MarqueeDividerProps {
  lang: Language;
}

export function MarqueeDivider({ lang }: MarqueeDividerProps) {
  const items = UI_COPY.marqueeItems[lang];
  // Duplicate items twice for seamless infinite marquee loop
  const track = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden bg-white border-b border-[#E2E8F0] py-3.5 select-none"
    >
      <div className="animate-marquee flex items-center gap-8 text-xs md:text-sm font-medium text-[#64748B] tracking-wide">
        {track.map((phrase, idx) => (
          <span key={`${phrase}-${idx}`} className="flex items-center gap-8 whitespace-nowrap">
            <span>{phrase}</span>
            <span className="text-[#2563EB]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
