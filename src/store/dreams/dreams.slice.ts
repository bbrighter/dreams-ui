import { StateCreator } from 'zustand'

import { DreamsSlice, DreamsState } from '../interfaces'
import { StoreState } from '../interfaces/interface'
import { Dreams, MetaDream } from '../types/dreams.types'

const createInitialState = (): DreamsState => ({
  dreams: [],
  dreamsLoaded: 'none',
  scrollPosition: 0,
})

export const createDreamsSlice: StateCreator<StoreState, [['zustand/immer', never]], [], DreamsSlice> = (set, get) => ({
  ...createInitialState(),
  resetDreams: () => set((draft: DreamsState) => {
    draft.dreams = createInitialState().dreams
    draft.dreamsLoaded = createInitialState().dreamsLoaded
  }),
  setDreams: (dreams: Dreams, which: 'none' | 'public' | 'all') => {
    set((draft: DreamsState) => {
      draft.dreams = dreams.sort((a, b) => b.date.valueOf() - a.date.valueOf())
      draft.dreamsLoaded = which
    })
  },

  setScrollPosition: (pos: number) => {
    set((draft: DreamsState) => {
      draft.scrollPosition = pos
    })
  },
  addDreamToList: (meta: MetaDream) => {
    set((draft: DreamsState) => {
      draft.dreams.unshift(meta)
    })
  },
  removeDream: (dreamId: number) => {
    set((draft: DreamsState) => {
      draft.dreams = get().dreams.filter(d => d.id != dreamId)
    })
  },
  changeDream: (dreamId: number, props: Partial<MetaDream>) => {
    set((draft: DreamsState) => {
      const dream = draft.dreams.find(d => d.id == dreamId)
      if (!dream) return
      Object.assign(dream, props)
    })
  },
})
