import api from '../../api/api'
import { useDreams } from '../store'

const STATISTICS_LIMITS = 40

export const statisticsService = {
  getStatistics: async () => {
    const { loggedIn, setStatistics } = useDreams.getState()
    const resp = loggedIn
      ? await api.private.statisticsList({ limit: STATISTICS_LIMITS })
      : await api.statistics.statisticsList({ limit: STATISTICS_LIMITS })
    if (!resp.ok) return

    const { categories, persons } = resp.data
    setStatistics(categories, persons)
  },
}
