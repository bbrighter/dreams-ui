import {
  ControllerCategoryListResponse,
  ControllerStatistic,
  ControllerStatistics,
} from "@/api/generated_api";

export const createCategoriesCount = (
  counts: Array<{ id: number; count: number; name: string; type: string }> = [],
): ControllerCategoryListResponse => ({
  categories: counts,
});

export const createStatistics = (
  overrides: Array<ControllerStatistic> | Partial<ControllerStatistic> = [],
): ControllerStatistics => ({
  statistics: Array.isArray(overrides) ? overrides : [createStatistic(overrides)],
});

const createStatistic = (overrides?: Partial<ControllerStatistic>): ControllerStatistic => ({
  month: "02/2022",
  dreamCount: 10,
  categories: [
    { categoryId: 1, count: 7 },
    { categoryId: 2, count: 3 },
  ],
  ...overrides,
});
