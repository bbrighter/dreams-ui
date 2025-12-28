import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { StoreState } from '../interface'
import { Categories, Category, CategorySlice, CategoryState } from '../types/categories.types'

const createInitialSlice = (): CategoryState => ({
    categories: [],
    categoriesLoaded: false,
    persons: [],
})

export const createCategoriesSlice: StateCreator<StoreState, [], [], CategorySlice> = (set, get) => ({
    ...createInitialSlice(),
    resetCategories: () => {
        const { categories, categoriesLoaded, persons } = createInitialSlice()
        set(produce((draft: CategoryState) => {
            draft.categories = categories
            draft.categoriesLoaded = categoriesLoaded
            draft.persons = persons
    }))
},
    setCategories: (cats: Categories, pers: Categories) => {
        set(produce((draft: CategoryState) => {
            draft.categories = cats
            draft.persons = pers
            draft.categoriesLoaded = true
        }))
    },

    addCategory: (cat: Category) => {
        set(produce((draft: CategoryState) => {
            draft.categories.push(cat)
        }))
    },
    addPerson: (per: Category) => {
        set(produce((draft: CategoryState) => {
            draft.persons.push(per)
        }))
    },
    deleteCategory: (id: number) => {
        const filteredCats = get().categories.filter(c => c.id != id)
        set(produce((draft: CategoryState) => {
            draft.categories = filteredCats
        }))
    },
    deletePerson: (id: number) => {
        const filteredPers = get().persons.filter(c => c.id != id)
        set(produce((draft: CategoryState) => {
            draft.persons = filteredPers
        }))
    },
    renameCategory: (id: number, newName: string) => {
        const categoryIndex = get().categories.findIndex(c => c.id == id)
        if (categoryIndex < 0) return

        set(produce((draft: CategoryState) => {
                draft.categories[categoryIndex].name = newName
        }))
    },

    renamePerson: (id: number, newName: string) => {
        const personIndex = get().persons.findIndex(p => p.id == id)
        if (personIndex < 0) return

        set(produce((draft: CategoryState) => {
            draft.persons[personIndex].name = newName
        }))
    },
    changeCategoryType: (id: number) => {
        const itemToMove = get().categories.find(c => c.id == id)
        if (!itemToMove) return

        set(produce((draft: CategoryState) => {
            draft.categories = get().categories.filter(c => c.id != id)
            draft.persons.push(itemToMove)
        }))
    },

    changePersonType: (id: number) => {
        const itemToMove = get().persons.find(c => c.id == id)
        if (!itemToMove) return

        set(produce((draft: CategoryState) => {
            draft.categories.push(itemToMove)
            draft.persons = get().persons.filter(p => p.id != id)
        }))
    },

})
