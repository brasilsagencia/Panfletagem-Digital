import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExplainerVideoModal } from './components/ExplainerVideoModal';
import { ComparisonSection } from './components/ComparisonSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { MetaAdsPackageSection } from './components/MetaAdsPackageSection';
import { GeoCoverageSection } from './components/GeoCoverageSection';
import { ReachCalculatorSection } from './components/ReachCalculatorSection';
import { MultiStepFormSection } from './components/MultiStepFormSection';
import { MiniCrmModal } from './components/MiniCrmModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Lead, getStoredLeads } from './utils/crm';

export default function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isCrmModalOpen, setIsCrmModalOpen] = useState<boolean>(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Tijuca / Maracanã');
  const [chosenBudget, setChosenBudget] = useState<number>(399);

  useEffect(() => {
    // Load leads from storage or demo seed
    setLeads(getStoredLeads());
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleZoneSelectedFromMap = (zoneName: string) => {
    setSelectedNeighborhood(zoneName);
    scrollToForm();
  };

  const handleApplyCalculatorPlan = (budget: number, nicheId: string) => {
    setChosenBudget(budget);
    scrollToForm();
  };

  const handleLeadCreated = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#060A12] text-slate-100 flex flex-col font-sans selection:bg-[#FF6B00] selection:text-white">
      {/* Navbar with CRM access & active RJ status */}
      <Navbar
        onOpenCrm={() => setIsCrmModalOpen(true)}
        crmLeadCount={leads.length}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section with 3D Price Card & Interactive 3D Phone Mockup */}
        <HeroSection
          onOpenVideo={() => setIsVideoModalOpen(true)}
          onScrollToForm={scrollToForm}
        />

        {/* Section 2: Comparison - Paper vs Digital & Waste Calculator */}
        <ComparisonSection
          onScrollToForm={scrollToForm}
        />

        {/* Section 3: 4-Step Process with Holographic Numbers */}
        <HowItWorksSection
          onScrollToForm={scrollToForm}
        />

        {/* Section 3.5: Pacote Aceleração 7D Meta Ads (Hyperframes / Remotion Motion Graphics) */}
        <MetaAdsPackageSection
          onScrollToForm={scrollToForm}
          onSelectPackage={(pkgName) => {
            setChosenBudget(399);
            scrollToForm();
          }}
        />

        {/* Section 4: Geo-Coverage Interactive RJ Map */}
        <GeoCoverageSection
          onSelectZone={handleZoneSelectedFromMap}
        />

        {/* Section 5: Reach Calculator Micro-Tool */}
        <ReachCalculatorSection
          onApplyPlan={handleApplyCalculatorPlan}
        />

        {/* Section 6: Interactive Multi-Step Form with CRM & WhatsApp Redirection */}
        <MultiStepFormSection
          initialNeighborhood={selectedNeighborhood}
          initialBudget={chosenBudget}
          onLeadCreated={handleLeadCreated}
        />

        {/* Section 7: Structured FAQ for AEO/SEO */}
        <FaqSection />
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer
        onScrollToTop={scrollToTop}
        onScrollToForm={scrollToForm}
      />

      {/* Cinematic Explainer Video Modal */}
      <ExplainerVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSelectPackage={() => {
          setIsVideoModalOpen(false);
          scrollToForm();
        }}
      />

      {/* Mini-CRM Drawer Modal for Lead Tracking */}
      <MiniCrmModal
        isOpen={isCrmModalOpen}
        onClose={() => setIsCrmModalOpen(false)}
        leads={leads}
        onLeadsChange={setLeads}
      />
    </div>
  );
}
