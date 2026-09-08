import { useDreams } from "@/store/store";
import {
  controllerCountsResponseToStatistic,
  respToMonthlyStatistics,
} from "@/store/types/statistics.types";

export const statisticsService = {
  getStatistics: async () => {
    const { setStatistics, api } = useDreams.getState();
    if (!api) return;
    const resp = await api.categories.withCountList();
    if (!resp.ok) {
      console.error("error");
      return;
    }

    const statistics = controllerCountsResponseToStatistic(resp.data);
    setStatistics(statistics);
  },

  getMonthlyStatistics: async () => {
    const { setMonthlyStatistics, api } = useDreams.getState();
    if (!api) return;

    const resp = await api.countCategories.monthlyList();
    if (!resp.ok) {
      console.error("error");
      return;
    }

    const monthly = respToMonthlyStatistics(resp.data);
    setMonthlyStatistics(monthly);
  },
};
