import React from "react";
import type { DashboardData } from "@/models/dashboard";
import { Card } from "@/components/ui/card";

interface RecentPerformanceCardProps {
  performances: DashboardData["recentPerformance"];
}

export const RecentPerformanceCard: React.FC<RecentPerformanceCardProps> = ({
  performances,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="font-headline text-xl font-bold px-4 text-foreground">
        Recent Performance
      </h3>
      <div className="space-y-4">
        {performances.map((perf, index) => (
          <Card
            key={index}
            className="bg-surface p-8 rounded-xl shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04),0_2px_8px_-1px_rgba(0,0,0,0.02)] flex items-center justify-between border border-border"
          >
            <div className="flex items-center gap-8">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">
                  sprint
                </span>
              </div>
              <div>
                <p className="font-bold text-lg text-foreground">
                  {perf.event}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {perf.date} • {perf.result}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-headline font-black text-2xl text-primary">
                {perf.metric}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
                Metric
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
