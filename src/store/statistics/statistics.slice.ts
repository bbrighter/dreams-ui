import { StateCreator } from "zustand";

import { StatisticsSlice, StatisticState, StoreSlice } from "../interface";
import { MonthlyStatistics, Statistics } from "../types/statistics.types";

const setInitialState = (): StatisticState => ({
  monthlyStatistics: [],
  statistics: [],
});

export const createStatisticSlice: StateCreator<
  StoreSlice,
  [["zustand/immer", never]],
  [],
  StatisticsSlice
> = (set) => ({
  ...setInitialState(),
  resetStatistics: () =>
    set((draft: StatisticState) => {
      const { monthlyStatistics, statistics } = setInitialState();
      draft.monthlyStatistics = monthlyStatistics;
      draft.statistics = statistics;
    }),

  setStatistics: (s: Statistics) =>
    set((draft: StatisticState) => {
      draft.statistics = s;
    }),

  setMonthlyStatistics: (m: MonthlyStatistics) => {
    set((draft: StatisticState) => {
      draft.monthlyStatistics = m;
    });
  },
});
