import { create } from "zustand"
import api from "../api/api"


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
        const resp = await api.tags.tagsList()
        const tags = resp.data.tags
        console.log('get', tags)
        set({ tags: tags.map(t => ({ id: t.id, title: t.title })) })
    },

    addTag: async (dreamId: number, title: string) => {
        const resp = await api.dreams.tagsUpdate(dreamId.toString(), { title: title })
        if (!resp.ok) {
            alert(resp.statusText)
            return
        }
        set({ tags: resp.data.tags.map(t => ({ id: t.id, title: t.title })) })
    },

    removeTag: async (dreamId: number, tagId: number) => {
        const resp = await api.dreams.tagsDelete(dreamId.toString(), tagId.toString())
        if (!resp.ok) {
            alert(resp.statusText)
            return resp.ok
        }
        set({ tags: resp.data.tags.map(t => ({ id: t.id, title: t.title })) })
        return resp.ok
    }
}))

export default useTags