import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TrainingOverviewProps {
    currentPhase: string;
    progressPercent: number;
    nextSession: {
        title: string;
        details: string;
    };
}

export const TrainingOverview: React.FC<TrainingOverviewProps> = ({ 
    currentPhase, 
    progressPercent, 
    nextSession 
}) => {
    return (
        <Card className="rounded-sm border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Training Block</p>
                    <CardTitle className="text-2xl font-black tracking-tight">{currentPhase}</CardTitle>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Block Progress</p>
                    <p className="text-xl font-black text-blue-700">{progressPercent}%</p>
                </div>
            </CardHeader>
            <CardContent>
                <Progress value={progressPercent} className="h-2 rounded-none mb-8" />
                
                <div className="bg-slate-50 border p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-700 rounded-sm flex items-center justify-center text-white">
                            <Play className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-0.5">Next Session</p>
                            <p className="text-lg font-black tracking-tight">{nextSession.title}</p>
                            <p className="text-sm font-medium text-slate-500">{nextSession.details}</p>
                        </div>
                    </div>
                    <Button variant="outline" className="gap-2 rounded-sm font-bold">
                        Details <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
