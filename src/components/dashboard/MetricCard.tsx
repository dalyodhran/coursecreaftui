import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    label: string;
    value: string | number;
    unit?: string;
    change?: {
        value: string;
        trend: 'up' | 'down' | 'neutral';
    };
    icon?: React.ElementType;
    className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
    label, 
    value, 
    unit, 
    change, 
    icon: Icon,
    className
}) => {
    return (
        <Card className={cn("rounded-sm border shadow-sm", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
                {Icon && <Icon className="w-4 h-4 text-slate-400" />}
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-1">
                    <div className="text-3xl font-black tracking-tighter">{value}</div>
                    {unit && <div className="text-sm font-bold text-slate-400">{unit}</div>}
                </div>
                {change && (
                    <p className={cn(
                        "text-[10px] font-bold mt-1",
                        change.trend === 'up' ? "text-green-600" : change.trend === 'down' ? "text-red-600" : "text-slate-400"
                    )}>
                        {change.trend === 'up' ? '▲' : change.trend === 'down' ? '▼' : '•'} {change.value} <span className="text-slate-400">vs last week</span>
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
