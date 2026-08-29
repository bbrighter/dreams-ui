import { describe, expect, it } from "vitest";

import { createCategories } from "@/__tests__/fixtures/categories";
import { getCategoriesHandler, postCategoryMergeHandler } from "@/__tests__/mocks/categoryHandlers";
import { server } from "@/__tests__/setupTest";
import { EntityCategoryType } from "@/api/generated_api";
import { useDreams } from "@/store/store";

import { categoriesService } from "../categories.service";

describe("categories service", () => {
  describe("list", () => {
    it("list", async () => {
      server.use(
        getCategoriesHandler(
          createCategories([
            { id: 1, type: EntityCategoryType.TypeCategory, name: "Category" },
            { id: 2, type: EntityCategoryType.TypePerson, name: "Person" },
          ]),
        ),
      );
      await categoriesService.list();

      const { categories } = useDreams.getState();
      expect(categories).toHaveLength(2);
      expect(categories).toContainEqual({ id: 1, type: "category", name: "Category" });
      expect(categories).toContainEqual({ id: 2, type: "person", name: "Person" });
    });
  });

  describe("rename", () => {
    it("rename category", async () => {
      server.use(getCategoriesHandler(createCategories({ id: 1 })));
      await categoriesService.list();

      await categoriesService.rename(1, "new cat");
      const { categories } = useDreams.getState();
      expect(categories).toContainEqual(expect.objectContaining({ name: "new cat", id: 1 }));
    });

    it("invalid rename does not change anything", async () => {
      server.use(getCategoriesHandler(createCategories({ id: 1 })));
      await categoriesService.list();

      await categoriesService.rename(8, "something");

      const { categories } = useDreams.getState();
      expect(categories).not.toContainEqual(expect.objectContaining({ name: "something" }));
    });
  });

  describe("delete", () => {
    it("delete person", async () => {
      server.use(
        getCategoriesHandler(createCategories({ id: 2, type: EntityCategoryType.TypePerson })),
      );
      await categoriesService.list();

      await categoriesService.delete(2);

      const { categories } = useDreams.getState();
      expect(categories).toHaveLength(0);
    });

    it("delete category", async () => {
      server.use(
        getCategoriesHandler(createCategories({ id: 1, type: EntityCategoryType.TypeCategory })),
      );
      await categoriesService.list();

      await categoriesService.delete(1);

      const { categories } = useDreams.getState();
      expect(categories).toHaveLength(0);
    });

    it("invalid id", async () => {
      server.use(getCategoriesHandler(createCategories({ id: 1 })));
      await categoriesService.list();

      await categoriesService.delete(100);

      const { categories } = useDreams.getState();
      expect(categories).toHaveLength(1);
    });
  });

  describe("change type", () => {
    it("change category", async () => {
      server.use(
        getCategoriesHandler(createCategories({ id: 1, type: EntityCategoryType.TypeCategory })),
      );
      await categoriesService.list();

      await categoriesService.changeType(1);

      const { categories } = useDreams.getState();
      expect(categories).toHaveLength(1);
      expect(categories[0].id).toBe(1);
      expect(categories[0].type).toBe("person");
    });

    it("change person", async () => {
      server.use(
        getCategoriesHandler(createCategories({ id: 1, type: EntityCategoryType.TypePerson })),
      );
      await categoriesService.list();

      await categoriesService.changeType(1);

      const { categories } = useDreams.getState();
      expect(categories).toHaveLength(1);
      expect(categories[0].id).toBe(1);
      expect(categories[0].type).toBe("category");
    });

    it("invalid id", async () => {
      server.use(getCategoriesHandler(createCategories({ id: 1 })));
      await categoriesService.list();
      const { categories: oldCategories } = useDreams.getState();
      await categoriesService.changeType(100);

      const { categories } = useDreams.getState();
      expect(categories).toBe(oldCategories);
    });
  });

  describe("merge", () => {
    it("merge person into category", async () => {
      server.use(
        getCategoriesHandler(
          createCategories([
            { id: 1, name: "Cat", type: EntityCategoryType.TypeCategory },
            { id: 2, name: "Person", type: EntityCategoryType.TypePerson },
          ]),
        ),
        postCategoryMergeHandler(
          createCategories({ id: 1, name: "new name", type: EntityCategoryType.TypeCategory }),
        ),
      );
      await categoriesService.list();

      server.use();
      await categoriesService.merge(2, 1, "new name");

      const { categories } = useDreams.getState();
      expect(categories).toHaveLength(1);
      expect(categories).toContainEqual({ id: 1, name: "new name", type: "category" });
    });
  });
});
