import React from "react";
import type { DashboardData } from "@/models/dashboard";
import { Card } from "@/components/ui/card";

interface TrainingAdherenceCardProps {
  adherence: DashboardData["trainingAdherence"];
}

export const TrainingAdherenceCard: React.FC<TrainingAdherenceCardProps> = ({
  adherence,
}) => {
  const percentage = adherence.percentage;

  return (
    <Card className="bg-surface p-10 rounded-xl shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04),0_2px_8px_-1px_rgba(0,0,0,0.02)] border-t-8 border-t-primary border-x-none border-b-none border-x-transparent border-b-transparent relative overflow-hidden">
      <span className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">
        Training Adherence
      </span>
      <div className="flex items-center justify-between mt-4">
        <div>
          <h2 className="font-headline text-6xl font-black text-foreground">
            {percentage}%
          </h2>
          <p className="text-primary font-bold mt-2 flex items-center gap-1.5 text-sm">
            <span className="material-symbols-outlined text-base">
              trending_up
            </span>
            Elite Consistency
          </p>
        </div>
        <div className="w-24 h-24 relative">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="4"
            ></path>
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
              strokeWidth="4"
            ></path>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary font-bold">
              bolt
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
