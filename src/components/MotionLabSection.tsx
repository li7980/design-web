import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Move } from 'lucide-react';
import { Language, UI_COPY } from '../data/portfolioData';

interface MotionLabSectionProps {
  lang: Language;
}

type GridDensity = 16 | 32 | 48;
type PhysicsPreset = 'crisp' | 'fluid' | 'magnetic';

export function MotionLabSection({ lang }: MotionLabSectionProps) {
  const [gridDensity, setGridDensity] = useState<GridDensity>(32);
  const [preset, setPreset] = useState<PhysicsPreset>('fluid');
  const [resetKey, setResetKey] = useState(0);
  const [activeTile, setActiveTile] = useState<string>('dial');
  const [dialAngle, setDialAngle] = useState<number>(45);
  const [toggleState, setToggleState] = useState<boolean>(true);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const springConfig =
    preset === 'crisp'
      ? { type: 'spring' as const, stiffness: 520, damping: 38, mass: 0.8 }
      : preset === 'fluid'
      ? { type: 'spring' as const, stiffness: 280, damping: 24, mass: 1 }
      : { type: 'spring' as const, stiffness: 180, damping: 16, mass: 1.2 };

  const gridClass =
    gridDensity === 16
      ? 'bg-arch-grid-16'
      : gridDensity === 48
      ? 'bg-arch-grid-48'
      : 'bg-arch-grid';

  return (
    <section id="motion-lab" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Control Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-medium text-[#2563EB] mb-2">
                {UI_COPY.labSection.eyebrow[lang]}
              </p>
              <h2
                className="font-display font-bold text-2xl md:text-3xl text-[#0F172A] tracking-tight leading-snug mb-4"
                style={{ textWrap: 'balance' }}
              >
                {UI_COPY.labSection.title[lang]}
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                {UI_COPY.labSection.description[lang]}
              </p>
            </div>

            {/* Grid Density Selector */}
            <div className="space-y-2.5">
              <div className="text-xs font-medium text-[#0F172A]">
                {UI_COPY.labSection.gridDensityLabel[lang]}
              </div>
              <div className="inline-flex p-1 bg-[#E2E8F0]/75 rounded-xl border border-[#E2E8F0]">
                {([16, 32, 48] as GridDensity[]).map((size) => {
                  const active = gridDensity === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setGridDensity(size)}
                      className={`relative px-4 py-2 text-xs font-mono-tabular font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active ? 'text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="gridDensityActive"
                          transition={springConfig}
                          className="absolute inset-0 bg-white rounded-lg border border-[#CBD5E1]/75"
                        />
                      )}
                      <span className="relative z-10">{size}px</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Motion Damping Preset */}
            <div className="space-y-2.5">
              <div className="text-xs font-medium text-[#0F172A]">
                {UI_COPY.labSection.physicsLabel[lang]}
              </div>
              <div className="flex flex-wrap gap-2">
                {UI_COPY.labSection.presets.map((item) => {
                  const active = preset === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPreset(item.id as PhysicsPreset)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#0F172A] text-white border-[#0F172A]'
                          : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#94A3B8] hover:text-[#0F172A]'
                      }`}
                    >
                      {item.label[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Positions */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setResetKey((k) => k + 1);
                  setDialAngle(45);
                  setToggleState(true);
                  setActiveTile('dial');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#0F172A] bg-white border border-[#CBD5E1] hover:border-[#0F172A] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{UI_COPY.labSection.resetLabel[lang]}</span>
              </button>
            </div>
          </div>

          {/* Right Interactive Flat Grid Stage */}
          <div className="lg:col-span-7">
            <div
              ref={constraintsRef}
              className={`relative min-h-[420px] md:min-h-[460px] rounded-2xl border border-[#CBD5E1] bg-white ${gridClass} overflow-hidden p-5 md:p-7 flex flex-col justify-between`}
            >
              {/* Top Stage Metadata */}
              <div className="flex items-center justify-between text-xs font-mono-tabular text-[#64748B] pointer-events-none">
                <span>
                  {lang === 'zh' ? '可拖拽画布模块' : 'Draggable Flat Modules'}
                </span>
                <span>
                  {gridDensity}px · {preset}
                </span>
              </div>

              {/* Draggable Flat Modules Grid */}
              <div
                key={resetKey}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto py-4"
              >
                {/* Module 1: Rotary Dial Control */}
                <motion.div
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.14}
                  dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
                  whileHover={{ y: -2 }}
                  whileDrag={{ scale: 1.02, zIndex: 20 }}
                  transition={springConfig}
                  onPointerDown={() => setActiveTile('dial')}
                  className={`p-5 rounded-xl bg-white border cursor-grab active:cursor-grabbing select-none transition-colors ${
                    activeTile === 'dial' ? 'border-[#2563EB]' : 'border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-[#0F172A]">
                      {lang === 'zh' ? '步进旋钮模块' : 'Detent Rotary'}
                    </span>
                    <Move className="w-3.5 h-3.5 text-[#94A3B8]" />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDialAngle((prev) => (prev + 45) % 360);
                      }}
                      aria-label="Rotate flat dial 45 degrees"
                      className="relative w-14 h-14 rounded-full bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#2563EB] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <motion.div
                        animate={{ rotate: dialAngle }}
                        transition={springConfig}
                        className="w-full h-full flex items-start justify-center pt-1.5"
                      >
                        <span className="w-1.5 h-3 rounded-full bg-[#2563EB]" />
                      </motion.div>
                    </button>
                    <div className="text-right">
                      <div className="font-mono-tabular text-xl font-bold text-[#0F172A]">
                        {dialAngle}°
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        {lang === 'zh' ? '点击旋转 +45°' : 'Click +45° Step'}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Module 2: Tactile Flat Switch */}
                <motion.div
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.14}
                  dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
                  whileHover={{ y: -2 }}
                  whileDrag={{ scale: 1.02, zIndex: 20 }}
                  transition={springConfig}
                  onPointerDown={() => setActiveTile('switch')}
                  className={`p-5 rounded-xl bg-white border cursor-grab active:cursor-grabbing select-none transition-colors ${
                    activeTile === 'switch' ? 'border-[#2563EB]' : 'border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-[#0F172A]">
                      {lang === 'zh' ? '阻尼开关切换' : 'Tactile Switch'}
                    </span>
                    <Move className="w-3.5 h-3.5 text-[#94A3B8]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={toggleState}
                      onClick={(e) => {
                        e.stopPropagation();
                        setToggleState((s) => !s);
                      }}
                      className={`w-14 h-8 p-1 rounded-lg border transition-colors cursor-pointer flex items-center ${
                        toggleState
                          ? 'bg-[#2563EB] border-[#2563EB] justify-end'
                          : 'bg-[#F1F5F9] border-[#CBD5E1] justify-start'
                      }`}
                    >
                      <motion.span
                        layout
                        transition={springConfig}
                        className="w-6 h-6 bg-white rounded-md"
                      />
                    </button>
                    <span className="font-mono-tabular text-xs font-medium text-[#475569]">
                      {toggleState
                        ? lang === 'zh'
                          ? '已锁定网格'
                          : 'Grid Locked'
                        : lang === 'zh'
                        ? '自由浮动'
                        : 'Free Float'}
                    </span>
                  </div>
                </motion.div>

                {/* Module 3: 60-30-10 Daylight Palette */}
                <motion.div
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.14}
                  dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
                  whileHover={{ y: -2 }}
                  whileDrag={{ scale: 1.02, zIndex: 20 }}
                  transition={springConfig}
                  onPointerDown={() => setActiveTile('palette')}
                  className={`p-5 rounded-xl bg-white border cursor-grab active:cursor-grabbing select-none transition-colors ${
                    activeTile === 'palette' ? 'border-[#2563EB]' : 'border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#0F172A]">
                      {lang === 'zh' ? '60-30-10 浅色色阶' : '60-30-10 Daylight Ratio'}
                    </span>
                    <Move className="w-3.5 h-3.5 text-[#94A3B8]" />
                  </div>
                  <div className="flex h-7 rounded-md overflow-hidden border border-[#E2E8F0]">
                    <div className="w-[60%] bg-[#F8FAFC]" title="60% Canvas" />
                    <div className="w-[30%] bg-[#E2E8F0]" title="30% Surface" />
                    <div className="w-[10%] bg-[#2563EB]" title="10% Accent" />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono-tabular text-[#64748B]">
                    <span>#F8FAFC</span>
                    <span>#E2E8F0</span>
                    <span className="text-[#2563EB]">#2563EB</span>
                  </div>
                </motion.div>

                {/* Module 4: Vector Typography Specimen */}
                <motion.div
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.14}
                  dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
                  whileHover={{ y: -2 }}
                  whileDrag={{ scale: 1.02, zIndex: 20 }}
                  transition={springConfig}
                  onPointerDown={() => setActiveTile('type')}
                  className={`p-5 rounded-xl bg-white border cursor-grab active:cursor-grabbing select-none transition-colors ${
                    activeTile === 'type' ? 'border-[#2563EB]' : 'border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#0F172A]">
                      {lang === 'zh' ? '双语排版标尺' : 'Bilingual Type Scale'}
                    </span>
                    <Move className="w-3.5 h-3.5 text-[#94A3B8]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-[#0F172A] tracking-tight">
                    Aa 永
                  </div>
                  <div className="mt-1 text-[11px] font-mono-tabular text-[#64748B]">
                    Plus Jakarta · Noto Sans SC
                  </div>
                </motion.div>
              </div>

              {/* Bottom Stage Guidance */}
              <div className="text-xs text-[#64748B] flex items-center justify-between border-t border-[#E2E8F0] pt-3 bg-white/80">
                <span>
                  {lang === 'zh'
                    ? '提示：可直接拖动任意卡片，或点击旋钮与开关测试阻尼曲线'
                    : 'Tip: Drag any flat module across the grid or click controls to feel the spring preset'}
                </span>
                <span className="font-mono-tabular text-[#2563EB] shrink-0">60fps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
