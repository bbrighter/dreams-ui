import categoryHandlers from './categoryHandlers'
import dreamCategoriesHandlers from './dreamCategoriesHandler'
import dreamHandlers from './dreamsHandlers'

const baseUrl = ''
const handlers = [
    ...dreamHandlers,
    ...categoryHandlers(baseUrl),
    ...dreamCategoriesHandlers(baseUrl),
]

export default handlers
