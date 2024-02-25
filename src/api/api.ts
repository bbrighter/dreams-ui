import { Api, RequestParams } from "./generated_api";

const api = new Api({
    securityWorker: (securityData: unknown): RequestParams => {
        if (typeof securityData == 'string') {
            return { headers: { "Authorization": "Basic " + pwToBase64(securityData) } }
        } else {
            return {}
        }
    }
})
api.baseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5005"

const pwToBase64 = (pw: string): string => {
    return btoa("user:" + pw)
}

export default api
