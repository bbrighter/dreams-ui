import {
  EntityCategoriesResponse,
  EntityCategoryResponse,
  EntityCategoryType,
} from "@/api/generated_api";

const createCategory = (overrides?: Partial<EntityCategoryResponse>): EntityCategoryResponse => ({
  id: 1,
  name: "Category",
  type: EntityCategoryType.TypeCategory,
  ...overrides,
});

export const createCategories = (
  overrides: Array<EntityCategoryResponse> | Partial<EntityCategoryResponse> = [],
): EntityCategoriesResponse => ({
  categories: Array.isArray(overrides) ? overrides : [createCategory(overrides)],
});
