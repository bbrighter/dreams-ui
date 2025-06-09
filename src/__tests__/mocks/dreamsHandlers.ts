import { http, HttpResponse } from 'msw';

import { EntityDreamResponse, EntityDreamsResponse } from '../../api/generated_api';

const dreamHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/dreams', () => (HttpResponse.json({
        dreams: [
            { id: 1, date: '2025-01-01T12:30:00Z', visible: true, finalized: false },
            { id: 4, date: '2025-02-01T12:30:00Z', visible: true, finalized: true },
        ],
    } as EntityDreamsResponse))),

    http.post(baseUrl + '/dreams', () => (HttpResponse.json(3))),
    http.get(baseUrl + '/dreams/private', () => (HttpResponse.json({
        dreams: [
            { id: 1, date: '2025-01-01T12:30:00Z', visible: true, finalized: false },
            { id: 2, date: '2025-02-02T13:00:00Z', visible: false, finalized: false },
        ],
    } as EntityDreamsResponse))),

    http.get(baseUrl + '/dreams/:id', () => (HttpResponse.json({
        id: 1, date: '2025-01-01T12:30:00Z', visible: true, finalized: false,
        description: 'description',
        categories: [{ id: 1, name: 'Category' }],
        persons: [{ id: 1, name: 'Person' }],
    } as EntityDreamResponse))),

    http.get(baseUrl + '/dreams/private/:id', () => (HttpResponse.json({
        id: 2, date: '2025-02-02T13:00:00Z', visible: false, finalized: false,
        description: 'description',
        categories: [{ id: 10, name: 'cat name' }],
        persons: [{ id: 100, name: 'person name' }],
    } as EntityDreamResponse))),

    http.delete(baseUrl + '/dreams/:id', () => (HttpResponse.json())),
    http.patch(baseUrl + '/dreams/:id', () => (HttpResponse.json())),
    http.patch(baseUrl + '/dreams/:id/finalize', () => (HttpResponse.json())),
])


export default dreamHandlers