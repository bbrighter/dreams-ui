import { EntityCategoriesResponse, EntityCategoryResponse } from '../../api/generated_api'

export interface Person {
    id: number
    name: string
}

export type Persons = Array<Person>

export function personsResponseToPersons(resp: EntityCategoriesResponse): Array<Person> {
    return resp.persons?.map(p => ({ id: p.id, name: p.name })) ?? []
}

export function categoryResponseToPersons(resp: EntityCategoriesResponse | Array<EntityCategoryResponse> | undefined): Array<Person> {
    let cats: Array<EntityCategoryResponse>
    if (Array.isArray(resp)) {
        cats = resp
    } else if (resp == undefined) {
        cats = []
    } else {
        cats = resp.persons ?? []
    }
    return cats.map(t => ({ id: t.id, name: t.name }))
}

export enum IncludeParam {
    PERSONS = 'persons',
    CATEGORIES = 'categories',
    ALL = 'persons,categories',
}