import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dumbbell, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PhaseArchitecture: React.FC = () => {
    return (
        <section className="py-32 px-8 bg-surface">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl text-left">
                        <h2 className="text-5xl font-black tracking-tighter text-on-surface mb-6">Phase Architecture</h2>
                        <p className="text-lg text-on-surface-variant font-medium">Training isn't linear. Our engine maps your race cycles through four distinct physiological training blocks.</p>
                    </div>
                    <div className="h-1 w-32 bg-primary"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Base Phase */}
                    <Card className="md:col-span-2 bg-white border-none shadow-[0px_4px_24px_rgba(0,0,0,0.04)] group hover:shadow-[0px_24px_48px_rgba(0,90,180,0.08)] transition-all flex flex-col justify-between min-h-[400px] text-left">
                        <CardHeader className="p-10 pb-0">
                            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-8 transition-transform group-hover:scale-110">
                                <Dumbbell className="h-8 w-8" />
                            </div>
                            <CardTitle className="text-3xl font-black mb-4">Base Phase</CardTitle>
                            <CardDescription className="text-on-surface-variant leading-relaxed text-base">
                                The structural foundation. High volume, low intensity aerobic engine development designed for skeletal durability during your initial training block.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 flex items-center justify-between mt-12">
                            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">01 / Structural Integrity</span>
                            <div className="w-12 h-[2px] bg-primary"></div>
                        </CardContent>
                    </Card>

                    {/* Build Phase */}
                    <Card className="bg-white border-none shadow-[0px_4px_24px_rgba(0,0,0,0.04)] group hover:shadow-[0px_24px_48px_rgba(0,90,180,0.08)] transition-all flex flex-col justify-between text-left">
                        <CardHeader className="p-10 pb-0">
                            <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-6 transition-transform group-hover:scale-110">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-2xl font-black mb-3">Build Phase</CardTitle>
                            <CardDescription className="text-sm text-on-surface-variant leading-relaxed">
                                Increasing load and introducing anaerobic thresholds to prepare for your target paces.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 mt-8">
                            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-tertiary w-1/3"></div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Specific Phase */}
                    <Card className="bg-white border-none shadow-[0px_4px_24px_rgba(0,0,0,0.04)] group hover:shadow-[0px_24px_48px_rgba(0,90,180,0.08)] transition-all flex flex-col justify-between text-left">
                        <CardHeader className="p-10 pb-0">
                            <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container mb-6 transition-transform group-hover:scale-110">
                                <Target className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-2xl font-black mb-3">Specific Phase</CardTitle>
                            <CardDescription className="text-sm text-on-surface-variant leading-relaxed">
                                Race-pace simulations and event-specific mechanics tailored to your race cycle.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 mt-8 flex justify-end">
                            <ArrowRight className="text-primary-container opacity-20 group-hover:opacity-100 transition-opacity" />
                        </CardContent>
                    </Card>

                    {/* Taper Phase */}
                    <Card className="md:col-span-4 bg-on-background border-none text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative p-0">
                        <div className="md:w-1/2 z-10 text-left p-12">
                            <div className="text-primary font-bold mb-4 uppercase tracking-[0.2em] text-sm">The Final Sprint</div>
                            <h3 className="text-5xl font-black tracking-tighter mb-6">Peak Taper Phase</h3>
                            <p className="text-white/70 text-lg mb-8">
                                Systemic recovery meets muscular sharpness. We calculate the exact mathematical intersection of fatigue and fitness to ensure you're at 100% marathon readiness.
                            </p>
                            <Button 
                                variant="secondary" 
                                className="bg-white text-on-background px-8 py-6 rounded-full font-bold active:scale-95 transition-transform hover:bg-slate-100 border-none"
                            >
                                Unlock Potential
                            </Button>
                        </div>
                        <div className="md:w-1/2 relative h-full min-h-[300px] w-full">
                            <img 
                                alt="Medal and finish line" 
                                className="absolute inset-0 w-full h-full object-cover opacity-40" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4_Zn72e_jQeZ92YEnOyjtjeRGnvpWwSAxBAXZjQtOlgC7E0w-Mg7vEgkziVusEk72_JkAJKijAgdUXvam41QDugkGNAs5YsMqpDdKERKFvRFDQ9QF4UOSgTaN1gWsOml7kUfRFWyrGxT9yImrsbLuYBntC7KqfOe64rdYFuAUFe5Ifo-de56FxCTIdoOLpOqgJTs6QMSxxpE6CXfCI4khOz0jmQ934Kr8QU97QStHGjvCmZwRk0TYA14YauRPKkOyPFZTB3e0WQ" 
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};
