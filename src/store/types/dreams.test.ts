import { expect, test } from "vitest"

import { EntityDreamsResponse } from "../../api/generated_api"
import { dreamsResponseToDreams } from "./dreams.types"

test("dreamsResponseToDreams", () => {
  const resp: EntityDreamsResponse = {
    dreams: [
      { id: 1, date: "2024-01-04T19:54:20.113Z", visible: true, finalized: false, categories: [], description: "" },
    ],
  }

  const dreams = dreamsResponseToDreams(resp)

  expect(dreams).toHaveLength(1)
  expect(dreams[0].id).toBe(1)
  expect(dreams[0].date.getDate()).toBe(4)
  expect(dreams[0].date.getMonth()).toBe(0) // 0 is January
  expect(dreams[0].date.getFullYear()).toBe(2024)
  expect(dreams[0].finalized).toBeFalsy()
})
