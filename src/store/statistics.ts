import { ControllerCategoryCountResponse } from "../api/generated_api"

export interface Statistic {
    categoryId: number
    count: number
}

export interface Statistics {
    statistics: Array<Statistic>
}

export function ControllerCategoriesCountToStatistics(resp: ControllerCategoryCountResponse): Array<Statistic> {
    return resp.categories.map(r => ({ categoryId: r.categoryId, count: r.count } as Statistic))
}