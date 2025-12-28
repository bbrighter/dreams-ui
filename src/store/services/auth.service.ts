import api from '../../api/api'
import { useDreams } from '../store'

export const authService = {
  login: async (password: string): Promise<boolean> => {
    const { user, setToken } = useDreams.getState()
    try {
      const resp = await api.login.loginCreate({ name: user, password: password })
      if (!resp.ok) return false

      setToken(resp.data.token)
      return resp.ok
    }
    catch {
      return false
    }
  },
  logout: async () => {
    const { resetAuth } = useDreams.getState()
    const resp = await api.logout.logoutCreate()

    if (resp.ok) {
      resetAuth()
    }
  },
}
