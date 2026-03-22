import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Flag } from 'lucide-react';
import type { OnboardingData } from '../../pages/OnboardWizardPage';

interface SummaryCardProps {
    data: OnboardingData;
    onGenerate: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ data, onGenerate }) => {
    return (
        <div className="animate-in fade-in zoom-in duration-500 font-['Lexend'] w-full max-w-md">
            <Card className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 text-center relative overflow-hidden shadow-[0px_24px_48px_rgba(0,0,0,0.06)]">
                {/* Header Gradient */}
                <div className="absolute top-0 left-0 w-full h-2 kinetic-gradient" />
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full" />

                <div className="relative z-10">
                    <Avatar className="w-20 h-20 mx-auto rounded-2xl border-2 border-primary/20 mb-6">
                        <AvatarImage src={data.avatar || ''} className="object-cover" />
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl font-black">
                            {data.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <h2 className="text-4xl font-black tracking-tighter text-on-surface mb-2">
                        Ready to go,<br/>{data.name.split(' ')[0]}!
                    </h2>
                    <p className="text-on-surface-variant font-medium mb-8">
                        We've set your initial VDOT to <span className="text-primary font-mono font-bold">42</span> based on your marathon readiness.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/10 shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
                            <div className="text-on-surface-variant text-xs font-bold tracking-widest uppercase mb-1">Target Pace</div>
                            <div className="text-on-surface font-mono text-lg font-bold">5:45 - 6:15</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/10 shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
                            <div className="text-on-surface-variant text-xs font-bold tracking-widest uppercase mb-1">Weekly Goal</div>
                            <div className="text-on-surface font-mono text-lg font-bold">25 km</div>
                        </div>
                    </div>

                    {data.race_date && (
                        <div className="mb-8 p-5 rounded-2xl bg-primary/5 border border-primary/20">
                            <div className="flex items-center justify-center gap-2 text-primary mb-2">
                                <Flag size={16} />
                                <span className="font-bold uppercase tracking-widest text-xs">Target Race</span>
                            </div>
                            <div className="text-on-surface font-black text-lg tracking-tight mb-1">
                                {data.race_name || 'Upcoming Race'}
                            </div>
                            <div className="text-on-surface-variant text-sm font-medium">
                                {new Date(data.race_date).toLocaleDateString()}
                            </div>
                        </div>
                    )}

                    <Button
                        onClick={onGenerate}
                        size="lg"
                        className="w-full py-7 kinetic-gradient text-white font-black tracking-tight text-lg rounded-2xl transition-all duration-300 shadow-[0px_12px_24px_rgba(0,90,180,0.2)] hover:shadow-[0px_16px_32px_rgba(0,90,180,0.3)] hover:-translate-y-1 active:scale-95"
                    >
                        Generate Training Block
                    </Button>
                </div>
            </Card>
        </div>
    );
};
