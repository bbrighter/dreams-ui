import { StateCreator } from 'zustand'

import { Category } from '../categories'
import { DreamSlice, DreamState } from './dream.interface'
import { Dream } from './dream.types'

const createInitialState = (): DreamState => ({
  dream: {
    date: new Date(),
    description: '',
    finalized: false,
    id: 0,
    isSaved: false,
    persons: [],
    categories: [],
    visible: true,
    rating: null,
    transcript: '',
  },
})

export const createDreamSlice: StateCreator<DreamState, [['zustand/immer', never]], [], DreamSlice> = (set, get) => ({
  ...createInitialState(),
  resetDream: () => set((draft: DreamState) => {
    draft.dream = createInitialState().dream
  }),

  setDate: (date: Date) => {
    set((draft: DreamState) => {
      draft.dream.date = date
      draft.dream.isSaved = false
    })
  },
  setDescription: (description: string) => {
    set((draft: DreamState) => {
      draft.dream.description = description
      draft.dream.isSaved = false
    })
  },
  setVisibility: () => {
    const newVisiblity = !get().dream.visible
    set((draft: DreamState) => {
      draft.dream.visible = newVisiblity
    })
  },
  setRating: (rating: number) => {
    set((draft: DreamState) => {
      draft.dream.rating = rating
    })
  },
  setFinalized: () => {
    set((draft: DreamState) => {
      draft.dream.finalized = true
    })
  },
  setDream: (dream: Dream) => {
    set((draft: DreamState) => {
      draft.dream = dream
    })
  },
  addDream: (dream: Dream) => {
    set((draft: DreamState) => {
      draft.dream = dream
    })
  },
  addCategoryToDream: (category: Category) => {
    set((draft: DreamState) => {
      draft.dream.categories.push(category)
    })
  },
  removeCategoryFromDream: (catId: number) => {
    set((draft: DreamState) => {
      draft.dream.categories = get().dream.categories.filter(c => c.id != catId)
    })
  },
  addPersonToDream: (person: Category) => {
    set((draft: DreamState) => {
      draft.dream.persons.push(person)
    })
  },
  removePersonFromDream: (personId: number) => {
    set((draft: DreamState) => {
      draft.dream.persons = get().dream.persons.filter(p => p.id != personId)
    })
  },
  setTranscript: (transcript: string) => {
    set((draft: DreamState) => {
      draft.dream.transcript = transcript
    })
  },
  setIsSaved: () => {
    set((draft: DreamState) => {
      draft.dream.isSaved = true
    })
  },

})
