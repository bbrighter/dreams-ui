import { EntityDreamResponse } from '../../api/generated_api'
import { Category, categoryResponseToCategories } from '../categories/categories'


export interface Dream {
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