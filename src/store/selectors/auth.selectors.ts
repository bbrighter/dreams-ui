import { StoreState } from '../interfaces'

export const selectLoggedIn = (state: StoreState) => Boolean(state.token)
