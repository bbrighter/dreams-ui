import { Temporal } from "@js-temporal/polyfill";
import { describe, expect, it, vi } from "vitest";

import { createCategories } from "@/__tests__/fixtures/categories";
import { createDream, createDreams } from "@/__tests__/fixtures/dreams";
import { getCategoriesHandler } from "@/__tests__/mocks/categoryHandlers";
import { getDreamHandler, getDreamsHandler } from "@/__tests__/mocks/dreamsHandlers";
import { server } from "@/__tests__/setupTest";
import { useDreams } from "@/store/store";

import { categoriesService } from "../categories.service";
import { dreamService } from "../dream.service";
import { dreamsService } from "../dreams.service";
describe("dream service", () => {
  describe("get dream", () => {
    it("not logged in", async () => {
      server.use(getDreamHandler(createDream({ id: 1 })));
      const { api } = useDreams.getState();
      const dreamsDetail = vi.spyOn(api!.dreams, "dreamsDetail");
      await dreamService.getDream(1);

      const { dream } = useDreams.getState();
      expect(dream.id).toBe(1);
      expect(dreamsDetail).toHaveBeenCalled();
    });
  });

  describe("patch dream", () => {
    it("date", async () => {
      server.use(
        getDreamHandler(createDream({ id: 1 })),
        getDreamsHandler(createDreams(createDream({ id: 1 }))),
      );
      await dreamService.getDream(1);
      await dreamsService.getDreams();

      const date = Temporal.Now.instant();
      const { setDate } = useDreams.getState();
      setDate(date);
      await dreamService.saveDream();

      const { dream } = useDreams.getState();
      expect(dream.date).toStrictEqual(date);
    });
    it("rating", async () => {
      server.use(
        getDreamHandler(createDream({ id: 1 })),
        getDreamsHandler(createDreams(createDream({ id: 1 }))),
      );
      await dreamService.getDream(1);
      await dreamsService.getDreams();
      const rating = 3;
      const { setRating } = useDreams.getState();
      setRating(3);
      await dreamService.saveDream();

      const { dream } = useDreams.getState();
      expect(dream.rating).toStrictEqual(rating);
    });
    it("finalize", async () => {
      server.use(
        getDreamHandler(createDream({ id: 1 })),
        getDreamsHandler(createDreams(createDream({ id: 1 }))),
      );
      await dreamService.getDream(1);
      await dreamsService.getDreams();
      await dreamService.finalize();
      const { dream } = useDreams.getState();
      expect(dream.finalized).toBeTruthy();
    });

    it("description", async () => {
      server.use(
        getDreamHandler(createDream({ id: 1 })),
        getDreamsHandler(createDreams(createDream({ id: 1 }))),
      );
      await dreamService.getDream(1);
      await dreamsService.getDreams();

      const description = "description";
      const { setDescription } = useDreams.getState();
      setDescription(description);
      await dreamService.saveDream();

      const { dream } = useDreams.getState();
      expect(dream.description).toStrictEqual(description);
    });
  });

  describe("add category to dream", () => {
    it("new category", async () => {
      server.use(
        getDreamHandler(createDream({ id: 1 })),
        getDreamsHandler(createDreams(createDream({ id: 1 }))),
      );
      await dreamService.getDream(1);
      await dreamsService.getDreams();

      const { api } = useDreams.getState();
      const categoriesCreate = vi.spyOn(api!.dreams, "categoriesCreate");
      await dreamService.addNewCategory("new category", "category");

      const { dream, categories } = useDreams.getState();
      expect(categories).toHaveLength(1);
      expect(dream.categories).toHaveLength(1);
      expect(categoriesCreate).toHaveBeenCalledWith("1", {
        name: "new category",
        categoryType: "category",
      });
    });

    it("new person", async () => {
      server.use(
        getDreamHandler(createDream({ id: 1 })),
        getDreamsHandler(createDreams(createDream({ id: 1 }))),
      );
      await dreamService.getDream(1);
      await dreamsService.getDreams();

      const { api } = useDreams.getState();
      const categoriesCreate = vi.spyOn(api!.dreams, "categoriesCreate");
      await dreamService.addNewCategory("new category", "person");

      const { dream, categories } = useDreams.getState();
      expect(categories).toHaveLength(1);
      expect(dream.categories).toHaveLength(1);
      expect(categoriesCreate).toHaveBeenCalledWith("1", {
        name: "new category",
        categoryType: "person",
      });
    });

    it("existing category", async () => {
      server.use(
        getDreamHandler(createDream({ id: 1 })),
        getDreamsHandler(createDreams(createDream({ id: 1 }))),
        getCategoriesHandler(createCategories({ id: 10 })),
      );
      await dreamService.getDream(1);
      await dreamsService.getDreams();
      await categoriesService.list();

      const { api } = useDreams.getState();
      const categoriesUpdate = vi.spyOn(api!.dreams, "categoriesUpdate");
      await dreamService.addExistingCategory(10);

      const { dream, categories } = useDreams.getState();
      expect(categories).toHaveLength(1);
      expect(dream.categories).toHaveLength(1);
      expect(categoriesUpdate).toHaveBeenCalledWith("1", "10"); // DreamId, CategoryId
    });
  });

  describe("remove category from dream", () => {
    it("ok", async () => {
      server.use(
        getDreamHandler(createDream({ id: 1 })),
        getDreamsHandler(
          createDreams(
            createDream({
              id: 1,
              categories: [{ id: 10, name: "Category", type: "category" }],
            }),
          ),
        ),
        getCategoriesHandler(createCategories({ id: 10, name: "Category", type: "category" })),
      );
      await dreamService.getDream(1);
      await dreamsService.getDreams();
      await categoriesService.list();

      await dreamService.removeCategory(1);

      const { dream, categories } = useDreams.getState();
      expect(dream.categories).toHaveLength(0);
      expect(categories).toHaveLength(1);
    });
  });
});
