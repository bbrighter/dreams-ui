import { create } from "zustand"
import { produce } from "immer"

import { ControllerDreamRequestBody } from "../api/generated_api"
import api from "../api/api"
import { Tag, TagResponseToTags } from "./common"


interface State {
    id: number
    date: Date
    description: string
    tags: Array<Tag>
    isSaved: boolean
}

interface Actions {
    setDate: (date: string) => void,
    setDescription: (description: string) => void,
    get: (id: number | string) => Promise<void>,
    create: () => Promise<number>,
    update: () => Promise<boolean>,
    addTag: (tag: Tag) => void,
    removeTag: (tagId: number) => void,
}

interface DreamStore extends State, Actions { }

const initialState: State = {
    id: 0,
    date: new Date(),
    description: "",
    tags: [],
    isSaved: true,
}

const useDream = create<DreamStore>((set, get) => ({
    ...initialState,

    setDate: (date: string) => {
        const newDate = new Date(date)
        set((state) => ({ ...state, date: newDate, isSaved: false }))
    },
    setDescription: (description: string) => {
        set((state) => ({ ...state, description: description, isSaved: false }))
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
            tags: TagResponseToTags(resp.data.tags),
            isSaved: true,
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
    update: async () => {
        const body: ControllerDreamRequestBody = {
            date: get().date.toISOString(),
            description: get().description,
        }
        const resp = await api.dreams.dreamsPartialUpdate(get().id.toString(), body)
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.isSaved = true
            }))
        }
        return resp.ok
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

export default useDream