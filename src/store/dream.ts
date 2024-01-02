import { create } from "zustand"
import { get } from "./api"
import { DreamRequestBody, isDreamResponse } from "./interface"
import { dreamURL, dreamsURL } from "./url"

interface State {
    id: number
    date: Date
    description: string
}

interface Actions {
    setDate: (date: string) => void,
    setDescription: (description: string) => void,
    get: (id: number | string) => Promise<void>,
    create: () => Promise<number>,
}

interface DreamStore extends State, Actions { }

const initialState: State = {
    id: 0,
    date: new Date(),
    description: ""
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
        const url = dreamURL(id)
        const resp = await get(url, isDreamResponse)
        set({
            id: resp.id,
            date: new Date(resp.date),
            description: resp.description
        })
    },
    create: async () => {
        const date = new Date()
        const body: DreamRequestBody = {
            date: date.toISOString(),
        }
        const url = dreamsURL()
        const init: RequestInit = {
            method: 'POST',
            body: JSON.stringify(body)
        }
        const resp = await fetch(url, init)
        const id = await resp.json()
        set({
            id: id,
            date: date
        })
        return id
    },
}))

export default useDream