import { FormEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';
import { Language, UI_COPY } from '../data/portfolioData';
import { TechButton } from './TechButton';

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
          className="fixed inset-0 z-50 bg-[#020308]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
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
            className="w-full max-w-[580px] bg-[#080C17] border border-[#1E263D] rounded-2xl overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[#1E263D] bg-[#05070E]">
              <div>
                <h2
                  id="contact-modal-title"
                  className="font-display font-bold text-xl text-[#F8FAFC]"
                >
                  {UI_COPY.contactModal.title[lang]}
                </h2>
                <p className="text-xs md:text-sm text-[#94A3B8] mt-1">
                  {UI_COPY.contactModal.subtitle[lang]}
                </p>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                onClick={handleResetAndClose}
                aria-label="Close contact dialog"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:rounded-full border border-[#1E263D] hover:border-[#7DD3FC] bg-[#0C1222] text-[#94A3B8] hover:text-[#7DD3FC] transition-[border-radius,color,border-color] duration-200 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-5">
                <div className="mx-auto w-12 h-12 rounded-xl bg-[#7DD3FC]/15 border border-[#7DD3FC]/40 flex items-center justify-center text-[#7DD3FC]">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-lg text-[#F8FAFC]">
                    {UI_COPY.contactModal.successTitle[lang]}
                  </h3>
                  <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                    {UI_COPY.contactModal.successBody[lang]}
                  </p>
                </div>
                <TechButton
                  variant="primary"
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 text-sm"
                >
                  {UI_COPY.contactModal.doneBtn[lang]}
                </TechButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
                {/* Project Scope */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-[#E2E8F0]">
                    {UI_COPY.contactModal.scopeLabel[lang]}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {UI_COPY.contactModal.scopes.map((item) => {
                      const active = scope === item.id;
                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setScope(item.id)}
                          className={`px-3 py-2.5 text-xs font-medium border text-left transition-[border-radius,background-color,border-color,color] duration-200 cursor-pointer ${
                            active
                              ? 'bg-[#7DD3FC]/12 border-[#7DD3FC] text-[#7DD3FC] rounded-[16px]'
                              : 'bg-[#05070E] border-[#1E263D] text-[#94A3B8] rounded-lg hover:rounded-[16px] hover:border-[#7DD3FC]/60 hover:text-[#F8FAFC]'
                          }`}
                        >
                          {item.label[lang]}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-[#E2E8F0]">
                    {UI_COPY.contactModal.timelineLabel[lang]}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {UI_COPY.contactModal.timelines.map((item) => {
                      const active = timeline === item.id;
                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setTimeline(item.id)}
                          className={`px-3 py-2 text-xs font-medium border text-center transition-[border-radius,background-color,border-color,color] duration-200 cursor-pointer ${
                            active
                              ? 'bg-gradient-to-r from-[#7DD3FC] to-[#A78BFA] border-[#7DD3FC] text-[#05070E] rounded-full'
                              : 'bg-[#05070E] border-[#1E263D] text-[#94A3B8] rounded-lg hover:rounded-full hover:border-[#7DD3FC]/60 hover:text-[#F8FAFC]'
                          }`}
                        >
                          {item.label[lang]}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[#E2E8F0]">
                      {UI_COPY.contactModal.nameLabel[lang]}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={UI_COPY.contactModal.namePlaceholder[lang]}
                      className="w-full px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#475569] bg-[#05070E] border border-[#1E263D] focus:border-[#7DD3FC] focus:bg-[#0C1222] rounded-lg outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#E2E8F0]">
                      {UI_COPY.contactModal.emailLabel[lang]}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={UI_COPY.contactModal.emailPlaceholder[lang]}
                      className="w-full px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#475569] bg-[#05070E] border border-[#1E263D] focus:border-[#7DD3FC] focus:bg-[#0C1222] rounded-lg outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-brief" className="block text-xs font-medium text-[#E2E8F0]">
                    {UI_COPY.contactModal.briefLabel[lang]}
                  </label>
                  <textarea
                    id="contact-brief"
                    rows={3}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder={UI_COPY.contactModal.briefPlaceholder[lang]}
                    className="w-full px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#475569] bg-[#05070E] border border-[#1E263D] focus:border-[#7DD3FC] focus:bg-[#0C1222] rounded-lg outline-none transition-colors resize-none"
                  />
                </div>

                <TechButton
                  type="submit"
                  variant="primary"
                  className="w-full py-3 px-5 text-sm"
                >
                  {UI_COPY.contactModal.submitBtn[lang]}
                </TechButton>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
