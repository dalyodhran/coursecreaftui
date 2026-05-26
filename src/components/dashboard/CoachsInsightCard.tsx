import React from "react";
import type { DashboardData } from "@/models/dashboard";
import { Card } from "@/components/ui/card";

interface CoachsInsightCardProps {
  insight: DashboardData["coachsInsight"];
}

export const CoachsInsightCard: React.FC<CoachsInsightCardProps> = ({
  insight,
}) => {
  return (
    <Card className="bg-surface p-10 rounded-xl shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04),0_2px_8px_-1px_rgba(0,0,0,0.02)] border-l-8 border-l-primary border-y-transparent border-r-transparent border-y-none border-r-none relative overflow-hidden">
      <div className="flex items-center gap-5 mb-8">
        <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center border border-border">
          <span
            className="material-symbols-outlined text-primary text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            psychology
          </span>
        </div>
        <div>
          <p className="font-headline font-bold text-base text-foreground">
            Coach's Insight
          </p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
            AI Analysis
          </p>
        </div>
      </div>
      <p className="text-foreground font-medium leading-[1.7] text-sm">
        "{insight}"
      </p>
      <div className="mt-8 pt-8 border-t border-border">
        <a
          className="text-primary text-xs font-bold flex items-center gap-2 group tracking-wide"
          href="#"
        >
          VIEW DEEP DIVE INSIGHTS
          <span className="material-symbols-outlined text-base group-hover:translate-x-1.5 transition-transform">
            arrow_forward
          </span>
        </a>
      </div>
    </Card>
  );
};
