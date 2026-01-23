import { expect, test } from 'vitest'

import { EntityCategoriesResponse } from '../../api/generated_api'
import { categoriesResponseToCategories } from './categories.types'

test('categoriesResponseToCategories', () => {
  const resp: EntityCategoriesResponse = {
    categories: [
      { id: 1, name: 'Title' },
      { id: 2, name: 'Title 2' },
    ],
    persons: [
      { id: 3, name: 'Person' },
    ],
  }

  const categories = categoriesResponseToCategories(resp)

  expect(categories.categories).toHaveLength(2)
  expect(categories.categories[0].id).toBe(1)
  expect(categories.categories[0].name).toBe('Title')

  expect(categories.persons).toHaveLength(1)
  expect(categories.persons[0].id).toBe(3)
  expect(categories.persons[0].name).toBe('Person')
})
