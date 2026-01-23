import { EntityCategoriesResponse, EntityCategoryResponse } from '../../api/generated_api'

export type Category = {
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
