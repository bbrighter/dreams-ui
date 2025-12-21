import { describe, expect, it } from 'vitest'

import { TypeParams } from './categories/categories'
import useDreams from './store'

describe('test categories store', () => {
    it('get categories', async () => {
        await useDreams.getState().getCategories()

        const categories = useDreams.getState().categories
        expect(categories).toHaveLength(1)
        expect(categories[0].id).toBe(1)
        expect(categories[0].name).toBe('Category')

        const persons = useDreams.getState().persons
        expect(persons).toHaveLength(1)
        expect(persons[0].id).toBe(3)
        expect(persons[0].name).toBe('Person')
    })

    it('get categories with count', async () => {
        await useDreams.getState().getCategoriesCount()

        const categories = useDreams.getState().categories
        expect(categories).toHaveLength(1)
        expect(categories[0].count).toBe(1)
        const persons = useDreams.getState().persons
        expect(persons).toHaveLength(1)
        expect(persons[0].count).toBe(2)
    })

    it('change the name of a category', async () => {
        await useDreams.getState().getCategories()

        await useDreams.getState().renameCategory(1, 'New category')

        const cat = useDreams.getState().categories.find(c => c.id == 1)
        expect(cat!.name).toBe('New category')
    })

    it('change the type of a category to person', async () => {
        const id = 1
        await useDreams.getState().getCategories()

        await useDreams.getState().changeType(id, TypeParams.PERSON)

        const isCat = useDreams.getState().categories.some(c => c.id == id)
        expect(isCat).toBeFalsy()
        const isPerson = useDreams.getState().persons.some(p => p.id == id)
        expect(isPerson).toBeTruthy()
    })

    it('change the type of a person to category', async () => {
        const id = 3
        await useDreams.getState().getCategories()

        await useDreams.getState().changeType(id, TypeParams.CATEGORY)

        const isCat = useDreams.getState().categories.some(c => c.id == id)
        expect(isCat).toBeTruthy()
        const isPerson = useDreams.getState().persons.some(p => p.id == id)
        expect(isPerson).toBeFalsy()
    })

    it('merge two categories', async () => {
        const sourceId = 1
        const targetId = 3
        const newName = 'new name'
        await useDreams.getState().getCategories()

        await useDreams.getState().mergeCategories(sourceId, targetId, newName)

        const mergedCat = useDreams.getState().persons.find(p => p.id == targetId)
        expect(mergedCat).toBeDefined()
        expect(mergedCat!.name).toBe(newName)
    })

    it('delete a category', async () => {
        await useDreams.getState().getCategories()

        await useDreams.getState().deleteCategory(1)

        const categories = useDreams.getState().categories
        expect(categories).toHaveLength(0)
        const persons = useDreams.getState().persons
        expect(persons).toHaveLength(1)
    })
})
