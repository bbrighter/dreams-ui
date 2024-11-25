import { EntityCategoriesResponse } from "../api/generated_api"

export interface Category {
    id: number
    name: string
}

export interface Categories {
    categories: Array<Category>
}

export function isCategory(t: unknown): t is Category {
    return typeof (t) == "object" && t != null &&
        "id" in t && typeof (t.id) == "number" &&
        "name" in t && typeof (t.name) == "string"
}

export function categoryResponseToCategories(resp: EntityCategoriesResponse): Array<Category> {
    return resp.categories.map(t => ({ id: t.id, name: t.name }))
}