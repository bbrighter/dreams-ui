import categoryHandlers from './categoryHandlers'
import dreamCategoriesHandlers from './dreamCategoriesHandler'
import dreamHandlers from './dreamsHandlers'

const baseUrl = 'http://127.0.0.1:5000'

const handlers = [
    ...dreamHandlers(baseUrl),
    ...categoryHandlers(baseUrl),
    ...dreamCategoriesHandlers(baseUrl),
]

export default handlers
