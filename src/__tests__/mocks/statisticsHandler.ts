import { http, HttpResponse } from "msw/http";

import { ControllerCategoryListResponse, ControllerStatistics } from "@/api/generated_api";

export const getCountCategoriesHandler = (resp: ControllerCategoryListResponse) =>
  http.get("/categories/with-count", () => HttpResponse.json(resp));

export const getCountCategoriesMonthlyHandler = (resp: ControllerStatistics) =>
  http.get("/count-categories/monthly", () => HttpResponse.json(resp));
