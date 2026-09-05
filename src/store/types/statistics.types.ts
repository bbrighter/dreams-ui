import { ControllerCategoryListResponse, ControllerStatistics } from "@/api/generated_api";

export type Statistic = {
  id: number;
  count: number;
};

export type Statistics = Array<Statistic>;

export function controllerCountsResponseToStatistic(
  resp: ControllerCategoryListResponse,
): Array<Statistic> {
  return resp.categories.map((c) => ({ id: c.id, count: c.count ?? 0 }));
}

export type MonthlyStatistics = Array<{
  month: string;
  numberOfDreams: number;
  categoryCount: Map<number, number>;
}>;

export const respToMonthlyStatistics = (resp: ControllerStatistics): MonthlyStatistics => {
  return resp.statistics.map((s) => {
    const catMap = new Map<number, number>();
    s.categories.forEach((c) => catMap.set(c.categoryId, c.count));

    return {
      month: s.month,
      numberOfDreams: s.dreamCount,
      categoryCount: catMap,
    };
  });
};
