import { Category } from '../../../store/categories'
import { Person } from '../../../store/persons'

export interface TagValue {
    id: number
    name: string
}

export function isTagValue(t: unknown): t is TagValue {
    return typeof (t) == 'object' && t != null &&
        'id' in t && typeof (t.id) == 'number' &&
        'name' in t && typeof (t.name) == 'string'
}

export function categoriesToTagValue(ts: Array<Category>): Array<TagValue> {
    return ts
}

export function personsToTagValue(ps: Array<Person>): Array<TagValue> {
    return ps
}