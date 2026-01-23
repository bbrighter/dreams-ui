import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { registerTokenProvider } from '../api/api'
import { createApiSlice } from './api'
import { createAuthSlice } from './auth'
import { createCategoriesSlice } from './categories'
import { createDreamSlice } from './dream'
import { createDreamsSlice } from './dreams'
import { StoreSlice } from './interface'
import { createStatisticSlice } from './statistics'

export const useDreams = create<StoreSlice & { resetState: () => void }>()(
  immer((set, get, store) => {
    const categories = createCategoriesSlice(set, get, store)
    const dream = createDreamSlice(set, get, store)
    const dreams = createDreamsSlice(set, get, store)
    const auth = createAuthSlice(set, get, store)
    const statistics = createStatisticSlice(set, get, store)
    const api = createApiSlice(set, get, store)

    return {
      ...categories,
      ...dream,
      ...dreams,
      ...auth,
      ...statistics,
      ...api,
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
