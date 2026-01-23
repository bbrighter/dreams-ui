import { AuthState } from './auth.types'

export const selectLoggedIn = (state: AuthState) => Boolean(state.token)
