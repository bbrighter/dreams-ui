import { expect, test } from "vitest"

import { EntityCategoryType, EntityDreamResponse } from "../../api/generated_api"
import { dreamResponseToDream } from "./dream.types"

test("dreamResponseToDream", () => {
  const resp: EntityDreamResponse = {
    id: 1,
    date: "2024-01-04T19:54:20.113Z",
    description: "description",
    categories: [{ id: 1, name: "name", type: EntityCategoryType.TypeCategory }],
    visible: true,
    finalized: false,
  }

  const dream = dreamResponseToDream(resp)

  expect(dream.id).toBe(1)
  expect(dream.date.getDate()).toBe(4)
  expect(dream.date.getMonth()).toBe(0) // 0 is January
  expect(dream.date.getFullYear()).toBe(2024)
  expect(dream.description).toBe("description")
  expect(dream.categories).toHaveLength(1)
  expect(dream.categories[0]).toBe(1)
  expect(dream.visible).toBe(true)
  expect(dream.finalized).toBe(false)
})
