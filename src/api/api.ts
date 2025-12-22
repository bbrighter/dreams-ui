import useDreams from '../store/store'
import { Api, RequestParams } from './generated_api'

const LOCAL_URL = 'http://127.0.0.1:5000'

const api = new Api({
    securityWorker: (): RequestParams => {
        const token = useDreams.getState().token
        return { headers: { Authorization: token } }
    },
})

if (import.meta.env.DEV && import.meta.env.MODE == 'test') {
    api.baseUrl = ''
}
 else if (import.meta.env.PROD) {
    api.baseUrl = window.BASE_URL
}
 else {
    api.baseUrl = LOCAL_URL
}

export default api
