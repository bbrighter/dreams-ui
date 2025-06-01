import categoryHandlers from './categoryHandlers';
import dreamHandlers from './dreamsHandlers';
import personHandlers from './personHandlers';

const baseUrl = 'http://127.0.0.1:5000'

const handlers = [
    ...dreamHandlers(baseUrl),
    ...personHandlers(baseUrl),
    ...categoryHandlers(baseUrl),
]

export default handlers