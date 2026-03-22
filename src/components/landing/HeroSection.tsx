import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from 'react-oidc-context';

export const HeroSection: React.FC = () => {
    const auth = useAuth();

    return (
        <section className="relative min-h-[921px] flex items-center px-8 overflow-hidden bg-white pt-16">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 z-10">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-sm font-bold tracking-widest uppercase mb-8">
                        Precision Performance
                    </div>
                    <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] text-on-surface mb-8">
                        Stop Guessing.<br />
                        <span className="text-primary italic">Start Peaking.</span>
                    </h1>
                    <p className="text-xl text-on-surface-variant max-w-xl mb-12 font-medium leading-relaxed">
                        The ultimate engineering suite for competitive athletes. Automate your training blocks and achieve marathon readiness with target-pace optimization.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button 
                            onClick={() => auth.signinRedirect()}
                            className="px-8 py-6 rounded-full kinetic-gradient text-on-primary font-bold text-lg shadow-[0px_24px_48px_rgba(0,90,180,0.15)] active:scale-95 transition-transform hover:opacity-90"
                        >
                            Build Your Course
                        </Button>
                        <Button variant="secondary" className="px-8 py-6 rounded-full bg-surface-container-high text-primary font-bold text-lg active:scale-95 transition-transform hover:bg-surface-container-highest">
                            View Demo
                        </Button>
                    </div>
                </div>
                <div className="lg:col-span-5 relative">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-[0px_48px_96px_rgba(0,90,180,0.12)] bg-surface-container-low group">
                        <img alt="Athlete training" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwMoq2Pmnr-n42PSVOi_5d1ZZisCuTnQDiIqgq7KWKRQzMZcPbZT0fsgQicoHVTFmiacC_25z9l7lQB1Dbkk9Qb1zDabiTtGYfLcVvAnltKllTiM4zMaP_K2JrAli5G2S9ymr0oJX-D-E5lbOOt0q1GKuVyg1GNHWzPScEdQxmlOVlzcioeATsjZmjsquZzWhzWk2qJtAAm83SUYkpi2Z8th_h-jCDBjb92P_iSbVHI4V3InUM8nZMoV7zxXCgc7rDv4zAb3hRVQ" />
                        <div className="absolute top-8 -right-4 bg-white p-6 rounded-lg shadow-xl max-w-[200px] border border-outline-variant/20">
                            <div className="text-tertiary font-black text-3xl mb-1">98.4%</div>
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Marathon Readiness</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-fixed/20 rounded-full blur-[120px]"></div>
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-tertiary-fixed/20 rounded-full blur-[100px]"></div>
        </section>
    );
};
