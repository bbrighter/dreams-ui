import { ControllerCategoryListResponse } from "@/api/generated_api";

export type CategoryType = "person" | "category";

export type Category = {
  id: number;
  name: string;
  type: CategoryType;
};

export type Categories = Array<Category>;

export function categoriesResponseToCategories(
  resp: ControllerCategoryListResponse,
): Array<Category> {
  return resp.categories.map((c) => ({
    id: c.id,
    name: c.name,
    type: c.type === "person" ? "person" : "category",
  }));
}
