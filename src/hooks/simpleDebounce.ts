import { useCallback, useEffect, useRef } from 'react'

export function useSimpleDebounce(callback: () => void, delay: number) {
    const timeout = useRef<NodeJS.Timeout | null>(null)

    const debouncedFn = useCallback(() => {
        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(() => {
            callback()
        }, delay)
    }, [callback, delay])

    useEffect(() => {
        return () => {
            if (timeout.current) clearTimeout(timeout.current)
        }
    }, [])

    return debouncedFn
}