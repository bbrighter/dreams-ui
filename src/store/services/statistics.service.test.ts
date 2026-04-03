import { beforeEach, describe, expect, it, vi } from "vitest"

import { useDreams } from "../store"
import { statisticsService } from "./statistics.service"

describe("statistics service", () => {
  describe("get statistics", () => {
    beforeEach(() => {
      vi.resetAllMocks()
    })
    // it('not logged in', async () => {
    //   const { setToken, api } = useDreams.getState()
    //   const statisticsList = vi.spyOn(api!.countCategories, 'countCategoriesList')
    //   setToken('')

    //   await statisticsService.getStatistics()
    //   expect(statisticsList).toHaveBeenCalled()
    //   const { statistics } = useDreams.getState()
    //   expect(statistics).toHaveLength(1)
    //   expect(statistics[0].count).toBe(2)
    // })
    // it('logged in', async () => {
    //   const { setToken, api } = useDreams.getState()
    //   const statisticsList = vi.spyOn(api!.private, 'statisticsList')
    //   setToken('token')

    //   await statisticsService.getStatistics()
    //   expect(statisticsList).toHaveBeenCalled()
    //   const { categoriesCount, personsCount } = useDreams.getState()
    //   expect(categoriesCount).toHaveLength(1)
    //   expect(categoriesCount[0].count).toBe(3)
    //   expect(personsCount).toHaveLength(1)
    //   expect(personsCount[0].count).toBe(6)
    // })

    it("get count categories", async () => {
      await statisticsService.getStatistics()

      const { statistics } = useDreams.getState()

      expect(statistics).toHaveLength(2)
      expect(statistics[0]).toStrictEqual({ id: 1, count: 10 })
      expect(statistics[1]).toStrictEqual({ id: 2, count: 3 })
    })

    it("get monthly statistics", async () => {
      await statisticsService.getMonthlyStatistics()

      const { monthlyStatistics } = useDreams.getState()
      expect(monthlyStatistics).toHaveLength(2)
      const febStats = monthlyStatistics[0]
      expect(febStats.month).toBe("02/2022")
      expect(febStats.numberOfDreams).toBe(10)
      expect(febStats.categoryCount.get(1)).toBe(7)
      expect(febStats.categoryCount.get(2)).toBe(3)
    })
  })
})
