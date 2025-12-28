import { EntityDreamResponse, EntityDreamsResponse } from '../../api/generated_api'
import { Category, categoryResponseToCategories } from './categories.types'

export interface DreamState {
  dream: Dream
}

interface DreamActions {
  resetDream: () => void
  setDate: (date: Date) => void
  setDescription: (description: string) => void
  setVisibility: () => void
  setRating: (rating: number) => void
  setFinalized: () => void
  addCategoryToDream: (category: Category) => void
  removeCategoryFromDream: (catId: number) => void
  addPersonToDream: (person: Category) => void
  removePersonFromDream: (personId: number) => void
  setDream: (dream: Dream) => void
  addDream: (dream: Dream) => void
  setTranscript: (transcript: string) => void
}

export type DreamSlice = DreamState & DreamActions

export type Dream = {
  id: number
  date: Date
  description: string
  categories: Array<Category>
  persons: Array<Category>
  isSaved: boolean
  visible: boolean
  finalized: boolean
  rating: number | null
  transcript: string
}

export function dreamResponseToDream(resp: EntityDreamResponse): Dream {
  return {
    id: resp.id,
    date: new Date(resp.date),
    description: resp.description,
    categories: categoryResponseToCategories(resp.categories),
    persons: categoryResponseToCategories(resp.persons),
    isSaved: true,
    visible: resp.visible,
    finalized: resp.finalized,
    rating: resp.rating ?? null,
    transcript: '',
  }
}
