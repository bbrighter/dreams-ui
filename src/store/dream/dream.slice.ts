import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { StoreState } from '../interface'
import { Category } from '../types'
import { Dream, Dreams, DreamSlice, DreamState } from '../types/dream.types'

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
    dreams: [],
    dreamsLoaded: 'none',
    scrollPosition: 0,
})

export const createDreamSlice: StateCreator<StoreState, [], [], DreamSlice> = (set, get) => ({
    ...createInitialState(),
    resetDream: () => set(produce((draft: DreamState) => {
        draft.dream = createInitialState().dream
    })),
    resetDreams: () => set(produce((draft: DreamState) => {
        draft.dreams = createInitialState().dreams
        draft.dreamsLoaded = createInitialState().dreamsLoaded
    })),
    setDate: (date: Date) => {
        set(produce((draft: DreamState) => {
            draft.dream.date = date
            draft.dream.isSaved = false
        }))
    },
    setDescription: (description: string) => {
        set(produce((draft: DreamState) => {
            draft.dream.description = description
            draft.dream.isSaved = false
        }))
    },
    setVisibility: () => {
        const dreamIndex = get().dreams.findIndex(d => d.id == get().dream.id)
        const newVisiblity = !get().dream.visible
        set(produce((draft: DreamState) => {
            draft.dream.visible = newVisiblity
            draft.dreams[dreamIndex].visible = newVisiblity
        }))
    },
    setRating: (rating: number) => {
        const dreamIndex = get().dreams.findIndex(d => d.id == get().dream.id)
        set(produce((draft: DreamState) => {
            draft.dream.rating = rating
            draft.dreams[dreamIndex].rating = rating
        }))
    },
    setFinalized: () => {
                const dreamIndex = get().dreams.findIndex(d => d.id == get().dream.id)
        set(produce((draft: DreamState) => {
            draft.dream.finalized = true
            draft.dreams[dreamIndex].finalized = true
        }))
    },
    setDream: (dream: Dream) => {
        set(produce((draft: DreamState) => {
            draft.dream = dream
        }))
    },
    setDreams: (dreams: Dreams, which: 'none' | 'public' | 'all') => {
        set(produce((draft: DreamState) => {
            draft.dreams = dreams
            draft.dreamsLoaded = which
        }))
    },
    addDream: (dream: Dream) => {
        set(produce((draft: DreamState) => {
            draft.dream = dream
            draft.dreams.unshift(dream)
        }))
    },
    removeDream: (dreamId: number) => {
        set(produce((draft: DreamState) => {
            draft.dreams = get().dreams.filter(d => d.id != dreamId)
        }))
    },
    addCategoryToDream: (category: Category) => {
        set(produce((draft: DreamState) => {
            draft.dream.categories.push(category)
        }))
    },
    removeCategoryFromDream: (catId: number) => {
        set(produce((draft: DreamState) => {
            draft.dream.categories = get().dream.categories.filter(c => c.id != catId)
        }))
    },
    addPersonToDream: (person: Category) => {
                set(produce((draft: DreamState) => {
            draft.dream.persons.push(person)
        }))
    },
    removePersonFromDream: (personId: number) => {
       set(produce((draft: DreamState) => {
            draft.dream.persons = get().dream.persons.filter(p => p.id != personId)
        }))
    },
    setScrollPosition: (pos: number) => {
        set(produce((draft: DreamState) => {
            draft.scrollPosition = pos
         }))
    },
    setTranscript: (transcript: string) => {
        set(produce((draft: DreamState) => {
            draft.dream.transcript = transcript
         }))
    },

})
