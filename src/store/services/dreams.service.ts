import { selectLoggedIn } from '../auth'
import { IncludeParams } from '../categories'
import { dreamsResponseToDreams } from '../dreams'
import { useDreams } from '../store'

export const dreamsService = {
  async getDreams(types?: IncludeParams) {
    const { setDreams, dreamsLoaded, api } = useDreams.getState()
    if (!api) return
    const loggedIn = selectLoggedIn(useDreams.getState())
    let ok = false
    let resp
    if (loggedIn && dreamsLoaded != 'all') {
      resp = await api.dreams.privateList()
      ok = resp.ok
    }
    if (!loggedIn && dreamsLoaded != 'public') {
      resp = await api.dreams.dreamsList({ includes: types })
      ok = resp.ok
    }

    if (!ok) return

    const which = loggedIn ? 'all' : 'public'

    setDreams(dreamsResponseToDreams(resp.data), which)
  },

  async deleteDream(dreamId: number) {
    const { removeDream, api } = useDreams.getState()
    if (!api) return
    const dreamIdStr = dreamId.toString()
    const resp = await api.dreams.dreamsDelete(dreamIdStr)

    if (!resp.ok) return

    removeDream(dreamId)
  },

  async postDream(): Promise<number> {
    const { addDream, addDreamToList, api } = useDreams.getState()
    if (!api) return 0
    const date = new Date()
    const resp = await api.dreams.dreamsCreate({ date: date.toISOString() })

    if (!resp.ok) return 0

    const dream = { date: date, id: resp.data, finalized: false, isSaved: true, description: '', visible: true, categories: [], persons: [], rating: null, transcript: '' }
    addDream(dream)
    addDreamToList(dream)
    return resp.data
  },
}
