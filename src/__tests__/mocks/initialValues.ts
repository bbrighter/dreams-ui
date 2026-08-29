import {
  EntityCategoriesResponse,
  EntityCategoryResponse,
  EntityCategoryType,
  EntityDreamResponse,
} from "../../api/generated_api";

const cat1: EntityCategoryResponse = {
  id: 1,
  name: "Category",
  type: EntityCategoryType.TypeCategory,
};
const pers1: EntityCategoryResponse = {
  id: 2,
  name: "Person",
  type: EntityCategoryType.TypePerson,
};

const metaDream1: EntityDreamResponse = {
  id: 1,
  date: "2025-01-01T12:30:00Z",
  visible: true,
  finalized: false,
  description: "",
  categories: [cat1],
};
const metaDream2: EntityDreamResponse = {
  id: 2,
  date: "2025-02-01T12:30:00Z",
  visible: true,
  finalized: true,
  rating: 3,
  description: "",
  categories: [pers1],
};
const privateDream3: EntityDreamResponse = {
  id: 3,
  date: "2025-02-02T13:00:00Z",
  visible: false,
  finalized: false,
  description: "",
  categories: [],
};
export const initialDreams = (overrides?: EntityDreamResponse[]): EntityDreamResponse[] => {
  if (overrides) return overrides;
  return [metaDream1, metaDream2];
};

export const initialPrivateDreams: EntityDreamResponse[] = [...initialDreams(), privateDream3];

export const dream1 = (overrides: Partial<EntityDreamResponse> = {}): EntityDreamResponse => ({
  ...metaDream1,
  description: "description",
  categories: [cat1, pers1],
  ...overrides,
});
export const privateDream = (
  overrides: Partial<EntityDreamResponse> = {},
): EntityDreamResponse => ({
  ...privateDream3,
  description: "private description",
  categories: [cat1, pers1],
  ...overrides,
});

export const initialCategories = (
  overrides: Partial<EntityCategoriesResponse> = {},
): EntityCategoriesResponse => ({
  categories: [cat1, pers1],
  ...overrides,
});
