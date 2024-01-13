import { create } from "zustand"
import api from "../api/api"
import { ControllerTagsResponse } from "../api/generated_api"

interface Tag {
    id: number
    title: string
}

interface State {
    tags: Array<Tag>
}

interface Actions {
    getTags: () => Promise<void>,
    addTag: (dreamId: number, title: string) => Promise<boolean>
    removeTag: (dreamId: number, tagId: number) => Promise<boolean>
}

interface DreamStore extends State, Actions { }

const initialState: State = {
    tags: [


    ]
}

const useTags = create<DreamStore>((set) => ({
    ...initialState,

    getTags: async () => {
        const resp = await api.tags.tagsList()
        set({ tags: TagResponseToTags(resp.data) })
    },

    addTag: async (dreamId: number, title: string): Promise<boolean> => {
        const resp = await api.dreams.tagsUpdate(dreamId.toString(), { title: title })
        if (!resp.ok) {
            alert(resp.statusText)
            return resp.ok
        }
        set({ tags: TagResponseToTags(resp.data) })
        return resp.ok
    },

    removeTag: async (dreamId: number, tagId: number) => {
        const resp = await api.dreams.tagsDelete(dreamId.toString(), tagId.toString())
        if (!resp.ok) {
            alert(resp.statusText)
            return resp.ok
        }
        set({ tags: TagResponseToTags(resp.data) })
        return resp.ok
    }
}))

export default useTags

export function TagResponseToTags(resp: ControllerTagsResponse): Array<Tag> {
    return resp.tags.map(t => ({ id: t.id, title: t.title }))
}