import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronRight, Zap } from 'lucide-react';

interface Activity {
    id: string;
    type: string;
    name: string;
    date: string;
    distance: string;
    duration: string;
    vScore: number;
}

interface ActivityFeedProps {
    activities: Activity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
    return (
        <Card className="rounded-sm border shadow-sm">
            <CardHeader className="pb-4 border-b">
                <CardTitle className="text-xl font-black tracking-tight">Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y">
                    {activities.map((activity) => (
                        <div key={activity.id} className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-sm flex items-center justify-center text-slate-600">
                                    <Zap className="w-5 h-5 fill-current" />
                                </div>
                                <div>
                                    <p className="text-sm font-black tracking-tight">{activity.name}</p>
                                    <p className="text-xs font-medium text-slate-400">{activity.date} • {activity.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-black tracking-tight">{activity.distance}</p>
                                    <p className="text-xs font-medium text-slate-400">{activity.duration}</p>
                                </div>
                                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-sm text-xs font-black">
                                    V {activity.vScore}
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
