import { EntityPersonsResponse } from '../api/generated_api'

export interface Person {
    id: number
    name: string
}

export interface Persons {
    persons: Array<Person>,
}

export function personsResponseToPersons(resp: EntityPersonsResponse): Array<Person> {
    return resp.persons.map(p => ({ id: p.id, name: p.name }))
}

export enum IncludeParam {
    PERSONS = 'persons',
    CATEGORIES = 'categories',
    ALL = 'persons,categories',
}