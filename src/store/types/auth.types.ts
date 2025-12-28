export type AuthState = {
  user: string
  token: string
  loggedIn: boolean
}

interface AuthActions {
  setToken: (token: string) => void
  setUser: (user: string) => void
  setLoggedIn: (loggedIn: boolean) => void
  resetAuth: () => void
}

export interface AuthSlice extends AuthState, AuthActions { }
