import { EntityCategoriesCountResponse, EntityStatistics } from '../../api/generated_api'

export type Statistic = {
  id: number
  count: number
}

export type Statistics = Array<Statistic>

export function controllerCountsResponseToStatistic(resp: EntityCategoriesCountResponse): Array<Statistic> {
  return resp.categories.map(c => ({ id: c.id, count: c.count }))
}

export type MonthlyStatistics = Array<{
  month: string
  numberOfDreams: number
  categoryCount: Map<number, number>
}>

export const respToMonthlyStatistics = (resp: EntityStatistics): MonthlyStatistics => {
  console.log(resp)
  return resp.statistics.map((s) => {
    const catMap = new Map<number, number>()
    s.categories.forEach(c => catMap.set(c.id, c.count))

    return {
      month: s.month,
      numberOfDreams: s.dreamCount,
      categoryCount: catMap,
    }
  },
  )
}
