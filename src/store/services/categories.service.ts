import api from '../../api/api'
import { useDreams } from '../store'
import { categoriesResponseToCategories, TypeParams } from '../types'

export const categoriesService = {
  async list(includes?: 'dreamsCount') {
    const { setCategories } = useDreams.getState()
    const resp = await api.categories.categoriesList({ includes: includes })

    if (!resp.ok) return

    const { categories, persons } = categoriesResponseToCategories(resp.data)

    setCategories(categories, persons)
  },

  async rename(id: number, newName: string) {
    const { renameCategory, renamePerson, categories, persons } = useDreams.getState()
    const isCategory = categories.some(c => c.id == id)
    const isPerson = persons.some(p => p.id == id)
    if (!isCategory && !isPerson) return

    const resp = await api.categories.idNamePartialUpdate(id.toString(), { name: newName })
    if (!resp.ok) return

    if (isCategory) renameCategory(id, newName)
    if (isPerson) renamePerson(id, newName)
  },

  async delete(id: number) {
    const { deleteCategory, deletePerson, categories, persons } = useDreams.getState()
    const isCategory = categories.some(c => c.id == id)
    const isPerson = persons.some(p => p.id == id)
    if (!isCategory && !isPerson) return

    const resp = await api.categories.deleteCategories(id.toString())
    if (!resp.ok) return

    if (isCategory) deleteCategory(id)
    if (isPerson) deletePerson(id)
  },

  async changeType(id: number) {
    const { changeCategoryType, changePersonType, categories, persons } = useDreams.getState()
    const isCategory = categories.some(c => c.id == id)
    const isPerson = persons.some(p => p.id == id)

    if (isCategory) {
      const resp = await api.categories.idTypePartialUpdate(id.toString(), { type: TypeParams.PERSON })
      if (!resp.ok) return
      changeCategoryType(id)
      return
    }
    if (isPerson) {
      const resp = await api.categories.idTypePartialUpdate(id.toString(), { type: TypeParams.CATEGORY })
      if (!resp.ok) return
      changePersonType(id)
      return
    }
  },

  async merge(sourceId: number, targetId: number, newName: string) {
    const { setCategories } = useDreams.getState()
    const resp = await api.categories.mergeCreate({ sourceCategoryId: sourceId, targetCategoryId: targetId, newName: newName })
    if (!resp.ok) return

    const { categories, persons } = categoriesResponseToCategories(resp.data)
    setCategories(categories, persons)
  },

}
