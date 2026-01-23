import { StateCreator } from 'zustand'

import { Api } from '../../api/generated_api'
import { ApiSlice, ApiState } from './api.type'

const initialState = (): ApiState => ({
  api: null,
})

export const createApiSlice: StateCreator<
  ApiState,
  [['zustand/immer', never]],
  [],
  ApiSlice
> = (set, get) => ({
  ...initialState(),

  initApi: async () => {
    if (get().api) return

    let baseUrl: string

    if (import.meta.env.DEV && import.meta.env.MODE == 'test') {
      baseUrl = ''
    }
    else if (import.meta.env.DEV) {
      baseUrl = 'http://localhost:5000'
    }
    else {
      const config = await fetch(`${import.meta.env.BASE_URL}/config.json`, { cache: 'no-store' }).then(r => r.json())
      baseUrl = config.apiUrl
    }

    const api = new Api()
    api.baseUrl = baseUrl
    set((draft) => {
      draft.api = api
    })
  },
})
