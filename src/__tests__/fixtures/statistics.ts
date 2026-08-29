import {
  EntityCategoriesCountResponse,
  EntityStatistic,
  EntityStatistics,
} from "@/api/generated_api";

export const createCategoriesCount = (
  counts: Array<{ id: number; count: number }> = [],
): EntityCategoriesCountResponse => ({
  categories: counts,
});

export const createStatistics = (
  overrides: Array<EntityStatistic> | Partial<EntityStatistic> = [],
): EntityStatistics => ({
  statistics: Array.isArray(overrides) ? overrides : [createStatistic(overrides)],
});

const createStatistic = (overrides?: Partial<EntityStatistic>): EntityStatistic => ({
  month: "02/2022",
  dreamCount: 10,
  categories: [
    { id: 1, count: 7 },
    { id: 2, count: 3 },
  ],
  ...overrides,
});
