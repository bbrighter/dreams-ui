import { http, HttpResponse } from 'msw'

import { EntityCategoriesResponse, V1MergeCategoriesParams } from '../../api/generated_api'

const cat1 = { id: 1, name: 'Category' }
const cat2 = { id: 2, name: 'New category' }
const person1 = { id: 3, name: 'Person' }

const categoryHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/categories', ({ request }) => {
        const url = new URL(request.url)
        const includeCount = url.searchParams.get('includes') == 'dreamsCount'
        if (includeCount) {
            return HttpResponse.json({
                categories: [{ count: 1, ...cat1 }],
                persons: [{ count: 2, ...person1 }],
            })
        }
        return HttpResponse.json({ categories: [cat1], persons: [person1] } as EntityCategoriesResponse)
    }),
    http.delete(baseUrl + '/dreams/:dreamId/categories/:categoryId', () => HttpResponse.json({ categories: [] } as EntityCategoriesResponse)),
    http.put(baseUrl + '/dreams/:dreamId/categories', () => HttpResponse.json({ categories: [cat1, cat2] } as EntityCategoriesResponse)),
    http.patch(baseUrl + '/categories/:catId/name', () => HttpResponse.json({})),
    http.patch(baseUrl + '/categories/:catId/type', () => HttpResponse.json({})),
    http.post(baseUrl + '/categories/merge', async ({ request }) => {
        const body = await request.clone().json() as V1MergeCategoriesParams
        const newName = body.newName
        if (body.sourceCategoryId != 1 || body.targetCategoryId != 3) {
            throw 'invalid test input, source must be 1, target 3'
        }
        return HttpResponse.json({
            persons: [{ ...person1, name: newName }],
        } as EntityCategoriesResponse)
    }),
    http.delete(baseUrl + '/categories/:catId', () => HttpResponse.json({})),
])

export default categoryHandlers
