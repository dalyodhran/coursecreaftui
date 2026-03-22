import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dumbbell, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PhaseArchitecture: React.FC = () => {
    return (
        <section className="py-32 px-8 bg-surface">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl font-black tracking-tighter text-on-surface mb-6">Phase Architecture</h2>
                        <p className="text-lg text-on-surface-variant font-medium">Training isn't linear. Our engine maps your race cycles through four distinct physiological milestones.</p>
                    </div>
                    <div className="h-1 w-32 bg-primary"></div>
                </div>
                
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Base Phase */}
                    <Card className="md:col-span-2 bg-surface-container-lowest border-none shadow-[0px_4px_24px_rgba(0,0,0,0.04)] group hover:shadow-[0px_24px_48px_rgba(0,90,180,0.08)] transition-all flex flex-col justify-between min-h-[400px]">
                        <CardHeader>
                            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-8">
                                <Dumbbell className="h-8 w-8" />
                            </div>
                            <CardTitle className="text-3xl font-black mb-4">Base Phase</CardTitle>
                            <CardDescription className="text-on-surface-variant leading-relaxed text-base">
                                The structural foundation. High volume, low intensity aerobic engine development designed for durability in your early training block.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between mt-12 pb-10">
                            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">01 / Structural</span>
                            <div className="w-12 h-[2px] bg-primary-fixed-dim"></div>
                        </CardContent>
                    </Card>

                    {/* Build Phase */}
                    <Card className="bg-surface-container-lowest border-none shadow-[0px_4px_24px_rgba(0,0,0,0.04)] group hover:shadow-[0px_24px_48px_rgba(0,90,180,0.08)] transition-all flex flex-col justify-between min-h-[400px]">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-6">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-2xl font-black mb-3">Build Phase</CardTitle>
                            <CardDescription className="text-sm text-on-surface-variant leading-relaxed">
                                Increasing load and introducing anaerobic thresholds to prepare for target paces.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="mt-8 pb-10">
                            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-tertiary w-1/3"></div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Specific Phase */}
                    <Card className="bg-surface-container-lowest border-none shadow-[0px_4px_24px_rgba(0,0,0,0.04)] group hover:shadow-[0px_24px_48px_rgba(0,90,180,0.08)] transition-all flex flex-col justify-between min-h-[400px]">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container mb-6">
                                <Target className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-2xl font-black mb-3">Specific Phase</CardTitle>
                            <CardDescription className="text-sm text-on-surface-variant leading-relaxed">
                                Race-pace simulations and event-specific mechanics for your upcoming race cycle.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="mt-8 flex justify-end pb-10">
                            <ArrowRight className="text-primary-container opacity-20 group-hover:opacity-100 transition-opacity h-6 w-6" />
                        </CardContent>
                    </Card>

                    {/* Taper Phase */}
                    <Card className="md:col-span-4 bg-on-surface border-none text-white overflow-hidden relative">
                        <div className="flex flex-col md:flex-row items-center gap-12 p-12">
                            <div className="md:w-1/2 z-10">
                                <div className="text-primary font-bold mb-4 uppercase tracking-[0.2em] text-sm">The Final Sprint</div>
                                <h3 className="text-5xl font-black tracking-tighter mb-6">Peak Taper Phase</h3>
                                <p className="text-white/70 text-lg mb-8">
                                    Systemic recovery meets muscular sharpness. We calculate the exact mathematical intersection of fatigue and fitness to ensure you're on the line at 100% marathon readiness.
                                </p>
                                <Button variant="secondary" className="bg-white text-on-surface px-8 py-6 rounded-full font-bold active:scale-95 transition-transform hover:bg-slate-100">
                                    Unlock Potential
                                </Button>
                            </div>
                            <div className="md:w-1/2 relative h-64 w-full">
                                <img alt="Medal and finish line" className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4_Zn72e_jQeZ92YEnOyjtjeRGnvpWwSAxBAXZjQtOlgC7E0w-Mg7vEgkziVusEk72_JkAJKijAgdUXvam41QDugkGNAs5YsMqpDdKERKFvRFDQ9QF4UOSgTaN1gWsOml7kUfRFWyrGxT9yImrsbLuYBntC7KqfOe64rdYFuAUFe5Ifo-de56FxCTIdoOLpOqgJTs6QMSxxpE6CXfCI4khOz0jmQ934Kr8QU97QStHGjvCmZwRk0TYA14YauRPKkOyPFZTB3e0WQ" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};
