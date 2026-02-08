import { beforeEach, describe, expect, it, vi } from 'vitest'

import { postCategoryMergeHandler } from '../../__tests__/mocks/categoryHandlers'
import { server } from '../../__tests__/setupTest'
import { EntityCategoryType } from '../../api/generated_api'
import { useDreams } from '../store'
import { categoriesService } from './categories.service'

describe('categories service', () => {
  describe('list', () => {
    it('list', async () => {
      await categoriesService.list()

      const { categories } = useDreams.getState()
      expect(categories).toHaveLength(2)
      expect(categories).toContainEqual({ id: 1, type: 'category', name: 'Category' })
      expect(categories).toContainEqual({ id: 2, type: 'person', name: 'Person' })
    })
  })

  describe('rename', () => {
    beforeEach(async () => {
      await categoriesService.list()
    })
    it('rename category', async () => {
      await categoriesService.rename(1, 'new cat')
      const { categories } = useDreams.getState()
      expect(categories).toContainEqual(
        expect.objectContaining(
          { name: 'new cat', id: 1 }),
      )
    })

    it('invalid rename does not change anything', async () => {
      await categoriesService.rename(8, 'something')

      const { categories } = useDreams.getState()
      expect(categories).not.toContainEqual(
        expect.objectContaining({ name: 'something' }),
      )
    })
  })

  describe('delete', () => {
    beforeEach(async () => {
      await categoriesService.list()
    })
    it('delete person', async () => {
      await categoriesService.delete(2)

      const { categories } = useDreams.getState()
      expect(categories).toHaveLength(1)
      expect(categories.some(c => c.id == 2)).toBeFalsy()
    })

    it('invalid id', async () => {
      await categoriesService.delete(100)

      const { categories } = useDreams.getState()
      expect(categories).toHaveLength(2)
    })
  })

  describe('change type', () => {
    beforeEach(async () => {
      await categoriesService.list()
    })
    it('change category', async () => {
      await categoriesService.changeType(1)

      const { categories } = useDreams.getState()
      expect(categories).toHaveLength(2)
      expect(categories[0].id).toBe(1)
      expect(categories[0].type).toBe('person')
    })
    it('invalid id', async () => {
      const { categories: oldCategories } = useDreams.getState()
      await categoriesService.changeType(100)

      const { categories } = useDreams.getState()
      expect(categories).toBe(oldCategories)
    })
  })

  describe('merge', () => {
    beforeEach(async () => {
      await categoriesService.list()
    })
    it('merge person into category', async () => {
      server.use(postCategoryMergeHandler({ categories: [{ id: 1, name: 'new name', type: EntityCategoryType.TypeCategory }] }))
      await categoriesService.merge(2, 1, 'new name')

      const { categories } = useDreams.getState()
      expect(categories).toHaveLength(1)
      expect(categories).toContainEqual({ id: 1, name: 'new name', type: 'category' })
    })
  })
})
