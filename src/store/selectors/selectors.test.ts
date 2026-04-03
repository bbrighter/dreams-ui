import { renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { useDreams } from "../store"
import { useStatistics } from "./category.selectors"
import { useDreamCategories } from "./dream.selectors"

describe("dream selectors", () => {
  it("useDreamCategories", () => {
    const { setCategories, setDream } = useDreams.getState()
    setCategories([
      { id: 1, name: "Name", type: "category" },
      { id: 2, name: "Name 2", type: "category" },
      { id: 3, name: "Name 3", type: "person" },
    ])
    setDream({
      id: 1, date: new Date(), description: "",
      finalized: false, rating: null, visible: true,
      categories: [1, 3] },
    )

    const { result } = renderHook(() => useDreamCategories())
    expect(result.current.categories).toHaveLength(1)
    expect(result.current.persons).toHaveLength(1)
  })
})

describe("category selectors", () => {
  it("useStatistics", () => {
    const { setCategories, setStatistics } = useDreams.getState()
    setCategories([
      { id: 1, name: "name", type: "category" },
      { id: 2, name: "name", type: "person" },
    ])
    setStatistics([
      { id: 1, count: 10 },
      { id: 2, count: 2 },
    ])

    const { result: cat } = renderHook(() => useStatistics("category"))
    expect(cat.current).toHaveLength(1)
    expect(cat.current[0].count).toBe(10)

    const { result: pers } = renderHook(() => useStatistics("person"))
    expect(pers.current).toHaveLength(1)
    expect(pers.current[0].count).toBe(2)
  })
})
