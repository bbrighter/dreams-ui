import { ControllerTagResponse } from "../api/generated_api"

export interface Tag {
    id: number
    title: string
}

export interface Tags {
    tags: Array<Tag>
}

export function isTag(t: unknown): t is Tag {
    return typeof (t) == 'object' && t != null &&
        'id' in t && typeof (t.id) == 'number' &&
        'title' in t && typeof (t.title) == 'string'
}

export function tagResponseToTags(resp: Array<ControllerTagResponse>): Array<Tag> {
    return resp.map(t => ({ id: t.id, title: t.title }))
}