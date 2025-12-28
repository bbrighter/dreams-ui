import { EntityDreamsResponse } from '../../api/generated_api'
import { Category } from './categories.types'

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

export type MetaDream = {
  id: number
  date: Date
  visible: boolean
  finalized: boolean
  persons: Array<Category>
  categories: Array<Category>
  rating: number | null
}

export type Dreams = Array<MetaDream>

export function dreamsResponseToDreams(resp: EntityDreamsResponse): Dreams {
  return resp.dreams.map((d) => {
    const date = new Date(d.date)
    return {
      id: d.id,
      date: date,
      visible: d.visible,
      finalized: d.finalized,
      persons: d.persons ?? [],
      categories: d.categories ?? [],
      rating: d.rating ?? null,
    }
  })
}
