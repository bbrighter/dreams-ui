import { EntityPersonsResponse } from "../api/generated_api"

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

export const isPerson = (p: unknown): p is Person => {
    return typeof (p) == 'object' && p != null &&
        'id' in p && typeof (p.id) == 'number' &&
        'name' in p && typeof (p.name) == 'string'
}