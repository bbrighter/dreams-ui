import { StoreState } from '../interface'

export const selectLoggedIn = (state: StoreState) => Boolean(state.token)
