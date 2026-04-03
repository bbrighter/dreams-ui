import { renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import { useDreams } from "../../store"
import { usePersons, useStatistics, useTags } from "../category.selectors"


describe("category selectors", () => {
  beforeEach(() => {
    const { setCategories } = useDreams.getState()
    setCategories([
      { id: 1, name: "name", type: "category" },
      { id: 2, name: "name", type: "person" },
    ])
  })

  it("useStatistics", () => {
    const {  setStatistics } = useDreams.getState()
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

  it("useTags", () => {
    const { result } = renderHook(() => useTags())
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe(1)
  })

  it("usePersons", () => {
    const { result } = renderHook(() => usePersons())
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe(2)
  })
})
