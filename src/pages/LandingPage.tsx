import React from 'react';
import { LandingNavBar } from '@/components/landing/LandingNavBar';
import { HeroSection } from '@/components/landing/HeroSection';
import { PhaseArchitecture } from '@/components/landing/PhaseArchitecture';
import { StatsSection } from '@/components/landing/StatsSection';
import { CtaSection } from '@/components/landing/CtaSection';
import { LandingFooter } from '@/components/landing/LandingFooter';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen text-on-surface font-sans selection:bg-primary-container selection:text-white overflow-x-hidden light">
            <LandingNavBar />
            <main>
                <HeroSection />
                <PhaseArchitecture />
                <StatsSection />
                <CtaSection />
            </main>
            <LandingFooter />
        </div>
    );
};

export default LandingPage;
