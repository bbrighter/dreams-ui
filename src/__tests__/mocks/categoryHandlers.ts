import { http, HttpResponse } from "msw"

import { EntityCategoriesResponse } from "../../api/generated_api"
import { initialCategories } from "./initialValues"

export const getCategoriesHandler = (overrides?: EntityCategoriesResponse) => http.get("/categories", () => {
  return HttpResponse.json(initialCategories(overrides))
})

export const patchCategoryName = http.patch("/categories/:catId/name", () => HttpResponse.json({}))

export const patchCategoryType = http.patch("/categories/:catId/type", () => HttpResponse.json({}))

export const postCategoryMergeHandler = (overrides?: EntityCategoriesResponse) => (http.post("/categories/merge", async () => {
  return HttpResponse.json(overrides)
}))

export const deleteCategory = http.delete("/categories/:catId", () => HttpResponse.json({}))
