import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getCategoriesHandler, postCategoryMergeHandler } from '../../__tests__/mocks/categoryHandlers'
import { server } from '../../__tests__/setupTest'
import api from '../../api/api'
import { useDreams } from '../store'
import { categoriesService } from './categories.service'

describe('categories service', () => {
  describe('list', () => {
    it('list', async () => {
      await categoriesService.list()

      const { categories, persons } = useDreams.getState()
      expect(categories).toHaveLength(1)
      expect(categories[0].id).toBe(1)
      expect(persons).toHaveLength(1)
      expect(persons[0].id).toBe(2)
    })

    it('no persons', async () => {
      server.use(getCategoriesHandler({ categories: [{ id: 1, name: 'Category' }], persons: [] }))

      await categoriesService.list()
      const { categories, persons } = useDreams.getState()
      expect(categories).toHaveLength(1)
      expect(categories[0].id).toBe(1)
      expect(persons).toHaveLength(0)
    })

    it('including count', async () => {
      await categoriesService.list('dreamsCount')
      const { categories, persons } = useDreams.getState()
      expect(categories[0].count).toBe(1)
      expect(persons[0].count).toBe(1)
    })
  })

  describe('rename', () => {
    beforeEach(async () => {
      await categoriesService.list()
    })
    it('rename category', async () => {
      await categoriesService.rename(1, 'new cat')
      const { categories } = useDreams.getState()
      expect(categories[0].name).toBe('new cat')
    })
    it('rename person', async () => {
      await categoriesService.rename(2, 'new person')
      const { persons } = useDreams.getState()
      expect(persons[0].name).toBe('new person')
    })

    it('invalid rename does not change anything', async () => {
      const spy = vi.spyOn(api.categories, 'idNamePartialUpdate')
      await categoriesService.rename(8, 'something')

      expect(spy).not.toHaveBeenCalled()
      const { categories, persons } = useDreams.getState()
      expect(categories[0].name).toBe('Category')
      expect(persons[0].name).toBe('Person')
    })
  })

  describe('delete', () => {
    beforeEach(async () => {
      await categoriesService.list()
    })
    it('delete person', async () => {
      await categoriesService.delete(2)

      const { persons, categories } = useDreams.getState()
      expect(categories).toHaveLength(1)
      expect(persons).toHaveLength(0)
    })
    it('delete category', async () => {
      await categoriesService.delete(1)

      const { categories, persons } = useDreams.getState()
      expect(categories).toHaveLength(0)
      expect(persons).toHaveLength(1)
    })
    it('invalid id', async () => {
      const spy = vi.spyOn(api.categories, 'deleteCategories')
      await categoriesService.delete(100)
      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('change type', () => {
    beforeEach(async () => {
      await categoriesService.list()
    })
    it('change category', async () => {
      await categoriesService.changeType(1)

      const { categories, persons } = useDreams.getState()
      expect(categories).toHaveLength(0)
      expect(persons).toHaveLength(2)
    })
    it('change person', async () => {
      await categoriesService.changeType(2)

      const { categories, persons } = useDreams.getState()
      expect(categories).toHaveLength(2)
      expect(persons).toHaveLength(0)
    })
    it('invalid id', async () => {
      const spy = vi.spyOn(api.categories, 'idTypePartialUpdate')
      await categoriesService.changeType(100)
      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('merge', () => {
    beforeEach(async () => {
      await categoriesService.list()
    })
    it('merge person into category', async () => {
      server.use(postCategoryMergeHandler({ categories: [{ id: 1, name: 'new name' }] }))
      await categoriesService.merge(2, 1, 'new name')

      const { categories, persons } = useDreams.getState()
      expect(categories).toHaveLength(1)
      expect(categories[0].name).toBe('new name')
      expect(persons).toHaveLength(0)
    })
    it('merge category into person', async () => {
      server.use(postCategoryMergeHandler({ persons: [{ id: 2, name: 'new name' }] }))
      await categoriesService.merge(1, 2, 'new name')

      const { categories, persons } = useDreams.getState()
      expect(categories).toHaveLength(0)
      expect(persons).toHaveLength(1)
      expect(persons[0].name).toBe('new name')
    })
  })
})
