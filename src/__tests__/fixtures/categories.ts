import { ControllerCategoryListResponse, ControllerCategoryResponse } from "@/api/generated_api";

const createCategory = (
  overrides?: Partial<ControllerCategoryResponse>,
): ControllerCategoryResponse => ({
  id: 1,
  name: "Category",
  type: "category",
  ...overrides,
});

export const createCategories = (
  overrides: Array<ControllerCategoryResponse> | Partial<ControllerCategoryResponse> = [],
): ControllerCategoryListResponse => ({
  categories: Array.isArray(overrides) ? overrides : [createCategory(overrides)],
});
