import React from "react";
import type { DashboardData } from "@/models/dashboard";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";

interface WeeklyVolumeChartProps {
  volume: DashboardData["weeklyVolume"];
}

export const WeeklyVolumeChart: React.FC<WeeklyVolumeChartProps> = ({
  volume,
}) => {
  const currentVolume = volume.reduce((sum, day) => sum + day.actual, 0);
  const targetVolume = volume.reduce((sum, day) => sum + day.planned, 0);

  return (
    <Card className="bg-surface p-10 rounded-xl shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04),0_2px_8px_-1px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h3 className="font-headline text-2xl font-bold text-foreground">
            Weekly Volume
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Target: <span className="font-bold text-foreground">{targetVolume.toFixed(1)} KM</span> /{" "}
            Current: <span className="font-bold text-primary">{currentVolume.toFixed(1)} KM</span>
          </p>
        </div>
        <div className="flex gap-3">
          <span className="w-2.5 h-2.5 rounded-sm bg-primary"></span>
          <span className="w-2.5 h-2.5 rounded-sm bg-secondary"></span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={volume} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: "bold", fill: "hsl(var(--muted-foreground))" }}
              dy={10}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
            />
            {/* Background bars for planned */}
            <Bar dataKey="planned" fill="hsl(var(--secondary))" radius={[6, 6, 6, 6]} barSize={40} />
            {/* Foreground bars for actual. Wait, recharts doesn't overlay bars natively without overlapping them manually.
            Actually, stacked bars would stack them. If we want actual to overlap planned, we can use an overlapping setup.
            A simple approach is to use a composed chart or two bars with a negative bar gap.
            For simplicity and robustness, I'll use Bar with background. */}
            <Bar
              dataKey="actual"
              fill="hsl(var(--primary))"
              radius={[6, 6, 6, 6]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
