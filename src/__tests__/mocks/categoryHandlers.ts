import { http, HttpResponse } from 'msw'

import { EntityCategoriesResponse, V1MergeCategoriesParams } from '../../api/generated_api'
import { cat1, pers1 } from './initialValues'

const categoryHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/categories', ({ request }) => {
        const url = new URL(request.url)
        const includeCount = url.searchParams.get('includes') == 'dreamsCount'
        if (includeCount) {
            return HttpResponse.json({
                categories: [{ count: 1, ...cat1 }],
                persons: [{ count: 1, ...pers1 }],
            })
        }
        return HttpResponse.json({ categories: [cat1], persons: [pers1] } as EntityCategoriesResponse)
    }),
    http.patch(baseUrl + '/categories/:catId/name', () => HttpResponse.json({})),
    http.patch(baseUrl + '/categories/:catId/type', () => HttpResponse.json({})),
    http.post(baseUrl + '/categories/merge', async ({ request }) => {
        const body = await request.clone().json() as V1MergeCategoriesParams
        const newName = body.newName
        if (body.sourceCategoryId != 1 || body.targetCategoryId != 2) {
            throw 'invalid test input, source must be 1, target 3'
        }
        return HttpResponse.json({
            persons: [{ ...pers1, name: newName }],
        } as EntityCategoriesResponse)
    }),
    http.delete(baseUrl + '/categories/:catId', () => HttpResponse.json({})),
])

export default categoryHandlers
