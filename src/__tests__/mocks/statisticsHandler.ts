import { http, HttpResponse } from "msw"

import { EntityCategoriesCountResponse, EntityStatistics } from "../../api/generated_api"

export const getCountCategoriesHandler = () => http.get("/count-categories", () => HttpResponse.json(
    {
      categories: [
        { id: 1, count: 10 },
        { id: 2, count: 3 },
      ],
    } satisfies EntityCategoriesCountResponse,
))

export const getCountCategoriesMonthlyHandler = () => http.get("/count-categories/monthly", () => HttpResponse.json(
    {
      statistics: [
        { month: "02/2022", dreamCount: 10, categories: [{ id: 1, count: 7 }, { id: 2, count: 3 }] },
        { month: "03/2022", dreamCount: 1, categories: [{ id: 1, count: 1 }] },
      ],
    } satisfies EntityStatistics,
))
