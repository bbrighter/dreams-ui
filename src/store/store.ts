import { create } from "zustand"
import { produce } from "immer"

import { EntityCountsResponse, HttpResponse, V1DreamRequestBody } from "../api/generated_api"
import api from "../api/api"
import { Dream, dreamResponseToDream } from "./dream"
import { categoryResponseToCategories, Categories } from "./categories"
import { personsResponseToPersons, Persons } from "./persons"
import { Dreams, dreamsResponseToDreams } from "./dreams"
import { Statistics, controllerCountsResponseToStatistic } from "./statistics"
import { Password } from "./password"


const STATISTICS_LIMITS = 40

interface State extends Categories, Persons, Dreams, Statistics, Password {
    dream: Dream
}

interface Actions {
    // Dream
    setDate: (date: string) => void,
    setDescription: (description: string) => void,
    getDream: (id: number | string) => Promise<void>,
    createDream: () => Promise<number>,
    updateDream: () => Promise<boolean>,
    // Private dreams
    changevisiblity: () => Promise<void>,
    getPrivateDreams: () => Promise<void>,
    getPrivateDream: (id: number | string) => Promise<void>,
    // Dreams
    getDreams: () => Promise<void>
    deleteDream: (id: number) => Promise<void>
    // Categories
    getCategories: () => Promise<void>,
    addCategory: (name: string) => Promise<boolean>
    removeCategory: (id: number) => Promise<boolean>
    // Persons
    getPersons: () => Promise<void>
    addPerson: (name: string) => Promise<void>
    removePerson: (id: number) => Promise<void>
    // Statistics
    getStatistics: (showAll: boolean) => Promise<void>
    // Password
    setPassword: (password: string) => void
    isValidPassword: () => boolean
}

interface Store extends State, Actions { }

const initialState: State = {
    dream: {
        id: 0,
        date: new Date(),
        description: "",
        categories: [],
        persons: [],
        isSaved: true,
        visible: true,
    },
    dreams: [],
    categories: [],
    persons: [],
    categoriesCount: [],
    personsCount: [],
    password: "",
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
        const resp = await api.v1.dreamsDetail(id.toString())
        if (!resp.ok) {
            alert(resp.statusText)
        }
        set(produce((draft: State) => {
            draft.dream = dreamResponseToDream(resp.data)
        }))
    },
    createDream: async () => {
        const date = new Date()
        const body: V1DreamRequestBody = {
            date: date.toISOString(),
        }
        const resp = await api.v1.dreamsCreate(body)
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
        const body: V1DreamRequestBody = {
            date: get().dream.date.toISOString(),
            description: get().dream.description,
        }
        const resp = await api.v1.dreamsPartialUpdate(get().dream.id.toString(), body)
        if (resp.ok) {
            set(produce((draft: State) => { draft.dream.isSaved = true }))
        }
        return resp.ok
    },
    // Private dreams
    changevisiblity: async () => {
        api.setSecurityData(get().password)
        const resp = await api.v1.dreamsPrivatePartialUpdate(get().dream.id.toString())
        if (resp.ok) {
            set(produce((draft: State) => { draft.dream.visible = !draft.dream.visible }))
        }
    },
    getPrivateDream: async (id: string | number) => {
        api.setSecurityData(get().password)
        const resp = await api.v1.dreamsPrivateDetail(id.toString())
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dream = dreamResponseToDream(resp.data)
            }))
        }
    },
    getPrivateDreams: async () => {
        api.setSecurityData(get().password)
        const resp = await api.v1.dreamsPrivateList({ secure: true })
        const dreams = dreamsResponseToDreams(resp.data)
        dreams.dreams.sort((a, b) => b.date.getTime() - a.date.getTime())
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dreams = dreams.dreams
            }))
        }
    },
    // Dreams
    getDreams: async () => {
        const resp = await api.v1.dreamsList()
        const dreams = dreamsResponseToDreams(resp.data)
        dreams.dreams.sort((a, b) => b.date.getTime() - a.date.getTime())
        set(produce((draft: State) => {
            draft.dreams = dreams.dreams
        }))
    },
    deleteDream: async (id: number) => {
        const resp = await api.v1.dreamsDelete(id.toString())
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dreams = draft.dreams.filter(d => d.id != id)
            }))
        }
    },

    // Tags
    getCategories: async () => {
        const resp = await api.v1.categoriesList()
        set(produce((draft: State) => {
            draft.categories = categoryResponseToCategories(resp.data)
        }))
    },

    addCategory: async (name: string): Promise<boolean> => {
        const resp = await api.v1.dreamsCategoriesUpdate(get().dream.id.toString(), { name: name })
        const newTagId = resp.data.categories.find(c => c.name == name)?.id
        if (resp.ok && newTagId) {
            set(produce((draft: State) => {
                draft.categories = categoryResponseToCategories(resp.data)
                draft.dream.categories.push({ id: newTagId, name: name })
            }))
        }
        return resp.ok
    },

    removeCategory: async (id: number) => {
        const resp = await api.v1.dreamsCategoriesDelete(get().dream.id.toString(), id.toString())
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.categories = categoryResponseToCategories(resp.data)
                draft.dream.categories = draft.dream.categories.filter(t => t.id != id)
            }))
        }
        return resp.ok
    },

    // Persons
    getPersons: async () => {
        const resp = await api.v1.personsList()
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.persons = personsResponseToPersons(resp.data)
            }))
        }
    },
    addPerson: async (name: string) => {
        const resp = await api.v1.dreamsPersonsUpdate(get().dream.id.toString(), { name: name })
        const newPersonId = resp.data.persons.find(p => p.name == name)?.id
        if (resp.ok && newPersonId) {
            set(produce((draft: State) => {
                draft.dream.persons.push({ id: newPersonId, name: name })
                draft.persons = personsResponseToPersons(resp.data)
            }))
        }
    },
    removePerson: async (id: number) => {
        const dreamId = get().dream.id.toString()
        const personId = id.toString()
        const resp = await api.v1.dreamsPersonsDelete(dreamId, personId)
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dream.persons = draft.dream.persons.filter(p => p.id != id)
                draft.persons = personsResponseToPersons(resp.data)
            }))
        }
    },

    // Statistics
    getStatistics: async (showAll: boolean) => {
        let resp: HttpResponse<EntityCountsResponse>
        if (showAll) {
            api.setSecurityData(get().password)
            resp = await api.v1.statisticsList({ limit: STATISTICS_LIMITS })
        } else {
            resp = await api.v1.statisticsList({ limit: STATISTICS_LIMITS })
        }
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.categoriesCount = controllerCountsResponseToStatistic(resp.data, "category")
                draft.personsCount = controllerCountsResponseToStatistic(resp.data, "person")
            }))
        }
    },

    // Password
    setPassword: (password: string) => {
        set(produce((draft: State) => {
            draft.password = password
        }))
    },
    isValidPassword: () => {
        const password = get().password
        return password == "080388"
    },
}))

export default useDreams