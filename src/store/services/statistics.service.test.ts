import { beforeEach, describe, expect, it, vi } from 'vitest'

import api from '../../api/api'
import { useDreams } from '../store'
import { statisticsService } from './statistics.service'

describe('statistics service', () => {
  describe('get statistics', () => {
    beforeEach(() => {
      vi.resetAllMocks()
    })
    it(' not logged in', async () => {
      const statisticsList = vi.spyOn(api.statistics, 'statisticsList')
      const { setToken } = useDreams.getState()
      setToken('')

      await statisticsService.getStatistics()
      expect(statisticsList).toHaveBeenCalled()
      const { categoriesCount, personsCount } = useDreams.getState()
      expect(categoriesCount).toHaveLength(1)
      expect(categoriesCount[0].count).toBe(2)
      expect(personsCount).toHaveLength(1)
      expect(personsCount[0].count).toBe(5)
    })
    it('logged in', async () => {
      const statisticsList = vi.spyOn(api.private, 'statisticsList')
      const { setToken } = useDreams.getState()
      setToken('token')

      await statisticsService.getStatistics()
      expect(statisticsList).toHaveBeenCalled()
      const { categoriesCount, personsCount } = useDreams.getState()
      expect(categoriesCount).toHaveLength(1)
      expect(categoriesCount[0].count).toBe(3)
      expect(personsCount).toHaveLength(1)
      expect(personsCount[0].count).toBe(6)
    })
  })
})
