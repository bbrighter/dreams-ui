import { describe, expect, it } from 'vitest'

import { postLoginHandler } from '../../__tests__/mocks/authHandlers'
import { server } from '../../__tests__/setupTest'
import { useDreams } from '../store'
import { authService } from './auth.service'

describe('auth service', () => {
  describe('login', () => {
    it('success', async () => {
      const ok = await authService.login('password')

      expect(ok).toBeTruthy()
      const { loggedIn, token } = useDreams.getState()
      expect(loggedIn).toBeTruthy()
      expect(token).toBe('token')
    })
    it('failure', async () => {
      server.use(postLoginHandler(true))
      const ok = await authService.login('password')
      expect(ok).toBeFalsy()

      const { loggedIn, user, token } = useDreams.getState()
      expect(loggedIn).toBeFalsy()
      expect(user).toBe('Benni')
      expect(token).toBe('')
    })
  })

  describe('logout', () => {
    it('ok', async () => {
      await authService.logout()

      const { loggedIn, user, token } = useDreams.getState()
      expect(loggedIn).toBeFalsy()
      expect(user).toBe('Benni')
      expect(token).toBe('')
    })
  })
})
