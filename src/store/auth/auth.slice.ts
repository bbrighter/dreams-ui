import { StateCreator } from 'zustand'

import { AuthSlice, AuthState } from '../interfaces'
import { StoreState } from '../interfaces/interface'

const createInitialState = (): AuthState => ({
  token: '',
  user: 'Benni',
})

export const createAuthSlice: StateCreator<StoreState, [['zustand/immer', never]], [], AuthSlice> = (set, _get) => ({
  ...createInitialState(),
  setToken: (token: string) => set((state: AuthState) => { state.token = token }),
  resetAuth: () => set(() => createInitialState()),
})
