import { produce } from 'immer';
import { StateCreator } from 'zustand';

import api from '../../api/api';
import { V1PostDreamRequest, V1UpdateDreamRequest } from '../../api/generated_api';
import { AuthStore } from '../auth/authStore';
import { categoryResponseToCategories } from '../categories/categories';
import { CategoriesStore } from '../categories/categoriesStore';
import { IncludeParam, personsResponseToPersons } from '../categories/persons';
import { Dream, dreamResponseToDream } from './dream';
import { Dreams, dreamsResponseToDreams } from './dreams';


interface State {
    dream: Dream
    dreams: Dreams
    dreamsLoaded: 'public' | 'all' | 'none'
    scrollPosition: number
}

interface Actions {
    resetDream: () => void
    setDate: (date: string) => void
    setDescription: (description: string) => void
    getDream: (id: number | string) => Promise<void>
    createDream: () => Promise<number>
    updateDate: (date: string) => Promise<boolean>
    updateDescription: () => Promise<boolean>
    finalizeDream: () => Promise<void>
    rateDream: (rating: number) => Promise<void>
    changeVisibility: () => Promise<void>
    addCategory: (name: string) => Promise<boolean>
    removeCategory: (id: number) => Promise<boolean>
    addPerson: (name: string) => Promise<void>
    removePerson: (id: number) => Promise<void>

    resetDreams: () => void
    getDreams: (include?: IncludeParam) => Promise<void>
    deleteDream: (id: number) => Promise<void>

    setScrollPosition: (pos: number) => void
    setTranscript: (transcript: string) => void
}

export interface DreamStore extends State, Actions { }

const initialState: State = {
    dream: {
        date: new Date(),
        description: '',
        finalized: false,
        id: 0,
        isSaved: false,
        persons: [],
        categories: [],
        visible: true,
        rating: null,
        transcript: '',
    },
    dreams: [],
    dreamsLoaded: 'none',
    scrollPosition: 0,

}

export const createDreamSlice: StateCreator<DreamStore & CategoriesStore & AuthStore, [], [], DreamStore> = ((set, get) => ({
    ...initialState,
    resetDream: () => set(produce((draft: State) => {
        draft.dream = initialState.dream
    })),
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
        const idStr = id.toString()
        const resp = get().loggedIn ? await api.dreams.privateDetail(idStr) : await api.dreams.dreamsDetail(idStr)
        if (!resp.ok) {
            alert(resp.statusText)
        }
        set(produce((draft: State) => {
            draft.dream = dreamResponseToDream(resp.data)
        }))
    },
    createDream: async () => {
        const date = new Date()
        const body: V1PostDreamRequest = {
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
            draft.dreams.unshift({ id: id, date: date, visible: true, finalized: false, persons: [], categories: [], rating: null })
        }))
        return id
    },
    updateDescription: async () => {
        const body: V1UpdateDreamRequest = {
            description: get().dream.description,
        }
        const resp = await api.dreams.dreamsPartialUpdate(get().dream.id.toString(), body)
        if (resp.ok) {
            set(produce((draft: State) => { draft.dream.isSaved = true }))
        }
        return resp.ok
    },
    updateDate: async (date: string) => {
        const body: V1UpdateDreamRequest = { date: date }
        const resp = await api.dreams.dreamsPartialUpdate(get().dream.id.toString(), body)
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dream.date = new Date(date)
            }))
        }
        return resp.ok
    },
    changeVisibility: async () => {
        const resp = await api.dreams.privatePartialUpdate(get().dream.id.toString())
        if (resp.ok) {
            set(produce((draft: State) => { draft.dream.visible = !draft.dream.visible }))
        }
    },
    finalizeDream: async () => {
        const id = get().dream.id
        const dreamIndex = get().dreams.findIndex(d => d.id == id)
        if (dreamIndex < 0) {
            return
        }
        const resp = await api.dreams.finalizePartialUpdate(id.toString())
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dream.finalized = true
                draft.dreams[dreamIndex].finalized = true
            }))
        }
    },
    rateDream: async (rating: number) => {
        const id = get().dream.id
        const dreamIndex = get().dreams.findIndex(d => d.id == id)
        if (dreamIndex < 0) {
            return
        }
        const body: V1UpdateDreamRequest = { rating: rating }
        const resp = await api.dreams.dreamsPartialUpdate(id.toString(), body)
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dream.rating = rating
                draft.dreams[dreamIndex].rating = rating
            }))
        }
    },

    resetDreams: () => set((produce((draft: State) => {
        draft.dreams = initialState.dreams
        draft.dreamsLoaded = 'none'
    }))),

    getDreams: async (include?: IncludeParam) => {
        const loaded = (get().loggedIn && get().dreamsLoaded == 'all') || (get().dreamsLoaded == 'public' && !get().loggedIn)
        if (include == undefined && loaded) return
        const params = include ? { includes: include } : {}
        const resp = get().loggedIn ? await api.dreams.privateList() : await api.dreams.dreamsList(params)
        const dreams = dreamsResponseToDreams(resp.data)
        dreams.sort((a, b) => b.date.getTime() - a.date.getTime())
        set(produce((draft: State) => {
            draft.dreams = dreams
            draft.dreamsLoaded = get().loggedIn ? 'all' : 'public'
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

    addCategory: async (name: string): Promise<boolean> => {
        const resp = await api.dreams.categoriesUpdate(get().dream.id.toString(), { name: name })
        const newTagId = resp.data.categories?.find(c => c.name == name)?.id
        if (resp.ok && newTagId) {
            set(produce((draft: State) => {
                draft.dream.categories.push({ id: newTagId, name: name })
            }))
            get().updateCategories(categoryResponseToCategories(resp.data))
        }
        return resp.ok
    },

    removeCategory: async (id: number) => {
        const resp = await api.dreams.categoriesDelete(get().dream.id.toString(), id.toString())
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dream.categories = draft.dream.categories.filter(t => t.id != id)
            }))
            get().updateCategories(categoryResponseToCategories(resp.data))
        }
        return resp.ok
    },

    addPerson: async (name: string) => {
        const resp = await api.dreams.personsUpdate(get().dream.id.toString(), { name: name })
        const newPersonId = resp.data.persons?.find(p => p.name == name)?.id
        if (resp.ok && newPersonId) {
            set(produce((draft: State) => {
                draft.dream.persons.push({ id: newPersonId, name: name })
            }))
            get().updatePersons(personsResponseToPersons(resp.data))
        }
    },
    removePerson: async (id: number) => {
        const dreamId = get().dream.id.toString()
        const personId = id.toString()
        const resp = await api.dreams.personsDelete(dreamId, personId)
        if (resp.ok) {
            set(produce((draft: State) => {
                draft.dream.persons = draft.dream.persons.filter(p => p.id != id)
            }))
            get().updatePersons(personsResponseToPersons(resp.data))
        }
    },

    setScrollPosition: (pos: number) => {
        set(produce((draft: State) => { draft.scrollPosition = pos }))
    },
    setTranscript: (transcript: string) => {
        set(produce((draft: State) => { draft.dream.transcript = transcript }))
    },

}))