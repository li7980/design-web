import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { Language, UI_COPY } from '../data/portfolioData';

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
    <footer id="contact-footer" className="bg-white pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Top CTA Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#E2E8F0]">
          <div>
            <p className="text-xs font-medium text-[#2563EB] mb-2">
              {UI_COPY.footer.tagline[lang]}
            </p>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-[#0F172A] tracking-tight">
              hello@soralin.design
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-medium text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#0F172A] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-[#2563EB]">{UI_COPY.footer.copied[lang]}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#64748B]" />
                  <span>{UI_COPY.footer.copyEmail[lang]}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-medium text-white bg-[#0F172A] hover:bg-[#2563EB] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{UI_COPY.ctaPrimary[lang]}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Live International Timezones */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[#64748B]">
          <div>{UI_COPY.footer.rights[lang]}</div>

          <div className="flex flex-wrap items-center gap-6 font-mono-tabular">
            <span>ZRH {times.zurich}</span>
            <span>SHA {times.shanghai}</span>
            <span>TYO {times.tokyo}</span>
          </div>

          <div className="flex items-center gap-6 font-medium text-[#475569]">
            <a
              href="#work"
              className="hover:text-[#0F172A] transition-colors whitespace-nowrap"
            >
              {UI_COPY.nav.work[lang]}
            </a>
            <a
              href="#capabilities"
              className="hover:text-[#0F172A] transition-colors whitespace-nowrap"
            >
              {UI_COPY.nav.capabilities[lang]}
            </a>
            <a
              href="#motion-lab"
              className="hover:text-[#0F172A] transition-colors whitespace-nowrap"
            >
              {UI_COPY.nav.lab[lang]}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
