import { EntityDreamResponse, EntityDreamsResponse } from '../../api/generated_api'
import { Category, categoryResponseToCategories } from './categories.types'

export interface DreamState {
    dream: Dream
    dreams: Dreams
    dreamsLoaded: 'public' | 'all' | 'none'
    scrollPosition: number
}

interface DreamActions {
    resetDreams: () => void
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
    setDreams: (dreams: Dreams, which: 'none' | 'public' | 'all') => void
    addDream: (dream: Dream) => void
    removeDream: (dreamId: number) => void
    setTranscript: (transcript: string) => void
    setScrollPosition: (pos: number) => void
}

export type DreamSlice = DreamState & DreamActions

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
