import { HttpHandler } from 'msw'
import { beforeEach, describe, expect, it } from 'vitest'

import { getDreamsHandler, postDreamsHandler } from '../../__tests__/mocks/dreamsHandlers'
import { server } from '../../__tests__/setupTest'
import { useDreams } from '../store'
import { dreamsService } from './dreams.service'

describe('dream service', () => {
  describe('get dreams', () => {
    it('ok', async () => {
      await dreamsService.getDreams()

      const { dreams } = useDreams.getState()
      expect(dreams).toHaveLength(2)
    })
    it('sorted by date', async () => {
      server.use(getDreamsHandler([
        { date: '2027-01-01T12:30:00Z', finalized: false, id: 1, visible: true },
        { date: '2026-01-01T12:30:00Z', finalized: false, id: 2, visible: true },
      ]))
      await dreamsService.getDreams()

      const { dreams } = useDreams.getState()
      expect(dreams[0].date.valueOf()).toBeGreaterThan(dreams[1].date.valueOf())
    })
  })

  describe('delete dream', () => {
    beforeEach(async () => {
      await dreamsService.getDreams()
    })
    it('ok', async () => {
      await dreamsService.deleteDream(1)

      const { dreams } = useDreams.getState()
      expect(dreams).toHaveLength(1)
      expect(dreams[0].id).not.toBe(1)
    })
  })

  describe('post dream', () => {
    beforeEach(async () => {
      await dreamsService.getDreams()
    })
    it('ok', async () => {
      server.use(postDreamsHandler(3))
      const id = await dreamsService.postDream()

      expect(id).toBe(3)
      const { dreams, dream } = useDreams.getState()
      expect(dreams).toHaveLength(3)
      expect(dream.id).toBe(3)
      expect(dream.date.getTime()).toBeLessThan(new Date().getTime())
      expect(dream.date.getTime()).toBeGreaterThan(new Date().getTime() - 1000)
    })
  })
})
