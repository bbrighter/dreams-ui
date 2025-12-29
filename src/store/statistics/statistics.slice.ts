import { StateCreator } from 'zustand'

import { StatisticsSlice, StatisticState } from '../interfaces'
import { StoreState } from '../interfaces/interface'
import { Statistic } from '../types'

const setInitialState = (): StatisticState => ({
  categoriesCount: [],
  personsCount: [],
})

export const createStatisticSlice: StateCreator<StoreState, [['zustand/immer', never]], [], StatisticsSlice> = (set, get) => ({
  ...setInitialState(),
  resetStatistics: () => set((draft: StatisticState) => {
    const { categoriesCount, personsCount } = setInitialState()
    draft.categoriesCount = categoriesCount
    draft.personsCount = personsCount
  }),
  setStatistics: (cats: Array<Statistic>, pers: Array<Statistic>) =>
    set((draft: StatisticState) => {
      draft.categoriesCount = cats
      draft.personsCount = pers
    }),
})
