import { create } from "zustand"
import { _delete, get, put } from "./api"
import { addTagURL, deleteTagURL, getTagsURL } from "./url"
import { isTagsResponse } from "./interface"

interface State {
    tags: Array<{
        id: number
        title: string
    }>
}

interface Actions {
    getTags: () => Promise<void>,
    addTag: (dreamId: number, title: string) => Promise<void>
    removeTag: (dreamId: number, tagId: number) => Promise<boolean>
}

interface DreamStore extends State, Actions { }

const initialState: State = {
    tags: [
        {
            id: 0,
            title: "",
        }]
}

const useTags = create<DreamStore>((set) => ({
    ...initialState,

    getTags: async () => {
        const url = getTagsURL()
        const resp = await get(url, isTagsResponse)
        set({ tags: resp.map(t => ({ id: t.id, title: t.title })) })
    },

    addTag: async (dreamId: number, title: string) => {
        const url = addTagURL(dreamId, title)
        const id = await put(url)
        set((state) => ({ tags: [...state.tags, { id: id, title: title }] }))
    },

    removeTag: async (dreamId: number, tagId: number): Promise<boolean> => {
        try {
            const url = deleteTagURL(dreamId, tagId)
            return await _delete(url)
        } catch (e) {
            alert(e)
            return true
        }
    }
}))

export default useTags