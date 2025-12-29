import { http, HttpResponse } from 'msw'

import { EntityCategoriesResponse, V1MergeCategoriesParams } from '../../api/generated_api'
import { cat1, initialCategories, pers1 } from './initialValues'

export const getCategoriesHandler = (overrides?: EntityCategoriesResponse) => http.get('/categories', ({ request }) => {
  const url = new URL(request.url)
  const includeCount = url.searchParams.get('includes') == 'dreamsCount'
  if (includeCount) {
    return HttpResponse.json({
      categories: [{ count: 1, ...cat1 }],
      persons: [{ count: 1, ...pers1 }],
    } satisfies EntityCategoriesResponse)
  }
  return HttpResponse.json(initialCategories(overrides))
})

export const patchCategoryName = http.patch('/categories/:catId/name', () => HttpResponse.json({}))

export const patchCategoryType = http.patch('/categories/:catId/type', () => HttpResponse.json({}))

export const postCategoryMergeHandler = (overrides?: EntityCategoriesResponse) => (http.post('/categories/merge', async ({ request }) => {
  if (overrides) {
    return HttpResponse.json(overrides)
  }
  const body = await request.clone().json() as V1MergeCategoriesParams
  const newName = body.newName
  if (body.sourceCategoryId != 1 || body.targetCategoryId != 2) {
    throw 'invalid test input, source must be 1, target 2'
  }
  return HttpResponse.json({
    persons: [{ ...pers1, name: newName }],
  } satisfies EntityCategoriesResponse)
}))

export const deleteCategory = http.delete('/categories/:catId', () => HttpResponse.json({}))
