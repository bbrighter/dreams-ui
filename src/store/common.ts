import { ControllerTagResponse } from "../api/generated_api"

export interface Tag {
    id: number
    title: string
}

export function TagResponseToTags(resp: Array<ControllerTagResponse>): Array<Tag> {
    return resp.map(t => ({ id: t.id, title: t.title }))
}