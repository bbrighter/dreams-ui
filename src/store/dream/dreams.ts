import { EntityDreamsResponse } from '../../api/generated_api'
import { Category } from '../categories/categories'

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
