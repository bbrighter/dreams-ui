import { produce } from 'immer';
import { StateCreator } from 'zustand';

import api from '../../api/api';
import { AuthStore } from '../auth/authStore';
import { DreamStore } from '../dream/dreamStore';
import { Categories, categoryResponseToCategories } from './categories';
import { categoryResponseToPersons, Persons } from './persons';


type State = {
    categories: Categories,
    persons: Persons,
    categoriesLoaded: boolean
}

interface Actions {
    resetCategories: () => void
    getCategories: () => Promise<void>
    updateCategories: (categories: Categories) => void
    updatePersons: (persons: Persons) => void
}


export interface CategoriesStore extends State, Actions { }

const initialState: State = {
    categories: [],
    persons: [],
    categoriesLoaded: false,
}

export const createCategoriesSlice: StateCreator<CategoriesStore & AuthStore & DreamStore, [], [], CategoriesStore> = ((set, get) => ({
    ...initialState,
    resetCategories: () => {
        set(initialState)
    },
    getCategories: async () => {
        if (get().categoriesLoaded) return
        const resp = await api.categories.categoriesList()
        set(produce((draft: State) => {
            draft.categories = categoryResponseToCategories(resp.data)
            draft.persons = categoryResponseToPersons(resp.data)
            draft.categoriesLoaded = true
        }))
    },

    updateCategories: (categories: Categories) => {
        set(produce((draft: State) => {
            draft.categories = categories
        }))
    },

    updatePersons: (persons: Persons) => {
        set(produce((draft: State) => {
            draft.persons = persons
        }))
    },
}))