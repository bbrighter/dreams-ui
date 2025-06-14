import { http, HttpResponse } from 'msw';

import { EntityCategoriesResponse } from '../../api/generated_api';

const cat1 = { id: 1, name: 'Category' }
const cat2 = { id: 2, name: 'New category' }
const person1 = { id: 3, name: 'Person' }

const categoryHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/categories', () => HttpResponse.json({ categories: [cat1], persons: [person1] } as EntityCategoriesResponse)),
    http.delete(baseUrl + '/dreams/:dreamId/categories/:categoryId', () => HttpResponse.json({ categories: [] } as EntityCategoriesResponse)),
    http.put(baseUrl + '/dreams/:dreamId/categories', () => HttpResponse.json({ categories: [cat1, cat2] } as EntityCategoriesResponse)),
])


export default categoryHandlers

