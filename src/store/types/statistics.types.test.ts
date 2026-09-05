import { expect, test } from "vitest";

import { ControllerCategoryListResponse, ControllerStatistics } from "@/api/generated_api";

import { controllerCountsResponseToStatistic, respToMonthlyStatistics } from "./statistics.types";

test("ControllerCategoriesCountToStatistics", () => {
  const resp: ControllerCategoryListResponse = {
    categories: [
      { id: 1, count: 100, name: "cat1", type: "person" },
      { id: 2, count: 300, name: "cat2", type: "categroy" },
    ],
  };

  const categories = controllerCountsResponseToStatistic(resp);
  expect(categories).toHaveLength(2);
  expect(categories[0]).toEqual({ id: 1, count: 100 });
  expect(categories[1]).toEqual({ id: 2, count: 300 });
});

test("respToMonthlyStatistics", () => {
  const resp: ControllerStatistics = {
    statistics: [
      {
        month: "02/2022",
        dreamCount: 10,
        categories: [
          { count: 9, categoryId: 1 },
          { count: 1, categoryId: 2 },
        ],
      },
      { month: "03/2022", dreamCount: 3, categories: [{ categoryId: 1, count: 3 }] },
    ],
  };

  const stats = respToMonthlyStatistics(resp);
  expect(stats).toHaveLength(2);
  const febStats = stats[0];
  expect(febStats.month).toBe("02/2022");
  expect(febStats.numberOfDreams).toBe(10);
  expect(febStats.categoryCount.get(1)).toBe(9);
  expect(febStats.categoryCount.get(2)).toBe(1);
  const marchStats = stats[1];
  expect(marchStats.month).toBe("03/2022");
  expect(marchStats.numberOfDreams).toBe(3);
  expect(marchStats.categoryCount.get(1)).toBe(3);
});
