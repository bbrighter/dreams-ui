import dreamHandlers from './dreamsHandlers';

const baseUrl = 'http://127.0.0.1:5000'

const handlers = [
    ...dreamHandlers(baseUrl),
]

export default handlers