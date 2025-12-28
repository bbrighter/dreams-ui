import { StateCreator } from 'zustand'

import { StoreState } from '../interface'
import { AuthSlice, AuthState } from '../types/auth.types'

const createInitialState = (): AuthState => ({
  loggedIn: false,
  token: '',
  user: 'Benni',
})

export const createAuthSlice: StateCreator<StoreState, [['zustand/immer', never]], [], AuthSlice> = (set, get) => ({
  ...createInitialState(),
  setLoggedIn: (loggedIn: boolean) => set((state) => { state.loggedIn = loggedIn }),
  setToken: (token: string) => set((state: AuthState) => { state.token = token }),
  setUser: (user: string) => set((state: AuthState) => { state.user = user }),
  resetAuth: () => set(() => createInitialState()),
})
