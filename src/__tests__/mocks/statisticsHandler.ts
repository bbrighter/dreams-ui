import { http, HttpResponse } from 'msw'

import { EntityCountsResponse } from '../../api/generated_api'

export const getStatisticsHandler = () => http.get('/statistics', () => HttpResponse.json(
    {
      categories: [{ id: 1, count: 2 }],
      persons: [{ id: 2, count: 5 }],
    } satisfies EntityCountsResponse))
export const getPrivateStatisticsHandler = () => http.get('/private/statistics', () => HttpResponse.json(
        {
          categories: [{ id: 1, count: 3 }],
          persons: [{ id: 2, count: 6 }],
        } satisfies EntityCountsResponse))
