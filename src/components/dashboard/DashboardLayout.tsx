import React from "react";
import type { DashboardData } from "@/models/dashboard";
import { ActiveCycleCard } from "./ActiveCycleCard";
import { TrainingAdherenceCard } from "./TrainingAdherenceCard";
import { WeeklyVolumeChart } from "./WeeklyVolumeChart";
import { RecentPerformanceCard } from "./RecentPerformanceCard";
import { TodaysProtocolCard } from "./TodaysProtocolCard";
import { CoachsInsightCard } from "./CoachsInsightCard";
import { HealthMetricsGrid } from "./HealthMetricsGrid";

interface DashboardLayoutProps {
  data: DashboardData;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-12 gap-10 w-full max-w-[1920px] mx-auto min-h-screen">
      {/* Left/Central Column */}
      <div className="col-span-12 lg:col-span-8 space-y-10">
        {/* Hero Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ActiveCycleCard cycle={data.activeCycle} />
          <TrainingAdherenceCard adherence={data.trainingAdherence} />
        </div>
        
        {/* Weekly Volume Chart */}
        <WeeklyVolumeChart volume={data.weeklyVolume} />
        
        {/* Recent Activities */}
        <RecentPerformanceCard performances={data.recentPerformance} />
      </div>

      {/* Right Column */}
      <div className="col-span-12 lg:col-span-4 space-y-10">
        {/* Up Next Card */}
        <TodaysProtocolCard protocol={data.todaysProtocol} />
        
        {/* Coach's Insight */}
        <CoachsInsightCard insight={data.coachsInsight} />
        
        {/* Sidebar Quick Metrics & Weather */}
        <HealthMetricsGrid metrics={data.healthMetrics} />
      </div>
    </div>
  );
};
