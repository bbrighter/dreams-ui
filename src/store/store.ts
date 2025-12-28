import { create } from 'zustand'

import { registerTokenProvider } from '../api/api'
import { AuthStore, createPasswordSlice } from './auth/authStore'
import { createCategoriesSlice } from './categories'
import { createDreamSlice } from './dream'
import { createStatisticSlice, StatisticsStore } from './statistics/statisticsStore'
import { CategorySlice, DreamSlice } from './types'

export const useDreams = create<
    DreamSlice & CategorySlice & StatisticsStore & AuthStore & { resetState: () => void }
>((set, get, api) => {
    const categories = createCategoriesSlice(set, get, api)
    const dreams = createDreamSlice(set, get, api)
    const passwords = createPasswordSlice(set, get, api)
    const statistics = createStatisticSlice(set, get, api)

    return {
        ...categories,
        ...dreams,
        ...passwords,
        ...statistics,
        resetState: () => {
            get().resetDream()
            get().resetDreams()
            get().resetStatistics()
            get().resetCategories()
        },
    }
})

registerTokenProvider(() => useDreams.getState().token)
