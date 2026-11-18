import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Language, UI_COPY } from '../data/portfolioData';
import { TechButton } from './TechButton';

interface NavbarProps {
  lang: Language;
  onOpenContact: () => void;
}

export function Navbar({ lang, onOpenContact }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '#work', label: UI_COPY.nav.work[lang] },
    { href: '#capabilities', label: UI_COPY.nav.capabilities[lang] },
    { href: '#motion-lab', label: UI_COPY.nav.lab[lang] },
    { href: '#contact-footer', label: UI_COPY.nav.contact[lang] },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#05070E]/85 backdrop-blur-md border-b border-[#1E263D]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#"
          className="font-display text-base md:text-lg font-bold tracking-wider text-[#F8FAFC] hover:text-[#7DD3FC] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] rounded-sm"
        >
          {UI_COPY.brand}
        </a>

        {/* Zone 2: 4 clean single-line nav links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-[#F8FAFC] transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-gradient-to-r after:from-[#7DD3FC] after:to-[#A78BFA] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary agile CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <TechButton
            variant="primary"
            onClick={onOpenContact}
            className="hidden sm:inline-flex px-4 py-2 text-xs md:text-sm"
          >
            {UI_COPY.ctaPrimary[lang]}
          </TechButton>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:rounded-full border border-[#1E263D] hover:border-[#7DD3FC] bg-[#0C1222] text-[#F1F5F9] hover:text-[#7DD3FC] transition-all duration-200 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1E263D] bg-[#090D19] px-6 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-[#CBD5E1] hover:text-[#7DD3FC] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <TechButton
            variant="primary"
            onClick={() => {
              setMobileOpen(false);
              onOpenContact();
            }}
            className="w-full py-2.5 px-4 text-sm"
          >
            {UI_COPY.ctaPrimary[lang]}
          </TechButton>
        </div>
      )}
    </header>
  );
}
