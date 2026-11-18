import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Language, ProjectItem } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeDivider } from './components/MarqueeDivider';
import { WorkBentoGrid } from './components/WorkBentoGrid';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { MotionLabSection } from './components/MotionLabSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
        <Navbar lang={lang} onOpenContact={() => setIsContactOpen(true)} />

        <main className="flex-1">
          <HeroSection lang={lang} onChangeLang={setLang} />
          <MarqueeDivider lang={lang} />
          <WorkBentoGrid lang={lang} onSelectProject={setSelectedProject} />
          <CapabilitiesSection lang={lang} />
          <MotionLabSection lang={lang} />
        </main>

        <Footer lang={lang} onOpenContact={() => setIsContactOpen(true)} />

        <CaseStudyModal
          project={selectedProject}
          lang={lang}
          onClose={() => setSelectedProject(null)}
          onSelectProject={setSelectedProject}
        />

        <ContactModal
          isOpen={isContactOpen}
          lang={lang}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
