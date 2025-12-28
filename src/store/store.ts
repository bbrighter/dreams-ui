import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { registerTokenProvider } from '../api/api'
import { createAuthSlice } from './auth'
import { createCategoriesSlice } from './categories'
import { createDreamSlice } from './dream'
import { createDreamsSlice } from './dreams'
import { createStatisticSlice } from './statistics'
import { AuthSlice, CategorySlice, DreamSlice, DreamsSlice, StatisticsSlice } from './types'

export const useDreams = create<AuthSlice & DreamSlice & DreamsSlice & CategorySlice & StatisticsSlice & { resetState: () => void }>()(
  immer((set, get, api) => {
    const categories = createCategoriesSlice(set, get, api)
    const dream = createDreamSlice(set, get, api)
    const dreams = createDreamsSlice(set, get, api)
    const auth = createAuthSlice(set, get, api)
    const statistics = createStatisticSlice(set, get, api)

    return {
      ...categories,
      ...dream,
      ...dreams,
      ...auth,
      ...statistics,
      resetState: () => {
        get().resetDream()
        get().resetDreams()
        get().resetStatistics()
        get().resetCategories()
        get().resetAuth()
      },
    }
  }))

registerTokenProvider(() => useDreams.getState().token)
