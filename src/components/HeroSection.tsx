import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ArrowRight, Globe } from 'lucide-react';
import { HERO_IMAGE, Language, UI_COPY } from '../data/portfolioData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
}

export function HeroSection({ lang, onChangeLang }: HeroSectionProps) {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  return (
    <section className="pt-8 pb-14 md:pt-12 md:pb-20 border-b border-[#E2E8F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Inline workspace utility bar: unboxed geographic context + bilingual segmented switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5 text-xs md:text-sm text-[#475569] font-medium">
            <Globe className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span>{UI_COPY.hero.locationLine[lang]}</span>
          </div>

          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center p-1 bg-[#E2E8F0]/70 rounded-lg border border-[#E2E8F0]"
          >
            {(['zh', 'en'] as Language[]).map((code) => {
              const active = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onChangeLang(code)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    active ? 'text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="langSwitchBg"
                      transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                      className="absolute inset-0 bg-white rounded-md border border-[#CBD5E1]/70"
                    />
                  )}
                  <span className="relative z-10">{code === 'zh' ? '中文' : 'EN'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split Hero (items-stretch for equal visual height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between py-2"
          >
            <div>
              <h1
                className="font-display font-bold text-[#0F172A] tracking-tight leading-[1.12] mb-6"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                  textWrap: 'balance',
                }}
              >
                {UI_COPY.hero.headline[lang]}
              </h1>

              <p className="text-base md:text-lg text-[#475569] leading-[1.65] max-w-[54ch] mb-10">
                {UI_COPY.hero.lead[lang]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                <span>{UI_COPY.hero.exploreBtn[lang]}</span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              <a
                href="#motion-lab"
                className="group inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#0F172A] bg-white border border-[#CBD5E1] hover:border-[#0F172A] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <span>{UI_COPY.hero.labBtn[lang]}</span>
                <ArrowRight className="w-4 h-4 text-[#64748B] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#0F172A]" />
              </a>
            </div>
          </motion.div>

          {/* Right column: Full-height flat architectural visual frame with live precision coordinate reticle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setCoords({
                  x: Math.round(e.clientX - rect.left),
                  y: Math.round(e.clientY - rect.top),
                });
              }}
              onMouseLeave={() => setCoords(null)}
              className="relative h-full min-h-[300px] lg:min-h-[420px] rounded-2xl overflow-hidden border border-[#CBD5E1] bg-white group"
            >
              <SafeImage
                src={HERO_IMAGE}
                alt={UI_COPY.hero.canvasCaption[lang]}
                title={UI_COPY.hero.canvasCaption[lang]}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />

              {/* Subtle flat geometric crosshair tracking cursor inside frame */}
              {coords && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden md:block"
                >
                  <div
                    className="absolute top-0 bottom-0 w-px bg-[#2563EB]/25"
                    style={{ transform: `translateX(${coords.x}px)` }}
                  />
                  <div
                    className="absolute left-0 right-0 h-px bg-[#2563EB]/25"
                    style={{ transform: `translateY(${coords.y}px)` }}
                  />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 border border-[#E2E8F0] rounded text-[11px] font-mono-tabular text-[#0F172A]"
                  >
                    X:{coords.x} · Y:{coords.y}
                  </div>
                </div>
              )}

              {/* Bottom caption strip */}
              <div className="absolute inset-x-0 bottom-0 bg-white/92 backdrop-blur-xs border-t border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#334155] truncate">
                  {UI_COPY.hero.canvasCaption[lang]}
                </span>
                <span className="text-xs font-mono-tabular text-[#64748B] shrink-0">
                  16:9 · 8px Grid
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width 4-column Impact Metrics Row directly below Hero split */}
        <div className="mt-12 md:mt-16 pt-10 border-t border-[#E2E8F0] grid grid-cols-2 lg:grid-cols-4 gap-8">
          {UI_COPY.metrics.map((metric, idx) => (
            <div
              key={metric.value}
              className={`${
                idx !== 0 ? 'lg:border-l lg:border-[#E2E8F0] lg:pl-8' : ''
              }`}
            >
              <div className="font-display font-mono-tabular text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">
                {metric.value}
              </div>
              <div className="mt-2 text-sm font-medium text-[#0F172A]">
                {metric.label[lang]}
              </div>
              <div className="mt-1 text-xs text-[#64748B]">
                {metric.context[lang]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
