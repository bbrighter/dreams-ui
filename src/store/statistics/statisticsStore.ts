import { produce } from 'immer'
import { StateCreator } from 'zustand'

import api from '../../api/api'
import { AuthStore } from '../auth/authStore'
import { controllerCountsResponseToStatistic, Statistics } from './statistics'

type State = Statistics

interface Actions {
    resetStatistics: () => void
    getStatistics: () => Promise<void>
}

const STATISTICS_LIMITS = 40

export interface StatisticsStore extends State, Actions { }

const initialState: State = {
    categoriesCount: [],
    personsCount: [],
}

export const createStatisticSlice: StateCreator<StatisticsStore & AuthStore, [], [], StatisticsStore> = (set, get) => ({
    ...initialState,
    resetStatistics: () => set(initialState),
    getStatistics: async () => {
        const resp = get().loggedIn ? await api.statistics.statisticsList({ limit: STATISTICS_LIMITS }) : await api.private.statisticsList({ limit: STATISTICS_LIMITS })
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.categoriesCount = controllerCountsResponseToStatistic(resp.data, 'category')
                draft.personsCount = controllerCountsResponseToStatistic(resp.data, 'person')
            }))
        }
    },
})
