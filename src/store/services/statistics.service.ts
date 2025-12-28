import api from '../../api/api'
import { selectLoggedIn } from '../selectors'
import { useDreams } from '../store'

const STATISTICS_LIMITS = 40

export const statisticsService = {
  getStatistics: async () => {
    const { setStatistics } = useDreams.getState()
    const loggedIn = selectLoggedIn(useDreams.getState())
    const resp = loggedIn
      ? await api.private.statisticsList({ limit: STATISTICS_LIMITS })
      : await api.statistics.statisticsList({ limit: STATISTICS_LIMITS })
    if (!resp.ok) return

    const { categories, persons } = resp.data
    setStatistics(categories, persons)
  },
}
