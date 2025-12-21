import { produce } from 'immer'
import { StateCreator } from 'zustand'

import api from '../../api/api'
import { AuthStore } from '../auth/authStore'
import { DreamStore } from '../dream/dreamStore'
import { Categories, categoriesResponseToCategories, Category, TypeParams } from './categories'

type State = {
    categories: Categories
    persons: Categories
    categoriesLoaded: boolean
}

interface Actions {
    resetCategories: () => void
    getCategories: () => Promise<void>
    updateCategories: (categories: Categories) => void
    updatePersons: (persons: Categories) => void

    getCategoriesCount: () => Promise<void>
    renameCategory: (id: number, newName: string) => Promise<void>
    changeType: (id: number, newType: TypeParams) => Promise<void>
    mergeCategories: (sourceId: number, targetId: number, newName: string) => Promise<void>
    deleteCategory: (id: number) => Promise<void>
}

export interface CategoriesStore extends State, Actions { }

const initialState: State = {
    categories: [],
    persons: [],
    categoriesLoaded: false,
}

export const createCategoriesSlice: StateCreator<CategoriesStore & AuthStore & DreamStore, [], [], CategoriesStore> = (set, get) => ({
    ...initialState,
    resetCategories: () => {
        set(initialState)
    },
    getCategories: async () => {
        if (get().categoriesLoaded) return
        const resp = await api.categories.categoriesList()
        set(produce((draft: State) => {
            const { categories, persons } = categoriesResponseToCategories(resp.data)
            draft.categories = categories
            draft.persons = persons
            draft.categoriesLoaded = true
        }))
    },

    updateCategories: (categories: Categories) => {
        set(produce((draft: State) => {
            draft.categories = categories
        }))
    },

    updatePersons: (persons: Categories) => {
        set(produce((draft: State) => {
            draft.persons = persons
        }))
    },

    getCategoriesCount: async () => {
        const resp = await api.categories.categoriesList({ includes: 'dreamsCount' })
        if (!resp.ok) return
        set(produce((draft: State) => {
            const { categories, persons } = categoriesResponseToCategories(resp.data)
            draft.categories = categories
            draft.persons = persons
        }))
    },

    renameCategory: async (id: number, newName: string) => {
        const categoryIndex = get().categories.findIndex(c => c.id == id)
        const personIndex = get().persons.findIndex(p => p.id == id)
        if (categoryIndex < 0 && personIndex < 0) return
        const resp = await api.categories.idNamePartialUpdate(String(id), { name: newName })
        if (!resp.ok) return
        set(produce((draft: State) => {
            if (categoryIndex > -1) {
                draft.categories[categoryIndex].name = newName
            }
 else if (personIndex > -1) {
                draft.persons[personIndex].name = newName
            }
        }))
    },

    changeType: async (id: number, newType: TypeParams) => {
        const categoryIndex = get().categories.findIndex(c => c.id == id)
        const personIndex = get().persons.findIndex(p => p.id == id)
        if (categoryIndex < 0 && personIndex < 0) return
        const resp = await api.categories.idTypePartialUpdate(String(id), { type: newType })
        if (!resp.ok) return
        let itemToMove: Category | undefined
        set(produce((draft: State) => {
            if (categoryIndex > -1) {
                itemToMove = draft.categories.splice(categoryIndex, 1)[0]
            }
 else if (personIndex > -1) {
                itemToMove = draft.persons.splice(personIndex, 1)[0]
            }
            if (!itemToMove) return

            if (newType == TypeParams.CATEGORY) {
                draft.categories.push(itemToMove)
            }
 else if (newType == TypeParams.PERSON) {
                draft.persons.push(itemToMove)
            }
        }))
    },

    mergeCategories: async (sourceId: number, targetId: number, newName: string) => {
        const resp = await api.categories.mergeCreate({
            sourceCategoryId: sourceId,
            targetCategoryId: targetId,
            newName: newName,
        })
        if (!resp.ok) return
        set(produce((draft: State) => {
            const { categories, persons } = categoriesResponseToCategories(resp.data)
            draft.categories = categories
            draft.persons = persons
        }))
    },

    deleteCategory: async (id: number) => {
        const categoriesIndex = get().categories.findIndex(c => c.id == id)
        const personsIndex = get().persons.findIndex(p => p.id == id)
        if (categoriesIndex < 0 && personsIndex < 0) return
        const resp = await api.categories.deleteCategories(String(id))
        if (!resp.ok) return
        set(produce((draft: State) => {
            if (categoriesIndex > -1) {
                draft.categories.splice(categoriesIndex, 1)
            }
 else if (personsIndex > -1) {
                draft.persons.splice(personsIndex, 1)
            }
        }))
    },
})
