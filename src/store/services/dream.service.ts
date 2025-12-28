import api from '../../api/api'
import { useDreams } from '../store'
import { categoriesResponseToCategories, dreamResponseToDream, dreamsResponseToDreams, IncludeParams } from '../types'

export const dreamService = {
    async getDreams(types?: IncludeParams) {
        const { loggedIn, setDreams, dreamsLoaded } = useDreams.getState()
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

    async getDream(dreamId: number) {
        const { loggedIn, setDream } = useDreams.getState()
        const dreamIdStr = dreamId.toString()
        const resp = loggedIn
        ? await api.dreams.privateDetail(dreamIdStr)
        : await api.dreams.dreamsDetail(dreamIdStr)

        if (!resp.ok) return

        setDream(dreamResponseToDream(resp.data))
    },

    async deleteDream(dreamId: number) {
        const { removeDream } = useDreams.getState()
        const dreamIdStr = dreamId.toString()
        const resp = await api.dreams.dreamsDelete(dreamIdStr)

        if (!resp.ok) return

        removeDream(dreamId)
    },

    async postDream(): Promise<number> {
        const { addDream } = useDreams.getState()
        const date = new Date()
        const resp = await api.dreams.dreamsCreate({ date: date.toISOString() })

        if (!resp.ok) return 0

        addDream({ date: date, id: resp.data, finalized: false, isSaved: true, description: '', visible: true, categories: [], persons: [], rating: null, transcript: '' })
        return resp.data
    },

    async patchDreamDate(date: Date) {
        const { setDate, dream } = useDreams.getState()
        const resp = await api.dreams.dreamsPartialUpdate(dream.id.toString(), { date: date.toISOString() })

        if (!resp.ok) return

        setDate(date)
    },

    async patchDreamDescription() {
        const { dream } = useDreams.getState()
        const resp = await api.dreams.dreamsPartialUpdate(dream.id.toString(), { description: dream.description })

        if (!resp.ok) return
    },

    async patchDreamRating(rating: number) {
        const { setRating, dream } = useDreams.getState()
        const resp = await api.dreams.dreamsPartialUpdate(dream.id.toString(), { rating: rating })

        if (!resp.ok) return

        setRating(rating)
    },

    async patchDreamFinalize() {
        const { setFinalized, dream } = useDreams.getState()
        const resp = await api.dreams.finalizePartialUpdate(dream.id.toString())

        if (!resp.ok) return

        setFinalized()
    },

    async patchDreamVisiblity() {
        const { setVisibility, dream } = useDreams.getState()
        const resp = await api.dreams.privatePartialUpdate(dream.id.toString())

        if (!resp.ok) return

        setVisibility()
    },

    async addCategoryToDream(name: string) {
        const { dream, addCategoryToDream, addCategory } = useDreams.getState()
        const resp = await api.dreams.categoriesUpdate(dream.id.toString(), { name: name })

        if (!resp.ok) return

        const newCat = resp.data.categories?.find(c => c.name == name)
        if (!newCat) return
        addCategoryToDream(newCat)
        addCategory(newCat)
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
        const { dream, addPersonToDream, addPerson } = useDreams.getState()
        const resp = await api.dreams.personsUpdate(dream.id.toString(), { name: name })

        if (!resp.ok) return

        const person = resp.data.persons?.find(c => c.name == name)
        if (!person) return
        addPersonToDream(person)
        addPerson(person)
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
