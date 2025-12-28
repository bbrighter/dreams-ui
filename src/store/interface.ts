import { CategorySlice, CategoryState } from './types/categories.types'
import { DreamSlice, DreamState } from './types/dream.types'

// export type StoreSlice = CategorySlice & DreamSlice
export type StoreState = CategoryState & DreamState
