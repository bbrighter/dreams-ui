import { expect, test } from "vitest";

import { EntityCategoriesResponse, EntityCategoryType } from "../../api/generated_api";
import { categoriesResponseToCategories } from "../types/categories.types";

test("categoriesResponseToCategories", () => {
  const resp: EntityCategoriesResponse = {
    categories: [
      { id: 1, name: "Title", type: EntityCategoryType.TypeCategory },
      { id: 2, name: "Title 2", type: EntityCategoryType.TypePerson },
    ],
  };

  const categories = categoriesResponseToCategories(resp);

  expect(categories).toHaveLength(2);
  expect(categories[0].id).toBe(1);
  expect(categories[0].name).toBe("Title");
  expect(categories[0].type).toBe("category");
  expect(categories[1].id).toBe(2);
  expect(categories[1].name).toBe("Title 2");
  expect(categories[1].type).toBe("person");
});
