import { useMemo } from "react";

import { useDreams } from "@/store/store";

export const useWordCloud = (type: string, limit: number = 40) => {
  const categories = useDreams((state) => state.categories).filter((c) => c.type === type);
  const statistics = useDreams((state) => state.statistics);

  return useMemo(
    () =>
      categories
        .map((c) => {
          const count = statistics.find((s) => s.id === c.id)?.count ?? 0;
          return { ...c, count: count };
        })
        .toSorted((a, b) => b.count - a.count)
        .slice(0, limit),
    [categories, statistics, limit],
  );
};
