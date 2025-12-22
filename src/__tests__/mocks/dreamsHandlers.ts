import { http, HttpResponse } from 'msw'

import { EntityDreamMetaResponse, EntityDreamResponse } from '../../api/generated_api'
import { dream1, initialDreams, initialPrivateDreams, privateDream } from './initialValues'

export const getDreamsHandler = (overrides?: EntityDreamMetaResponse[]) => http.get('/dreams', () => (HttpResponse.json({ dreams: initialDreams(overrides) })))
export const postDreamsHandler = http.post('/dreams', () => (HttpResponse.json(4)))
export const getDreamsPrivateHandler = http.get('/dreams/private', () => (HttpResponse.json({ dreams: initialPrivateDreams })))
export const getDreamHandler = (overrides?: Partial<EntityDreamResponse>) => http.get('/dreams/:id', () => (HttpResponse.json(dream1(overrides))))
export const getDreamPrivateHandler = http.get('/dreams/private/:id', () => (HttpResponse.json(privateDream())))
export const deleteDreamHandler = http.delete('/dreams/:id', () => (HttpResponse.json()))
export const patchDreamHandler = http.patch('/dreams/:id', () => (HttpResponse.json()))
export const patchDreamFinalizeHandler = http.patch('/dreams/:id/finalize', () => (HttpResponse.json()))
