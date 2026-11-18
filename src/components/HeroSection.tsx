import { motion } from 'motion/react';
import { ArrowDownRight, ArrowRight, Atom, Network } from 'lucide-react';
import { Language, UI_COPY } from '../data/portfolioData';
import { ParticleGlobe } from './ParticleGlobe';
import { TechButton } from './TechButton';

interface HeroSectionProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
}

export function HeroSection({ lang, onChangeLang }: HeroSectionProps) {
  const headlineLine1 = lang === 'zh' ? '构建面向未来的' : 'DESIGNING';
  const headlineLine2 = lang === 'zh' ? '全球数字交互系统' : 'THE FUTURE';

  const heroCards = [
    {
      index: '01.',
      title: lang === 'zh' ? '跨国设计系统网络' : 'Global Design Systems',
      desc:
        lang === 'zh'
          ? '覆盖多语种排版与高对比度规范的模块化组件架构，统一欧美与亚太产品体验。'
          : 'Multi-script typography tokens and modular components unifying interfaces across 14 global markets.',
      href: '#work',
      progress: '68%',
      Icon: Network,
    },
    {
      index: '02.',
      title: lang === 'zh' ? '精密硬件与动态交互' : 'Motion & Hardware UI',
      desc:
        lang === 'zh'
          ? '结合物理旋钮阻尼感与 GPU 合成层微动画，打造零延迟的直观科技人机界面。'
          : 'Tactile rotary hardware displays and sub-120ms spring physics engineered for zero-lag comprehension.',
      href: '#motion-lab',
      progress: '82%',
      Icon: Atom,
    },
  ];

  return (
    <section className="relative pt-6 pb-14 md:pt-10 md:pb-20 border-b border-[#1E263D] bg-[#05070E] bg-cosmic-stars overflow-hidden">
      {/* Subtle atmospheric cosmic nebula gradients matching reference composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[8%] w-[640px] h-[520px] rounded-full bg-[#7DD3FC]/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-[12%] w-[520px] h-[380px] rounded-full bg-[#818CF8]/10 blur-[130px]"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Inline workspace utility bar: bilingual segmented switcher */}
        <div className="flex flex-wrap items-center justify-end gap-4 pb-6 mb-6 border-b border-[#1E263D]/70">
          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center p-1 bg-[#0C1222] rounded-xl border border-[#1E263D]"
          >
            {(['zh', 'en'] as Language[]).map((code) => {
              const active = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onChangeLang(code)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg hover:rounded-full transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] ${
                    active ? 'text-[#F8FAFC]' : 'text-[#64748B] hover:text-[#7DD3FC]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="langSwitchBg"
                      transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                      className="absolute inset-0 bg-[#172038] rounded-lg border border-[#7DD3FC]/45"
                    />
                  )}
                  <span className="relative z-10">{code === 'zh' ? '中文' : 'EN'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split Hero: Stacked Display Headline Left + Interactive 3D Particle Globe Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center py-4"
          >
            <h1
              className="font-display tracking-[-0.015em] leading-[1.08] mb-6"
              style={{
                fontSize: 'clamp(2.4rem, 4.4vw, 4rem)',
                textWrap: 'balance',
              }}
            >
              <span className="block font-light text-[#E2E8F0] tracking-[0.04em]">
                {headlineLine1}
              </span>
              <span className="block font-bold bg-gradient-to-r from-[#7DD3FC] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent mt-1">
                {headlineLine2}
              </span>
            </h1>

            <p className="text-sm md:text-base text-[#94A3B8] leading-[1.75] max-w-[50ch] mb-9 tracking-[0.01em]">
              {UI_COPY.hero.lead[lang]}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <TechButton
                href="#work"
                variant="primary"
                className="px-6 py-3.5 text-sm"
              >
                <span>{UI_COPY.hero.exploreBtn[lang]}</span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </TechButton>

              <TechButton
                href="#motion-lab"
                variant="secondary"
                className="px-5 py-3.5 text-sm"
              >
                <span>{UI_COPY.hero.labBtn[lang]}</span>
                <ArrowRight className="w-4 h-4 text-[#94A3B8] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#7DD3FC]" />
              </TechButton>
            </div>
          </motion.div>

          {/* Right column: Interactive 3D Dotted Particle Globe & Orbital Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <ParticleGlobe lang={lang} />
          </motion.div>
        </div>

        {/* Two signature dark cosmic feature cards directly below hero split (matching screenshot) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {heroCards.map((card) => {
            const Icon = card.Icon;
            return (
              <motion.a
                key={card.index}
                href={card.href}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                className="group block p-6 bg-[#0C1222]/85 hover:bg-[#11192E] border border-[#1E263D] hover:border-[#7DD3FC]/55 rounded-xl transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-display font-semibold text-base md:text-lg text-[#F8FAFC] group-hover:text-[#7DD3FC] transition-colors">
                    <span className="font-mono-tabular text-[#7DD3FC] mr-2">{card.index}</span>
                    {card.title}
                  </h2>
                  <Icon className="w-5 h-5 text-[#818CF8] group-hover:text-[#7DD3FC] transition-colors shrink-0 mt-0.5 stroke-[1.6]" />
                </div>

                <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed mb-5">
                  {card.desc}
                </p>

                {/* Thin horizontal cosmic gradient progress accent bar */}
                <div className="h-[3px] w-full bg-[#172038] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7DD3FC] to-[#A78BFA] transition-all duration-300 group-hover:w-full"
                    style={{ width: card.progress }}
                  />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Full-width 4-column Impact Metrics Row */}
        <div className="mt-10 pt-8 border-t border-[#1E263D] grid grid-cols-2 lg:grid-cols-4 gap-8">
          {UI_COPY.metrics.map((metric, idx) => (
            <div
              key={metric.value}
              className={`${
                idx !== 0 ? 'lg:border-l lg:border-[#1E263D] lg:pl-8' : ''
              }`}
            >
              <div className="font-display font-mono-tabular text-2xl md:text-3xl font-bold text-[#F8FAFC] tracking-tight">
                {metric.value}
              </div>
              <div className="mt-1.5 text-sm font-medium text-[#E2E8F0]">
                {metric.label[lang]}
              </div>
              <div className="mt-0.5 text-xs text-[#64748B]">
                {metric.context[lang]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
