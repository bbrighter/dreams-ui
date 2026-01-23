import { Categories } from './categories.types'

export interface CategoryState {
  categories: Categories
  persons: Categories
  categoriesLoaded: boolean
}

interface CategoryActions {
  resetCategories: () => void
  setCategories: (cats: Categories, pers: Categories) => void
  deleteCategory: (id: number) => void
  deletePerson: (id: number) => void
  renameCategory: (id: number, newName: string) => void
  renamePerson: (id: number, newName: string) => void
  changeCategoryType: (id: number) => void
  changePersonType: (id: number) => void
}

export type CategorySlice = CategoryState & CategoryActions
