import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useDreams } from '../store'
import { useGetDreams } from './loadDreams'

describe('useGetDreams', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    const { api } = useDreams.getState()
    vi.spyOn(api!.dreams, 'privateList')
    vi.spyOn(api!.dreams, 'dreamsList')
  })

  it('not logged in, not loaded', () => {
    const { api } = useDreams.getState()
    useDreams.setState({ token: '', dreamsLoaded: 'none' })

    renderHook(() => useGetDreams())

    expect(api!.dreams.privateList).not.toHaveBeenCalled()
    expect(api!.dreams.dreamsList).toHaveBeenCalled()
  })

  it('not logged in, loaded', () => {
    const { api } = useDreams.getState()
    useDreams.setState({ token: '', dreamsLoaded: 'public' })

    renderHook(() => useGetDreams())

    expect(api!.dreams.privateList).not.toHaveBeenCalled()
    expect(api!.dreams.dreamsList).not.toHaveBeenCalled()
  })

  it('logged in, not loaded', () => {
    const { api } = useDreams.getState()
    useDreams.setState({ token: 'token', dreamsLoaded: 'none' })

    renderHook(() => useGetDreams())

    expect(api!.dreams.privateList).toHaveBeenCalled()
    expect(api!.dreams.dreamsList).not.toHaveBeenCalled()
  })

  it('logged in, loaded', () => {
    const { api } = useDreams.getState()
    useDreams.setState({ token: 'token', dreamsLoaded: 'all' })

    renderHook(() => useGetDreams())

    expect(api!.dreams.privateList).not.toHaveBeenCalled()
    expect(api!.dreams.dreamsList).not.toHaveBeenCalled()
  })

  it('logged in, only public loaded', () => {
    const { api } = useDreams.getState()
    useDreams.setState({ token: 'token', dreamsLoaded: 'public' })

    renderHook(() => useGetDreams())

    expect(api!.dreams.privateList).toHaveBeenCalled()
    expect(api!.dreams.dreamsList).not.toHaveBeenCalled()
  })
})
