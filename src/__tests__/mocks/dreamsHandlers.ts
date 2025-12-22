import { http, HttpResponse } from 'msw'

import { EntityDreamResponse } from '../../api/generated_api'
import { dream1, initialDreams, initialPrivateDreams, privateDream } from './initialValues'

const getDreamsHandler = http.get('/dreams', () => (HttpResponse.json({ dreams: initialDreams() })))
const postDreamsHandler = http.post('/dreams', () => (HttpResponse.json(4)))
const getDreamsPrivateHandler = http.get('/dreams/private', () => (HttpResponse.json({ dreams: initialPrivateDreams })))
const getDreamHandler = (overrides?: Partial<EntityDreamResponse>) => http.get('/dreams/:id', () => (HttpResponse.json(dream1(overrides))))
const getDreamPrivateHandler = http.get('/dreams/private/:id', () => (HttpResponse.json(privateDream())))
const deleteDreamHandler = http.delete('/dreams/:id', () => (HttpResponse.json()))
const patchDreamHandler = http.patch('/dreams/:id', () => (HttpResponse.json()))
const patchDreamFinalizeHandler = http.patch('/dreams/:id/finalize', () => (HttpResponse.json()))

export const getDreamHandlers = {
    getDreamsHandler,
    postDreamsHandler,
    getDreamsPrivateHandler,
    getDreamPrivateHandler,
    getDreamHandler,
    deleteDreamHandler,
    patchDreamHandler,
    patchDreamFinalizeHandler,
}

const dreamHandlers = [
    getDreamsHandler,
    postDreamsHandler,
    getDreamsPrivateHandler,
    getDreamPrivateHandler,
    getDreamHandler(),
    deleteDreamHandler,
    patchDreamHandler,
    patchDreamFinalizeHandler,
]

export default dreamHandlers
