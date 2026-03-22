import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
    Activity, 
    TrendingUp, 
    BarChart3, 
    Timer, 
    Calendar, 
    ChevronRight, 
    Flag, 
    Award 
} from 'lucide-react';
import type { OnboardingData } from '../../pages/OnboardWizardPage';

interface ProfileViewProps {
    data: OnboardingData;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ data }) => {
    return (
        <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700 font-['Lexend']">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">Training Dashboard</h1>
                    <p className="text-on-surface-variant font-medium text-lg">Welcome back, {data.name}.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <div className="text-on-surface font-black tracking-tight text-lg">{data.name}</div>
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 font-bold tracking-widest uppercase">
                            VDOT 42.0
                        </Badge>
                    </div>
                    <Avatar className="h-14 w-14 rounded-2xl border border-outline-variant/20 shadow-[0px_8px_16px_rgba(0,0,0,0.06)]">
                        <AvatarImage src={data.avatar || ''} className="object-cover" />
                        <AvatarFallback className="bg-surface-container-lowest text-primary font-black text-xl">
                            {data.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="bg-surface-container-lowest border border-outline-variant/10 p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors shadow-[0px_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_32px_rgba(0,90,180,0.08)]">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
                        <Activity size={80} />
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant mb-4">
                        <Activity size={18} />
                        <span className="text-sm font-bold tracking-widest uppercase">Training Status</span>
                    </div>
                    <div className="text-4xl font-black tracking-tighter text-on-surface mb-2">Base Phase</div>
                    <div className="text-primary text-sm flex items-center gap-1 font-bold">
                        <TrendingUp size={16} strokeWidth={3} /> On Track
                    </div>
                </Card>

                <Card className="bg-surface-container-lowest border border-outline-variant/10 p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors shadow-[0px_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_32px_rgba(0,90,180,0.08)]">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
                        <BarChart3 size={80} />
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant mb-4">
                        <BarChart3 size={18} />
                        <span className="text-sm font-bold tracking-widest uppercase">Weekly Volume</span>
                    </div>
                    <div className="text-4xl font-black tracking-tighter text-on-surface mb-2">
                        {data.volume === 'low' ? '12 km' : '28 km'}
                    </div>
                    <div className="text-on-surface-variant text-sm font-medium">Target for this training block</div>
                </Card>

                <Card className="bg-surface-container-lowest border border-outline-variant/10 p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors shadow-[0px_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_32px_rgba(0,90,180,0.08)]">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
                        <Timer size={80} />
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant mb-4">
                        <Timer size={18} />
                        <span className="text-sm font-bold tracking-widest uppercase">Next Run</span>
                    </div>
                    <div className="text-4xl font-black tracking-tighter text-on-surface mb-2">Tomorrow</div>
                    <div className="text-on-surface-variant text-sm font-medium">45min Threshold Session</div>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col: Upcoming Schedule */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-black tracking-tight text-on-surface flex items-center gap-3">
                        <Calendar size={24} className="text-primary" />
                        Upcoming Workouts
                    </h2>

                    <Card className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.04)]">
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-5 p-4 rounded-xl hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant/20 cursor-pointer">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col items-center justify-center">
                                        <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">Oct</span>
                                        <span className="text-on-surface font-black text-lg">{14 + i}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-on-surface font-black tracking-tight text-lg mb-0.5">
                                            {i === 1 ? 'Long Run' : 'Recovery Run'}
                                        </h4>
                                        <p className="text-on-surface-variant text-sm font-medium">
                                            {i === 1 ? '15km @ 5:45/km' : '8km @ 6:15/km'}
                                        </p>
                                    </div>
                                    <ChevronRight size={20} className="text-outline-variant" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Col: Race Goal */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-black tracking-tight text-on-surface flex items-center gap-3">
                        <Flag size={24} className="text-primary" />
                        Primary Goal
                    </h2>

                    <Card className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 h-fit shadow-[0px_4px_24px_rgba(0,0,0,0.04)]">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Award size={36} />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight text-on-surface mb-2">
                                {data.race_name || 'Marathon Training'}
                            </h3>
                            <p className="text-on-surface-variant text-sm font-medium mb-8">
                                {data.race_date ? new Date(data.race_date).toLocaleDateString() : 'No date set'}
                            </p>

                            <div className="w-full bg-surface-container-highest rounded-full h-3 mb-3 overflow-hidden border border-outline-variant/10">
                                <div className="kinetic-gradient w-1/4 h-full shadow-[0px_0px_8px_rgba(0,90,180,0.4)]" />
                            </div>
                            <div className="flex justify-between w-full text-xs font-bold tracking-widest uppercase text-on-surface-variant">
                                <span>Week 1</span>
                                <span>Week 16</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
