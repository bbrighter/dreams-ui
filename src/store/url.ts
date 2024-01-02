const BASE_URL = new URL(process.env.REACT_APP_API_URL || "http://127.0.0.1:5005")

export const dreamURL = (id: number | string): URL => {
    const url = BASE_URL
    url.pathname = `dreams/${Number(id)}`
    return url
}

export const dreamsURL = (): URL => {
    const url = BASE_URL
    url.pathname = `dreams`
    return url
}