/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Programs } from './components/Programs';
import { WhatIsDualEducation, ProgramDetails, CareerOpportunities, Instructors, FAQ, CTAAndFooter } from './components/Sections';
import { ApplicationModal } from './components/ApplicationModal';

export default function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [initialProgram, setInitialProgram] = useState<string | null>(null);

  const openApplyModal = (programId?: string) => {
    setInitialProgram(programId || null);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg">
      <Navbar onApplyClick={() => openApplyModal()} />
      <Hero onApplyClick={() => openApplyModal()} />
      <ProgramDetails />
      <WhatIsDualEducation />
      <Programs onApplyClick={(programId) => openApplyModal(programId)} />
      <CareerOpportunities />
      <Instructors />
      <FAQ onContactClick={() => openApplyModal()} />
      <CTAAndFooter onApplyClick={() => openApplyModal()} />

      <ApplicationModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
        initialProgram={initialProgram}
      />
    </div>
  );
}
