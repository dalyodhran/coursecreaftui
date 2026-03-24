import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Timer, Flag, MapPin } from 'lucide-react';

interface RaceGoalProps {
    raceName: string;
    raceDate: string;
    distance: string;
    targetPace: string;
}

export const RaceGoal: React.FC<RaceGoalProps> = ({ 
    raceName, 
    raceDate, 
    distance, 
    targetPace 
}) => {
    const daysRemaining = Math.ceil((new Date(raceDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return (
        <Card className="rounded-sm border shadow-sm">
            <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2 mb-1">
                    <Flag className="w-4 h-4 text-blue-700" />
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Primary Goal</p>
                </div>
                <CardTitle className="text-xl font-black tracking-tight">{raceName || 'Upcoming Event'}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-sm flex items-center justify-center">
                            <Timer className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Target Pace</p>
                            <p className="font-black tracking-tight">{targetPace || '--:-- min/km'}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Days to Peak</p>
                        <p className="text-2xl font-black text-blue-700">{daysRemaining > 0 ? daysRemaining : 0}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 border rounded-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Distance</p>
                        <p className="font-black tracking-tight flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> {distance || '-- km'}
                        </p>
                    </div>
                    <div className="bg-slate-50 p-4 border rounded-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Target Finish</p>
                        <p className="font-black tracking-tight text-blue-700">Sub 3:00:00</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
