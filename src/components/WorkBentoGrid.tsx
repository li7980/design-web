import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import {
  Language,
  PROJECTS,
  ProjectCategory,
  ProjectItem,
  UI_COPY,
} from '../data/portfolioData';
import { SafeImage } from './SafeImage';

interface WorkBentoGridProps {
  lang: Language;
  onSelectProject: (project: ProjectItem) => void;
}

export function WorkBentoGrid({ lang, onSelectProject }: WorkBentoGridProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="py-16 md:py-24 bg-[#05070E] border-b border-[#1E263D]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section Header + Agile Filter Segmented Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium text-[#7DD3FC] mb-2 tracking-wide">
              {UI_COPY.workSection.eyebrow[lang]}
            </p>
            <h2
              className="font-display font-bold text-[#F8FAFC] tracking-tight text-2xl md:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              {UI_COPY.workSection.title[lang]}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#0C1222] rounded-xl border border-[#1E263D] self-start md:self-auto"
          >
            {UI_COPY.workSection.filters.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 460, damping: 28 }}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg hover:rounded-full transition-[border-radius,color] duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] ${
                    isActive ? 'text-[#F8FAFC]' : 'text-[#94A3B8] hover:text-[#7DD3FC]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="workFilterActive"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-[#172038] rounded-lg border border-[#7DD3FC]/45"
                    />
                  )}
                  <span className="relative z-10">{tab.label[lang]}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isFeatured = activeFilter === 'all' && project.featured;
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={`group flex flex-col bg-[#0C1222]/90 border border-[#1E263D] hover:border-[#7DD3FC]/60 rounded-2xl overflow-hidden transition-colors duration-200 ${
                    isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="flex flex-col h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7DD3FC]"
                  >
                    {/* Media Frame */}
                    <div
                      className={`relative w-full overflow-hidden bg-[#090D19] border-b border-[#1E263D] ${
                        isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      }`}
                    >
                      <SafeImage
                        src={project.image}
                        alt={project.title[lang]}
                        title={project.title[lang]}
                        className="w-full h-full object-cover brightness-[0.92] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>

                    {/* Content Body */}
                    <div className="flex flex-col flex-1 justify-between p-6 md:p-7">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8] font-mono-tabular mb-3">
                          <span className="text-[#7DD3FC] font-medium">{project.index}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-sans">{project.categoryLabel[lang]}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-sans">{project.location}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.year}</span>
                        </div>

                        <h3 className="font-display font-semibold text-lg md:text-xl text-[#F8FAFC] group-hover:text-[#7DD3FC] transition-colors duration-150 mb-2.5 leading-snug tracking-[0.01em]">
                          {project.title[lang]}
                        </h3>

                        <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                          {project.summary[lang]}
                        </p>
                      </div>

                      {/* Bottom quantitative strip + morphing action cue */}
                      <div className="pt-4 border-t border-[#1E263D] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          {project.metrics.slice(0, 2).map((m) => (
                            <div key={m.value} className="flex items-baseline gap-1.5">
                              <span className="font-mono-tabular text-sm font-semibold text-[#F8FAFC]">
                                {m.value}
                              </span>
                              <span className="text-xs text-[#64748B]">
                                {m.label[lang]}
                              </span>
                            </div>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg group-hover:rounded-full bg-[#131B30] group-hover:bg-gradient-to-r group-hover:from-[#7DD3FC] group-hover:to-[#A78BFA] text-xs font-medium text-[#CBD5E1] group-hover:text-[#05070E] border border-[#1E263D] group-hover:border-[#7DD3FC] transition-all duration-200 whitespace-nowrap shrink-0">
                          <span className="hidden sm:inline">{UI_COPY.workSection.viewCase[lang]}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
