import { Api, RequestParams } from "./generated_api";

const PORT = "5005"
const LOCAL_URL = "http://127.0.0.1"
const BUILD_URL = "http://192.168.178.33"

const api = new Api({
    securityWorker: (securityData: unknown): RequestParams => {
        if (typeof securityData == "string") {
            return { headers: { "Authorization": "Basic " + pwToBase64(securityData) } }
        } else {
            return {}
        }
    },
})
api.baseUrl = (import.meta.env.PROD ? BUILD_URL : LOCAL_URL) + ":" + PORT

const pwToBase64 = (pw: string): string => (btoa("user:" + pw))

export default api
