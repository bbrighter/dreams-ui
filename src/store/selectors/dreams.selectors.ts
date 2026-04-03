import { useMemo } from "react"

import { useDreams } from "../store"

export const useFilteredDreams = () => {
  const dreams = useDreams(state => state.dreams)
  const catId = useDreams(state => state.dreamCategoryFilter)

  return useMemo(() => {
    if (catId == null) return dreams

    return dreams.filter(d => d.categories?.includes(catId))
  }, [dreams, catId])

}