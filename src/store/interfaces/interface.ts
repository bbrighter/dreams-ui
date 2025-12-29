import { AuthSlice, AuthState } from './auth.interface'
import { CategorySlice, CategoryState } from './categories.interface'
import { DreamSlice, DreamState } from './dream.interface'
import { DreamsSlice, DreamsState } from './dreams.interface'
import { StatisticsSlice, StatisticState } from './statistics.interface'

export type StoreSlice = CategorySlice & DreamSlice & DreamsSlice & AuthSlice & StatisticsSlice
export type StoreState = CategoryState & DreamState & DreamsState & AuthState & StatisticState
