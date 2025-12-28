import { StateCreator } from 'zustand'

import { StoreState } from '../interface'
import { AuthSlice, AuthState } from '../types/auth.types'

const createInitialState = (): AuthState => ({
  token: '',
  user: 'Benni',
})

export const createAuthSlice: StateCreator<StoreState, [['zustand/immer', never]], [], AuthSlice> = (set, _get) => ({
  ...createInitialState(),
  setToken: (token: string) => set((state: AuthState) => { state.token = token }),
  resetAuth: () => set(() => createInitialState()),
})
