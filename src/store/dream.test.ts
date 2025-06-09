import { expect, test } from 'vitest'

import { EntityDreamResponse } from '../api/generated_api'
import { dreamResponseToDream } from './dream'

test('dreamResponseToDream', () => {
    const resp: EntityDreamResponse = {
        id: 1,
        date: '2024-01-04T19:54:20.113Z',
        description: 'description',
        persons: [],
        categories: [],
        visible: true,
        finalized: false,
    }

    const dream = dreamResponseToDream(resp)

    expect(dream.id).toBe(1)
    expect(dream.date.getDate()).toBe(4)
    expect(dream.date.getMonth()).toBe(0) // 0 is January
    expect(dream.date.getFullYear()).toBe(2024)
    expect(dream.description).toBe('description')
    expect(dream.persons).toHaveLength(0)
    expect(dream.categories).toHaveLength(0)
    expect(dream.visible).toBe(true)
    expect(dream.finalized).toBe(false)
})