import { EntityCategoriesResponse, EntityCategoryResponse } from '../../api/generated_api'

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

export interface Category {
  id: number
  name: string
  count?: number
}

export type Categories = Array<Category>

export function categoriesResponseToCategories(resp: EntityCategoriesResponse | undefined): { categories: Array<Category>, persons: Array<Category> } {
  return {
    categories: categoryResponseToCategories(resp?.categories),
    persons: categoryResponseToCategories(resp?.persons),
  }
}

export function categoryResponseToCategories(resp: EntityCategoryResponse[] | undefined): Array<Category> {
  return resp?.map(t => ({ id: t.id, name: t.name, count: t.count })) ?? []
}

export enum IncludeParams {
  // PERSONS = 'persons',
  // CATEGORIES = 'categories',
  ALL = 'persons,categories',
}

export enum TypeParams {
  PERSON = 'person',
  CATEGORY = 'category',
}
