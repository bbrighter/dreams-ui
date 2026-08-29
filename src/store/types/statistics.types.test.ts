import { expect, test } from "vitest";

import { EntityCategoriesCountResponse, EntityStatistics } from "../../api/generated_api";
import { controllerCountsResponseToStatistic, respToMonthlyStatistics } from "./statistics.types";

test("ControllerCategoriesCountToStatistics", () => {
  const resp: EntityCategoriesCountResponse = {
    categories: [
      { id: 1, count: 100 },
      { id: 2, count: 300 },
    ],
  };

  const categories = controllerCountsResponseToStatistic(resp);
  expect(categories).toHaveLength(2);
  expect(categories[0]).toEqual({ id: 1, count: 100 });
  expect(categories[1]).toEqual({ id: 2, count: 300 });
});

test("respToMonthlyStatistics", () => {
  const resp: EntityStatistics = {
    statistics: [
      {
        month: "02/2022",
        dreamCount: 10,
        categories: [
          { id: 1, count: 9 },
          { id: 2, count: 1 },
        ],
      },
      { month: "03/2022", dreamCount: 3, categories: [{ id: 1, count: 3 }] },
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
