import { useMemo } from "react"

import { Category, CategoryType } from "../categories"
import { useDreams } from "../store"

export const usePersons = () => {
  const categories = useDreams(state => state.categories)
  return categories.filter(c => c.type == "person")
}

export const useTags = () => {
  const categories = useDreams(state => state.categories)
  return categories.filter(c => c.type == "category")
}

export const selectCategory = (id: number): Category | undefined => {
  const { categories } = useDreams.getState()
  return categories.find(c => c.id == id)
}

type CategoryCount = Category & { count: number }

export const useStatistics = (type: CategoryType): Array<CategoryCount> => {
  const categories = useDreams(state => state.categories).filter(c => c.type == type)
  const statistics = useDreams(state => state.statistics)

  return useMemo(() => (
    categories.map((c) => {
      const count = statistics.find(s => s.id == c.id)?.count ?? 0
      return { ...c, count: count }
    })
  ), [categories, statistics])
}
