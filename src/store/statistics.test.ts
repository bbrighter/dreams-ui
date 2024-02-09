import { ControllerCategoryCountResponse } from "../api/generated_api"
import { ControllerCategoriesCountToStatistics } from "./statistics"

test('ControllerCategoriesCountToStatistics', () => {
    const resp: ControllerCategoryCountResponse = {
        categories: [
            { categoryId: 1, count: 100 },
            { categoryId: 2, count: 300 },
        ]
    }

    const stats = ControllerCategoriesCountToStatistics(resp)
    expect(stats).toHaveLength(2)
    const total = stats.reduce((p, c) => ({ categoryId: 0, count: p.count + c.count }))
    expect(total.count).toEqual(400)
})