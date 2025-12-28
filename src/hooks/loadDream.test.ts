import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import api from '../api/api'
import { useDreams } from '../store'
import { useGetDreams } from './loadDreams'

describe('useGetDreams', () => {
    beforeEach(() => {
        vi.resetAllMocks()
  vi.spyOn(api.dreams, 'privateList')
  vi.spyOn(api.dreams, 'dreamsList')
})

    it('not logged in, not loaded', () => {
        useDreams.setState({ loggedIn: false, dreamsLoaded: 'none' })

        renderHook(() => useGetDreams())

        expect(api.dreams.privateList).not.toHaveBeenCalled()
        expect(api.dreams.dreamsList).toHaveBeenCalled()
    })

        it('not logged in, loaded', () => {
        useDreams.setState({ loggedIn: false, dreamsLoaded: 'public' })

        renderHook(() => useGetDreams())

        expect(api.dreams.privateList).not.toHaveBeenCalled()
        expect(api.dreams.dreamsList).not.toHaveBeenCalled()
    })

        it('logged in, not loaded', () => {
        useDreams.setState({ loggedIn: true, dreamsLoaded: 'none' })

       renderHook(() => useGetDreams())

        expect(api.dreams.privateList).toHaveBeenCalled()
        expect(api.dreams.dreamsList).not.toHaveBeenCalled()
    })

        it('logged in, loaded', () => {
        useDreams.setState({ loggedIn: true, dreamsLoaded: 'all' })

        renderHook(() => useGetDreams())

        expect(api.dreams.privateList).not.toHaveBeenCalled()
        expect(api.dreams.dreamsList).not.toHaveBeenCalled()
    })

    it('logged in, only public loaded', () => {
        useDreams.setState({ loggedIn: true, dreamsLoaded: 'public' })

        renderHook(() => useGetDreams())

        expect(api.dreams.privateList).toHaveBeenCalled()
        expect(api.dreams.dreamsList).not.toHaveBeenCalled()
    })
})
