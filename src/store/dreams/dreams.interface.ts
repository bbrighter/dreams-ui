import { Dreams, MetaDream } from './dreams.types'

export interface DreamsState {
  dreams: Dreams
  scrollPosition: number
}

interface DreamsActions {
  resetDreams: () => void
  setDreams: (dreams: Dreams) => void
  setScrollPosition: (pos: number) => void
}

export type DreamsSlice = DreamsState & DreamsActions
