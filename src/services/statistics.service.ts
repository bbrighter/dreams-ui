import { useDreams } from "@/store/store";
import {
  controllerCountsResponseToStatistic,
  respToMonthlyStatistics,
} from "@/store/types/statistics.types";

const STATISTICS_LIMITS = 40;

export const statisticsService = {
  getStatistics: async (limit?: number) => {
    const { setStatistics, api } = useDreams.getState();
    if (!api) return;
    // const loggedIn = selectLoggedIn(useDreams.getState())
    // const resp = loggedIn
    //   ? await api.private.statisticsList({ limit: STATISTICS_LIMITS })
    //   : await api.statistics.statisticsList({ limit: STATISTICS_LIMITS })
    const resp = await api.countCategories.countCategoriesList({
      limit: limit ? limit : STATISTICS_LIMITS,
    });
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
