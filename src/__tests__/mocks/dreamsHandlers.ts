import { http, HttpResponse } from 'msw'

import { dream1, initialDreams, initialPrivateDreams, privateDream } from './initialValues'

const dreamHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/dreams', () => (HttpResponse.json({ dreams: initialDreams }))),
    http.post(baseUrl + '/dreams', () => (HttpResponse.json(4))),
    http.get(baseUrl + '/dreams/private', () => (HttpResponse.json({ dreams: initialPrivateDreams }))),
    http.get(baseUrl + '/dreams/:id', () => (HttpResponse.json(dream1))),
    http.get(baseUrl + '/dreams/private/:id', () => (HttpResponse.json(privateDream))),
    http.delete(baseUrl + '/dreams/:id', () => (HttpResponse.json())),
    http.patch(baseUrl + '/dreams/:id', () => (HttpResponse.json())),
    http.patch(baseUrl + '/dreams/:id/finalize', () => (HttpResponse.json())),
])

export default dreamHandlers
