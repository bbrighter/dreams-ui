import { Category, Dream } from '../types'

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
  setIsSaved: () => void
}

export type DreamSlice = DreamState & DreamActions
