import { http, HttpResponse } from 'msw'

import { EntityCategoriesResponse, EntityCategoryResponse } from '../../api/generated_api'
import { cat1, pers1 } from './initialValues'

const dreamCategoriesHandlers = (baseUrl: string) => ([
    http.put(baseUrl + '/dreams/:dreamId/categories', ({ request }) => {
        const url = new URL(request.url)
        const name = url.searchParams.get('name')!
        const cat2: EntityCategoryResponse = { id: 3, name: name }
        return HttpResponse.json({ categories: [cat1, cat2] } as EntityCategoriesResponse)
    }),
    http.put(baseUrl + '/dreams/:dreamId/persons', ({ request }) => {
        const url = new URL(request.url)
        const name = url.searchParams.get('name')!
        const cat2: EntityCategoryResponse = { id: 3, name: name }
        return HttpResponse.json({ categories: [cat1], persons: [pers1, { id: 4, name: name }] } as EntityCategoriesResponse)
    }),
    http.delete(baseUrl + '/dreams/:dreamId/categories/:categoryId', () => HttpResponse.json({ persons: [pers1] })),
    http.delete(baseUrl + '/dreams/:dreamId/persons/:personId', () => HttpResponse.json({ categories: [cat1] } as EntityCategoriesResponse)),
])

export default dreamCategoriesHandlers
