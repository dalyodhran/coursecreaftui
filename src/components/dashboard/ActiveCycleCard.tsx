import React from "react";
import type { DashboardData } from "@/models/dashboard";
import { Card } from "@/components/ui/card";

interface ActiveCycleCardProps {
  cycle: DashboardData["activeCycle"];
}

export const ActiveCycleCard: React.FC<ActiveCycleCardProps> = ({ cycle }) => {
  return (
    <Card className="bg-surface p-10 rounded-xl shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04),0_2px_8px_-1px_rgba(0,0,0,0.02)] relative overflow-hidden group border-none">
      <div className="relative z-10">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">
          Active Cycle
        </span>
        <h2 className="font-headline text-4xl font-extrabold mt-4 text-foreground">
          {cycle.name} {cycle.week}/{cycle.totalWeeks}
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">
          {cycle.focus}
        </p>
        <div className="mt-8 flex items-end gap-3">
          <span className="font-headline text-5xl font-black text-primary">
            {cycle.progress}%
          </span>
          <span className="font-label text-xs mb-2 text-muted-foreground font-bold uppercase tracking-widest">
            Phase Completion
          </span>
        </div>
      </div>
      <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] pointer-events-none">
        <span className="material-symbols-outlined text-[240px] font-thin">
          speed
        </span>
      </div>
    </Card>
  );
};
