import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Language, PROJECTS, ProjectItem, UI_COPY } from '../data/portfolioData';
import { SafeImage } from './SafeImage';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export function CaseStudyModal({
  project,
  lang,
  onClose,
  onSelectProject,
}: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs'>('overview');

  useEffect(() => {
    if (!project) return;
    setActiveTab('overview');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const currentIdx = project ? PROJECTS.findIndex((p) => p.id === project.id) : 0;
  const prevProject = PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#020308]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1040px] max-h-[90vh] bg-[#080C17] border border-[#1E263D] rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#1E263D] bg-[#05070E] shrink-0">
              <div className="flex items-center gap-2.5 text-xs text-[#94A3B8] font-mono-tabular truncate">
                <span className="text-[#7DD3FC] font-semibold">{project.index}</span>
                <span aria-hidden="true">·</span>
                <span className="font-sans text-[#F8FAFC] font-medium truncate">
                  {project.client}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-sans hidden sm:inline">{project.location}</span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>{project.year}</span>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                aria-label={UI_COPY.modal.closeHint[lang]}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:rounded-full border border-[#1E263D] hover:border-[#7DD3FC] bg-[#0C1222] text-[#94A3B8] hover:text-[#7DD3FC] transition-[border-radius,color,border-color] duration-200 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* High-Res Media */}
                <div className="lg:col-span-7 rounded-xl overflow-hidden border border-[#1E263D] bg-[#0C1222]">
                  <SafeImage
                    src={project.image}
                    alt={project.title[lang]}
                    title={project.title[lang]}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>

                {/* Header + Metrics + Tab Switcher */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    <p className="text-xs font-medium text-[#7DD3FC] mb-2">
                      {project.categoryLabel[lang]}
                    </p>
                    <h2
                      id="case-study-title"
                      className="font-display font-bold text-2xl md:text-3xl text-[#F8FAFC] tracking-tight leading-snug mb-3"
                    >
                      {project.title[lang]}
                    </h2>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {project.summary[lang]}
                    </p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 pt-4 border-t border-[#1E263D]">
                    {project.metrics.map((m) => (
                      <div key={m.value}>
                        <div className="font-mono-tabular text-xl font-bold text-[#F8FAFC]">
                          {m.value}
                        </div>
                        <div className="text-xs text-[#64748B] mt-0.5">
                          {m.label[lang]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Detail Tab Control */}
                  <div className="inline-flex p-1 bg-[#05070E] rounded-xl border border-[#1E263D] self-start">
                    {(['overview', 'specs'] as const).map((tab) => {
                      const active = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveTab(tab)}
                          className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg hover:rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                            active ? 'text-[#F8FAFC]' : 'text-[#64748B] hover:text-[#7DD3FC]'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="modalDetailTab"
                              transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                              className="absolute inset-0 bg-[#172038] rounded-lg border border-[#7DD3FC]/45"
                            />
                          )}
                          <span className="relative z-10">
                            {tab === 'overview'
                              ? UI_COPY.modal.overviewTab[lang]
                              : UI_COPY.modal.specsTab[lang]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#1E263D]">
                  <div className="p-5 bg-[#0C1222] border border-[#1E263D] rounded-xl">
                    <h3 className="text-xs font-semibold text-[#F8FAFC] mb-2">
                      01. {UI_COPY.modal.challenge[lang]}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {project.challenge[lang]}
                    </p>
                  </div>
                  <div className="p-5 bg-[#0C1222] border border-[#1E263D] rounded-xl">
                    <h3 className="text-xs font-semibold text-[#F8FAFC] mb-2">
                      02. {UI_COPY.modal.architecture[lang]}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {project.architecture[lang]}
                    </p>
                  </div>
                  <div className="p-5 bg-[#0C1222] border border-[#1E263D] rounded-xl">
                    <h3 className="text-xs font-semibold text-[#7DD3FC] mb-2">
                      03. {UI_COPY.modal.outcome[lang]}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {project.outcome[lang]}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="pt-6 border-t border-[#1E263D]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {project.specs.map((spec) => (
                      <div
                        key={spec.value}
                        className="p-4 bg-[#0C1222] border border-[#1E263D] rounded-xl"
                      >
                        <div className="text-xs text-[#64748B] mb-1.5">
                          {spec.key[lang]}
                        </div>
                        <div className="font-mono-tabular text-sm font-medium text-[#F8FAFC]">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between gap-4 px-6 py-3.5 border-t border-[#1E263D] bg-[#05070E] shrink-0">
              <motion.button
                type="button"
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSelectProject(prevProject)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg hover:rounded-full hover:bg-[#172038] text-xs md:text-sm font-medium text-[#94A3B8] hover:text-[#7DD3FC] transition-all duration-200 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{UI_COPY.modal.prev[lang]}</span>
              </motion.button>

              <span className="text-xs font-mono-tabular text-[#64748B]">
                {project.index} / 0{PROJECTS.length}
              </span>

              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSelectProject(nextProject)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg hover:rounded-full hover:bg-[#172038] text-xs md:text-sm font-medium text-[#94A3B8] hover:text-[#7DD3FC] transition-all duration-200 cursor-pointer"
              >
                <span>{UI_COPY.modal.next[lang]}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
