import useDreams from '../store/store';
import { Api, RequestParams } from './generated_api';

const LOCAL_URL = 'http://127.0.0.1:5000'

const api = new Api({
    securityWorker: (): RequestParams => {
        const token = useDreams.getState().token
        return { headers: { 'Authorization': token } }
    },
})
api.baseUrl = (import.meta.env.PROD ? window.BASE_URL : LOCAL_URL)


export default api
