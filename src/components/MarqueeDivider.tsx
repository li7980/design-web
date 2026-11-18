import { Language, UI_COPY } from '../data/portfolioData';

interface MarqueeDividerProps {
  lang: Language;
}

export function MarqueeDivider({ lang }: MarqueeDividerProps) {
  const items = UI_COPY.marqueeItems[lang];
  const track = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden bg-[#080C17] border-b border-[#1E263D] py-3.5 select-none"
    >
      <div className="animate-marquee flex items-center gap-8 text-xs md:text-sm font-medium text-[#94A3B8] tracking-wide">
        {track.map((phrase, idx) => (
          <span key={`${phrase}-${idx}`} className="flex items-center gap-8 whitespace-nowrap">
            <span>{phrase}</span>
            <span className="text-[#7DD3FC]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
