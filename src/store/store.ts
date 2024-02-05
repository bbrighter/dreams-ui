import { create } from "zustand"
import { produce } from "immer"

import { ControllerDreamRequestBody } from "../api/generated_api"
import api from "../api/api"
import { Dream, dreamResponseToDream } from "./dream"
import { tagResponseToTags, Tags } from "./tags"
import { personsResponseToPersons, Persons } from "./persons"
import { Dreams, dreamsResponseToDreams } from "./dreams"


interface State extends Tags, Persons, Dreams {
    dream: Dream
}

interface Actions {
    // Dream
    setDate: (date: string) => void,
    setDescription: (description: string) => void,
    getDream: (id: number | string) => Promise<void>,
    createDream: () => Promise<number>,
    updateDream: () => Promise<boolean>,
    // Dreams
    getDreams: () => Promise<void>
    deleteDream: (id: number) => Promise<void>
    // Tags
    getTags: () => Promise<void>,
    addTag: (title: string) => Promise<boolean>
    removeTag: (tagId: number) => Promise<boolean>
    // Persons
    getPersons: () => Promise<void>
    addPerson: (name: string) => Promise<void>
    removePerson: (id: number) => Promise<void>
}

interface Store extends State, Actions { }

const initialState: State = {
    dream: {
        id: 0,
        date: new Date(),
        description: "",
        tags: [],
        persons: [],
        isSaved: true,
    },
    dreams: [],
    tags: [],
    persons: [],
}

const useDreams = create<Store>((set, get) => ({
    ...initialState,

    setDate: (date: string) => {
        set(produce((draft: State) => {
            draft.dream.date = new Date(date)
            draft.dream.isSaved = false
        }))
    },
    setDescription: (description: string) => {
        set(produce((draft: State) => {
            draft.dream.description = description
            draft.dream.isSaved = false
        }))
    },
    getDream: async (id: number | string) => {
        const resp = await api.dreams.dreamsDetail(id.toString())
        if (!resp.ok) {
            alert(resp.statusText)
        }
        set(produce((draft: State) => {
            draft.dream = dreamResponseToDream(resp.data)
        }))
    },
    createDream: async () => {
        const date = new Date()
        const body: ControllerDreamRequestBody = {
            date: date.toISOString(),
        }
        const resp = await api.dreams.dreamsCreate(body)
        if (!resp.ok) {
            alert(resp.statusText)
        }
        const id = resp.data
        set(produce((draft: State) => {
            draft.dream.id = id
            draft.dream.date = date
        }))
        return id
    },
    updateDream: async () => {
        const body: ControllerDreamRequestBody = {
            date: get().dream.date.toISOString(),
            description: get().dream.description,
        }
        const resp = await api.dreams.dreamsPartialUpdate(get().dream.id.toString(), body)
        if (resp.ok) {
            set(produce((draft: State) => { draft.dream.isSaved = true }))
        }
        return resp.ok
    },

    // Dreams
    getDreams: async () => {
        const resp = await api.dreams.dreamsList()
        const dreams = dreamsResponseToDreams(resp.data)
        dreams.dreams.sort((a, b) => b.date.getTime() - a.date.getTime())
        set(produce((draft: State) => {
            draft.dreams = dreams.dreams
        }))
    },
    deleteDream: async (id: number) => {
        const resp = await api.dreams.dreamsDelete(id.toString())
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dreams = draft.dreams.filter(d => d.id != id)
            }))
        }
    },

    // Tags
    getTags: async () => {
        const resp = await api.tags.tagsList()
        set(produce((draft: State) => {
            draft.tags = tagResponseToTags(resp.data.tags)
        }))
    },

    addTag: async (title: string): Promise<boolean> => {
        const resp = await api.dreams.tagsUpdate(get().dream.id.toString(), { title: title })
        const newTagId = resp.data.tags.find(t => t.title == title)?.id
        if (resp.ok && newTagId) {
            set(produce((draft: State) => {
                draft.tags = tagResponseToTags(resp.data.tags)
                draft.dream.tags.push({ id: newTagId, title: title })
            }))
        }
        return resp.ok
    },

    removeTag: async (tagId: number) => {
        const resp = await api.dreams.tagsDelete(get().dream.id.toString(), tagId.toString())
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.tags = tagResponseToTags(resp.data.tags)
                draft.dream.tags = draft.dream.tags.filter(t => t.id != tagId)
            }))
        }
        return resp.ok
    },

    // Persons
    getPersons: async () => {
        const resp = await api.persons.personsList()
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.persons = personsResponseToPersons(resp.data)
            }))
        }
    },
    addPerson: async (name: string) => {
        const resp = await api.dreams.personsUpdate(get().dream.id.toString(), { name: name })
        if (resp.ok) {
            const newPerson = { id: resp.data, name: name }
            const shouldAddPerson = get().persons.findIndex(p => p.id == resp.data && p.name == name) == -1
            const shoudAddPersonToDream = get().dream.persons.findIndex(p => p.id == resp.data && p.name == name) == -1
            set(produce((draft: State) => {
                if (shouldAddPerson) {
                    draft.persons.push(newPerson)
                }
                if (shoudAddPersonToDream) {
                    draft.dream.persons.push(newPerson)
                }
            }))
        }
    },
    removePerson: async (id: number) => {
        const dreamId = get().dream.id.toString()
        const personId = id.toString()
        const resp = await api.dreams.personsDelete(dreamId, personId)
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dream.persons = draft.dream.persons.filter(p => p.id != id)
                draft.persons = personsResponseToPersons(resp.data.persons)
            }))
        }
    },
}))

export default useDreams