import { StateCreator } from "zustand"

import { CategorySlice, CategoryState } from "./categories.interface"
import { Categories, CategoryType } from "./categories.types"

const createInitialSlice = (): CategoryState => ({
  categories: [],
  categoriesLoaded: false,
})

export const createCategoriesSlice: StateCreator<CategoryState, [["zustand/immer", never]], [], CategorySlice> = (set, get) => ({
  ...createInitialSlice(),
  resetCategories: () => {
    const { categories, categoriesLoaded } = createInitialSlice()
    set((draft) => {
      draft.categories = categories
      draft.categoriesLoaded = categoriesLoaded
    })
  },
  setCategories: (cats: Categories) => {
    set((draft: CategoryState) => {
      draft.categories = cats
    })
  },

  renameCategory: (id: number, newName: string) => {
    const categoryIndex = get().categories.findIndex(c => c.id == id)
    if (categoryIndex < 0) return
    set((draft: CategoryState) => {
      draft.categories[categoryIndex].name = newName
    })
  },

  setCategoryType: (id: number, type: CategoryType) => {
    const categoryIndex = get().categories.findIndex(c => c.id == id)
    if (categoryIndex < 0) return
    set((draft: CategoryState) => {
      draft.categories[categoryIndex].type = type
    })
  },

  setCategoriesLoaded: (isLoaded: boolean) => {
    set((draft: CategoryState) => {
      draft.categoriesLoaded = isLoaded
    })
  },

})
