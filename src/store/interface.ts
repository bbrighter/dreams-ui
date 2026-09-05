import { Temporal } from "@js-temporal/polyfill";

import { Api } from "../api/generated_api";
import { Categories, CategoryType } from "./types/categories.types";
import { Dream } from "./types/dream.types";
import { Dreams } from "./types/dreams.types";
import { MonthlyStatistics, Statistics } from "./types/statistics.types";

export type StoreSlice = CategorySlice & DreamsSlice & DreamSlice & StatisticsSlice & ApiSlice;

export type ApiState = {
  api: Api<unknown> | null;
};

interface ApiActions {
  initApi: () => Promise<void>;
}

export type ApiSlice = ApiState & ApiActions;

export interface CategoryState {
  categories: Categories;
  categoriesLoaded: boolean;
}

interface CategoryActions {
  resetCategories: () => void;
  setCategories: (cats: Categories) => void;
  renameCategory: (id: number, newName: string) => void;
  setCategoryType: (id: number, type: CategoryType) => void;
  setCategoriesLoaded: (isLoaded: boolean) => void;
}

export type CategorySlice = CategoryState & CategoryActions;

interface DreamActions {
  resetDream: () => void;
  setDate: (date: Temporal.Instant) => void;
  setDescription: (desc: string) => void;
  setFinalized: () => void;
  setRating: (rating: number) => void;
  setDreamCategories: (cats: Array<number>) => void;
  setDream: (dream: Dream) => void;
  setHash: (dream: Dream) => void;
}

export type DreamState = { dream: Dream; hash: string };

export type DreamSlice = DreamActions & DreamState;

export interface DreamsState {
  dreams: Dreams;
  scrollPosition: number;
  dreamCategoryFilter: number | null;
}

interface DreamsActions {
  resetDreams: () => void;
  setDreams: (dreams: Dreams) => void;
  setScrollPosition: (pos: number) => void;
  setDreamCategoryFilter: (catId: number | null) => void;
}

export type DreamsSlice = DreamsState & DreamsActions;

export type StatisticState = {
  statistics: Statistics;
  monthlyStatistics: MonthlyStatistics;
};

interface StatisticActions {
  resetStatistics: () => void;
  setStatistics: (s: Statistics) => void;
  setMonthlyStatistics: (m: MonthlyStatistics) => void;
}

export type StatisticsSlice = StatisticState & StatisticActions;
