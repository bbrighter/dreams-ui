import { http, HttpResponse } from "msw";

import { ControllerCategoryListResponse } from "@/api/generated_api";

export const getCategoriesHandler = (resp?: ControllerCategoryListResponse) =>
  http.get("/categories", () => {
    return HttpResponse.json(resp);
  });

export const patchCategoryName = http.patch("/categories/:catId/name", () => HttpResponse.json({}));

export const patchCategoryType = http.patch("/categories/:catId/type", () => HttpResponse.json({}));

export const postCategoryMergeHandler = (resp?: ControllerCategoryListResponse) =>
  http.post("/categories/merge", async () => {
    return HttpResponse.json(resp);
  });

export const deleteCategory = http.delete("/categories/:catId", () => HttpResponse.json({}));
