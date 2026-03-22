import React from 'react';

export const StatsSection: React.FC = () => {
    return (
        <section className="py-32 px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 items-center">
                <div className="text-center md:text-left">
                    <div className="text-9xl font-black text-primary/10 mb-[-2rem] leading-none">01</div>
                    <div className="relative">
                        <h4 className="text-4xl font-black mb-4 tracking-tighter leading-tight">Biometric<br />Integration</h4>
                        <p className="text-on-surface-variant">Seamlessly sync with top-tier wearables to feed our AI engine real-time recovery data for your training block.</p>
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <div className="text-9xl font-black text-tertiary/10 mb-[-2rem] leading-none">02</div>
                    <div className="relative">
                        <h4 className="text-4xl font-black mb-4 tracking-tighter leading-tight">Adaptive<br />V-Score</h4>
                        <p className="text-on-surface-variant">A dynamic performance metric that updates after every interval, tempo run, and recovery session to ensure marathon readiness.</p>
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <div className="text-9xl font-black text-primary-container/10 mb-[-2rem] leading-none">03</div>
                    <div className="relative">
                        <h4 className="text-4xl font-black mb-4 tracking-tighter leading-tight">Architect<br />Feedback</h4>
                        <p className="text-on-surface-variant">Automated coaching notes derived from 10,000+ elite athlete data points across complete race cycles.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
