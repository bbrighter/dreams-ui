import { EntityCategoriesResponse, EntityCategoryResponse } from '../api/generated_api'

export interface Category {
    id: number
    name: string
}

export interface Categories {
    categories: Array<Category>
}

export function categoryResponseToCategories(resp: EntityCategoriesResponse | Array<EntityCategoryResponse> | undefined): Array<Category> {
    let cats: Array<EntityCategoryResponse>
    if (Array.isArray(resp)) {
        cats = resp
    } else if (resp == undefined) {
        cats = []
    } else {
        cats = resp.categories ?? []
    }
    return cats.map(t => ({ id: t.id, name: t.name }))
}
