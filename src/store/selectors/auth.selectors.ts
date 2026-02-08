import { useDreams } from '../store'

export const useIsLoggedIn = (): boolean => {
  const token = useDreams(state => state.token)
  return token != ''
}

export const isLoggedIn = (): boolean => {
  const { token } = useDreams.getState()
  return token != ''
}
