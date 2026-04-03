import { StateCreator } from "zustand"

import { Dream, hashDream } from "../types"


interface DreamActions {
  resetDream: () => void
  setDate: (date: Date) => void
  setDescription: (desc: string) => void
  setFinalized: () => void
  setVisibility: (isVisible: boolean) => void
  setRating: (rating: number) => void
  setDreamCategories: (cats: Array<number>) => void
  setDream: (dream: Dream) => void
  setHash: (dream: Dream) => void
}

type DreamState = { dream: Dream, hash: string }

const createInitialState = (): DreamState => ({
  dream: {
    date: new Date(),
    description: "",
    finalized: false,
    id: 0,
    categories: [],
    visible: true,
    rating: null,
  },
  hash: "" }
)

export type DreamSlice = DreamActions & DreamState

export const createDreamSlice: StateCreator<DreamState, [["zustand/immer", never]], [], DreamSlice> = (set) => ({
  ...createInitialState(),
  resetDream: () => set(createInitialState()),

  setDate: (date: Date) => {
    set((draft: DreamState) => {
      draft.dream.date = date
    })
  },
  setDescription: (description: string) => {
    set((draft: DreamState) => {
      draft.dream.description = description
    })
  },
  setVisibility: (isVisible: boolean) => {
    set((draft: DreamState) => {
      draft.dream.visible = isVisible
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
  setDreamCategories: (cats: Array<number>) => {
    set((draft: DreamState) => {
      draft.dream.categories = cats
    })
  },
  setHash: (dream: Dream) => {
    set((draft: DreamState) => {
      draft.hash = hashDream(dream)
    })
  },
})
