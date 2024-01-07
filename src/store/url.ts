const BASE_URL = () => (new URL(process.env.REACT_APP_API_URL || "http://127.0.0.1:5005"))

export const dreamURL = (id: number | string): URL => {
    const url = BASE_URL()
    url.pathname = `dreams/${Number(id)}`
    return url
}

export const dreamsURL = (): URL => {
    const url = BASE_URL()
    url.pathname = `dreams`
    return url
}

export const getTagsURL = (): URL => {
    const url = BASE_URL()
    url.pathname = `tags`
    return url
}

export const addTagURL = (dreamId: number | string, title: string): URL => {
    const url = BASE_URL()
    url.pathname = `dreams/${Number(dreamId)}/tags`
    url.searchParams.set('title', title)
    return url
}

export const deleteTagURL = (dreamId: number | string, tagId: number | string): URL => {
    const url = BASE_URL()
    url.pathname = `dreams/${Number(dreamId)}/tags/${Number(tagId)}`
    return url
}