import { useMemo } from "react";

import { useDreams } from "../store";
import { Category, CategoryType } from "../types/categories.types";

export const usePersons = () => {
  const categories = useDreams((state) => state.categories);
  return categories.filter((c) => c.type == "person");
};

export const useTags = () => {
  const categories = useDreams((state) => state.categories);
  return categories.filter((c) => c.type == "category");
};

export const selectCategory = (id: number): Category | undefined => {
  const { categories } = useDreams.getState();
  return categories.find((c) => c.id == id);
};

type CategoryCount = Category & { count: number };

export const useStatistics = (type: CategoryType, limit: number = 40): Array<CategoryCount> => {
  const categories = useDreams((state) => state.categories).filter((c) => c.type == type);
  const statistics = useDreams((state) => state.statistics);

  return useMemo(
    () =>
      categories
        .map((c) => {
          const count = statistics.find((s) => s.id == c.id)?.count ?? 0;
          return { ...c, count: count };
        })
        .sort((a, b) => a.count - b.count)
        .slice(0, limit),
    [categories, statistics, limit],
  );
};
