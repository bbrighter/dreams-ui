import { http, HttpResponse } from "msw";

import { EntityCategoriesCountResponse, EntityStatistics } from "../../api/generated_api";

export const getCountCategoriesHandler = (resp: EntityCategoriesCountResponse) =>
  http.get("/count-categories", () => HttpResponse.json(resp));

//   categories: [
//     { id: 1, count: 10 },
//     { id: 2, count: 3 },

export const getCountCategoriesMonthlyHandler = (resp: EntityStatistics) =>
  http.get("/count-categories/monthly", () => HttpResponse.json(resp));

// statistics: [
//     {
//       month: "02/2022",
//       dreamCount: 10,
//       categories: [
//         { id: 1, count: 7 },
//         { id: 2, count: 3 },
//       ],
//     },
//     { month: "03/2022", dreamCount: 1, categories: [{ id: 1, count: 1 }] },
//   ],
