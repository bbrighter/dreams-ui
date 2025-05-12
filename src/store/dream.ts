import { EntityDreamResponse } from '../api/generated_api'
import { Category, categoryResponseToCategories } from './categories'
import { Person } from './persons'


export interface Dream {
    id: number
    date: Date
    description: string
    categories: Array<Category>
    persons: Array<Person>
    isSaved: boolean
    visible: boolean
}

export function dreamResponseToDream(resp: EntityDreamResponse): Dream {
    return {
        id: resp.id,
        date: new Date(resp.date),
        description: resp.description,
        categories: categoryResponseToCategories(resp.categories),
        persons: resp.persons.persons.map(p => ({ id: p.id, name: p.name })),
        isSaved: true,
        visible: resp.visible,
    }
}