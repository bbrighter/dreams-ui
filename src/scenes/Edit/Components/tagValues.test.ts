import { test, expect } from 'vitest'

import { Category } from "../../../store/categories"
import { Person } from "../../../store/persons"
import { isTagValue } from "./tagValues"

test('isTagValue', () => {
    const u = { id: 1, name: 'name' }
    expect(isTagValue(u)).toBeTruthy()

    const notT = { id: 1, label: 'label' }
    expect(isTagValue(notT)).toBeFalsy()
})

test('categoryIsTagValue', () => {
    const cat: Category = {
        id: 1,
        name: 'name'
    }
    expect(isTagValue(cat)).toBeTruthy()
})

test('personIsTagValue', () => {
    const cat: Person = {
        id: 1,
        name: 'name'
    }
    expect(isTagValue(cat)).toBeTruthy()
})