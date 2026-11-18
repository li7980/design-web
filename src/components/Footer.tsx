import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { Language, UI_COPY } from '../data/portfolioData';
import { TechButton } from './TechButton';

interface FooterProps {
  lang: Language;
  onOpenContact: () => void;
}

function getCityTimes() {
  const now = new Date();
  const format = (tz: string) =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);

  return {
    zurich: format('Europe/Zurich'),
    shanghai: format('Asia/Shanghai'),
    tokyo: format('Asia/Tokyo'),
  };
}

export function Footer({ lang, onOpenContact }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const [times, setTimes] = useState(getCityTimes);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimes(getCityTimes());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('hello@soralin.design').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact-footer" className="bg-[#080C17] pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Top CTA Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#1E263D]">
          <div>
            <p className="text-xs font-medium text-[#7DD3FC] mb-2 tracking-wide">
              {UI_COPY.footer.tagline[lang]}
            </p>
            <h2 className="font-display font-bold text-2xl md:text-4xl bg-gradient-to-r from-[#F8FAFC] via-[#E2E8F0] to-[#94A3B8] bg-clip-text text-transparent tracking-tight">
              hello@soralin.design
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <TechButton
              variant="secondary"
              onClick={handleCopyEmail}
              className="px-4 py-3 text-xs md:text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#7DD3FC]" />
                  <span className="text-[#7DD3FC]">{UI_COPY.footer.copied[lang]}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#94A3B8] group-hover:text-[#7DD3FC] transition-colors" />
                  <span>{UI_COPY.footer.copyEmail[lang]}</span>
                </>
              )}
            </TechButton>

            <TechButton
              variant="primary"
              onClick={onOpenContact}
              className="px-5 py-3 text-xs md:text-sm"
            >
              <span>{UI_COPY.ctaPrimary[lang]}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </TechButton>
          </div>
        </div>

        {/* Bottom Metadata & Live International Timezones */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[#64748B]">
          <div>{UI_COPY.footer.rights[lang]}</div>

          <div className="flex flex-wrap items-center gap-6 font-mono-tabular text-[#94A3B8]">
            <span>ZRH {times.zurich}</span>
            <span>SHA {times.shanghai}</span>
            <span>TYO {times.tokyo}</span>
          </div>

          <div className="flex items-center gap-6 font-medium text-[#94A3B8]">
            <a
              href="#work"
              className="hover:text-[#7DD3FC] transition-colors whitespace-nowrap"
            >
              {UI_COPY.nav.work[lang]}
            </a>
            <a
              href="#capabilities"
              className="hover:text-[#7DD3FC] transition-colors whitespace-nowrap"
            >
              {UI_COPY.nav.capabilities[lang]}
            </a>
            <a
              href="#motion-lab"
              className="hover:text-[#7DD3FC] transition-colors whitespace-nowrap"
            >
              {UI_COPY.nav.lab[lang]}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
