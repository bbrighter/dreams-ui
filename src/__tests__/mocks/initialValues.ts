import { EntityCategoriesResponse, EntityCategoryResponse, EntityDreamMetaResponse, EntityDreamResponse } from '../../api/generated_api'

const metaDream1: EntityDreamMetaResponse = { id: 1, date: '2025-01-01T12:30:00Z', visible: true, finalized: false }
const metaDream2: EntityDreamMetaResponse = { id: 2, date: '2025-02-01T12:30:00Z', visible: true, finalized: true, rating: 3 }
const privateDream3: EntityDreamMetaResponse = { id: 3, date: '2025-02-02T13:00:00Z', visible: false, finalized: false }
export const initialDreams = (): EntityDreamMetaResponse[] => ([metaDream1, metaDream2])

export const initialPrivateDreams: EntityDreamMetaResponse[] = [...initialDreams(), privateDream3]

export const cat1: EntityCategoryResponse = { id: 1, name: 'Category' }
export const pers1: EntityCategoryResponse = { id: 2, name: 'Person' }

export const dream1 = (overrides: Partial<EntityDreamResponse> = {}): EntityDreamResponse => ({
        ...metaDream1,
        description: 'description',
        categories: [cat1],
        persons: [pers1],
        ...overrides,
})
export const privateDream = (overrides: Partial<EntityDreamResponse> = {}): EntityDreamResponse => ({
    ...privateDream3,
    description: 'private description',
    categories: [cat1],
    persons: [pers1],
    ...overrides,
})

export const initialCategories = (overrides: Partial<EntityCategoriesResponse> = {}): EntityCategoriesResponse => ({
    categories: [cat1],
    persons: [pers1],
    ...overrides,
})
