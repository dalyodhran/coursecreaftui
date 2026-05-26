import type { DashboardData } from "@/models/dashboard";

export const mockDashboardData: DashboardData = {
  athleteName: "Alex Rivera",
  focus: "Peak Performance & Efficiency",
  targetRace: "Berlin Marathon",
  targetDate: "September 28, 2026",
  activeCycle: {
    name: "Specific Phase II",
    week: 14,
    totalWeeks: 18,
    focus: "Marathon Specific Intensity",
    progress: 78,
  },
  trainingAdherence: {
    percentage: 94,
    completedSessions: 31,
    totalSessions: 33,
    status: 'on-track',
  },
  todaysProtocol: {
    title: "16km Tempo Run",
    details: "2km WU, 12km @ 4:15/km, 2km CD",
    duration: "1h 12m",
    intensity: "Z4 / High",
    type: 'tempo',
  },
  weeklyVolume: [
    { day: "Mon", actual: 12, planned: 12 },
    { day: "Tue", actual: 16, planned: 16 },
    { day: "Wed", actual: 0, planned: 0 },
    { day: "Thu", actual: 14, planned: 14 },
    { day: "Fri", actual: 18, planned: 18 },
    { day: "Sat", actual: 0, planned: 32 },
    { day: "Sun", actual: 0, planned: 12 },
  ],
  coachsInsight: "Your metabolic efficiency at 4:12/km has improved by 4.2% since the March 2024 50km Ultra. You are maintaining better fat oxidation rates at your threshold. Maintain current hydration strategy for the upcoming 32km long run.",
  recentPerformance: [
    { date: "March 2024", event: "Coastal 50km Ultra", result: "4:12:45", metric: "+12.4 V-Score" },
    { date: "Oct 2023", event: "Chicago Marathon", result: "3:12:14", metric: "PB" },
    { date: "Sep 2023", event: "Local 10km", result: "38:42", metric: "Threshold Check" },
  ],
  healthMetrics: {
    vo2Max: {
      label: "VO2 MAX",
      value: 64,
      unit: "ml/kg/min",
      change: { value: "+1.2", trend: 'up' },
    },
    recoveryScore: 88,
    trainingReadiness: "High",
    weather: {
      temp: 14,
      condition: "Overcast",
      humidity: 62,
    },
  },
  performanceMetrics: {
    thresholdPace: "4:12",
    thresholdHR: 168,
    currentWeight: 81.4,
    targetWeight: 80.0,
  },
};
