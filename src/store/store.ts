import { create } from 'zustand'

import { CategoriesStore, createCategoriesSlice } from './categories/categoriesStore'
import { createDreamSlice, DreamStore } from './dream/dreamStore'
import { createPasswordSlice, AuthStore } from './auth/authStore'
import { createStatisticSlice, StatisticsStore } from './statistics/statisticsStore'


const useDreams = create<
    DreamStore & CategoriesStore & StatisticsStore & AuthStore & { resetState: () => void }
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


export default useDreams