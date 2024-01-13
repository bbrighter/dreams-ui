import { create } from "zustand"
import { produce } from "immer"


import { ControllerDreamRequestBody } from "../api/generated_api"
import api from "../api/api"

interface Tag {
    id: number
    title: string
}

interface State {
    id: number
    date: Date
    description: string
    tags: Array<Tag>
}

interface Actions {
    setDate: (date: string) => void,
    setDescription: (description: string) => void,
    get: (id: number | string) => Promise<void>,
    create: () => Promise<number>,
    addTag: (tag: Tag) => void,
    removeTag: (tagId: number) => void,
}

interface DreamStore extends State, Actions { }

const initialState: State = {
    id: 0,
    date: new Date(),
    description: "",
    tags: [],
}

const useDream = create<DreamStore>((set) => ({
    ...initialState,

    setDate: (date: string) => {
        const newDate = new Date(date)
        set((state) => ({ ...state, date: newDate }))
    },
    setDescription: (description: string) => {
        set((state) => ({ ...state, description: description }))
    },
    get: async (id: number | string) => {
        const resp = await api.dreams.dreamsDetail(id.toString())
        if (!resp.ok) {
            alert(resp.statusText)
        }
        const dream = resp.data
        set({
            id: dream.id,
            date: new Date(dream.date),
            description: dream.description,
            tags: dream.tags.map(t => ({ title: t.title, id: t.id })),
        })
    },
    create: async () => {
        const date = new Date()
        const body: ControllerDreamRequestBody = {
            date: date.toISOString(),
        }
        const resp = await api.dreams.dreamsCreate(body)
        if (!resp.ok) {
            alert(resp.statusText)
        }
        const id = resp.data
        set({
            id: id,
            date: date
        })
        return id
    },
    addTag: (tag: Tag) => {
        set(produce((draft: State) => {
            draft.tags.push(tag)
        }))
    },
    removeTag: (tagId: number) => {
        set(produce((draft: State) => {
            const results = draft.tags.filter(t => t.id != tagId)
            draft.tags = [...results]
        }
        ))
    },
}))

export async function updateDream(dreamId: number, date: Date, description: string): Promise<boolean> {
    const body: ControllerDreamRequestBody = {
        date: date.toISOString(),
        description: description,
    }
    const resp = await api.dreams.dreamsPartialUpdate(dreamId.toString(), body)
    return resp.ok
}

export default useDream