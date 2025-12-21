import { produce } from 'immer'
import { StateCreator } from 'zustand'

import api from '../../api/api'

type State = {
    user: string
    token: string
    loggedIn: boolean
}

interface Actions {
    login: (password: string) => Promise<boolean>
    logout: () => Promise<void>
}

export interface AuthStore extends State, Actions { }

const initialState: State = {
    user: 'Benni',
    token: '',
    loggedIn: false,
}

export const createPasswordSlice: StateCreator<AuthStore> = (set, get) => ({
    ...initialState,
    login: async (password: string) => {
        try {
            const resp = await api.login.loginCreate({ name: get().user, password: password })
            if (resp.ok) {
                set(produce((draft: State) => {
                    draft.loggedIn = true
                    draft.token = resp.data.token
                }))
            }
            return resp.ok
        }
 catch {
            return false
        }
    },
    logout: async () => {
        const resp = await api.logout.logoutCreate()
        if (resp.ok) {
            set(initialState)
        }
    },
})
