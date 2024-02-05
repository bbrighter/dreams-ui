import { ControllerTagResponse } from "../api/generated_api"

export interface Tag {
    id: number
    title: string
}

export interface Tags {
    tags: Array<Tag>
}


export function tagResponseToTags(resp: Array<ControllerTagResponse>): Array<Tag> {
    return resp.map(t => ({ id: t.id, title: t.title }))
}