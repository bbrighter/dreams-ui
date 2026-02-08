import { StateCreator } from 'zustand'

import { StatisticsSlice, StatisticState } from './statistics.interface'
import { MonthlyStatistics, Statistics } from './statistics.types'

const setInitialState = (): StatisticState => ({
  monthlyStatistics: [],
  statistics: [],
})

export const createStatisticSlice: StateCreator<StatisticState, [['zustand/immer', never]], [], StatisticsSlice> = (set, get) => ({
  ...setInitialState(),
  resetStatistics: () => set((draft: StatisticState) => {
    const { monthlyStatistics, statistics } = setInitialState()
    draft.monthlyStatistics = monthlyStatistics
    draft.statistics = statistics
  }),

  setStatistics: (s: Statistics) =>
    set((draft: StatisticState) => {
      draft.statistics = s
    }),

  setMonthlyStatistics: (m: MonthlyStatistics) => {
    set((draft: StatisticState) => {
      draft.monthlyStatistics = m
    })
  },
})
