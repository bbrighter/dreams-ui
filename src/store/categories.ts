import { ControllerCategoryResponse } from "../api/generated_api"

export interface Category {
    id: number
    name: string
}

export interface Categories {
    tags: Array<Category>
}

export function isCategory(t: unknown): t is Category {
    return typeof (t) == 'object' && t != null &&
        'id' in t && typeof (t.id) == 'number' &&
        'name' in t && typeof (t.name) == 'string'
}

export function categoryResponseToCategories(resp: Array<ControllerCategoryResponse>): Array<Category> {
    return resp.map(t => ({ id: t.id, name: t.name }))
}