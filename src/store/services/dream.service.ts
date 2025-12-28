import api from '../../api/api'
import { useDreams } from '../store'
import { categoriesResponseToCategories, dreamResponseToDream } from '../types'

export const dreamService = {
  async getDream(dreamId: number) {
    const { loggedIn, setDream } = useDreams.getState()
    const dreamIdStr = dreamId.toString()
    const resp = loggedIn
      ? await api.dreams.privateDetail(dreamIdStr)
      : await api.dreams.dreamsDetail(dreamIdStr)

    if (!resp.ok) return

    setDream(dreamResponseToDream(resp.data))
  },

  async patchDreamDate(date: Date) {
    const { setDate, changeDream, dream } = useDreams.getState()
    const resp = await api.dreams.dreamsPartialUpdate(dream.id.toString(), { date: date.toISOString() })

    if (!resp.ok) return

    setDate(date)
    changeDream(dream.id, { date: date })
  },

  async patchDreamDescription() {
    const { dream } = useDreams.getState()
    const resp = await api.dreams.dreamsPartialUpdate(dream.id.toString(), { description: dream.description })

    if (!resp.ok) return
  },

  async patchDreamRating(rating: number) {
    const { setRating, changeDream, dream } = useDreams.getState()
    const resp = await api.dreams.dreamsPartialUpdate(dream.id.toString(), { rating: rating })

    if (!resp.ok) return

    setRating(rating)
    changeDream(dream.id, { rating: rating })
  },

  async patchDreamFinalize() {
    const { setFinalized, changeDream, dream } = useDreams.getState()
    const resp = await api.dreams.finalizePartialUpdate(dream.id.toString())

    if (!resp.ok) return

    setFinalized()
    changeDream(dream.id, { finalized: true })
  },

  async patchDreamVisiblity() {
    const { setVisibility, changeDream, dream } = useDreams.getState()
    const newVisible = !dream.visible
    const resp = await api.dreams.privatePartialUpdate(dream.id.toString())

    if (!resp.ok) return

    setVisibility()
    changeDream(dream.id, { visible: newVisible })
  },

  async addCategoryToDream(name: string) {
    const { dream, setCategories, addCategoryToDream } = useDreams.getState()
    const resp = await api.dreams.categoriesUpdate(dream.id.toString(), { name: name })

    if (!resp.ok) return
    const { categories, persons } = categoriesResponseToCategories(resp.data)

    const newCat = resp.data.categories?.find(c => c.name == name)
    if (!newCat) return
    addCategoryToDream(newCat)
    setCategories(categories, persons)
  },

  async removeCategoryFromDream(id: number) {
    const { dream, removeCategoryFromDream, setCategories } = useDreams.getState()
    const resp = await api.dreams.categoriesDelete(dream.id.toString(), id.toString())

    if (!resp.ok) return
    const categories = categoriesResponseToCategories(resp.data)

    removeCategoryFromDream(id)
    setCategories(categories.categories, categories.persons)
  },

  async addPersonToDream(name: string) {
    const { dream, addPersonToDream, setCategories } = useDreams.getState()
    const resp = await api.dreams.personsUpdate(dream.id.toString(), { name: name })

    if (!resp.ok) return
    const { categories, persons } = categoriesResponseToCategories(resp.data)

    const person = resp.data.persons?.find(c => c.name == name)
    if (!person) return
    addPersonToDream(person)
    setCategories(categories, persons)
  },

  async removePersonFromDream(id: number) {
    const { dream, removePersonFromDream, setCategories } = useDreams.getState()
    const resp = await api.dreams.personsDelete(dream.id.toString(), id.toString())

    if (!resp.ok) return
    const categories = categoriesResponseToCategories(resp.data)

    removePersonFromDream(id)
    setCategories(categories.categories, categories.persons)
  },
}
