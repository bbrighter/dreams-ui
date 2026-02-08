import { EntityCategoriesResponse, EntityCategoryType } from '../../api/generated_api'

export type CategoryType = `${EntityCategoryType}`

export const toEntityCategoryType = (t: CategoryType): EntityCategoryType => {
  return t == 'category' ? EntityCategoryType.TypeCategory : EntityCategoryType.TypePerson
}

export type Category = {
  id: number
  name: string
  type: CategoryType
}

export type Categories = Array<Category>

export function categoriesResponseToCategories(resp: EntityCategoriesResponse): Array<Category> {
  return resp.categories.map(c => ({
    id: c.id, name: c.name, type: c.type,
  }))
}
