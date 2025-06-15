import { EntityCountsResponse } from '../../api/generated_api'


interface Statistic {
    id: number
    count: number
}

export interface Statistics {
    categoriesCount: Array<Statistic>
    personsCount: Array<Statistic>
}

export function controllerCountsResponseToStatistic(resp: EntityCountsResponse, type: 'category' | 'person'): Array<Statistic> {
    const array = type == 'category' ? resp.categories : resp.persons
    return array == null ? [] : array.map(r => ({ id: r.id, count: r.count } as Statistic))
}