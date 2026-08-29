import { MonthlyStatistics, Statistics } from "./statistics.types";

export type StatisticState = {
  statistics: Statistics;
  monthlyStatistics: MonthlyStatistics;
};

interface StatisticActions {
  resetStatistics: () => void;
  setStatistics: (s: Statistics) => void;
  setMonthlyStatistics: (m: MonthlyStatistics) => void;
}

export type StatisticsSlice = StatisticState & StatisticActions;
