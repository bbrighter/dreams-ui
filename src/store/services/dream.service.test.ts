import { beforeEach, describe, expect, it, vi } from 'vitest'

import { putDreamCategory, putDreamPerson } from '../../__tests__/mocks/dreamCategoriesHandler'
import { getDreamHandler, getDreamsHandler } from '../../__tests__/mocks/dreamsHandlers'
import { server } from '../../__tests__/setupTest'
import api from '../../api/api'
import { useDreams } from '../store'
import { categoriesService } from './categories.service'
import { dreamService } from './dream.service'
import { dreamsService } from './dreams.service'
describe('dream service', () => {
  describe('get dream', () => {
    beforeEach(() => vi.resetAllMocks())
    it('not logged in', async () => {
      const privateDetail = vi.spyOn(api.dreams, 'privateDetail')
      const publicDetail = vi.spyOn(api.dreams, 'dreamsDetail')
      await dreamService.getDream(1)

      const { dream } = useDreams.getState()
      expect(dream.id).toBe(1)
      expect(privateDetail).not.toHaveBeenCalled()
      expect(publicDetail).toHaveBeenCalled()
    })

    it('logged in', async () => {
      const privateDetail = vi.spyOn(api.dreams, 'privateDetail')
      const publicDetail = vi.spyOn(api.dreams, 'dreamsDetail')

      const { setLoggedIn } = useDreams.getState()
      setLoggedIn(true)
      await dreamService.getDream(3)

      const { dream } = useDreams.getState()
      expect(dream.id).toBe(3)
      expect(privateDetail).toHaveBeenCalled()
      expect(publicDetail).not.toHaveBeenCalled()
    })
  })

  describe('patch dream', () => {
    beforeEach(async () => {
      await dreamService.getDream(1)
      await dreamsService.getDreams()
    })
    it('date', async () => {
      const date = new Date()
      await dreamService.patchDreamDate(date)

      const { dream, dreams } = useDreams.getState()
      expect(dream.date).toStrictEqual(date)
      const relevantDream = dreams.find(d => d.id == 1)
      expect(relevantDream?.date).toStrictEqual(date)
    })
    it('rating', async () => {
      const rating = 3
      await dreamService.patchDreamRating(rating)

      const { dream, dreams } = useDreams.getState()
      expect(dream.rating).toStrictEqual(rating)
      const relevantDream = dreams.find(d => d.id == 1)
      expect(relevantDream?.rating).toStrictEqual(rating)
    })
    it('finalize', async () => {
      await dreamService.patchDreamFinalize()
      const { dream, dreams } = useDreams.getState()
      expect(dream.finalized).toBeTruthy()
      const relevantDream = dreams.find(d => d.id == 1)
      expect(relevantDream?.finalized).toBeTruthy()
    })
    it('visiblity', async () => {
      server.use(getDreamHandler({ visible: false }))
      server.use(getDreamsHandler([{ date: '2025-02-01T12:30:00.000Z', finalized: false, id: 1, visible: false }]))
      await dreamService.getDream(1)
      await dreamsService.getDreams()

      await dreamService.patchDreamVisiblity()
      const { dream, dreams } = useDreams.getState()
      expect(dream.visible).toBeTruthy()
      const relevantDream = dreams.find(d => d.id == 1)
      expect(relevantDream?.visible).toBeTruthy()
    })
    it('description', async () => {
      const description = 'description'
      const { setDescription } = useDreams.getState()
      setDescription(description)
      await dreamService.patchDreamDescription()

      const { dream } = useDreams.getState()
      expect(dream.description).toStrictEqual(description)
    })
  })

  describe('add category to dream', () => {
    beforeEach(async () => {
      await dreamService.getDream(1)
      await categoriesService.list()
      vi.resetAllMocks()
    })
    it('new category', async () => {
      const categoriesUpdate = vi.spyOn(api.dreams, 'categoriesUpdate')
      await dreamService.addCategoryToDream('new category')

      const { dream, categories } = useDreams.getState()
      expect(categories).toHaveLength(2)
      expect(dream.categories).toHaveLength(2)
      expect(categoriesUpdate).toHaveBeenCalledWith('1', { name: 'new category' })
    })

    it('existing category', async () => {
      server.use(putDreamCategory({ categories: [{ name: 'Category', id: 1 }] }))
      const categoriesUpdate = vi.spyOn(api.dreams, 'categoriesUpdate')
      await dreamService.addCategoryToDream('Category')

      const { dream, categories } = useDreams.getState()
      expect(categories).toHaveLength(1)
      expect(dream.categories).toHaveLength(2)
      expect(categoriesUpdate).toHaveBeenCalledWith('1', { name: 'Category' })
    })
  })

  describe('remove category from dream', () => {
    beforeEach(async () => {
      await dreamService.getDream(1)
      await categoriesService.list()
      vi.resetAllMocks()
    })
    it('ok', async () => {
      await dreamService.removeCategoryFromDream(1)

      const { dream, categories } = useDreams.getState()
      expect(dream.categories).toHaveLength(0)
      expect(categories).toHaveLength(0)
    })
  })

  describe('add person to dream', () => {
    beforeEach(async () => {
      await dreamService.getDream(1)
      await categoriesService.list()
      vi.resetAllMocks()
    })
    it('new person', async () => {
      const personsUpdate = vi.spyOn(api.dreams, 'personsUpdate')
      await dreamService.addPersonToDream('new person')

      const { dream, persons } = useDreams.getState()
      expect(dream.persons).toHaveLength(2)
      expect(persons).toHaveLength(2)
      expect(personsUpdate).toHaveBeenCalledWith('1', { name: 'new person' })
    })
    it('existing person', async () => {
      server.use(putDreamPerson({ persons: [{ id: 1, name: 'Person' }] }))
      const personsUpdate = vi.spyOn(api.dreams, 'personsUpdate')
      await dreamService.addPersonToDream('Person')

      const { dream, persons } = useDreams.getState()
      expect(dream.persons).toHaveLength(2)
      expect(persons).toHaveLength(1)
      expect(personsUpdate).toHaveBeenCalledWith('1', { name: 'Person' })
    })
  })

  describe('remove person from dream', () => {
    beforeEach(async () => {
      await dreamService.getDream(1)
      await categoriesService.list()
      vi.resetAllMocks()
    })
    it('ok', async () => {
      await dreamService.removePersonFromDream(2)

      const { dream, persons } = useDreams.getState()
      expect(dream.persons).toHaveLength(0)
      expect(persons).toHaveLength(0)
    })
  })
})
