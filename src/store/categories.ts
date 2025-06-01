import { EntityCategoriesResponse } from '../api/generated_api'

export interface Category {
    id: number
    name: string
}

export interface Categories {
    categories: Array<Category>
}

export function categoryResponseToCategories(resp: EntityCategoriesResponse): Array<Category> {
    return resp.categories.map(t => ({ id: t.id, name: t.name }))
}