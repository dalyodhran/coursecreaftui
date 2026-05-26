import React from "react";
import type { DashboardData } from "@/models/dashboard";
import { Card } from "@/components/ui/card";

interface HealthMetricsGridProps {
  metrics: DashboardData["healthMetrics"];
}

export const HealthMetricsGrid: React.FC<HealthMetricsGridProps> = ({
  metrics,
}) => {
  // Convert recovery score (0-100) to hours remaining conceptually or just show score. 
  // Design had "18h". We can use the readiness "High" or the score.
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-surface p-8 rounded-xl shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04),0_2px_8px_-1px_rgba(0,0,0,0.02)] text-center border border-border">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">
            VO2 Max
          </p>
          <p className="font-headline text-4xl font-black text-foreground">
            {metrics.vo2Max.value}
          </p>
          <div className="w-full h-2 bg-secondary mt-5 rounded-sm overflow-hidden">
            <div className="h-full bg-primary rounded-sm" style={{ width: "75%" }}></div>
          </div>
        </Card>
        <Card className="bg-surface p-8 rounded-xl shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04),0_2px_8px_-1px_rgba(0,0,0,0.02)] text-center border border-border">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">
            Recovery
          </p>
          <p className="font-headline text-4xl font-black text-foreground">
            {metrics.recoveryScore}%
          </p>
          <p className="text-[10px] text-primary mt-3 font-black tracking-widest uppercase">
            {metrics.trainingReadiness}
          </p>
        </Card>
      </div>

      <Card className="bg-secondary p-8 rounded-xl flex items-center justify-between border border-border shadow-none">
        <div className="flex items-center gap-5">
          <span className="material-symbols-outlined text-primary text-3xl">
            partly_cloudy_day
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">
              {metrics.weather.temp}°C • {metrics.weather.condition}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Ideal running conditions
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-background/50 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-muted-foreground text-xl">
            info
          </span>
        </button>
      </Card>
    </div>
  );
};
