export async function get<T>(url: URL | string, validateResponse: (r: unknown) => r is T): Promise<T> {
    const resp = await fetch(url)
    if (!resp.ok) {
        throw new Error(resp.statusText)
    }
    const json = await resp.json()
    if (!validateResponse(json)) {
        throw new Error("Bad response")
    }
    return json
}

export async function _delete(url: URL | string): Promise<boolean> {
    const init: RequestInit = {
        method: 'DELETE'
    }
    const resp = await fetch(url, init)
    return resp.ok
}

export async function patch<T>(url: URL | string, body: T): Promise<boolean> {
    const init: RequestInit = {
        method: 'PATCH',
        body: JSON.stringify(body)
    }
    const resp = await fetch(url, init)
    return resp.ok
}