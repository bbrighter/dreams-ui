import { AuthSlice } from './types/auth.types'
import { CategoryState } from './types/categories.types'
import { DreamState } from './types/dream.types'
import { DreamsState } from './types/dreams.types'
import { StatisticsSlice } from './types/statistics.types'

// export type StoreSlice = CategorySlice & DreamSlice
export type StoreState = CategoryState & DreamState & DreamsState & AuthSlice & StatisticsSlice
