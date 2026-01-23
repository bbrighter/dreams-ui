import { Dreams, MetaDream } from './dreams.types'

export interface DreamsState {
  dreams: Dreams
  dreamsLoaded: 'public' | 'all' | 'none'
  scrollPosition: number
}

interface DreamsActions {
  resetDreams: () => void
  setDreams: (dreams: Dreams, which: 'none' | 'public' | 'all') => void
  removeDream: (dreamId: number) => void
  setScrollPosition: (pos: number) => void
  addDreamToList: (dream: MetaDream) => void
  changeDream: (dreamId: number, props: Partial<MetaDream>) => void
}

export type DreamsSlice = DreamsState & DreamsActions
