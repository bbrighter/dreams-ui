import { http, HttpResponse } from 'msw'

import { EntityCategoriesResponse, EntityCategoryResponse } from '../../api/generated_api'
import { cat1, pers1 } from './initialValues'

 export const putDreamCategory = http.put('/dreams/:dreamId/categories', ({ request }) => {
        const url = new URL(request.url)
        const name = url.searchParams.get('name')!
        const cat2: EntityCategoryResponse = { id: 3, name: name }
        return HttpResponse.json({ categories: [cat1, cat2] } satisfies EntityCategoriesResponse)
    })

export const putDreamPerson = http.put('/dreams/:dreamId/persons', ({ request }) => {
        const url = new URL(request.url)
        const name = url.searchParams.get('name')!
        const pers2: EntityCategoryResponse = { id: 3, name: name }
        return HttpResponse.json({ categories: [cat1], persons: [pers1, pers2] } satisfies EntityCategoriesResponse)
    })

export const deleteDreamCategory = http.delete('/dreams/:dreamId/categories/:categoryId', () =>
    HttpResponse.json({ persons: [pers1] } satisfies EntityCategoriesResponse))

export const deleteDreamPerson = http.delete('/dreams/:dreamId/persons/:personId', () =>
    HttpResponse.json({ categories: [cat1] } satisfies EntityCategoriesResponse))
