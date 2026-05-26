export interface MetricChange {
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface Metric {
  label: string;
  value: string | number;
  unit?: string;
  change?: MetricChange;
}

export interface TrainingSession {
  title: string;
  details: string;
  duration?: string;
  intensity?: string;
  type?: 'interval' | 'easy' | 'long' | 'recovery' | 'tempo';
}

export interface PerformanceEvent {
  date: string;
  event: string;
  result: string;
  metric: string;
}

export interface HealthMetric {
  label: string;
  value: string | number;
  unit: string;
  status: 'optimal' | 'recovering' | 'fatigued' | 'caution';
}

export interface DashboardData {
  athleteName: string;
  focus: string;
  targetRace: string;
  targetDate: string;
  activeCycle: {
    name: string;
    week: number;
    totalWeeks: number;
    focus: string;
    progress: number;
  };
  trainingAdherence: {
    percentage: number;
    completedSessions: number;
    totalSessions: number;
    status: 'on-track' | 'behind' | 'ahead';
  };
  todaysProtocol: TrainingSession;
  weeklyVolume: {
    day: string;
    actual: number;
    planned: number;
  }[];
  coachsInsight: string;
  recentPerformance: PerformanceEvent[];
  healthMetrics: {
    vo2Max: Metric;
    recoveryScore: number;
    trainingReadiness: string;
    weather: {
      temp: number;
      condition: string;
      humidity: number;
    };
  };
  performanceMetrics: {
    thresholdPace: string;
    thresholdHR: number;
    currentWeight: number;
    targetWeight: number;
  };
}
