import { StateCreator } from 'zustand'

import { DreamsSlice, DreamsState } from './dreams.interface'
import { Dreams, MetaDream } from './dreams.types'

const createInitialState = (): DreamsState => ({
  dreams: [],
  scrollPosition: 0,
})

export const createDreamsSlice: StateCreator<DreamsState, [['zustand/immer', never]], [], DreamsSlice> = (set, get) => ({
  ...createInitialState(),
  resetDreams: () => set((draft: DreamsState) => {
    draft.dreams = createInitialState().dreams
  }),
  setDreams: (dreams: Dreams) => {
    set((draft: DreamsState) => {
      draft.dreams = dreams.sort((a, b) => b.date.valueOf() - a.date.valueOf())
    })
  },
  setScrollPosition: (pos: number) => {
    set((draft: DreamsState) => {
      draft.scrollPosition = pos
    })
  },
})
