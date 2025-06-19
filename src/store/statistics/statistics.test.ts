import { expect, test } from 'vitest'

import { EntityCountsResponse } from '../../api/generated_api'
import { controllerCountsResponseToStatistic } from './statistics'


test('ControllerCategoriesCountToStatistics', () => {
    const resp: EntityCountsResponse = {
        categories: [
            { id: 1, count: 100 },
            { id: 2, count: 300 },
        ],
        persons: [
            { id: 1, count: 10 },
            { id: 2, count: 30 },
        ],
    }

    const categories = controllerCountsResponseToStatistic(resp, 'category')
    expect(categories).toHaveLength(2)
    expect(categories[0]).toEqual({ id: 1, count: 100 })
    const persons = controllerCountsResponseToStatistic(resp, 'person')
    expect(persons).toHaveLength(2)
    expect(persons[0]).toEqual({ id: 1, count: 10 })
})