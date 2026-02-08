import { Categories, CategoryType } from './categories.types'

export interface CategoryState {
  categories: Categories
  categoriesLoaded: boolean
}

interface CategoryActions {
  resetCategories: () => void
  setCategories: (cats: Categories) => void
  renameCategory: (id: number, newName: string) => void
  setCategoryType: (id: number, type: CategoryType) => void
  setCategoriesLoaded: (isLoaded: boolean) => void
}

export type CategorySlice = CategoryState & CategoryActions
