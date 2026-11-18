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
        className="fixed inset-0 z-50 bg-[#0F172A]/45 backdrop-blur-xs flex items-center justify-center p-4 md:p-8"
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
          className="relative w-full max-w-[1040px] max-h-[90vh] bg-white border border-[#CBD5E1] rounded-2xl overflow-hidden flex flex-col"
        >
          {/* Modal Top Header */}
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] shrink-0">
            <div className="flex items-center gap-2.5 text-xs text-[#64748B] font-mono-tabular truncate">
              <span className="text-[#2563EB] font-semibold">{project.index}</span>
              <span aria-hidden="true">·</span>
              <span className="font-sans text-[#0F172A] font-medium truncate">
                {project.client}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-sans hidden sm:inline">{project.location}</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>{project.year}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={UI_COPY.modal.closeHint[lang]}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] hover:text-[#0F172A] hover:border-[#94A3B8] transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* High-Res Media */}
              <div className="lg:col-span-7 rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#F1F5F9]">
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
                  <p className="text-xs font-medium text-[#2563EB] mb-2">
                    {project.categoryLabel[lang]}
                  </p>
                  <h2
                    id="case-study-title"
                    className="font-display font-bold text-2xl md:text-3xl text-[#0F172A] tracking-tight leading-snug mb-3"
                  >
                    {project.title[lang]}
                  </h2>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {project.summary[lang]}
                  </p>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 pt-4 border-t border-[#E2E8F0]">
                  {project.metrics.map((m) => (
                    <div key={m.value}>
                      <div className="font-mono-tabular text-xl font-bold text-[#0F172A]">
                        {m.value}
                      </div>
                      <div className="text-xs text-[#64748B] mt-0.5">
                        {m.label[lang]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detail Tab Control */}
                <div className="inline-flex p-1 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0] self-start">
                  {(['overview', 'specs'] as const).map((tab) => {
                    const active = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          active ? 'text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="modalDetailTab"
                            transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                            className="absolute inset-0 bg-white rounded-md border border-[#CBD5E1]/70"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E2E8F0]">
                <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <h3 className="text-xs font-semibold text-[#0F172A] mb-2">
                    01. {UI_COPY.modal.challenge[lang]}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {project.challenge[lang]}
                  </p>
                </div>
                <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <h3 className="text-xs font-semibold text-[#0F172A] mb-2">
                    02. {UI_COPY.modal.architecture[lang]}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {project.architecture[lang]}
                  </p>
                </div>
                <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <h3 className="text-xs font-semibold text-[#2563EB] mb-2">
                    03. {UI_COPY.modal.outcome[lang]}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {project.outcome[lang]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="pt-6 border-t border-[#E2E8F0]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {project.specs.map((spec) => (
                    <div
                      key={spec.value}
                      className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl"
                    >
                      <div className="text-xs text-[#64748B] mb-1.5">
                        {spec.key[lang]}
                      </div>
                      <div className="font-mono-tabular text-sm font-medium text-[#0F172A]">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between gap-4 px-6 py-3.5 border-t border-[#E2E8F0] bg-[#F8FAFC] shrink-0">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{UI_COPY.modal.prev[lang]}</span>
            </button>

            <span className="text-xs font-mono-tabular text-[#64748B]">
              {project.index} / 0{PROJECTS.length}
            </span>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              <span>{UI_COPY.modal.next[lang]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
