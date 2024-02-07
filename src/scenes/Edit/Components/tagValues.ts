import { Person } from "../../../store/persons"
import { Tag } from "../../../store/tags"

export interface TagValue {
    id: number
    label: string
}

export function isTagValue(t: unknown): t is TagValue {
    return typeof (t) == 'object' && t != null &&
        'id' in t && typeof (t.id) == 'number' &&
        'label' in t && typeof (t.label) == 'string'
}

export function tagsToTagValue(ts: Array<Tag>): Array<TagValue> {
    return ts.map(t => ({ id: t.id, label: t.title }))
}

export function personsToTagValue(ps: Array<Person>): Array<TagValue> {
    return ps.map(p => ({ id: p.id, label: p.name }))
}