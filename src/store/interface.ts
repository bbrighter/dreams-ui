import { ApiSlice } from './api'
import { AuthSlice } from './auth'
import { CategorySlice } from './categories'
import { DreamSlice } from './dream'
import { DreamsSlice } from './dreams'
import { StatisticsSlice } from './statistics'

export type StoreSlice = CategorySlice & DreamsSlice & DreamSlice & AuthSlice & StatisticsSlice & ApiSlice
