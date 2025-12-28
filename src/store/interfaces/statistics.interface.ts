import { Statistic, Statistics } from '../types'

export type StatisticState = Statistics

interface StatisticActions {
  resetStatistics: () => void
  setStatistics: (cats: Array<Statistic>, persons: Array<Statistic>) => void
}

export type StatisticsSlice = StatisticState & StatisticActions
