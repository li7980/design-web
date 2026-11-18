import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { CAPABILITIES, Language, UI_COPY } from '../data/portfolioData';

interface CapabilitiesSectionProps {
  lang: Language;
}

export function CapabilitiesSection({ lang }: CapabilitiesSectionProps) {
  const [openId, setOpenId] = useState<string>(CAPABILITIES[0].id);

  return (
    <section id="capabilities" className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Philosophy & Global Presence */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <p className="text-xs font-medium text-[#2563EB] mb-2">
              {UI_COPY.capabilitiesSection.eyebrow[lang]}
            </p>
            <h2
              className="font-display font-bold text-2xl md:text-3xl text-[#0F172A] tracking-tight leading-snug mb-5"
              style={{ textWrap: 'balance' }}
            >
              {UI_COPY.capabilitiesSection.title[lang]}
            </h2>
            <p className="text-sm md:text-base text-[#475569] leading-[1.7] mb-8">
              {UI_COPY.capabilitiesSection.philosophy[lang]}
            </p>

            <div className="pt-6 border-t border-[#E2E8F0]">
              <div className="text-xs font-medium text-[#64748B] mb-3">
                {UI_COPY.capabilitiesSection.trustedByLabel[lang]}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-display font-semibold text-[#0F172A]">
                {UI_COPY.capabilitiesSection.hubs.map((city, idx) => (
                  <span key={city} className="inline-flex items-center gap-4">
                    <span>{city}</span>
                    {idx < UI_COPY.capabilitiesSection.hubs.length - 1 && (
                      <span className="text-[#CBD5E1]" aria-hidden="true">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Expandable Capabilities Matrix */}
          <div className="lg:col-span-7 divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0]">
            {CAPABILITIES.map((cap) => {
              const isOpen = openId === cap.id;
              return (
                <div key={cap.id} className="py-5 md:py-6">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? '' : cap.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg py-1"
                  >
                    <div className="flex items-start gap-4 md:gap-5">
                      <span className="font-mono-tabular text-sm font-medium text-[#2563EB] pt-1 shrink-0">
                        {cap.index}
                      </span>
                      <div>
                        <h3 className="font-display font-semibold text-base md:text-lg text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-150">
                          {cap.title[lang]}
                        </h3>
                        <p className="text-xs md:text-sm text-[#64748B] mt-1">
                          {cap.subtitle[lang]}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`mt-1 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#E2E8F0] text-[#475569] group-hover:border-[#2563EB] group-hover:text-[#2563EB] transition-all duration-200 shrink-0 ${
                        isOpen ? 'bg-[#F8FAFC] rotate-45 text-[#2563EB] border-[#2563EB]/40' : 'bg-white'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-9 md:pl-11 pt-4 pb-1 space-y-4">
                          <p className="text-sm text-[#475569] leading-relaxed">
                            {cap.description[lang]}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-[#0F172A]">
                            {cap.deliverables[lang].map((item, idx) => (
                              <span key={item} className="inline-flex items-center gap-3">
                                <span>{item}</span>
                                {idx < cap.deliverables[lang].length - 1 && (
                                  <span className="text-[#2563EB]" aria-hidden="true">·</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
