import { ControllerDreamResponse } from "../api/generated_api"
import { Person } from "./persons"
import { Tag, tagResponseToTags } from "./tags"


export interface Dream {
    id: number
    date: Date
    description: string
    tags: Array<Tag>
    persons: Array<Person>
    isSaved: boolean
}

export function dreamResponseToDream(resp: ControllerDreamResponse): Dream {
    return {
        id: resp.id,
        date: new Date(resp.date),
        description: resp.description,
        tags: tagResponseToTags(resp.tags),
        persons: resp.persons.map(p => ({ id: p.id, name: p.name })),
        isSaved: true,
    }
}