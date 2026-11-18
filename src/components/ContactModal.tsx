import { FormEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';
import { Language, UI_COPY } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export function ContactModal({ isOpen, lang, onClose }: ContactModalProps) {
  const [scope, setScope] = useState('system');
  const [timeline, setTimeline] = useState('4w');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setBrief('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 z-50 bg-[#0F172A]/45 backdrop-blur-xs flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[580px] bg-white border border-[#CBD5E1] rounded-2xl overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <div>
                <h2
                  id="contact-modal-title"
                  className="font-display font-bold text-xl text-[#0F172A]"
                >
                  {UI_COPY.contactModal.title[lang]}
                </h2>
                <p className="text-xs md:text-sm text-[#64748B] mt-1">
                  {UI_COPY.contactModal.subtitle[lang]}
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                aria-label="Close contact dialog"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-5">
                <div className="mx-auto w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/25 flex items-center justify-center text-[#2563EB]">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-lg text-[#0F172A]">
                    {UI_COPY.contactModal.successTitle[lang]}
                  </h3>
                  <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                    {UI_COPY.contactModal.successBody[lang]}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-[#0F172A] hover:bg-[#2563EB] rounded-xl transition-colors cursor-pointer"
                >
                  {UI_COPY.contactModal.doneBtn[lang]}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
                {/* Project Scope */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-[#0F172A]">
                    {UI_COPY.contactModal.scopeLabel[lang]}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {UI_COPY.contactModal.scopes.map((item) => {
                      const active = scope === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setScope(item.id)}
                          className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#2563EB]/8 border-[#2563EB] text-[#2563EB]'
                              : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#94A3B8]'
                          }`}
                        >
                          {item.label[lang]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-[#0F172A]">
                    {UI_COPY.contactModal.timelineLabel[lang]}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {UI_COPY.contactModal.timelines.map((item) => {
                      const active = timeline === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTimeline(item.id)}
                          className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#0F172A] border-[#0F172A] text-white'
                              : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#94A3B8]'
                          }`}
                        >
                          {item.label[lang]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[#0F172A]">
                      {UI_COPY.contactModal.nameLabel[lang]}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={UI_COPY.contactModal.namePlaceholder[lang]}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:bg-white rounded-lg outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#0F172A]">
                      {UI_COPY.contactModal.emailLabel[lang]}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={UI_COPY.contactModal.emailPlaceholder[lang]}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:bg-white rounded-lg outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-brief" className="block text-xs font-medium text-[#0F172A]">
                    {UI_COPY.contactModal.briefLabel[lang]}
                  </label>
                  <textarea
                    id="contact-brief"
                    rows={3}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder={UI_COPY.contactModal.briefPlaceholder[lang]}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:bg-white rounded-lg outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] rounded-xl transition-all duration-150 cursor-pointer"
                >
                  {UI_COPY.contactModal.submitBtn[lang]}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
