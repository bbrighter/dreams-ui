import { Api } from "./generated_api";

const api = new Api()
api.baseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5005"

export default api